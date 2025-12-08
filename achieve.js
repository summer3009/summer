/**********************
 * 成就系统
 */

// 成就配置 - 所有成就一旦解锁就永久保留
const achievementsConfig = [
    // 恋爱成就
    {
        id: 'first_love',
        title: '初恋的味道',
        description: () => {
            if (gameData.events) {
                const sortedEvents = [...gameData.events].sort((a, b) => a.day - a.day);
                
                for (const event of sortedEvents) {
                    if (event.content && event.content.includes('成为了恋人')) {
                        if (event.npcId && npcData[event.npcId]) {
                            return `获得第一个恋人：${npcData[event.npcId].name}（第${event.day}天）`;
                        }
                        
                        const match = event.content.match(/^(.+?)向/);
                        if (match && match[1]) {
                            return `获得第一个恋人：${match[1].trim()}（第${event.day}天）`;
                        }
                        return `获得第一个恋人（第${event.day}天）`;
                    }
                }
            }
            return '获得第一个恋人';
        },
        icon: 'fa-heart',
        color: 'bg-pink-100 text-pink-600 border-pink-200',
        condition: () => {
            if (gameData.events) {
                for (const event of gameData.events) {
                    if (event.content && event.content.includes('成为了恋人')) {
                        return true;
                    }
                }
            }
            return false;
        },
        points: 10,
        type: 'love'
    },
    {
        id: 'love_master',
        title: '情场高手',
        description: () => {
            const lovers = [];
            for (const id in npcData) {
                if (npcData[id].gameState && npcData[id].gameState.love === true) {
                    lovers.push(npcData[id].name);
                }
            }
            if (lovers.length >= 5) {
                return `同时拥有${lovers.length}/5个恋人：${lovers.slice(0, 3).join('、')}${lovers.length > 3 ? '等' : ''}`;
            }
            return '同时拥有5个恋人';
        },
        icon: 'fa-heartbeat',
        color: 'bg-red-100 text-red-600 border-red-200',
        condition: () => {
            let loveCount = 0;
            for (const id in npcData) {
                if (npcData[id].gameState && npcData[id].gameState.love === true) {
                    loveCount++;
                }
            }
            return loveCount >= 5;  // 5/78 ≈ 6%
        },
        points: 30,
        type: 'love'
    },
    {
        id: 'harem_king',
        title: '后宫之王',
        description: () => {
            const lovers = [];
            for (const id in npcData) {
                if (npcData[id].gameState && npcData[id].gameState.love === true) {
                    lovers.push(npcData[id].name);
                }
            }
            if (lovers.length >= 15) {
                return `同时拥有${lovers.length}/15个恋人：${lovers.slice(0, 3).join('、')}等`;
            }
            return '同时拥有15个恋人';
        },
        icon: 'fas fa-chess-queen',
        color: 'bg-purple-100 text-purple-600 border-purple-200',
        condition: () => {
            let loveCount = 0;
            for (const id in npcData) {
                if (npcData[id].gameState && npcData[id].gameState.love === true) {
                    loveCount++;
                }
            }
            return loveCount >= 15;  // 15/78 ≈ 19%
        },
        points: 80,
        type: 'love'
    },
    {
        id: 'faithful_lover',
        title: '一心一意',
        description: () => {
            let loveCount = 0;
            let currentLoverId = null;
            
            for (const id in npcData) {
                if (npcData[id].gameState && npcData[id].gameState.love === true) {
                    loveCount++;
                    currentLoverId = id;
                }
            }
            
            if (loveCount !== 1 || !currentLoverId) {
                return '只拥有一个恋人并维持50天';
            }
            
            let latestBecameLoverDay = 0;
            if (gameData.events) {
                for (const event of gameData.events) {
                    if (event.content && 
                        (event.content.includes('成为了恋人') || 
                         event.content.includes('复合，你们重新成为恋人')) && 
                        event.npcId === currentLoverId) {
                        
                        if (event.day > latestBecameLoverDay) {
                            latestBecameLoverDay = event.day;
                        }
                    }
                }
            }
            
            if (latestBecameLoverDay > 0) {
                const daysTogether = gameData.day - latestBecameLoverDay;
                const loverName = npcData[currentLoverId].name;
                return `只拥有一个恋人${loverName}并维持${daysTogether}天`;
            }
            
            return '只拥有一个恋人并维持50天';
        },
        icon: 'fa-dove',
        color: 'bg-blue-100 text-blue-600 border-blue-200',
        condition: () => {
            let loveCount = 0;
            let currentLoverId = null;
            
            for (const id in npcData) {
                if (npcData[id].gameState && npcData[id].gameState.love === true) {
                    loveCount++;
                    currentLoverId = id;
                    if (loveCount > 1) return false;
                }
            }
            
            if (loveCount !== 1 || !currentLoverId) return false;
            
            let latestBecameLoverDay = 0;
            if (gameData.events) {
                for (const event of gameData.events) {
                    if (event.content && 
                        (event.content.includes('成为了恋人') || 
                         event.content.includes('复合，你们重新成为恋人')) && 
                        event.npcId === currentLoverId) {
                        
                        if (event.day > latestBecameLoverDay) {
                            latestBecameLoverDay = event.day;
                        }
                    }
                }
            }
            
            return latestBecameLoverDay > 0 && (gameData.day - latestBecameLoverDay) >= 50;  // 50天
        },
        points: 40,
        type: 'love'
    },
    {
        id: 'breakup_expert',
        title: '分手大师',
        description: () => {
            const exLovers = [];
            for (const id in npcData) {
                if (npcData[id].gameState && npcData[id].gameState.ex === true) {
                    exLovers.push(npcData[id].name);
                }
            }
            if (exLovers.length >= 10) {
                return `有${exLovers.length}个前任：${exLovers.slice(0, 3).join('、')}${exLovers.length > 3 ? '等' : ''}`;
            }
            return '有10个前任';
        },
        icon: 'fa-heart-broken',
        color: 'bg-gray-100 text-gray-600 border-gray-200',
        condition: () => {
            let exCount = 0;
            for (const id in npcData) {
                if (npcData[id].gameState && npcData[id].gameState.ex === true) {
                    exCount++;
                }
            }
            return exCount >= 10;  // 10/78 ≈ 13%
        },
        points: 35,
        type: 'love'
    },
    {
        id: 'love_all_around',
        title: '博爱众生',
        description: () => {
            const exLovers = [];
            for (const id in npcData) {
                if (npcData[id].gameState && npcData[id].gameState.ex === true) {
                    exLovers.push(npcData[id].name);
                }
            }
            if (exLovers.length >= 30) {
                return `有${exLovers.length}个前任：${exLovers.slice(0, 3).join('、')}等`;
            }
            return '有30个前任';
        },
        icon: 'fas fa-hand-holding-heart',
        color: 'bg-rose-100 text-rose-600 border-rose-200',
        condition: () => {
            let exCount = 0;
            for (const id in npcData) {
                if (npcData[id].gameState && npcData[id].gameState.ex === true) {
                    exCount++;
                }
            }
            return exCount >= 30;  // 30/78 ≈ 38%
        },
        points: 100,
        type: 'love'
    },
    
    // 社交成就
    {
    id: 'social_legend',
    title: '社交传奇',
    description: () => {
        const unlockedCount = gameData.unlockedCharacters ? gameData.unlockedCharacters.length : 0;
        const totalNPCs = Object.keys(npcData).length;
        return `解锁${unlockedCount}/${totalNPCs}个角色（解锁全部角色）`;
    },
    icon: 'fa-crown',
    color: 'bg-amber-100 text-amber-600 border-amber-200',
    condition: () => {
        const totalNPCs = Object.keys(npcData).length;
        return gameData.unlockedCharacters && gameData.unlockedCharacters.length >= totalNPCs;
    },
    points: 150,
    type: 'social'
},
    
    {
    id: 'social_master',
    title: '社交大师',
    description: () => {
        const unlockedCount = gameData.unlockedCharacters ? gameData.unlockedCharacters.length : 0;
        const totalNPCs = Object.keys(npcData).length;
        return `解锁${unlockedCount}/50个角色`;
    },
    icon: 'fa-handshake', // 握手图标（更高级）
    color: 'bg-emerald-100 text-emerald-600 border-emerald-200',
    condition: () => {
        return gameData.unlockedCharacters && gameData.unlockedCharacters.length >= 50; // 50/78 ≈ 64%
    },
    points: 75,
    type: 'social'
},


    {
        id: 'friend_maker',
        title: '社交达人',
        description: () => {
            const unlockedCount = gameData.unlockedCharacters ? gameData.unlockedCharacters.length : 0;
            return `解锁${unlockedCount}/30个角色`;
        },
        icon: 'fa-handshake-o',
        color: 'bg-teal-100 text-teal-600 border-teal-200',
        condition: () => {
            return gameData.unlockedCharacters && gameData.unlockedCharacters.length >= 30;  // 30/78 ≈ 38%
        },
        points: 50,
        type: 'social'
    },
    {
    id: 'master_introducer',
    title: '交朋结友',
    description: () => {
        let introCount = 0;
        if (gameData.introHistory) {
            for (const npcId in gameData.introHistory) {
                const introList = gameData.introHistory[npcId];
                for (const targetId in introList) {
                    if (introList[targetId]) introCount++;
                }
            }
        }
        return `解锁${introCount}/15个新角色`;
    },
    icon: 'fa-user-plus',
    color: 'bg-cyan-100 text-cyan-600 border-cyan-200',
    condition: () => {
        let introCount = 0;
        if (gameData.introHistory) {
            for (const npcId in gameData.introHistory) {
                const introList = gameData.introHistory[npcId];
                for (const targetId in introList) {
                    if (introList[targetId]) introCount++;
                }
            }
        }
        return introCount >= 15;
    },
    points: 45,
    type: 'social'
},
  {
        id: 'social_butterfly',
        title: '纵横联盟',
        description: () => {
            const totalScenes = 16;
            const unlockedCount = gameData.unlockedScenes ? gameData.unlockedScenes.length : 0;
            return `解锁${unlockedCount}/${totalScenes}个场景`;
        },
        icon: 'fa-users',
        color: 'bg-green-100 text-green-600 border-green-200',
        condition: () => {
            return gameData.unlockedScenes && gameData.unlockedScenes.length >= 16;
        },
        points: 60,
        type: 'social'
    },
    {
    id: 'map_explorer',
    title: '漫步地图',
    description: () => {
        const totalScenes = 10;
        const unlockedCount = gameData.unlockedScenes ? gameData.unlockedScenes.length : 0;
        return `解锁${unlockedCount}/${totalScenes}个场景`;
    },
    icon: 'fa-map-signs',
    color: 'bg-indigo-100 text-indigo-600 border-indigo-200',
    condition: () => {
        return gameData.unlockedScenes && gameData.unlockedScenes.length >= 10;
    },
    points: 45,
    type: 'social'
},
    // 探索成就
    {
        id: 'explorer',
        title: '探索者',
        description: () => `游戏天数：${gameData.day}/100天`,
        icon: 'fa-calendar',
        color: 'bg-orange-100 text-orange-600 border-orange-200',
        condition: () => gameData.day >= 100,
        points: 30,
        type: 'explore'
    },
    {
        id: 'veteran',
        title: '荣耀老兵',
        description: () => `游戏天数：${gameData.day}/500天`,
        icon: 'fas fa-ribbon',
        color: 'bg-amber-100 text-amber-600 border-amber-200',
        condition: () => gameData.day >= 500,
        points: 80,
        type: 'explore'
    },
    {
        id: 'legend',
        title: '资深玩家',
        description: () => `游戏天数：${gameData.day}/2000天`,
        icon: 'fas fa-medal',
        color: 'bg-yellow-100 text-yellow-600 border-yellow-200',
        condition: () => gameData.day >= 2000,
        points: 200,
        type: 'explore'
    },
    
    
    
    // 特殊成就
    {
        id: 'jealousy_survivor',
        title: '修罗场幸存者',
        description: '经历一次5人以上修罗场',
        icon: 'fa-fire',
        color: 'bg-red-100 text-red-600 border-red-200',
        condition: () => {
            if (gameData.events) {
                for (const event of gameData.events) {
                    if (event.content && 
                        (
                         event.content.includes('史诗级修罗场'))) {
                        return true;
                    }
                }
            }
            return false;
        },
        points: 50,
        type: 'special'
    },
    {
        id: 'perfect_lover',
        title: '好感爆表',
        description: () => {
            const perfectLovers = [];
            for (const id in npcData) {
                if (npcData[id].gameState && npcData[id].gameState.favor >= 120) {
                    perfectLovers.push(npcData[id].name);
                }
            }
            if (perfectLovers.length > 0) {
                return `有${perfectLovers.length}/1个角色好感度达到120：${perfectLovers.slice(0, 3).join('、')}${perfectLovers.length > 3 ? '等' : ''}`;
            }
            return '有角色好感度达到120';
        },
       icon: 'fa-diamond',
        color: 'bg-pink-100 text-pink-600 border-pink-200',
        condition: () => {
            for (const id in npcData) {
                if (npcData[id].gameState && npcData[id].gameState.favor >= 120) {
                    return true;
                }
            }
            return false;
        },
        points: 60,
        type: 'special'
    },
{
    id: 'perfect_hater',
    title: '爱的背面',
    description: () => {
        const perfectHaters = [];
        for (const id in npcData) {
            const npc = npcData[id];
            if (npc.gameState && 
                npc.gameState.ex === true && // 是前任
                npc.gameState.favor <= 0) {  // 并且好感度 <= 0
                perfectHaters.push(npc.name);
            }
        }
        if (perfectHaters.length > 0) {
            return `有${perfectHaters.length}个前任好感度为0或更低：${perfectHaters.slice(0, 3).join('、')}${perfectHaters.length > 3 ? '等' : ''}`;
        }
        return '有前任的好感度为0或更低';
    },
    icon: 'fa-user-times',
    color: 'bg-pink-100 text-pink-600 border-pink-200',
    condition: () => {
        for (const id in npcData) {
            const npc = npcData[id];
            if (npc.gameState && 
                npc.gameState.ex === true && // 是前任
                npc.gameState.favor <= 0) {  // 并且好感度 <= 0
                return true;
            }
        }
        return false;
    },
    points: 60,
    type: 'special'
},

    {
        id: 'eternal_bachelor',
        title: '单身贵族',
        description: () => {
            let loveCount = 0;
            for (const id in npcData) {
                if (npcData[id].gameState && npcData[id].gameState.love === true) {
                    loveCount++;
                }
            }
            const status = loveCount === 0 && gameData.day >= 200 ? '✓' : '';
            return `游戏200天仍没有恋人${status}`;
        },
        icon: 'fas fa-wine-glass-alt',
        color: 'bg-gray-100 text-gray-600 border-gray-200',
        condition: () => {
            let loveCount = 0;
            for (const id in npcData) {
                if (npcData[id].gameState && npcData[id].gameState.love === true) {
                    loveCount++;
                }
            }
            return loveCount === 0 && gameData.day >= 200;  // 200天
        },
        points: 60,
        type: 'special'
    },
  
  {
    id: 'irresistible_charm',
    title: '魅不可挡',
    description: () => {
        // 先检查是否达标（调用condition逻辑）
        const loveEvents = [];
        if (gameData.events) {
            for (const event of gameData.events) {
                if (event.content && event.content.includes('成为了恋人')) {
                    loveEvents.push(event);
                }
            }
        }
        
        loveEvents.sort((a, b) => a.day - b.day);
        
        //alert(loveEvents.length+"---"+loveEvents[9].day);
        
        // 判断是否达标
        const isQualified = loveEvents.length >= 10 && loveEvents[9].day <= 500;
        
        // 如果达标，显示具体信息
        if (isQualified) {
            const tenthEvent = loveEvents[9];
            return `第${tenthEvent.day}/500天获得10个恋人 ✓`;
        } 
        // 不达标，不显示进度
        else {
            return '成就未解锁';
        }
    },
    icon: 'fa-bolt',
    color: 'bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-600 border-orange-200',
    condition: () => {
        // 收集所有成为恋人的事件并按日期排序
        
     //  alert("66"); 
        const loveEvents = [];
        if (gameData.events) {
            for (const event of gameData.events) {
                if (event.content && event.content.includes('成为了恋人')) {
                    loveEvents.push(event);
                }
            }
        }
        
        // 按日期排序
        loveEvents.sort((a, b) => a.day - b.day);
//alert(loveEvents.length);
// alert(loveEvents[9].day);
        
        
        // 检查是否有至少10个事件，且第10个事件的日期在500天内
        if (loveEvents.length >= 10) {
            const tenthEvent = loveEvents[9];
            return tenthEvent.day <= 500;
        }
        
        return false;
    },
    points: 120,
    type: 'special'
},
  
{
    id: 'league_celebrity',
    title: '全明星阵容',
    description: () => {
        const totalScenes = 16;
        const totalNPCs = Object.keys(npcData).length;
        return `解锁所有${totalScenes}个场景且${totalNPCs}个角色全为恋人`;
    },
    icon: 'fas fa-trophy',
    color: 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-600 border-purple-200',
    condition: () => {
        // 检查场景
        const totalScenes = 16;
        if (!gameData.unlockedScenes || gameData.unlockedScenes.length < totalScenes) {
            return false;
        }
        
        // 检查所有NPC是否都是恋人
        for (const id in npcData) {
            if (!npcData[id].gameState || npcData[id].gameState.love !== true) {
                return false;
            }
        }
        
        return true;
    },
    points: 300,
    type: 'special'
}
];

// 成就数据存储
let achievementsData = {
    unlocked: [], // 已解锁的成就ID数组
    points: 0,    // 总成就点数
    lastChecked: 0 // 上次检查的时间戳
};

// 初始化成就数据
function initAchievements() {
    console.log('初始化成就数据...');
    
    // 尝试从本地存储加载
    const savedAchievements = localStorage.getItem('honor_achievements');
    if (savedAchievements) {
        try {
            achievementsData = JSON.parse(savedAchievements);
            console.log('从存储加载成就数据:', achievementsData);
        } catch (e) {
            console.error('加载成就数据失败，使用默认值:', e);
            achievementsData = {
                unlocked: [],
                points: 0,
                lastChecked: new Date().getTime()
            };
        }
    } else {
        achievementsData = {
            unlocked: [],
            points: 0,
            lastChecked: new Date().getTime()
        };
    }
    
    // 确保数据结构完整
    if (!Array.isArray(achievementsData.unlocked)) {
        achievementsData.unlocked = [];
    }
    if (typeof achievementsData.points !== 'number') {
        achievementsData.points = 0;
    }
    
    // 更新游戏数据中的成就
    gameData.achievements = achievementsData;
    
    console.log('成就初始化完成，已解锁:', achievementsData.unlocked.length, '个成就');
}

// 检查并更新成就
function checkAchievements() {
    if (!achievementsData || !achievementsData.unlocked) {
        initAchievements();
    }
    
    let newAchievements = [];
    let totalPoints = achievementsData.points;
    
    // 检查每个成就
    achievementsConfig.forEach(achievement => {
        // 如果已经解锁，跳过
        if (achievementsData.unlocked.includes(achievement.id)) {
            return;
        }
        
        // 检查条件
        try {
            if (achievement.condition()) {
                // 解锁成就
                achievementsData.unlocked.push(achievement.id);
                totalPoints += achievement.points;
                newAchievements.push(achievement);                
                console.log(`🎉 解锁成就: ${achievement.title}`);               
             
            }
        } catch (e) {
            console.error(`检查成就 ${achievement.id} 时出错:`, e);
        }
    });
    
    // 更新点数
    achievementsData.points = totalPoints;
    achievementsData.lastChecked = new Date().getTime();
    
    // 保存到本地存储
    saveAchievements();
    
    // 如果有新成就，更新显示
    if (newAchievements.length > 0) {
        console.log(`解锁了 ${newAchievements.length} 个新成就`);
        
        // 如果当前在成就页面，更新显示
        if (document.getElementById('achievementCard') && 
            document.getElementById('achievementCard').classList.contains('active')) {
            updateAchievementsDisplay();
        }
    }
    
    return newAchievements.length;
}

// 保存成就数据
function saveAchievements() {
    try {
        localStorage.setItem('honor_achievements', JSON.stringify(achievementsData));
        // 同时更新游戏数据
        gameData.achievements = achievementsData;
    } catch (e) {
        console.error('保存成就数据失败:', e);
    }
}

// 更新成就显示
function updateAchievementsDisplay() {
    const container = document.getElementById('achievementsList');
    const progressEl = document.getElementById('achievementProgress');
    const pointsEl = document.getElementById('totalPoints');
    
    if (!container) return;
    
    // 更新统计
    const unlockedCount = achievementsData.unlocked.length;
    const totalCount = achievementsConfig.length;
    progressEl.textContent = `${unlockedCount}/${totalCount}`;
    pointsEl.textContent = achievementsData.points;
    
    // 清空容器
    container.innerHTML = '';
    
    // 按类别分组显示
    const categories = {
        love: { title: '💖 恋爱成就', achievements: [] },
        social: { title: '👥 社交成就', achievements: [] },
        explore: { title: '🗺️ 探索成就', achievements: [] },
        special: { title: '⭐ 特殊成就', achievements: [] }
    };
    
    // 分组成就
    achievementsConfig.forEach(achievement => {
        if (categories[achievement.type]) {
            categories[achievement.type].achievements.push(achievement);
        }
    });
    
    // 渲染每个类别
    Object.values(categories).forEach(category => {
        if (category.achievements.length === 0) return;
        
        // 创建类别标题
        const categoryTitle = document.createElement('div');
        categoryTitle.className = 'font-bold text-gray-700 mb-2 flex items-center';
        categoryTitle.textContent = category.title;
        container.appendChild(categoryTitle);
        
        // 渲染该类别下的所有成就
       // 在 updateAchievementsDisplay 函数中修改这部分
category.achievements.forEach(achievement => {
    const isUnlocked = achievementsData.unlocked.includes(achievement.id);
    
    // 获取描述文本 - 重要：如果是函数就调用它
    let descriptionText;
    if (isUnlocked) {
        if (typeof achievement.description === 'function') {
            // 调用函数获取描述
            descriptionText = achievement.description();
        } else {
            // 直接使用字符串
            descriptionText = achievement.description;
        }
    } else {
        descriptionText = '成就未解锁';
    }
    
    const achievementEl = document.createElement('div');
    achievementEl.className = `achievement-item mb-3 p-3 rounded-lg border ${isUnlocked ? 
        `${achievement.color} border-l-4` : 
        'bg-gray-50 border-gray-200 opacity-60'}`;
    
    achievementEl.innerHTML = `
        <div class="flex items-center">
            <div class="w-10 h-10 rounded-full ${isUnlocked ? achievement.color.split(' ')[0] : 'bg-gray-200'} 
                flex items-center justify-center mr-3">
                <i class="fa ${achievement.icon} ${isUnlocked ? achievement.color.split(' ')[1] : 'text-gray-400'}"></i>
            </div>
            <div class="flex-1">
                <div class="flex justify-between items-center mb-1">
                    <span class="font-bold ${isUnlocked ? 'text-gray-800' : 'text-gray-500'}">
                        ${isUnlocked ? achievement.title : '？？？'}
                    </span>
                    <span class="text-sm font-bold ${isUnlocked ? 'text-yellow-600' : 'text-gray-400'}">
                        +${achievement.points}
                    </span>
                </div>
                <div class="text-xs ${isUnlocked ? 'text-gray-600' : 'text-gray-400'}">
                    ${descriptionText}
                </div>
                ${isUnlocked ? '' : '<div class="text-xs text-gray-300 mt-1">隐藏成就</div>'}
            </div>
            <i class="fa ${isUnlocked ? 'fa-check-circle text-green-500' : 'fa-lock text-gray-400'} ml-2"></i>
        </div>
    `;
    
    container.appendChild(achievementEl);
});
        
        // 添加分隔线
        const divider = document.createElement('div');
        divider.className = 'h-px bg-gray-200 my-4';
        container.appendChild(divider);
    });
    
    // 如果没有成就，显示提示
    if (achievementsData.unlocked.length === 0) {
        container.innerHTML = `
            <div class="text-center py-8 text-gray-500">
                <i class="fa fa-trophy text-3xl mb-3 text-gray-300"></i>
                <p class="text-sm">还没有获得任何成就</p>
                <p class="text-xs mt-1">继续游戏解锁成就吧！</p>
            </div>
        `;
    }
}


// 重启游戏时重置成就（可选）
function restartGame0000() {
    if (confirm('确定要重新开始游戏吗？当前未保存的进度将会丢失。')) {
        console.log('重启游戏...');
        
        // ... 现有重置代码 ...
        
        // 重置成就数据
        achievementsData = {
            unlocked: [],
            points: 0,
            lastChecked: new Date().getTime()
        };
        saveAchievements();
        
        // ... 现有重置代码 ...
    }
}