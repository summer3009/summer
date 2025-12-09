// npc-events.js
// NPC事件查看功能 - 简化版

// 获取特定NPC的事件记录（简化的匹配逻辑）
function getNpcEvents(npcId) {
    const npc = npcData[npcId];
    if (!npc || !gameData.events) return [];
    
    // 只做简单的名字匹配
    return gameData.events.filter(event => {
        const content = event.content || '';
        return content.includes(npc.name);
    }).sort((a, b) => b.day - a.day);
}

// 显示NPC事件模态框（和总事件一样的样式）
function showNpcEventsModal(npcId) {
    const npc = npcData[npcId];
    const events = getNpcEvents(npcId);
    
    // 创建模态框HTML - 和总事件一样的样式
    const modalHtml = `
        <div class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div class="bg-white rounded-xl w-full max-w-md max-h-[80vh] flex flex-col">
                <!-- 标题栏 -->
                <div class="p-4 border-b border-gray-200 flex items-center justify-between">
                    <div class="flex items-center">
                        <div class="w-10 h-10 rounded-full ${npc.bgColor} ${npc.borderColor} flex items-center justify-center mr-3">
                            <i class="fa fa-user ${npc.textColor}"></i>
                        </div>
                        <div>
                            <h3 class="font-bold text-lg">${npc.name}的事件记录</h3>
                            <p class="text-sm text-gray-500">共${events.length}条记录</p>
                        </div>
                    </div>
                    <button class="close-npc-modal text-gray-500 hover:text-gray-700">
                        <i class="fa fa-times"></i>
                    </button>
                </div>
                
                <!-- 事件列表 - 和总事件完全一样的样式 -->
                <div class="flex-1 overflow-y-auto p-4">
                    ${events.length === 0 ? 
                        `<div class="text-center text-gray-500 py-8">
                            <i class="fa fa-calendar-times text-3xl mb-2"></i>
                            <p>暂无事件记录</p>
                        </div>` :
                        events.map(event => `
                            <div class="mb-4 pb-4 border-b border-gray-100 last:border-0">
                                <div class="text-xs text-gray-500 mb-1">第${event.day}天</div>
                                <div class="text-sm">${event.content}</div>
                            </div>
                        `).join('')
                    }
                </div>
                
                <!-- 底部按钮 -->
                <div class="p-4 border-t border-gray-200">
                    <button class="close-npc-modal w-full py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                        关闭
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // 添加到页面
    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = modalHtml;
    document.body.appendChild(modalContainer);
    
    // 绑定关闭事件
    setTimeout(() => {
        const closeButtons = modalContainer.querySelectorAll('.close-npc-modal');
        closeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                modalContainer.remove();
            });
        });
        
        // 点击背景关闭
        modalContainer.addEventListener('click', (e) => {
            if (e.target === modalContainer) {
                modalContainer.remove();
            }
        });
    }, 10);
}

// 为好感列表添加点击事件（使用事件委托）
function initNpcEventsClick() {
    console.log('初始化NPC事件点击功能...');
    
    // 监听家页面的点击事件
    const homePage = document.getElementById('homePage');
    if (!homePage) return;
    
    // 使用事件委托
    homePage.addEventListener('click', function(e) {
        // 找到被点击的好感列表项
        const favorItem = e.target.closest('.favor-item');
        if (!favorItem) return;
        
        // 排除聊天按钮
        if (e.target.closest('.chat-btn')) return;
        
        // 找到npcId（从聊天按钮的data-id获取）
        const chatBtn = favorItem.querySelector('.chat-btn');
        if (!chatBtn) return;
        
        const npcId = chatBtn.dataset.id;
        if (!npcId) return;
        
        // 检查是否已解锁
        if (!gameData.unlockedCharacters || !gameData.unlockedCharacters.includes(npcId)) {
            console.log('角色未解锁');
            return;
        }
        
        // 显示该NPC的事件
        showNpcEventsModal(npcId);
    });
}

// 页面加载后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        // 延迟初始化，确保updateHomePage已执行
        setTimeout(initNpcEventsClick, 1500);
    });
} else {
    // 文档已加载完成
    setTimeout(initNpcEventsClick, 1500);
}

// 测试函数
function testNpcEvents() {
    console.log('=== NPC事件测试 ===');
    const testIds = ['yexiu', 'chenguo', 'wangjiexi'];
    
    testIds.forEach(id => {
        if (npcData[id]) {
            const events = getNpcEvents(id);
            console.log(`${npcData[id].name}: ${events.length}条事件`);
        }
    });
}