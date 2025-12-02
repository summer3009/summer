// 初始化场景交互 - 重新设计介绍系统
function initSceneInteraction(scene) {
    resetScenePanels();
    // 检查是否已经发生过当日事件
    //alert("检查场景1"+gameData.dayEvents);
    // alert("检查场景2=="+gameData.day+"==="+gameData.dayEvents[gameData.day]);
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
        // 确保npcData中存在该角色且有gameState
        if (!npcData[npcId] || !npcData[npcId].gameState) return false;
        return npcData[npcId].gameState.ignoreCount < 5;
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
        // 直接添加嫉妒事件，不再检查固定的jealousyEvents数组
        possibleEvents.push({
            type: 'jealousy',
            priority: 180,
            data: { npc, randomNpcId }
        });
        console.log(`满足嫉妒事件条件，添加动态嫉妒事件`);
    }

    // ========== 3. 亲密事件（第三优先级） ========== 
    if (isLove && favor >= 80) {
        const daysSinceLastIntimate = gameData.day - (gameData.lastIntimateDay[randomNpcId] || 0);
        if (daysSinceLastIntimate >= 2) {
            possibleEvents.push({
                type: 'intimate',
                priority: 160, // 第三优先级
                data: { npc, randomNpcId, favor }
            });
        }
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

    //alert(selectedEvent.type);

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
    if (loveCount > 0 && Math.random() < 0.9) { // 40%概率抑制告白
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
                `${npc.name}的告白话语到了嘴边，${loverNames[0]}和${loverNames[1]}的身影却在脑海中浮现。${npc.gender === 'female' ? '她' : '他'}最终只是轻轻拍了拍你的肩：「要好好对待她们啊。」`,
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
        document.getElementById('confessText').textContent = npc.confess;
        document.getElementById('npcName1').textContent = npc.name;
        document.getElementById('npcTeamTag1').classList.toggle('hidden', !npc.team);
        if (npc.team) {
            document.getElementById('npcTeamTag1').textContent = teamConfig[npc.team].name;
            document.getElementById('npcTeamTag1').className = `team-tag ${teamConfig[npc.team].color}`;
        }
        document.getElementById('confessPanel').dataset.npcId = randomNpcId;
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
                let change = Math.floor(Math.random() * 61) - 30; // -30到30
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
    //alert("处理普通互动");
    const { npc, randomNpcId, favor, isLove } = data;
    let dialogType = "low";
    if (favor >= 40 && favor < 80) dialogType = "mid";
    else if (favor >= 80 && !isLove) dialogType = "high";
    else if (isLove) dialogType = "love";
    const dialogs = npc.dialogs[dialogType];

    // 新增：记录问题索引
    const questionIndex = Math.floor(Math.random() * dialogs.length); // 新增这一行
    const randomDialog = dialogs[questionIndex]; // 修改这一行

    // const randomDialog = dialogs[Math.floor(Math.random() * dialogs.length)];
    document.getElementById('npcDialog').textContent = randomDialog;
    document.getElementById('npcLoveBadge').classList.toggle('hidden', !isLove);
    document.getElementById('npcTeamTag').classList.toggle('hidden', !npc.team);
    if (npc.team) {
        document.getElementById('npcTeamTag').textContent = teamConfig[npc.team].name;
        document.getElementById('npcTeamTag').className = `team-tag ${teamConfig[npc.team].color}`;
    }

    //const choices = npc.choices[dialogType];

    // === 关键修改：智能获取choices ===
    let choices;
    if (npc.choicesByIndex && npc.choicesByIndex[dialogType]) {
        // 使用新格式：按索引获取对应问题的选择项
        choices = npc.choicesByIndex[dialogType][questionIndex];
        // alert("使用新格式choicesByIndex");
    } else {
        // 回退到旧格式：同一类型所有问题共用同一套选择项
        choices = npc.choices[dialogType];
        //alert("使用旧格式choices");
    }

    document.getElementById('choice1').textContent = choices[0].text;
    document.getElementById('choice2').textContent = choices[1].text;

    // 修改这里：传递questionIndex参数
    //alert("传递questionIndex参数");
    document.getElementById('choice1').onclick = () => handleChoice(randomNpcId, 0, dialogType, questionIndex, noRecord); // 添加questionIndex
    document.getElementById('choice2').onclick = () => handleChoice(randomNpcId, 1, dialogType, questionIndex, noRecord); // 添加questionIndex
    document.getElementById('choiceIgnore').onclick = () => handleIgnore(randomNpcId, dialogType, questionIndex, noRecord); // 添加questionIndex

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

    // 直接返回，不执行任何其${npc.gender === 'female' ? '她' : '他'}逻辑
    return;
}

// 处理互动选择
function handleChoice000(npcId, choiceIndex, dialogType, noRecord = false) {
    const npc = npcData[npcId];
    const choices = npc.choices[dialogType];
    const choice = choices[choiceIndex];
    // 正常好感度增长值
    const favorChange = choice.favorChange || 5;
    npcData[npcId].gameState.favor += favorChange;

    if (npcData[npcId].gameState.favor > 120) npcData[npcId].gameState.favor = 120;

    let resultContent = "";
    if (favorChange >= 7) {
        resultContent = `${npc.name}对你的反应非常满意，好感度+${favorChange}！你们的关系又近了一步～`;
    } else if (favorChange >= 4) {
        resultContent = `${npc.name}觉得和你相处很愉快，好感度+${favorChange}！`;
    } else {
        resultContent = `${npc.name}对你的回答很满意，好感度+${favorChange}～`;
    }

    if (!noRecord) {
        addEventRecord(`选择和${npc.name}${choice.text}，${npc.name}好感度+${favorChange}。`);
    }

    document.getElementById('resultText').textContent = resultContent;
    resetScenePanels();
    document.getElementById('resultPanel').classList.remove('hidden');
}

function handleChoice(npcId, choiceIndex, dialogType, questionIndex = null, noRecord = false) { // 添加questionIndex参数
    //alert("handleChoice");  
    const npc = npcData[npcId];
    const choices = npc.choices[dialogType];
    const choice = choices[choiceIndex];
    //alert("handleChoice");
    // 如果有choicesByIndex且questionIndex不为null，使用新格式
    if (npc.choicesByIndex && npc.choicesByIndex[dialogType] && questionIndex !== null) {
        //alert("00");
        // 新格式：按索引获取对应问题的选择项
        const newChoices = npc.choicesByIndex[dialogType][questionIndex];
        const newChoice = newChoices[choiceIndex];
        // 优先使用新格式的好感度变化
        const favorChange = newChoice.favorChange || choice.favorChange || 5;
        npcData[npcId].gameState.favor += favorChange;
        if (npcData[npcId].gameState.favor > 120) npcData[npcId].gameState.favor = 120;

        let resultContent = "";
        if (favorChange >= 7) {
            resultContent = `${npc.name}对你的反应非常满意，好感度+${favorChange}！你们的关系又近了一步～`;
        } else if (favorChange >= 4) {
            resultContent = `${npc.name}觉得和你相处很愉快，好感度+${favorChange}！`;
        } else {
            resultContent = `${npc.name}对你的回答很满意，好感度+${favorChange}～`;
        }

        if (!noRecord) {
            // 可以记录具体是哪个问题的回答
            const dialogs = npc.dialogs[dialogType];
            const question = dialogs[questionIndex] || "（未知问题）";
            addEventRecord(`面对${npc.name}的问题"${question}"，你选择了"${newChoice.text}"，${npc.name}好感度+${favorChange}。`);
        }

        document.getElementById('resultText').textContent = resultContent;
        resetScenePanels();
        document.getElementById('resultPanel').classList.remove('hidden');
        return; // 提前返回
    }

    // 以下是原有代码（旧格式处理）
    const favorChange = choice.favorChange || 5;
    npcData[npcId].gameState.favor += favorChange;
    if (npcData[npcId].gameState.favor > 120) npcData[npcId].gameState.favor = 120;

    let resultContent = "";
    if (favorChange >= 7) {
        resultContent = `${npc.name}对你的反应非常满意，好感度+${favorChange}！你们的关系又近了一步～`;
    } else if (favorChange >= 4) {
        resultContent = `${npc.name}觉得和你相处很愉快，好感度+${favorChange}！`;
    } else {
        resultContent = `${npc.name}对你的回答很满意，好感度+${favorChange}～`;
    }
    if (!noRecord) {
        addEventRecord(`选择和${npc.name}${choice.text}，${npc.name}好感度+${favorChange}。`);
    }
    document.getElementById('resultText').textContent = resultContent;
    resetScenePanels();
    document.getElementById('resultPanel').classList.remove('hidden');
}


// 处理不理${npc.gender === 'female' ? '她' : '他'}选项
function handleIgnore000(npcId, dialogType, noRecord = false) {
    const npc = npcData[npcId];
    const choices = npc.choices[dialogType];
    const favorChange = choices[2].ignore || -2;
    npcData[npcId].gameState.favor += favorChange;

    // 增加不理次数
    npcData[npcId].gameState.ignoreCount = (npcData[npcId].gameState.ignoreCount || 0) + 1;
    if (npcData[npcId].gameState.favor < 0) npcData[npcId].gameState.favor = 0;
    let resultContent = "";
    if (Math.abs(favorChange) >= 5) {
        resultContent = `${npc.name}看到你不理${npc.gender === 'female' ? '她' : '他'}，很伤心，好感度${favorChange}！你们的关系变得有些疏远。`;
    } else {
        resultContent = `${npc.name}对你的冷淡有些失落，好感度${favorChange}～`;
    }

    if (npcData[npcId].gameState.ignoreCount >= 3) {
        resultContent += ` ${npc.name}似乎对你有些失望，出现的次数会减少了。`;
    }
    if (npcData[npcId].gameState.ignoreCount >= 5) {
        resultContent += ` ${npc.name}对你彻底失望，不会再出现了。`;
    }

    if (!noRecord) {
        addEventRecord(`你选择不理${npc.name}，${npc.name}感到失落，好感度${favorChange}。`);
    }

    document.getElementById('resultText').textContent = resultContent;
    resetScenePanels();
    document.getElementById('resultPanel').classList.remove('hidden');
}

function handleIgnore(npcId, dialogType, questionIndex = null, noRecord = false) { // 添加questionIndex参数
    const npc = npcData[npcId];
    let choices;
    let ignoreChoice;
    let favorChange;

    // 如果有choicesByIndex且questionIndex不为null，使用新格式
    if (npc.choicesByIndex && npc.choicesByIndex[dialogType] && questionIndex !== null) {
        // 新格式：按索引获取对应问题的忽略选项
        const newChoices = npc.choicesByIndex[dialogType][questionIndex];
        ignoreChoice = newChoices[2] || { text: "忽略", favorChange: -2 };
        favorChange = ignoreChoice.favorChange || ignoreChoice.ignore || -2;
    } else {
        // 旧格式
        choices = npc.choices[dialogType];
        ignoreChoice = choices[2] || { ignore: -2 };
        favorChange = ignoreChoice.ignore || -2;
    }

    // 以下是原有代码不变
    npcData[npcId].gameState.favor += favorChange;
    // 增加不理次数
    npcData[npcId].gameState.ignoreCount = (npcData[npcId].gameState.ignoreCount || 0) + 1;

    if (npcData[npcId].gameState.favor < 0) npcData[npcId].gameState.favor = 0;

    let resultContent = "";
    if (Math.abs(favorChange) >= 5) {
        resultContent = `${npc.name}看到你不理${npc.gender === 'female' ? '她' : '他'}，很伤心，好感度${favorChange}！你们的关系变得有些疏远。`;
    } else {
        resultContent = `${npc.name}对你的冷淡有些失落，好感度${favorChange}～`;
    }

    if (npcData[npcId].gameState.ignoreCount >= 3) {
        resultContent += ` ${npc.name}似乎对你有些失望，出现的次数会减少了。`;
    }
    if (npcData[npcId].gameState.ignoreCount >= 5) {
        resultContent += ` ${npc.name}对你彻底失望，不会再出现了。`;
    }

    // 记录事件（可以记录具体是哪个问题）
    if (!noRecord) {
        if (questionIndex !== null && npc.choicesByIndex) {
            const dialogs = npc.dialogs[dialogType];
            const question = dialogs[questionIndex] || "（未知问题）";
            addEventRecord(`面对${npc.name}的问题"${question}"，你选择了不理睬，${npc.name}感到失落，好感度${favorChange}。`);
        } else {
            addEventRecord(`你选择不理${npc.name}，${npc.name}感到失落，好感度${favorChange}。`);
        }
    }

    document.getElementById('resultText').textContent = resultContent;
    resetScenePanels();
    document.getElementById('resultPanel').classList.remove('hidden');
}

// 修罗场事件配置
const jealousyEvents = [
    {
        npc1: "yexiu",
        npc2: "huangshaotian",
        scene: "happy",
        text: "你和叶修正在网吧约会，黄少天突然推门进来：「老叶！约好打训练赛的...咦？这位是？」叶修一把将你拉到身边，黄少天的眼神瞬间变得幽怨。",
        choice1: { npc: "yexiu", change: 5 },
        choice2: { npc: "huangshaotian", change: 3 },
        choice1Effect: { npc: "huangshaotian", change: -3 },
        choice2Effect: { npc: "yexiu", change: -2 }
    }
];


