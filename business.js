// 初始化场景交互 - 重新设计介绍系统
function initSceneInteraction(scene) {
    resetScenePanels();
    // 确保关键数据结构存在
    gameData.lastIntimateDay = gameData.lastIntimateDay || {};
    gameData.lastConfessDay = gameData.lastConfessDay || {};
    gameData.introHistory = gameData.introHistory || {};


    if (gameData.dayEvents && gameData.dayEvents[gameData.day]) {
        // 当日已有事件，直接显示常规互动
        // alert("已有事件" + gameData.dayEvents[gameData.day]);
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
            // 初始角色或被介绍过的角色
            // 根据README，只有兴欣战队成员是初始可见的
            const isInitial = ['yexiu', 'chenguo'].includes(npcId);
            const isIntroduced = Object.values(gameData.introHistory).some(intro => intro[npcId]);
            return isInitial || isIntroduced;
        });
    } else {
        // 普通场景逻辑
        availableNpcs = currentTeam.members.filter(npcId => {
            // 初始角色或被介绍过的角色
            // 根据README，只有兴欣战队成员是初始可见的
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
    //alert(`${npc.name}`);
    // 收集所有可能的事件
    const possibleEvents = [];
    // ========== 1. 告白事件（最高优先级） ==========  
    if (!isLove && favor >= 80) {
        //const daysSinceLastConfess = gameData.day - (gameData.lastConfessDay[randomNpcId] || 0);
        //  if (daysSinceLastConfess >= 3) {
        possibleEvents.push({
            type: 'confess',
            priority: 200, // 最高优先级
            data: { npc, randomNpcId, favor }
        });
        // }
    }
    // ========== 2. 嫉妒事件（第二优先级） ========== 
    // 正确统计恋人数量
    let loveCount = 0;
    for (const id in npcData) {
        if (npcData[id].gameState && npcData[id].gameState.love === true) {
            loveCount++;
        }
    }
    //alert(loveCount);
    console.log(`嫉妒事件检查: ${npc.name}, 是否恋人: ${isLove}, 总恋人数: ${loveCount}`);
    if (loveCount >= 2 && isLove) {
        possibleEvents.push({
            type: 'jealousy',
            priority: 180,
            data: { npc, randomNpcId, favor }
        });
        console.log(`满足嫉妒事件条件，添加动态嫉妒事件`);
    }

    // ========== 3. 亲密事件（第三优先级） ========== 
    if (isLove && favor >= 80) {
        //const daysSinceLastIntimate = gameData.day - (gameData.lastIntimateDay[randomNpcId] || 0);
        // if (daysSinceLastIntimate >= 2) {
        possibleEvents.push({
            type: 'intimate',
            priority: 160, // 第三优先级
            data: { npc, randomNpcId, favor }
        });
        //  }
    }

    // ========== 4. 社交介绍事件（第四优先级，特殊规则优先） ==========
    if (npc.introTargets && npc.introTargets.length > 0 && favor >= 31) {
        // 找到可以介绍的目标
        const availableIntroTargets = npc.introTargets.filter(intro => {
            const targetId = intro.target;
            const targetTeam = intro.team;
            const favorRequire = intro.favorRequire || 31; // 默认好感度要求为31点
            // 检查目标是否已解锁（初始角色或被介绍过）
            const isTargetInitial = ['yexiu', 'chenguo'].includes(targetId);
            const isTargetIntroduced = Object.values(gameData.introHistory).some(intro => intro[targetId]);
            const isTargetUnlocked = isTargetInitial || isTargetIntroduced;

            // 只介绍未解锁的人，且满足好感度要求，且未介绍过
            return !isTargetUnlocked &&
                favor >= favorRequire &&
                !gameData.introHistory[randomNpcId]?.[targetId];
        });

        if (availableIntroTargets.length > 0) {
            possibleEvents.push({
                type: 'intro',
                priority: 140, // 第四优先级
                data: { npc, randomNpcId, favor, availableIntroTargets }
            });
        }
    }

    // ========== 5. 忙碌事件（偶尔发生） ========== 
    possibleEvents.push({
        type: 'busy',
        priority: 70, // 高于普通互动
        data: { npc, randomNpcId }
    });


    // ========== 6. 普通互动（最低优先级） ========== 
    possibleEvents.push({
        type: 'normal',
        priority: 60,
        data: { npc, randomNpcId, favor, isLove }
    });

    // 按优先级排序
    possibleEvents.sort((a, b) => b.priority - a.priority);

    // 简化的概率选择：最高优先级有80%概率，其${npc.gender === 'female' ? '她' : '他'}均分20%
    let selectedEvent;
    if (Math.random() < 0.6) {
        // 80%概率选择最高优先级事件
        selectedEvent = possibleEvents[0];
    } else {
        // 20%概率在其${npc.gender === 'female' ? '她' : '他'}事件中随机选择
        const otherEvents = possibleEvents.slice(1);
        if (otherEvents.length > 0) {
            selectedEvent = otherEvents[Math.floor(Math.random() * otherEvents.length)];
        } else {
            selectedEvent = possibleEvents[0];
        }
    }

    alert(selectedEvent.type);

    // 特殊规则：介绍事件额外加成（可选）
    if (possibleEvents.some(e => e.type === 'intro') && selectedEvent.type !== 'intro') {
        // 如果当前选中的不是介绍事件，但有介绍事件可用，有25%概率替换为介绍事件
        if (Math.random() < 0.25) {
            const introEvent = possibleEvents.find(e => e.type === 'intro');
            if (introEvent) {
                selectedEvent = introEvent;
            }
        }
    }

    // 重要：一旦选择了高优先级事件，立即标记当天事件类型并返回
    // 防止后续任何事件触发
    if (selectedEvent && selectedEvent.type !== 'normal' && selectedEvent.type !== 'busy') {
        // 高优先级事件（告白、嫉妒、亲密、介绍）立即标记，不再进入其${npc.gender === 'female' ? '她' : '他'}事件
        if (!gameData.dayEvents) {
            gameData.dayEvents = {};
        }
        gameData.dayEvents[gameData.day] = selectedEvent.type;
        handleSelectedEvent(selectedEvent);
        return; // 直接返回，不再执行后续逻辑
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
function handleIntroEvent(data) {
    const { npc, randomNpcId, favor, availableIntroTargets } = data;
    console.log('处理介绍事件:', { npc: npc.name, randomNpcId, favor, availableTargetsCount: availableIntroTargets.length });

    // 基础介绍成功率
    let introProbability = Math.min(0.4, 0.4 + (favor - 31) * 0.1); // 31点时50%概率，每增加10点好感度增加20%概率
    console.log('介绍成功率:', introProbability);

    //alert(introProbability);

    // 随机选择介绍目标（所有人都不区分本队和跨队）
    let selectedIntro = availableIntroTargets[Math.floor(Math.random() * availableIntroTargets.length)];
    // 仅基于概率判断是否触发介绍
    if (Math.random() < introProbability) {
        // alert("触发");
        // 添加空值检查，确保selectedIntro存在且有target属性
        if (!selectedIntro || !selectedIntro.target) {
            console.error('介绍目标数据不完整:', selectedIntro);
            return;
        }

        const targetMemberId = selectedIntro.target;
        const targetMember = npcData[targetMemberId];
        const targetTeam = selectedIntro.team;
        // 确保目标成员和战队数据存在
        if (!targetMember || !teamConfig[targetTeam]) {
            console.error('目标成员或战队数据不存在:', { targetMemberId, targetTeam });
            return;
        }

        const isSameTeam = targetTeam === npc.team;
        console.log(`${npc.name} 介绍 ${targetMember.name} (${teamConfig[targetTeam].name}战队)`);
        let introText = "";
        if (isSameTeam) {
            // 队内介绍
            const teamIntroTexts = [
                `${npc.name}打完副本后走到你身边：「给你介绍下，这是我们战队的${targetMember.name}，以后一起组队啊！」${targetMember.name}笑着朝你挥手：「久仰大名，一起玩啊～」`,
                `${npc.name}拉着${targetMember.name}走到你面前：「这是我常跟你提起的朋友，你们认识一下吧！」${targetMember.name}友好地对你说：「你好，很高兴认识你～」`
            ];
            introText = teamIntroTexts[Math.floor(Math.random() * teamIntroTexts.length)];
        } else {
            // 跨队介绍
            const crossIntroTexts = [
                `${npc.name}神秘地对你眨眨眼：「想认识其${npc.gender === 'female' ? '她' : '他'}战队的选手吗？给你介绍${teamConfig[targetTeam].name}战队的${targetMember.name}，${npc.gender === 'female' ? '她' : '他'}可是很厉害的选手呢！」`,
                `${npc.name}翻着手机通讯录：「对了，${teamConfig[targetTeam].name}的${targetMember.name}最近也在找你呢，要不要认识一下？」`,
                `训练结束后，${npc.name}拉住你：「下周我们要和${teamConfig[targetTeam].name}打训练赛，先带你认识一下${npc.gender === 'female' ? '她' : '他'}们的${targetMember.name}吧！」`,
                `${npc.name}兴奋地对你说：「我刚联系了${teamConfig[targetTeam].name}的${targetMember.name}，${npc.gender === 'female' ? '她' : '他'}也很想认识你呢！」`
            ];
            // 统一使用随机生成的介绍文本
            introText = crossIntroTexts[Math.floor(Math.random() * crossIntroTexts.length)];
        }
        // 先重置所有场景面板，确保没有其${npc.gender === 'female' ? '她' : '他'}面板干扰
        resetScenePanels();

        // 设置介绍文本并显示面板
        const introPanel = document.getElementById('introPanel');
        if (introPanel) {
            // 先确保面板是隐藏的，然后设置文本，最后显示
            introPanel.classList.add('hidden');
            document.getElementById('introText').textContent = introText;
            // 使用setTimeout确保DOM更新完成后再显示面板
            setTimeout(() => {
                introPanel.classList.remove('hidden');
                console.log('介绍面板已显示');
                // 再次检查面板是否真的显示
                setTimeout(() => {
                    const isVisible = !introPanel.classList.contains('hidden');
                    console.log('面板可见性检查:', isVisible);
                    if (!isVisible) {
                        console.error('面板显示失败，重新显示');
                        introPanel.classList.remove('hidden');
                    }
                }, 50);
            }, 10);
        } else {
            console.error('未找到介绍面板元素');
        }
        // 设置介绍后的初始好感度
        if (npcData[targetMemberId].gameState.favor === 0) { // 只给未接触过的NPC设置初始好感度
            npcData[targetMemberId].gameState.favor = Math.floor(Math.random() * 30) + 1; // 1-30之间的随机数
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
        let eventContent = `${npc.name}介绍你认识了${targetMember.name}`;
        if (!isSameTeam) {
            eventContent += `，开启了与${teamConfig[targetTeam].name}战队的交流`;
        }
        eventContent += "～";

        // 记录介绍事件（使用特殊标记防止被覆盖）
        addEventRecord(eventContent, 'intro');
        // 如果是跨队介绍，解锁新场景
        if (!isSameTeam) {
            checkSceneUnlock(targetTeam);
        }
    } else {
        // 介绍没触发，进入一般事件
        //alert("介绍未触发，进入一般事件");
        console.log(`${npc.name} 介绍事件未触发，回退到普通互动`);
        // 重置面板
        resetScenePanels();
        // 显示普通互动
        handleNormalEvent({ npc, randomNpcId, favor, isLove: npcData[randomNpcId].gameState.love });
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

    // 原有告白逻辑...
    const confessChance = Math.min(0.6, 0.3 + (favor - 80) * 0.02);

    // 告白成功率基于好感度
    if (Math.random() < confessChance) {
        console.log(`触发告白！好感度: ${favor}, 概率: ${confessChance}`);

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
    } else {
        // 告白失败，回退到普通互动
        handleNormalEvent(data);
    }
}

// 处理亲密事件
function handleIntimateEvent(data) {
    const { npc, randomNpcId, favor } = data;
    const intimateChance = Math.min(0.5, 0.2 + (favor - 80) * 0.01);
    if (Math.random() < intimateChance) {
        console.log(`触发亲密事件！好感度: ${favor}, 概率: ${intimateChance}`);
        const randomIntimateEvent = npc.intimateEvents[Math.floor(Math.random() * npc.intimateEvents.length)];
        document.getElementById('intimateText').textContent = randomIntimateEvent;
        document.getElementById('intimatePanel').classList.remove('hidden');
        gameData.lastIntimateDay[randomNpcId] = gameData.day;
    } else {
        // 亲密事件失败，回退到普通互动
        handleNormalEvent(data);
    }
}


// 处理嫉妒事件
function handleJealousyEvent(data) {
    const { npc, randomNpcId } = data;
    if (Math.random() < 0.2) {
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
            // 生成随机嫉妒对白
            const jealousyTexts = [
                `你在${npc.name}的战队基地，突然${otherLover.name}走了进来，冷冷地看着你们...`,
                `${npc.name}和${otherLover.name}在走廊相遇，两人同时停下脚步，目光在你身上交汇。`,
                `你正和${npc.name}说话时，${otherLover.name}突然出现："看来你很忙啊？"`,
                `${npc.name}搂着你的肩膀时，${otherLover.name}恰好经过："呵，这就是你说'在训练'的原因？"`
            ];

            const randomText = jealousyTexts[Math.floor(Math.random() * jealousyTexts.length)];
            // 生成随机数值（-30到30，排除0）
            const getRandomChange = () => {
                let change = Math.floor(Math.random() * 21) - 10; // -30到30
                return change === 0 ? 1 : change; // 避免0
            };

            // 创建动态嫉妒事件
            const dynamicJealousyEvent = {
                npc1: randomNpcId,
                npc2: otherLoverId,
                scene: gameData.currentScene,
                text: randomText,
                choice1: {
                    text: `选择${npc.name}`,
                    change: getRandomChange()
                },
                choice2: {
                    text: `跟${npc.name}分手`,
                    change: getRandomChange(),
                    breakUp: true
                },
                choice3: {
                    text: `沉默不语`,
                    change: getRandomChange()
                },
                choice1Effect: {
                    npc: otherLoverId,
                    change: getRandomChange()
                },
                choice2Effect: {
                    npc: otherLoverId,
                    change: getRandomChange()
                },
                choice3Effect: {
                    npc: otherLoverId,
                    change: getRandomChange()
                }
            };

            console.log('嫉妒事件触发成功');
            // 更新文本和按钮
            document.getElementById('jealousyText').textContent = dynamicJealousyEvent.text;
            document.getElementById('jealousyChoose1').textContent = dynamicJealousyEvent.choice1.text;
            document.getElementById('jealousyChoose2').textContent = dynamicJealousyEvent.choice2.text;
            document.getElementById('jealousyChoose3').textContent = dynamicJealousyEvent.choice3.text;

            document.getElementById('jealousyPanel').dataset.event = JSON.stringify(dynamicJealousyEvent);
            document.getElementById('jealousyPanel').classList.remove('hidden');
        } else {
            // 如果没有其${npc.gender === 'female' ? '她' : '他'}恋人，回退到普通互动
            console.log('没有其他恋人，回退到普通互动');
            handleNormalEvent(data);
        }
    } else {
        // 嫉妒事件失败，回退到普通互动
        console.log('嫉妒事件未触发，回退到普通互动');
        handleNormalEvent(data);
    }
}


// 处理忙碌事件
function handleBusyEvent(data) {
    const { npc, randomNpcId } = data;
    // 获取当前好感度
    const favor = npcData[randomNpcId].gameState.favor;
    //alert(favor);
    // 基础忙碌事件触发概率
    let busyProbability = 0.3;
    // 好感度影响：好感度大于50时概率下降
    if (favor > 50) {
        // 好感度越高，忙碌概率越低
        // 50-100好感度范围内，概率从20%线性下降到5%
        busyProbability = 0.2 - (favor - 50) * 0.003;
        busyProbability = Math.max(0.05, busyProbability); // 最低保持5%概率
    }

    //alert(`${npc.name}忙碌事件概率: ${(busyProbability * 100).toFixed(1)}%, 好感度: ${favor}`);

    // 忙碌事件触发概率
    if (Math.random() < busyProbability) {
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
    } else {
        // 忙碌事件失败，回退到普通互动
        handleNormalEvent(data);
    }
}

// 处理普通互动
function handleNormalEvent(data, noRecord = false) {
    const { npc, randomNpcId } = data;
    const favor = npcData[randomNpcId].gameState.favor || 0;
    const isLove = npcData[randomNpcId].gameState.love || false;
    // 获取前任状态
    const isEx = npcData[randomNpcId].gameState.ex || false;

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
    alert(dialogType + "favor=" + favor);
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
                text: "我们还能重新开始吗？",
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
                addEventRecord(`在${npc.name}提问"${question}"中，你选择了"${choice.text}"，${npc.name}好感度${favorChange >= 0 ? '+' : ''}${favorChange}。`);
            } else {
                addEventRecord(`面对${npc.name}，你选择了"${choice.text}"，${npc.name}好感度${favorChange >= 0 ? '+' : ''}${favorChange}。`);
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
                addEventRecord(`在${npc.name}提问"${question}"中，你选择了"${choice.text}"，${npc.name}好感度${favorChange >= 0 ? '+' : ''}${favorChange}。`);
            } else {
                addEventRecord(`面对${npc.name}，你选择了"${choice.text}"，${npc.name}好感度${favorChange >= 0 ? '+' : ''}${favorChange}。`);
            }
        }
    }

    // 显示结果面板前，修改标题
    const resultTitle = document.querySelector('#resultPanel h3');
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
function calculateNpcWeights(availableNpcs) {
    const weights = {};
    availableNpcs.forEach(npcId => {
        const favor = npcData[npcId].gameState.favor;
        const ignoreCount = npcData[npcId].gameState.ignoreCount;
        const isLove = npcData[npcId].gameState.love;
        let weight = 1;
        // 增强好感度加成
        if (favor > 0) {
            weight += Math.sqrt(favor) * 3; // 从2提高到3
        }
        // 添加高好感度额外加成
        if (favor >= 80) {
            weight *= 3; // 80+好感度：3倍权重！
            console.log(`高好感度 ${npcData[npcId].name}: 额外3倍权重`);
        } else if (favor >= 60) {
            weight *= 2; // 60-79好感度：2倍权重
        } else if (favor >= 40) {
            weight *= 1.5; // 40-59好感度：1.5倍权重
        }

        // 添加恋人专属大幅加成
        if (isLove) {
            weight *= 5; // 恋人：5倍权重！
            console.log(`恋人 ${npcData[npcId].name}: 额外5倍权重`);
        }
        // 减轻忽略惩罚
        if (ignoreCount > 0) {
            weight *= Math.pow(0.7, ignoreCount); // 从0.5改为0.7，惩罚减轻
        }

        if (ignoreCount >= 3) {
            weight *= 0.3; // 从0.1改为0.3
        }
        if (ignoreCount >= 5) {
            weight = 0;
        }
        weights[npcId] = Math.max(0, weight);
        // 调试信息
        console.log(`权重计算 ${npcData[npcId].name}: 基础=${weight.toFixed(2)}, 好感度=${favor}, 恋人=${isLove}, 忽略=${ignoreCount}`);
    });
    return weights;
}

// 根据权重随机选择NPC
function weightedRandom(availableNpcs, weights) {
    const totalWeight = availableNpcs.reduce((sum, npcId) => sum + weights[npcId], 0);
    if (totalWeight === 0) {
        return availableNpcs[Math.floor(Math.random() * availableNpcs.length)];
    }
    let random = Math.random() * totalWeight;
    let weightSum = 0;

    for (const npcId of availableNpcs) {
        weightSum += weights[npcId];
        if (random <= weightSum) {
            return npcId;
        }
    }
    return availableNpcs[availableNpcs.length - 1];
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
        <span style="color: #ef4444; font-weight: bold;">
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
        document.getElementById('resultText').innerHTML += `<br><span style="color: #dc2626;">${warningText}</span>`;
    }

    // 显示结果面板
    const resultTitle = document.querySelector('#resultPanel h3');
    if (resultTitle) {
        resultTitle.textContent = "不理前任";
    }

    resetScenePanels();
    document.getElementById('resultPanel').classList.remove('hidden');
}
