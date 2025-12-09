// 自动保存游戏到本地存储（会话持久化）
function autoSaveGame() {
    try {
        const saveData = {
            gameData: JSON.parse(JSON.stringify(gameData)),
            npcStates: {},
            currentPage: getCurrentPage(),
            currentScene: getCurrentScene(),
            timestamp: new Date().getTime(),
            achievements: JSON.parse(JSON.stringify(achievementsData)) // 保存成就
        };
        // 保存NPC状态
        for (const id in npcData) {
            if (npcData[id].gameState) {
                saveData.npcStates[id] = JSON.parse(JSON.stringify(npcData[id].gameState));
            }
        }
        localStorage.setItem('honor_game_save', JSON.stringify(saveData));
         // 确保gameData中有成就数据
        saveData.gameData.achievements = JSON.parse(JSON.stringify(achievementsData));
        console.log('游戏已自动保存');
    } catch (e) {
        console.error('自动保存失败:', e);
    }
}

// 加载自动存档（无过期限制）
function loadAutoSave() {
    // alert("加载自动存档");
    try {
        const savedData = localStorage.getItem('honor_game_save');
        if (savedData) {
            const loadedData = JSON.parse(savedData);
            console.log('发现自动存档，正在恢复游戏...');

             // 恢复成就数据
            if (loadedData.achievements) {
                achievementsData = JSON.parse(JSON.stringify(loadedData.achievements));
            } else if (loadedData.gameData && loadedData.gameData.achievements) {
                achievementsData = JSON.parse(JSON.stringify(loadedData.gameData.achievements));
            }

            // 清空当前游戏数据
            for (const key in gameData) {
                delete gameData[key];
            }
            // 恢复游戏数据
            Object.assign(gameData, JSON.parse(JSON.stringify(loadedData.gameData)));
            // 强制设置当前场景为空，确保进入游戏时显示地图
            gameData.currentScene = "";
            //alert('0000');
            // 恢复NPC状态前，先确保所有NPC都有定义
            ensureAllCharactersDefined();
            // 恢复NPC状态
            for (const id in loadedData.npcStates) {
                if (npcData[id]) {
                    npcData[id].gameState = JSON.parse(JSON.stringify(loadedData.npcStates[id]));
                }
            }
            // 确保必要的数据结构存在
            if (!Array.isArray(gameData.events)) {
                gameData.events = [];
            }
            if (!gameData.lastConfessDay) {
                gameData.lastConfessDay = {};
            }
            if (!gameData.lastIntimateDay) {
                gameData.lastIntimateDay = {};
            }
            if (!gameData.unlockedScenes) {
                gameData.unlockedScenes = ['home', 'happy'];
            }
            console.log('自动存档恢复成功');

             // 检查成就
            setTimeout(() => {
                checkAchievements();
            }, 100);

            return true;
        }
        return false;
    } catch (e) {
        console.error('加载自动存档失败:', e);
        return false;
    }
}

// 获取当前页面
function getCurrentPage() {
    if (document.getElementById('scenePage') && !document.getElementById('scenePage').classList.contains('hidden')) {
        return 'scenePage';
    } else if (document.getElementById('homePage') && !document.getElementById('homePage').classList.contains('hidden')) {
        return 'homePage';
    } else if (document.getElementById('mapPage') && !document.getElementById('mapPage').classList.contains('hidden')) {
        return 'mapPage';
    } else if (document.getElementById('coverPage') && !document.getElementById('coverPage').classList.contains('hidden')) {
        return 'coverPage';
    }
    return 'mapPage';
}

// 获取当前场景
function getCurrentScene() {
    const currentPage = getCurrentPage();
    if (currentPage === 'scenePage') {
        return gameData.currentScene || '';
    } else if (currentPage === 'homePage') {
        return "home";
    }
    return "";
}

// 设置自动保存钩子
function setupAutoSaveHooks() {
    // 在关键操作后自动保存
    const originalUpdateStatus = updateStatus;
    updateStatus = function () {
        const result = originalUpdateStatus.apply(this, arguments);
        setTimeout(() => {
            autoSaveGame();
            checkAchievements();
        }, 100);
        return result;
    };
    const originalAddEventRecord = addEventRecord;
    addEventRecord = function () {
        const result = originalAddEventRecord.apply(this, arguments);
        setTimeout(() => {
            autoSaveGame();
            checkAchievements();
        }, 100);
        return result;
    };
    const originalUpdateHomePage = updateHomePage;
    updateHomePage = function () {
        const result = originalUpdateHomePage.apply(this, arguments);
        setTimeout(() => {
            autoSaveGame();
            checkAchievements();
        }, 100);
        return result;
    };
}

// 修改进入游戏函数 - 自动恢复上次进度
function enterGame() {
    console.log('进入游戏...');
    //alert("entergame");
     // 初始化成就数据
    initAchievements();

    // 自动尝试加载存档
    const autoSaveLoaded = loadAutoSave();
    if (autoSaveLoaded) {
        // alert("有存档");
        console.log('自动恢复上次游戏进度');
        // 隐藏封面页
        document.getElementById('coverPage').classList.add('hidden');
        // 根据自动存档的页面信息跳转
        const savedData = JSON.parse(localStorage.getItem('honor_game_save'));
        const savedPage = savedData.currentPage || 'mapPage';
        const savedScene = savedData.currentScene || '';
        // 先隐藏所有页面
        document.getElementById('mapPage').classList.add('hidden');
        document.getElementById('homePage').classList.add('hidden');
        document.getElementById('scenePage').classList.add('hidden');
        // 强制显示地图页面，忽略保存的页面状态
        document.getElementById('mapPage').classList.remove('hidden');
        console.log('强制跳转到地图页面');
        // 但仍然加载其他游戏数据（天数、好感度等）
        bindButtonEvents();
        bindMapEvents();
        bindSaveLoadEvents();
        updateStatus();
        updateHomePage();
        updateUnlockedScenesUI();
        checkLeagueUnlock();

    } else {

        // 没有自动存档，开始新游戏
        console.log('开始新游戏');
        document.getElementById('coverPage').classList.add('hidden');
        document.getElementById('mapPage').classList.remove('hidden');
        // 初始化游戏数据      
        initGameData();
        //alert("没存档");
        // alert("666"+gameData.day+"---"+gameData.dayEvents[gameData.day]);
        bindButtonEvents();
        bindMapEvents();
        //bindSaveLoadEvents();
        updateStatus();
        updateUnlockedScenesUI();
    }
    // 设置自动保存钩子
    setupAutoSaveHooks();
    // 初始成就检查
    setTimeout(() => {
        checkAchievements();
    }, 500);
}


// 绑定游戏内按钮事件
function bindButtonEvents() {
    console.log('绑定游戏内按钮事件');
    //alert("绑定按钮！！！");
    //alert("777"+gameData.dayEvents[gameData.day]);
    // 返回地图
    const backToMapBtn = document.getElementById('backToMap');
    if (backToMapBtn) {
        backToMapBtn.addEventListener('click', function () {
            document.getElementById('scenePage').classList.add('hidden');
            document.getElementById('mapPage').classList.remove('hidden');
            if (!gameData.dayEvents) {
                gameData.dayEvents = {};
            }
            if (gameData.dayAdvanced === undefined) {
                gameData.dayAdvanced = false;
            }

            if (gameData.dayEvents[gameData.day]) {
                if (!gameData.dayAdvanced) {
                    gameData.day += 1;
                    console.log('天数增加:', gameData.day);
                    gameData.dayAdvanced = false;
                }
            } else {
                gameData.dayAdvanced = false;
            }
            updateStatus();
            updateHomePage();
            checkLeagueUnlock();
            //alert("888"+gameData.dayEvents[gameData.day]);
            autoSaveGame();
            //alert("999"+gameData.dayEvents[gameData.day]);
        });
    }
    // 保存游戏按钮
    const mapSaveBtn = document.getElementById('mapSaveGameBtn');
    const homeSaveBtn = document.getElementById('saveGameBtn');
    if (mapSaveBtn) mapSaveBtn.addEventListener('click', showSavePage);
    if (homeSaveBtn) homeSaveBtn.addEventListener('click', showSavePage);
    // 重新开始游戏按钮（游戏内的）
    const restartBtnHome = document.getElementById('restartGameBtn');
    if (restartBtnHome) {
        restartBtnHome.replaceWith(restartBtnHome.cloneNode(true));
        const newRestartBtn = document.getElementById('restartGameBtn');
        newRestartBtn.addEventListener('click', restartGame);
    }
    // 从家返回地图
    const backFromHome = document.getElementById('backFromHome');
    if (backFromHome) {
        backFromHome.addEventListener('click', () => {
            document.getElementById('homePage').classList.add('hidden');
            document.getElementById('mapPage').classList.remove('hidden');
            autoSaveGame();
        });
    }
    // 场景交互按钮
    const skipNoInteraction = document.getElementById('skipNoInteraction');
    const finishIntro = document.getElementById('finishIntro');
    const finishInteraction = document.getElementById('finishInteraction');
    const finishIntimate = document.getElementById('finishIntimate');
    const acceptConfess = document.getElementById('acceptConfess');
    const refuseConfess = document.getElementById('refuseConfess');
    const jealousyChoose1 = document.getElementById('jealousyChoose1');
    const jealousyChoose2 = document.getElementById('jealousyChoose2');
    if (skipNoInteraction) skipNoInteraction.addEventListener('click', () => {
        //initSceneInteraction(gameData.currentScene);
        autoSaveGame();
    });
    if (finishIntro) finishIntro.addEventListener('click', () => {
        document.getElementById('backToMap').click();
        autoSaveGame();
    });
    if (finishInteraction) finishInteraction.addEventListener('click', () => {
        document.getElementById('backToMap').click();
        autoSaveGame();
    });
    if (finishIntimate) finishIntimate.addEventListener('click', () => {
        document.getElementById('backToMap').click();
        autoSaveGame();
    });
    // 告白按钮
    if (acceptConfess) acceptConfess.addEventListener('click', () => {
        const npcId = document.getElementById('confessPanel').dataset.npcId;
        if (npcData[npcId]) {
            npcData[npcId].gameState.love = true;
            npcData[npcId].gameState.ex = false;
            npcData[npcId].gameState.favor = 100;
            addEventRecord(`${npcData[npcId].name}向你告白，你答应了！你们成为了恋人～`);
            // 使用SweetAlert2替代alert - 调整大小
            Swal.fire({
                title: '<span style="font-size: 16px;">恭喜！🎉</span>',
                html: `<div style="font-size: 14px;">
                       你和<strong style="font-size: 14px;">${npcData[npcId].name}</strong>成为了恋人～
                   </div>`,
                icon: false,
                confirmButtonText: '<span style="font-size: 12px; padding: 2px 8px;">确定</span>',
                confirmButtonColor: '#3085d6',
                background: '#f0f9ff',
                // 调整弹窗大小
                width: '200px', // 再小一点
                padding: '0.8rem', // 减小内边距
                // 响应式设置
                customClass: {
                    popup: 'custom-swal-popup',
                    title: 'custom-swal-title',
                    htmlContainer: 'custom-swal-content',
                    confirmButton: 'custom-swal-button'
                },
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }
            }).then(() => {
                checkLeagueUnlock();
                document.getElementById('backToMap').click();
                updateStatus();
                updateHomePage();
                autoSaveGame();
            });
        }
    });

    //告白拒绝按钮
    if (refuseConfess) refuseConfess.addEventListener('click', () => {
        const npcId = document.getElementById('confessPanel').dataset.npcId;
        if (npcData[npcId]) {
            npcData[npcId].gameState.favor -= 15;
            if (npcData[npcId].gameState.favor < 0) npcData[npcId].gameState.favor = 0;
            addEventRecord(`${npcData[npcId].name}向你告白，你拒绝了，${npcData[npcId].name}很伤心，好感度大幅下降。`);
            document.getElementById('backToMap').click();
            updateStatus();
            updateHomePage();
            autoSaveGame();
        }
    });

    // ----------------修罗场按钮
    // ----------------修罗场按钮（新版）
    // 选择他按钮
    if (jealousyChoose1) {
        jealousyChoose1.addEventListener('click', () => {
            handleJealousyChoice(1);
        });
    }

    // 分手按钮
    if (jealousyChoose2) {
        jealousyChoose2.addEventListener('click', () => {
            handleJealousyChoice(2);
        });
    }

    // 沉默不语按钮
    if (jealousyChoose3) {
        jealousyChoose3.addEventListener('click', () => {
            handleJealousyChoice(3);
        });
    }

}

// 绑定存档加载事件
function bindSaveLoadEvents() {
    console.log('绑定存档加载事件...');
    // 保存界面事件
    for (let i = 1; i <= 9; i++) {
        const saveSlot = document.querySelector(`.save-slot[data-slot="${i}"]`);
        if (saveSlot) {
            saveSlot.replaceWith(saveSlot.cloneNode(true));
            const newSaveSlot = document.querySelector(`.save-slot[data-slot="${i}"]`);
            newSaveSlot.addEventListener('click', () => saveToSlot(i));
        }
    }

    // 加载界面事件
    for (let i = 1; i <= 9; i++) {
        const loadSlot = document.querySelector(`.load-slot[data-slot="${i}"]`);
        if (loadSlot) {
            loadSlot.replaceWith(loadSlot.cloneNode(true));
            const newLoadSlot = document.querySelector(`.load-slot[data-slot="${i}"]`);
            newLoadSlot.addEventListener('click', () => loadFromSlot(i));
        }
    }

    // 取消按钮
    const cancelSaveBtn = document.getElementById('cancelSaveBtn');
    const cancelLoadBtn = document.getElementById('cancelLoadBtn');
    if (cancelSaveBtn) {
        cancelSaveBtn.replaceWith(cancelSaveBtn.cloneNode(true));
        const newCancelSaveBtn = document.getElementById('cancelSaveBtn');
        newCancelSaveBtn.addEventListener('click', hideSavePage);
    }
    if (cancelLoadBtn) {
        cancelLoadBtn.replaceWith(cancelLoadBtn.cloneNode(true));
        const newCancelLoadBtn = document.getElementById('cancelLoadBtn');
        newCancelLoadBtn.addEventListener('click', hideLoadPage);
    }
}

// 存档系统函数
function showSavePage() {
    console.log('显示保存界面...');
    hideAllPages();
    document.getElementById('savePage').classList.remove('hidden');
    updateSaveSlots();
}

function showLoadPage() {
    console.log('显示加载页面...');
    hideAllPages();
    document.getElementById('loadPage').classList.remove('hidden');
    updateLoadSlots();
    // 确保事件绑定正确
    setTimeout(() => {
        bindSaveLoadEvents();
    }, 100);
}

function hideSavePage() {
    document.getElementById('savePage').classList.add('hidden');
    if (!document.getElementById('coverPage').classList.contains('hidden')) return;
    document.getElementById('mapPage').classList.remove('hidden');
}

function hideLoadPage() {
    document.getElementById('loadPage').classList.add('hidden');
    if (!document.getElementById('coverPage').classList.contains('hidden')) return;
    //document.getElementById('mapPage').classList.remove('hidden');

    // 加载界面的取消：回到封面页
    document.getElementById('coverPage').classList.remove('hidden');
}

function hideAllPages() {
    document.getElementById('coverPage').classList.add('hidden');
    document.getElementById('mapPage').classList.add('hidden');
    document.getElementById('homePage').classList.add('hidden');
    document.getElementById('scenePage').classList.add('hidden');
    document.getElementById('loadPage').classList.add('hidden');
    document.getElementById('savePage').classList.add('hidden');
}

function saveToSlot(slotNumber) {
    try {
        const now = new Date();
        const saveName = `存档${slotNumber}_${now.getMonth() + 1}月${now.getDate()}日_${now.getHours()}:${now.getMinutes()}`;

        let currentSceneToSave = gameData.currentScene;
        let currentPage = 'mapPage'; // 默认地图页

        // 确定当前所在的页面
        if (document.getElementById('scenePage') && !document.getElementById('scenePage').classList.contains('hidden')) {
            currentSceneToSave = gameData.currentScene;
            currentPage = 'scenePage';
        } else if (document.getElementById('homePage') && !document.getElementById('homePage').classList.contains('hidden')) {
            currentSceneToSave = "home";
            currentPage = 'homePage';
        } else if (document.getElementById('mapPage') && !document.getElementById('mapPage').classList.contains('hidden')) {
            // 在地图页面时，currentScene应该为空
            currentSceneToSave = "";
            currentPage = 'mapPage';
        }
        console.log(`保存时所在页面: ${currentPage}, 场景: ${currentSceneToSave}`);
        const saveData = {
            name: saveName,
            date: now.getTime(),
            slot: slotNumber,
            data: {
                gameData: JSON.parse(JSON.stringify(gameData)),
                npcStates: {},
                achievements: JSON.parse(JSON.stringify(achievementsData)), // 保存成就
                currentPage: currentPage,
                currentScene: currentSceneToSave
            }
        };

        // 确保gameData中的currentScene正确
        saveData.data.gameData.currentScene = currentSceneToSave;
        // 确保gameData中的成就数据也保存
        saveData.data.gameData.achievements = JSON.parse(JSON.stringify(achievementsData));

        for (const id in npcData) {
            if (npcData[id].gameState) {
                saveData.data.npcStates[id] = JSON.parse(JSON.stringify(npcData[id].gameState));
            }
        }
        const saves = JSON.parse(localStorage.getItem('honor_game_saves') || '[]');
        const filteredSaves = saves.filter(save => save.slot !== slotNumber);
        filteredSaves.push(saveData);
        localStorage.setItem('honor_game_saves', JSON.stringify(filteredSaves));
        updateSaveSlots();
        // 保存后正确返回到原来的页面
        document.getElementById('savePage').classList.add('hidden');
        // 根据保存前所在的页面显示对应页面
        switch (currentPage) {
            case 'scenePage':
                document.getElementById('scenePage').classList.remove('hidden');
                break;
            case 'homePage':
                document.getElementById('homePage').classList.remove('hidden');
                break;
            case 'mapPage':
            default:
                document.getElementById('mapPage').classList.remove('hidden');
                break;
        }
        alert('游戏保存成功！');
    } catch (e) {
        alert('保存失败，请检查浏览器存储权限。');
        console.error('保存游戏失败:', e);
    }
}

function loadFromSlot(slotNumber) {
    try {
        const saves = JSON.parse(localStorage.getItem('honor_game_saves') || '[]');
        const saveSlot = saves.find(save => save.slot === slotNumber);
        if (!saveSlot) {
            alert('该存档位为空！');
            return;
        }
        console.log(`正在加载存档位 ${slotNumber}...`, saveSlot);
        // 清空当前游戏数据
        for (const key in gameData) {
            delete gameData[key];
        }
        const loadedData = saveSlot.data;
        // 恢复游戏数据
        Object.assign(gameData, JSON.parse(JSON.stringify(loadedData.gameData)));
        // 确保必要的数据结构存在
        if (!Array.isArray(gameData.events)) {
            gameData.events = [];
        }
        if (!gameData.lastConfessDay) {
            gameData.lastConfessDay = {};
        }
        if (!gameData.lastIntimateDay) {
            gameData.lastIntimateDay = {};
        }
        if (!gameData.unlockedScenes) {
            gameData.unlockedScenes = ['home', 'happy'];
        }
        // 恢复NPC状态
        for (const id in loadedData.npcStates) {
            if (npcData[id]) {
                npcData[id].gameState = JSON.parse(JSON.stringify(loadedData.npcStates[id]));
            }
        }
        // 确保所有角色都有初始状态
        ensureAllCharactersDefined();
        // 隐藏加载页面
        document.getElementById('loadPage').classList.add('hidden');
        document.getElementById('coverPage').classList.add('hidden');
        // 使用保存的页面信息来决定跳转到哪个页面
        const savedPage = loadedData.currentPage || 'mapPage';
        const savedScene = loadedData.currentScene || gameData.currentScene || '';
        console.log(`存档信息 - 页面: ${savedPage}, 场景: ${savedScene}`);
        // 先隐藏所有页面
        document.getElementById('mapPage').classList.add('hidden');
        document.getElementById('homePage').classList.add('hidden');
        document.getElementById('scenePage').classList.add('hidden');
        // 根据保存的页面信息跳转
        switch (savedPage) {
            case 'homePage':
                document.getElementById('homePage').classList.remove('hidden');
                updateHomePage();
                console.log('跳转到家页面');
                break;
            case 'scenePage':
                if (savedScene && savedScene !== "") {
                    document.getElementById('scenePage').classList.remove('hidden');
                    // 设置场景标题和描述
                    const sceneElement = document.querySelector(`.map-item[data-scene="${savedScene}"]`);
                    if (sceneElement) {
                        const titleElement = sceneElement.querySelector('h3');
                        const descElement = sceneElement.querySelector('p');
                        if (titleElement) {
                            document.getElementById('sceneTitle').textContent = titleElement.textContent;
                        }
                        if (descElement) {
                            document.getElementById('sceneDesc').querySelector('p').textContent =
                                `【${titleElement ? titleElement.textContent : ''}】${descElement.textContent}`;
                        }
                    }
                    console.log('跳转到场景页面:', savedScene);
                } else {
                    // 如果没有场景信息，默认跳转到地图
                    document.getElementById('mapPage').classList.remove('hidden');
                    console.log('场景信息缺失，跳转到地图页面');
                }
                break;

            case 'mapPage':
            default:
                document.getElementById('mapPage').classList.remove('hidden');
                console.log('跳转到地图页面');
                break;
        }

         // 恢复成就数据
        if (loadedData.achievements) {
            achievementsData = JSON.parse(JSON.stringify(loadedData.achievements));
            console.log('加载成就数据:', achievementsData);
        }

        // 重新绑定事件
        bindButtonEvents();
        bindMapEvents();
        bindSaveLoadEvents();
        // 更新UI状态
        updateStatus();
        updateHomePage();
        updateUnlockedScenesUI();
        console.log(`存档位 ${slotNumber} 加载成功！当前天数: ${gameData.day}`);
        // 强制刷新UI
        setTimeout(() => {
            updateStatus();
            updateHomePage();
        }, 100);

         // 检查成就状态
        setTimeout(() => {
            checkAchievements();
        }, 100);

    } catch (e) {
        alert('加载存档失败，存档可能已损坏');
        console.error('加载存档失败:', e);
        // 失败时回到地图页面
        document.getElementById('loadPage').classList.add('hidden');
        document.getElementById('mapPage').classList.remove('hidden');
    }
}

// 更新存档显示信息
function updateSaveSlots() {
    const saves = JSON.parse(localStorage.getItem('honor_game_saves') || '[]');
    for (let i = 1; i <= 9; i++) {
        const saveInfo = document.getElementById(`save-info-${i}`);
        const saveSlot = saves.find(save => save.slot === i);
        if (saveSlot && saveInfo) {
            const saveDate = new Date(saveSlot.date);
            const formattedDate = `${saveDate.getMonth() + 1}月${saveDate.getDate()}日 ${saveDate.getHours()}:${saveDate.getMinutes()}`;
            const unlockedScenesCount = Object.keys(saveSlot.data.gameData.unlockedScenes || {}).length;
            const currentPage = saveSlot.data.currentPage || 'mapPage';
            const pageText = currentPage === 'mapPage' ? '地图' :
                currentPage === 'homePage' ? '家' :
                    currentPage === 'scenePage' ? '场景' : '游戏';
            saveInfo.innerHTML = `
                <div class="text-green-600 font-bold">第${saveSlot.data.gameData.day}天</div>
                <div class="text-xs text-gray-500">${formattedDate}</div>
                <div class="text-xs">${unlockedScenesCount}场景 | ${pageText}</div>
            `;
        } else if (saveInfo) {
            saveInfo.innerHTML = '<div class="text-gray-400">空存档</div>';
        }
    }
}

function updateLoadSlots() {
    const saves = JSON.parse(localStorage.getItem('honor_game_saves') || '[]');
    console.log('找到存档数量:', saves.length);
    for (let i = 1; i <= 9; i++) {
        const loadInfo = document.getElementById(`load-info-${i}`);
        const saveSlot = saves.find(save => save.slot === i);

        if (saveSlot && loadInfo) {
            const saveDate = new Date(saveSlot.date);
            const formattedDate = `${saveDate.getMonth() + 1}月${saveDate.getDate()}日 ${saveDate.getHours()}:${saveDate.getMinutes()}`;
            const unlockedScenesCount = Object.keys(saveSlot.data.gameData.unlockedScenes || {}).length;
            const currentPage = saveSlot.data.currentPage || 'mapPage';
            const pageText = currentPage === 'mapPage' ? '地图' :
                currentPage === 'homePage' ? '家' :
                    currentPage === 'scenePage' ? '场景' : '游戏';
            loadInfo.innerHTML = `
                <div class="text-green-600 font-bold">第${saveSlot.data.gameData.day}天</div>
                <div class="text-xs text-gray-500">${formattedDate}</div>
                <div class="text-xs">${unlockedScenesCount}场景 | ${pageText}</div>
            `;
            console.log(`存档位 ${i} 有数据: 第${saveSlot.data.gameData.day}天, 页面: ${currentPage}`);
        } else if (loadInfo) {
            loadInfo.innerHTML = '<div class="text-gray-400">空存档</div>';
            console.log(`存档位 ${i} 为空`);
        }
    }
}

// 场景交互相关函数
function resetScenePanels() {
    document.getElementById('noInteractionPanel').classList.add('hidden');
    document.getElementById('introPanel').classList.add('hidden');
    document.getElementById('jealousyPanel').classList.add('hidden');
    document.getElementById('interactionPanel').classList.add('hidden');
    document.getElementById('confessPanel').classList.add('hidden');
    document.getElementById('intimatePanel').classList.add('hidden');
    document.getElementById('resultPanel').classList.add('hidden');
}


// 检查场景解锁
function checkSceneUnlock(teamName) {
    const team = teamConfig[teamName];
    if (!gameData.unlockedScenes.includes(team.scene)) {
        gameData.unlockedScenes.push(team.scene);
        addEventRecord(`通过朋友介绍，解锁了${team.name}战队基地！`, 'unlock');
        updateSceneElement(team.scene);
        updateStatus();
    }
}

// 更新场景UI元素为已解锁状态
function updateSceneElement(sceneName) {
    const sceneElement = document.querySelector(`.map-item[data-scene="${sceneName}"]`);
    if (sceneElement) {
        sceneElement.classList.remove('opacity-70', 'cursor-not-allowed');
        sceneElement.classList.add('cursor-pointer');
        sceneElement.dataset.unlocked = "true";

        // 处理左侧图标（在圆形div内的锁）
        const leftIconContainer = sceneElement.querySelector('.w-10.h-10');
        if (leftIconContainer) {
            const leftLockIcon = leftIconContainer.querySelector('.fa-lock');
            if (leftLockIcon) {
                leftLockIcon.classList.replace('fa-lock', 'fa-arrow-right');
            }
        }

        // 处理右侧图标（直接在选择器末尾的锁）
        const rightLockIcon = sceneElement.querySelector('.fa-lock:last-child');
        if (rightLockIcon) {
            rightLockIcon.classList.replace('fa-lock', 'fa-arrow-right');
            rightLockIcon.classList.replace('text-gray-400', 'text-primary');
        }

        const h3Element = sceneElement.querySelector('h3');
        if (h3Element) h3Element.classList.remove('text-gray-500');
        const pElement = sceneElement.querySelector('p');
        if (pElement) pElement.classList.remove('text-gray-400');
    }
}

// 更新已解锁场景的UI显示
function updateUnlockedScenesUI() {
    // 重置所有场景为锁定状态
    document.querySelectorAll('.map-item').forEach(item => {
        const scene = item.dataset.scene;
        item.classList.add('opacity-70', 'cursor-not-allowed');
        item.classList.remove('cursor-pointer');
        item.dataset.unlocked = "false";
        const lockIcon = item.querySelector('.fa-lock');
        if (lockIcon) lockIcon.classList.replace('fa-arrow-right', 'fa-lock');
        const h3Element = item.querySelector('h3');
        if (h3Element) h3Element.classList.add('text-gray-500');
        const pElement = item.querySelector('p');
        if (pElement) pElement.classList.add('text-gray-400');
    });

    // 然后只解锁已解锁的场景
    gameData.unlockedScenes.forEach(scene => {
        updateSceneElement(scene);
    });
}

// 检查联盟总部解锁
// 检查联盟总部解锁
// 检查联盟总部解锁
function checkLeagueUnlock() {
    let loveCount = 0;
    for (const id in npcData) {
        if (npcData[id].gameState && npcData[id].gameState.love === true) {
            loveCount++;
        }
    }

    // 1. 检查是否需要解锁联盟场景
    if (loveCount >= 5 && gameData.unlockedScenes && !gameData.unlockedScenes.includes('league')) {
        gameData.unlockedScenes.push('league');
        
        // 确保unlockedCharacters数组存在
        if (!gameData.unlockedCharacters) {
            gameData.unlockedCharacters = [];
        }
        
        // 当联盟场景解锁时，自动解锁所有联盟成员
        const leagueMembers = teamConfig.league.members;
        for (const npcId of leagueMembers) {
            // 添加到解锁角色列表
            if (!gameData.unlockedCharacters.includes(npcId)) {
                //gameData.unlockedCharacters.push(npcId);
                console.log(`[联盟解锁] 添加 ${npcData[npcId].name} 到解锁名单`);
            }
            
            // 初始化gameState（避免后续代码出错）
            if (npcData[npcId] && !npcData[npcId].gameState) {
                npcData[npcId].gameState = {
                    favor: 0,
                    love: false,
                    confess: false,
                    intimate: 0,
                    locked: false,
                    ignoreCount: 0,
                    ex: false
                };
            }
        }
        
       // addEventRecord(`你的恋人数量达到5人，解锁了荣耀联盟总部！所有退役选手都已自动解锁～`, 'unlock');
        
        // 更新地图显示
        const leagueElement = document.querySelector('.map-item[data-scene="league"]');
        if (leagueElement) {
            leagueElement.classList.remove('opacity-70', 'cursor-not-allowed');
            leagueElement.classList.add('cursor-pointer');
            leagueElement.dataset.unlocked = "true";
            const lockIcon = leagueElement.querySelector('.fa-lock');
            if (lockIcon) lockIcon.classList.replace('fa-lock', 'fa-arrow-right');
            const h3Element = leagueElement.querySelector('h3');
            if (h3Element) h3Element.classList.remove('text-gray-500');
            const pElement = leagueElement.querySelector('p');
            if (pElement) pElement.classList.remove('text-gray-400');
        }
        
        // 触发NPC列表更新
        updateStatus();
        updateHomePage(); // 立即更新主页显示
        autoSaveGame();
    }
    
    // 2. 检查是否已解锁联盟但人员未解锁（补丁功能）
    else if (gameData.unlockedScenes && gameData.unlockedScenes.includes('league')) {
        if (!gameData.unlockedCharacters) {
            gameData.unlockedCharacters = [];
        }
        
        const leagueMembers = teamConfig.league.members;
        let addedCount = 0;
        
        for (const npcId of leagueMembers) {
            // 检查联盟成员是否已解锁
            const isUnlocked = gameData.unlockedCharacters.includes(npcId);
            
            if (!isUnlocked) {
                // 添加到解锁角色列表
               // gameData.unlockedCharacters.push(npcId);
               // addedCount++;
                console.log(`[补丁] 添加 ${npcData[npcId].name} 到解锁名单`);
                
                // 初始化gameState
                if (npcData[npcId] && !npcData[npcId].gameState) {
                    npcData[npcId].gameState = {
                        favor: 0,
                        love: false,
                        confess: false,
                        intimate: 0,
                        locked: false,
                        ignoreCount: 0,
                        ex: false
                    };
                }
            }
        }
        
        // 如果有新添加的人员，更新显示
        if (addedCount > 0) {
            console.log(`[补丁] 成功解锁了 ${addedCount} 个联盟成员`);
            updateStatus();
            updateHomePage();
            
            // 可选：添加一条事件记录
            if (addedCount === leagueMembers.length) {
                addEventRecord(`联盟总部已解锁，所有退役选手现已全部可用！`, 'unlock');
            }
        }
    }
}


// 更新状态栏数据
function updateStatus() {
    document.getElementById('dayCount').textContent = gameData.day;
    const unlockedCount = gameData.unlockedScenes.length;
    document.getElementById('unlockedScenes').textContent = `${unlockedCount}/16`;
    // 修正恋人数量统计
    let loveCount = 0;
    for (const id in npcData) {
        if (npcData[id].gameState && npcData[id].gameState.love === true) {
            loveCount++;
        }
    }
    document.getElementById('loveCount').textContent = loveCount;
    console.log(`状态栏更新: 天数=${gameData.day}, 场景=${unlockedCount}/16, 恋人=${loveCount}`);
}

// 更新家页面
// 在 updateHomePage() 函数中替换好感度列表部分
function updateHomePage() {
    const teamTabs = document.getElementById('teamTabs');
    const teamContents = document.getElementById('teamContents');
    const eventLog = document.getElementById('eventLog');
    // 清空现有内容
    teamTabs.innerHTML = "";
    teamContents.innerHTML = "";
    eventLog.innerHTML = "";
    // 确保所有战队成员都在npcData中定义
    ensureAllCharactersDefined();
    const teamMembers = {};
    for (const id in npcData) {
        const npc = npcData[id];
        if (!teamMembers[npc.team]) teamMembers[npc.team] = [];
        teamMembers[npc.team].push(id);
    }
    let firstTeam = true;
    for (const team in teamMembers) {
        const teamInfo = teamConfig[team] || {
            name: team,
            color: "bg-gray-500"
        };

        // 创建页签
        const tab = document.createElement('div');
        tab.className = `team-tab ${firstTeam ? 'active' : ''}`;
        tab.dataset.team = team;
        tab.innerHTML = `
            <span class="team-tag ${teamInfo.color} text-xs mr-2">${teamInfo.name.substring(0, 2)}</span>
            
        `;

        tab.addEventListener('click', function () {
            // 移除所有active类
            document.querySelectorAll('.team-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.team-content').forEach(c => c.classList.remove('active'));

            // 添加active类到当前页签和内容
            this.classList.add('active');
            document.getElementById(`team-content-${team}`).classList.add('active');
        });
        teamTabs.appendChild(tab);

        // 创建内容区域
        const teamContent = document.createElement('div');
        teamContent.id = `team-content-${team}`;
        teamContent.className = `team-content ${firstTeam ? 'active' : ''}`;

        teamMembers[team].forEach(id => {
            const npc = npcData[id];
            const favor = npcData[id].gameState.favor;
            const isLove = npcData[id].gameState.love || false;
            const ignoreCount = npcData[id].gameState.ignoreCount || 0;
            const favorPercent = Math.min(100, (favor / 120) * 100);
            const isLocked = !gameData.unlockedCharacters.includes(id);
            const favorItem = document.createElement('div');
            favorItem.className = "favor-item";
            let statusText = "";


            let warnThreshold, disappearThreshold;
            // 获取定制化 不理他 永远不出现 阈值
            if (id === "yexiu" || id === "wangjiexi") {
                warnThreshold = 4; disappearThreshold = 7;
            }
            else if (id === "chenguo" || id === "sumucheng") {
                warnThreshold = 4; disappearThreshold = 10;
            }
            else if (id === "huangshaotian") {
                warnThreshold = 5; disappearThreshold = 20;
            }
            else if (id === "hanwenqing") {
                warnThreshold = 2; disappearThreshold = 3;
            }
            else {
                warnThreshold = 3; disappearThreshold = 5;
            }

            if (ignoreCount >= disappearThreshold) {
                statusText = '<span class="text-xs text-red-500 ml-2">(不再出现)</span>';
            } else if (ignoreCount >= warnThreshold) {
                statusText = '<span class="text-xs text-orange-500 ml-2">(出现减少)</span>';
            }


favorItem.dataset.npcId = id;  // 新增这一行

            // 在 updateHomePage() 函数中找到显示人名的部分
            favorItem.innerHTML = `
    <div class="flex items-center flex-1">
        <div class="w-10 h-10 rounded-full ${npc.bgColor} ${npc.borderColor} flex items-center justify-center mr-3">
            <i class="fa fa-user ${npc.textColor}"></i>
        </div>
        <div class="flex-1">
            <div class="flex items-center">
                <span class="font-medium ${isLocked ? 'text-gray-500' : ''}">
                    ${isLocked ? '***' : npc.name}  <!-- 这里修改：未解锁显示*** -->
                </span>
                ${isLove ? '<span class="love-badge ml-2">恋人</span>' : ''}
                <!-- 新增：前任标签 -->
                ${npcData[id].gameState.ex ? '<span class="ex-badge ml-2" style="background-color: #9ca3af; color: white; padding: 2px 6px; border-radius: 10px; font-size: 10px;">前任</span>' : ''}
                ${statusText}
                ${isLocked ? '<span class="text-xs text-gray-400 ml-2">(未解锁)</span>' : ''}
                <!-- 这是添加聊天按钮的关键代码 -->
               ${!isLocked ? `
                 <button class="chat-btn ml-auto w-5 h-5 flex items-center justify-center bg-green-500 text-white rounded-full hover:bg-green-600 transition-all shadow-md" 
                  data-id="${id}"
                  title="与${npc.name}聊天">
                 <i class="fa fa-wechat text-xs"></i>
                 <span class="sr-only">聊天</span>
                  </button>
            ` : ''}

                
            </div>
            <div class="favor-bar mt-1">
                <div class="favor-fill ${isLove ? 'favor-fill-love' : ''} ${isLocked ? 'opacity-50' : ''}" style="width: ${favorPercent}%"></div>
            </div>
        </div>
    </div>
    <div class="text-right min-w-[60px]">
        <span class="text-sm font-medium ${isLove ? 'text-red-500' : isLocked ? 'text-gray-400' : 'text-gray-600'}">
            ${isLocked ? '???' : favor}/120  <!-- 这里修改：未解锁显示??? -->
        </span>
    </div>
`;
 // 为整个项目添加点击效果
      favorItem.className = "favor-item cursor-pointer hover:bg-gray-50 transition-colors p-3 rounded-lg";

// 在 favorItem.className = "favor-item cursor-pointer hover:bg-gray-50 transition-colors p-3 rounded-lg"; 之后添加：

// 为已解锁角色添加点击提示
if (!isLocked) {
    favorItem.title = `点击查看${npc.name}的事件记录`;
    // 也可以添加视觉提示，比如添加一个icon
    // favorItem.style.position = 'relative';
    // favorItem.style.paddingRight = '20px'; // 为icon留出空间
}


        teamContent.appendChild(favorItem);
        });
        teamContents.appendChild(teamContent);
        firstTeam = false;
    }

    // 历史事件记录保持不变
    const sortedEvents = [...gameData.events].reverse();
    sortedEvents.forEach(event => {
        const eventItem = document.createElement('div');
        eventItem.className = "event-item";
        eventItem.innerHTML = `
            <div class="text-xs text-gray-500 mb-1">第${event.day}天</div>
            <div class="text-sm">${event.content}</div>
        `;
        eventLog.appendChild(eventItem);
    });
    if (sortedEvents.length === 0) {
        const emptyEvent = document.createElement('div');
        emptyEvent.className = "event-item text-center text-gray-500 py-4";
        emptyEvent.textContent = "暂无事件记录，快去探索场景吧～";
        eventLog.appendChild(emptyEvent);
    }
}


// 确保所有角色都已定义
function ensureAllCharactersDefined() {
    for (const id in npcData) {
        if (!npcData[id].gameState) {
            npcData[id].gameState = {
                favor: 0,
                love: false,
                ex: false, // 新增：前任标记
                ignoreCount: 0,
                lastConfessDay: 0,
                lastIntimateDay: 0
            };
        }
    }
}




// 绑定地图点击事件
// 使用一个标记来确保只绑定一次
let isMapEventsBound = false;
function bindMapEvents() {
    console.log("绑定地图事件");

    // 如果已经绑定过，先移除
    if (isMapEventsBound) {
        const mapList = document.getElementById('mapList');
        // 克隆节点来移除所有事件监听器
        const newMapList = mapList.cloneNode(true);
        mapList.parentNode.replaceChild(newMapList, mapList);
    }

    document.getElementById('mapList').addEventListener('click', function (e) {
        const mapItem = e.target.closest('.map-item');
        if (!mapItem) return;

        const scene = mapItem.dataset.scene;
        const unlocked = mapItem.dataset.unlocked === "true";

        if (!unlocked) {
            alert('该场景尚未解锁！');
            return;
        }

        gameData.currentScene = scene;

        if (scene === "home") {
            document.getElementById('mapPage').classList.add('hidden');
            document.getElementById('homePage').classList.remove('hidden');
            updateHomePage();
        } else {
            document.getElementById('mapPage').classList.add('hidden');
            document.getElementById('scenePage').classList.remove('hidden');

            const titleElement = mapItem.querySelector('h3');
            const descElement = mapItem.querySelector('p');

            if (titleElement) {
                document.getElementById('sceneTitle').textContent = titleElement.textContent;
            }
            if (descElement) {
                document.getElementById('sceneDesc').querySelector('p').textContent =
                    `【${titleElement ? titleElement.textContent : ''}】${descElement.textContent}`;
            }

            console.log("初始化场景前" + gameData.day + "===" + gameData.dayEvents);
            initSceneInteraction(scene);
        }
    });

    isMapEventsBound = true;
}

// 重启游戏
function restartGame() {
    if (confirm('确定要重新开始游戏吗？当前未保存的进度将会丢失。')) {
        console.log('重启游戏...');
        // 清空游戏数据
        for (const key in gameData) {
            delete gameData[key];
        }
        // 重置NPC数据
        for (const id in npcData) {
            if (npcData[id].gameState) {
                npcData[id].gameState = {
                    favor: 0,
                    love: false,
                    ex: false, // 新增：前任标记
                    ignoreCount: 0,
                    lastConfessDay: 0,
                    lastIntimateDay: 0
                };
            }
        }

         // 重置成就数据
        achievementsData = {
            unlocked: [],
            points: 0,
            lastChecked: new Date().getTime()
        };
        saveAchievements();

        // 重新初始化
        initGameData();
        // 清空自动存档
        localStorage.removeItem('honor_game_save');
        //alert("重启后"+gameData.dayEvents[gameData.day]);
        // 回到封面页
        document.getElementById('homePage').classList.add('hidden');
        document.getElementById('scenePage').classList.add('hidden');
        document.getElementById('mapPage').classList.add('hidden');
        document.getElementById('coverPage').classList.remove('hidden');
        alert('游戏已重新开始！');
    }
}

function showSettingsMenu() {
    const existingMenu = document.getElementById('settingsMenu');
    if (existingMenu) existingMenu.remove();

    const menu = document.createElement('div');
    menu.id = 'settingsMenu';
    menu.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center';
    menu.innerHTML = `
        <div class="bg-white rounded-xl w-80 max-w-md overflow-hidden">
            <div class="p-4 border-b border-gray-200">
                <h2 class="text-lg font-bold text-primary flex items-center">
                    <i class="fa fa-cog mr-2"></i>游戏设置
                </h2>
            </div>
            <div class="p-4 space-y-3">
                <button onclick="closeSettingsMenu(); showSavePage();" class="w-full btn-primary py-3 text-left flex items-center">
                    <i class="fa fa-save mr-3"></i>
                    <div>
                        <div class="font-medium">保存游戏</div>
                        <div class="text-xs text-gray-500">保存当前游戏进度</div>
                    </div>
                </button>                
                <button onclick="closeSettingsMenu(); setTimeout(() => { document.getElementById('mapPage').classList.add('hidden'); document.getElementById('coverPage').classList.remove('hidden'); }, 100);" class="w-full btn-secondary py-3 text-left flex items-center">
                    <i class="fa fa-home mr-3"></i>
                    <div>
                        <div class="font-medium">返回封面</div>
                        <div class="text-xs text-gray-500">回到游戏开始界面</div>
                    </div>
                </button>                
                <button onclick="closeSettingsMenu()" class="w-full btn-secondary py-3 text-left flex items-center">
                    <i class="fa fa-times mr-3"></i>
                    <div>
                        <div class="font-medium">关闭</div>
                        <div class="text-xs text-gray-500">关闭设置菜单</div>
                    </div>
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(menu);
    menu.addEventListener('click', function (e) {
        if (e.target === menu) closeSettingsMenu();
    });
}

function closeSettingsMenu() {
    const menu = document.getElementById('settingsMenu');
    if (menu) menu.remove();
}
/**********************
 * 触发爱心效果
 */
function triggerHearts() {
    // 先清掉上次残留的爱心（可选）
    document.querySelectorAll('.floating-heart').forEach(el => el.remove());
    const heartCount = 50; // 爱心数量
    const duration = 4000; // 总持续时间

    for (let i = 0; i < heartCount; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'floating-heart'; // 用于后续清理
            heart.textContent = '❤️';

            // 随机水平位置（整个视口宽度）
            const startX = Math.random() * window.innerWidth;
            const size = 12 + Math.random() * 10; // 12px ~ 22px
            const fallDuration = 3000 + Math.random() * 2000; // 3~5秒
            const sway = (Math.random() - 0.5) * 60; // 左右摆动 ±30px

            Object.assign(heart.style, {
                position: 'fixed',
                left: `${startX}px`,
                top: '-30px', // 从屏幕上方外开始
                fontSize: `${size}px`,
                opacity: '0.7',
                color: '#ff69b4',
                pointerEvents: 'none',
                zIndex: '2147483647',
                transform: 'translateY(0) translateX(0) rotate(0deg)',
                transition: `transform ${fallDuration}ms linear, opacity ${fallDuration * 0.7}ms ease-out`
            });

            document.body.appendChild(heart);
            // 触发动画
            requestAnimationFrame(() => {
                heart.style.transform = `translateY(${window.innerHeight + 100}px) translateX(${sway}px) rotate(${Math.random() > 0.5 ? 360 : -360}deg)`;
                heart.style.opacity = '0';
            });
            // 自动清理
            setTimeout(() => {
                if (heart.parentNode === document.body) {
                    document.body.removeChild(heart);
                }
            }, fallDuration);
        }, i * 100);
    }
}



// 等待 DOM 加载完成再执行
document.addEventListener('DOMContentLoaded', function () {
    // 使用事件委托监听整个文档的点击
    document.addEventListener('click', function (e) {
        // 检查是否点击了置顶按钮（包括内部图标）
        const pinBtn = e.target.closest('.map-pin-btn');
        if (!pinBtn) return;
        // 阻止冒泡和默认行为
        e.stopPropagation();
        e.preventDefault();
        // 找到当前 map-item 和列表容器
        const item = pinBtn.closest('.map-item');
        const listContainer = document.getElementById('mapList'); // 👈 你的列表 ID
        if (item && listContainer) {
            // 移到顶部
            listContainer.prepend(item);
            // 可选：视觉反馈 —— 图标变红表示已置顶
            pinBtn.innerHTML = '<i class="fa fa-thumb-tack text-red-500"></i>';
            pinBtn.title = '已置顶';
        }
    });
});


console.log('设置功能就绪');



// 家页面页签切换函数 - 纯显示隐藏
function showTab000(tabName) {
    // 更新按钮状态
    document.querySelectorAll('.home-tab').forEach(tab => {
        tab.classList.remove('active');
        tab.classList.remove('text-primary');
        tab.classList.add('text-gray-500');
    });
    
    // 激活当前按钮
    const activeButton = Array.from(document.querySelectorAll('.home-tab'))
        .find(btn => btn.textContent.includes(tabName === 'favor' ? '好感度' : '历史事件'));
    if (activeButton) {
        activeButton.classList.add('active');
        activeButton.classList.add('text-primary');
        activeButton.classList.remove('text-gray-500');
    }
    
    // 隐藏所有内容
    document.querySelectorAll('.home-tab-content').forEach(content => {
        content.classList.remove('active');
        content.classList.add('hidden');
    });
    
    // 显示目标内容
    const targetContent = document.getElementById(tabName + 'Card');
    if (targetContent) {
        targetContent.classList.add('active');
        targetContent.classList.remove('hidden');
    }
}

// 家页面页签切换函数 - 纯显示隐藏
function showTab(tabName) {
    // 隐藏所有内容
    document.querySelectorAll('.home-tab-content').forEach(content => {
        content.classList.add('hidden');
        content.classList.remove('active');
    });
    
    // 显示目标内容
    const targetContent = document.getElementById(tabName + 'Card');
    if (targetContent) {
        targetContent.classList.remove('hidden');
        targetContent.classList.add('active');
        
        // 如果切换到成就页面，更新显示
        if (tabName === 'achievement' && typeof updateAchievementsDisplay === 'function') {
            updateAchievementsDisplay();
        }
        
        // 新增：如果切换到关系图页面，初始化关系图
        if (tabName === 'relation') {
            // 延迟一点确保DOM已更新
            setTimeout(() => {
                if (typeof window.initRelationGraph === 'function') {
                    window.initRelationGraph();
                } else {
                    console.error('initRelationGraph 函数未定义，请检查show.js是否加载');
                }
            }, 50);
        }
    }
    
    // 更新按钮状态（可选）
    document.querySelectorAll('.home-tab').forEach(tab => {
        tab.classList.remove('active', 'text-primary');
        tab.classList.add('text-gray-500');
    });
    
    const activeBtn = Array.from(document.querySelectorAll('.home-tab')).find(btn => 
        (tabName === 'favor' && btn.textContent.includes('好感度')) ||
        (tabName === 'event' && btn.textContent.includes('历史事件')) ||
        (tabName === 'achievement' && btn.textContent.includes('成就')) ||
        (tabName === 'relation' && btn.textContent.includes('关系图')) // 新增关系图
    );
    
    if (activeBtn) {
        activeBtn.classList.add('active', 'text-primary');
        activeBtn.classList.remove('text-gray-500');
    }
}