// 初始化场景交互 - 重新设计介绍系统
function initSceneInteraction(scene) {
    resetScenePanels();
    // 确保关键数据结构存在
    gameData.lastIntimateDay = gameData.lastIntimateDay || {};
    gameData.lastConfessDay = gameData.lastConfessDay || {};
    gameData.introHistory = gameData.introHistory || {};

    if (gameData.dayEvents && gameData.dayEvents[gameData.day]) {
        // 当日已有事件，直接显示常规互动
        showNormalInteraction(scene);
        if (!gameData.dayEvents) {
            gameData.dayEvents = {};
        }
        return;
    }

    // 获取当前场景对应的战队
    let currentTeam = null;
    for (const team in teamConfig) {
        if (teamConfig[team].scene === scene) {
            currentTeam = teamConfig[team];
            break;
        }
    }

    // 获取可出现的NPC列表（只有被介绍过的NPC才会出现）
    let availableNpcs = [];
    if (scene === "league") {
        // 联盟总部场景逻辑
        availableNpcs = Object.keys(npcData).filter(npcId => {
            const isInitial = ['yexiu', 'chenguo'].includes(npcId);
            const isIntroduced = Object.values(gameData.introHistory).some(intro => intro[npcId]);
            return isInitial || isIntroduced;
        });
    } else {
        // 普通场景逻辑
        availableNpcs = currentTeam.members.filter(npcId => {
            const isInitial = ['yexiu', 'chenguo'].includes(npcId);
            const isIntroduced = Object.values(gameData.introHistory).some(intro => intro[npcId]);
            return isInitial || isIntroduced;
        });
    }

    // 过滤掉被完全忽略的NPC
    availableNpcs = availableNpcs.filter(npcId => {
        if (!npcData[npcId] || !npcData[npcId].gameState) return false;
        const ignoreCount = npcData[npcId].gameState.ignoreCount || 0;

        if (npcId === "yexiu" || npcId === "wangjiexi") return ignoreCount < 7;
        if (npcId === "chenguo" || npcId === "sumucheng") return ignoreCount < 10;
        if (npcId === "huangshaotian") return ignoreCount < 20;
        if (npcId === "hanwenqing") return ignoreCount < 3;
        return ignoreCount < 5;
    });


    console.log('===== 人员抽取调试信息 =====');
    console.log('当前场景:', scene);
    console.log('所有NPC总数:', Object.keys(npcData).length);
    console.log('可出现的NPC列表:', availableNpcs);
    console.log('可出现的NPC名字:', availableNpcs.map(id => npcData[id]?.name));


    // 如果没有可出现的NPC，显示无交互面板
    if (availableNpcs.length === 0) {
        const noInteractionTexts = [
            `这个地方似乎没有你认识的人，或许需要通过社交介绍来认识新的朋友。`,
            `你在这里没有认识的人，可以先去兴欣战队找人介绍。`
        ];
        const randomNoInteractionText = noInteractionTexts[Math.floor(Math.random() * noInteractionTexts.length)];
        document.getElementById('noInteractionText').textContent = randomNoInteractionText;
        document.getElementById('noInteractionPanel').classList.remove('hidden');
        return;
    }

    // 计算权重并选择NPC
    const weights = calculateNpcWeights(availableNpcs);
    const randomNpcId = weightedRandom(availableNpcs, weights);
    const npc = npcData[randomNpcId];
    const favor = npcData[randomNpcId].gameState.favor;
    const isLove = npcData[randomNpcId].gameState.love;
    gameData.currentNpc = randomNpcId;
    document.getElementById('npcName').textContent = npc.name;
    console.log(`遇到 ${npc.name}，好感度: ${favor}, 是否恋人: ${isLove}`);

    // 收集所有可能的事件 - 第一阶段：检查条件
    const possibleEvents = [];
    // ========== 统计恋人数量 ==========
    let loveCount = 0;
    for (const id in npcData) {
        if (npcData[id].gameState && npcData[id].gameState.love === true) {
            loveCount++;
        }
    }

    // ========== 1. 告白事件（最高优先级） ==========  
    if (!isLove && favor >= 80) {
        possibleEvents.push({
            type: 'confess',
            priority: 100, // 最高优先级
            data: { npc, randomNpcId, favor }
        });
    }

    // ========== 2. 邀约事件（第二优先级） ==========
    if (loveCount >= 2 && isLove) {
        possibleEvents.push({
            type: 'invitation',
            priority: 90, // 优先级在嫉妒事件之后，亲密事件之前
            data: { npc, randomNpcId, favor }
        });
        console.log(`满足邀约事件条件，添加邀约事件`);
    }

    // ========== 3. 嫉妒事件（第三优先级） ========== 
    if (loveCount >= 2 && isLove) {
        possibleEvents.push({
            type: 'jealousy',
            priority: 90,
            data: { npc, randomNpcId, favor }
        });
        console.log(`满足嫉妒事件条件，添加动态嫉妒事件`);
    }

    // ========== 4. 亲密事件（第四优先级） ========== 
    if (isLove && favor >= 20) {
        possibleEvents.push({
            type: 'intimate',
            priority: 91,
            data: { npc, randomNpcId, favor }
        });
    }

    // ========== 5. 社交介绍事件（第五优先级） ==========
    if (npc.introTargets && npc.introTargets.length > 0 && favor >= 31) {
        const availableIntroTargets = npc.introTargets.filter(intro => {
            const targetId = intro.target;
            const favorRequire = intro.favorRequire || 31;
            const isTargetInitial = ['yexiu', 'chenguo'].includes(targetId);
            const isTargetIntroduced = Object.values(gameData.introHistory).some(intro => intro[targetId]);
            const isTargetUnlocked = isTargetInitial || isTargetIntroduced;

            return !isTargetUnlocked &&
                favor >= favorRequire &&
                !gameData.introHistory[randomNpcId]?.[targetId];
        });

        if (availableIntroTargets.length > 0) {
            possibleEvents.push({
                type: 'intro',
                priority: 90,
                data: { npc, randomNpcId, favor, availableIntroTargets }
            });
            console.log(`满足介绍朋友事件条件，添加动态介绍事件` + randomNpcId);
        }
    }

    // ========== 6. 忙碌事件（第六优先级） ========== 
    possibleEvents.push({
        type: 'busy',
        priority: 70,
        data: { npc, randomNpcId }
    });

    // ========== 7. 普通互动（最低优先级） ========== 
    possibleEvents.push({
        type: 'normal',
        priority: 80,
        data: { npc, randomNpcId, favor, isLove }
    });

    // 保持按优先级排序
    possibleEvents.sort((a, b) => b.priority - a.priority);

    // ========== 新的概率抽取逻辑 ==========
    // 给每个事件分配基础概率（基于优先级）
    const eventProbabilities = {
        100: 25,   // confess: 15%
        91: 36,   // 亲密
        90: 34,    // 邀约+嫉妒+介绍
        70: 4,    // busy: 10%
        80: 36      // normal: 5% (降低普通事件概率)
        // 总计: 15+70+10+5 = 100% ✓
    };

    // 直接使用possibleEvents，因为条件在收集时已经检查过了
    // 只过滤掉确实不可用的事件（如介绍事件没有可用目标）
    const eligibleEvents = possibleEvents.filter(event => {
        // 介绍事件需要确保有可用目标
        if (event.type === 'intro') {
            return event.data.availableIntroTargets &&
                event.data.availableIntroTargets.length > 0;
        }
        return true;
    });

    let selectedEvent;
    if (eligibleEvents.length === 0) {
        selectedEvent = possibleEvents.find(e => e.type === 'normal') || possibleEvents[0];
        console.log('没有符合条件的候选事件，使用普通事件');
    } else {
        // 根据概率权重进行抽取
        const totalWeight = eligibleEvents.reduce((sum, event) => {
            const weight = eventProbabilities[event.priority] || 10;
            return sum + weight;
        }, 0);

        let randomNum = Math.random() * totalWeight;
        selectedEvent = eligibleEvents[0]; // 默认值

        for (const event of eligibleEvents) {
            const weight = eventProbabilities[event.priority] || 10;
            if (randomNum < weight) {
                selectedEvent = event;
                break;
            }
            randomNum -= weight;
        }
        console.log('从', eligibleEvents.length, '个候选事件中选中:', selectedEvent?.type);
    }

    console.log('===== 事件概率统计 =====');
    console.log('所有可能事件:', possibleEvents.map(e => `${e.type}(优先级${e.priority})`));
    console.log('符合条件的候选事件:', eligibleEvents.map(e => `${e.type}(权重${eventProbabilities[e.priority] || 10}%)`));
    console.log('选中事件:', selectedEvent?.type, '优先级:', selectedEvent?.priority);

    // 重要：一旦选择了高优先级事件，立即标记当天事件类型并返回
    if (selectedEvent && selectedEvent.type !== 'normal' && selectedEvent.type !== 'busy') {
        if (!gameData.dayEvents) {
            gameData.dayEvents = {};
        }
        gameData.dayEvents[gameData.day] = selectedEvent.type;
        handleSelectedEvent(selectedEvent);
        return;
    }

    // 处理选中的事件
    handleSelectedEvent(selectedEvent);
}

// 处理选中的事件
function handleSelectedEvent(event) {
    const { type, data } = event;
    // 标记当日已发生事件（一旦标记，当天不再触发其${npc.gender === 'female' ? '她' : '他'}事件）
    if (!gameData.dayEvents) {
        gameData.dayEvents = {};
    }
    gameData.dayEvents[gameData.day] = type;

    //alert(type);
    switch (type) {
        case 'intro':
            handleIntroEvent(data);
            break;
        case 'confess':
            handleConfessEvent(data);
            break;
        case 'intimate':
            handleIntimateEvent(data);
            break;
        case 'invitation':  // 新增邀约事件处理
            handleInvitationEvent(data);
            break;
        case 'jealousy':
            handleJealousyEvent(data);
            break;
        case 'busy':
            handleBusyEvent(data);
            break;
        case 'normal':
            handleNormalEvent(data);
            break;
    }
}

// 添加事件记录（每天只记录一个事件，新事件覆盖旧事件，但特殊事件不会被覆盖）
function addEventRecord(content, eventType = 'normal') {
    const existingEvent = gameData.events.find(event => event.day === gameData.day);
    if (existingEvent) {
        // 如果同一天已经有事件记录
        // 特殊事件（介绍、解锁）不会被普通事件覆盖
        if (existingEvent.type === 'intro' || existingEvent.type === 'unlock') {
            // 特殊事件不会被覆盖
            return;
        }
        if (eventType === 'intro' || eventType === 'unlock') {
            // 特殊事件覆盖普通事件
            existingEvent.content = content;
            existingEvent.type = eventType;
        } else {
            // 普通事件覆盖普通事件
            existingEvent.content = content;
        }
    } else {
        // 如果当天还没有事件记录，添加新记录
        gameData.events.push({
            day: gameData.day,
            content: content,
            type: eventType
        });
    }
}


// 处理介绍事件
// 处理介绍事件
function handleIntroEvent(data) {
    const { npc, randomNpcId, favor, availableIntroTargets } = data;
    console.log('处理介绍事件:', { npc: npc.name, randomNpcId, favor, availableTargetsCount: availableIntroTargets.length });

    // 基础介绍成功率
    let introProbability = Math.min(0.4, 0.4 + (favor - 31) * 0.1);
    console.log('介绍成功率:', introProbability);

    let selectedIntro = availableIntroTargets[Math.floor(Math.random() * availableIntroTargets.length)];

    if (!selectedIntro || !selectedIntro.target) {
        console.error('介绍目标数据不完整:', selectedIntro);
        return;
    }

    const targetMemberId = selectedIntro.target;
    const targetMember = npcData[targetMemberId];
    const targetTeam = selectedIntro.team;

    if (!targetMember || !teamConfig[targetTeam]) {
        console.error('目标成员或战队数据不存在:', { targetMemberId, targetTeam });
        return;
    }

    const isSameTeam = targetTeam === npc.team;
    console.log(`${npc.name} 介绍 ${targetMember.name} (${teamConfig[targetTeam].name}战队)`);

    // 生成1-100之间的随机初始好感度
    const initialFavor = Math.floor(Math.random() * 60) + 1;

    // 根据好感度确定描述文本
    let favorDescription = "";

    if (initialFavor <= 10) {
        favorDescription = "对方似乎很冷淡，不太愿意交流的样子";
    } else if (initialFavor <= 20) {
        favorDescription = "对方态度一般，保持着基本的礼貌";
    } else if (initialFavor <= 30) {
        favorDescription = "对方好像对你有些兴趣，愿意与你交流";
    } else if (initialFavor <= 50) {
        favorDescription = "对方似乎对你印象不错，态度比较热情";
    } else {
        favorDescription = "对方好像对你很有好感，一见钟情";
    }

    console.log(`初始好感度: ${initialFavor}, 描述: ${favorDescription}`);

    let introText = "";
    if (isSameTeam) {
        // 队内介绍
        const teamIntroTexts = [
            `${npc.name}打完副本后走到你身边：「给你介绍下，这是我们战队的${targetMember.name}，以后一起组队啊！」${targetMember.name}朝你挥手：「${initialFavor > 70 ? "很高兴认识你！" : initialFavor > 40 ? "你好" : "嗯..."}」`,
            `${npc.name}拉着${targetMember.name}走到你面前：「这是我常跟你提起的朋友，你们认识一下吧！」${targetMember.name}对你说：「${initialFavor > 80 ? "终于见到你了，我听说过你很多事！" : initialFavor > 50 ? "你好，很高兴认识你" : "你好"}」`
        ];
        introText = teamIntroTexts[Math.floor(Math.random() * teamIntroTexts.length)];
    } else {
        // 跨队介绍
        const crossIntroTexts = [
            `${npc.name}神秘地对你眨眨眼：「想认识其他战队的选手吗？给你介绍${teamConfig[targetTeam].name}战队的${targetMember.name}，他可是很厉害的选手呢！」${targetMember.name}说：「${initialFavor > 90 ? "我一直想认识你呢！" : initialFavor > 60 ? "久仰大名" : "你好"}」`,
            `${npc.name}翻着手机通讯录：「对了，${teamConfig[targetTeam].name}的${targetMember.name}最近也在找你呢，要不要认识一下？」${targetMember.name}说：「${initialFavor > 85 ? "终于见面了！" : initialFavor > 55 ? "是的，我听说过你" : "嗯"}」`,
            `训练结束后，${npc.name}拉住你：「下周我们要和${teamConfig[targetTeam].name}打训练赛，先带你认识一下他们的${targetMember.name}吧！」${targetMember.name}说：「${initialFavor > 95 ? "训练赛请多指教，我很期待！" : initialFavor > 65 ? "请多指教" : "请多指教"}」`,
            `${npc.name}兴奋地对你说：「我刚联系了${teamConfig[targetTeam].name}的${targetMember.name}，他也很想认识你呢！」${targetMember.name}说：「${initialFavor > 90 ? "太好了，我一直想和你交流！" : initialFavor > 60 ? "是啊，终于见到了" : "你好"}」`
        ];
        introText = crossIntroTexts[Math.floor(Math.random() * crossIntroTexts.length)];
    }

    // 直接添加描述到介绍文本中
    introText += `<br><br><span class="favor-change" style="color: #4d94ff;">(${favorDescription})</span>`;

    // 重置所有场景面板
    resetScenePanels();

    // 设置介绍文本并显示面板
    const introPanel = document.getElementById('introPanel');
    if (introPanel) {
        introPanel.classList.add('hidden');
        document.getElementById('introText').innerHTML = introText;

        setTimeout(() => {
            introPanel.classList.remove('hidden');
            console.log('介绍面板已显示');
        }, 10);
    } else {
        console.error('未找到介绍面板元素');
    }

    // 设置介绍后的初始好感度
    if (npcData[targetMemberId].gameState.favor === 0) {
        npcData[targetMemberId].gameState.favor = initialFavor;
    }

    // 记录介绍历史
    if (!gameData.introHistory[randomNpcId]) {
        gameData.introHistory[randomNpcId] = {};
    }
    gameData.introHistory[randomNpcId][targetMemberId] = true;

    // 将被介绍的角色添加到已解锁角色列表中
    if (!gameData.unlockedCharacters.includes(targetMemberId)) {
        gameData.unlockedCharacters.push(targetMemberId);
        console.log(`角色 ${targetMember.name} 已解锁！`);
    }

    // 构建事件记录内容
    let eventContent = `${npc.name}介绍你认识了${targetMember.name}`;
    if (!isSameTeam) {
        eventContent += `，开启了与${teamConfig[targetTeam].name}战队的交流`;
    }
    eventContent += `～ ${favorDescription}`;

    // 记录介绍事件
    addEventRecord(eventContent, 'intro');

    // 如果是跨队介绍，解锁新场景
    if (!isSameTeam) {
        checkSceneUnlock(targetTeam);
    }

}


// 处理告白事件
// 处理告白事件（优化版，包含具体恋人名字）
function handleConfessEvent(data) {
    const { npc, randomNpcId, favor } = data;

    // ========== 获取前任状态 ==========
    const isEx = npcData[randomNpcId].gameState.ex || false;

    // ========== 如果是前任的分支 ==========
    if (isEx) {
        console.log(`${npc.name}是前任，触发复合告白，好感度: ${favor}`);

        // 检查是否已有恋人（使用与嫉妒事件相同的逻辑）
        let loveCount = 0;
        let loverNames = [];
        for (const id in npcData) {
            if (npcData[id].gameState && npcData[id].gameState.love === true) {
                loveCount++;
                loverNames.push(npcData[id].name);
            }
        }

        // 如果已有恋人，有一定概率抑制复合告白
        if (loveCount > 0 && Math.random() < 0.4) { // 前任复合抑制概率更高
            console.log(`${npc.name}因为玩家已有${loveCount}个恋人，抑制了复合请求`);

            let suppressText = "";
            if (loveCount === 1) {
                suppressText = `${npc.name}看着你，想要说复合的话，但想到${loverNames[0]}的存在，最终只是苦笑着摇了摇头。`;
            } else if (loveCount === 2) {
                suppressText = `${npc.name}张了张嘴想要复合，可看到你和${loverNames[0]}、${loverNames[1]}在一起，只能默默转身离开。`;
            } else {
                const loverList = loveCount <= 3 ? loverNames.join("、") : `${loverNames.slice(0, 2).join("、")}等${loveCount}人`;
                suppressText = `${npc.name}想要复合，但看到你身边的${loverList}，最终只是轻声道：「祝你幸福...」`;
            }

            document.getElementById('resultText').textContent = suppressText;
            const resultTitle = document.querySelector('#resultPanel h3');
            if (resultTitle) resultTitle.textContent = "复合未果";

            resetScenePanels();
            document.getElementById('resultPanel').classList.remove('hidden');
            addEventRecord(`${npc.name}想要复合，但看到你已有恋人，最终放弃了。`);

            // 好感度小幅度下降
            const suppressFavorChange = -Math.floor(Math.random() * 5); // -0到-4
            npcData[randomNpcId].gameState.favor += suppressFavorChange;
            if (npcData[randomNpcId].gameState.favor < 0) npcData[randomNpcId].gameState.favor = 0;

            return;
        }

        // 前任复合告白概率计算
        const baseChance = 0.2;
        const favorBonus = (favor / 120) * 0.3;
        const reconcileChance = Math.min(baseChance + favorBonus, 0.5);

        // 生成随机数
        const randomValue = Math.random();
        console.log(`前任复合率：${(reconcileChance * 100).toFixed(1)}%，随机数：${randomValue.toFixed(3)}`);

        if (randomValue < reconcileChance) {
            console.log(`前任复合告白触发！好感度: ${favor}, 概率: ${reconcileChance}`);

            // 前任复合告白文本 - 优先使用定制文本，否则用默认
            let confessText;
            if (npc.reconcileConfess) {
                // 如果是数组，随机选择一条
                if (Array.isArray(npc.reconcileConfess) && npc.reconcileConfess.length > 0) {
                    confessText = npc.reconcileConfess[Math.floor(Math.random() * npc.reconcileConfess.length)];
                }
                // 如果是字符串，直接使用
                else if (typeof npc.reconcileConfess === 'string') {
                    confessText = npc.reconcileConfess;
                }
                // 否则使用默认文本
                else {
                    confessText = `${npc.name}看着你，眼神复杂：「我们...还能回到从前吗？」`;
                }
            } else {
                // 默认复合告白文本
                const defaultReconcileTexts = [
                    `${npc.name}走到你面前，眼神复杂：「我知道我可能没有资格说这些...但我们还能重新开始吗？」`,
                    `${npc.name}深吸一口气：「这段时间我想了很多，过去是我不好...能不能再给我一次机会？」`,
                    `${npc.name}轻声说：「分手后的每一天我都在后悔，我们...还能回到从前吗？」`
                ];
                confessText = defaultReconcileTexts[Math.floor(Math.random() * defaultReconcileTexts.length)];
            }

            // 修改面板标题和按钮文本
            const confessTitle = document.querySelector('#confessPanel h3');
            if (confessTitle) confessTitle.textContent = "复合请求";

            const acceptBtn = document.getElementById('acceptConfess');
            const rejectBtn = document.getElementById('rejectConfess');
            if (acceptBtn) acceptBtn.textContent = "同意复合";
            if (rejectBtn) rejectBtn.textContent = "拒绝复合";

            document.getElementById('confessText').textContent = confessText;
            document.getElementById('npcName1').textContent = npc.name;
            document.getElementById('npcTeamTag1').classList.toggle('hidden', !npc.team);
            if (npc.team) {
                document.getElementById('npcTeamTag1').textContent = teamConfig[npc.team].name;
                document.getElementById('npcTeamTag1').className = `team-tag ${teamConfig[npc.team].color}`;
            }
            document.getElementById('confessPanel').dataset.npcId = randomNpcId;
            document.getElementById('confessPanel').dataset.isEx = "true"; // 标记是前任告白
            document.getElementById('confessPanel').classList.remove('hidden');
            gameData.lastConfessDay[randomNpcId] = gameData.day;
        } else {
            // 前任复合告白失败，回退到普通互动
            console.log(`前任复合告白未触发，回退到普通互动`);
            handleNormalEvent(data);
        }
        return;
    }

    // ========== 原有逻辑（针对非前任） ==========
    // 检查是否已有恋人（使用与嫉妒事件相同的逻辑）
    let loveCount = 0;
    let loverNames = [];
    for (const id in npcData) {
        if (npcData[id].gameState && npcData[id].gameState.love === true) {
            loveCount++;
            loverNames.push(npcData[id].name);
        }
    }

    // 如果已有恋人，有一定概率抑制告白
    if (loveCount > 0 && Math.random() < 0.3) { // 40%概率抑制告白
        console.log(`${npc.name}因为玩家已有${loveCount}个恋人，抑制了告白冲动，好感度: ${favor}`);

        // 根据恋人数量和名字生成不同的文本
        let suppressText = "";

        if (loveCount === 1) {
            // 只有1个恋人
            const singleLoverTexts = [
                `${npc.name}深情地看着你，准备说出那句藏在心底的话。但想到你和${loverNames[0]}之间的感情，${npc.gender === 'female' ? '她' : '他'}最终还是选择了沉默。`,
                `${npc.name}眼中的爱意几乎要溢出来，可当想起${loverNames[0]}看你的眼神时，${npc.gender === 'female' ? '她' : '他'}只是苦笑着摇了摇头：「祝你们幸福。」`,
                `${npc.name}想要握住你的手，却在半空中停住。${npc.gender === 'female' ? '她' : '他'}知道${loverNames[0]}才是你重要的人，最终只是轻声道：「能遇到你，我已经很幸运了。」`,
                `${npc.name}的告白卡在喉咙里，${loverNames[0]}的名字在脑海中闪过。${npc.gender === 'female' ? '她' : '他'}深吸一口气，露出释然的微笑：「有你这样的朋友，真好。」`
            ];
            suppressText = singleLoverTexts[Math.floor(Math.random() * singleLoverTexts.length)];

        } else if (loveCount === 2) {
            // 有2个恋人
            const doubleLoverTexts = [
                `${npc.name}看着你，想要倾诉心意。可想到你周旋在${loverNames[0]}和${loverNames[1]}之间，${npc.gender === 'female' ? '她' : '他'}叹了口气：「我...还是不说比较好。」`,
                `${npc.name}想要表白，但看到${loverNames[0]}和${loverNames[1]}都对你深情款款，${npc.gender === 'female' ? '她' : '他'}轻声道：「也许，我不该再给你增加困扰了。」`,
                `${npc.name}的告白话语到了嘴边，${loverNames[0]}和${loverNames[1]}的身影却在脑海中浮现。${npc.gender === 'female' ? '她' : '他'}最终只是轻轻拍了拍你的肩：「要好好对待他们啊。」`,
                `${npc.name}默默将爱意藏回心底，毕竟${loverNames[0]}和${loverNames[1]}已经占据了你的心。${npc.gender === 'female' ? '她' : '他'}微笑着说：「看到你被这么多人爱着，我也为你高兴。」`
            ];
            suppressText = doubleLoverTexts[Math.floor(Math.random() * doubleLoverTexts.length)];

        } else {
            // 有3个或更多恋人
            let loverList = "";
            if (loveCount <= 3) {
                loverList = loverNames.join("、");
            } else {
                loverList = `${loverNames.slice(0, 2).join("、")}等${loveCount}人`;
            }

            const multiLoverTexts = [
                `${npc.name}对你充满爱意，但看到你身边的${loverList}，${npc.gender === 'female' ? '她' : '他'}的告白话语最终化为一声轻叹：「你...真的很受欢迎呢。」`,
                `${npc.name}想要表白，可想到${loverList}都是你的恋人，${npc.gender === 'female' ? '她' : '他'}摇了摇头：「我就不凑这个热闹了。」`,
                `${npc.name}眼中的光芒渐渐黯淡，${loverList}的身影让${npc.gender === 'female' ? '她' : '他'}明白自己的爱或许只是众多爱意中的一份。${npc.gender === 'female' ? '她' : '他'}轻声道：「能远远看着你就够了。」`,
                `${npc.name}最终没有说出那句"我爱你"。看到${loverList}围绕在你身边，${npc.gender === 'female' ? '她' : '他'}只是默默祝福：「希望你能永远这样被爱包围着。」`
            ];
            suppressText = multiLoverTexts[Math.floor(Math.random() * multiLoverTexts.length)];
        }


        // 显示结果面板前，修改标题
        const resultTitle = document.querySelector('#resultPanel h3');
        if (resultTitle) {
            resultTitle.textContent = "告白未果";
            resultPanel.classList.add('wg-mode');
        }

        document.getElementById('resultText').textContent = suppressText;
        resetScenePanels();
        document.getElementById('resultPanel').classList.remove('hidden');

        // 记录事件（包含具体名字）
        let recordText = `${npc.name}想要告白，但看到你已有`;
        if (loveCount === 1) {
            recordText += `${loverNames[0]}这位恋人，最终还是放弃了。`;
        } else if (loveCount === 2) {
            recordText += `${loverNames[0]}和${loverNames[1]}两位恋人，最终还是放弃了。`;
        } else {
            recordText += `${loveCount}位恋人，最终还是放弃了。`;
        }
        addEventRecord(recordText);

        // 好感度变化（因为抑制了告白，可能有些失落）
        const suppressFavorChange = -Math.floor(Math.random() * 3); // -0到-2的随机数
        npcData[randomNpcId].gameState.favor += suppressFavorChange;
        if (npcData[randomNpcId].gameState.favor < 0) npcData[randomNpcId].gameState.favor = 0;

        return; // 直接返回，不执行告白逻辑
    }

    // 告白成功率基于好感度
    // 普通告白文本 - 优先使用定制文本，支持多条随机
    let confessText;
    if (npc.confess) {
        // 如果是数组，随机选择一条
        if (Array.isArray(npc.confess) && npc.confess.length > 0) {
            confessText = npc.confess[Math.floor(Math.random() * npc.confess.length)];
        }
        // 如果是字符串，直接使用
        else if (typeof npc.confess === 'string') {
            confessText = npc.confess;
        }
        // 否则使用默认文本
        else {
            confessText = `${npc.name}深情地看着你：「我喜欢你，能做我的恋人吗？」`;
        }
    } else {
        // 默认告白文本
        const defaultConfessTexts = [
            `${npc.name}看着你，认真地说：「我一直喜欢你，能做我的恋人吗？」`,
            `${npc.name}深吸一口气：「有句话我想说很久了...我喜欢你，和我交往好吗？」`,
            `${npc.name}真诚地看着你的眼睛：「我想和你在一起，可以吗？」`
        ];
        confessText = defaultConfessTexts[Math.floor(Math.random() * defaultConfessTexts.length)];
    }

    // 确保面板标题和按钮正确
    const confessTitle = document.querySelector('#confessPanel h3');
    if (confessTitle) confessTitle.textContent = "告白";   

    const acceptBtn = document.getElementById('acceptConfess');
    const rejectBtn = document.getElementById('rejectConfess');
    if (acceptBtn) acceptBtn.textContent = "接受告白";
    if (rejectBtn) rejectBtn.textContent = "拒绝告白";

    document.getElementById('confessText').textContent = confessText;
    document.getElementById('npcName1').textContent = npc.name;
    document.getElementById('npcTeamTag1').classList.toggle('hidden', !npc.team);
    if (npc.team) {
        document.getElementById('npcTeamTag1').textContent = teamConfig[npc.team].name;
        document.getElementById('npcTeamTag1').className = `team-tag ${teamConfig[npc.team].color}`;
    }
    document.getElementById('confessPanel').dataset.npcId = randomNpcId;
    document.getElementById('confessPanel').dataset.isEx = "false"; // 标记不是前任
    document.getElementById('confessPanel').classList.remove('hidden');
    gameData.lastConfessDay[randomNpcId] = gameData.day;

}

// 处理亲密事件
function handleIntimateEvent(data) {
    const { npc, randomNpcId, favor } = data;
    console.log(`触发亲密事件！好感度: ${favor}`);
    const randomIntimateEvent = npc.intimateEvents[Math.floor(Math.random() * npc.intimateEvents.length)];
    document.getElementById('intimateText').textContent = randomIntimateEvent;
    document.getElementById('intimatePanel').classList.remove('hidden');
    gameData.lastIntimateDay[randomNpcId] = gameData.day;

    // 添加事件记录
    const eventContent = `亲密时刻：${randomIntimateEvent}`;
    addEventRecord(eventContent, 'intimate');

}


// 处理嫉妒事件
// 处理嫉妒事件
function handleJealousyEvent(data) {
    const { npc, randomNpcId } = data;

    if (Math.random() < 0.4) {
    // 获取所有恋人列表（排除当前NPC）
    const allLovers = [];
    for (const id in npcData) {
        if (id !== randomNpcId && npcData[id].gameState && npcData[id].gameState.love === true) {
            allLovers.push(id);
        }
    }

    if (allLovers.length > 0) {
        // ========== 随机选择出现的恋人人数和具体人员 ==========
        let selectedLovers = [];
        let scenarioType = "";

        // 根据总恋人数量决定最大显示人数
        let maxLoversToShow;
        if (allLovers.length >= 5) {
            maxLoversToShow = 5; // 最多显示5人
        } else if (allLovers.length >= 3) {
            maxLoversToShow = 3;
        } else {
            maxLoversToShow = allLovers.length;
        }

        // 随机决定出现几个其他恋人
        const numberOfLovers = Math.floor(Math.random() * maxLoversToShow) + 1; // 1-最大数

        // 随机选择指定数量的恋人
        const shuffled = [...allLovers].sort(() => 0.5 - Math.random());
        selectedLovers = shuffled.slice(0, numberOfLovers);

        // 设置场景类型
        scenarioType = getScenarioType(numberOfLovers);
        const selectedLoverNames = selectedLovers.map(id => npcData[id].name);

        // ========== 根据不同场景生成对白 ==========
        let jealousyText = generateJealousyText(npc, selectedLovers, scenarioType);

        console.log(`嫉妒场景: ${scenarioType}, 出现的恋人: ${selectedLoverNames.join('、')}`);

        // ========== 好感度变动设置 ==========
        const getRandomChange = () => Math.floor(Math.random() * 21) - 10 || 1;

        // ========== 好感度变动设置 ==========
        // 随机上升的好感度值（1-20）
        const getRandomPositiveChange = () => Math.floor(Math.random() * 20) + 1;

        // 多恋人场景下分手惩罚（每多一个恋人额外-15）
        const getBreakupChange = () => {
            const base = -40;
            const extra = -15 * (selectedLovers.length - 1); // 每多一个恋人额外-15
            const random = -Math.floor(Math.random() * 21); // 额外随机-0到-20
            return base + extra + random; // 总计: -40 ~ -(40+额外+20)
        };

        // ========== 创建动态嫉妒事件 ==========
        const dynamicJealousyEvent = {
            npc1: randomNpcId,
            otherLovers: selectedLovers,
            scenarioType: scenarioType,
            scene: gameData.currentScene,
            text: jealousyText,
            choice1: {
                text: `选择${npc.name}`,
                change: getRandomPositiveChange()
            },
            choice2: {
                text: `跟${npc.name}分手`,
                change: getBreakupChange(),
                breakUp: true
            },
            choice3: {
                text: `沉默不语`,
                change: getRandomChange()
            },
            // 对其他恋人的影响
            effects: selectedLovers.map(loverId => {
                // 简单的三次独立随机调用
                const getUniqueRandom = () => Math.floor(Math.random() * 10000); // 确保每次调用都独立

                return {
                    npc: loverId,
                    choice1Effect: Math.floor(Math.random() * 31) - 25, // 独立随机
                    choice2Effect: Math.floor(Math.random() * 31) - 25, // 独立随机
                    choice3Effect: Math.floor(Math.random() * 31) - 25  // 独立随机
                };
            })
        };

        console.log('嫉妒事件触发成功', dynamicJealousyEvent);

        // ========== 更新UI ==========
        document.getElementById('jealousyText').textContent = dynamicJealousyEvent.text;
        document.getElementById('jealousyChoose1').textContent = dynamicJealousyEvent.choice1.text;
        document.getElementById('jealousyChoose2').textContent = dynamicJealousyEvent.choice2.text;
        document.getElementById('jealousyChoose3').textContent = dynamicJealousyEvent.choice3.text;

        document.getElementById('jealousyPanel').dataset.event = JSON.stringify(dynamicJealousyEvent);
        document.getElementById('jealousyPanel').classList.remove('hidden');

    } else {
        console.log('没有其他恋人，回退到普通互动');
        handleNormalEvent(data);
    }
    } else {
        console.log('嫉妒转一般事件');
        handleNormalEvent(data);
    }
}

// 辅助函数：获取场景类型名称
function getScenarioType(loverCount) {
    switch (loverCount) {
        case 1: return "single";
        case 2: return "double";
        case 3: return "triple";
        case 4: return "quadruple";
        case 5: return "quintuple";
        default: return `massive_${loverCount}`;
    }
}

// 辅助函数：生成嫉妒对白
function generateJealousyText(mainNpc, selectedLovers, scenarioType) {
    const loverNames = selectedLovers.map(id => npcData[id].name);
    const loverCount = selectedLovers.length;

    const scenarios = {
        single: [
            `你正和${mainNpc.name}在一起，${loverNames[0]}突然出现，眼神冰冷地看着你们...`,
            `${mainNpc.name}靠在墙边和你说话，${loverNames[0]}从转角走来："这么巧，都在这里？"`,
            `训练室里，${mainNpc.name}教你操作技巧，${loverNames[0]}推门而入，气氛瞬间凝固。`,
            `${mainNpc.name}递给你一瓶水，${loverNames[0]}的声音从身后传来："原来你在这儿。"`
        ],
        double: [
            `${mainNpc.name}和你走在走廊上，迎面撞见${loverNames[0]}和${loverNames[1]}，四人面面相觑...`,
            `你正在帮${mainNpc.name}整理资料，${loverNames[0]}和${loverNames[1]}一起走了进来："哦？在忙？"`,
            `战队聚餐时，${mainNpc.name}坐在你旁边，${loverNames[0]}和${loverNames[1]}交换了一个意味深长的眼神。`,
            `训练结束后，${mainNpc.name}约你单独聊聊，${loverNames[0]}和${loverNames[1]}同时发来消息："在哪里？"`
        ],
        triple: [
            `战队会议上，${mainNpc.name}坐在你左边，${loverNames[0]}、${loverNames[1]}和${loverNames[2]}分别坐在不同位置，目光时不时飘向你...`,
            `你走进训练室，发现${mainNpc.name}、${loverNames[0]}、${loverNames[1]}和${loverNames[2]}都在，气氛微妙得让人窒息。`,
            `午休时间，你在自动贩卖机前遇到${mainNpc.name}，${loverNames[0]}、${loverNames[1]}和${loverNames[2]}陆续出现，形成一个小型修罗场。`,
            `${mainNpc.name}在教你游戏技巧，${loverNames[0]}、${loverNames[1]}和${loverNames[2]}相继发来私聊："在做什么？"、"和谁在一起？"`
        ],
        quadruple: [
            `训练赛结束后，${mainNpc.name}正在和你讨论战术，${loverNames[0]}、${loverNames[1]}、${loverNames[2]}和${loverNames[3]}同时围了过来...`,
            `战队庆功宴上，你刚和${mainNpc.name}碰杯，另外四个身影就出现在你周围：${loverNames.join('、')}`,
            `你在休息室沙发上小憩，醒来发现${mainNpc.name}坐在你旁边，而${loverNames[0]}等${loverCount - 1}人正站在门口看着你们。`,
            `走廊转角处，${mainNpc.name}和你正在说话，一抬头发现${loverNames.join('、')}正从不同方向走来。`
        ],
        quintuple: [
            `整个训练室陷入了诡异的安静——${mainNpc.name}、${loverNames.join('、')}，所有人都在这里，空气中弥漫着浓浓的火药味...`,
            `你被五个恋人包围了！${mainNpc.name}拉着你的左手，而${loverNames.join('、')}则用各种复杂的眼神盯着你。`,
            `"解释一下吧。" ${mainNpc.name}冷冷地说。你抬头一看，房间里站满了人：${loverNames.join('、')}，这简直是审判现场！`,
            `这是你能想象到的最糟糕的情况：${mainNpc.name}和另外五个恋人${loverNames.join('、')}都在场，而你站在中间。`
        ],
        massive: [
            `你被${loverCount + 1}个恋人包围了！整个场面堪称史诗级修罗场，连空气都快要凝固了...`,
            `${mainNpc.name}和${loverCount}个恋人同时出现！你感觉像是站在了火山口上，随时可能爆发。`,
            `这可能是荣耀圈有史以来最大的八卦现场：你和${mainNpc.name}被${loverCount}个恋人堵在了${gameData.currentScene === 'league' ? '联盟总部' : (npcData[selectedLovers[0]].team ? teamConfig[npcData[selectedLovers[0]].team].name : '训练室')}。`,
            `眼前的景象让你头皮发麻：${mainNpc.name}，还有${loverNames.join('、')}，总共${loverCount + 1}个人，全都看着你。`
        ]
    };

    // 选择对应的场景文本
    let textArray;
    if (scenarios[scenarioType]) {
        textArray = scenarios[scenarioType];
    } else if (loverCount >= 6) {
        textArray = scenarios.massive;
        // 替换文本中的占位符
        const randomIndex = Math.floor(Math.random() * textArray.length);
        let text = textArray[randomIndex];
        text = text.replace('${loverCount}', loverCount);
        return text;
    } else {
        textArray = scenarios.triple; // 默认用三人场景
    }

    return textArray[Math.floor(Math.random() * textArray.length)];
}

// 处理嫉妒选项的函数（完整版，适配旧UI）
// 处理嫉妒选项的函数（完整版，使用原好感度逻辑）
function handleJealousyChoice(choiceIndex) {
    const panel = document.getElementById('jealousyPanel');
    const eventData = JSON.parse(panel.dataset.event);

    // 获取选择的选项
    let selectedChoice;
    switch (choiceIndex) {
        case 1: selectedChoice = eventData.choice1; break;
        case 2: selectedChoice = eventData.choice2; break;
        case 3: selectedChoice = eventData.choice3; break;
    }

    // 对当前NPC的好感度影响
    const currentNpcId = eventData.npc1;
    const currentNpc = npcData[currentNpcId];
    const currentChange = selectedChoice.change;

    // 收集所有好感度变动
    const allChanges = [];

    // ========== 使用原好感度更新逻辑 ==========
    // 更新当前NPC好感度
    if (npcData[currentNpcId]) {
        npcData[currentNpcId].gameState.favor += currentChange;
        // 确保好感度不低于0
        if (npcData[currentNpcId].gameState.favor < 0) {
            npcData[currentNpcId].gameState.favor = 0;
        }
    }

    allChanges.push({
        npcId: currentNpcId,
        npcName: currentNpc.name,
        change: currentChange
    });

    console.log(`对${currentNpc.name}好感度变动: ${currentChange > 0 ? '+' : ''}${currentChange}`);

    // 对所有出现的其他恋人的影响
    if (eventData.effects && eventData.effects.length > 0) {
        eventData.effects.forEach(effect => {
            let loverChange;
            switch (choiceIndex) {
                case 1: loverChange = effect.choice1Effect; break;
                case 2: loverChange = effect.choice2Effect; break;
                case 3: loverChange = effect.choice3Effect; break;
            }

            // 使用原逻辑更新其他恋人好感度
            if (npcData[effect.npc]) {
                npcData[effect.npc].gameState.favor += loverChange;
                // 确保好感度不低于0
                if (npcData[effect.npc].gameState.favor < 0) {
                    npcData[effect.npc].gameState.favor = 0;
                }
            }

            const loverName = npcData[effect.npc].name;

            allChanges.push({
                npcId: effect.npc,
                npcName: loverName,
                change: loverChange
            });

            console.log(`对${loverName}好感度变动: ${loverChange > 0 ? '+' : ''}${loverChange}`);
        });
    }

    // ========== 分手选项特殊处理（包含拒绝概率） ==========
    if (selectedChoice.breakUp) {
        // 检查分手是否会被拒绝的概率
        const baseRejectChance = 0.3;
        const currentFavor = currentNpc.gameState.favor;
        const favorReduction = currentFavor * 0.002;
        const rejectChance = Math.max(0.05, baseRejectChance - favorReduction);
        const isRejected = Math.random() < rejectChance;

        if (isRejected) {
            // ========== 分手被拒绝的情况 ==========
            let rejectTexts = [];
            if (currentNpc.rejectBreakupTexts && currentNpc.rejectBreakupTexts.length > 0) {
                rejectTexts = currentNpc.rejectBreakupTexts;
            } else {
                // 默认拒绝分手文本
                rejectTexts = [
                    `${currentNpc.name}紧紧抓住你的手：「不！我不要分手！我们再好好谈谈好吗？」`,
                    `${currentNpc.name}眼神坚定地看着你：「我不会同意分手的，我们的感情还没到尽头。」`,
                    `${currentNpc.name}摇头：「你冷静一点，不要因为一时冲动说这种话。」`,
                    `${currentNpc.name}红着眼眶：「我知道我做得不够好，但请给我一个机会...」`,
                    `${currentNpc.name}深吸一口气：「我不同意。我们之间的感情，不是这样轻易就能结束的。」`
                ];
            }

            const randomRejectText = rejectTexts[Math.floor(Math.random() * rejectTexts.length)];

            // 重新调整好感度（拒绝后的变动）
            // 当前NPC：-30到-5
            const npc1FavorChange = Math.floor(Math.random() * 26) - 30;
            // 更新变动（需要撤销之前加的，再加上新的）
            if (npcData[currentNpcId]) {
                // 先撤销原来的变动
                npcData[currentNpcId].gameState.favor -= currentChange;
                // 加上新的变动
                npcData[currentNpcId].gameState.favor += npc1FavorChange;
                // 确保好感度不低于0
                if (npcData[currentNpcId].gameState.favor < 0) {
                    npcData[currentNpcId].gameState.favor = 0;
                }
            }

            // 更新变动记录
            allChanges[0].change = npc1FavorChange;

            // 对其他恋人的影响：-20到+5
            if (allChanges.length > 1) {
                for (let i = 1; i < allChanges.length; i++) {
                    const newChange = Math.floor(Math.random() * 26) - 20;
                    const npcId = allChanges[i].npcId;

                    if (npcData[npcId]) {
                        // 撤销原来的变动
                        npcData[npcId].gameState.favor -= allChanges[i].change;
                        // 加上新的变动
                        npcData[npcId].gameState.favor += newChange;
                        // 确保好感度不低于0
                        if (npcData[npcId].gameState.favor < 0) {
                            npcData[npcId].gameState.favor = 0;
                        }
                    }

                    allChanges[i].change = newChange;
                }
            }

            // 构建结果文本
            let changeTexts = [];
            allChanges.forEach(change => {
                const sign = change.change > 0 ? '+' : '';
                changeTexts.push(`${change.npcName}好感${sign}${change.change}`);
            });

            const resultText = `
                ${randomRejectText}<br><br>
                <span style="color: #ef4444; font-weight: bold;">
                    ${currentNpc.name}拒绝和你分手！
                </span>
                <span class="favor-change">
                    (${changeTexts.join('，')})
                </span>
            `;

            // 显示结果面板
            document.getElementById('resultText').innerHTML = resultText;
            const resultTitle = document.querySelector('#resultPanel h3');
            resultPanel.classList.remove('wg-mode');
            if (resultTitle) {
                resultTitle.textContent = "分手被拒绝";
            }

            // 生成事件记录
            // 在拒绝分手的情况中：
            const recordText = `${eventData.text}你向${currentNpc.name}提出分手，但${currentNpc.name}拒绝了你。<span class="favor-change">(${changeTexts.join('，')})</span>`;
            addEventRecord(recordText);

            // 显示结果面板，隐藏修罗场面板
            document.getElementById('jealousyPanel').classList.add('hidden');
            document.getElementById('resultPanel').classList.remove('hidden');

        } else {
            // ========== 成功分手的情况 ==========
            currentNpc.gameState.love = false;
            currentNpc.gameState.ex = true; // 变成前任

            // 记录分手事件
            if (!gameData.breakupHistory) gameData.breakupHistory = [];
            gameData.breakupHistory.push({
                npcId: currentNpcId,
                npcName: currentNpc.name,
                day: gameData.day,
                reason: 'jealousy_breakup',
                withOthers: eventData.otherLovers.length > 0 ?
                    eventData.otherLovers.map(id => npcData[id].name) : [],
                severity: eventData.otherLovers.length + 1
            });

            // 生成分手心情文字
            let breakupTexts = [];
            if (currentNpc.breakupTexts && currentNpc.breakupTexts.length > 0) {
                breakupTexts = currentNpc.breakupTexts;
            } else {
                // 默认分手文本
                breakupTexts = [
                    `${currentNpc.name}眼神黯淡地看着你：「这就是你的选择吗...我明白了。」`,
                    `${currentNpc.name}苦笑着摇头：「原来我们的感情这么脆弱。」`,
                    `${currentNpc.name}沉默片刻，轻声说：「祝你幸福...」`,
                    `${currentNpc.name}强忍泪水：「我不会再打扰你们了。」`,
                    `${currentNpc.name}深吸一口气：「没想到最后会是这样...保重。」`
                ];
            }

            const randomBreakupText = breakupTexts[Math.floor(Math.random() * breakupTexts.length)];

            // 构建结果文本
            let changeTexts = [];
            allChanges.forEach(change => {
                const sign = change.change > 0 ? '+' : '';
                changeTexts.push(`${change.npcName}好感${sign}${change.change}`);
            });

            const resultText = `
                ${randomBreakupText}<br><br>
                <span style="color: #ef4444; font-weight: bold;">
                    你和${currentNpc.name}分手了
                </span>
                <span class="favor-change">
                    (${changeTexts.join('，')})
                </span>
            `;

            // 显示结果面板
            document.getElementById('resultText').innerHTML = resultText;
            const resultTitle = document.querySelector('#resultPanel h3');
            if (resultTitle) {
                resultTitle.textContent = "分手结果";
            }

            // 生成事件记录
            // 在成功分手的情况中：
            const recordText = `${eventData.text}你向${currentNpc.name}提出分手。<span class="favor-change">(${changeTexts.join('，')})</span>`;
            addEventRecord(recordText);

            // 显示结果面板，隐藏修罗场面板
            document.getElementById('jealousyPanel').classList.add('hidden');
            document.getElementById('resultPanel').classList.remove('hidden');
        }

    } else {
        // ========== 非分手选项（选择当前NPC或沉默） ==========
        const resultText = generateJealousyResultText(choiceIndex, eventData);

        // 生成好感度变动文本
        let changeTexts = [];
        allChanges.forEach(change => {
            const sign = change.change > 0 ? '+' : '';
            changeTexts.push(`${change.npcName}好感${sign}${change.change}`);
        });

        // 显示结果面板
        document.getElementById('resultText').innerHTML = `
            ${resultText}<br><br>
            <span class="favor-change">
                (${changeTexts.join('，')})
            </span>
        `;

        const resultTitle = document.querySelector('#resultPanel h3');
        resultPanel.classList.remove('wg-mode');
        if (resultTitle) {
            if (choiceIndex === 1) {
                resultTitle.textContent = "选择结果";
            } else if (choiceIndex === 3) {
                resultTitle.textContent = "沉默结果";
            }
        }

        // 生成事件记录
        let recordText = "";
        if (choiceIndex === 1) {
            recordText = `${eventData.text}你选择了${currentNpc.name}。<span class="favor-change">(${changeTexts.join('，')})</span>`;
        } else if (choiceIndex === 3) {
            recordText = `${eventData.text}你选择了沉默。<span class="favor-change">(${changeTexts.join('，')})</span>`;
        }
        addEventRecord(recordText);

        // 显示结果面板，隐藏修罗场面板
        document.getElementById('jealousyPanel').classList.add('hidden');
        document.getElementById('resultPanel').classList.remove('hidden');
    }

    // 确保结果面板按钮能返回地图
    const finishInteractionBtn = document.getElementById('finishInteraction');
    if (finishInteractionBtn) {
        // 先移除旧的事件监听器
        finishInteractionBtn.replaceWith(finishInteractionBtn.cloneNode(true));
        // 重新获取按钮并绑定新事件
        const newFinishBtn = document.getElementById('finishInteraction');
        newFinishBtn.addEventListener('click', () => {
            // 标记今日已有事件
            if (!gameData.dayEvents) gameData.dayEvents = {};
            gameData.dayEvents[gameData.day] = 'jealousy';

            document.getElementById('backToMap').click();
            updateStatus();
            updateHomePage();
            autoSaveGame();
        });
    }

    // 更新状态显示
    updateStatus();
    updateHomePage();
    autoSaveGame();
}

// 生成嫉妒事件结果文本
function generateJealousyResultText(choiceIndex, eventData) {
    const mainNpcId = eventData.npc1;
    const mainNpc = npcData[mainNpcId];
    const loverCount = eventData.otherLovers.length;
    const loverNames = eventData.otherLovers.map(id => npcData[id].name);

    const resultScenarios = {
        1: { // 选择当前NPC
            single: [
                `你坚定地站在${mainNpc.name}身边，${loverNames[0]}冷哼一声转身离开。`,
                `"我只想和${mainNpc.name}在一起。" 你的话让${loverNames[0]}黯然离去。`,
                `${mainNpc.name}露出了胜利的微笑，牵起你的手从${loverNames[0]}身边走过。`
            ],
            double: [
                `你挽住${mainNpc.name}的手臂："我选他。" ${loverNames[0]}和${loverNames[1]}对视一眼，默默离开。`,
                `${mainNpc.name}微笑着看着另外两人，你的选择让他心情大好。`,
                `面对${loverNames[0]}和${loverNames[1]}的目光，你毫不犹豫地走向${mainNpc.name}。`
            ],
            triple: [
                `你在三双眼睛的注视下，坚定地选择了${mainNpc.name}，另外三人失望地离开了。`,
                `${mainNpc.name}把你护在身后："都看到了吧？" ${loverNames.join('、')}悻悻离去。`,
                `这场三选一的难题，你最终选择了${mainNpc.name}。`
            ],
            quadruple: [
                `面对四个人的期待目光，你深吸一口气："对不起，我选${mainNpc.name}。"`,
                `${mainNpc.name}在其他四人的注视下，骄傲地搂住了你的肩膀。`,
                `这可能是你做过最艰难的选择之一，但你最终还是选择了${mainNpc.name}。`
            ],
            quintuple: [
                `在五个恋人中间，你大声宣布："我只想和${mainNpc.name}在一起！"`,
                `${mainNpc.name}露出了难以置信的惊喜表情，而其他五人则神色各异。`,
                `这场六角恋的终极对决，你选择了${mainNpc.name}。`
            ],
            massive: [
                `面对${loverCount + 1}个人的注视，你勇敢地说出了${mainNpc.name}的名字。`,
                `在这么多恋人中选择一个，这需要巨大的勇气，但你做到了。`,
                `${mainNpc.name}成为了这场史诗级修罗场的最终赢家。`
            ]
        },
        2: { // 分手选项
            single: [
                `"我们分手吧。" 你对${mainNpc.name}说，${loverNames[0]}在一旁露出了复杂的表情。`,
                `在${loverNames[0]}面前，你和${mainNpc.name}分手了，场面尴尬至极。`,
                `${mainNpc.name}不可置信地看着你："在他面前...说分手？"`
            ],
            double: [
                `你同时向${mainNpc.name}和${loverNames.join('、')}宣布："我想我们需要重新考虑关系。"`,
                `这场多角恋让你感到疲惫，你决定和${mainNpc.name}分手。`,
                `在${loverCount}个恋人面前提出分手，这可能是你做过最勇敢（或最愚蠢）的决定。`
            ],
            triple: [
                `面对${mainNpc.name}和另外${loverCount}个恋人，你提出了分手。`,
                `"这样的关系太复杂了，我们结束吧。" 你的话让所有人都愣住了。`,
                `这场多角恋终于以你和${mainNpc.name}的分手告终。`
            ],
            quadruple: [
                `在四个人的注视下，你和${mainNpc.name}分手了，整个房间鸦雀无声。`,
                `你意识到自己无法处理这么复杂的关系，决定和${mainNpc.name}结束恋人关系。`,
                `这场涉及多人的恋情，最终以分手收场。`
            ],
            quintuple: [
                `面对五个人的目光，你宣布和${mainNpc.name}分手，场面一度十分尴尬。`,
                `这可能是荣耀圈最尴尬的分手现场：在五个恋人面前提出分手。`,
                `你和${mainNpc.name}的关系，在这场多角恋中走到了尽头。`
            ],
            massive: [
                `在${loverCount + 1}个人面前宣布分手，这需要极大的勇气。`,
                `这场涉及多人的复杂关系，最终以你和${mainNpc.name}的分手告一段落。`,
                `你决定结束这段过于复杂的多角恋关系。`
            ]
        },
        3: { // 沉默不语
            single: [
                `你的沉默让${mainNpc.name}和${loverNames[0]}都感到了失望。`,
                `一言不发的你让气氛更加凝重，两人都在等你的回答。`,
                `沉默不是金...在这种情况下，沉默只会让两人的好感度都下降！`
            ],
            double: [
                `你的沉默让三个人都感到了困惑和失望。`,
                `面对${mainNpc.name}和${loverNames.join('、')}的期待，你选择了沉默。`,
                `不说话并不能解决问题，反而让三个人的关系更加微妙。`
            ],
            triple: [
                `在四个人的注视下，你选择了沉默，这让所有人都感到了不安。`,
                `不说话并不能让这场多角恋自动解决，反而让情况更糟。`,
                `你的沉默让${mainNpc.name}和其他三人都感到了失望。`
            ],
            quadruple: [
                `面对五双期待的眼睛，你选择了沉默，气氛变得更加尴尬。`,
                `不说话并不能让这场复杂的多角恋自动消失。`,
                `你的沉默让在场的五个人都感到了困惑和不满。`
            ],
            quintuple: [
                `在六个人的注视下，你的沉默让整个房间的气氛降到了冰点。`,
                `不说话并不能解决这场史诗级修罗场的问题。`,
                `你的沉默让所有人都感到了失望和不安。`
            ],
            massive: [
                `在这么多人的期待下，你的沉默让场面更加尴尬。`,
                `不说话并不能让这场涉及多人的复杂关系自动理顺。`,
                `你的沉默让在场的${loverCount + 1}个人都感到了困惑。`
            ]
        }
    };

    // 获取对应的场景类型
    let scenarioKey = eventData.scenarioType;
    if (scenarioKey && scenarioKey.startsWith('massive_')) {
        scenarioKey = 'massive';
    }

    // 如果没有对应的场景，使用single作为默认
    const scenarioResults = resultScenarios[choiceIndex][scenarioKey] || resultScenarios[choiceIndex].single;

    return scenarioResults[Math.floor(Math.random() * scenarioResults.length)];
}

// 处理邀约事件（扩展版-日常活动）
function handleInvitationEvent(data) {

    if (Math.random() < 0.4) {
        const { npc, randomNpcId } = data;
        // 获取所有恋人列表（排除当前NPC）
        const allLovers = [];
        for (const id in npcData) {
            if (id !== randomNpcId && npcData[id].gameState && npcData[id].gameState.love === true) {
                allLovers.push(id);
            }
        }

        if (allLovers.length > 0) {
            // 随机选择另一个恋人
            const otherLoverId = allLovers[Math.floor(Math.random() * allLovers.length)];
            const otherLover = npcData[otherLoverId];

            // 定义不同的活动类型（包含电竞活动和日常活动）
            const activityTypes = [
                {
                    name: "荣耀联盟全明星活动",
                    texts: [
                        `荣耀联盟全明星周末即将开始，${npc.name}和${otherLover.name}同时邀请你作为${npc.gender === 'female' ? '她' : '他'}的同伴参加...`,
                        `全明星活动售票开始，${npc.name}拿着两张VIP票找到你：「和我一起去吧！」这时${otherLover.name}也走了过来：「我也刚好有两张票...」`
                    ],
                    resultTexts: {
                        choice1: `你接受了${npc.name}的邀请，一起参加荣耀联盟全明星活动。现场的气氛热烈，你们度过了愉快的时光。`,
                        choice2: `你接受了${otherLover.name}的邀请，一起参加荣耀联盟全明星活动。VIP席位的视角绝佳，比赛精彩纷呈。`,
                        choice3: `你提议大家一起去全明星活动。这个选择让气氛变得有些微妙，不过比赛本身很精彩。`
                    }
                },
                {
                    name: "看电影",
                    texts: [
                        `${npc.name}拿着两张电影票找到你：「新上映的电竞题材电影，要不要一起去看？」这时${otherLover.name}也走过来：「我也买了票，正好可以一起讨论剧情。」`,
                        `电影院门口，${npc.name}和${otherLover.name}同时出现，都想约你看同一场电影。`,
                        `训练结束后，${npc.name}提议：「放松一下，去看电影吧？」话音刚落，${otherLover.name}也说：「我也有这个想法。」`
                    ],
                    resultTexts: {
                        choice1: `你和${npc.name}一起看了电影，观影过程中分享了彼此对剧情的看法。`,
                        choice2: `你和${otherLover.name}一起看了电影，散场后还一起去吃了夜宵。`,
                        choice3: `你提议大家一起去看电影。三个人一起看电影的气氛有些复杂。`
                    }
                },
                {
                    name: "战队聚餐",
                    texts: [
                        `${npc.name}战队的聚餐，${npc.name}邀请你：「今晚战队聚餐，作为家属一起来吧？」${otherLover.name}也过来说：「我们战队今晚也有聚餐，想邀请你参加。」`,
                        `两个战队的聚餐时间撞车了，${npc.name}和${otherLover.name}都希望你能参加${npc.gender === 'female' ? '她' : '他'}们的战队聚餐。`,
                        `休息日晚上，${npc.name}和${otherLover.name}的战队分别有聚餐活动，两人都想带你一起参加。`
                    ],
                    resultTexts: {
                        choice1: `你参加了${npc.name}战队的聚餐，认识了战队的其他成员，气氛很融洽。`,
                        choice2: `你参加了${otherLover.name}战队的聚餐，感受到了热烈的战队团队氛围。`,
                        choice3: `你提议大家一起聚餐。大家聚在一起吃饭，场面一度有些尴尬。`
                    }
                },
                {
                    name: "逛街购物",
                    texts: [
                        `周末，${npc.name}约你：「好久没逛街了，陪我去买衣服吧？」这时${otherLover.name}发来消息：「正好想添置些新装备，要不要一起去电子商城？」`,
                        `商场里，${npc.name}和${otherLover.name}偶然相遇，都希望你能陪${npc.gender === 'female' ? '她' : '他'}逛逛。`,
                        `休息日，${npc.name}想买新的外设，${otherLover.name}想买新的队服，两人都邀请你一起参谋。`
                    ],
                    resultTexts: {
                        choice1: `你陪${npc.name}逛了一下午，帮${npc.gender === 'female' ? '她' : '他'}挑选了合适的物品。`,
                        choice2: `你和${otherLover.name}一起逛电子商城，交流了各种外设的使用心得。`,
                        choice3: `你提议大家一起逛。三个人一起逛街，选择困难症更加严重了。`
                    }
                },
                {
                    name: "咖啡厅约会",
                    texts: [
                        `${npc.name}发来消息：「新开了一家不错的咖啡厅，一起去尝尝？」几乎同时，${otherLover.name}也发消息：「发现一家很好的咖啡馆，要不要去坐坐？」`,
                        `训练间隙，${npc.name}和${otherLover.name}都约你去喝咖啡放松一下。`,
                        `午后，${npc.name}和${otherLover.name}都认为这个时间很适合喝杯咖啡聊聊天。`
                    ],
                    resultTexts: {
                        choice1: `你和${npc.name}在咖啡厅度过了一个悠闲的下午，聊了很多游戏之外的话题。`,
                        choice2: `你和${otherLover.name}在咖啡馆讨论战术，还尝试了店里的特色饮品。`,
                        choice3: `你提议大家一起去喝咖啡。三个人坐在一起，话题有些难以展开。`
                    }
                },
                {
                    name: "电竞主题乐园",
                    texts: [
                        `新开的电竞主题乐园试营业，${npc.name}拿到两张体验券：「周末一起去玩吧？」${otherLover.name}也说：「我朋友给了我两张票，一起去体验下？」`,
                        `电竞主题乐园里，${npc.name}和${otherLover.name}都想和你一起体验各种项目。`,
                        `主题乐园的VR电竞对战区，${npc.name}和${otherLover.name}都想和你组队挑战。`
                    ],
                    resultTexts: {
                        choice1: `你和${npc.name}在主题乐园玩得很开心，尝试了各种电竞相关的娱乐设施。`,
                        choice2: `你和${otherLover.name}组队在VR对战区取得了好成绩，收获了不少奖品。`,
                        choice3: `你提议大家一起去玩。三个人组队在VR对战区，配合有些不太默契。`
                    }
                },
                {
                    name: "夜宵撸串",
                    texts: [
                        `深夜训练结束后，${npc.name}提议：「饿不饿？一起去吃烧烤吧？」${otherLover.name}也凑过来：「我知道有家店的烤串特别好吃。」`,
                        `夜宵时间，${npc.name}和${otherLover.name}都想约你去吃宵夜。`,
                        `街边烧烤摊，${npc.name}和${otherLover.name}同时向你招手，都想请你吃烤串。`
                    ],
                    resultTexts: {
                        choice1: `你和${npc.name}一起吃烧烤，聊着训练中的趣事，气氛轻松愉快。`,
                        choice2: `你和${otherLover.name}去吃了传说中的美味烤串，确实名不虚传。`,
                        choice3: `你提议大家一起去吃烧烤。三个人围坐在烧烤摊前，气氛有些微妙。`
                    }
                }
            ];

            // 随机选择一个活动类型
            const selectedActivity = activityTypes[Math.floor(Math.random() * activityTypes.length)];
            const randomText = selectedActivity.texts[Math.floor(Math.random() * selectedActivity.texts.length)];

            // 修改getRandomChange函数，添加方向参数
            const getRandomChange = (shouldBePositive = false, shouldBeNegative = false) => {
                let change = Math.floor(Math.random() * 21) - 10; // -10到10

                // 避免0
                if (change === 0) {
                    change = Math.random() > 0.5 ? 1 : -1;
                }

                if (shouldBePositive) {
                    return Math.abs(change); // 确保正数
                } else if (shouldBeNegative) {
                    return -Math.abs(change); // 确保负数
                }
                return change; // 完全随机，可能正可能负
            };

            // 创建动态邀约事件
            const dynamicInvitationEvent = {
                activityType: selectedActivity.name,
                npc1: randomNpcId,
                npc2: otherLoverId,
                scene: gameData.currentScene,
                text: randomText,
                resultTexts: selectedActivity.resultTexts,
                choice1: {
                    text: `和${npc.name}一起`,
                    change: getRandomChange(true, false) // 正数
                },
                choice2: {
                    text: `和${otherLover.name}一起`,
                    change: getRandomChange(true, false) // 正数
                },
                choice3: {
                    text: `大家一起去`,
                    change: getRandomChange() // 完全随机（可能正可能负）
                },
                choice1Effect: {
                    npc: otherLoverId,
                    change: getRandomChange(false, true) // 负数
                },
                choice2Effect: {
                    npc: randomNpcId,
                    change: getRandomChange(false, true) // 负数
                },
                choice3Effect: {
                    npc: otherLoverId,
                    change: getRandomChange() // 完全随机（可能正可能负）
                }
            };

            console.log('邀约事件触发成功，活动类型：', selectedActivity.name);

            // 显示邀约面板
            document.getElementById('invitationText').textContent = dynamicInvitationEvent.text;
            document.getElementById('invitationChoose1').textContent = dynamicInvitationEvent.choice1.text;
            document.getElementById('invitationChoose2').textContent = dynamicInvitationEvent.choice2.text;
            document.getElementById('invitationChoose3').textContent = dynamicInvitationEvent.choice3.text;

            // 修改面板标题为具体活动
            const panelTitle = document.querySelector('#invitationPanel h3');
            if (panelTitle) {
                panelTitle.textContent = `${selectedActivity.name}邀约`;
            }

            // 存储事件数据
            document.getElementById('invitationPanel').dataset.event = JSON.stringify(dynamicInvitationEvent);
            document.getElementById('invitationPanel').classList.remove('hidden');

            // 隐藏其他面板
            resetScenePanels();
        } else {
            // 如果没有其他恋人，回退到普通互动
            console.log('没有其他恋人，回退到普通互动');
            handleNormalEvent(data);
        }
    } else {
        handleNormalEvent(data);
        console.log(`邀约转变为一般事件`);
    }

}

// 处理邀约选择（更新版）
function handleInvitationChoice(event) {


    const buttonId = event.target.id;
    const panel = document.getElementById('invitationPanel');

    if (!panel || !panel.dataset.event) {
        console.error('邀约面板或事件数据不存在');
        return;
    }

    const eventData = JSON.parse(panel.dataset.event);
    console.log('处理邀约选择:', buttonId, eventData);

    let selectedChoice, selectedEffect;

    if (buttonId === 'invitationChoose1') {
        selectedChoice = eventData.choice1;
        selectedEffect = eventData.choice1Effect;
        console.log('选择了选项1:', selectedChoice);
    } else if (buttonId === 'invitationChoose2') {
        selectedChoice = eventData.choice2;
        selectedEffect = eventData.choice2Effect;
        console.log('选择了选项2:', selectedChoice);
    } else if (buttonId === 'invitationChoose3') {
        selectedChoice = eventData.choice3;
        selectedEffect = eventData.choice3Effect;
        console.log('选择了选项3:', selectedChoice);
    } else {
        console.error('未知的按钮ID:', buttonId);
        return;
    }

    // 更新NPC好感度
    const npc1Data = npcData[eventData.npc1];
    const npc2Data = npcData[eventData.npc2];

    if (!npc1Data || !npc2Data) {
        console.error('NPC数据不存在:', eventData.npc1, eventData.npc2);
        return;
    }

    // 记录原始好感度用于日志
    const npc1OriginalFavor = npc1Data.gameState.favor;
    const npc2OriginalFavor = npc2Data.gameState.favor;

    // 处理好感度变化
    if (buttonId === 'invitationChoose1') {
        // 选择NPC1：NPC1增加好感度，NPC2减少好感度
        npc1Data.gameState.favor += selectedChoice.change;
        npc2Data.gameState.favor += selectedEffect.change;
        console.log(`${npc1Data.name}好感度变化: +${selectedChoice.change}, 当前: ${npc1Data.gameState.favor}`);
        console.log(`${npc2Data.name}好感度变化: ${selectedEffect.change}, 当前: ${npc2Data.gameState.favor}`);
    } else if (buttonId === 'invitationChoose2') {
        // 选择NPC2：NPC2增加好感度，NPC1减少好感度
        npc2Data.gameState.favor += selectedChoice.change;
        npc1Data.gameState.favor += selectedEffect.change;
        console.log(`${npc2Data.name}好感度变化: +${selectedChoice.change}, 当前: ${npc2Data.gameState.favor}`);
        console.log(`${npc1Data.name}好感度变化: ${selectedEffect.change}, 当前: ${npc1Data.gameState.favor}`);
    } else {
        // 大家一起去：两个NPC的好感度完全随机变化
        npc1Data.gameState.favor += selectedChoice.change; // NPC1完全随机
        npc2Data.gameState.favor += selectedEffect.change; // NPC2完全随机
        console.log(`${npc1Data.name}好感度随机变化: ${selectedChoice.change}, 当前: ${npc1Data.gameState.favor}`);
        console.log(`${npc2Data.name}好感度随机变化: ${selectedEffect.change}, 当前: ${npc2Data.gameState.favor}`);
    }

    // 确保好感度不低于0
    if (npc1Data.gameState.favor < 0) {
        console.log(`${npc1Data.name}好感度低于0，调整为0 (原: ${npc1Data.gameState.favor})`);
        npc1Data.gameState.favor = 0;
    }
    if (npc2Data.gameState.favor < 0) {
        console.log(`${npc2Data.name}好感度低于0，调整为0 (原: ${npc2Data.gameState.favor})`);
        npc2Data.gameState.favor = 0;
    }

    // 计算实际变化值
    const npc1ActualChange = npc1Data.gameState.favor - npc1OriginalFavor;
    const npc2ActualChange = npc2Data.gameState.favor - npc2OriginalFavor;

    // 生成结果文本（使用对应活动的结果文本）
    // 生成结果文本（使用对应活动的结果文本）
    let resultText = "";
    if (buttonId === 'invitationChoose1') {
        resultText = `${eventData.resultTexts.choice1}<span class="favor-change">(${npc1Data.name}好感度${npc1ActualChange > 0 ? '+' : ''}${npc1ActualChange}，${npc2Data.name}好感度${npc2ActualChange > 0 ? '+' : ''}${npc2ActualChange})</span>`;
    } else if (buttonId === 'invitationChoose2') {
        resultText = `${eventData.resultTexts.choice2}<span class="favor-change">(${npc2Data.name}好感度${npc2ActualChange > 0 ? '+' : ''}${npc2ActualChange}，${npc1Data.name}好感度${npc1ActualChange > 0 ? '+' : ''}${npc1ActualChange})</span>`;
    } else {
        resultText = `${eventData.resultTexts.choice3}<span class="favor-change">(${npc1Data.name}好感度${npc1ActualChange > 0 ? '+' : ''}${npc1ActualChange}，${npc2Data.name}好感度${npc2ActualChange > 0 ? '+' : ''}${npc2ActualChange})</span>`;
    }

    console.log('结果文本:', resultText);

    // 记录事件
    addEventRecord(resultText, 'invitation');

    // 显示结果面板
    document.getElementById('resultText').innerHTML = resultText;
    document.querySelector('#resultPanel h3').textContent = `${eventData.activityType}结果`;
    resultPanel.classList.remove('wg-mode');

    // 切换面板
    panel.classList.add('hidden');
    document.getElementById('resultPanel').classList.remove('hidden');
    // 更新游戏状态
    updateStatus();
    autoSaveGame();
}


// 处理忙碌事件
function handleBusyEvent(data) {
    const { npc, randomNpcId } = data;
    // 获取当前好感度
    const favor = npcData[randomNpcId].gameState.favor;

    const noInteractionTexts = [
        `${npc.name}正忙着打副本，没注意到你，你安静地在一旁坐了会儿就离开了。`,
        `${npc.name}在和队友讨论战术，看起来很投入，你不想打扰${npc.gender === 'female' ? '她' : '他'}，默默离开了。`
    ];
    const randomNoInteractionText = noInteractionTexts[Math.floor(Math.random() * noInteractionTexts.length)];
    document.getElementById('noInteractionText').textContent = randomNoInteractionText;
    document.getElementById('noInteractionPanel').classList.remove('hidden');
    // 重新绑定"继续探索"按钮的点击事件
    const skipNoInteractionBtn = document.getElementById('skipNoInteraction');
    if (skipNoInteractionBtn) {
        // 先移除旧的事件监听器
        skipNoInteractionBtn.replaceWith(skipNoInteractionBtn.cloneNode(true));
        // 重新获取按钮并绑定新事件
        const newSkipBtn = document.getElementById('skipNoInteraction');
        newSkipBtn.addEventListener('click', function () {
            document.getElementById('backToMap').click();
            autoSaveGame();
        });
    }

}

// 处理普通互动
function handleNormalEvent(data, noRecord = false) {
    const { npc, randomNpcId } = data;
    const favor = npcData[randomNpcId].gameState.favor || 0;
    const isLove = npcData[randomNpcId].gameState.love || false;
    // 获取前任状态
    let isEx = npcData[randomNpcId].gameState.ex || false;

    // ========== 1. 先处理前任概率 ==========
    // 如果isEx为true，只有30%概率真正触发前任逻辑，70%概率当作普通NPC
    if (isEx) {
        if (Math.random() < 0.3) {
            // 30%概率：保持isEx为true，触发前任逻辑
            isEx = true;
        } else {
            // 70%概率：当作普通NPC，不触发前任逻辑
            isEx = false;
        }
        console.log('前任，但是isex:' + isEx);
    }


    // ========== 1. 确定对话类型 ==========
    let dialogType = "low";
    if (isEx) {
        dialogType = "ex";  // 前任专用
    } else if (isLove) {
        dialogType = "love";
    } else if (favor >= 80) {
        dialogType = "high";
    } else if (favor >= 40) {
        dialogType = "mid";
    }

    if (isEx) {
        interactionPanel.classList.add('ex-mode');
    } else {
        interactionPanel.classList.remove('ex-mode');
    }

    //alert(dialogType + "favor=" + favor);
    // ========== 2. 获取对话内容 ==========
    let dialogs;
    if (isEx) {
        // 前任对话：优先定制，否则通用
        const exDialogs = [
            `${npc.name}看到你，表情复杂：「...」`,
            `${npc.name}转过头：「训练很忙，我先走了...」`,
            `${npc.name}沉默片刻：「过去的事，就让它过去吧...」`,
            `${npc.name}勉强笑了笑：「你过得还好吗？」`,
            `${npc.name}轻叹一声：「这里还是老样子，只是...」`
        ];
        dialogs = (npc.dialogs && npc.dialogs.ex) ? npc.dialogs.ex : exDialogs;
    } else {
        dialogs = npc.dialogs && npc.dialogs[dialogType];
    }

    // 如果还是没有对话，使用默认
    if (!dialogs || dialogs.length === 0) {
        dialogs = [npc.name + "看着你，欲言又止..."];
    }

    // 随机选择一个问题
    const questionIndex = Math.floor(Math.random() * dialogs.length);
    const randomDialog = dialogs[questionIndex];

    // ========== 3. 获取选项 ==========
    let choices;
    if (isEx) {
        // 前任专用选项
        choices = [
            {
                text: "请求复合",
                favorChange: 5,
                customEvent: {
                    resultText: `你向前任${npc.name}提出复合...`,
                    eventRecord: `向前任${npc.name}提出复合`
                }
            },
            {
                text: "祝你幸福",
                favorChange: 0,
                customEvent: {
                    resultText: `你真诚地祝福${npc.name}...`,
                    eventRecord: `祝福前任${npc.name}幸福`
                }
            },
            {
                text: "不理他",
                favorChange: -3,
                customEvent: {
                    resultText: `你装作没看见${npc.name}...`,
                    eventRecord: `不理睬前任${npc.name}`
                }
            }
        ];
    } else if (npc.choicesByIndex && npc.choicesByIndex[dialogType] && questionIndex !== null) {
        // 新格式：按索引获取对应问题的选择项
        choices = npc.choicesByIndex[dialogType][questionIndex];
    } else if (npc.choices && npc.choices[dialogType]) {
        // 旧格式：同一类型所有问题共用同一套选择项
        choices = npc.choices[dialogType];
    } else {
        // 默认选项
        choices = [
            { text: "同意", favorChange: 5 },
            { text: "拒绝", favorChange: 0 },
            { text: "不理他", favorChange: -2 }
        ];
    }

    // ========== 4. 更新UI显示 ==========
    // 对话内容
    document.getElementById('npcDialog').textContent = randomDialog;

    // 状态标签
    document.getElementById('npcExBadge').classList.toggle('hidden', !isEx);
    document.getElementById('npcLoveBadge').classList.toggle('hidden', !isLove);

    // 战队标签
    const teamTag = document.getElementById('npcTeamTag');
    if (npc.team) {
        teamTag.textContent = teamConfig[npc.team].name;
        teamTag.className = `team-tag ${teamConfig[npc.team].color}`;
        teamTag.classList.remove('hidden');
    } else {
        teamTag.classList.add('hidden');
    }

    // 选项按钮文本
    document.getElementById('choice1').textContent = choices[0].text;
    document.getElementById('choice2').textContent = choices[1].text;
    document.getElementById('choiceIgnore').textContent = choices[2]?.text || "不理他";

    // ========== 5. 绑定事件（保持原有方式） ==========
    document.getElementById('choice1').onclick = () =>
        handleChoice(randomNpcId, 0, dialogType, questionIndex, noRecord);

    document.getElementById('choice2').onclick = () =>
        handleChoice(randomNpcId, 1, dialogType, questionIndex, noRecord);

    document.getElementById('choiceIgnore').onclick = () =>
        handleIgnore(randomNpcId, dialogType, questionIndex, noRecord);

    // ========== 6. 显示面板 ==========
    document.getElementById('interactionPanel').classList.remove('hidden');
}

// 显示普通互动（当日已有事件时调用）
function showNormalInteraction(scene) {
    // 直接显示错误提示，不进行任何判断
    resetScenePanels();
    // 显示提示文字
    document.getElementById('noInteractionText').textContent = "今天似乎有些奇怪，什么事情也没有发生。";
    document.getElementById('noInteractionPanel').classList.remove('hidden');
    // 记录事件
    addEventRecord("今天似乎有些奇怪，什么事情也没有发生。");
    // 重新绑定"继续探索"按钮的点击事件
    const skipNoInteractionBtn = document.getElementById('skipNoInteraction');
    if (skipNoInteractionBtn) {
        // 先移除旧的事件监听器
        skipNoInteractionBtn.replaceWith(skipNoInteractionBtn.cloneNode(true));
        // 重新获取按钮并绑定新事件
        const newSkipBtn = document.getElementById('skipNoInteraction');
        newSkipBtn.addEventListener('click', function () {
            document.getElementById('backToMap').click();
            autoSaveGame();
        });
    }
    return;
}


// 处理选项点击事件
function handleChoice(npcId, choiceIndex, dialogType, questionIndex = null, noRecord = false) {
    const npc = npcData[npcId];

    // 获取前任状态
    const isEx = npcData[npcId].gameState.ex || false;

    // ========== 前任特殊处理 ==========
    if (isEx && dialogType === "ex") {
        if (choiceIndex === 0) {
            // 求复合
            handleExReconcile(npcId);
            return;
        } else if (choiceIndex === 1) {
            // 祝幸福
            handleExChoice(npcId, choiceIndex, 0, noRecord); // 祝福不改变好感
            return;
        }
    }

    // ========== 普通NPC处理 ==========
    let choice;

    // 优先使用 choicesByIndex（新格式）
    if (npc.choicesByIndex && npc.choicesByIndex[dialogType] && questionIndex !== null) {
        const newChoices = npc.choicesByIndex[dialogType][questionIndex];
        if (newChoices && newChoices[choiceIndex]) {
            choice = newChoices[choiceIndex];
        }
    }

    // 如果新格式没找到或不能用，后备使用 choices（旧格式）
    if (!choice && npc.choices && npc.choices[dialogType]) {
        const oldChoices = npc.choices[dialogType];
        if (oldChoices && oldChoices[choiceIndex]) {
            choice = oldChoices[choiceIndex];
        }
    }

    // 如果两个都没找到，使用默认值
    if (!choice) {
        console.error(`未找到选择项: npc=${npcId}, type=${dialogType}, index=${choiceIndex}`);
        choice = { text: "默认选项", favorChange: 1 };
    }

    // 应用好感度变化
    const favorChange = choice.favorChange || 1;
    npcData[npcId].gameState.favor += favorChange;
    if (npcData[npcId].gameState.favor > 120) npcData[npcId].gameState.favor = 120;

    let resultContent = "";

    // ========== 检查定制化事件 ==========
    if (choice.customEvent) {
        // 使用定制化结果文本
        const baseResult = choice.customEvent.resultText;
        const changeSymbol = favorChange >= 0 ? '+' : '';

        resultContent = `
            ${baseResult}<br>
            <span style="color: #ef4444; font-weight: bold;">
                ${npc.name}好感度${changeSymbol}${favorChange}
            </span>
        `;

        // 记录事件：在...提问中，你选择了...
        if (!noRecord) {
            // 获取对话问题
            let question = "";
            if (npc.dialogs && npc.dialogs[dialogType] && questionIndex !== null) {
                const dialogs = npc.dialogs[dialogType];
                question = dialogs[questionIndex] || "";
            }

            if (question) {
                addEventRecord(`在${npc.name}提问"${question}"中，你选择了"${choice.text}"<span class="favor-change">(${npc.name}好感度${favorChange >= 0 ? '+' : ''}${favorChange})</span>`);
            } else {
                addEventRecord(`面对${npc.name}，你选择了"${choice.text}"<span class="favor-change">(${npc.name}好感度${favorChange >= 0 ? '+' : ''}${favorChange})</span>`);
            }
        }
    } else {
        // ========== 原有逻辑（兼容） ==========
        if (favorChange >= 7) {
            resultContent = `${npc.name}对你的反应非常满意，好感度+${favorChange}！你们的关系又近了一步～`;
        } else if (favorChange >= 4) {
            resultContent = `${npc.name}觉得和你相处很愉快，好感度+${favorChange}！`;
        } else if (favorChange >= 0) {
            resultContent = `${npc.name}对你的回答很满意，好感度+${favorChange}～`;
        } else {
            resultContent = `${npc.name}对你的回答有些失落，好感度${favorChange}～`;
        }

        // 记录事件：在...提问中，你选择了...
        if (!noRecord) {
            // 获取对话问题
            let question = "";
            if (npc.dialogs && npc.dialogs[dialogType] && questionIndex !== null) {
                const dialogs = npc.dialogs[dialogType];
                question = dialogs[questionIndex] || "";
            }

            if (question) {
                addEventRecord(`在${npc.name}提问"${question}"中，你选择了"${choice.text}"<span class="favor-change">(${npc.name}好感度${favorChange >= 0 ? '+' : ''}${favorChange})</span>`);
            } else {
                addEventRecord(`面对${npc.name}，你选择了"${choice.text}"<span class="favor-change">(${npc.name}好感度${favorChange >= 0 ? '+' : ''}${favorChange})</span>`);
            }
        }
    }

    // 显示结果面板前，修改标题
    const resultTitle = document.querySelector('#resultPanel h3');
    resultPanel.classList.remove('wg-mode');
    if (resultTitle) {
        resultTitle.textContent = "交互结果";
    }

    document.getElementById('resultText').innerHTML = resultContent;
    resetScenePanels();
    document.getElementById('resultPanel').classList.remove('hidden');
}

// 处理忽略选项
function handleIgnore(npcId, dialogType, questionIndex = null, noRecord = false) {
    const npc = npcData[npcId];

    // 获取前任状态
    const isEx = npcData[npcId].gameState.ex || false;

    // ========== 前任特殊处理 ==========
    if (isEx && dialogType === "ex") {
        handleExIgnore(npcId);
        return;
    }

    // ========== 普通NPC处理 ==========
    let ignoreChoice;
    let favorChange;

    // 如果有choicesByIndex且questionIndex不为null，使用新格式
    if (npc.choicesByIndex && npc.choicesByIndex[dialogType] && questionIndex !== null) {
        // 新格式：按索引获取对应问题的忽略选项
        const newChoices = npc.choicesByIndex[dialogType][questionIndex];
        ignoreChoice = newChoices[2] || { favorChange: -2 };
        favorChange = ignoreChoice.favorChange || ignoreChoice.ignore || -2;
    } else {
        // 旧格式
        const choices = npc.choices && npc.choices[dialogType];
        ignoreChoice = (choices && choices[2]) || { ignore: -2 };
        favorChange = ignoreChoice.ignore || -2;
    }

    // 应用好感度变化
    npcData[npcId].gameState.favor += favorChange;
    // 增加不理次数
    npcData[npcId].gameState.ignoreCount = (npcData[npcId].gameState.ignoreCount || 0) + 1;
    if (npcData[npcId].gameState.favor < 0) npcData[npcId].gameState.favor = 0;

    let resultContent = "";

    // ========== 检查定制化事件 ==========
    if (ignoreChoice.customEvent) {
        // 使用定制化结果文本
        const baseResult = ignoreChoice.customEvent.resultText;
        const changeSymbol = favorChange >= 0 ? '+' : '';

        resultContent = `
            ${baseResult}<br>
            <span style="color: #ef4444; font-weight: bold;">
                ${npc.name}好感度${changeSymbol}${favorChange}
            </span>
        `;

        // 记录事件
        if (!noRecord) {
            // 获取对话问题
            let question = "";
            if (npc.dialogs && npc.dialogs[dialogType] && questionIndex !== null) {
                const dialogs = npc.dialogs[dialogType];
                question = dialogs[questionIndex] || "";
            }

            if (question) {
                addEventRecord(`在${npc.name}提问"${question}"中，你选择了不理睬，${npc.name}好感度${changeSymbol}${favorChange}。`);
            } else {
                addEventRecord(`面对${npc.name}，你选择了不理睬，${npc.name}好感度${changeSymbol}${favorChange}。`);
            }
        }
    } else {
        // ========== 原有逻辑（兼容） ==========
        if (Math.abs(favorChange) >= 5) {
            resultContent = `${npc.name}看到你不理${npc.gender === 'female' ? '她' : '他'}，很伤心，好感度${favorChange}！你们的关系变得有些疏远。`;
        } else {
            resultContent = `${npc.name}对你的冷淡有些失落，好感度${favorChange}～`;
        }

        // 记录事件
        if (!noRecord) {
            // 获取对话问题
            let question = "";
            if (npc.dialogs && npc.dialogs[dialogType] && questionIndex !== null) {
                const dialogs = npc.dialogs[dialogType];
                question = dialogs[questionIndex] || "";
            }

            if (question) {
                addEventRecord(`在${npc.name}提问"${question}"中，你选择了不理睬，${npc.name}好感度${favorChange >= 0 ? '+' : ''}${favorChange}。`);
            } else {
                addEventRecord(`面对${npc.name}，你选择了不理睬，${npc.name}好感度${favorChange >= 0 ? '+' : ''}${favorChange}。`);
            }
        }

        // 定制化的不理次数警告
        const ignoreCount = npcData[npcId].gameState.ignoreCount || 0;

        if (npcId === "yexiu" || npcId === "wangjiexi") {
            if (ignoreCount >= 4) resultContent += ` ${npc.name}似乎对你有些失望，出现的次数会减少了。`;
            if (ignoreCount >= 7) resultContent += ` ${npc.name}对你彻底失望，不会再出现了。`;
        }
        else if (npcId === "chenguo" || npcId === "sumucheng") {
            if (ignoreCount >= 4) resultContent += ` ${npc.name}眼睛红了，看起来很难过。`;
            if (ignoreCount >= 10) resultContent += ` ${npc.name}哭着跑开了，不会再理你了。`;
        }
        else if (npcId === "huangshaotian") {
            if (ignoreCount >= 5) resultContent += ` ${npc.name}的话明显变少了，不再像以前那样缠着你了。`;
            if (ignoreCount >= 20) resultContent += ` ${npc.name}最后看了你一眼，默默地离开了。`;
        }
        else if (npcId === "hanwenqing") {
            if (ignoreCount >= 2) resultContent += ` ${npc.name}的眼神变得冰冷。`;
            if (ignoreCount >= 3) resultContent += ` ${npc.name}冷哼一声，转身就走。`;
        }
        else {
            if (ignoreCount >= 3) resultContent += ` ${npc.name}似乎对你有些失望，出现的次数会减少了。`;
            if (ignoreCount >= 5) resultContent += ` ${npc.name}对你彻底失望，不会再出现了。`;
        }
    }

    // 显示结果
    document.getElementById('resultText').innerHTML = resultContent;
    resetScenePanels();
    document.getElementById('resultPanel').classList.remove('hidden');
}



function handleIgnore(npcId, dialogType, questionIndex = null, noRecord = false) {
    const npc = npcData[npcId];

    // 获取前任状态
    const isEx = npcData[npcId].gameState.ex || false;

    // ========== 前任特殊处理 ==========
    if (isEx && dialogType === "ex") {
        handleExIgnore(npcId);
        return;
    }

    // ========== 普通NPC处理 ==========
    let ignoreChoice;
    let favorChange;

    // 如果有choicesByIndex且questionIndex不为null，使用新格式
    if (npc.choicesByIndex && npc.choicesByIndex[dialogType] && questionIndex !== null) {
        // 新格式：按索引获取对应问题的忽略选项
        const newChoices = npc.choicesByIndex[dialogType][questionIndex];
        ignoreChoice = newChoices[2] || { favorChange: -2 };
        favorChange = ignoreChoice.favorChange || ignoreChoice.ignore || -2;
    } else {
        // 旧格式
        const choices = npc.choices && npc.choices[dialogType];
        ignoreChoice = (choices && choices[2]) || { ignore: -2 };
        favorChange = ignoreChoice.ignore || -2;
    }

    // 应用好感度变化
    npcData[npcId].gameState.favor += favorChange;
    // 增加不理次数
    npcData[npcId].gameState.ignoreCount = (npcData[npcId].gameState.ignoreCount || 0) + 1;
    if (npcData[npcId].gameState.favor < 0) npcData[npcId].gameState.favor = 0;

    let resultContent = "";

    // ========== 检查定制化事件 ==========
    if (ignoreChoice.customEvent) {
        // 使用定制化结果文本
        const baseResult = ignoreChoice.customEvent.resultText;
        const changeSymbol = favorChange >= 0 ? '+' : '';

        resultContent = `
            ${baseResult}<br>
            <span style="color: #ef4444; font-weight: bold;">
                ${npc.name}好感度${changeSymbol}${favorChange}
            </span>
        `;

        // 记录定制化事件
        if (!noRecord) {
            let recordText;
            if (ignoreChoice.customEvent.eventRecord) {
                recordText = `${ignoreChoice.customEvent.eventRecord}，${npc.name}好感度${changeSymbol}${favorChange}。`;
            } else {
                recordText = `不理${npc.name}，${npc.name}好感度${changeSymbol}${favorChange}。`;
            }
            addEventRecord(recordText);
        }
    } else {
        // ========== 原有逻辑（兼容） ==========
        if (Math.abs(favorChange) >= 5) {
            resultContent = `${npc.name}看到你不理${npc.gender === 'female' ? '她' : '他'}，很伤心，好感度${favorChange}！你们的关系变得有些疏远。`;
        } else {
            resultContent = `${npc.name}对你的冷淡有些失落，好感度${favorChange}～`;
        }

        // 定制化的不理次数警告
        const ignoreCount = npcData[npcId].gameState.ignoreCount || 0;

        if (npcId === "yexiu" || npcId === "wangjiexi") {
            if (ignoreCount >= 4) resultContent += ` ${npc.name}似乎对你有些失望，出现的次数会减少了。`;
            if (ignoreCount >= 7) resultContent += ` ${npc.name}对你彻底失望，不会再出现了。`;
        }
        else if (npcId === "chenguo" || npcId === "sumucheng") {
            if (ignoreCount >= 4) resultContent += ` ${npc.name}眼睛红了，看起来很难过。`;
            if (ignoreCount >= 10) resultContent += ` ${npc.name}哭着跑开了，不会再理你了。`;
        }
        else if (npcId === "huangshaotian") {
            if (ignoreCount >= 5) resultContent += ` ${npc.name}的话明显变少了，不再像以前那样缠着你了。`;
            if (ignoreCount >= 20) resultContent += ` ${npc.name}最后看了你一眼，默默地离开了。`;
        }
        else if (npcId === "hanwenqing") {
            if (ignoreCount >= 2) resultContent += ` ${npc.name}的眼神变得冰冷。`;
            if (ignoreCount >= 3) resultContent += ` ${npc.name}冷哼一声，转身就走。`;
        }
        else {
            if (ignoreCount >= 3) resultContent += ` ${npc.name}似乎对你有些失望，出现的次数会减少了。`;
            if (ignoreCount >= 5) resultContent += ` ${npc.name}对你彻底失望，不会再出现了。`;
        }

        // 记录事件（可以记录具体是哪个问题）
        if (!noRecord) {
            if (questionIndex !== null && npc.dialogs && npc.dialogs[dialogType]) {
                const dialogs = npc.dialogs[dialogType];
                const question = dialogs[questionIndex] || "（未知问题）";
                addEventRecord(`面对${npc.name}的问题"${question}"，你选择了不理睬，${npc.name}感到失落，好感度${favorChange >= 0 ? '+' : ''}${favorChange}。`);
            } else {
                addEventRecord(`你选择不理${npc.name}，${npc.name}感到失落，好感度${favorChange >= 0 ? '+' : ''}${favorChange}。`);
            }
        }
    }

    // 显示结果
    document.getElementById('resultText').innerHTML = resultContent;
    resetScenePanels();
    document.getElementById('resultPanel').classList.remove('hidden');
}

// 根据好感度和不理次数计算NPC出现权重
function calculateNpcWeights(npcIds) {
    const weights = [];

    npcIds.forEach(npcId => {
        const npc = npcData[npcId];
        if (!npc) return;

        let weight = 10; // 基础权重10

        // 好感度权重：每20点好感+1权重
        const favorBonus = Math.floor((npc.gameState.favor || 0) / 20);
        weight += favorBonus;

        // 恋人权重：只加5（原30）
        if (npc.gameState.love) weight += 5;

        // 前任惩罚：减权重
        if (npc.gameState.ex) weight -= 3;

        // 被忽略惩罚
        const ignoreCount = npc.gameState.ignoreCount || 0;
        if (ignoreCount > 0) {
            weight = Math.max(1, weight - Math.min(ignoreCount, 5));
        }

        // 确保最小权重为1
        weight = Math.max(1, weight);

        weights.push(weight);
    });

    console.log('权重详情:', npcIds.map((id, i) => {
        const npc = npcData[id];
        return `${npc.name}=${weights[i]} (好感${npc.gameState.favor}, 恋人${npc.gameState.love}, ignore${npc.gameState.ignoreCount || 0})`;
    }));

    return weights;
}

// 根据权重随机选择NPC
function weightedRandom(items, weights) {
    if (!items || items.length === 0) return null;
    if (items.length === 1) return items[0];

    console.log('weightedRandom 输入:', {
        items: items.map(id => npcData[id]?.name),
        weights: weights
    });

    // 计算总权重
    const totalWeight = weights.reduce((a, b) => a + b, 0);
    console.log('总权重:', totalWeight);

    // 生成随机数
    let random = Math.random() * totalWeight;
    console.log('随机数:', random, '/', totalWeight);

    // 遍历查找
    let accumulated = 0;
    for (let i = 0; i < items.length; i++) {
        accumulated += weights[i];
        console.log(`检查 ${npcData[items[i]]?.name}: 权重=${weights[i]}, 累计=${accumulated}`);

        if (random < accumulated) {
            console.log(`选中: ${npcData[items[i]]?.name}`);
            return items[i];
        }
    }

    // 如果循环结束还没返回，返回最后一个
    console.log('循环结束，返回最后一个');
    return items[items.length - 1];
}



/**
 * 处理前任复合请求
 */
function handleExReconcile(npcId) {
    const npc = npcData[npcId];
    const npcState = npcData[npcId].gameState;

    // 复合成功率：基础20% + 当前好感度加成（最高40%）
    const baseChance = 0.2;
    const favorBonus = (npcState.favor / 120) * 0.3;
    const reconcileChance = Math.min(baseChance + favorBonus, 0.5);

    // 生成随机数
    const randomValue = Math.random();

    // 简洁输出
    console.log(`复合率：${(reconcileChance * 100).toFixed(1)}%，随机数：${randomValue.toFixed(3)}，结果：${randomValue < reconcileChance ? '成功' : '失败'}`);

    if (randomValue < reconcileChance) {
        // ========== 复合成功 ==========
        npcState.love = true;
        npcState.ex = false;
        npcState.favor = Math.min(100, npcState.favor + 20);

        const successTexts = [
            `${npc.name}眼中泛起泪光：「其实...我也一直在等你这句话。」`,
            `${npc.name}紧紧抱住你：「这次，我们不要再分开了...」`,
            `${npc.name}声音哽咽：「我还以为...你再也不会回来了。」`,
            `${npc.name}轻轻握住你的手：「过去的就让它过去，我们重新开始。」`
        ];
        const randomText = successTexts[Math.floor(Math.random() * successTexts.length)];

        const resultContent = `
            ${randomText}<br><br>
            <span style="color: #ef4444; font-weight: bold;">
                复合成功！你们重新成为恋人，${npc.name}好感度+20
            </span>
        `;

        document.getElementById('resultText').innerHTML = resultContent;
        addEventRecord(`向前任${npc.name}提出复合，${npc.name}同意了，你们重新成为恋人！`);

        // 显示结果面板
        const resultTitle = document.querySelector('#resultPanel h3');
        if (resultTitle) {
            resultTitle.textContent = "复合成功";
        }

    } else {// ========== 复合失败 ==========
        // 随机好感度变化：-5到-15之间
        const favorChange = Math.floor(Math.random() * 21) - 10; // -10到10
        npcState.favor += favorChange;
        if (npcState.favor < 0) npcState.favor = 0;

        const rejectTexts = [
            `${npc.name}苦笑摇头：「抱歉...有些伤痕，需要更长时间愈合。」`,
            `${npc.name}沉默良久：「我们还是...保持现状比较好。」`,
            `${npc.name}眼神复杂：「给我一点时间，好吗？」`,
            `${npc.name}别过脸去：「已经回不去了...对不起。」`,
            `${npc.name}轻声叹息：「有些东西，碎了就再也拼不回来了。」`
        ];
        const randomText = rejectTexts[Math.floor(Math.random() * rejectTexts.length)];

        const resultContent = `
    ${randomText}<br><br>
    <span style="color: #ef4444; font-weight: bold;">
        复合被拒，${npc.name}好感度${favorChange}
    </span>
`;

        document.getElementById('resultText').innerHTML = resultContent;
        addEventRecord(`向前任${npc.name}提出复合，但被拒绝了，${npc.name}好感度${favorChange}。`);

        // 显示结果面板
        const resultTitle = document.querySelector('#resultPanel h3');
        if (resultTitle) {
            resultTitle.textContent = "复合失败";
        }
    }

    resetScenePanels();
    document.getElementById('resultPanel').classList.remove('hidden');
}

/**
 * 处理前任普通选项（祝福）
 */
function handleExChoice(npcId, choiceIndex, favorChange, noRecord = false) {
    const npc = npcData[npcId];

    const blessTexts = [
        `${npc.name}微微一笑：「谢谢你的祝福...你也要幸福。」`,
        `${npc.name}点头：「你也是。」`,
        `${npc.name}轻声说：「能听到你这么说，我很高兴...」`,
        `${npc.name}眼中闪过一丝释然：「嗯，我们都要好好的。」`,
        `${npc.name}展露笑颜：「谢谢你，让我能笑着祝福你。」`
    ];
    const randomText = blessTexts[Math.floor(Math.random() * blessTexts.length)];

    // 应用好感度变化
    favorChange = Math.floor(Math.random() * 21) - 10; // 生成 -10 到 10 的随机数（包含0）
    npcData[npcId].gameState.favor += favorChange;
    if (npcData[npcId].gameState.favor > 120) npcData[npcId].gameState.favor = 120;
    if (npcData[npcId].gameState.favor < 0) npcData[npcId].gameState.favor = 0;

    const changeSymbol = favorChange >= 0 ? '+' : '';
    const resultContent = `
        ${randomText}<br><br>
        <span style="color: #ef4444; font-weight: bold;">
            ${npc.name}好感度${changeSymbol}${favorChange}
        </span>
    `;

    document.getElementById('resultText').innerHTML = resultContent;

    if (!noRecord) {
        addEventRecord(`祝福前任${npc.name}幸福，${npc.name}好感度${changeSymbol}${favorChange}。`);
    }

    // 显示结果面板
    const resultTitle = document.querySelector('#resultPanel h3');
    if (resultTitle) {
        resultTitle.textContent = "祝福前任";
    }

    resetScenePanels();
    document.getElementById('resultPanel').classList.remove('hidden');
}

/**
 * 处理前任"不理他"选项（在handleIgnore中调用）
 */
function handleExIgnore(npcId) {
    const npc = npcData[npcId];
    const npcState = npcData[npcId].gameState;

    // 不理前任的惩罚更重
    const favorChange = -15;
    npcState.favor += favorChange;
    npcState.ignoreCount = (npcState.ignoreCount || 0) + 1;
    if (npcState.favor < 0) npcState.favor = 0;

    const ignoreTexts = [
        `${npc.name}看着你离去的背影，眼神黯淡...`,
        `${npc.name}苦笑：「连句话都不愿说吗...」`,
        `${npc.name}默默转身，消失在走廊尽头...`,
        `${npc.name}张了张嘴，最终什么也没说...`,
        `${npc.name}低下头，掩饰眼中的失落...`
    ];
    const randomText = ignoreTexts[Math.floor(Math.random() * ignoreTexts.length)];

    const resultContent = `
    ${randomText}<br><br>
    <span style="color: #ef4444; font-size: 0.9em;">
        你不理睬${npc.name}，${npc.name}很受伤，好感度${favorChange}
    </span>
`;

    document.getElementById('resultText').innerHTML = resultContent;
    addEventRecord(`不理睬前任${npc.name}，${npc.name}很受伤，好感度${favorChange}。`);

    // 定制化的不理次数警告（前任更敏感）
    const ignoreCount = npcState.ignoreCount || 0;
    let warningText = "";

    if (ignoreCount >= 2) {
        warningText += ` ${npc.name}似乎彻底死心了...`;
    }

    if (warningText) {
        document.getElementById('resultText').innerHTML += `<br><span style="color: #dc2626;font-size: 0.9em;">${warningText}</span>`;
    }

    // 显示结果面板
    const resultTitle = document.querySelector('#resultPanel h3');
    if (resultTitle) {
        resultTitle.textContent = "不理前任";
    }

    resetScenePanels();
    document.getElementById('resultPanel').classList.remove('hidden');
}



// 在页面加载完成后添加邀约按钮事件监听
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM加载完成，添加邀约按钮事件监听');

    // 邀约按钮事件监听
    const invitationChoose1 = document.getElementById('invitationChoose1');
    const invitationChoose2 = document.getElementById('invitationChoose2');
    const invitationChoose3 = document.getElementById('invitationChoose3');

    if (invitationChoose1) {
        console.log('找到invitationChoose1按钮');
        invitationChoose1.addEventListener('click', handleInvitationChoice);
    } else {
        console.error('未找到invitationChoose1按钮');
    }

    if (invitationChoose2) {
        console.log('找到invitationChoose2按钮');
        invitationChoose2.addEventListener('click', handleInvitationChoice);
    } else {
        console.error('未找到invitationChoose2按钮');
    }

    if (invitationChoose3) {
        console.log('找到invitationChoose3按钮');
        invitationChoose3.addEventListener('click', handleInvitationChoice);
    } else {
        console.error('未找到invitationChoose3按钮');
    }
});
