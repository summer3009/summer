// show.js - 关系图功能（支持触摸和拖动）
console.log('show.js 加载成功');

(function() {
    console.log('开始初始化关系图系统...');
    
    // 关系图变量
    let canvas, ctx;
    let nodes = [], edges = [];
    let hoveredNode = null, selectedNode = null;
    let isDragging = false, dragOffsetX = 0, dragOffsetY = 0;
    let animationId = null;
    let isMobile = false;
    
    // ========== 核心函数 ==========
    
    // 1. 初始化关系图（公开函数）
    window.initRelationGraph = function() {
        console.log('【关系图】开始初始化...');
        
        // 检测是否移动端
        isMobile = 'ontouchstart' in window || 
                  navigator.maxTouchPoints > 0 || 
                  navigator.msMaxTouchPoints > 0;
        console.log(`【关系图】设备类型: ${isMobile ? '移动端' : '桌面端'}`);
        
        // 获取元素
        const canvasEl = document.getElementById('relationCanvas');
        const container = document.getElementById('relationGraph');
        
        if (!canvasEl) {
            console.error('【关系图】错误：找不到canvas元素');
            return false;
        }
        
        if (!container) {
            console.error('【关系图】错误：找不到容器元素');
            return false;
        }
        
        console.log('【关系图】元素找到，开始设置...');
        
        canvas = canvasEl;
        ctx = canvas.getContext('2d');
        
        // 设置canvas尺寸
        function resizeCanvas() {
            if (!canvas || !container) return;
            
            const width = container.clientWidth;
            const height = container.clientHeight;
            
            console.log(`【关系图】设置尺寸: ${width}x${height}`);
            
            // 使用设备像素比提高清晰度
            const dpr = window.devicePixelRatio || 1;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = width + 'px';
            canvas.style.height = height + 'px';
            
            // 缩放上下文
            ctx.scale(dpr, dpr);
            
            updateRelationData();
        }
        
        // 初始设置
        resizeCanvas();
        
        // 移动端优化
        if (isMobile) {
            canvas.style.touchAction = 'none';
            canvas.style.userSelect = 'none';
            canvas.style.webkitUserSelect = 'none';
            canvas.style.msUserSelect = 'none';
            canvas.style.webkitTapHighlightColor = 'transparent';
            
            // 提高绘制质量
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
        }
        
        // 绑定事件
        bindCanvasEvents();
        
        console.log('【关系图】初始化完成');
        return true;
    };
    
    // 2. 刷新关系图（公开函数）
    window.refreshRelationGraph = function(event) {
        console.log('【关系图】刷新...');
        
        // 重新初始化
        const success = window.initRelationGraph();
        
        if (event && event.target) {
            const button = event.target.closest('button');
            if (button) {
                const originalHTML = button.innerHTML;
                if (success) {
                    button.innerHTML = '<i class="fa fa-check mr-1"></i>已刷新';
                    button.classList.add('bg-green-100', 'text-green-600');
                } else {
                    button.innerHTML = '<i class="fa fa-times mr-1"></i>刷新失败';
                    button.classList.add('bg-red-100', 'text-red-600');
                }
                
                setTimeout(() => {
                    button.innerHTML = originalHTML;
                    button.classList.remove('bg-green-100', 'text-green-600', 'bg-red-100', 'text-red-600');
                }, 1500);
            }
        }
        
        return success;
    };
    
    // ========== 内部函数 ==========
    
    // 绑定画布事件
    function bindCanvasEvents() {
        if (!canvas) return;
        
        // 移除旧的事件监听器
        canvas.removeEventListener('mousedown', handleMouseDown);
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseup', handleMouseUp);
        canvas.removeEventListener('click', handleClick);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
        canvas.removeEventListener('touchstart', handleTouchStart);
        canvas.removeEventListener('touchmove', handleTouchMove);
        canvas.removeEventListener('touchend', handleTouchEnd);
        canvas.removeEventListener('touchcancel', handleTouchCancel);
        
        // 桌面端事件
        canvas.addEventListener('mousedown', handleMouseDown);
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseup', handleMouseUp);
        canvas.addEventListener('click', handleClick);
        canvas.addEventListener('mouseleave', handleMouseLeave);
        
        // 移动端触摸事件
        canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
        canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
        canvas.addEventListener('touchend', handleTouchEnd);
        canvas.addEventListener('touchcancel', handleTouchCancel);
        
        console.log(`【关系图】事件绑定完成（${isMobile ? '触摸' : '鼠标'}模式）`);
    }
    
    // 更新关系图数据
    function updateRelationData() {
        if (!canvas || !ctx) {
            console.error('【关系图】canvas或ctx未初始化');
            return;
        }
        
        console.log('【关系图】更新数据...');
        
        // 清空数据
        nodes = [];
        edges = [];
        
        // 检查游戏数据
        if (!gameData) {
            console.error('【关系图】gameData未定义');
            drawErrorMessage('游戏数据未加载');
            return;
        }
        
        if (!npcData) {
            console.error('【关系图】npcData未定义');
            drawErrorMessage('NPC数据未加载');
            return;
        }
        
        // 收集有关系的NPC
        const relatedNPCs = [];
        for (const id in npcData) {
            const npc = npcData[id];
            if (!npc || !npc.gameState) continue;
            
            const isUnlocked = gameData.unlockedCharacters && gameData.unlockedCharacters.includes(id);
            if (!isUnlocked) continue;
            
            const isLove = npc.gameState.love === true;
            const isEx = npc.gameState.ex === true;
            
            if (isLove || isEx) {
                relatedNPCs.push({
                    id: id,
                    name: npc.name,
                    team: npc.team,
                    isLove: isLove,
                    isEx: isEx,
                    favor: npc.gameState.favor || 0
                });
            }
        }
        
        console.log(`【关系图】找到 ${relatedNPCs.length} 个相关NPC`);
        
        // 如果没有关系，显示提示
        if (relatedNPCs.length === 0) {
            drawNoRelationsMessage();
            return;
        }
        
        const cssWidth = canvas.width / (window.devicePixelRatio || 1);
        const cssHeight = canvas.height / (window.devicePixelRatio || 1);
        const centerX = cssWidth / 2;
        const centerY = cssHeight / 2;
        
        // 1. 添加玩家节点（中心）- 金色
        nodes.push({
            id: 'player',
            name: '玩家',
            x: centerX,
            y: centerY,
            radius: isMobile ? 20 : 18, // 中等大小
            color: '#f59e0b',
            type: 'player',
            draggable: false
        });
        
        // 2. 添加NPC节点（多层圆形布局）- 针对80+人的优化
        const totalNPCs = relatedNPCs.length;
        const layers = Math.min(4, Math.ceil(totalNPCs / 20)); // 最多4层
        const baseRadius = Math.min(centerX, centerY) * 0.4;
        
        relatedNPCs.forEach((npc, index) => {
            const layer = Math.floor(index / 20) % layers;
            const layerIndex = index % 20;
            
            // 每层半径逐渐增大
            const layerRadius = baseRadius + (layer * baseRadius * 0.5);
            // 每层节点数
            const layerCount = Math.min(20, totalNPCs - (layer * 20));
            
            const angle = (layerIndex / layerCount) * 2 * Math.PI;
            const x = centerX + layerRadius * Math.cos(angle);
            const y = centerY + layerRadius * Math.sin(angle);
            
            const isLove = npc.isLove;
            // NPC圆圈缩小：移动端7px，桌面端6px
            nodes.push({
                id: npc.id,
                name: npc.name,
                team: npc.team,
                x: x,
                y: y,
                radius: isMobile ? 7 : 6, // 缩小
                color: isLove ? '#ef4444' : '#3b82f6',
                type: isLove ? 'love' : 'ex',
                favor: npc.favor,
                draggable: true
            });
            
            // 3. 添加玩家到NPC的连线
            edges.push({
                from: 'player',
                to: npc.id,
                color: isLove ? '#ef4444' : '#3b82f6',
                width: isMobile ? 2 : 1.5, // 细一点
                type: 'relation'
            });
        });
        
        // 4. 添加NPC之间的同队连线（只连接同一层的队友，避免过于密集）
        for (let i = 0; i < relatedNPCs.length; i++) {
            for (let j = i + 1; j < relatedNPCs.length; j++) {
                // 只连接同一层的队友（减少连线数量）
                const iLayer = Math.floor(i / 20);
                const jLayer = Math.floor(j / 20);
                
                if (iLayer === jLayer && relatedNPCs[i].team === relatedNPCs[j].team) {
                    edges.push({
                        from: relatedNPCs[i].id,
                        to: relatedNPCs[j].id,
                        color: '#374151',
                        width: isMobile ? 1.5 : 1, // 更细
                        dash: [4, 3],
                        type: 'team'
                    });
                }
            }
        }
        
        // 开始动画
        if (animationId) cancelAnimationFrame(animationId);
        animateGraph();
    }
    
    // 绘制错误信息
    function drawErrorMessage(message) {
        if (!ctx) return;
        
        const cssWidth = canvas.width / (window.devicePixelRatio || 1);
        const cssHeight = canvas.height / (window.devicePixelRatio || 1);
        
        // 重置变换
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // 缩放回去
        const dpr = window.devicePixelRatio || 1;
        ctx.scale(dpr, dpr);
        
        ctx.fillStyle = '#fee2e2';
        ctx.fillRect(0, 0, cssWidth, cssHeight);
        
        // 字体缩小
        ctx.font = 'bold 14px Arial';
        ctx.fillStyle = '#dc2626';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        ctx.fillText('错误', cssWidth / 2, cssHeight / 2 - 25);
        
        ctx.font = '12px Arial';
        ctx.fillStyle = '#7f1d1d';
        ctx.fillText(message, cssWidth / 2, cssHeight / 2);
        
        ctx.font = '11px Arial';
        ctx.fillStyle = '#991b1b';
        ctx.fillText('点击刷新按钮重试', cssWidth / 2, cssHeight / 2 + 25);
    }
    
    // 绘制无关系提示
    function drawNoRelationsMessage() {
        if (!ctx) return;
        
        const cssWidth = canvas.width / (window.devicePixelRatio || 1);
        const cssHeight = canvas.height / (window.devicePixelRatio || 1);
        
        // 重置变换
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // 缩放回去
        const dpr = window.devicePixelRatio || 1;
        ctx.scale(dpr, dpr);
        
        ctx.fillStyle = '#f9fafb';
        ctx.fillRect(0, 0, cssWidth, cssHeight);
        
        // 字体缩小
        ctx.font = '14px Arial';
        ctx.fillStyle = '#6b7280';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        const messages = [
            "暂无恋人/前任关系",
            "继续探索建立关系吧！",
            "拥有恋人后会显示在这里"
        ];
        
        const startY = cssHeight / 2 - 20;
        messages.forEach((msg, index) => {
            ctx.fillText(msg, cssWidth / 2, startY + index * 25);
        });
    }
    
    // 动画循环
    function animateGraph() {
        if (!ctx || !canvas) return;
        
        const cssWidth = canvas.width / (window.devicePixelRatio || 1);
        const cssHeight = canvas.height / (window.devicePixelRatio || 1);
        
        // 重置并设置缩放
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const dpr = window.devicePixelRatio || 1;
        ctx.scale(dpr, dpr);
        
        // 绘制背景
        ctx.fillStyle = '#f9fafb';
        ctx.fillRect(0, 0, cssWidth, cssHeight);
        
        // 1. 绘制连线
        for (const edge of edges) {
            const fromNode = nodes.find(n => n.id === edge.from);
            const toNode = nodes.find(n => n.id === edge.to);
            if (!fromNode || !toNode) continue;
            
            ctx.beginPath();
            ctx.moveTo(fromNode.x, fromNode.y);
            ctx.lineTo(toNode.x, toNode.y);
            ctx.strokeStyle = edge.color;
            ctx.lineWidth = edge.width;
            
            if (edge.dash) {
                ctx.setLineDash(edge.dash);
            } else {
                ctx.setLineDash([]);
            }
            
            ctx.stroke();
            ctx.setLineDash([]);
        }
        
        // 2. 绘制节点
        for (const node of nodes) {
            // 绘制节点圆
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            
            // 悬停效果 - 拖动时不显示悬停效果
            if ((node === hoveredNode || node === selectedNode) && !isDragging) {
                ctx.shadowColor = node.color;
                ctx.shadowBlur = 12;
                ctx.fillStyle = node.color;
                ctx.fill();
                ctx.shadowBlur = 0;
                
                // 白色边框
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.radius + 1.5, 0, Math.PI * 2);
                ctx.strokeStyle = 'white';
                ctx.lineWidth = 2.5;
                ctx.stroke();
            } else {
                ctx.fillStyle = node.color;
                ctx.fill();
            }
            
            // 玩家节点特殊处理
            if (node.id === 'player') {
                // 玩家节点内圈
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.radius - 2.5, 0, Math.PI * 2);
                ctx.strokeStyle = 'white';
                ctx.lineWidth = 2.5;
                ctx.stroke();
                
                // 玩家图标 - 字体缩小
                ctx.fillStyle = 'white';
                ctx.font = isMobile ? '12px Arial' : '10px Arial';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText('👤', node.x, node.y);
            }
            
            // NPC节点显示名字
            if (node.id !== 'player') {
                const shortName = node.name.length > 4 ? node.name.substring(0, 4) + '...' : node.name;
                
                // 名字背景
                ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
                // 字体缩小
                ctx.font = isMobile ? '9px Arial' : '8px Arial';
                const textWidth = ctx.measureText(shortName).width;
                const textHeight = isMobile ? 14 : 12;
                const padding = isMobile ? 4 : 3;
                
                // 简单矩形背景
                ctx.fillRect(
                    node.x - textWidth / 2 - padding,
                    node.y + node.radius + 6,
                    textWidth + padding * 2,
                    textHeight
                );
                
                // 名字文本
                ctx.fillStyle = node.type === 'love' ? '#dc2626' : '#1d4ed8';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'top';
                ctx.fillText(shortName, node.x, node.y + node.radius + 7);
                
                // 关系标签 - 字体缩小
                const relationText = node.type === 'love' ? '恋' : '前';
                ctx.fillStyle = node.type === 'love' ? '#dc2626' : '#1d4ed8';
                ctx.font = isMobile ? '8px Arial' : '7px Arial';
                ctx.fillText(relationText, node.x, node.y + node.radius + (isMobile ? 20 : 18));
            }
        }
        
        // 3. 悬停提示 - 拖动时不显示tooltip
        if (hoveredNode && hoveredNode.id !== 'player' && !isDragging) {
            drawNodeTooltip(hoveredNode);
        }
        
        animationId = requestAnimationFrame(animateGraph);
    }
    
    // 绘制节点提示
    function drawNodeTooltip(node) {
        if (isDragging) return;
        
        const npc = npcData[node.id];
        if (!npc) return;
        
        const cssWidth = canvas.width / (window.devicePixelRatio || 1);
        const tooltipWidth = isMobile ? 140 : 120;
        const tooltipHeight = isMobile ? 70 : 60;
        const fontSize = isMobile ? 12 : 11;
        const lineHeight = isMobile ? 14 : 13;
        
        let x = node.x + 20;
        let y = node.y - tooltipHeight - 15;
        
        if (x + tooltipWidth > cssWidth) x = node.x - tooltipWidth - 20;
        if (y < 0) y = node.y + 20;
        
        // 背景
        ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
        // 圆角矩形
        const cornerRadius = 6;
        ctx.beginPath();
        ctx.moveTo(x + cornerRadius, y);
        ctx.lineTo(x + tooltipWidth - cornerRadius, y);
        ctx.quadraticCurveTo(x + tooltipWidth, y, x + tooltipWidth, y + cornerRadius);
        ctx.lineTo(x + tooltipWidth, y + tooltipHeight - cornerRadius);
        ctx.quadraticCurveTo(x + tooltipWidth, y + tooltipHeight, x + tooltipWidth - cornerRadius, y + tooltipHeight);
        ctx.lineTo(x + cornerRadius, y + tooltipHeight);
        ctx.quadraticCurveTo(x, y + tooltipHeight, x, y + tooltipHeight - cornerRadius);
        ctx.lineTo(x, y + cornerRadius);
        ctx.quadraticCurveTo(x, y, x + cornerRadius, y);
        ctx.closePath();
        ctx.fill();
        
        // 边框
        ctx.strokeStyle = node.color;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        
        // 文本 - 字体缩小
        ctx.fillStyle = 'white';
        ctx.font = `bold ${fontSize}px Arial`;
        ctx.textAlign = 'left';
        
        const lines = [
            `名字: ${npc.name}`,
            `关系: ${node.type === 'love' ? '恋人' : '前任'}`,
            `战队: ${teamConfig[npc.team]?.name || npc.team}`,
            `好感: ${npc.gameState.favor || 0}/120`
        ];
        
        lines.forEach((line, i) => {
            ctx.fillText(line, x + 8, y + 12 + i * lineHeight);
        });
    }
    
    // ========== 事件处理 ==========
    
    // 获取正确的canvas坐标
    function getCanvasCoordinates(clientX, clientY) {
        if (!canvas) return { x: 0, y: 0 };
        
        const rect = canvas.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        
        // 转换为CSS坐标（考虑缩放）
        const x = (clientX - rect.left) * (canvas.width / rect.width) / dpr;
        const y = (clientY - rect.top) * (canvas.height / rect.height) / dpr;
        
        return { x, y };
    }
    
    function handleMouseDown(event) {
        console.log('【鼠标】按下');
        const coords = getCanvasCoordinates(event.clientX, event.clientY);
        startDrag(coords.x, coords.y);
    }
    
    function handleMouseMove(event) {
        const coords = getCanvasCoordinates(event.clientX, event.clientY);
        if (!isDragging) {
            updateHover(coords.x, coords.y);
        }
        if (isDragging && selectedNode) {
            updateDrag(coords.x, coords.y);
        }
    }
    
    function handleMouseUp() {
        endDrag();
    }
    
    function handleClick(event) {
        // 如果正在拖动，不触发点击事件
        if (isDragging) {
            isDragging = false;
            selectedNode = null;
            return;
        }
        
        const coords = getCanvasCoordinates(event.clientX, event.clientY);
        
        // 查找点击的节点
        for (const node of nodes) {
            if (node.id === 'player') continue;
            
            const distance = Math.sqrt(Math.pow(coords.x - node.x, 2) + Math.pow(coords.y - node.y, 2));
            if (distance <= node.radius) {
                showNPCInfo(node.id);
                break;
            }
        }
    }
    
    function handleMouseLeave() {
        hoveredNode = null;
        if (canvas) {
            canvas.style.cursor = 'default';
        }
        endDrag();
    }
    
    // ========== 触摸事件处理 ==========
    
    function handleTouchStart(event) {
        console.log('【触摸】开始');
        event.preventDefault();
        
        if (event.touches.length === 1) {
            const touch = event.touches[0];
            const coords = getCanvasCoordinates(touch.clientX, touch.clientY);
            startDrag(coords.x, coords.y);
        }
    }
    
    function handleTouchMove(event) {
        event.preventDefault();
        
        if (event.touches.length === 1 && isDragging) {
            const touch = event.touches[0];
            const coords = getCanvasCoordinates(touch.clientX, touch.clientY);
            updateDrag(coords.x, coords.y);
        }
    }
    
    function handleTouchEnd(event) {
        console.log('【触摸】结束');
        event.preventDefault();
        
        if (!isDragging && event.changedTouches.length === 1) {
            // 这是点击，不是拖动
            const touch = event.changedTouches[0];
            const coords = getCanvasCoordinates(touch.clientX, touch.clientY);
            
            // 查找点击的节点
            for (const node of nodes) {
                if (node.id === 'player') continue;
                
                const distance = Math.sqrt(Math.pow(coords.x - node.x, 2) + Math.pow(coords.y - node.y, 2));
                if (distance <= node.radius) {
                    showNPCInfo(node.id);
                    break;
                }
            }
        }
        
        endDrag();
    }
    
    function handleTouchCancel(event) {
        console.log('【触摸】取消');
        endDrag();
    }
    
    // ========== 通用拖动函数 ==========
    
    function startDrag(clientX, clientY) {
        if (!canvas) return;
        
        for (const node of nodes) {
            if (!node.draggable) continue;
            
            const distance = Math.sqrt(Math.pow(clientX - node.x, 2) + Math.pow(clientY - node.y, 2));
            if (distance <= node.radius) {
                selectedNode = node;
                isDragging = true;
                dragOffsetX = clientX - node.x;
                dragOffsetY = clientY - node.y;
                
                canvas.style.cursor = 'grabbing';
                console.log(`开始拖动: ${node.name}`);
                break;
            }
        }
    }
    
    function updateDrag(clientX, clientY) {
        if (!isDragging || !selectedNode || !canvas) return;
        
        const cssWidth = canvas.width / (window.devicePixelRatio || 1);
        const cssHeight = canvas.height / (window.devicePixelRatio || 1);
        
        // 更新节点位置
        selectedNode.x = clientX - dragOffsetX;
        selectedNode.y = clientY - dragOffsetY;
        
        // 限制在画布范围内
        selectedNode.x = Math.max(selectedNode.radius, Math.min(cssWidth - selectedNode.radius, selectedNode.x));
        selectedNode.y = Math.max(selectedNode.radius, Math.min(cssHeight - selectedNode.radius, selectedNode.y));
        
        // 拖动时清除hoveredNode，避免tooltip出现
        hoveredNode = null;
    }
    
    function updateHover(clientX, clientY) {
        if (!canvas || isDragging) return;
        
        // 检查悬停
        let newHovered = null;
        for (const node of nodes) {
            const distance = Math.sqrt(Math.pow(clientX - node.x, 2) + Math.pow(clientY - node.y, 2));
            if (distance <= node.radius) {
                newHovered = node;
                break;
            }
        }
        
        // 更新悬停节点
        if (hoveredNode !== newHovered) {
            hoveredNode = newHovered;
            canvas.style.cursor = hoveredNode && hoveredNode.draggable ? 'grab' : 'default';
        }
    }
    
    function endDrag() {
        if (isDragging) {
            console.log('结束拖动');
            if (canvas) {
                canvas.style.cursor = hoveredNode && hoveredNode.draggable ? 'grab' : 'default';
            }
        }
        
        isDragging = false;
        selectedNode = null;
    }
    
    // 显示NPC信息
    function showNPCInfo(npcId) {
        const npc = npcData[npcId];
        if (!npc) return;
        
        Swal.fire({
            title: npc.name,
            html: `
                <div style="text-align: left; font-size: ${isMobile ? '14px' : '13px'}">
                    <p><strong>战队：</strong>${teamConfig[npc.team]?.name || npc.team}</p>
                    <p><strong>关系：</strong><span style="color: ${npc.gameState.love ? '#ef4444' : '#3b82f6'}">
                        ${npc.gameState.love ? '恋人' : '前任'}
                    </span></p>
                    <p><strong>好感度：</strong>${npc.gameState.favor || 0}/120</p>
                </div>
            `,
            icon: false,
            showCancelButton: true,
            confirmButtonText: '查看详情',
            cancelButtonText: '关闭',
            background: '#f0f9ff',
            width: isMobile ? '280px' : '260px'
        }).then((result) => {
            if (result.isConfirmed) {
                showTab('favor');
            }
        });
    }
    
    // 自动监听关系图页签显示
    function setupTabListener() {
        // 监听所有可能触发页签切换的事件
        document.addEventListener('click', function(e) {
            const tabBtn = e.target.closest('.home-tab');
            if (!tabBtn) return;
            
            const tabText = tabBtn.textContent || tabBtn.innerText;
            if (tabText.includes('关系图')) {
                // 稍后初始化，确保DOM已更新
                setTimeout(() => {
                    if (typeof window.initRelationGraph === 'function') {
                        window.initRelationGraph();
                    }
                }, 100);
            }
        });
        
        // 监听窗口大小变化
        window.addEventListener('resize', function() {
            if (typeof window.initRelationGraph === 'function') {
                setTimeout(window.initRelationGraph, 100);
            }
        });
    }
    
    // 页面加载后设置监听
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupTabListener);
    } else {
        setupTabListener();
    }
    
    console.log('关系图系统初始化完成，等待页签切换...');
})();