
// 全职高手官方战队设定
const teamConfig = {
    happy: {
        name: "兴欣",
        color: "bg-red-500",
        scene: "happy",
        members: ["yexiu", "chenguo", "tangrou", "baorongxing", "qiaoyifan", "anwenyi", "luoji", "weichen", "fangrui", "mofan", "sumucheng"]
    },
    lanyu: {
        name: "蓝雨",
        color: "bg-blue-500",
        scene: "lanyu",
        members: ["huangshaotian", "yuwenzhou", "luhanwen", "zhengxuan", "xujingxi", "songxiao", "liyuan"]
    },
    weicao: {
        name: "微草",
        color: "bg-green-500",
        scene: "weicao",
        members: ["wangjiexi", "gaoyingjie", "xubin", "liuxiaobie", "yuanbaiqing", "liangfang", "liufei", "zhouyebai"]

    },
    lunhui: {
        name: "轮回",
        color: "bg-yellow-800", // 黄黑色系
        scene: "lunhui",
        members: ["zhouzekai", "jiangbotao", "sunxiang", "lvboyuan", "duming", "fangminghua", "wuqi"]

    },
    jiashi: {
        name: "嘉世",
        color: "bg-red-500",
        scene: "jiashi",
        members: ["qiufei", "wenli"]

    },
    xukong: {
        name: "虚空",
        color: "bg-purple-600", // 紫色系
        scene: "xukong",
        members: ["lixuan", "wuyuce", "lixun", "gaicaijie", "tanglisheng", "gezhaolan"]
    },
    batu: {
        name: "霸图",
        color: "bg-black", // 黑红亮色
        scene: "batu",
        members: ["hanwenqing", "zhangxinjie", "zhangjiale", "linjingyan", "baiyanfei", "qinyunmu"]

    },
    yuyan: {
        name: "烟雨",
        color: "bg-teal-500", // 蓝绿色系
        scene: "yuyan",
        members: ["chuyunxiu", "lihua", "shukexin", "shukeyi"]

    },
    leiting: {
        name: "雷霆",
        color: "bg-blue-600", // 蓝黄色系
        scene: "leiting",
        members: ["xiaoshiqin", "daiyanqi", "fangxuecai", "chengtai"]
    },
    huxiao: {
        name: "呼啸",
        color: "bg-green-900", // 黑绿色系
        scene: "huxiao",
        members: ["tanghao", "liuhao", "zhaoyuzhe", "ruanyongbin", "guoyang"]
    },
    baihua: {
        name: "百花",
        color: "bg-pink-500",
        scene: "baihua",
        members: ["yufeng", "zouyuan", "zhuxiaoping", "zhouguangyi", "zhangwei", "mozhuchen"]
    },
    sanyiling: {
        name: "三零一",
        color: "bg-lime-500",
        scene: "sanyiling",
        members: ["yangcong", "baishu", "gaojie", "sunmingjin", "liyihui"]
    },
    huangfeng: {
        name: "皇风",
        color: "bg-amber-500",
        scene: "huangfeng",
        members: ["tiansen", "heweitang", "shenwanhe"]
    },
    yizhan: {
        name: "义斩",
        color: "bg-yellow-500", // 金色系
        scene: "yizhan",
        members: ["louguanning", "sunzeping", "wenkebei", "guxiye","zhongyeli"]
    },

// 在teamConfig的league成员中添加
league: {
    name: "荣耀联盟",
    color: "bg-yellow-500",
    scene: "league",
    members: ["linjie", "fangshiqian", "wuxuefeng", "guomingyu", "luliang", "wuchen", "dengfusheng","liyibo"]
}
};

// 所有NPC完整数据 - 重新设计介绍系统
const npcData = {
    // 兴欣战队 - 红色系
    yexiu: {
        name: "叶修",
        team: "happy",
        gender: "male",
        bgColor: "bg-red-500",
        borderColor: "border-red-600",
        textColor: "text-white",
        introTargets: [
            { target: "sumucheng", team: "happy", favorRequire: 35 },
            { target: "chenguo", team: "happy", favorRequire: 31 },
            { target: "tangrou", team: "happy", favorRequire: 31 },
            { target: "baorongxing", team: "happy", favorRequire: 31 },
            { target: "qiaoyifan", team: "happy", favorRequire: 31 },
            { target: "weichen", team: "happy", favorRequire: 31 },
            { target: "fangrui", team: "happy", favorRequire: 31 },
            { target: "yuwenzhou", team: "lanyu", favorRequire: 31 },
            { target: "wangjiexi", team: "weicao", favorRequire: 31 },
            { target: "hanwenqing", team: "batu", favorRequire: 31 },
            { target: "huangshaotian", team: "lanyu", favorRequire: 31 },
           { target: "wenli", team: "jiashi", favorRequire: 31 },
            { target: "zhouzekai", team: "lunhui", favorRequire: 31 },
            { target: "sunxiang", team: "lunhui", favorRequire: 31 },
            { target: "xiaoshiqin", team: "leiting", favorRequire: 31 },
            { target: "liuhao", team: "huxiao", favorRequire: 31 },
            { target: "tiansen", team: "huangfeng", favorRequire: 31 },
            { target: "louguanning", team: "yizhan", favorRequire: 31 },
            { target: "qiufei", team: "jiashi", favorRequire: 31 }

        ],
        dialogs: {
            low: ["来了？要不要一起打一把副本？正好缺个靠谱的队友", "看你一直在看比赛录像，对哪个职业感兴趣？", "兴欣的氛围还不错吧？以后常来"],
            mid: ["来啦？我刚开了个副本，就等你了", "你最近技术进步很快，有潜力成为职业选手", "这是我整理的战术笔记，给你参考下"],
            high: ["看到你来了，这局比赛就稳了", "其实我挺享受和你一起打游戏的时光，很默契", "有件事想告诉你...我好像对你有点不一样的感觉"],
            love: ["来啦？快过来坐我旁边", "今天不打游戏，带你去一个好地方", "和你在一起的每一刻都很珍贵，我会好好对你的每一个瞬间"]
        },

        // 新格式：每个问题对应专属回答
    choicesByIndex: {
        low: [
            // 对应第一个问题："来了？要不要一起打一把副本？正好缺个靠谱的队友"
            [
                { text: "好啊，求叶神带飞！", favorChange: 4 },
                { text: "正好我也缺队友，一起打吧", favorChange: 3 },
                { text: "下次吧，我今天有点累", favorChange: -2 }
            ],
            // 对应第二个问题："看你一直在看比赛录像，对哪个职业感兴趣？"
            [
                { text: "想学习叶神你的散人玩法！", favorChange: 4 },
                { text: "我在研究战斗法师的打法", favorChange: 3 },
                { text: "只是随便看看", favorChange: -2 }
            ],
            // 对应第三个问题："兴欣的氛围还不错吧？以后常来"
            [
                { text: "特别喜欢这里的氛围！感觉很温暖", favorChange: 4 },
                { text: "嗯，以后会经常来找你们玩", favorChange: 3 },
                { text: "还行吧，我先走了", favorChange: -2 }
            ]
        ],
        mid: [
            // 对应第一个问题："来啦？我刚开了个副本，就等你了"
            [
                { text: "来啦！马上就位，一起赢", favorChange: 5 },
                { text: "今天打什么副本？我配合你", favorChange: 4 },
                { text: "我有点事，先不打了吧", favorChange: -3 }
            ],
            // 对应第二个问题："你最近技术进步很快，有潜力成为职业选手"
            [
                { text: "真的吗？谢谢叶神夸奖！我会继续努力的", favorChange: 5 },
                { text: "都是跟着你学的，你教得好", favorChange: 4 },
                { text: "过奖了，我还差得远", favorChange: -3 }
            ],
            // 对应第三个问题："这是我整理的战术笔记，给你参考下"
            [
                { text: "太宝贵了！我会认真研究的", favorChange: 5 },
                { text: "谢谢叶神，这对我帮助太大了", favorChange: 3 },
                { text: "不用了，我看不懂这些", favorChange: -3 }
            ]
        ],
        high: [
            // 对应第一个问题："看到你来了，这局比赛就稳了"
            [
                { text: "有你在才稳呢，我们一起努力", favorChange: 5 },
                { text: "你这么说我压力好大啊", favorChange: 4 },
                { text: "别太依赖我", favorChange: -6 }
            ],
            // 对应第二个问题："其实我挺享受和你一起打游戏的时光，很默契"
            [
                { text: "我也觉得和你特别默契，和你一起很开心", favorChange: 5 },
                { text: "是的，和你一起打游戏总是很愉快", favorChange: 5 },
                { text: "还好吧，只是正常配合", favorChange: -6 }
            ],
            // 对应第三个问题："有件事想告诉你...我好像对你有点不一样的感觉"
            [
                { text: "其实我也一样，我对你也有特别的感觉", favorChange: 5 },
                { text: "......（脸红说不出话）", favorChange: 5 },
                { text: "我们还是保持队友关系比较好", favorChange: -8 }
            ]
        ],
        love: [
            // 对应第一个问题："来啦？快过来坐我旁边"
            [
                { text: "好呀，来了～今天想我了吗？", favorChange: 3 },
                { text: "看你今天心情不错，有什么好事吗？", favorChange: 2 },
                { text: "我坐这里就好", favorChange: -6 }
            ],
            // 对应第二个问题："今天不打游戏，带你去一个好地方"
            [
                { text: "好呀，去哪都跟着你", favorChange: 3 },
                { text: "这么神秘？我很好奇是什么地方", favorChange: 2 },
                { text: "我想打游戏，不想出去", favorChange: -6 }
            ],
            // 对应第三个问题："和你在一起的每一刻都很珍贵，我会好好对你的每一个瞬间"
            [
                { text: "我也是，要一直在一起", favorChange: 3 },
                { text: "听到你这么说我好开心，我会永远珍惜的", favorChange: 3 },
                { text: "别说这些肉麻的话了", favorChange: -5 }
            ]
        ]
    },
    
        choices: {
            low: [
                { text: "好啊，求叶神带飞！", favorChange: 4 },
                { text: "不了，我先看看你们操作学习下", favorChange: 3 },
                { ignore: -2 }
            ],
            mid: [
                { text: "来啦！马上就位，一起赢", favorChange: 5 },
                { text: "谢谢叶神！我一定认真看", favorChange: 3 },
                { ignore: -3 }
            ],
            high: [
                { text: "我也对你有不一样的感觉", favorChange: 5 },
                { text: "能和你默契配合我也很开心", favorChange: 4 },
                { ignore: -6 }
            ],
            love: [
                { text: "好呀，去哪都跟着你", favorChange: 3 },
                { text: "我也会好好对你的，亲爱的", favorChange: 2 },
                { ignore: -12 }
            ]
        },
        confess: "打了这么多年荣耀，遇到过很多对手和队友，但只有你让我觉得特别。和你在一起的时光很安心，我想和你一直走下去，你愿意做我的恋人吗？",
        intimateEvents: [
            "这天晚上，叶修教了你很多有趣的技巧，让你欲罢不能。",
            "你发现叶修竟然认真记录了你的喜好、厌恶和各种小习惯，被问到时他说：只有认真对待，才能顺利升级啊。",
            "你和叶修度过了亲密的一夜。他谦虚地让你手把手教他，你也不知道他的’我不会哎‘是真的还是假的。"
        ]
    },

    chenguo: {
        name: "陈果",
        team: "happy",
        gender: "female",
        bgColor: "bg-red-400",
        borderColor: "border-red-500",
        textColor: "text-white",
        introTargets: [
            { target: "sumucheng", team: "happy", favorRequire: 25 },
            { target: "tangrou", team: "happy", favorRequire: 25 },
            { target: "baorongxing", team: "happy", favorRequire: 31 },
            { target: "qiaoyifan", team: "happy", favorRequire: 31 },
            { target: "anwenyi", team: "happy", favorRequire: 31 },
            { target: "luoji", team: "happy", favorRequire: 31 },
            { target: "weichen", team: "happy", favorRequire: 31 },
            { target: "fangrui", team: "happy", favorRequire: 31 },
            { target: "mofan", team: "happy", favorRequire: 31 }
        ],
        dialogs: {
            low: ["欢迎光临！今天想喝点什么？", "网吧新到了一批设备，要不要试试？", "看你经常来，是荣耀玩家吗？"],
            mid: ["来啦！给你留了你常坐的位置", "最近生意不错，多亏了你们这些老顾客", "叶修那家伙没欺负你吧？"],
            high: ["你来了我就特别开心，感觉网吧都亮堂了", "有时候会不自觉地期待你的到来", "有你在身边，感觉特别安心"],
            love: ["亲爱的，今天特意给你泡了你最喜欢的茶", "想你了，一整天都在盼着你来", "能遇见你真是我最大的幸运"]
        },
        choices: {
            low: [
                { text: "来杯奶茶，谢谢老板！", favorChange: 4 },
                { text: "今天想试试新设备", favorChange: 3 },
                { ignore: -2 }
            ],
            mid: [
                { text: "谢谢老板！位置真不错", favorChange: 5 },
                { text: "叶修对我挺好的，放心", favorChange: 3 },
                { ignore: -3 }
            ],
            high: [
                { text: "我也很期待见到你", favorChange: 5 },
                { text: "在你身边我也很安心", favorChange: 4 },
                { ignore: -6 }
            ],
            love: [
                { text: "谢谢亲爱的，你真好", favorChange: 3 },
                { text: "遇见你也是我的幸运", favorChange: 2 },
                { ignore: -12 }
            ]
        },
        confess: "从你第一次来网吧到现在，看着你一点点进步，我的心也一点点被你占据。我想以恋人的身份陪在你身边，你愿意给我这个机会吗？",
        intimateEvents: [
            "陈果在网吧打烊后单独为你准备了烛光晚餐，在柔和的灯光下向你表白心意",
            "和陈果度过亲密一夜，老板娘房间里的床比想象中好睡",
            "陈果用网吧的所有电脑屏幕拼出你的名字和爱心，在众人见证下向你示爱"
        ]
    },

    tangrou: {
        name: "唐柔",
        team: "happy",
        gender: "female",
        bgColor: "bg-red-300",
        borderColor: "border-red-400",
        textColor: "text-gray-800",
        introTargets: [
            { target: "qiaoyifan", team: "happy", favorRequire: 25 },
            { target: "mofan", team: "happy", favorRequire: 25 }
        ],
        dialogs: {
            low: ["要打一局吗？我正好想练习新连招", "你的操作很干净利落，不错", "荣耀这个游戏，越玩越有意思"],
            mid: ["来对战吧，让我看看你的进步", "你的战斗风格我很欣赏", "有时候觉得，和你打游戏很愉快"],
            high: ["和你对战总是能激发我的斗志", "不知不觉中，开始期待和你的每一次相遇", "你对我来说，是很特别的存在"],
            love: ["今天不想打游戏，想和你聊聊天", "看到你上线，心跳就会加快", "想和你一起创造更多美好的回忆"]
        },
        choices: {
            low: [
                { text: "好啊，请多指教！", favorChange: 4 },
                { text: "你的连招真厉害，我学习下", favorChange: 3 },
                { ignore: -2 }
            ],
            mid: [
                { text: "来战！我不会输的", favorChange: 5 },
                { text: "能被你欣赏是我的荣幸", favorChange: 3 },
                { ignore: -3 }
            ],
            high: [
                { text: "你对我来说也很特别", favorChange: 5 },
                { text: "我也很期待见到你", favorChange: 4 },
                { ignore: -6 }
            ],
            love: [
                { text: "想聊什么我都陪你", favorChange: 3 },
                { text: "我也想和你创造更多回忆", favorChange: 2 },
                { ignore: -12 }
            ]
        },
        confess: "从小到大，我追求的一直是变强。但遇见你之后，我发现心里多了一份温柔的牵挂。我想和你在一起，不只是游戏中的搭档，你愿意吗？",
        intimateEvents: [
            "唐柔在竞技场用华丽的连招打出你的名字，在全场观众的惊呼中向你告白",
            "和唐柔度过亲密一夜，打法和平时一样勇猛。",
            "在荣耀全明星赛上，唐柔当着所有选手的面走向你，献上胜利的玫瑰"
        ]
    },

    qiaoyifan: {
        name: "乔一帆",
        team: "happy",
        gender: "male",
        bgColor: "bg-red-200",
        borderColor: "border-red-300",
        textColor: "text-gray-800",
        introTargets: [
            { target: "gaoyingjie", team: "weicao", favorRequire: 25 },
            { target: "luhanwen", team: "lanyu", favorRequire: 25 },
            { target: "zhouyebai", team: "weicao", favorRequire: 25 },
            { target: "lixuan", team: "xukong", favorRequire: 25 },
            { target: "wuyuce", team: "xukong", favorRequire: 25 }
        ],
        dialogs: {
            low: ["前辈好！要一起练习吗？", "你的阵鬼操作很厉害，能教教我吗？", "在兴欣感觉很温暖，你呢？"],
            mid: ["谢谢你一直以来的指导", "和你一起训练让我进步很多", "开始觉得，有你在身边很安心"],
            high: ["你是我重要的前辈和朋友", "有时候会想，如果能一直这样训练下去就好了", "你让我找到了自信和方向"],
            love: ["今天不想叫你前辈了...想叫你的名字", "看到你认真的侧脸，心跳会漏一拍", "想和你一起走向更高的舞台"]
        },
        choices: {
            low: [
                { text: "好啊，一起练习！", favorChange: 4 },
                { text: "互相学习，共同进步", favorChange: 3 },
                { ignore: -2 }
            ],
            mid: [
                { text: "你也很努力，值得肯定", favorChange: 5 },
                { text: "有你在我也很安心", favorChange: 3 },
                { ignore: -3 }
            ],
            high: [
                { text: "你也是我重要的存在", favorChange: 5 },
                { text: "想和你一起走下去", favorChange: 4 },
                { ignore: -6 }
            ],
            love: [
                { text: "我也想叫你的名字", favorChange: 3 },
                { text: "我们一起走向未来", favorChange: 2 },
                { ignore: -12 }
            ]
        },
        confess: "从微草到兴欣，我一直在寻找自己的位置。直到遇见你，我才明白什么是真正的归属感。你愿意和我一起，继续这段旅程吗？",
        intimateEvents: [
            "乔一帆在训练室用阵鬼技能布下浪漫的阵法，在星光中向你表白心意",
            "和乔一帆度过亲密一夜，完全没有平时的羞涩呢。",
            "在全明星新秀挑战赛上，乔一帆选择你作为特别嘉宾，在万众瞩目下告白"
        ]
    },

    sumucheng: {
        name: "苏沐橙",
        team: "happy",
        gender: "female",
        bgColor: "bg-red-400",
        borderColor: "border-red-500",
        textColor: "text-white",
        introTargets: [
            { target: "chuyunxiu", team: "yuyan", favorRequire: 25 },
            { target: "daiyanqi", team: "leiting", favorRequire: 25 },
            { target: "liufei", team: "weicao", favorRequire: 25 },
            { target: "shukexin", team: "yuyan", favorRequire: 25 },
            { target: "shukeyi", team: "yuyan", favorRequire: 25 },
            { target: "wenli", team: "jiashi", favorRequire: 31 },
            { target: "zhongyeli", team: "yizhan", favorRequire: 25 },
            { target: "qiufei", team: "jiashi", favorRequire: 31 }
        ],
        dialogs: {
            low: ["嗨~要一起打竞技场吗？", "你的枪炮师操作很帅气呢", "兴欣的大家都很喜欢你哦"],
            mid: ["今天天气真好，适合一起训练", "和你配合总是很默契", "开始习惯每天看到你的身影"],
            high: ["有你在的比赛，我总是特别安心", "你笑起来的样子，让我心情很好", "对我来说，你是很特别的人"],
            love: ["今天不想训练，想和你去逛街", "你的每一个小动作，我都记在心里", "想和你分享所有的喜怒哀乐"]
        },
        choices: {
            low: [
                { text: "好啊，沐橙姐带带我！", favorChange: 4 },
                { text: "你的操作才叫帅气", favorChange: 3 },
                { ignore: -2 }
            ],
            mid: [
                { text: "和你配合我也很默契", favorChange: 5 },
                { text: "我也习惯每天见到你", favorChange: 3 },
                { ignore: -3 }
            ],
            high: [
                { text: "你也是我很特别的人", favorChange: 5 },
                { text: "你的笑容也让我很开心", favorChange: 4 },
                { ignore: -6 }
            ],
            love: [
                { text: "好啊，想去哪里？", favorChange: 3 },
                { text: "我也想了解你的一切", favorChange: 2 },
                { ignore: -12 }
            ]
        },
        confess: "在荣耀的世界里，我见过很多精彩的瞬间。但最让我心动的，是和你在一起的每一个平凡时刻。你愿意让这些时刻变成永远吗？",
        intimateEvents: [
            "苏沐橙在游乐园的摩天轮最高处向你告白，整个城市的灯火为你们见证",
            "和苏沐橙度过亲密一夜，香香的软软的",
            "在荣耀周年庆上，苏沐橙穿着婚纱式的战斗服，在漫天烟花中走向你"
        ]
    },

    fangrui: {
        name: "方锐",
        team: "happy",
        gender: "male",
        bgColor: "bg-red-300",
        borderColor: "border-red-400",
        textColor: "text-gray-800",
        introTargets: [
            { target: "linjingyan", team: "batu", favorRequire: 25 },
            { target: "lixuan", team: "xukong", favorRequire: 25 },
            { target: "tanghao", team: "huxiao", favorRequire: 25 },
            { target: "zhaoyuzhe", team: "huxiao", favorRequire: 25 },
            { target: "ruanyongbin", team: "huxiao", favorRequire: 25 },
            { target: "guoyang", team: "huxiao", favorRequire: 25 },
            { target: "wuyuce", team: "xukong", favorRequire: 25 }
        ],
        dialogs: {
            low: ["嘿！要不要见识下我的猥琐流？", "你的操作很有灵性，不错不错", "兴欣这边挺有意思的吧？"],
            mid: ["来配合一下，让你看看黄金右手", "和你打配合意外地顺畅", "开始觉得，有你在这家伙挺不错的"],
            high: ["和你在一起总是很轻松愉快", "不知不觉中，开始依赖你的配合", "你让我觉得，打荣耀是件快乐的事"],
            love: ["今天不想猥琐了，想正经和你待会", "看到你笑，我就忍不住想逗你开心", "想和你创造更多有趣的回忆"]
        },
        choices: {
            low: [
                { text: "求方锐大神指点！", favorChange: 4 },
                { text: "你的打法真有意思", favorChange: 3 },
                { ignore: -2 }
            ],
            mid: [
                { text: "来配合！我准备好了", favorChange: 5 },
                { text: "有你在我也很开心", favorChange: 3 },
                { ignore: -3 }
            ],
            high: [
                { text: "和你在一起我也很快乐", favorChange: 5 },
                { text: "想一直和你配合下去", favorChange: 4 },
                { ignore: -6 }
            ],
            love: [
                { text: "今天想看你正经的样子", favorChange: 3 },
                { text: "我也想和你创造回忆", favorChange: 2 },
                { ignore: -12 }
            ]
        },
        confess: "我这个人平时没个正经，但在感情这件事上，我是认真的。你愿意接受这个有时候猥琐，但永远真心对你的我吗？",
        intimateEvents: [
            "方锐在训练室用最正经的态度向你表白，难得一见的认真模样让你心动",
            "你和方锐度过亲密一夜，两个人都觉得很不错……",
            "在兴欣的庆功宴上，方锐当着所有人的面表演魔术，最后变出戒指向你求婚"
        ]
    },

    weichen: {
        name: "魏琛",
        team: "happy",
        gender: "male",
        bgColor: "bg-red-600",
        borderColor: "border-red-700",
        textColor: "text-white",
        introTargets: [
            { target: "fangrui", team: "happy", favorRequire: 25 },
            { target: "xiaoshiqin", team: "leiting", favorRequire: 25 },
            { target: "lixuan", team: "xukong", favorRequire: 25 },
            { target: "yuwenzhou", team: "lanyu", favorRequire: 25 },
            { target: "huangshaotian", team: "lanyu", favorRequire: 25 }
        ],
        dialogs: {
            low: ["啧啧，要不要学两招老将的经验？", "看你骨骼清奇，是块打荣耀的料", "兴欣这地方，待着还习惯吗？"],
            mid: ["来，教你点真本事", "你这孩子，悟性不错", "开始觉得，教你挺有成就感的"],
            high: ["看到你进步，我这老家伙很欣慰", "不知不觉中，把你当成了重要的后辈", "你让我想起了年轻时的自己"],
            love: ["今天不教技术，想和你聊聊天", "看到你认真的样子，让我很心动", "想在你身边，看着你成长"]
        },
        choices: {
            low: [
                { text: "请魏琛前辈指教！", favorChange: 4 },
                { text: "兴欣很好，很温暖", favorChange: 3 },
                { ignore: -2 }
            ],
            mid: [
                { text: "谢谢前辈！我会努力", favorChange: 5 },
                { text: "能被前辈认可太好了", favorChange: 3 },
                { ignore: -3 }
            ],
            high: [
                { text: "前辈对我也很重要", favorChange: 5 },
                { text: "想一直跟着前辈学习", favorChange: 4 },
                { ignore: -6 }
            ],
            love: [
                { text: "我也想和前辈聊天", favorChange: 3 },
                { text: "希望前辈一直在我身边", favorChange: 2 },
                { ignore: -12 }
            ]
        },
        confess: "我这个人，年纪不小了，经历的事情也多。但在你面前，我感觉自己又变回了那个热血青年。你愿意给这个老家伙一个机会吗？",
        intimateEvents: [
            "和魏琛度过亲密一夜……老男人真香",
            "魏琛在训练室用最古老的荣耀版本向你展示当年的风采，在怀旧中告白",
            "在兴欣的屋顶，魏琛为你放烟花，在绚烂中说出深藏心底的爱意"
        ]
    },

    baorongxing: {
        name: "包荣兴",
        team: "happy",
        gender: "male",
        bgColor: "bg-red-200",
        borderColor: "border-red-300",
        textColor: "text-gray-800",
        introTargets: [
            { target: "luoji", team: "happy", favorRequire: 25 },
            { target: "mofan", team: "happy", favorRequire: 25 }
        ],
        dialogs: {
            low: ["喂！来打本啊！", "你的操作很犀利嘛，不错不错", "兴欣这边超好玩的！"],
            mid: ["今天运气真好，一上线就遇到你", "和你组队总是很顺利", "开始觉得，你是我的幸运星"],
            high: ["有你在，打什么本都不怕", "你是我最重要的队友", "看到你上线，我就特别开心"],
            love: ["今天不打本，想和你去逛逛", "你的每一个表情，我都觉得超可爱", "想和你分享所有的快乐"]
        },
        choices: {
            low: [
                { text: "好啊包子！一起上！", favorChange: 4 },
                { text: "兴欣确实很好玩", favorChange: 3 },
                { ignore: -2 }
            ],
            mid: [
                { text: "你也是我的幸运星", favorChange: 5 },
                { text: "和你组队我也很开心", favorChange: 3 },
                { ignore: -3 }
            ],
            high: [
                { text: "你也是我重要的队友", favorChange: 5 },
                { text: "看到你我也很开心", favorChange: 4 },
                { ignore: -6 }
            ],
            love: [
                { text: "好啊，想去哪里逛？", favorChange: 3 },
                { text: "你也很可爱", favorChange: 2 },
                { ignore: -12 }
            ]
        },
        confess: "我这个人比较简单，喜欢就是喜欢。我喜欢你，超喜欢！你愿意和我这个直来直去的人在一起吗？",
        intimateEvents: [
            "包荣兴在副本里用怪物摆出爱心形状，在队友们的起哄中向你告白",
            "和包子度过亲密的一夜……发现他体力好到吓人。",
            "在兴欣的聚餐上，包子站起来大声宣布喜欢你，让所有人都为你祝福"
        ]
    },

    anwenyi: {
        name: "安文逸",
        team: "happy",
        gender: "male",
        bgColor: "bg-red-300",
        borderColor: "border-red-400",
        textColor: "text-gray-800",
        introTargets: [
            { target: "luoji", team: "happy", favorRequire: 25 }
        ],
        dialogs: {
            low: ["需要治疗支援吗？", "你的战斗数据很优秀", "兴欣的战术体系，你觉得如何？"],
            mid: ["今天的治疗计划需要调整吗？", "和你配合的数据很理想", "开始觉得，你是很可靠的队友"],
            high: ["有你在，治疗压力小了很多", "你是我数据计算中的最佳搭档", "看到你战斗的身影，让我很安心"],
            love: ["今天不想看数据，想看看真实的你", "你认真战斗的样子，让我心跳加速", "想和你分析彼此的心意数据"]
        },
        choices: {
            low: [
                { text: "谢谢治疗！", favorChange: 4 },
                { text: "兴欣的战术很灵活", favorChange: 3 },
                { ignore: -2 }
            ],
            mid: [
                { text: "和你配合我也很安心", favorChange: 5 },
                { text: "能被你认可太好了", favorChange: 3 },
                { ignore: -3 }
            ],
            high: [
                { text: "你也是我最佳搭档", favorChange: 5 },
                { text: "有你在我也很安心", favorChange: 4 },
                { ignore: -6 }
            ],
            love: [
                { text: "想让你看到真实的我", favorChange: 3 },
                { text: "我的心意数据是100%", favorChange: 2 },
                { ignore: -8 }
            ]
        },
        confess: "我习惯用数据说话，但感情这件事无法用数字衡量。你是我生命中最大的变量，也是最美的意外。愿意和我一起计算未来吗？",
        intimateEvents: [
            "安文逸在训练室用数据图表展示你们的心跳同步率，用最理性的方式表达最感性的爱意",
            "和安文逸度过亲密一夜，他的手很热。",
            "在兴欣的庆功宴上，安文逸放下平板电脑，第一次凭感觉说出'我爱你'"
        ]
    },

    luoji: {
        name: "罗辑",
        team: "happy",
        gender: "male",
        bgColor: "bg-red-200",
        borderColor: "border-red-300",
        textColor: "text-gray-800",
        introTargets: [],
        dialogs: {
            low: ["要...要一起研究战术吗？", "你的操作很符合数学规律", "兴欣的环境，还适应吗？"],
            mid: ["这个战术模型，想听听你的意见", "和你讨论问题总是很有收获", "开始觉得，和你在一起很放松"],
            high: ["你是我计算中的最优解", "看到你，心跳频率就会异常", "你让我的世界变得丰富多彩"],
            love: ["今天不想算数学，想算算我们的未来", "你的笑容，是我最想解的方程式", "想和你一起验证爱情的公式"]
        },
        choices: {
            low: [
                { text: "好啊，一起研究！", favorChange: 4 },
                { text: "正在努力适应中", favorChange: 3 },
                { ignore: -2 }
            ],
            mid: [
                { text: "你的模型很厉害", favorChange: 5 },
                { text: "和你在一起我也很放松", favorChange: 3 },
                { ignore: -3 }
            ],
            high: [
                { text: "你也是我的最优解", favorChange: 5 },
                { text: "你让我的世界更精彩", favorChange: 4 },
                { ignore: -6 }
            ],
            love: [
                { text: "我们的未来是无限大", favorChange: 3 },
                { text: "你是我唯一的解", favorChange: 2 },
                { ignore: -12 }
            ]
        },
        confess: "我习惯用公式和定理理解世界，但爱情是无法计算的奇迹。你是我生命中最美的定理，愿意和我一起证明永恒吗？",
        intimateEvents: [
            "罗辑在黑板上写满数学公式，最后推导出'我爱你'的结论",
            "和罗辑度过亲密一夜，没想到他各个方面的知识都很丰富。",
            "在兴欣的训练室，罗辑用代码编写了专属你们的爱情程序"
        ]
    },

    mofan: {
        name: "莫凡",
        team: "happy",
        gender: "male",
        bgColor: "bg-red-600",
        borderColor: "border-red-700",
        textColor: "text-white",
        introTargets: [],
        dialogs: {
            low: ["...", "...要一起吗？", "...兴欣..."],
            mid: ["...谢谢", "...和你...不错", "...习惯...你在"],
            high: ["...重要", "...开心", "...特别"],
            love: ["...喜欢", "...心跳", "...永远"]
        },
        choices: {
            low: [
                { text: "好啊！", favorChange: 4 },
                { text: "嗯！", favorChange: 3 },
                { ignore: -2 }
            ],
            mid: [
                { text: "你也很重要", favorChange: 5 },
                { text: "和你一起我也开心", favorChange: 3 },
                { ignore: -3 }
            ],
            high: [
                { text: "你也很特别", favorChange: 5 },
                { text: "想一直在一起", favorChange: 4 },
                { ignore: -6 }
            ],
            love: [
                { text: "我也喜欢你", favorChange: 3 },
                { text: "永远在一起", favorChange: 2 },
                { ignore: -12 }
            ]
        },
        confess: "...我...话少...但...真心...你...愿意...接受...这样的...我吗？",
        intimateEvents: [
            "莫凡在深夜的训练室为你表演了他最拿手的操作，用行动代替千言万语",
            "和莫凡度过亲密一夜，只干不说真家伙。",
            "在兴欣的天台，莫凡用烟花在夜空中画出爱心，这是他最浪漫的表达"
        ]
    },

    // 蓝雨战队 - 蓝色系
    yuwenzhou: {
        name: "喻文州",
        team: "lanyu",
        gender: "male",
        bgColor: "bg-blue-500",
        borderColor: "border-blue-600",
        textColor: "text-white",
        introTargets: [
            { target: "huangshaotian", team: "lanyu", favorRequire: 35 },
            { target: "luhanwen", team: "lanyu", favorRequire: 31 },
            { target: "zhengxuan", team: "lanyu", favorRequire: 31 },
            { target: "xujingxi", team: "lanyu", favorRequire: 31 },
            { target: "songxiao", team: "lanyu", favorRequire: 31 },
            { target: "liyuan", team: "lanyu", favorRequire: 31 }
        ],
        dialogs: {
            low: ["战术分析需要帮忙吗？", "你的操作很稳健，适合团队配合", "蓝雨的团队氛围，你觉得如何？"],
            mid: ["今天的训练计划需要调整吗？", "和你讨论战术总是很有收获", "你是个很可靠的队友"],
            high: ["有你在，战术执行总是很顺利", "开始习惯在制定战术时考虑你的存在", "你让我对荣耀有了新的理解"],
            love: ["今天不想谈战术，只想和你待在一起", "看到你认真思考的样子，让我心动", "想和你一起看遍蓝雨训练基地的每一个角落"]
        },
        choices: {
            low: [
                { text: "谢谢队长指导！", favorChange: 4 },
                { text: "蓝雨的氛围很棒", favorChange: 3 },
                { ignore: -2 }
            ],
            mid: [
                { text: "队长有什么建议？", favorChange: 5 },
                { text: "能被队长认可太好了", favorChange: 3 },
                { ignore: -3 }
            ],
            high: [
                { text: "你也是我重要的存在", favorChange: 5 },
                { text: "和你一起让我进步很多", favorChange: 4 },
                { ignore: -6 }
            ],
            love: [
                { text: "我也只想和你在一起", favorChange: 3 },
                { text: "想和你创造更多回忆", favorChange: 2 },
                { ignore: -12 }
            ]
        },
        confess: "作为战术师，我习惯计算每一步。但在感情这件事上，我选择跟随内心。你是我计算之外的最美意外，愿意和我一起书写我们的故事吗？",
        intimateEvents: [
            "慵懒的假期早上喻文州为你亲手端上美味粥饭，他问你：要不要日日煮饭你食？",
            "看着你学他的语调唤他’笨笨居‘的可爱样子，喻文州忍不住上前亲吻了你",
            "和喻文州度过亲密一夜，发现他耐心十足。一直到你先无法忍耐开始求他，他才如你所愿。"
        ]
    },

    huangshaotian: {
        name: "黄少天",
        team: "lanyu",
        gender: "male",
        bgColor: "bg-blue-400",
        borderColor: "border-blue-500",
        textColor: "text-white",
        introTargets: [
            { target: "yuwenzhou", team: "lanyu", favorRequire: 35 },
            { target: "luhanwen", team: "lanyu", favorRequire: 31 },
            { target: "zhengxuan", team: "lanyu", favorRequire: 31 },
            { target: "liyuan", team: "lanyu", favorRequire: 31 }
        ],
        dialogs: {
            low: ["喂喂喂来打竞技场啊我剑客超厉害的保证带你飞要不要试试看？", "你今天看起来状态不错啊要不要来切磋一下？", "蓝雨的食堂超好吃的我带你去尝尝？"],
            mid: ["你来了！我等你好久了今天有新战术要练习一起吗？", "你的进步好快啊不愧是我看好的人！", "不知道为什么和你在一起话就特别多想把什么都告诉你"],
            high: ["其实我平时话没这么多的但是看到你就忍不住想说话", "开始觉得和你在一起的时光特别珍贵", "你对我来说是很特别的人特别到让我有时候会紧张"],
            love: ["今天不想说话只想静静看着你", "你的笑容让我心跳加速话都说不利索了", "想和你分享我所有的快乐和烦恼"]
        },
        choices: {
            low: [
                { text: "好啊，剑圣大大带带我！", favorChange: 4 },
                { text: "正好饿了，去食堂吧", favorChange: 3 },
                { ignore: -2 }
            ],
            mid: [
                { text: "来练习！我准备好了", favorChange: 5 },
                { text: "被你认可我很开心", favorChange: 3 },
                { ignore: -3 }
            ],
            high: [
                { text: "你对我来说也很特别", favorChange: 5 },
                { text: "我喜欢听你说话", favorChange: 4 },
                { ignore: -6 }
            ],
            love: [
                { text: "我也喜欢静静看着你", favorChange: 3 },
                { text: "想听你所有的故事", favorChange: 2 },
                { ignore: -12 }
            ]
        },
        confess: "我这个人平时话很多你知道的但是现在我突然不知道该怎么说了就是那个我喜欢你超级喜欢喜欢到想要一直和你在一起你愿意给我这个机会吗？",
        intimateEvents: [
            "在只有两个人的场合里黄少天的话很少，因为他的嘴巴正忙着亲你。",
            "和黄少天度过亲密一夜，发现被他哄着不知不觉做了不少奇怪的事。",
            "黄少天带你见了家人，朋友和小学同学，他说他有了最中意的人，就要让全世界都知道。"
        ]
    },

    luhanwen: {
        name: "卢瀚文",
        team: "lanyu",
        gender: "male",
        bgColor: "bg-blue-300",
        borderColor: "border-blue-400",
        textColor: "text-white",
        introTargets: [
            { target: "huangshaotian", team: "lanyu", favorRequire: 25 },
            { target: "yuwenzhou", team: "lanyu", favorRequire: 25 },
            { target: "zhengxuan", team: "lanyu", favorRequire: 25 },
            { target: "gaoyingjie", team: "weicao", favorRequire: 25 },
            { target: "songqiying", team: "batu", favorRequire: 25 },
            { target: "qiufei", team: "jiashi", favorRequire: 31 }
        ],
        dialogs: {
            low: ["前辈前辈！要一起练习吗？", "你的重剑操作好帅气啊！", "蓝雨的训练超有意思的对吧？"],
            mid: ["谢谢你一直陪我练习！", "和你在一起总是充满活力", "开始觉得，你是很重要的前辈"],
            high: ["有你在，训练都不觉得累了", "你是我最崇拜的前辈之一", "看到你，我就特别有干劲"],
            love: ["今天不想叫前辈了...想叫你的名字", "你的鼓励让我心跳加速", "想和你一起变得更强"]
        },
        choices: {
            low: [
                { text: "好啊小卢！一起练习！", favorChange: 4 },
                { text: "蓝雨的训练确实有趣", favorChange: 3 },
                { ignore: -2 }
            ],
            mid: [
                { text: "和你一起我也很開心", favorChange: 5 },
                { text: "你也是很优秀的后辈", favorChange: 3 },
                { ignore: -3 }
            ],
            high: [
                { text: "你也是我重要的后辈", favorChange: 5 },
                { text: "看到你我也很有干劲", favorChange: 4 },
                { ignore: -6 }
            ],
            love: [
                { text: "我也想叫你的名字", favorChange: 3 },
                { text: "我们一起加油变强", favorChange: 2 },
                { ignore: -12 }
            ]
        },
        confess: "我年纪还小可能不懂什么是爱情但是我知道和你在一起的时候特别开心心跳也会变快你愿意等我长大然后和我在一起吗？",
        intimateEvents: [
            "卢瀚文在训练室用最认真的态度向你展示他的进步，在汗水中告白",
            "和卢瀚文度过……不，不可以。",
            "在蓝雨的青训营，小卢当着所有学员的面，用稚嫩却真诚的声音表白"
        ]
    },

    zhengxuan: {
        name: "郑轩",
        team: "lanyu",
        gender: "male",
        bgColor: "bg-blue-600",
        borderColor: "border-blue-700",
        textColor: "text-white",
        introTargets: [
            { target: "huangshaotian", team: "lanyu", favorRequire: 25 },
            { target: "yuwenzhou", team: "lanyu", favorRequire: 25 },
            { target: "xujingxi", team: "lanyu", favorRequire: 25 },
            { target: "yufeng", team: "baihua", favorRequire: 25 }
        ],
        dialogs: {
            low: ["压力山大啊...要一起训练吗？", "你的操作很稳定，不错", "蓝雨这边，还适应吗？"],
            mid: ["今天状态不错，要抓紧训练", "和你配合没什么压力", "开始觉得，有你在挺安心的"],
            high: ["和你在一起没什么压力", "你是我难得的能放松相处的人", "看到你，心情就会变好"],
            love: ["今天不想训练了，压力好大...想和你待着", "你的存在让我感觉很轻松", "想和你一起对抗所有压力"]
        },
        choices: {
            low: [
                { text: "好啊，一起训练！", favorChange: 4 },
                { text: "正在慢慢适应", favorChange: 3 },
                { ignore: -2 }
            ],
            mid: [
                { text: "和你配合我也很安心", favorChange: 5 },
                { text: "有你在我也很放松", favorChange: 3 },
                { ignore: -3 }
            ],
            high: [
                { text: "和你在一起我也没压力", favorChange: 5 },
                { text: "看到你我也很开心", favorChange: 4 },
                { ignore: -6 }
            ],
            love: [
                { text: "我也想和你待着", favorChange: 3 },
                { text: "我们一起面对压力", favorChange: 2 },
                { ignore: -12 }
            ]
        },
        confess: "压力好大啊...说这种话。但是不说的话压力更大。我喜欢你，虽然说出来很有压力，但不说的话我会后悔。你愿意接受这个总是压力山大的我吗？",
        intimateEvents: [
            "郑轩在压力最小的深夜训练室向你表白，难得地没有说压力大",
            "他带你去海边看日出，在晨光中轻声说出积压已久的心意",
            "在蓝雨的休息室，郑轩用最放松的状态告白，让你看到他真实的一面"
        ]
    },

    xujingxi: {
        name: "徐景熙",
        team: "lanyu",
        gender: "male",
        bgColor: "bg-blue-500",
        borderColor: "border-blue-600",
        textColor: "text-white",
        introTargets: [
            { target: "yuwenzhou", team: "lanyu", favorRequire: 25 },
            { target: "zhengxuan", team: "lanyu", favorRequire: 25 },
            { target: "songxiao", team: "lanyu", favorRequire: 25 }
        ],
        dialogs: {
            low: ["需要治疗吗？我准备好了", "你的生命值保持得很好", "蓝雨的治疗体系，觉得如何？"],
            mid: ["今天的治疗节奏需要调整吗？", "和你配合治疗很顺畅", "开始觉得，你是很省治疗的队友"],
            high: ["有你在，治疗压力小了很多", "你是我治疗列表里的优先目标", "看到你安全输出，让我很安心"],
            love: ["今天不想计算治疗量，想计算我们的未来", "你战斗的身影，是我最想守护的画面", "想和你一起治愈彼此的心灵"]
        },
        choices: {
            low: [
                { text: "谢谢治疗！", favorChange: 4 },
                { text: "蓝雨的治疗很专业", favorChange: 3 },
                { ignore: -2 }
            ],
            mid: [
                { text: "和你配合治疗我也很安心", favorChange: 5 },
                { text: "能省治疗是我的荣幸", favorChange: 3 },
                { ignore: -3 }
            ],
            high: [
                { text: "你也是我重要的治疗", favorChange: 5 },
                { text: "有你在我也很安心", favorChange: 4 },
                { ignore: -6 }
            ],
            love: [
                { text: "我们的未来是100%", favorChange: 3 },
                { text: "我也想守护你", favorChange: 2 },
                { ignore: -12 }
            ]
        },
        confess: "我习惯计算治疗量和技能冷却，但爱情没有冷却时间。你是我永远想要治疗的人，愿意让我守护你一辈子吗？",
        intimateEvents: [
            "徐景熙在训练室用治疗技能为你制造了爱心形状的光效",
            "他带你去医院做志愿者，在帮助他人时向你表白心意",
            "在蓝雨的医疗室，徐景熙用最专业的态度承诺会永远照顾你"
        ]
    },

    songxiao: {
        name: "宋晓",
        team: "lanyu",
        gender: "male",
        bgColor: "bg-blue-400",
        borderColor: "border-blue-500",
        textColor: "text-white",
        introTargets: [],
        dialogs: {
            low: ["要一起练习第六人战术吗？", "你的替补意识很不错", "蓝雨的轮换体系，适应吗？"],
            mid: ["今天的替补计划需要讨论吗？", "和你讨论战术很有默契", "开始觉得，你是很可靠的替补搭档"],
            high: ["有你在，轮换战术执行得很顺利", "你是我最放心的替补人选", "看到你准备上场，我就很安心"],
            love: ["今天不想当替补了，想当你的主角", "你认真准备的样子，让我很心动", "想和你一起站在舞台中央"]
        },
        choices: {
            low: [
                { text: "好啊，一起练习！", favorChange: 4 },
                { text: "正在适应轮换体系", favorChange: 3 },
                { ignore: -2 }
            ],
            mid: [
                { text: "和你讨论我也很有默契", favorChange: 5 },
                { text: "能被你认可太好了", favorChange: 3 },
                { ignore: -3 }
            ],
            high: [
                { text: "你也是我放心的搭档", favorChange: 5 },
                { text: "有你在我也很安心", favorChange: 4 },
                { ignore: -6 }
            ],
            love: [
                { text: "你一直是我的主角", favorChange: 3 },
                { text: "想和你一起闪耀", favorChange: 2 },
                { ignore: -12 }
            ]
        },
        confess: "作为第六人，我习惯在幕后支持团队。但在你面前，我想走到台前，成为你生命中最重要的那个人。你愿意给我这个机会吗？",
        intimateEvents: [
            "宋晓在比赛的关键时刻请求暂停，当着所有观众的面走向你告白",
            "他带你去蓝雨的替补席，在无人的场馆里说出心里话",
            "在团队庆功宴上，宋晓从幕后走到你面前，献上胜利的鲜花和真心"
        ]
    },

    liyuan: {
        name: "李远",
        team: "lanyu",
        gender: "male",
        bgColor: "bg-blue-300",
        borderColor: "border-blue-400",
        textColor: "text-gray-800",
        introTargets: [],
        dialogs: {
            low: ["要一起练习召唤师操作吗？", "你的召唤物控制很精准", "蓝雨的召唤体系，觉得如何？"],
            mid: ["今天的召唤战术需要优化吗？", "和你配合召唤很流畅", "开始觉得，你是很优秀的召唤师"],
            high: ["有你在，召唤战术威力倍增", "你是我召唤列表里的特别关注", "看到你指挥召唤物，让我很欣赏"],
            love: ["今天不想召唤怪物，想召唤你的心", "你专注的样子，让我很想靠近", "想和你一起召唤美好的未来"]
        },
        choices: {
            low: [
                { text: "好啊，请多指教！", favorChange: 4 },
                { text: "蓝雨的召唤体系很厉害", favorChange: 3 },
                { ignore: -2 }
            ],
            mid: [
                { text: "和你配合我也很流畅", favorChange: 5 },
                { text: "能被你认可很荣幸", favorChange: 3 },
                { ignore: -3 }
            ],
            high: [
                { text: "你也是我特别关注的人", favorChange: 5 },
                { text: "很欣赏你的操作", favorChange: 4 },
                { ignore: -6 }
            ],
            love: [
                { text: "我的心已经被你召唤", favorChange: 3 },
                { text: "想和你创造未来", favorChange: 2 },
                { ignore: -12 }
            ]
        },
        confess: "我习惯召唤各种生物协助战斗，但最想召唤的是你的心。你愿意让我的召唤兽们见证我们的爱情吗？",
        intimateEvents: [
            "李远在训练室用召唤兽摆出爱心阵型，在兽群的簇拥下告白",
            "他带你去动物园，在可爱的动物面前说出喜欢你",
            "在蓝雨的花园，李远召唤出最温顺的召唤兽，让它送来定情信物"
        ]
    },

    // 微草战队 - 绿色系
    wangjiexi: {
        name: "王杰希",
        team: "weicao",
        gender: "male",
        bgColor: "bg-green-500",
        borderColor: "border-green-600",
        textColor: "text-white",
        introTargets: [
            { target: "gaoyingjie", team: "weicao", favorRequire: 35 },
            { target: "xubin", team: "weicao", favorRequire: 31 },
            { target: "liuxiaobie", team: "weicao", favorRequire: 31 },
            { target: "yuanbaiqing", team: "weicao", favorRequire: 31 },
            { target: "liangfang", team: "weicao", favorRequire: 31 },
            { target: "liufei", team: "weicao", favorRequire: 31 },
            { target: "zhouyebai", team: "weicao", favorRequire: 31 }
        ],
        dialogs: {
            low: ["魔道学者的操作，需要指导吗？", "你的节奏感不错，适合微草的风格", "微草的训练强度，还适应吗？"],
            mid: ["今天的训练计划针对你的弱点做了调整", "你很有潜力，我看得出来", "和你讨论战术总是很有效率"],
            high: ["你的进步超出了我的预期", "开始习惯在制定战术时考虑你的特点", "你让微草的战术体系更加完整"],
            love: ["今天不谈训练，想和你单独待会", "你认真训练的样子，让我移不开眼", "想带你看看我眼中的微草"]
        },
        choices: {
            low: [
                { text: "请王队指导！", favorChange: 4 },
                { text: "正在努力适应中", favorChange: 3 },
                { ignore: -2 }
            ],
            mid: [
                { text: "谢谢王队！我会努力", favorChange: 5 },
                { text: "能被王队认可太好了", favorChange: 3 },
                { ignore: -3 }
            ],
            high: [
                { text: "你也是我重要的导师", favorChange: 5 },
                { text: "想和你一起让微草更强", favorChange: 4 },
                { ignore: -6 }
            ],
            love: [
                { text: "我也想和你单独相处", favorChange: 3 },
                { text: "想了解你眼中的世界", favorChange: 2 },
                { ignore: -12 }
            ]
        },
        confess: "作为魔术师，我习惯用出人意料的方式取胜。但在感情这件事上，我想用最真诚的心意打动你。你愿意成为我生命中最重要的那个人吗？",
        intimateEvents: [
            "热吻之后，王杰希望着你说，要不要干脆结婚好了，正好他下个月有假期。",
            "王杰希把你拉到战术白板后亲吻，你问他队规里允许队员们在会议室做这种事吗？他笑着回答你：其他人不行，但是他特批了‘王杰希‘。",
            "和王杰希度过亲密一夜，没想到他喜欢的姿势……十分地传统。"
        ]
    },

    gaoyingjie: {
        name: "高英杰",
        team: "weicao",
        gender: "male",
        bgColor: "bg-green-400",
        borderColor: "border-green-500",
        textColor: "text-white",
        introTargets: [
            { target: "wangjiexi", team: "weicao", favorRequire: 35 },
            { target: "liuxiaobie", team: "weicao", favorRequire: 31 },
            { target: "yuanbaiqing", team: "weicao", favorRequire: 31 },
            { target: "liufei", team: "weicao", favorRequire: 31 },
            { target: "lixuan", team: "xukong", favorRequire: 31 },
            { target: "luhanwen", team: "lanyu", favorRequire: 31 },
            { target: "songqiying", team: "batu", favorRequire: 31 },
            { target: "gaicaijie", team: "xukong", favorRequire: 31 }
        ],
        dialogs: {
            low: ["前辈...要一起练习吗？", "你的魔道学者操作很厉害", "微草的训练...还适应吗？"],
            mid: ["谢谢你一直鼓励我", "和你在一起...很安心", "开始觉得...你是很重要的人"],
            high: ["有你在...我更有勇气了", "你是我...最信任的前辈", "看到你...心跳就会加快"],
            love: ["今天...想叫你的名字", "你鼓励我的样子...让我很心动", "想和你...一起飞翔"]
        },
        choices: {
            low: [
                { text: "好啊英杰！一起练习！", favorChange: 4 },
                { text: "微草的训练很有挑战", favorChange: 3 },
                { ignore: -2 }
            ],
            mid: [
                { text: "你也很优秀，要自信", favorChange: 5 },
                { text: "有你在我也很安心", favorChange: 3 },
                { ignore: -3 }
            ],
            high: [
                { text: "你也是我信任的人", favorChange: 5 },
                { text: "看到你我也很开心", favorChange: 4 },
                { ignore: -6 }
            ],
            love: [
                { text: "我也想叫你的名字", favorChange: 3 },
                { text: "我们一起飞翔", favorChange: 2 },
                { ignore: -12 }
            ]
        },
        confess: "我...我一直不够自信...但是在你的鼓励下，我慢慢找到了勇气。你愿意和这样的我一起，飞向更高的天空吗？",
        intimateEvents: [
            "高英杰在训练室用最完美的操作完成了王不留行的招牌动作，在星光中向你证明他的成长",
            "他带你去微草的天台，在晨光中鼓起勇气牵起你的手",
            "在新秀挑战赛上，高英杰战胜心魔，在胜利的喜悦中向你告白"
        ]
    },

    xubin: {
        name: "许斌",
        team: "weicao",
        gender: "male",
        bgColor: "bg-green-600",
        borderColor: "border-green-700",
        textColor: "text-white",
        introTargets: [
            { target: "wangjiexi", team: "weicao", favorRequire: 25 },
            { target: "liuxiaobie", team: "weicao", favorRequire: 25 },
           { target: "yangcong", team: "sanyiling", favorRequire: 31 },
         { target: "yuanbaiqing", team: "weicao", favorRequire: 25 }
                ],
        dialogs: {
            low: ["要一起练习骑士操作吗？", "你的防守意识很不错", "微草的防守体系，适应得如何？"],
            mid: ["今天的防守战术需要调整吗？", "和你配合防守很稳固", "开始觉得，你是很可靠的队友"],
            high: ["有你在，防守阵线很牢固", "你是我防守时最放心的搭档", "看到你坚守阵地，让我很安心"],
            love: ["今天不想防守了，想守护你的心", "你战斗的身影，让我很想保护", "想和你一起守护彼此的未来"]
        },
        choices: {
            low: [
                { text: "好啊，请多指教！", favorChange: 4 },
                { text: "正在适应防守体系", favorChange: 3 },
                { ignore: -2 }
            ],
            mid: [
                { text: "和你配合我也很安心", favorChange: 5 },
                { text: "能被你认可太好了", favorChange: 3 },
                { ignore: -3 }
            ],
            high: [
                { text: "你也是我放心的搭档", favorChange: 5 },
                { text: "有你在我也很安心", favorChange: 4 },
                { ignore: -6 }
            ],
            love: [
                { text: "我的心需要你守护", favorChange: 3 },
                { text: "想和你守护未来", favorChange: 2 },
                { ignore: -12 }
            ]
        },
        confess: "作为骑士，我习惯守护队友。但在你面前，我想守护的不仅是你的安全，更是你的心。你愿意让我成为你永远的守护者吗？",
        intimateEvents: [
            "许斌在训练室用骑士技能为你筑起爱的堡垒，在金光中告白",
            "他带你去微草的古堡式建筑，在石墙前承诺永远守护你",
            "在团队防守训练中，许斌为你挡下所有攻击，用行动证明他的决心"
        ]
    },

    liuxiaobie: {
        name: "刘小别",
        team: "weicao",
        gender: "male",
        bgColor: "bg-green-300",
        borderColor: "border-green-400",
        textColor: "text-gray-800",
        introTargets: [
            { target: "wangjiexi", team: "weicao", favorRequire: 25 },
            { target: "gaoyingjie", team: "weicao", favorRequire: 25 },
            { target: "yuanbaiqing", team: "weicao", favorRequire: 25 },
            { target: "shukexin", team: "yuyan", favorRequire: 25 },
            { target: "shukeyi", team: "yuyan", favorRequire: 25 },
            { target: "luhanwen", team: "lanyu", favorRequire: 25 },
            { target: "gaicaijie", team: "xukong", favorRequire: 25 }
        ],
        dialogs: {
            low: ["要切磋一下手速吗？", "你的操作很快，不错", "微草的快攻战术，觉得如何？"],
            mid: ["今天的手速训练要一起吗？", "和你比试总是很痛快", "开始觉得，你是很好的对手"],
            high: ["有你在，手速训练更有动力", "你是我最想超越的对手", "看到你进步，让我更想努力"],
            love: ["今天不想比手速，想比谁先心动", "你专注的样子，让我心跳加速", "想和你一起创造更快的未来"]
        },
        choices: {
            low: [
                { text: "好啊，来比比看！", favorChange: 4 },
                { text: "微草的快攻很犀利", favorChange: 3 },
                { ignore: -2 }
            ],
            mid: [
                { text: "和你比试我也很享受", favorChange: 5 },
                { text: "你也是我尊敬的对手", favorChange: 3 },
                { ignore: -3 }
            ],
            high: [
                { text: "你也是我想超越的人", favorChange: 5 },
                { text: "看到你努力我也要加油", favorChange: 4 },
                { ignore: -6 }
            ],
            love: [
                { text: "我的心早就为你加速", favorChange: 3 },
                { text: "我们的未来会很快乐", favorChange: 2 },
                { ignore: -12 }
            ]
        },
        confess: "我追求速度，想要变得更快。但在感情这件事上，我愿意放慢脚步，用一生的时间来爱你。你愿意和我一起跑向未来吗？",
        intimateEvents: [
            "刘小别在训练室用破纪录的手速打出了你的名字，在数据屏前告白",
            "他带你去赛车场，在极速中喊出对你的爱意",
            "在微草的速度测试中，刘小别为你创造了专属的浪漫时刻"
        ]
    },

    yuanbaiqing: {
        name: "袁柏清",
        team: "weicao",
        gender: "male",
        bgColor: "bg-green-500",
        borderColor: "border-green-600",
        textColor: "text-white",
        introTargets: [
            { target: "wangjiexi", team: "weicao", favorRequire: 25 },
            { target: "xubin", team: "weicao", favorRequire: 25 },
            { target: "liuxiaobie", team: "weicao", favorRequire: 25 },
            { target: "xujingxi", team: "lanyu", favorRequire: 25 }
        ],
        dialogs: {
            low: ["需要治疗支援吗？我准备好了", "你的生命值管理很到位", "微草的治疗节奏，适应吗？"],
            mid: ["今天的治疗计划需要讨论吗？", "和你配合治疗很默契", "开始觉得，你是很省心的队友"],
            high: ["有你在，治疗压力减轻很多", "你是我治疗时最放心的目标", "看到你安全输出，让我很欣慰"],
            love: ["今天不想计算治疗量，想计算我们的缘分", "你战斗的英姿，是我最想守护的画面", "想和你一起治愈彼此的人生"]
        },
        choices: {
            low: [
                { text: "谢谢治疗！", favorChange: 4 },
                { text: "正在适应治疗节奏", favorChange: 3 },
                { ignore: -2 }
            ],
            mid: [
                { text: "和你配合我也很默契", favorChange: 5 },
                { text: "能省心是我的荣幸", favorChange: 3 },
                { ignore: -3 }
            ],
            high: [
                { text: "你也是我放心的治疗", favorChange: 5 },
                { text: "有你在我也很安心", favorChange: 4 },
                { ignore: -6 }
            ],
            love: [
                { text: "我们的缘分是100%", favorChange: 3 },
                { text: "我也想守护你", favorChange: 2 },
                { ignore: -12 }
            ]
        },
        confess: "我习惯用治疗术拯救队友，但最想治愈的是你的心。你愿意让我用一生的时间，为你施展爱的治愈术吗？",
        intimateEvents: [
            "袁柏清在训练室用治疗技能为你创造了爱心光效，在圣光中告白",
            "他带你去医院做志愿者，在帮助他人时表达爱意",
            "在微草的医疗室，袁柏清用最专业的态度承诺永远照顾你"
        ]
    },

    liangfang: {
        name: "梁方",
        team: "weicao",
        gender: "male",
        bgColor: "bg-green-400",
        borderColor: "border-green-500",
        textColor: "text-white",
        introTargets: [],
        dialogs: {
            low: ["要一起练习狂剑士操作吗？", "你的攻击很猛烈，不错", "微草的强攻战术，觉得如何？"],
            mid: ["今天的强攻训练要一起吗？", "和你配合攻击很痛快", "开始觉得，你是很棒的搭档"],
            high: ["有你在，攻击力提升很多", "你是我最想并肩作战的人", "看到你勇往直前，让我很欣赏"],
            love: ["今天不想强攻，想温柔待你", "你战斗的勇气，让我很心动", "想和你一起攻占彼此的心"]
        },
        choices: {
            low: [
                { text: "好啊，一起练习！", favorChange: 4 },
                { text: "微草的强攻很厉害", favorChange: 3 },
                { ignore: -2 }
            ],
            mid: [
                { text: "和你配合我也很痛快", favorChange: 5 },
                { text: "你也是我欣赏的搭档", favorChange: 3 },
                { ignore: -3 }
            ],
            high: [
                { text: "你也是我想并肩的人", favorChange: 5 },
                { text: "很欣赏你的勇气", favorChange: 4 },
                { ignore: -6 }
            ],
            love: [
                { text: "我的心已被你攻占", favorChange: 3 },
                { text: "想和你温柔相待", favorChange: 2 },
                { ignore: -12 }
            ]
        },
        confess: "我习惯用猛烈的攻击压制对手，但在你面前，我只想用最温柔的方式爱你。你愿意接受这个为你变得温柔的狂剑士吗？",
        intimateEvents: [
            "梁方在训练室用最温柔的操作展示狂剑士的另一面，在刀光中告白",
            "他带你去花园，在花海中展现他温柔的一面",
            "在微草的强攻训练中，梁方为你放慢节奏，用行动证明他的改变"
        ]
    },

    liufei: {
        name: "柳非",
        team: "weicao",
        gender: "female",
        bgColor: "bg-green-300",
        borderColor: "border-green-400",
        textColor: "text-gray-800",
        introTargets: [
            { target: "wangjiexi", team: "weicao", favorRequire: 25 },
            { target: "gaoyingjie", team: "weicao", favorRequire: 25 },
            { target: "chuyunxiu", team: "yuyan", favorRequire: 25 },
            { target: "sumucheng", team: "happy", favorRequire: 25 },
            { target: "daiyanqi", team: "leiting", favorRequire: 25 },
            { target: "shukexin", team: "yuyan", favorRequire: 25 },
            { target: "shukeyi", team: "yuyan", favorRequire: 25 },
            { target: "zhongyeli", team: "yizhan", favorRequire: 25 }
        ],
        dialogs: {
            low: ["要一起练习神枪手操作吗？", "你的射击很精准，不错", "微草的远程支援，适应吗？"],
            mid: ["今天的射击训练要一起吗？", "和你配合射击很默契", "开始觉得，你是很可靠的队友"],
            high: ["有你在，远程火力很强大", "你是我最想掩护的队友", "看到你精准射击，让我很佩服"],
            love: ["今天不想练习射击，想射中你的心", "你专注瞄准的样子，让我心跳漏拍", "想和你一起瞄准幸福的未来"]
        },
        choices: {
            low: [
                { text: "好啊，一起练习！", favorChange: 4 },
                { text: "正在适应远程支援", favorChange: 3 },
                { ignore: -2 }
            ],
            mid: [
                { text: "和你配合我也很默契", favorChange: 5 },
                { text: "能被你认可太好了", favorChange: 3 },
                { ignore: -3 }
            ],
            high: [
                { text: "你也是我想掩护的人", favorChange: 5 },
                { text: "很佩服你的精准", favorChange: 4 },
                { ignore: -6 }
            ],
            love: [
                { text: "我的心早已被你射中", favorChange: 3 },
                { text: "想和你瞄准未来", favorChange: 2 },
                { ignore: -12 }
            ]
        },
        confess: "我习惯用子弹命中目标，但最想命中的是你的心。你愿意让我的爱如子弹般精准地射入你的心房吗？",
        intimateEvents: [
            "柳非在训练室用射击在靶心上打出爱心图案，在硝烟中告白",
            "她带你去射击场，在百发百中后说出心里话",
            "在微草的远程训练中，柳非为你展示了最浪漫的射击表演"
        ]
    },

    zhouyebai: {
        name: "周烨柏",
        team: "weicao",
        gender: "male",
        bgColor: "bg-green-600",
        borderColor: "border-green-700",
        textColor: "text-white",
        introTargets: [
            { target: "wangjiexi", team: "weicao", favorRequire: 25 },
            { target: "gaoyingjie", team: "weicao", favorRequire: 25 },
            { target: "lixuan", team: "xukong", favorRequire: 25 },
            { target: "wuyuce", team: "xukong", favorRequire: 25 },
            { target: "qiaoyifan", team: "happy", favorRequire: 25 }
        ],
        dialogs: {
            low: ["要一起练习阵鬼操作吗？", "你的阵法布置很巧妙", "微草的阵法战术，觉得如何？"],
            mid: ["今天的阵法训练要一起吗？", "和你讨论阵法很有灵感", "开始觉得，你是很聪明的队友"],
            high: ["有你在，阵法威力提升很多", "你是我最想合作布阵的人", "看到你巧妙布阵，让我很欣赏"],
            love: ["今天不想布战阵，想布情网", "你思考的样子，让我陷入情网", "想和你一起布置爱的阵法"]
        },
        choices: {
            low: [
                { text: "好啊，请多指教！", favorChange: 4 },
                { text: "微草的阵法很精妙", favorChange: 3 },
                { ignore: -2 }
            ],
            mid: [
                { text: "和你讨论我也很有灵感", favorChange: 5 },
                { text: "能被你认可很荣幸", favorChange: 3 },
                { ignore: -3 }
            ],
            high: [
                { text: "你也是我想合作的人", favorChange: 5 },
                { text: "很欣赏你的智慧", favorChange: 4 },
                { ignore: -6 }
            ],
            love: [
                { text: "我早已陷入你的情网", favorChange: 3 },
                { text: "想和你布置未来", favorChange: 2 },
                { ignore: -12 }
            ]
        },
        confess: "我习惯用阵法困住敌人，但最想困住的是你的心。你愿意陷入我为你精心布置的爱情阵法吗？",
        intimateEvents: [
            "周烨柏在训练室用鬼阵摆出爱心形状，在幽光中浪漫告白",
            "他带你去古迹，在古老的阵法前诉说永恒的爱意",
            "在微草的阵法研究中，周烨柏为你创造了专属的爱的结界"
        ]
    },

    // 轮回战队 - 黄黑色系
    zhouzekai: {
        name: "周泽楷",
        team: "lunhui",
        gender: "male",
        bgColor: "bg-yellow-800",
        borderColor: "border-yellow-900",
        textColor: "text-white",
        introTargets: [
            { target: "jiangbotao", team: "lunhui", favorRequire: 35 },
            { target: "sunxiang", team: "lunhui", favorRequire: 31 },
            { target: "lvboyuan", team: "lunhui", favorRequire: 31 },
            { target: "duming", team: "lunhui", favorRequire: 31 },
            { target: "fangminghua", team: "lunhui", favorRequire: 31 },
            { target: "wuqi", team: "lunhui", favorRequire: 31 }
        ],
        dialogs: {
            low: ["...", "...练习？", "...轮回..."],
            mid: ["...谢谢", "...和你...好", "...习惯..."],
            high: ["...重要", "...开心", "...特别"],
            love: ["...喜欢", "...心跳", "...永远"]
        },
        choices: {
            low: [
                { text: "好啊！", favorChange: 4 },
                { text: "轮回很强", favorChange: 3 },
                { ignore: -2 }
            ],
            mid: [
                { text: "你也很棒", favorChange: 5 },
                { text: "习惯有你在", favorChange: 3 },
                { ignore: -3 }
            ],
            high: [
                { text: "你也很特别", favorChange: 5 },
                { text: "看到你开心", favorChange: 4 },
                { ignore: -6 }
            ],
            love: [
                { text: "我也喜欢你", favorChange: 3 },
                { text: "永远在一起", favorChange: 2 },
                { ignore: -12 }
            ]
        },
        confess: "...我...话少...但...真心...你...愿意...接受...这样的...我吗？",
        intimateEvents: [
            "周泽楷说话很简短，例如：’还好吗‘、’是这里吗‘和’这样会舒服吗‘……",
            "和周泽楷度过亲密一夜，枪王不愧是枪王，枪体术厉害，’体术‘也厉害。",
            "在电视采访时，周泽楷主动提及自己处于热恋中，惹得广大粉丝心碎一地。"
        ]
    },

    jiangbotao: {
        name: "江波涛",
        team: "lunhui",
        gender: "male",
        bgColor: "bg-yellow-700",
        borderColor: "border-yellow-800",
        textColor: "text-white",
        introTargets: [
            { target: "zhouzekai", team: "lunhui", favorRequire: 35 },
            { target: "sunxiang", team: "lunhui", favorRequire: 31 },
            { target: "lvboyuan", team: "lunhui", favorRequire: 31 },
            { target: "yufeng", team: "baihua", favorRequire: 31 },
            { target: "zouyuan", team: "baihua", favorRequire: 31 }
        ],
        dialogs: {
            low: ["要一起练习团队配合吗？", "你的沟通能力很不错", "轮回的团队氛围，觉得如何？"],
            mid: ["今天的战术配合需要调整吗？", "和你沟通总是很顺畅", "开始觉得，你是很好的桥梁"],
            high: ["有你在，团队配合更默契", "你是我最想沟通的队友", "看到你协调团队，让我很欣赏"],
            love: ["今天不想谈战术，想谈我们的心", "你善解人意的样子，让我很心动", "想和你一起沟通彼此的未来"]
        },
        choices: {
            low: [
                { text: "好啊，一起练习！", favorChange: 4 },
                { text: "轮回的团队很棒", favorChange: 3 },
                { ignore: -2 }
            ],
            mid: [
                { text: "和你沟通我也很顺畅", favorChange: 5 },
                { text: "能被你认可太好了", favorChange: 3 },
                { ignore: -3 }
            ],
            high: [
                { text: "你也是我想沟通的人", favorChange: 5 },
                { text: "很欣赏你的能力", favorChange: 4 },
                { ignore: -6 }
            ],
            love: [
                { text: "我的心向你敞开", favorChange: 3 },
                { text: "想和你规划未来", favorChange: 2 },
                { ignore: -12 }
            ]
        },
        confess: "我习惯在队友间架起沟通的桥梁，但最想连接的是我们的心。你愿意让我成为你生命中最重要的沟通者吗？",
        intimateEvents: [
            "江波涛在训练室用战术板画出了心的连接图，在图表中浪漫告白",
            "他带你去轮回的通讯中心，在电波中传递爱意",
            "在团队配合训练中，江波涛为你创造了专属的沟通密码"
        ]
    },
    // 轮回战队 - 黄黑色系 (续)
    sunxiang: {
        name: "孙翔",
        team: "lunhui",
        gender: "male",
        bgColor: "bg-yellow-600",
        borderColor: "border-yellow-700",
        textColor: "text-white",
        introTargets: [
            { target: "zhouzekai", team: "lunhui", favorRequire: 25 },
            { target: "jiangbotao", team: "lunhui", favorRequire: 25 },
            { target: "lvboyuan", team: "lunhui", favorRequire: 25 },
            { target: "shukexin", team: "yuyan", favorRequire: 25 },
            { target: "shukeyi", team: "yuyan", favorRequire: 25 },
            { target: "tanghao", team: "huxiao", favorRequire: 25 },
            { target: "qiufei", team: "jiashi", favorRequire: 25 },
            { target: "luhanwen", team: "lanyu", favorRequire: 25 },
            { target: "gaoyingjie", team: "weicao", favorRequire: 25 }
        ],
        dialogs: {
            low: ["要切磋吗？让你见识下斗神的实力", "你的操作还不错，但还要加油", "轮回的实力，感受到了吗？"],
            mid: ["今天状态不错，要一起练习吗？", "你的进步很快，我认可你了", "开始觉得，你是个不错的对手"],
            high: ["有你在，训练更有挑战性", "你是我想要超越的对手之一", "看到你变强，让我更想努力"],
            love: ["今天不想比试，想和你聊聊", "你认真的样子，让我很在意", "想和你一起站上巅峰"]
        },
        choices: {
            low: [
                { text: "好啊，请多指教！", favorChange: 4 },
                { text: "轮回确实很强", favorChange: 3 },
                { ignore: -2 }
            ],
            mid: [
                { text: "能被你认可很荣幸", favorChange: 5 },
                { text: "你也是我尊敬的对手", favorChange: 3 },
                { ignore: -3 }
            ],
            high: [
                { text: "你也是我想超越的人", favorChange: 5 },
                { text: "看到你努力我也要加油", favorChange: 4 },
                { ignore: -6 }
            ],
            love: [
                { text: "我也想和你聊聊", favorChange: 3 },
                { text: "想和你一起变强", favorChange: 2 },
                { ignore: -12 }
            ]
        },
        confess: "我追求力量，想要成为最强。但在你面前，我发现最强不如最真。你愿意接受这个还在成长的我吗？",
        intimateEvents: [
            "孙翔喜欢带你去吃情侣套餐，为了证明’情侣关系‘，他勉为其难地亲了你一次又一次。",
            "和孙翔度过亲密一夜，没想到他看起来小，其实很大。",
            "孙翔把你的照片设置成手机屏保、电脑桌面、朋友圈壁纸……在修改荣耀账号头像时被发现并及时阻止了。"
        ]
    },

    lvboyuan: {
        name: "吕泊远",
        team: "lunhui",
        gender: "male",
        bgColor: "bg-yellow-500",
        borderColor: "border-yellow-600",
        textColor: "text-white",
        introTargets: [
            { target: "zhouzekai", team: "lunhui", favorRequire: 25 },
            { target: "jiangbotao", team: "lunhui", favorRequire: 25 },
            { target: "duming", team: "lunhui", favorRequire: 25 },
            { target: "xubin", team: "weicao", favorRequire: 25 }
        ],
        dialogs: {
            low: ["要一起练习柔道操作吗？", "你的近身格斗很不错", "轮回的格斗体系，适应吗？"],
            mid: ["今天的格斗训练要一起吗？", "和你配合格斗很默契", "开始觉得，你是很可靠的搭档"],
            high: ["有你在，格斗威力提升很多", "你是我最想搭档的格斗家", "看到你灵活的身手，让我很欣赏"],
            love: ["今天不想格斗，想温柔待你", "你战斗的英姿，让我心跳加速", "想和你一起拥抱未来"]
        },
        choices: {
            low: [
                { text: "好啊，请多指教！", favorChange: 4 },
                { text: "正在适应格斗体系", favorChange: 3 },
                { ignore: -2 }
            ],
            mid: [
                { text: "和你配合我也很默契", favorChange: 5 },
                { text: "能被你认可太好了", favorChange: 3 },
                { ignore: -3 }
            ],
            high: [
                { text: "你也是我想搭档的人", favorChange: 5 },
                { text: "很欣赏你的身手", favorChange: 4 },
                { ignore: -6 }
            ],
            love: [
                { text: "想和你温柔相拥", favorChange: 3 },
                { text: "我们的未来很美好", favorChange: 2 },
                { ignore: -12 }
            ]
        },
        confess: "我习惯用抱摔制服对手，但最想拥抱的是你。你愿意让我用一生的时间，温柔地拥抱你吗？",
        intimateEvents: [
            "吕泊远在训练室用最温柔的动作展示柔道的魅力，在汗水中告白",
            "他带你去武道馆，在传统氛围中表达现代的爱意",
            "在格斗训练中，吕泊远为你展示了专属的浪漫招式"
        ]
    },

    duming: {
        name: "杜明",
        team: "lunhui",
        gender: "male",
        bgColor: "bg-yellow-400",
        borderColor: "border-yellow-500",
        textColor: "text-gray-800",
        introTargets: [],
        dialogs: {
            low: ["要一起练习剑客操作吗？", "你的剑法很犀利", "轮回的剑客体系，觉得如何？"],
            mid: ["今天的剑术训练要一起吗？", "和你比剑很有乐趣", "开始觉得，你是很好的剑友"],
            high: ["有你在，剑术进步很快", "你是我最想切磋的剑客", "看到你舞剑，让我很心动"],
            love: ["今天不想比剑，想比心", "你持剑的英姿，让我倾心", "想和你一起舞出人生"]
        },
        choices: {
            low: [
                { text: "好啊，请多指教！", favorChange: 4 },
                { text: "轮回的剑客很厉害", favorChange: 3 },
                { ignore: -2 }
            ],
            mid: [
                { text: "和你比剑我也很开心", favorChange: 5 },
                { text: "你也是我尊敬的剑友", favorChange: 3 },
                { ignore: -3 }
            ],
            high: [
                { text: "你也是我想切磋的人", favorChange: 5 },
                { text: "你的剑姿也很美", favorChange: 4 },
                { ignore: -6 }
            ],
            love: [
                { text: "我的心早已属于你", favorChange: 3 },
                { text: "想和你共舞人生", favorChange: 2 },
                { ignore: -12 }
            ]
        },
        confess: "我追求剑道的极致，但最想守护的是你的笑容。你愿意让我的剑，只为保护你而舞吗？",
        intimateEvents: [
            "杜明在训练室用剑光画出爱心轨迹，在剑影中浪漫告白",
            "他带你去剑道馆，在竹剑的交击声中说出爱意",
            "在剑术表演中，杜明为你献上了专属的剑舞"
        ]
    },

    fangminghua: {
        name: "方明华",
        team: "lunhui",
        gender: "male",
        bgColor: "bg-yellow-800",
        borderColor: "border-yellow-900",
        textColor: "text-white",
        introTargets: [],
        dialogs: {
            low: ["需要治疗建议吗？", "你的治疗意识很不错", "轮回的治疗体系，适应吗？"],
            mid: ["今天的治疗计划需要讨论吗？", "和你讨论治疗很有收获", "开始觉得，你是很专业的治疗"],
            high: ["有你在，治疗质量提高很多", "你是我最放心的治疗搭档", "看到你专注治疗，让我很安心"],
            love: ["今天不想谈治疗，想谈情", "你治疗时的温柔，让我心动", "想和你一起治愈彼此"]
        },
        choices: {
            low: [
                { text: "请多指教！", favorChange: 4 },
                { text: "正在适应治疗体系", favorChange: 3 },
                { ignore: -2 }
            ],
            mid: [
                { text: "和你讨论我也很有收获", favorChange: 5 },
                { text: "能被你认可太好了", favorChange: 3 },
                { ignore: -3 }
            ],
            high: [
                { text: "你也是我放心的搭档", favorChange: 5 },
                { text: "有你在我也很安心", favorChange: 4 },
                { ignore: -6 }
            ],
            love: [
                { text: "想和你谈情说爱", favorChange: 3 },
                { text: "你治愈了我的心", favorChange: 2 },
                { ignore: -12 }
            ]
        },
        confess: "我习惯用治疗术拯救生命，但最想拯救的是你的心。你愿意让我用一生的时间，治愈你的所有伤痛吗？",
        intimateEvents: [
            "方明华在医疗室用专业的知识为你讲解爱情的心跳原理",
            "方明华他带你去医院的天台，在星空下承诺永远守护你",
            "在治疗训练中，方明华为你展示了最温柔的治疗方式"
        ]
    },

    wuqi: {
        name: "吴启",
        team: "lunhui",
        gender: "male",
        bgColor: "bg-yellow-700",
        borderColor: "border-yellow-800",
        textColor: "text-white",
        introTargets: [],
        dialogs: {
            low: ["要一起练习刺客操作吗？", "你的潜行很隐蔽", "轮回的暗杀体系，觉得如何？"],
            mid: ["今天的潜行训练要一起吗？", "和你配合暗杀很默契", "开始觉得，你是很可靠的伙伴"],
            high: ["有你在，暗杀成功率很高", "你是我最想搭档的刺客", "看到你悄无声息，让我很佩服"],
            love: ["今天不想潜行，想光明正大爱你", "你隐秘的身影，让我很想找到", "想和你一起走出阴影"]
        },
        choices: {
            low: [
                { text: "好啊，一起练习！", favorChange: 4 },
                { text: "轮回的暗杀很厉害", favorChange: 3 },
                { ignore: -2 }
            ],
            mid: [
                { text: "和你配合我也很默契", favorChange: 5 },
                { text: "你也是我信任的伙伴", favorChange: 3 },
                { ignore: -3 }
            ],
            high: [
                { text: "你也是我想搭档的人", favorChange: 5 },
                { text: "很佩服你的技巧", favorChange: 4 },
                { ignore: -6 }
            ],
            love: [
                { text: "我想光明正大爱你", favorChange: 3 },
                { text: "和你一起走向光明", favorChange: 2 },
                { ignore: -12 }
            ]
        },
        confess: "我习惯在阴影中行动，但为了你，我愿意走到阳光下。你愿意接受这个为你改变的我吗？",
        intimateEvents: [
            "吴启在训练室从阴影中现身，带着玫瑰向你告白",
            "他带你去日出观赏点，在晨光中走出阴影表达爱意",
            "在潜行训练中，吴启为你创造了最浪漫的现身时刻"
        ]
    },

    // 霸图战队 - 黑色系
    hanwenqing: {
        name: "韩文清",
        team: "batu",
        gender: "male",
        bgColor: "bg-black",
        borderColor: "border-gray-800",
        textColor: "text-red-500",
        introTargets: [
            { target: "zhangxinjie", team: "batu", favorRequire: 35 },
            { target: "zhangjiale", team: "batu", favorRequire: 31 },
            { target: "linjingyan", team: "batu", favorRequire: 31 },            
            { target: "songqiying", team: "batu", favorRequire: 25 },
            { target: "baiyanfei", team: "batu", favorRequire: 31 },
            { target: "qinyunmu", team: "batu", favorRequire: 31 }
        ],
        dialogs: {
            low: ["要训练吗？", "你的气势不错", "霸图的风格，适应吗？"],
            mid: ["今天的训练强度需要调整吗？", "你的毅力我认可", "开始觉得，你很有潜力"],
            high: ["有你在，战队更有气势", "你是我看好的选手", "看到你坚持，让我很欣赏"],
            love: ["今天不谈训练", "你努力的样子，让我在意", "想和你一起坚守"]
        },
        choices: {
            low: [
                { text: "是，韩队！", favorChange: 4 },
                { text: "正在适应霸图风格", favorChange: 3 },
                { ignore: -2 }
            ],
            mid: [
                { text: "谢谢韩队认可", favorChange: 5 },
                { text: "我会继续努力", favorChange: 3 },
                { ignore: -3 }
            ],
            high: [
                { text: "韩队也是我尊敬的人", favorChange: 5 },
                { text: "想向韩队学习", favorChange: 4 },
                { ignore: -6 }
            ],
            love: [
                { text: "想和韩队在一起", favorChange: 3 },
                { text: "愿意一直坚守", favorChange: 2 },
                { ignore: -12 }
            ]
        },
        confess: "我这个人不懂浪漫，只会用行动证明。你愿意相信这个笨拙但真心的我吗？",
        intimateEvents: [
            "韩文清将和你的恋情通报给了俱乐部备案，还给你办了专门的出入卡。现在连霸图门口保安都认识你是’韩队家属‘了。",
            "和韩文清度过了亲密一夜，只觉得一夜顶三夜……早上称称体重好像都瘦了3斤。",
            "只要一个吻，什么晨练、跑操、早八……韩文清通通给你免了。"
        ]
    },

    zhangxinjie: {
        name: "张新杰",
        team: "batu",
        gender: "male",
        bgColor: "bg-gray-800",
        borderColor: "border-gray-900",
        textColor: "text-red-500",
        introTargets: [
            { target: "hanwenqing", team: "batu", favorRequire: 35 },
            { target: "zhangjiale", team: "batu", favorRequire: 31 },
            { target: "baiyanfei", team: "batu", favorRequire: 31 },
            { target: "yangcong", team: "sanyiling", favorRequire: 31 },
            { target: "linjingyan", team: "batu", favorRequire: 31 },
            { target: "qinyunmu", team: "batu", favorRequire: 31 },
            { target: "yuwenzhou", team: "lanyu", favorRequire: 31 },
            { target: "huangshaotian", team: "lanyu", favorRequire: 31 },
            { target: "chuyunxiu", team: "yuyan", favorRequire: 31 },
            { target: "sumucheng", team: "happy", favorRequire: 31 },            
            { target: "songqiying", team: "batu", favorRequire: 25 },
            { target: "xiaoshiqin", team: "leiting", favorRequire: 31 },
            { target: "lixuan", team: "xukong", favorRequire: 31 }
        ],
        dialogs: {
            low: ["需要战术分析吗？", "你的时间管理很精准", "霸图的战术体系，理解了吗？"],
            mid: ["今天的训练计划需要优化吗？", "和你讨论战术很有逻辑", "开始觉得，你是很理性的队友"],
            high: ["有你在，战术执行更精确", "你是我最放心的战术执行者", "看到你严谨的样子，让我很欣赏"],
            love: ["今天不想计算时间，想计算永恒", "你认真的侧脸，让我心跳紊乱", "想和你一起规划未来"]
        },
        choices: {
            low: [
                { text: "请副队指导！", favorChange: 4 },
                { text: "正在理解战术体系", favorChange: 3 },
                { ignore: -2 }
            ],
            mid: [
                { text: "和你讨论我也很有收获", favorChange: 5 },
                { text: "能被副队认可太好了", favorChange: 3 },
                { ignore: -3 }
            ],
            high: [
                { text: "副队也是我信任的人", favorChange: 5 },
                { text: "很欣赏副队的严谨", favorChange: 4 },
                { ignore: -6 }
            ],
            love: [
                { text: "我们的永恒是无限", favorChange: 3 },
                { text: "想和你规划人生", favorChange: 2 },
                { ignore: -12 }
            ]
        },
        confess: "我习惯用数据和逻辑分析一切，但爱情是无法计算的变量。你愿意和我一起，用一生来验证这个最美的意外吗？",
        intimateEvents: [
            "张新杰在战术室用最严谨的数据证明了你们的心跳同步率",
            "他带你去天文台，用星体运行规律比喻你们的缘分",
            "在时间管理训练中，张新杰为你打破了多年的作息规律"
        ]
    },

    // 霸图战队 - 黑色系 (续)
    zhangjiale: {
        name: "张佳乐",
        team: "batu",
        gender: "male",
        bgColor: "bg-gray-600",
        borderColor: "border-red-700",
        textColor: "text-red-500",
        introTargets: [
            { target: "hanwenqing", team: "batu", favorRequire: 25 },
            { target: "linjingyan", team: "batu", favorRequire: 25 },
            { target: "zouyuan", team: "baihua", favorRequire: 25 },
            { target: "sunzeping", team: "yizhan", favorRequire: 25 },
            { target: "sumucheng", team: "happy", favorRequire: 25 },
            { target: "chuyunxiu", team: "yuyan", favorRequire: 25 },
            { target: "tanghao", team: "huxiao", favorRequire: 25 },
            { target: "yufeng", team: "baihua", favorRequire: 25 },
            { target: "zhuxiaoping", team: "baihua", favorRequire: 25 },
            { target: "baiyanfei", team: "batu", favorRequire: 25 },
            { target: "qinyunmu", team: "batu", favorRequire: 25 },
            { target: "weichen", team: "happy", favorRequire: 25 }
        ],
        dialogs: {
            low: ["要看看我的百花式打法吗？", "你的操作很有灵性", "霸图的氛围，还习惯吗？"],
            mid: ["今天的训练要一起吗？", "和你配合感觉很特别", "开始觉得，你是很特别的队友"],
            high: ["有你在，百花式更绚烂了", "你是我想要珍惜的人", "看到你，让我想起了最初的梦想"],
            love: ["今天不想训练，想和你聊聊过去", "你的存在，让我重新相信缘分", "想和你一起创造新的回忆"]
        },
        choices: {
            low: [
                { text: "想看百花式打法！", favorChange: 4 },
                { text: "霸图氛围很热血", favorChange: 3 },
                { ignore: -2 }
            ],
            mid: [
                { text: "和你配合我也很开心", favorChange: 5 },
                { text: "你也是很特别的人", favorChange: 3 },
                { ignore: -3 }
            ],
            high: [
                { text: "你也是我想珍惜的人", favorChange: 5 },
                { text: "想和你实现梦想", favorChange: 4 },
                { ignore: -6 }
            ],
            love: [
                { text: "想听你的故事", favorChange: 3 },
                { text: "我们一起创造未来", favorChange: 2 },
                { ignore: -12 }
            ]
        },
        confess: "我经历过失败，也想过放弃。但遇见你之后，我重新找到了坚持的理由。你愿意和这个曾经迷茫的我一起走向未来吗？",
        intimateEvents: [
            "张佳乐在训练室用弹药专家的技能创造了最绚烂的百花盛景",
            "他带你去百花战队旧址，在回忆与新生中告白",
            "在霸图的庆功宴上，张佳乐用最灿烂的笑容向你表达爱意"
        ]
    },

    linjingyan: {
        name: "林敬言",
        team: "batu",
        gender: "male",
        bgColor: "bg-gray-700",
        borderColor: "border-gray-800",
        textColor: "text-red-500",
        introTargets: [
            { target: "hanwenqing", team: "batu", favorRequire: 25 },
            { target: "zhangjiale", team: "batu", favorRequire: 25 },
            { target: "fangrui", team: "happy", favorRequire: 25 },
            { target: "tanghao", team: "huxiao", favorRequire: 25 },
            { target: "baiyanfei", team: "batu", favorRequire: 25 },
            { target: "qinyunmu", team: "batu", favorRequire: 25 },
            { target: "songqiying", team: "batu", favorRequire: 25 }
        ],
        dialogs: {
            low: ["要一起练习流氓操作吗？", "你的操作很沉稳", "霸图的转型，适应了吗？"],
            mid: ["今天的训练计划需要调整吗？", "和你讨论战术很有见地", "开始觉得，你是很可靠的队友"],
            high: ["有你在，战术执行更顺畅", "你是我最放心的搭档", "看到你成长，让我很欣慰"],
            love: ["今天不想谈战术，想谈谈心", "你成熟的样子，让我很心动", "想和你一起慢慢变老"]
        },
        choices: {
            low: [
                { text: "好啊，请多指教！", favorChange: 4 },
                { text: "正在适应新的环境", favorChange: 3 },
                { ignore: -2 }
            ],
            mid: [
                { text: "和你讨论我也很有收获", favorChange: 5 },
                { text: "能被你认可太好了", favorChange: 3 },
                { ignore: -3 }
            ],
            high: [
                { text: "你也是我放心的搭档", favorChange: 5 },
                { text: "想向你学习经验", favorChange: 4 },
                { ignore: -6 }
            ],
            love: [
                { text: "想和你分享心事", favorChange: 3 },
                { text: "愿意陪你到老", favorChange: 2 },
                { ignore: -12 }
            ]
        },
        confess: "我经历过巅峰，也走过低谷。但在你面前，我找到了真正的平静。你愿意和这个经历过风雨的我共度余生吗？",
        intimateEvents: [
            "林敬言在训练室用最温柔的方式展示流氓职业的魅力",
            "他带你去茶馆，在氤氲茶香中诉说往事和爱意",
            "在霸图的休息室，林敬言用成熟稳重的态度许下承诺"
        ]
    },

    baiyanfei: {
        name: "白言飞",
        team: "batu",
        gender: "male",
        bgColor: "bg-gray-600",
        borderColor: "border-gray-700",
        textColor: "text-red-500",
        introTargets: [
            { target: "hanwenqing", team: "batu", favorRequire: 25 },
            { target: "zhangxinjie", team: "batu", favorRequire: 25 },
            { target: "zhangjiale", team: "batu", favorRequire: 25 },            
            { target: "songqiying", team: "batu", favorRequire: 25 },
            { target: "linjingyan", team: "batu", favorRequire: 25 },
            { target: "qinyunmu", team: "batu", favorRequire: 25 }
        ],
        dialogs: {
            low: ["要一起练习元素法师操作吗？", "你的法术控制很精准", "霸图的法术体系，觉得如何？"],
            mid: ["今天的法术训练要一起吗？", "和你配合施法很默契", "开始觉得，你是很优秀的法师"],
            high: ["有你在，法术威力提升很多", "你是我最想搭档的法师", "看到你吟唱法术，让我很欣赏"],
            love: ["今天不想施法，想施展魅力", "你专注吟唱的样子，让我着迷", "想和你一起编织魔法人生"]
        },
        choices: {
            low: [
                { text: "好啊，一起练习！", favorChange: 4 },
                { text: "霸图的法术很强", favorChange: 3 },
                { ignore: -2 }
            ],
            mid: [
                { text: "和你配合我也很默契", favorChange: 5 },
                { text: "能被你认可太好了", favorChange: 3 },
                { ignore: -3 }
            ],
            high: [
                { text: "你也是我想搭档的人", favorChange: 5 },
                { text: "很欣赏你的法术", favorChange: 4 },
                { ignore: -6 }
            ],
            love: [
                { text: "你已对我施展魅力", favorChange: 3 },
                { text: "想和你创造魔法", favorChange: 2 },
                { ignore: -12 }
            ]
        },
        confess: "我习惯用元素魔法改变战局，但最想改变的是我们的关系。你愿意让我的魔法，只为守护你而存在吗？",
        intimateEvents: [
            "白言飞在训练室用元素魔法创造了浪漫的星空效果",
            "他带你去天文馆，在星空的见证下告白",
            "在法术训练中，白言飞为你展示了最美丽的魔法表演"
        ]
    },
    songqiying: {
        name: "宋奇英",
        team: "batu",
        gender: "male",
        bgColor: "bg-gray-500",
        borderColor: "bg-gray-500",
        textColor: "text-red-500",
        introTargets: [
            { target: "hanwenqing", team: "batu", favorRequire: 30 },
            { target: "zhangxinjie", team: "batu", favorRequire: 25 },
            { target: "linjingyan", team: "batu", favorRequire: 20 },
            { target: "qinyunmu", team: "batu", favorRequire: 15 },
            { target: "baiyanfei", team: "batu", favorRequire: 15 }
        ],
        dialogs: {
            low: ["霸图的训练要从基础做起。", "韩队说过，拳法家最重要的是基本功。", "我会认真完成每一项训练。"],
            mid: ["和你一起训练效率很高。", "有时候会觉得压力很大，但这就是责任。", "你的进步速度让我很敬佩。"],
            high: ["在你面前，我可以稍微放松一些严谨。", "你让我明白，领袖也需要有人分担压力。", "和你在一起时，我不只是‘霸图的宋奇英’。"],
            love: ["我练习了无数次出拳，却不知道怎么靠近你的心。", "责任让我必须坚强，但你可以让我暂时依靠吗？", "你是我的训练计划里，唯一的不确定却美好的变量。"]
        },
        choices: {
            low: [
                { text: "一起练习基本功吧", favorChange: 4 },
                { text: "韩队对你很严格吧", favorChange: 3 },
                { ignore: -3 }
            ],
            mid: [
                { text: "你已经做得很好了", favorChange: 5 },
                { text: "压力大的时候可以找我", favorChange: 4 },
                { ignore: -5 }
            ],
            high: [
                { text: "在我面前做你自己就好", favorChange: 5 },
                { text: "你不仅是接班人，也是宋奇英", favorChange: 5 },
                { ignore: -8 }
            ],
            love: [
                { text: "我早就想拥抱你了", favorChange: 3 },
                { text: "你的不确定是我最确定的选择", favorChange: 3 },
                { ignore: -15 }
            ]
        },
        confess: "我规划了无数条成为合格接班人的道路，每一条都严谨而清晰。但遇见你之后，我的所有计划里都多了一个不可控的变数——我的心。你愿意成为我未来里唯一的意外吗？",
        intimateEvents: [
            "宋奇英在训练后为你细心按摩因训练酸痛的手臂",
            "他破例在非训练时间陪你散步放松，分享童年梦想",
            "在你面前第一次卸下‘接班人’的包袱，像普通少年一样微笑"
        ]
    },

    qinyunmu: {
        name: "秦牧云",
        team: "batu",
        gender: "male",
        bgColor: "bg-gray-500",
        borderColor: "border-gray-600",
        textColor: "text-red-500",
        introTargets: [
            { target: "hanwenqing", team: "batu", favorRequire: 25 },
            { target: "zhangxinjie", team: "batu", favorRequire: 25 },
            { target: "zhangjiale", team: "batu", favorRequire: 25 },
            { target: "linjingyan", team: "batu", favorRequire: 25 },            
            { target: "songqiying", team: "batu", favorRequire: 25 },
            { target: "baiyanfei", team: "batu", favorRequire: 25 }
        ],
        dialogs: {
            low: ["要一起练习神枪手操作吗？", "你的射击很稳定", "霸图的远程支援，适应吗？"],
            mid: ["今天的射击训练要一起吗？", "和你配合射击很精准", "开始觉得，你是很可靠的射手"],
            high: ["有你在，远程火力很强大", "你是我最想掩护的队友", "看到你精准射击，让我很安心"],
            love: ["今天不想射击，想射中你的心", "你瞄准的专注，让我心跳加速", "想和你一起命中幸福的靶心"]
        },
        choices: {
            low: [
                { text: "好啊，一起练习！", favorChange: 4 },
                { text: "正在适应远程支援", favorChange: 3 },
                { ignore: -2 }
            ],
            mid: [
                { text: "和你配合我也很精准", favorChange: 5 },
                { text: "能被你认可太好了", favorChange: 3 },
                { ignore: -3 }
            ],
            high: [
                { text: "你也是我想掩护的人", favorChange: 5 },
                { text: "有你在我也很安心", favorChange: 4 },
                { ignore: -6 }
            ],
            love: [
                { text: "我的心已被你射中", favorChange: 3 },
                { text: "想和你命中未来", favorChange: 2 },
                { ignore: -12 }
            ]
        },
        confess: "我追求射击的精准，但最想命中的是你的心。你愿意让我的子弹，只为保护你而发射吗？",
        intimateEvents: [
            "秦牧云在射击场用子弹在靶心上打出爱心图案",
            "他带你去观靶台，在精准的射击中表达爱意",
            "在远程训练中，秦牧云为你创造了最浪漫的射击时刻"
        ]
    },

    // 烟雨战队 - 蓝绿色系
    chuyunxiu: {
        name: "楚云秀",
        team: "yuyan",
        gender: "female",
        bgColor: "bg-teal-500",
        borderColor: "border-teal-600",
        textColor: "text-white",
        introTargets: [
            { target: "lihua", team: "yuyan", favorRequire: 35 },
            { target: "shukexin", team: "yuyan", favorRequire: 31 },
            { target: "shukeyi", team: "yuyan", favorRequire: 31 },
            { target: "sumucheng", team: "happy", favorRequire: 31 },
            { target: "daiyanqi", team: "leiting", favorRequire: 31 },
            { target: "liufei", team: "weicao", favorRequire: 31 },
            { target: "zhongyeli", team: "yizhan", favorRequire: 31 },
            { target: "yuwenzhou", team: "lanyu", favorRequire: 31 },
            { target: "huangshaotian", team: "lanyu", favorRequire: 31 },
            { target: "zhangjiale", team: "batu", favorRequire: 31 },
            { target: "zhangxinjie", team: "batu", favorRequire: 31 },
            { target: "lixuan", team: "xukong", favorRequire: 31 },
            { target: "xiaoshiqin", team: "leiting", favorRequire: 31 },
            { target: "tiansen", team: "huangfeng", favorRequire: 31 }
        ],
        dialogs: {
            low: ["要一起看电视剧吗？我最近发现一部不错的", "你的元素法师操作很优雅", "烟雨的雨天氛围，喜欢吗？"],
            mid: ["今天的训练结束后有空吗？", "和你讨论剧情很有共鸣", "开始觉得，你是很懂我的人"],
            high: ["有你在，训练都变得有趣了", "你是我想要分享一切的人", "看到你，心情就会变好"],
            love: ["今天不想训练，想和你去逛街", "你微笑的样子，让我很心动", "想和你一起看遍世间风景"]
        },
        choices: {
            low: [
                { text: "好啊，一起看剧！", favorChange: 4 },
                { text: "烟雨的雨天很浪漫", favorChange: 3 },
                { ignore: -2 }
            ],
            mid: [
                { text: "和你讨论我也很开心", favorChange: 5 },
                { text: "你也是很特别的人", favorChange: 3 },
                { ignore: -3 }
            ],
            high: [
                { text: "你也是我想分享的人", favorChange: 5 },
                { text: "看到你我也很开心", favorChange: 4 },
                { ignore: -6 }
            ],
            love: [
                { text: "想和你一起去玩", favorChange: 3 },
                { text: "想陪你看风景", favorChange: 2 },
                { ignore: -12 }
            ]
        },
        confess: "我习惯用理性的方式看待世界，但在你面前，我愿意感性一次。你愿意和这个偶尔任性的我共度余生吗？",
        intimateEvents: [
            "楚云秀在雨天为你撑伞，在淅沥雨声中轻声告白",
            "她带你去最喜欢的咖啡厅，在醇香中分享心事",
            "在烟雨的露台，楚云秀在雨中为你表演了最浪漫的元素魔法"
        ]
    },

    lihua: {
        name: "李华",
        team: "yuyan",
        gender: "male",
        bgColor: "bg-teal-400",
        borderColor: "border-teal-500",
        textColor: "text-white",
        introTargets: [
            { target: "chuyunxiu", team: "yuyan", favorRequire: 25 },
            { target: "shukexin", team: "yuyan", favorRequire: 25 },
            { target: "shukeyi", team: "yuyan", favorRequire: 25 },
            { target: "xiaoshiqin", team: "leiting", favorRequire: 25 },
            { target: "tanghao", team: "huxiao", favorRequire: 25 },
            { target: "liuxiaobie", team: "weicao", favorRequire: 25 }
        ],
        dialogs: {
            low: ["要一起练习忍者操作吗？", "你的身法很灵活", "烟雨的忍者体系，适应吗？"],
            mid: ["今天的潜行训练要一起吗？", "和你配合忍术很默契", "开始觉得，你是很可靠的搭档"],
            high: ["有你在，忍术威力提升很多", "你是我最想搭档的忍者", "看到你灵活的身影，让我很欣赏"],
            love: ["今天不想潜行，想光明正大爱你", "你战斗的英姿，让我心跳加速", "想和你一起守护烟雨"]
        },
        choices: {
            low: [
                { text: "好啊，请多指教！", favorChange: 4 },
                { text: "正在适应忍者体系", favorChange: 3 },
                { ignore: -2 }
            ],
            mid: [
                { text: "和你配合我也很默契", favorChange: 5 },
                { text: "能被你认可太好了", favorChange: 3 },
                { ignore: -3 }
            ],
            high: [
                { text: "你也是我想搭档的人", favorChange: 5 },
                { text: "很欣赏你的身法", favorChange: 4 },
                { ignore: -6 }
            ],
            love: [
                { text: "想和你光明正大相爱", favorChange: 3 },
                { text: "愿意一起守护", favorChange: 2 },
                { ignore: -12 }
            ]
        },
        confess: "我习惯在暗处行动，但为了你，我愿意走到阳光下。你愿意接受这个为你改变的我吗？",
        intimateEvents: [
            "李华从樱花树后现身，带着真挚的心意向你告白",
            "他带你去忍者主题公园，在传统与现代的交融中表达爱意",
            "在潜行训练中，李华为你创造了最浪漫的现身时刻"
        ]
    },

    shukexin: {
        name: "舒可欣",
        team: "yuyan",
        gender: "female",
        bgColor: "bg-teal-300",
        borderColor: "border-teal-400",
        textColor: "text-gray-800",
        introTargets: [
            { target: "chuyunxiu", team: "yuyan", favorRequire: 25 },
            { target: "lihua", team: "yuyan", favorRequire: 25 },
            { target: "shukeyi", team: "yuyan", favorRequire: 25 },
            { target: "sumucheng", team: "happy", favorRequire: 25 },
            { target: "liufei", team: "weicao", favorRequire: 25 },
            { target: "liuxiaobie", team: "weicao", favorRequire: 25 },
            { target: "sunxiang", team: "lunhui", favorRequire: 25 },
            { target: "luhanwen", team: "lanyu", favorRequire: 25 }
        ],
        dialogs: {
            low: ["要一起练习神枪手操作吗？", "你的射击很精准", "烟雨的双子星，习惯吗？"],
            mid: ["今天的配合训练要一起吗？", "和你搭档感觉很特别", "开始觉得，你是很默契的伙伴"],
            high: ["有你在，配合更流畅了", "你是我最想搭档的队友", "看到你进步，让我很开心"],
            love: ["今天不想训练，想和你独处", "你专注的样子，让我很在意", "想和你一起创造传奇"]
        },
        choices: {
            low: [
                { text: "好啊，一起练习！", favorChange: 4 },
                { text: "双子星的配合很厉害", favorChange: 3 },
                { ignore: -2 }
            ],
            mid: [
                { text: "和你搭档我也很开心", favorChange: 5 },
                { text: "你也是很特别的伙伴", favorChange: 3 },
                { ignore: -3 }
            ],
            high: [
                { text: "你也是我想搭档的人", favorChange: 5 },
                { text: "看到你我也很开心", favorChange: 4 },
                { ignore: -6 }
            ],
            love: [
                { text: "想和你单独相处", favorChange: 3 },
                { text: "想和你创造历史", favorChange: 2 },
                { ignore: -12 }
            ]
        },
        confess: "作为双子星之一，我习惯了配合。但最想配合的是我们的心。你愿意让我的子弹，只为守护你而发射吗？",
        intimateEvents: [
            "舒可欣在训练室用双枪打出心形弹孔",
            "她带你去游乐园，在旋转的灯光中告白",
            "在双子星表演赛中，舒可欣为你展示了最浪漫的枪舞"
        ]
    },

    shukeyi: {
        name: "舒可怡",
        team: "yuyan",
        gender: "female",
        bgColor: "bg-teal-600",
        borderColor: "border-teal-700",
        textColor: "text-white",
        introTargets: [
            { target: "chuyunxiu", team: "yuyan", favorRequire: 25 },
            { target: "lihua", team: "yuyan", favorRequire: 25 },
            { target: "shukexin", team: "yuyan", favorRequire: 25 },
            { target: "sumucheng", team: "happy", favorRequire: 25 },
            { target: "liufei", team: "weicao", favorRequire: 25 },
            { target: "liuxiaobie", team: "weicao", favorRequire: 25 },
            { target: "sunxiang", team: "lunhui", favorRequire: 25 },
            { target: "luhanwen", team: "lanyu", favorRequire: 25 }
        ],
        dialogs: {
            low: ["要一起练习神枪手操作吗？", "你的枪法很稳定", "烟雨的双子星，适应吗？"],
            mid: ["今天的同步训练要一起吗？", "和你配合很有默契", "开始觉得，你是很重要的存在"],
            high: ["有你在，同步率更高了", "你是我最想同步的人", "看到你，心跳就会同步"],
            love: ["今天不想同步训练，想同步心跳", "你认真的表情，让我心跳加速", "想和你永远同步"]
        },
        choices: {
            low: [
                { text: "好啊，一起练习！", favorChange: 4 },
                { text: "正在适应双子星节奏", favorChange: 3 },
                { ignore: -2 }
            ],
            mid: [
                { text: "和你配合我也很默契", favorChange: 5 },
                { text: "你也是重要的存在", favorChange: 3 },
                { ignore: -3 }
            ],
            high: [
                { text: "你也是我想同步的人", favorChange: 5 },
                { text: "心跳为你加速", favorChange: 4 },
                { ignore: -6 }
            ],
            love: [
                { text: "我们的心跳已同步", favorChange: 3 },
                { text: "想永远在一起", favorChange: 2 },
                { ignore: -12 }
            ]
        },
        confess: "我习惯了与妹妹同步，但最想同步的是我们的未来。你愿意让我的心跳，永远与你同步吗？",
        intimateEvents: [
            "舒可怡在训练室用完美的同步射击展示爱意",
            "她带你去音乐厅，在和谐的旋律中告白",
            "在双子星表演中，舒可怡为你创造了最同步的浪漫时刻"
        ]
    },

    // 雷霆战队 - 深蓝色系
    xiaoshiqin: {
        name: "肖时钦",
        team: "leiting",
        gender: "male",
        bgColor: "bg-blue-600",
        borderColor: "border-blue-700",
        textColor: "text-white",
        introTargets: [
            { target: "daiyanqi", team: "leiting", favorRequire: 35 },
            { target: "fangxuecai", team: "leiting", favorRequire: 31 },
            { target: "chengtai", team: "leiting", favorRequire: 31 },
            { target: "sumucheng", team: "happy", favorRequire: 31 },
            { target: "chuyunxiu", team: "yuyan", favorRequire: 31 },
            { target: "lihua", team: "yuyan", favorRequire: 31 },
            { target: "liuhao", team: "huxiao", favorRequire: 31 },
            { target: "zhangxinjie", team: "batu", favorRequire: 31 },
            { target: "yuwenzhou", team: "lanyu", favorRequire: 31 },
            { target: "huangshaotian", team: "lanyu", favorRequire: 31 },
            { target: "lixuan", team: "xukong", favorRequire: 31 },
            { target: "tiansen", team: "huangfeng", favorRequire: 31 }
        ],
        dialogs: {
            low: ["需要机械师的建议吗？", "你的机械操作很精准", "雷霆的机械体系，理解了吗？"],
            mid: ["今天的机械组装要一起吗？", "和你讨论机械很有灵感", "开始觉得，你是很聪明的搭档"],
            high: ["有你在，机械威力提升很多", "你是我最想合作的机械师", "看到你专注组装，让我很欣赏"],
            love: ["今天不想研究机械，想研究你的心", "你认真的样子，让我很想了解", "想和你一起组装未来"]
        },
        choices: {
            low: [
                { text: "请肖队指导！", favorChange: 4 },
                { text: "正在理解机械体系", favorChange: 3 },
                { ignore: -2 }
            ],
            mid: [
                { text: "和你讨论我也很有灵感", favorChange: 5 },
                { text: "能被肖队认可太好了", favorChange: 3 },
                { ignore: -3 }
            ],
            high: [
                { text: "肖队也是我想合作的人", favorChange: 5 },
                { text: "很欣赏肖队的智慧", favorChange: 4 },
                { ignore: -6 }
            ],
            love: [
                { text: "我的心向你敞开", favorChange: 3 },
                { text: "想和你创造未来", favorChange: 2 },
                { ignore: -12 }
            ]
        },
        confess: "我习惯用机械和逻辑解决问题，但爱情是最精密的机械也无法计算的。你愿意和我一起，用一生来调试这个美丽的程序吗？",
        intimateEvents: [
            "肖时钦很高，胳膊也很有力气，被他抱起时仿佛都能呼吸到上层的新鲜空气。",
            "和肖时钦度过亲密一夜，他听从你的指挥做了很多奇怪的事。",
            "总被你叫做’老肖‘让他颇为无奈，可是想了半天反击的话，他最终选择叫你’老婆‘。"
        ]
    },

    // 雷霆战队 - 深蓝色系 (续)
    daiyanqi: {
        name: "戴妍琦",
        team: "leiting",
        gender: "female",
        bgColor: "bg-blue-500",
        borderColor: "border-blue-600",
        textColor: "text-white",
        introTargets: [
            { target: "xiaoshiqin", team: "leiting", favorRequire: 25 },
            { target: "fangxuecai", team: "leiting", favorRequire: 25 },
            { target: "chuyunxiu", team: "yuyan", favorRequire: 25 },
            { target: "sumucheng", team: "happy", favorRequire: 25 },
            { target: "liufei", team: "weicao", favorRequire: 25 },
            { target: "shukexin", team: "yuyan", favorRequire: 25 },
            { target: "shukeyi", team: "yuyan", favorRequire: 25 },
            { target: "huangshaotian", team: "lanyu", favorRequire: 25 },
            { target: "luhanwen", team: "lanyu", favorRequire: 25 }
        ],
        dialogs: {
            low: ["要一起练习元素法师操作吗？", "你的法术很华丽呢", "雷霆的机械与法术结合，觉得有趣吗？"],
            mid: ["今天的法术训练要一起吗？", "和你讨论法术很有创意", "开始觉得，你是很有灵感的搭档"],
            high: ["有你在，法术都变得更美了", "你是我最想一起研究法术的人", "看到你施法的样子，让我很心动"],
            love: ["今天不想训练，想和你去逛街", "你专注研究的样子，让我心跳加速", "想和你一起创造魔法般的爱情"]
        },
        choices: {
            low: [
                { text: "好啊，一起练习！", favorChange: 4 },
                { text: "雷霆的体系很独特", favorChange: 3 },
                { ignore: -2 }
            ],
            mid: [
                { text: "和你讨论我也很有灵感", favorChange: 5 },
                { text: "你也是很有创意的人", favorChange: 3 },
                { ignore: -3 }
            ],
            high: [
                { text: "你也是我想研究的人", favorChange: 5 },
                { text: "你的法术也很美", favorChange: 4 },
                { ignore: -6 }
            ],
            love: [
                { text: "想和你一起去玩", favorChange: 3 },
                { text: "我们的爱情就是魔法", favorChange: 2 },
                { ignore: -12 }
            ]
        },
        confess: "我热爱魔法的绚丽，但最绚丽的魔法是让两颗心相遇。你愿意让我的魔法，只为点缀我们的爱情而存在吗？",
        intimateEvents: [
            "戴妍琦在训练室用元素魔法创造了梦幻的星空场景",
            "她带你去游乐园，在旋转木马的灯光中告白",
            "在法术表演中，戴妍琦为你展示了最浪漫的魔法秀"
        ]
    },

    fangxuecai: {
        name: "方学才",
        team: "leiting",
        gender: "male",
        bgColor: "bg-blue-700",
        borderColor: "border-blue-800",
        textColor: "text-white",
        introTargets: [
            { target: "xiaoshiqin", team: "leiting", favorRequire: 25 },
            { target: "daiyanqi", team: "leiting", favorRequire: 25 },
            { target: "chengtai", team: "leiting", favorRequire: 25 }
        ],
        dialogs: {
            low: ["要一起练习刺客操作吗？", "你的潜行很隐蔽", "雷霆的刺客体系，适应吗？"],
            mid: ["今天的潜行训练要一起吗？", "和你配合暗杀很默契", "开始觉得，你是很可靠的伙伴"],
            high: ["有你在，暗杀成功率很高", "你是我最想搭档的刺客", "看到你悄无声息，让我很佩服"],
            love: ["今天不想潜行，想光明正大爱你", "你隐秘的身影，让我很想找到", "想和你一起走出阴影"]
        },
        choices: {
            low: [
                { text: "好啊，一起练习！", favorChange: 4 },
                { text: "正在适应刺客体系", favorChange: 3 },
                { ignore: -2 }
            ],
            mid: [
                { text: "和你配合我也很默契", favorChange: 5 },
                { text: "你也是我信任的伙伴", favorChange: 3 },
                { ignore: -3 }
            ],
            high: [
                { text: "你也是我想搭档的人", favorChange: 5 },
                { text: "很佩服你的技巧", favorChange: 4 },
                { ignore: -6 }
            ],
            love: [
                { text: "我想光明正大爱你", favorChange: 3 },
                { text: "和你一起走向光明", favorChange: 2 },
                { ignore: -12 }
            ]
        },
        confess: "我习惯在阴影中行动，但为了你，我愿意走到阳光下。你愿意接受这个为你改变的我吗？",
        intimateEvents: [
            "方学才从训练室的阴影中现身，带着真挚的告白",
            "他带你去日出观赏点，在晨光中表达爱意",
            "在潜行训练中，方学才为你创造了最浪漫的现身时刻"
        ]
    },

    chengtai: {
        name: "程泰",
        team: "leiting",
        gender: "male",
        bgColor: "bg-blue-800",
        borderColor: "border-blue-900",
        textColor: "text-white",
        introTargets: [
            { target: "xiaoshiqin", team: "leiting", favorRequire: 25 },
            { target: "fangxuecai", team: "leiting", favorRequire: 25 }
        ],
        dialogs: {
            low: ["要一起练习骑士操作吗？", "你的防守很稳固", "雷霆的防守体系，觉得如何？"],
            mid: ["今天的防守训练要一起吗？", "和你配合防守很可靠", "开始觉得，你是很坚实的后盾"],
            high: ["有你在，防守线很牢固", "你是我最想依靠的队友", "看到你坚守阵地，让我很安心"],
            love: ["今天不想防守，想守护你的心", "你战斗的身影，让我很想保护", "想和你一起守护彼此"]
        },
        choices: {
            low: [
                { text: "好啊，一起练习！", favorChange: 4 },
                { text: "雷霆的防守很扎实", favorChange: 3 },
                { ignore: -2 }
            ],
            mid: [
                { text: "和你配合我也很安心", favorChange: 5 },
                { text: "能被你依靠很荣幸", favorChange: 3 },
                { ignore: -3 }
            ],
            high: [
                { text: "你也是我想依靠的人", favorChange: 5 },
                { text: "有你在我也很安心", favorChange: 4 },
                { ignore: -6 }
            ],
            love: [
                { text: "我的心需要你守护", favorChange: 3 },
                { text: "想互相守护一生", favorChange: 2 },
                { ignore: -12 }
            ]
        },
        confess: "我习惯用盾牌守护队友，但最想守护的是你的笑容。你愿意让我的盾，只为保护你而举起吗？",
        intimateEvents: [
            "程泰在训练室用盾牌技能创造了爱的防护结界",
            "他带你去古城墙，在历史的见证下告白",
            "在防守训练中，程泰为你展示了最坚定的守护"
        ]
    },

    // 呼啸战队 - 深绿色系
    tanghao: {
        name: "唐昊",
        team: "huxiao",
        gender: "male",
        bgColor: "bg-green-900",
        borderColor: "border-green-950",
        textColor: "text-white",
        introTargets: [
            { target: "liuhao", team: "huxiao", favorRequire: 35 },
            { target: "zhaoyuzhe", team: "huxiao", favorRequire: 31 },
            { target: "ruanyongbin", team: "huxiao", favorRequire: 31 },
            { target: "guoyang", team: "huxiao", favorRequire: 31 },
            { target: "lihua", team: "yuyan", favorRequire: 31 },
            { target: "sunxiang", team: "lunhui", favorRequire: 31 },
            { target: "linjingyan", team: "batu", favorRequire: 31 },
            { target: "yufeng", team: "baihua", favorRequire: 31 },
            { target: "zouyuan", team: "baihua", favorRequire: 31 },
            { target: "zhangjiale", team: "batu", favorRequire: 31 },
            { target: "fangrui", team: "happy", favorRequire: 31 },
            { target: "liuxiaobie", team: "weicao", favorRequire: 31 },
            { target: "zhouzekai", team: "lunhui", favorRequire: 31 }
        ],
        dialogs: {
            low: ["要切磋吗？让你见识下唐三打的实力", "你的操作很有冲击力", "呼啸的风格，能跟上吗？"],
            mid: ["今天的训练要一起吗？", "你的进步我认可了", "开始觉得，你是个不错的对手"],
            high: ["有你在，训练更有挑战性", "你是我想要超越的目标", "看到你变强，让我更想努力"],
            love: ["今天不想比试，想和你聊聊", "你战斗的勇气，让我很在意", "想和你一起站上巅峰"]
        },
        choices: {
            low: [
                { text: "好啊，请多指教！", favorChange: 4 },
                { text: "呼啸的风格很强势", favorChange: 3 },
                { ignore: -2 }
            ],
            mid: [
                { text: "能被你认可很荣幸", favorChange: 5 },
                { text: "你也是我尊敬的对手", favorChange: 3 },
                { ignore: -3 }
            ],
            high: [
                { text: "你也是我想超越的人", favorChange: 5 },
                { text: "看到你努力我也要加油", favorChange: 4 },
                { ignore: -6 }
            ],
            love: [
                { text: "想和你好好聊聊", favorChange: 3 },
                { text: "想和你一起变强", favorChange: 2 },
                { ignore: -12 }
            ]
        },
        confess: "我追求力量，想要成为最强。但在你面前，我发现最强不如最真。你愿意接受这个还在成长的我吗？",
        intimateEvents: [
            "唐昊在训练室用德里罗打出最狂暴的连招，在力量中展现温柔",
            "他带你去呼啸的山顶，在风中大声告白",
            "在个人赛中，唐昊为你献上了专属的胜利之舞"
        ]
    },

    liuhao: {
        name: "刘皓",
        team: "huxiao",
        gender: "male",
        bgColor: "bg-green-800",
        borderColor: "border-green-900",
        textColor: "text-white",
        introTargets: [
            { target: "tanghao", team: "huxiao", favorRequire: 25 },
            { target: "zhaoyuzhe", team: "huxiao", favorRequire: 25 },
            { target: "ruanyongbin", team: "huxiao", favorRequire: 25 },
            { target: "guoyang", team: "huxiao", favorRequire: 25 },
            { target: "xiaoshiqin", team: "leiting", favorRequire: 25 },
            { target: "qiufei", team: "jiashi", favorRequire: 25 },
            { target: "sunxiang", team: "lunhui", favorRequire: 25 }
        ],
        dialogs: {
            low: ["要一起练习魔剑士操作吗？", "你的剑法很犀利", "呼啸的战术，理解了吗？"],
            mid: ["今天的战术训练要一起吗？", "和你讨论战术很有见解", "开始觉得，你是很聪明的队友"],
            high: ["有你在，战术执行更顺利", "你是我最想合作的战术家", "看到你谋划的样子，让我很欣赏"],
            love: ["今天不想谈战术，想谈感情", "你思考的专注，让我很心动", "想和你一起谋划未来"]
        },
        choices: {
            low: [
                { text: "好啊，一起练习！", favorChange: 4 },
                { text: "正在理解呼啸战术", favorChange: 3 },
                { ignore: -2 }
            ],
            mid: [
                { text: "和你讨论我也很有收获", favorChange: 5 },
                { text: "能被你认可太好了", favorChange: 3 },
                { ignore: -3 }
            ],
            high: [
                { text: "你也是我想合作的人", favorChange: 5 },
                { text: "很欣赏你的智慧", favorChange: 4 },
                { ignore: -6 }
            ],
            love: [
                { text: "想和你谈情说爱", favorChange: 3 },
                { text: "我们的未来很美好", favorChange: 2 },
                { ignore: -12 }
            ]
        },
        confess: "我习惯用计谋取胜，但在感情这件事上，我只想用真心。你愿意相信这个愿意为你放下算计的我吗？",
        intimateEvents: [
            "刘皓在战术室用最真诚的态度放下了所有算计",
            "他带你去安静的茶室，在宁静中表达真心",
            "在战术分析中，刘皓为你展示了最真实的自己"
        ]
    },

    zhaoyuzhe: {
        name: "赵禹哲",
        team: "huxiao",
        gender: "male",
        bgColor: "bg-green-700",
        borderColor: "border-green-800",
        textColor: "text-white",
        introTargets: [
            { target: "tanghao", team: "huxiao", favorRequire: 25 },
            { target: "liuhao", team: "huxiao", favorRequire: 25 },
            { target: "ruanyongbin", team: "huxiao", favorRequire: 25 },
            { target: "guoyang", team: "huxiao", favorRequire: 25 },
            { target: "fangrui", team: "happy", favorRequire: 25 },
            { target: "luhanwen", team: "lanyu", favorRequire: 25 },
            { target: "gaicaijie", team: "xukong", favorRequire: 25 }
        ],
        dialogs: {
            low: ["要一起练习元素法师操作吗？", "你的法术控制很不错", "呼啸的元素体系，适应吗？"],
            mid: ["今天的法术训练要一起吗？", "和你配合施法很流畅", "开始觉得，你是很有天赋的法师"],
            high: ["有你在，法术威力提升很多", "你是我最想搭档的元素法师", "看到你吟唱法术，让我很欣赏"],
            love: ["今天不想施法，想施展魅力", "你专注的样子，让我很着迷", "想和你一起创造魔法人生"]
        },
        choices: {
            low: [
                { text: "好啊，一起练习！", favorChange: 4 },
                { text: "正在适应元素体系", favorChange: 3 },
                { ignore: -2 }
            ],
            mid: [
                { text: "和你配合我也很流畅", favorChange: 5 },
                { text: "能被你认可太好了", favorChange: 3 },
                { ignore: -3 }
            ],
            high: [
                { text: "你也是我想搭档的人", favorChange: 5 },
                { text: "很欣赏你的天赋", favorChange: 4 },
                { ignore: -6 }
            ],
            love: [
                { text: "你已对我施展魅力", favorChange: 3 },
                { text: "想和你创造奇迹", favorChange: 2 },
                { ignore: -12 }
            ]
        },
        confess: "我追求法术的极致，但最极致的魔法是让爱情永恒。你愿意让我的法术，只为守护你而存在吗？",
        intimateEvents: [
            "赵禹哲在训练室用元素魔法创造了绚丽的极光效果",
            "他带你去魔法主题公园，在奇幻氛围中告白",
            "在法术表演中，赵禹哲为你展示了最浪漫的魔法时刻"
        ]
    },

    ruanyongbin: {
        name: "阮永彬",
        team: "huxiao",
        gender: "male",
        bgColor: "bg-green-600",
        borderColor: "border-green-700",
        textColor: "text-white",
        introTargets: [
            { target: "tanghao", team: "huxiao", favorRequire: 25 },
            { target: "liuhao", team: "huxiao", favorRequire: 25 },
            { target: "zhaoyuzhe", team: "huxiao", favorRequire: 25 },
            { target: "guoyang", team: "huxiao", favorRequire: 25 },
            { target: "fangrui", team: "happy", favorRequire: 25 }
        ],
        dialogs: {
            low: ["要一起练习牧师操作吗？", "你的治疗很及时", "呼啸的治疗体系，觉得如何？"],
            mid: ["今天的治疗训练要一起吗？", "和你配合治疗很默契", "开始觉得，你是很可靠的治疗"],
            high: ["有你在，治疗压力小了很多", "你是我最放心的治疗搭档", "看到你专注治疗，让我很安心"],
            love: ["今天不想计算治疗量，想计算缘分", "你治疗时的温柔，让我很心动", "想和你一起治愈彼此"]
        },
        choices: {
            low: [
                { text: "好啊，一起练习！", favorChange: 4 },
                { text: "呼啸的治疗很专业", favorChange: 3 },
                { ignore: -2 }
            ],
            mid: [
                { text: "和你配合我也很默契", favorChange: 5 },
                { text: "能被你认可太好了", favorChange: 3 },
                { ignore: -3 }
            ],
            high: [
                { text: "你也是我放心的搭档", favorChange: 5 },
                { text: "有你在我也很安心", favorChange: 4 },
                { ignore: -6 }
            ],
            love: [
                { text: "我们的缘分是100%", favorChange: 3 },
                { text: "你治愈了我的心", favorChange: 2 },
                { ignore: -12 }
            ]
        },
        confess: "我习惯用治疗术拯救队友，但最想拯救的是你的心。你愿意让我用一生的时间，治愈你的所有伤痛吗？",
        intimateEvents: [
            "阮永彬在医疗室用治疗技能创造了爱心光效",
            "他带你去医院的花园，在花香中表达爱意",
            "在治疗训练中，阮永彬为你展示了最温柔的治疗方式"
        ]
    },

    guoyang: {
        name: "郭阳",
        team: "huxiao",
        gender: "male",
        bgColor: "bg-green-500",
        borderColor: "border-green-600",
        textColor: "text-white",
        introTargets: [
            { target: "tanghao", team: "huxiao", favorRequire: 25 },
            { target: "liuhao", team: "huxiao", favorRequire: 25 },
            { target: "zhaoyuzhe", team: "huxiao", favorRequire: 25 },
            { target: "ruanyongbin", team: "huxiao", favorRequire: 25 },
            { target: "fangrui", team: "happy", favorRequire: 25 }
        ],
        dialogs: {
            low: ["要一起练习气功师操作吗？", "你的气功运用很熟练", "呼啸的气功体系，适应吗？"],
            mid: ["今天的气功训练要一起吗？", "和你配合气功很协调", "开始觉得，你是很和谐的存在"],
            high: ["有你在，气功流动更顺畅", "你是我最想调和的人", "看到你运用气功，让我很平静"],
            love: ["今天不想练功，想练爱", "你运功的专注，让我心跳平稳", "想和你一起调和人生"]
        },
        choices: {
            low: [
                { text: "好啊，一起练习！", favorChange: 4 },
                { text: "正在适应气功体系", favorChange: 3 },
                { ignore: -2 }
            ],
            mid: [
                { text: "和你配合我也很协调", favorChange: 5 },
                { text: "你也是很和谐的人", favorChange: 3 },
                { ignore: -3 }
            ],
            high: [
                { text: "你也是我想调和的人", favorChange: 5 },
                { text: "和你在一起很平静", favorChange: 4 },
                { ignore: -6 }
            ],
            love: [
                { text: "想和你练习爱情", favorChange: 3 },
                { text: "我们的人生很和谐", favorChange: 2 },
                { ignore: -12 }
            ]
        },
        confess: "我追求气功的和谐，但最和谐的是两颗心的共鸣。你愿意让我的气功，只为守护你的平静而存在吗？",
        intimateEvents: [
            "郭阳在训练室用气功创造了爱的能量场",
            "他带你去太极园，在阴阳调和中告白",
            "在气功训练中，郭阳为你展示了最和谐的能量流动"
        ]
    },

    // 百花战队 - 粉色系
    yufeng: {
        name: "于锋",
        team: "baihua",
        gender: "male",
        bgColor: "bg-pink-500",
        borderColor: "border-pink-600",
        textColor: "text-white",
        introTargets: [
            { target: "zouyuan", team: "baihua", favorRequire: 35 },
            { target: "zhuxiaoping", team: "baihua", favorRequire: 31 },
            { target: "zhouguangyi", team: "baihua", favorRequire: 31 },
            { target: "zhangwei", team: "baihua", favorRequire: 31 },
            { target: "mozhuchen", team: "baihua", favorRequire: 31 },
            { target: "tanghao", team: "huxiao", favorRequire: 31 },
            { target: "zhangjiale", team: "batu", favorRequire: 31 },
            { target: "zhengxuan", team: "lanyu", favorRequire: 31 },
            { target: "jiangbotao", team: "lunhui", favorRequire: 31 }
        ],
        dialogs: {
            low: ["要一起练习狂剑士操作吗？", "你的攻击很有力度", "百花的狂剑传承，理解了吗？"],
            mid: ["今天的狂剑训练要一起吗？", "和你配合攻击很痛快", "开始觉得，你是很可靠的搭档"],
            high: ["有你在，狂剑威力提升很多", "你是我最想并肩作战的人", "看到你勇猛战斗，让我很欣赏"],
            love: ["今天不想狂攻，想温柔待你", "你战斗的英姿，让我心跳加速", "想和你一起开创未来"]
        },
        choices: {
            low: [
                { text: "好啊，请多指教！", favorChange: 4 },
                { text: "百花的狂剑很厉害", favorChange: 3 },
                { ignore: -2 }
            ],
            mid: [
                { text: "和你配合我也很痛快", favorChange: 5 },
                { text: "你也是我欣赏的搭档", favorChange: 3 },
                { ignore: -3 }
            ],
            high: [
                { text: "你也是我想并肩的人", favorChange: 5 },
                { text: "很欣赏你的勇猛", favorChange: 4 },
                { ignore: -6 }
            ],
            love: [
                { text: "想和你温柔相待", favorChange: 3 },
                { text: "我们的未来很美好", favorChange: 2 },
                { ignore: -12 }
            ]
        },
        confess: "我继承了百花的狂剑，但最想守护的是你的温柔。你愿意让我的剑，只为保护你而挥舞吗？",
        intimateEvents: [
            "于锋在训练室用狂剑打出了温柔的剑花",
            "他带你去百花谷，在花海中展现铁汉柔情",
            "在狂剑训练中，于锋为你展示了最温柔的剑法"
        ]
    },

    zouyuan: {
        name: "邹远",
        team: "baihua",
        gender: "male",
        bgColor: "bg-pink-400",
        borderColor: "border-pink-500",
        textColor: "text-white",
        introTargets: [
            { target: "yufeng", team: "baihua", favorRequire: 25 },
            { target: "zhuxiaoping", team: "baihua", favorRequire: 25 },
            { target: "zhangjiale", team: "batu", favorRequire: 25 },
            { target: "tanghao", team: "huxiao", favorRequire: 25 },
            { target: "jiangbotao", team: "lunhui", favorRequire: 25 }
        ],
        dialogs: {
            low: ["要一起练习弹药专家操作吗？", "你的百花式很有感觉", "百花的传承，适应了吗？"],
            mid: ["今天的百花式训练要一起吗？", "和你配合感觉很特别", "开始觉得，你是很特别的搭档"],
            high: ["有你在，百花式更绚烂了", "你是我最想一起绽放的人", "看到你使用百花式，让我很怀念"],
            love: ["今天不想训练，想和你赏花", "你专注的样子，让我心跳加速", "想和你一起绽放人生"]
        },
        choices: {
            low: [
                { text: "好啊，一起练习！", favorChange: 4 },
                { text: "百花的传承很美丽", favorChange: 3 },
                { ignore: -2 }
            ],
            mid: [
                { text: "和你配合我也很开心", favorChange: 5 },
                { text: "你也是很特别的人", favorChange: 3 },
                { ignore: -3 }
            ],
            high: [
                { text: "你也是我想绽放的人", favorChange: 5 },
                { text: "想和你创造新传承", favorChange: 4 },
                { ignore: -6 }
            ],
            love: [
                { text: "想和你一起赏花", favorChange: 3 },
                { text: "我们的人生会绽放", favorChange: 2 },
                { ignore: -12 }
            ]
        },
        confess: "我继承了百花式的绚烂，但最绚烂的是遇见你的瞬间。你愿意让我的百花，只为点缀你的笑容而绽放吗？",
        intimateEvents: [
            "邹远在训练室用弹药专家技能创造了最美丽的百花盛景",
            "他带你去植物园，在花海中重温百花传承",
            "在百花式表演中，邹远为你献上了专属的绚烂"
        ]
    },

    zhuxiaoping: {
        name: "朱效平",
        team: "baihua",
        gender: "male",
        bgColor: "bg-pink-600",
        borderColor: "border-pink-700",
        textColor: "text-white",
        introTargets: [
            { target: "yufeng", team: "baihua", favorRequire: 25 },
            { target: "zouyuan", team: "baihua", favorRequire: 25 },
            { target: "zhouguangyi", team: "baihua", favorRequire: 25 },
            { target: "zhangwei", team: "baihua", favorRequire: 25 },
            { target: "mozhuchen", team: "baihua", favorRequire: 25 }
        ],
        dialogs: {
            low: ["要一起练习召唤师操作吗？", "你的召唤物控制很精准", "百花的召唤体系，觉得如何？"],
            mid: ["今天的召唤训练要一起吗？", "和你配合召唤很默契", "开始觉得，你是很可靠的召唤师"],
            high: ["有你在，召唤战术威力倍增", "你是我最想搭档的召唤师", "看到你指挥召唤物，让我很欣赏"],
            love: ["今天不想召唤怪物，想召唤你的心", "你专注的样子，让我很想靠近", "想和你一起召唤未来"]
        },
        choices: {
            low: [
                { text: "好啊，一起练习！", favorChange: 4 },
                { text: "百花的召唤很独特", favorChange: 3 },
                { ignore: -2 }
            ],
            mid: [
                { text: "和你配合我也很默契", favorChange: 5 },
                { text: "能被你认可太好了", favorChange: 3 },
                { ignore: -3 }
            ],
            high: [
                { text: "你也是我想搭档的人", favorChange: 5 },
                { text: "很欣赏你的指挥", favorChange: 4 },
                { ignore: -6 }
            ],
            love: [
                { text: "我的心已被你召唤", favorChange: 3 },
                { text: "想和你召唤幸福", favorChange: 2 },
                { ignore: -12 }
            ]
        },
        confess: "我习惯召唤各种生物协助战斗，但最想召唤的是你的爱。你愿意让我的召唤兽们，只为守护你而存在吗？",
        intimateEvents: [
            "朱效平在训练室用召唤兽摆出了爱心阵型",
            "他带你去动物园，在可爱的动物面前告白",
            "在召唤训练中，朱效平为你创造了最温情的召唤时刻"
        ]
    },

    zhouguangyi: {
        name: "周光义",
        team: "baihua",
        gender: "male",
        bgColor: "bg-pink-300",
        borderColor: "border-pink-400",
        textColor: "text-gray-800",
        introTargets: [
            { target: "yufeng", team: "baihua", favorRequire: 25 },
            { target: "zouyuan", team: "baihua", favorRequire: 25 },
            { target: "zhuxiaoping", team: "baihua", favorRequire: 25 },
            { target: "zhangwei", team: "baihua", favorRequire: 25 },
            { target: "mozhuchen", team: "baihua", favorRequire: 25 }
        ],
        dialogs: {
            low: ["要一起练习刺客操作吗？", "你的潜行很隐蔽", "百花的刺客体系，适应吗？"],
            mid: ["今天的潜行训练要一起吗？", "和你配合暗杀很默契", "开始觉得，你是很可靠的伙伴"],
            high: ["有你在，暗杀成功率很高", "你是我最想搭档的刺客", "看到你悄无声息，让我很佩服"],
            love: ["今天不想潜行，想光明正大爱你", "你隐秘的身影，让我很想找到", "想和你一起走出阴影"]
        },
        choices: {
            low: [
                { text: "好啊，一起练习！", favorChange: 4 },
                { text: "正在适应刺客体系", favorChange: 3 },
                { ignore: -2 }
            ],
            mid: [
                { text: "和你配合我也很默契", favorChange: 5 },
                { text: "你也是我信任的伙伴", favorChange: 3 },
                { ignore: -3 }
            ],
            high: [
                { text: "你也是我想搭档的人", favorChange: 5 },
                { text: "很佩服你的技巧", favorChange: 4 },
                { ignore: -6 }
            ],
            love: [
                { text: "我想光明正大爱你", favorChange: 3 },
                { text: "和你一起走向光明", favorChange: 2 },
                { ignore: -12 }
            ]
        },
        confess: "我习惯在阴影中行动，但为了你，我愿意走到阳光下。你愿意接受这个为你改变的我吗？",
        intimateEvents: [
            "周光义从训练室的阴影中现身，带着真挚的告白",
            "他带你去日出观赏点，在晨光中表达爱意",
            "在潜行训练中，周光义为你创造了最浪漫的现身时刻"
        ]
    },

    zhangwei: {
        name: "张伟",
        team: "baihua",
        gender: "male",
        bgColor: "bg-pink-500",
        borderColor: "border-pink-600",
        textColor: "text-white",
        introTargets: [
            { target: "yufeng", team: "baihua", favorRequire: 25 },
            { target: "zouyuan", team: "baihua", favorRequire: 25 },
            { target: "zhuxiaoping", team: "baihua", favorRequire: 25 },
            { target: "zhouguangyi", team: "baihua", favorRequire: 25 },
            { target: "mozhuchen", team: "baihua", favorRequire: 25 }
        ],
        dialogs: {
            low: ["要一起练习元素法师操作吗？", "你的法术控制很稳定", "百花的元素体系，觉得如何？"],
            mid: ["今天的法术训练要一起吗？", "和你配合施法很流畅", "开始觉得，你是很优秀的法师"],
            high: ["有你在，法术威力提升很多", "你是我最想搭档的元素法师", "看到你吟唱法术，让我很欣赏"],
            love: ["今天不想施法，想施展魅力", "你专注的样子，让我很着迷", "想和你一起创造魔法人生"]
        },
        choices: {
            low: [
                { text: "好啊，一起练习！", favorChange: 4 },
                { text: "百花的元素很强大", favorChange: 3 },
                { ignore: -2 }
            ],
            mid: [
                { text: "和你配合我也很流畅", favorChange: 5 },
                { text: "能被你认可太好了", favorChange: 3 },
                { ignore: -3 }
            ],
            high: [
                { text: "你也是我想搭档的人", favorChange: 5 },
                { text: "很欣赏你的稳定", favorChange: 4 },
                { ignore: -6 }
            ],
            love: [
                { text: "你已对我施展魅力", favorChange: 3 },
                { text: "想和你创造奇迹", favorChange: 2 },
                { ignore: -12 }
            ]
        },
        confess: "我追求法术的极致，但最极致的魔法是让爱情永恒。你愿意让我的法术，只为守护你而存在吗？",
        intimateEvents: [
            "张伟在训练室用元素魔法创造了梦幻的魔法效果",
            "他带你去魔法城堡，在奇幻氛围中告白",
            "在法术表演中，张伟为你展示了最浪漫的魔法时刻"
        ]
    },

    mozhuchen: {
        name: "莫楚辰",
        team: "baihua",
        gender: "male",
        bgColor: "bg-pink-700",
        borderColor: "border-pink-800",
        textColor: "text-white",
        introTargets: [
            { target: "yufeng", team: "baihua", favorRequire: 25 },
            { target: "zouyuan", team: "baihua", favorRequire: 25 },
            { target: "zhuxiaoping", team: "baihua", favorRequire: 25 },
            { target: "zhouguangyi", team: "baihua", favorRequire: 25 },
            { target: "zhangwei", team: "baihua", favorRequire: 25 }
        ],
        dialogs: {
            low: ["要一起练习牧师操作吗？", "你的治疗很及时", "百花的治疗体系，觉得如何？"],
            mid: ["今天的治疗训练要一起吗？", "和你配合治疗很默契", "开始觉得，你是很可靠的治疗"],
            high: ["有你在，治疗压力小了很多", "你是我最放心的治疗搭档", "看到你专注治疗，让我很安心"],
            love: ["今天不想计算治疗量，想计算缘分", "你治疗时的温柔，让我很心动", "想和你一起治愈彼此"]
        },
        choices: {
            low: [
                { text: "好啊，一起练习！", favorChange: 4 },
                { text: "百花的治疗很专业", favorChange: 3 },
                { ignore: -2 }
            ],
            mid: [
                { text: "和你配合我也很默契", favorChange: 5 },
                { text: "能被你认可太好了", favorChange: 3 },
                { ignore: -3 }
            ],
            high: [
                { text: "你也是我放心的搭档", favorChange: 5 },
                { text: "有你在我也很安心", favorChange: 4 },
                { ignore: -6 }
            ],
            love: [
                { text: "我们的缘分是100%", favorChange: 3 },
                { text: "你治愈了我的心", favorChange: 2 },
                { ignore: -12 }
            ]
        },
        confess: "我习惯用治疗术拯救队友，但最想拯救的是你的心。你愿意让我用一生的时间，治愈你的所有伤痛吗？",
        intimateEvents: [
            "莫楚辰在医疗室用治疗技能创造了爱心光效",
            "他带你去医院的花园，在花香中表达爱意",
            "在治疗训练中，莫楚辰为你展示了最温柔的治疗方式"
        ]
    },

    // 三零一战队 - 灰色系
    yangcong: {
        name: "杨聪",
        team: "sanyiling",
        gender: "male",
        bgColor: "bg-gray-500",
        borderColor: "border-gray-600",
        textColor: "text-white",
        introTargets: [
            { target: "baishu", team: "sanyiling", favorRequire: 35 },
            { target: "gaojie", team: "sanyiling", favorRequire: 31 },
            { target: "sunmingjin", team: "sanyiling", favorRequire: 31 },
            { target: "wangjiexi", team: "weicao", favorRequire: 31 },
            { target: "hanwenqing", team: "batu", favorRequire: 31 },
            { target: "liyihui", team: "sanyiling", favorRequire: 31 }
        ],
        dialogs: {
            low: ["要一起练习刺客操作吗？", "你的舍命一击很有气势", "三零一的刺客传承，理解了吗？"],
            mid: ["今天的刺客训练要一起吗？", "和你讨论战术很有见解", "开始觉得，你是很聪明的搭档"],
            high: ["有你在，刺客战术更完善了", "你是我最想传授技艺的人", "看到你进步，让我很欣慰"],
            love: ["今天不想谈刺客，想谈感情", "你专注的样子，让我很心动", "想和你一起守护三零一"]
        },
        choices: {
            low: [
                { text: "请杨队指导！", favorChange: 4 },
                { text: "三零一的刺客很厉害", favorChange: 3 },
                { ignore: -2 }
            ],
            mid: [
                { text: "和你讨论我也很有收获", favorChange: 5 },
                { text: "能被杨队认可太好了", favorChange: 3 },
                { ignore: -3 }
            ],
            high: [
                { text: "杨队也是我尊敬的人", favorChange: 5 },
                { text: "想向杨队学习", favorChange: 4 },
                { ignore: -6 }
            ],
            love: [
                { text: "想和杨队谈感情", favorChange: 3 },
                { text: "愿意一起守护", favorChange: 2 },
                { ignore: -12 }
            ]
        },
        confess: "我继承了刺客的舍命一击，但最想守护的是你的生命。你愿意让我的匕首，只为保护你而收起吗？",
        intimateEvents: [
            "杨聪在训练室放下了刺客的匕首，用最真诚的心告白",
            "他带你去三零一的瞭望台，在夜色中承诺守护",
            "在刺客训练中，杨聪为你展示了最温柔的舍身技"
        ]
    },

    // 三零一战队 - 灰色系 (续)
    baishu: {
        name: "白庶",
        team: "sanyiling",
        gender: "male",
        bgColor: "bg-gray-400",
        borderColor: "border-gray-500",
        textColor: "text-gray-800",
        introTargets: [
            { target: "yangcong", team: "sanyiling", favorRequire: 25 },
            { target: "gaojie", team: "sanyiling", favorRequire: 25 },
            { target: "sunmingjin", team: "sanyiling", favorRequire: 25 }
        ],
        dialogs: {
            low: ["要一起练习骑士操作吗？", "你的防守很稳固", "三零一的骑士体系，适应吗？"],
            mid: ["今天的防守训练要一起吗？", "和你配合防守很可靠", "开始觉得，你是很坚实的后盾"],
            high: ["有你在，防守线很牢固", "你是我最想依靠的队友", "看到你坚守阵地，让我很安心"],
            love: ["今天不想防守，想守护你的心", "你战斗的身影，让我很想保护", "想和你一起守护彼此"]
        },
        choices: {
            low: [
                { text: "好啊，一起练习！", favorChange: 4 },
                { text: "三零一的防守很扎实", favorChange: 3 },
                { ignore: -2 }
            ],
            mid: [
                { text: "和你配合我也很安心", favorChange: 5 },
                { text: "能被你依靠很荣幸", favorChange: 3 },
                { ignore: -3 }
            ],
            high: [
                { text: "你也是我想依靠的人", favorChange: 5 },
                { text: "有你在我也很安心", favorChange: 4 },
                { ignore: -6 }
            ],
            love: [
                { text: "我的心需要你守护", favorChange: 3 },
                { text: "想互相守护一生", favorChange: 2 },
                { ignore: -12 }
            ]
        },
        confess: "我习惯用盾牌守护队友，但最想守护的是你的笑容。你愿意让我的盾，只为保护你而举起吗？",
        intimateEvents: [
            "白庶在训练室用盾牌技能创造了爱的防护结界",
            "他带你去古城堡，在历史的见证下告白",
            "在防守训练中，白庶为你展示了最坚定的守护"
        ]
    },

    gaojie: {
        name: "高杰",
        team: "sanyiling",
        gender: "male",
        bgColor: "bg-gray-600",
        borderColor: "border-gray-700",
        textColor: "text-white",
        introTargets: [
            { target: "yangcong", team: "sanyiling", favorRequire: 25 },
            { target: "baishu", team: "sanyiling", favorRequire: 25 },
            { target: "sunmingjin", team: "sanyiling", favorRequire: 25 }
        ],
        dialogs: {
            low: ["要一起练习神枪手操作吗？", "你的射击很精准", "三零一的远程支援，适应吗？"],
            mid: ["今天的射击训练要一起吗？", "和你配合射击很默契", "开始觉得，你是很可靠的射手"],
            high: ["有你在，远程火力很强大", "你是我最想掩护的队友", "看到你精准射击，让我很欣赏"],
            love: ["今天不想射击，想射中你的心", "你瞄准的专注，让我心跳加速", "想和你一起命中幸福的靶心"]
        },
        choices: {
            low: [
                { text: "好啊，一起练习！", favorChange: 4 },
                { text: "正在适应远程支援", favorChange: 3 },
                { ignore: -2 }
            ],
            mid: [
                { text: "和你配合我也很默契", favorChange: 5 },
                { text: "能被你认可太好了", favorChange: 3 },
                { ignore: -3 }
            ],
            high: [
                { text: "你也是我想掩护的人", favorChange: 5 },
                { text: "很欣赏你的精准", favorChange: 4 },
                { ignore: -6 }
            ],
            love: [
                { text: "我的心已被你射中", favorChange: 3 },
                { text: "想和你命中未来", favorChange: 2 },
                { ignore: -12 }
            ]
        },
        confess: "我追求射击的精准，但最想命中的是你的心。你愿意让我的子弹，只为保护你而发射吗？",
        intimateEvents: [
            "高杰在射击场用子弹在靶心上打出爱心图案",
            "他带你去观靶台，在精准的射击中表达爱意",
            "在远程训练中，高杰为你创造了最浪漫的射击时刻"
        ]
    },

    sunmingjin: {
        name: "孙明进",
        team: "sanyiling",
        gender: "male",
        bgColor: "bg-gray-700",
        borderColor: "border-gray-800",
        textColor: "text-white",
        introTargets: [
            { target: "yangcong", team: "sanyiling", favorRequire: 25 },
            { target: "baishu", team: "sanyiling", favorRequire: 25 },
            { target: "gaojie", team: "sanyiling", favorRequire: 25 }
        ],
        dialogs: {
            low: ["要一起练习元素法师操作吗？", "你的法术控制很稳定", "三零一的元素体系，觉得如何？"],
            mid: ["今天的法术训练要一起吗？", "和你配合施法很流畅", "开始觉得，你是很优秀的法师"],
            high: ["有你在，法术威力提升很多", "你是我最想搭档的元素法师", "看到你吟唱法术，让我很欣赏"],
            love: ["今天不想施法，想施展魅力", "你专注的样子，让我很着迷", "想和你一起创造魔法人生"]
        },
        choices: {
            low: [
                { text: "好啊，一起练习！", favorChange: 4 },
                { text: "三零一的元素很强大", favorChange: 3 },
                { ignore: -2 }
            ],
            mid: [
                { text: "和你配合我也很流畅", favorChange: 5 },
                { text: "能被你认可太好了", favorChange: 3 },
                { ignore: -3 }
            ],
            high: [
                { text: "你也是我想搭档的人", favorChange: 5 },
                { text: "很欣赏你的稳定", favorChange: 4 },
                { ignore: -6 }
            ],
            love: [
                { text: "你已对我施展魅力", favorChange: 3 },
                { text: "想和你创造奇迹", favorChange: 2 },
                { ignore: -12 }
            ]
        },
        confess: "我追求法术的极致，但最极致的魔法是让爱情永恒。你愿意让我的法术，只为守护你而存在吗？",
        intimateEvents: [
            "孙明进在训练室用元素魔法创造了梦幻的魔法效果",
            "他带你去魔法森林，在奇幻氛围中告白",
            "在法术表演中，孙明进为你展示了最浪漫的魔法时刻"
        ]
    },

    liyihui: {
        name: "李亦辉",
        team: "sanyiling",
        gender: "male",
        bgColor: "bg-gray-800",
        borderColor: "border-gray-900",
        textColor: "text-white",
        introTargets: [],
        dialogs: {
            low: ["要一起练习柔道操作吗？", "你的近身格斗很不错", "三零一的格斗体系，适应吗？"],
            mid: ["今天的格斗训练要一起吗？", "和你配合格斗很默契", "开始觉得，你是很可靠的搭档"],
            high: ["有你在，格斗威力提升很多", "你是我最想搭档的格斗家", "看到你灵活的身手，让我很欣赏"],
            love: ["今天不想格斗，想温柔待你", "你战斗的英姿，让我心跳加速", "想和你一起拥抱未来"]
        },
        choices: {
            low: [
                { text: "好啊，请多指教！", favorChange: 4 },
                { text: "正在适应格斗体系", favorChange: 3 },
                { ignore: -2 }
            ],
            mid: [
                { text: "和你配合我也很默契", favorChange: 5 },
                { text: "能被你认可太好了", favorChange: 3 },
                { ignore: -3 }
            ],
            high: [
                { text: "你也是我想搭档的人", favorChange: 5 },
                { text: "很欣赏你的身手", favorChange: 4 },
                { ignore: -6 }
            ],
            love: [
                { text: "想和你温柔相拥", favorChange: 3 },
                { text: "我们的未来很美好", favorChange: 2 },
                { ignore: -12 }
            ]
        },
        confess: "我习惯用抱摔制服对手，但最想拥抱的是你。你愿意让我用一生的时间，温柔地拥抱你吗？",
        intimateEvents: [
            "李亦辉在训练室用最温柔的动作展示柔道的魅力",
            "他带你去武道馆，在传统氛围中表达现代的爱意",
            "在格斗训练中，李亦辉为你展示了专属的浪漫招式"
        ]
    },

    // 虚空战队 - 紫色系
    lixuan: {
        name: "李轩",
        team: "xukong",
        gender: "male",
        bgColor: "bg-purple-600",
        borderColor: "border-purple-700",
        textColor: "text-white",
        introTargets: [
            { target: "wuyuce", team: "xukong", favorRequire: 35 },
            { target: "lixun", team: "xukong", favorRequire: 31 },
            { target: "gaicaijie", team: "xukong", favorRequire: 31 },
            { target: "tanglisheng", team: "xukong", favorRequire: 31 },
            { target: "gezhaolan", team: "xukong", favorRequire: 31 },
            { target: "qiaoyifan", team: "happy", favorRequire: 31 },
            { target: "zhouyebai", team: "weicao", favorRequire: 31 },
            { target: "zhangxinjie", team: "batu", favorRequire: 31 },
            { target: "yuwenzhou", team: "lanyu", favorRequire: 31 },
            { target: "huangshaotian", team: "lanyu", favorRequire: 31 },
            { target: "chuyunxiu", team: "yuyan", favorRequire: 31 },
            { target: "sumucheng", team: "happy", favorRequire: 31 },
            { target: "xiaoshiqin", team: "leiting", favorRequire: 31 },
            { target: "tiansen", team: "huangfeng", favorRequire: 31 }
        ],
        dialogs: {
            low: ["要一起研究鬼阵吗？", "你的阵鬼操作很有潜力", "虚空的鬼剑士体系，感兴趣吗？"],
            mid: ["今天的鬼阵训练要一起吗？", "和你讨论阵法很有灵感", "开始觉得，你是很聪明的搭档"],
            high: ["有你在，鬼阵威力提升很多", "你是我最想一起布阵的人", "看到你研究阵法，让我很欣赏"],
            love: ["今天不想布战阵，想布情网", "你思考的样子，让我陷入情网", "想和你一起布置爱的阵法"]
        },
        choices: {
            low: [
                { text: "请李队指导！", favorChange: 4 },
                { text: "虚空的鬼剑士很独特", favorChange: 3 },
                { ignore: -2 }
            ],
            mid: [
                { text: "和你讨论我也很有灵感", favorChange: 5 },
                { text: "能被李队认可太好了", favorChange: 3 },
                { ignore: -3 }
            ],
            high: [
                { text: "李队也是我想合作的人", favorChange: 5 },
                { text: "很欣赏李队的智慧", favorChange: 4 },
                { ignore: -6 }
            ],
            love: [
                { text: "我早已陷入你的情网", favorChange: 3 },
                { text: "想和你布置未来", favorChange: 2 },
                { ignore: -12 }
            ]
        },
        confess: "我习惯用鬼阵困住敌人，但最想困住的是你的心。你愿意陷入我为你精心布置的爱情阵法吗？",
        intimateEvents: [
            "李轩在训练室用鬼阵摆出了浪漫的爱心形状",
            "他带你去古迹遗址，在古老的阵法前诉说永恒",
            "在鬼阵研究中，李轩为你创造了专属的爱的结界"
        ]
    },

    wuyuce: {
        name: "吴羽策",
        team: "xukong",
        gender: "male",
        bgColor: "bg-purple-500",
        borderColor: "border-purple-600",
        textColor: "text-white",
        introTargets: [
            { target: "lixuan", team: "xukong", favorRequire: 35 },
            { target: "lixun", team: "xukong", favorRequire: 31 },
            { target: "gaicaijie", team: "xukong", favorRequire: 31 },
            { target: "qiaoyifan", team: "happy", favorRequire: 31 },
            { target: "fangrui", team: "happy", favorRequire: 31 }
        ],
        dialogs: {
            low: ["要一起练习阵鬼操作吗？", "你的鬼阵布置很巧妙", "虚空的阵鬼传承，理解了吗？"],
            mid: ["今天的鬼阵训练要一起吗？", "和你配合布阵很默契", "开始觉得，你是很可靠的搭档"],
            high: ["有你在，鬼阵配合更完美", "你是我最想并肩的阵鬼", "看到你操控鬼阵，让我很欣赏"],
            love: ["今天不想布战阵，想布情缘", "你专注的样子，让我心跳紊乱", "想和你一起编织命运"]
        },
        choices: {
            low: [
                { text: "好啊，一起练习！", favorChange: 4 },
                { text: "虚空的阵鬼很厉害", favorChange: 3 },
                { ignore: -2 }
            ],
            mid: [
                { text: "和你配合我也很默契", favorChange: 5 },
                { text: "能被你认可太好了", favorChange: 3 },
                { ignore: -3 }
            ],
            high: [
                { text: "你也是我想并肩的人", favorChange: 5 },
                { text: "很欣赏你的操控", favorChange: 4 },
                { ignore: -6 }
            ],
            love: [
                { text: "我们的情缘已注定", favorChange: 3 },
                { text: "想和你编织未来", favorChange: 2 },
                { ignore: -12 }
            ]
        },
        confess: "我追求鬼阵的完美，但最完美的是与你的相遇。你愿意让我的鬼阵，只为守护我们的缘分而存在吗？",
        intimateEvents: [
            "吴羽策在训练室用鬼阵创造了梦幻的星空效果",
            "他带你去观星台，在星空的见证下告白",
            "在鬼阵表演中，吴羽策为你展示了最浪漫的阵法艺术"
        ]
    },

    lixun: {
        name: "李迅",
        team: "xukong",
        gender: "male",
        bgColor: "bg-purple-400",
        borderColor: "border-purple-500",
        textColor: "text-white",
        introTargets: [
            { target: "lixuan", team: "xukong", favorRequire: 25 },
            { target: "wuyuce", team: "xukong", favorRequire: 25 },
            { target: "gaicaijie", team: "xukong", favorRequire: 25 },
            { target: "tanglisheng", team: "xukong", favorRequire: 25 },
            { target: "gezhaolan", team: "xukong", favorRequire: 25 }
        ],
        dialogs: {
            low: ["要一起练习刺客操作吗？", "你的潜行很隐蔽", "虚空的刺客体系，适应吗？"],
            mid: ["今天的潜行训练要一起吗？", "和你配合暗杀很默契", "开始觉得，你是很可靠的伙伴"],
            high: ["有你在，暗杀成功率很高", "你是我最想搭档的刺客", "看到你悄无声息，让我很佩服"],
            love: ["今天不想潜行，想光明正大爱你", "你隐秘的身影，让我很想找到", "想和你一起走出阴影"]
        },
        choices: {
            low: [
                { text: "好啊，一起练习！", favorChange: 4 },
                { text: "正在适应刺客体系", favorChange: 3 },
                { ignore: -2 }
            ],
            mid: [
                { text: "和你配合我也很默契", favorChange: 5 },
                { text: "你也是我信任的伙伴", favorChange: 3 },
                { ignore: -3 }
            ],
            high: [
                { text: "你也是我想搭档的人", favorChange: 5 },
                { text: "很佩服你的技巧", favorChange: 4 },
                { ignore: -6 }
            ],
            love: [
                { text: "我想光明正大爱你", favorChange: 3 },
                { text: "和你一起走向光明", favorChange: 2 },
                { ignore: -12 }
            ]
        },
        confess: "我习惯在阴影中行动，但为了你，我愿意走到阳光下。你愿意接受这个为你改变的我吗？",
        intimateEvents: [
            "李迅从训练室的阴影中现身，带着真挚的告白",
            "他带你去日出观赏点，在晨光中表达爱意",
            "在潜行训练中，李迅为你创造了最浪漫的现身时刻"
        ]
    },

    gaicaijie: {
        name: "盖才捷",
        team: "xukong",
        gender: "male",
        bgColor: "bg-purple-300",
        borderColor: "border-purple-400",
        textColor: "text-gray-800",
        introTargets: [
            { target: "lixuan", team: "xukong", favorRequire: 25 },
            { target: "wuyuce", team: "xukong", favorRequire: 25 },
            { target: "lixun", team: "xukong", favorRequire: 25 },
            { target: "tanglisheng", team: "xukong", favorRequire: 25 },
            { target: "gezhaolan", team: "xukong", favorRequire: 25 },
            { target: "gaoyingjie", team: "weicao", favorRequire: 25 },
            { target: "luhanwen", team: "lanyu", favorRequire: 25 }
        ],
        dialogs: {
            low: ["要一起练习驱魔师操作吗？", "你的符咒运用很熟练", "虚空的驱魔体系，觉得如何？"],
            mid: ["今天的符咒训练要一起吗？", "和你配合驱魔很默契", "开始觉得，你是很有天赋的驱魔师"],
            high: ["有你在，驱魔威力提升很多", "你是我最想搭档的驱魔师", "看到你使用符咒，让我很欣赏"],
            love: ["今天不想驱魔，想驱散你的孤独", "你专注的样子，让我很想陪伴", "想和你一起驱散阴霾"]
        },
        choices: {
            low: [
                { text: "好啊，一起练习！", favorChange: 4 },
                { text: "虚空的驱魔很独特", favorChange: 3 },
                { ignore: -2 }
            ],
            mid: [
                { text: "和你配合我也很默契", favorChange: 5 },
                { text: "能被你认可太好了", favorChange: 3 },
                { ignore: -3 }
            ],
            high: [
                { text: "你也是我想搭档的人", favorChange: 5 },
                { text: "很欣赏你的天赋", favorChange: 4 },
                { ignore: -6 }
            ],
            love: [
                { text: "你已驱散我的孤独", favorChange: 3 },
                { text: "想和你驱散阴霾", favorChange: 2 },
                { ignore: -12 }
            ]
        },
        confess: "我习惯用符咒驱散邪魔，但最想驱散的是你的寂寞。你愿意让我的符咒，只为守护你的笑容而存在吗？",
        intimateEvents: [
            "盖才捷在训练室用符咒摆出了爱的图案",
            "他带你去神社，在神圣的氛围中告白",
            "在驱魔训练中，盖才捷为你展示了最温柔的符咒使用"
        ]
    },

    tanglisheng: {
        name: "唐礼升",
        team: "xukong",
        gender: "male",
        bgColor: "bg-purple-700",
        borderColor: "border-purple-800",
        textColor: "text-white",
        introTargets: [
            { target: "lixuan", team: "xukong", favorRequire: 25 },
            { target: "wuyuce", team: "xukong", favorRequire: 25 },
            { target: "lixun", team: "xukong", favorRequire: 25 },
            { target: "gaicaijie", team: "xukong", favorRequire: 25 },
            { target: "gezhaolan", team: "xukong", favorRequire: 25 }
        ],
        dialogs: {
            low: ["要一起练习守护使者操作吗？", "你的防守很稳固", "虚空的守护体系，适应吗？"],
            mid: ["今天的防守训练要一起吗？", "和你配合守护很可靠", "开始觉得，你是很坚实的后盾"],
            high: ["有你在，守护更牢固了", "你是我最想守护的人", "看到你坚守岗位，让我很安心"],
            love: ["今天不想防守，想守护你的心", "你专注的样子，让我很想保护", "想和你一起守护彼此"]
        },
        choices: {
            low: [
                { text: "好啊，一起练习！", favorChange: 4 },
                { text: "虚空的守护很专业", favorChange: 3 },
                { ignore: -2 }
            ],
            mid: [
                { text: "和你配合我也很安心", favorChange: 5 },
                { text: "能被你守护很荣幸", favorChange: 3 },
                { ignore: -3 }
            ],
            high: [
                { text: "你也是我想守护的人", favorChange: 5 },
                { text: "有你在我也很安心", favorChange: 4 },
                { ignore: -6 }
            ],
            love: [
                { text: "我的心需要你守护", favorChange: 3 },
                { text: "想互相守护一生", favorChange: 2 },
                { ignore: -12 }
            ]
        },
        confess: "我习惯用盾牌守护队友，但最想守护的是你的笑容。你愿意让我的盾，只为保护你而举起吗？",
        intimateEvents: [
            "唐礼升在训练室用守护技能创造了爱的防护结界",
            "他带你去古城墙，在历史的见证下告白",
            "在守护训练中，唐礼升为你展示了最坚定的守护"
        ]
    },

    gezhaolan: {
        name: "葛兆蓝",
        team: "xukong",
        gender: "male",
        bgColor: "bg-purple-800",
        borderColor: "border-purple-900",
        textColor: "text-white",
        introTargets: [
            { target: "lixuan", team: "xukong", favorRequire: 25 },
            { target: "wuyuce", team: "xukong", favorRequire: 25 },
            { target: "lixun", team: "xukong", favorRequire: 25 },
            { target: "gaicaijie", team: "xukong", favorRequire: 25 },
            { target: "tanglisheng", team: "xukong", favorRequire: 25 }
        ],
        dialogs: {
            low: ["要一起练习弹药专家操作吗？", "你的弹药运用很熟练", "虚空的弹药体系，觉得如何？"],
            mid: ["今天的弹药训练要一起吗？", "和你配合射击很默契", "开始觉得，你是很可靠的射手"],
            high: ["有你在，弹药威力提升很多", "你是我最想搭档的弹药专家", "看到你使用弹药，让我很欣赏"],
            love: ["今天不想射击，想射中你的心", "你专注的样子，让我心跳加速", "想和你一起引爆爱情"]
        },
        choices: {
            low: [
                { text: "好啊，一起练习！", favorChange: 4 },
                { text: "虚空的弹药很厉害", favorChange: 3 },
                { ignore: -2 }
            ],
            mid: [
                { text: "和你配合我也很默契", favorChange: 5 },
                { text: "能被你认可太好了", favorChange: 3 },
                { ignore: -3 }
            ],
            high: [
                { text: "你也是我想搭档的人", favorChange: 5 },
                { text: "很欣赏你的熟练", favorChange: 4 },
                { ignore: -6 }
            ],
            love: [
                { text: "我的心已被你射中", favorChange: 3 },
                { text: "想和你引爆幸福", favorChange: 2 },
                { ignore: -12 }
            ]
        },
        confess: "我追求弹药的威力，但最强大的威力是爱情的力量。你愿意让我的弹药，只为守护你而存在吗？",
        intimateEvents: [
            "葛兆蓝在训练室用弹药创造了绚丽的烟花效果",
            "他带你去烟花大会，在绚烂中表达爱意",
            "在弹药训练中，葛兆蓝为你展示了最浪漫的爆炸艺术"
        ]
    },

    // 皇风战队 - 琥珀色系
    tiansen: {
        name: "田森",
        team: "huangfeng",
        gender: "male",
        bgColor: "bg-amber-500",
        borderColor: "border-amber-600",
        textColor: "text-white",
        introTargets: [
            { target: "heweitang", team: "huangfeng", favorRequire: 35 },
            { target: "shenwanhe", team: "huangfeng", favorRequire: 31 },
            { target: "zhangxinjie", team: "batu", favorRequire: 31 },
            { target: "yuwenzhou", team: "lanyu", favorRequire: 31 },
            { target: "huangshaotian", team: "lanyu", favorRequire: 31 },
            { target: "chuyunxiu", team: "yuyan", favorRequire: 31 },
            { target: "sumucheng", team: "happy", favorRequire: 31 },
            { target: "xiaoshiqin", team: "leiting", favorRequire: 31 },
            { target: "lixuan", team: "xukong", favorRequire: 31 }
        ],
        dialogs: {
            low: ["要一起练习驱魔师操作吗？", "你的扫地焚香很有气势", "皇风的驱魔传承，理解了吗？"],
            mid: ["今天的驱魔训练要一起吗？", "和你讨论驱魔很有见解", "开始觉得，你是很聪明的搭档"],
            high: ["有你在，驱魔威力提升很多", "你是我最想传授技艺的人", "看到你进步，让我很欣慰"],
            love: ["今天不想谈驱魔，想谈感情", "你专注的样子，让我很心动", "想和你一起守护皇风"]
        },
        choices: {
            low: [
                { text: "请田队指导！", favorChange: 4 },
                { text: "皇风的驱魔很厉害", favorChange: 3 },
                { ignore: -2 }
            ],
            mid: [
                { text: "和你讨论我也很有收获", favorChange: 5 },
                { text: "能被田队认可太好了", favorChange: 3 },
                { ignore: -3 }
            ],
            high: [
                { text: "田队也是我尊敬的人", favorChange: 5 },
                { text: "想向田队学习", favorChange: 4 },
                { ignore: -6 }
            ],
            love: [
                { text: "想和田队谈感情", favorChange: 3 },
                { text: "愿意一起守护", favorChange: 2 },
                { ignore: -12 }
            ]
        },
        confess: "我继承了皇风的驱魔传承，但最想驱散的是你的孤独。你愿意让我的驱魔术，只为守护你的笑容而存在吗？",
        intimateEvents: [
            "田森在训练室用驱魔术创造了神圣的光效",
            "他带你去古老的寺庙，在神圣的氛围中告白",
            "在驱魔训练中，田森为你展示了最温柔的驱魔技巧"
        ]
    },

    // 皇风战队 - 琥珀色系 (续)
    heweitang: {
        name: "何伟堂",
        team: "huangfeng",
        gender: "male",
        bgColor: "bg-amber-400",
        borderColor: "border-amber-500",
        textColor: "text-white",
        introTargets: [
            { target: "tiansen", team: "huangfeng", favorRequire: 25 },
            { target: "shenwanhe", team: "huangfeng", favorRequire: 25 }
        ],
        dialogs: {
            low: ["要一起练习元素法师操作吗？", "你的法术控制很稳定", "皇风的元素体系，觉得如何？"],
            mid: ["今天的法术训练要一起吗？", "和你配合施法很流畅", "开始觉得，你是很优秀的法师"],
            high: ["有你在，法术威力提升很多", "你是我最想搭档的元素法师", "看到你吟唱法术，让我很欣赏"],
            love: ["今天不想施法，想施展魅力", "你专注的样子，让我很着迷", "想和你一起创造魔法人生"]
        },
        choices: {
            low: [
                { text: "好啊，一起练习！", favorChange: 4 },
                { text: "皇风的元素很强大", favorChange: 3 },
                { ignore: -2 }
            ],
            mid: [
                { text: "和你配合我也很流畅", favorChange: 5 },
                { text: "能被你认可太好了", favorChange: 3 },
                { ignore: -3 }
            ],
            high: [
                { text: "你也是我想搭档的人", favorChange: 5 },
                { text: "很欣赏你的稳定", favorChange: 4 },
                { ignore: -6 }
            ],
            love: [
                { text: "你已对我施展魅力", favorChange: 3 },
                { text: "想和你创造奇迹", favorChange: 2 },
                { ignore: -12 }
            ]
        },
        confess: "我追求法术的极致，但最极致的魔法是让爱情永恒。你愿意让我的法术，只为守护你而存在吗？",
        intimateEvents: [
            "何伟堂在训练室用元素魔法创造了梦幻的魔法效果",
            "他带你去魔法城堡，在奇幻氛围中告白",
            "在法术表演中，何伟堂为你展示了最浪漫的魔法时刻"
        ]
    },

    shenwanhe: {
        name: "沈万河",
        team: "huangfeng",
        gender: "male",
        bgColor: "bg-amber-600",
        borderColor: "border-amber-700",
        textColor: "text-white",
        introTargets: [
            { target: "tiansen", team: "huangfeng", favorRequire: 25 },
            { target: "heweitang", team: "huangfeng", favorRequire: 25 }
        ],
        dialogs: {
            low: ["要一起练习神枪手操作吗？", "你的射击很精准", "皇风的远程支援，适应吗？"],
            mid: ["今天的射击训练要一起吗？", "和你配合射击很默契", "开始觉得，你是很可靠的射手"],
            high: ["有你在，远程火力很强大", "你是我最想掩护的队友", "看到你精准射击，让我很欣赏"],
            love: ["今天不想射击，想射中你的心", "你瞄准的专注，让我心跳加速", "想和你一起命中幸福的靶心"]
        },
        choices: {
            low: [
                { text: "好啊，一起练习！", favorChange: 4 },
                { text: "正在适应远程支援", favorChange: 3 },
                { ignore: -2 }
            ],
            mid: [
                { text: "和你配合我也很默契", favorChange: 5 },
                { text: "能被你认可太好了", favorChange: 3 },
                { ignore: -3 }
            ],
            high: [
                { target: "你也是我想掩护的人", favorChange: 5 },
                { text: "很欣赏你的精准", favorChange: 4 },
                { ignore: -6 }
            ],
            love: [
                { text: "我的心已被你射中", favorChange: 3 },
                { text: "想和你命中未来", favorChange: 2 },
                { ignore: -12 }
            ]
        },
        confess: "我追求射击的精准，但最想命中的是你的心。你愿意让我的子弹，只为保护你而发射吗？",
        intimateEvents: [
            "沈万河在射击场用子弹在靶心上打出爱心图案",
            "他带你去观靶台，在精准的射击中表达爱意",
            "在远程训练中，沈万河为你创造了最浪漫的射击时刻"
        ]
    },

    // 义斩战队 - 金色系
    louguanning: {
        name: "楼冠宁",
        team: "yizhan",
        gender: "male",
        bgColor: "bg-yellow-500",
        borderColor: "border-yellow-600",
        textColor: "text-white",
        introTargets: [
            { target: "sunzeping", team: "yizhan", favorRequire: 35 },
            { target: "wenkebei", team: "yizhan", favorRequire: 31 },
            { target: "guxiye", team: "yizhan", favorRequire: 31 },
            { target: "zhongyeli", team: "yizhan", favorRequire: 31 }
        ],
        dialogs: {
            low: ["要一起练习狂剑士操作吗？", "你的攻击很有力度", "义斩的战队氛围，喜欢吗？"],
            mid: ["今天的训练要一起吗？", "和你讨论战队发展很有想法", "开始觉得，你是很重要的伙伴"],
            high: ["有你在，战队更有活力了", "你是我最想一起建设战队的人", "看到你为战队付出，让我很感动"],
            love: ["今天不想谈战队，想谈谈我们", "你认真的样子，让我很心动", "想和你一起创造辉煌"]
        },
        choices: {
            low: [
                { text: "好啊，一起练习！", favorChange: 4 },
                { text: "义斩的氛围很棒", favorChange: 3 },
                { ignore: -2 }
            ],
            mid: [
                { text: "和你讨论我也很有收获", favorChange: 5 },
                { text: "你也是重要的伙伴", favorChange: 3 },
                { ignore: -3 }
            ],
            high: [
                { text: "你也是我想合作的人", favorChange: 5 },
                { text: "很感动你的付出", favorChange: 4 },
                { ignore: -6 }
            ],
            love: [
                { text: "想和你谈我们的事", favorChange: 3 },
                { text: "想和你共创辉煌", favorChange: 2 },
                { ignore: -12 }
            ]
        },
        confess: "我致力于建设义斩战队，但最想建设的是我们的未来。你愿意和我一起，打造属于我们的辉煌吗？",
        intimateEvents: [
            "楼冠宁在战队的庆功宴上当众向你表白",
            "他带你去义斩的新基地，在建设中许下承诺",
            "在战队规划会议上，楼冠宁将你纳入他的未来蓝图"
        ]
    },

    sunzeping: {
        name: "孙哲平",
        team: "yizhan",
        gender: "male",
        bgColor: "bg-yellow-600",
        borderColor: "border-yellow-700",
        textColor: "text-white",
        introTargets: [
            { target: "louguanning", team: "yizhan", favorRequire: 25 },
            { target: "zhangjiale", team: "batu", favorRequire: 25 },
            { target: "wenkebei", team: "yizhan", favorRequire: 25 },
            { target: "guxiye", team: "yizhan", favorRequire: 25 },
            { target: "zhongyeli", team: "yizhan", favorRequire: 25 }
        ],
        dialogs: {
            low: ["要切磋吗？", "你的操作很有气势", "义斩，还习惯吗？"],
            mid: ["今天的训练要一起吗？", "你的实力我认可", "开始觉得，你是个不错的搭档"],
            high: ["有你在，战斗更有意思", "你是我认可的对手", "看到你战斗，让我想起从前"],
            love: ["今天不想战斗，想和你聊聊", "你战斗的英姿，让我很在意", "想和你一起找回荣耀"]
        },
        choices: {
            low: [
                { text: "好啊，请指教！", favorChange: 4 },
                { text: "义斩很温暖", favorChange: 3 },
                { ignore: -2 }
            ],
            mid: [
                { text: "能被你认可很荣幸", favorChange: 5 },
                { text: "你也是我尊敬的对手", favorChange: 3 },
                { ignore: -3 }
            ],
            high: [
                { text: "你也是我想切磋的人", favorChange: 5 },
                { text: "想向你学习经验", favorChange: 4 },
                { ignore: -6 }
            ],
            love: [
                { text: "想和你好好聊聊", favorChange: 3 },
                { text: "想和你重拾荣耀", favorChange: 2 },
                { ignore: -12 }
            ]
        },
        confess: "我经历过巅峰，也跌入过低谷。但在你身上，我看到了新的希望。你愿意和这个伤痕累累的我一起前行吗？",
        intimateEvents: [
            "孙哲平在训练室展示了他曾经的巅峰操作",
            "他带你去百花战队旧址，在回忆中展望未来",
            "在深夜的训练室，孙哲平向你敞开心扉"
        ]
    },

    wenkebei: {
        name: "文客北",
        team: "yizhan",
        gender: "male",
        bgColor: "bg-yellow-400",
        borderColor: "border-yellow-500",
        textColor: "text-gray-800",
        introTargets: [
            { target: "louguanning", team: "yizhan", favorRequire: 25 },
            { target: "sunzeping", team: "yizhan", favorRequire: 25 },
            { target: "guxiye", team: "yizhan", favorRequire: 25 },
            { target: "zhongyeli", team: "yizhan", favorRequire: 25 }
        ],
        dialogs: {
            low: ["要一起练习元素法师操作吗？", "你的法术很华丽", "义斩的元素体系，觉得如何？"],
            mid: ["今天的法术训练要一起吗？", "和你配合施法很愉快", "开始觉得，你是很有趣的搭档"],
            high: ["有你在，训练都变得有趣了", "你是我最想一起研究法术的人", "看到你创新的想法，让我很欣赏"],
            love: ["今天不想研究法术，想研究你的心", "你专注创新的样子，让我很着迷", "想和你一起创造奇迹"]
        },
        choices: {
            low: [
                { text: "好啊，一起练习！", favorChange: 4 },
                { text: "义斩的元素很有特色", favorChange: 3 },
                { ignore: -2 }
            ],
            mid: [
                { text: "和你配合我也很开心", favorChange: 5 },
                { text: "你也是很有趣的人", favorChange: 3 },
                { ignore: -3 }
            ],
            high: [
                { text: "你也是我想研究的人", favorChange: 5 },
                { text: "很欣赏你的创新", favorChange: 4 },
                { ignore: -6 }
            ],
            love: [
                { text: "我的心向你敞开", favorChange: 3 },
                { text: "想和你创造奇迹", favorChange: 2 },
                { ignore: -12 }
            ]
        },
        confess: "我追求法术的创新，但最创新的想法是让爱情永恒。你愿意让我的法术，只为点缀你的笑容而存在吗？",
        intimateEvents: [
            "文客北在训练室创造了前所未有的魔法效果",
            "他带你去科技馆，在创新中表达爱意",
            "在法术研究中，文客北为你设计了专属的浪漫魔法"
        ]
    },

    guxiye: {
        name: "顾夕夜",
        team: "yizhan",
        gender: "female",
        bgColor: "bg-yellow-300",
        borderColor: "border-yellow-400",
        textColor: "text-gray-800",
        introTargets: [
            { target: "louguanning", team: "yizhan", favorRequire: 25 },
            { target: "sunzeping", team: "yizhan", favorRequire: 25 },
            { target: "wenkebei", team: "yizhan", favorRequire: 25 },
            { target: "zhongyeli", team: "yizhan", favorRequire: 25 }
        ],
        dialogs: {
            low: ["要一起练习刺客操作吗？", "你的潜行很优雅", "义斩的刺客体系，适应吗？"],
            mid: ["今天的潜行训练要一起吗？", "和你配合暗杀很默契", "开始觉得，你是很可靠的伙伴"],
            high: ["有你在，暗杀变得很艺术", "你是我最想搭档的刺客", "看到你优雅的身影，让我很欣赏"],
            love: ["今天不想潜行，想光明正大爱你", "你优雅的姿态，让我很想靠近", "想和你一起创造美的艺术"]
        },
        choices: {
            low: [
                { text: "好啊，一起练习！", favorChange: 4 },
                { text: "正在适应刺客体系", favorChange: 3 },
                { ignore: -2 }
            ],
            mid: [
                { text: "和你配合我也很默契", favorChange: 5 },
                { text: "你也是我信任的伙伴", favorChange: 3 },
                { ignore: -3 }
            ],
            high: [
                { text: "你也是我想搭档的人", favorChange: 5 },
                { text: "很欣赏你的优雅", favorChange: 4 },
                { ignore: -6 }
            ],
            love: [
                { text: "我想光明正大爱你", favorChange: 3 },
                { text: "想和你创造艺术", favorChange: 2 },
                { ignore: -12 }
            ]
        },
        confess: "我追求暗杀的艺术，但最艺术的是与你的相遇。你愿意让我的刺客之道，只为守护你而改变吗？",
        intimateEvents: [
            "顾夕夜在月光下展示了最优雅的刺客之舞",
            "她带你去艺术馆，在美的氛围中告白",
            "在潜行训练中，顾夕夜为你创造了最浪漫的艺术时刻"
        ]
    },

    zhongyeli: {
        name: "钟叶离",
        team: "yizhan",
        gender: "female",
        bgColor: "bg-yellow-700",
        borderColor: "border-yellow-800",
        textColor: "text-white",
        introTargets: [
            { target: "louguanning", team: "yizhan", favorRequire: 25 },
            { target: "sunzeping", team: "yizhan", favorRequire: 25 },
            { target: "wenkebei", team: "yizhan", favorRequire: 25 },
            { target: "guxiye", team: "yizhan", favorRequire: 25 },
            { target: "sumucheng", team: "happy", favorRequire: 25 },
            { target: "chuyunxiu", team: "yuyan", favorRequire: 25 },
            { target: "liufei", team: "weicao", favorRequire: 25 },
            { target: "shukexin", team: "yuyan", favorRequire: 25 },
            { target: "shukeyi", team: "yuyan", favorRequire: 25 }
        ],
        dialogs: {
            low: ["要一起练习牧师操作吗？", "你的治疗很温柔", "义斩的治疗体系，觉得如何？"],
            mid: ["今天的治疗训练要一起吗？", "和你配合治疗很舒服", "开始觉得，你是很温暖的存在"],
            high: ["有你在，治疗都变得温暖了", "你是我最想一起治愈他人的人", "看到你温柔的样子，让我很心动"],
            love: ["今天不想计算治疗量，想计算幸福", "你温柔的笑容，让我心跳加速", "想和你一起温暖彼此"]
        },
        choices: {
            low: [
                { text: "好啊，一起练习！", favorChange: 4 },
                { text: "义斩的治疗很专业", favorChange: 3 },
                { ignore: -2 }
            ],
            mid: [
                { text: "和你配合我也很舒服", favorChange: 5 },
                { text: "你也是很温暖的人", favorChange: 3 },
                { ignore: -3 }
            ],
            high: [
                { text: "你也是我想治愈的人", favorChange: 5 },
                { text: "很心动你的温柔", favorChange: 4 },
                { ignore: -6 }
            ],
            love: [
                { text: "我们的幸福是100%", favorChange: 3 },
                { text: "你温暖了我的心", favorChange: 2 },
                { ignore: -12 }
            ]
        },
        confess: "我习惯用治疗术温暖他人，但最想温暖的是你的心。你愿意让我用一生的时间，治愈你的所有伤痛吗？",
        intimateEvents: [
            "钟叶离在医疗室用治疗技能创造了温暖的光环",
            "她带你去温泉，在温暖的水汽中告白",
            "在治疗训练中，钟叶离为你展示了最温柔的治疗艺术"
        ]
    },

    // 嘉世战队 - 黄色系
    qiufei: {
        name: "邱非",
        team: "jiashi",
        gender: "male",
        bgColor: "bg-red-500",
        borderColor: "border-red-600",
        textColor: "text-white",
        introTargets: [
            { target: "yexiu", team: "happy", favorRequire: 35 },
            { target: "sumucheng", team: "happy", favorRequire: 31 },
            { target: "sunxiang", team: "lunhui", favorRequire: 31 },
            { target: "liuhao", team: "huxiao", favorRequire: 31 },
            { target: "luhanwen", team: "lanyu", favorRequire: 31 },
            { target: "wenli", team: "jiashi", favorRequire: 31 },
            { target: "gaoyingjie", team: "weicao", favorRequire: 31 }
        ],
        dialogs: {
            low: ["要一起练习战斗法师操作吗？", "你的操作很扎实", "新嘉世，还适应吗？"],
            mid: ["今天的训练要一起吗？", "你的进步我看在眼里", "开始觉得，你是很重要的后辈"],
            high: ["有你在，嘉世的未来更有希望", "你是我想要培养的选手", "看到你努力，让我很欣慰"],
            love: ["今天不想谈训练，想谈谈心", "你专注的样子，让我很在意", "想和你一起重振嘉世"]
        },
        choices: {
            low: [
                { text: "好啊，一起练习！", favorChange: 4 },
                { text: "新嘉世很有潜力", favorChange: 3 },
                { ignore: -2 }
            ],
            mid: [
                { text: "谢谢前辈指导", favorChange: 5 },
                { text: "想向前辈学习", favorChange: 3 },
                { ignore: -3 }
            ],
            high: [
                { text: "前辈对我也很重要", favorChange: 5 },
                { text: "想和前辈一起努力", favorChange: 4 },
                { ignore: -6 }
            ],
            love: [
                { text: "想和前辈谈心", favorChange: 3 },
                { text: "愿意一起重振嘉世", favorChange: 2 },
                { ignore: -12 }
            ]
        },
        confess: "我肩负着重振嘉世的责任，但在你面前，我找到了坚持下去的勇气。你愿意和这个肩负重任的我一起前行吗？",
        intimateEvents: [
            "邱非在训练室展示了完美的战斗法师连招",
            "他带你去嘉世旧址，在回忆中许下承诺",
            "在深夜加练时，邱非向你吐露心声"
        ]
    },

    wenli: {
        name: "闻理",
        team: "jiashi",
        gender: "male",
        bgColor: "bg-red-400",
        borderColor: "border-red-500",
        textColor: "text-gray-800",
        introTargets: [],
        dialogs: {
            low: ["要一起练习元素法师操作吗？", "你的法术控制很不错", "嘉世的元素体系，适应吗？"],
            mid: ["今天的法术训练要一起吗？", "和你配合施法很流畅", "开始觉得，你是很优秀的法师"],
            high: ["有你在，法术威力提升很多", "你是我最想搭档的元素法师", "看到你吟唱法术，让我很欣赏"],
            love: ["今天不想施法，想施展魅力", "你专注的样子，让我很着迷", "想和你一起创造魔法人生"]
        },
        choices: {
            low: [
                { text: "好啊，一起练习！", favorChange: 4 },
                { text: "嘉世的元素很有特色", favorChange: 3 },
                { ignore: -2 }
            ],
            mid: [
                { text: "和你配合我也很流畅", favorChange: 5 },
                { text: "能被你认可太好了", favorChange: 3 },
                { ignore: -3 }
            ],
            high: [
                { text: "你也是我想搭档的人", favorChange: 5 },
                { text: "很欣赏你的法术", favorChange: 4 },
                { ignore: -6 }
            ],
            love: [
                { text: "你已对我施展魅力", favorChange: 3 },
                { text: "想和你创造奇迹", favorChange: 2 },
                { ignore: -12 }
            ]
        },
        confess: "我追求法术的极致，但最极致的魔法是让爱情永恒。你愿意让我的法术，只为守护你而存在吗？",
        intimateEvents: [
            "闻理在训练室用元素魔法创造了梦幻的星空",
            "他带你去天文台，在星空的见证下告白",
            "在法术表演中，闻理为你展示了最浪漫的魔法时刻"
        ]
    },


    linjie: {
        name: "林杰",
        team: "league",
        gender: "male",
        bgColor: "bg-green-600", // 微草绿色
        borderColor: "border-green-700",
        textColor: "text-white",
        introTargets: [
            { target: "wangjiexi", team: "weicao", favorRequire: 25 },
            { target: "fangshiqian", team: "league", favorRequire: 20 },
            { target: "gaoyingjie", team: "weicao", favorRequire: 20 }
        ],
        dialogs: {
            low: ["年轻人，想听听微草建队的故事吗？", "看到现在的职业联盟，真让人感慨万千", "王不留行在那个孩子手里，发扬光大了"],
            mid: ["你是个很有潜力的选手，让我想起了年轻时的自己", "微草的传承，不仅仅是账号卡，更是精神", "有时候看着现在的比赛，还是会手痒"],
            high: ["和你聊天很愉快，让我感觉年轻了许多", "你让我想起了把王不留行交给杰希的那一天", "荣耀的精神，需要你们这样的年轻人传承"],
            love: ["我已经退休了，但看到你，心还是会跳动", "这份感情可能不太合适，但我控制不住自己", "如果你不介意我这个老头子的话……"]
        },
        choices: {
            low: [
                { text: "想听！请林前辈讲讲微草的故事", favorChange: 4 },
                { text: "您对现在的荣耀怎么看？", favorChange: 3 },
                { ignore: -2 }
            ],
            mid: [
                { text: "能听前辈教诲是我的荣幸", favorChange: 5 },
                { text: "微草的精神确实令人敬佩", favorChange: 3 },
                { ignore: -3 }
            ],
            high: [
                { text: "前辈的故事总是让我受益匪浅", favorChange: 5 },
                { text: "荣耀的传承需要前辈们的指引", favorChange: 4 },
                { ignore: -6 }
            ],
            love: [
                { text: "年龄不是问题，我也对前辈有好感", favorChange: 3 },
                { text: "前辈的成熟魅力很吸引人", favorChange: 2 },
                { ignore: -12 }
            ]
        },
        confess: "我这一生最骄傲的两件事：一是创建了微草，二是遇见了你。虽然我已经退役多年，但这份心意是真的。你愿意接受我这个老家伙吗？",
        intimateEvents: [
            "林杰带你去了微草战队的旧址，在月光下分享了他年轻时创建战队的故事，你们的关系在怀旧氛围中变得更加亲密",
            "在联盟的档案馆里，林杰给你看他珍藏的旧照片，讲述着王不留行的传承，那个夜晚你们的心靠得很近",
            "林杰为你准备了一顿温馨的家常菜，在轻松的氛围中，他放下了前辈的架子，展现出真实而温柔的一面"
        ]
    },

    // 方士谦 - 微草治疗之神（绿色系）
    fangshiqian: {
        name: "方士谦",
        team: "league",
        gender: "male",
        bgColor: "bg-green-500", // 微草绿色
        borderColor: "border-green-600",
        textColor: "text-white",
        introTargets: [
            { target: "wangjiexi", team: "weicao", favorRequire: 25 },
            { target: "linjie", team: "league", favorRequire: 20 },
            { target: "gaoyingjie", team: "weicao", favorRequire: 20 },
            { target: "yuanbaiqing", team: "weicao", favorRequire: 20 }
        ],
        dialogs: {
            low: ["治疗之神在此，有什么问题尽管问", "现在的治疗选手，还是太嫩了", "双治疗职业精通？那可是我的专利"],
            mid: ["你的治疗意识还不错，有点我当年的影子", "冬虫夏草和防风，都是我精心培养的孩子", "王杰希那小子，现在应该很想念我吧"],
            high: ["能遇到理解双治疗精髓的人，真不容易", "你让我想起了巅峰时期的自己", "有时候真想复出，再打一场"],
            love: ["治疗可以治愈伤口，但治愈不了对你的思念", "我治过那么多人，却治不好自己的心病", "你愿意做我的专属病人吗？"]
        },
        choices: {
            low: [
                { text: "求治疗之神指点！", favorChange: 4 },
                { text: "双治疗职业真的可能吗？", favorChange: 3 },
                { ignore: -2 }
            ],
            mid: [
                { text: "能得到您的认可太荣幸了", favorChange: 5 },
                { text: "您当年的比赛我都看过", favorChange: 3 },
                { ignore: -3 }
            ],
            high: [
                { text: "您永远是治疗职业的巅峰", favorChange: 5 },
                { text: "真希望能看您再打一场", favorChange: 4 },
                { ignore: -6 }
            ],
            love: [
                { text: "我愿意做您的专属病人", favorChange: 3 },
                { text: "您能治愈我的心", favorChange: 2 },
                { ignore: -12 }
            ]
        },
        confess: "我这个人，巅峰时退役，不想看到自己状态下滑。但在你面前，我愿意展现最真实的自己，哪怕不再完美。你愿意接受这个曾经的治疗之神吗？",
        intimateEvents: [
            "方士谦在联盟医疗室给你演示双治疗技巧时，不知不觉靠得很近，治疗之神的专业魅力让你心跳加速",
            "他带你去了一家安静的茶馆，在茶香中分享治疗之道的精髓，那个夜晚的交流让你们的关系更加特别",
            "方士谦难得地放下了傲娇的一面，在星空下向你倾诉退役后的心情，你们的关系变得更加亲密"
        ]
    },

    // 吴雪峰 - 嘉世三连冠副队长（红色系）
    wuxuefeng: {
        name: "吴雪峰",
        team: "league",
        gender: "male",
        bgColor: "bg-red-500", // 嘉世红色
        borderColor: "border-red-600",
        textColor: "text-white",
        introTargets: [
            { target: "yexiu", team: "happy", favorRequire: 25 },
            { target: "sumucheng", team: "happy", favorRequire: 20 },
            { target: "qiufei", team: "jiashi", favorRequire: 20 }
        ],
        dialogs: {
            low: ["嘉世三连冠的岁月，真是令人怀念", "叶修那小子，现在过得怎么样？", "气冲云水，是我最骄傲的伙伴"],
            mid: ["你的战术意识不错，有点像当年的我", "和叶修配合，最重要的是信任", "看到现在的嘉世，心情很复杂"],
            high: ["能遇到理解团队配合重要性的人，很难得", "你让我想起了嘉世最辉煌的岁月", "有时候真想回到赛场，再打一场"],
            love: ["我辅助过叶修拿下三连冠，现在想辅助你的人生", "气功可以推开敌人，却推不开对你的思念", "你愿意让我成为你生命中的最佳搭档吗？"]
        },
        choices: {
            low: [
                { text: "想听您讲嘉世三连冠的故事", favorChange: 4 },
                { text: "您和叶神当年是怎么配合的？", favorChange: 3 },
                { ignore: -2 }
            ],
            mid: [
                { text: "能得到您的指导太荣幸了", favorChange: 5 },
                { text: "您的团队配合是教科书级的", favorChange: 3 },
                { ignore: -3 }
            ],
            high: [
                { text: "您永远是团队配合的典范", favorChange: 5 },
                { text: "真希望能看您和叶神再配合一次", favorChange: 4 },
                { ignore: -6 }
            ],
            love: [
                { text: "您就是我生命中的最佳搭档", favorChange: 3 },
                { text: "我想和您配合一生", favorChange: 2 },
                { ignore: -12 }
            ]
        },
        confess: "我这个人，习惯了在幕后支持别人。但在你面前，我想走到台前，成为你生命中最重要的那个人。你愿意给我这个机会吗？",
        intimateEvents: [
            "吴雪峰在战术分析室为你重现嘉世三连冠的经典配合，在专业的氛围中，你们的心灵产生了奇妙的共鸣",
            "他带你去了一家老字号的点心店，在轻松的氛围中分享当年和叶修并肩作战的趣事，那个夜晚很温暖",
            "吴雪峰展现了他细腻体贴的一面，为你解决了战术难题后，在深夜的办公室里，你们的距离悄然拉近"
        ]
    },

    // 郭明宇 - 皇风首任队长（琥珀色系）
    guomingyu: {
        name: "郭明宇",
        team: "league",
        gender: "male",
        bgColor: "bg-amber-600", // 皇风琥珀色
        borderColor: "border-amber-700",
        textColor: "text-white",
        introTargets: [
            { target: "tiansen", team: "huangfeng", favorRequire: 25 },
            { target: "luliang", team: "league", favorRequire: 20 },
            { target: "yexiu", team: "happy", favorRequire: 20 }
        ],
        dialogs: {
            low: ["第一赛季的决赛，我到现在还记得", "扫地焚香，是我一生的骄傲", "皇风虽然输了，但我们打得很精彩"],
            mid: ["你的操作很有气势，有我当年的影子", "和叶修对决，是我职业生涯最难忘的经历", "看到现在的驱魔师选手，很欣慰"],
            high: ["能遇到理解驱魔师精髓的人，不容易", "你让我想起了那个热血的年代", "有时候真想回到赛场，再和叶修打一场"],
            love: ["我用驱魔符咒困住过无数对手，却困不住自己的心", "扫地焚香可以扫地，却扫不清对你的思念", "你愿意让我这个老将，守护你一生吗？"]
        },
        choices: {
            low: [
                { text: "想听您讲第一赛季的故事", favorChange: 4 },
                { text: "您当年和叶神对决是什么感觉？", favorChange: 3 },
                { ignore: -2 }
            ],
            mid: [
                { text: "能得到您的认可太荣幸了", favorChange: 5 },
                { text: "您是驱魔师的先驱", favorChange: 3 },
                { ignore: -3 }
            ],
            high: [
                { text: "您永远是驱魔师的传奇", favorChange: 5 },
                { text: "真希望能看您再打一场", favorChange: 4 },
                { ignore: -6 }
            ],
            love: [
                { text: "我愿意让您守护一生", favorChange: 3 },
                { text: "您在我心中永远是传奇", favorChange: 2 },
                { ignore: -12 }
            ]
        },
        confess: "我这个人，拿过亚军，经历过失败。但在你面前，我找到了重新站起来的勇气。你愿意和这个曾经失败的老将一起，创造新的胜利吗？",
        intimateEvents: [
            "郭明宇在训练场演示扫地焚香的经典操作时，那份专注和热情深深吸引了你，训练后的交流让你们更加了解彼此",
            "他带你去了一家传统武馆，在古朴的环境中讲述驱魔师的历史，那个夜晚的对话让你们的感情更加深厚",
            "郭明宇难得地聊起了第一赛季决赛的心路历程，在坦诚的分享中，你们的关系变得更加亲密无间"
        ]
    },

    // 吕良 - 扫地焚香继承者（琥珀色系）
    luliang: {
        name: "吕良",
        team: "league",
        gender: "male",
        bgColor: "bg-amber-500", // 皇风琥珀色
        borderColor: "border-amber-600",
        textColor: "text-white",
        introTargets: [
            { target: "guomingyu", team: "league", favorRequire: 20 },
            { target: "tiansen", team: "huangfeng", favorRequire: 20 },
            { target: "gaicaijie", team: "xukong", favorRequire: 20 }
        ],
        dialogs: {
            low: ["继承扫地焚香，是我最大的荣幸", "第三赛季的全明星，记忆犹新", "驱魔师的传承，需要年轻人继续"],
            mid: ["你的驱魔师操作很有潜力", "接过前辈的账号卡，压力很大，但也很光荣", "看到现在的驱魔师选手，很欣慰"],
            high: ["能遇到理解驱魔师传承的人，很难得", "你让我想起了接过扫地焚香的那一天", "有时候真想回到赛场，再证明一次自己"],
            love: ["我继承了扫地焚香，现在想继承你的心", "驱魔可以驱散邪祟，却驱不散对你的思念", "你愿意让我这个传承者，传承我们的爱情吗？"]
        },
        choices: {
            low: [
                { text: "想听您讲继承扫地焚香的故事", favorChange: 4 },
                { text: "继承传奇账号是什么感觉？", favorChange: 3 },
                { ignore: -2 }
            ],
            mid: [
                { text: "能得到您的指导太荣幸了", favorChange: 5 },
                { text: "您把扫地焚香发扬光大了", favorChange: 3 },
                { ignore: -3 }
            ],
            high: [
                { text: "您是优秀的传承者", favorChange: 5 },
                { text: "真希望能看您再操作扫地焚香", favorChange: 4 },
                { ignore: -6 }
            ],
            love: [
                { text: "我愿意让您传承我的心", favorChange: 3 },
                { text: "我们的爱情需要传承", favorChange: 2 },
                { ignore: -12 }
            ]
        },
        confess: "我这个人，继承了传奇账号，也继承了前辈的期望。但在你面前，我只想做最真实的自己。你愿意接受这个努力传承的选手吗？",
        intimateEvents: [
            "吕良耐心地指导你驱魔师的操作技巧，那份认真和传承精神让你感动，训练后的谈心让感情升温",
            "他带你去看了他收藏的历代驱魔师装备，在分享传承故事时，你们的心灵产生了深深的共鸣",
            "吕良在星空下向你倾诉继承扫地焚香的压力和荣耀，那个夜晚的坦诚让你们的关系更加牢固"
        ]
    },

    // 伍晨 - 前无极队长，现兴欣公会管理（蓝色系，无极/雷霆颜色）
    wuchen: {
        name: "伍晨",
        team: "league",
        gender: "male",
        bgColor: "bg-blue-500", // 无极/雷霆蓝色
        borderColor: "border-blue-600",
        textColor: "text-white",
        introTargets: [
            { target: "yexiu", team: "happy", favorRequire: 20 },
            { target: "chenguo", team: "happy", favorRequire: 20 },
            { target: "sumucheng", team: "happy", favorRequire: 20 }
        ],
        dialogs: {
            low: ["从职业选手到公会管理，我经历了太多", "晓枪现在在兴欣，过得很好", "无极战队虽然解散了，但记忆还在"],
            mid: ["你的公会管理意识不错", "和兴欣合作，是我最正确的决定", "看到现在的公会发展，很欣慰"],
            high: ["能遇到理解公会管理重要性的人，很难得", "你让我想起了管理无极战队的日子", "有时候真想回到赛场，再当一次队长"],
            love: ["我管理过战队，也管理过公会，现在想管理你的心", "枪炮可以远程攻击，却攻击不到你的心房", "你愿意让我这个转型选手，陪伴你一生吗？"]
        },
        choices: {
            low: [
                { text: "想听您讲无极战队的故事", favorChange: 4 },
                { text: "从选手转型管理是什么感觉？", favorChange: 3 },
                { ignore: -2 }
            ],
            mid: [
                { text: "能得到您的指导太荣幸了", favorChange: 5 },
                { text: "您的转型很成功", favorChange: 3 },
                { ignore: -3 }
            ],
            high: [
                { text: "您是成功的转型典范", favorChange: 5 },
                { text: "真希望能看您再操作晓枪", favorChange: 4 },
                { ignore: -6 }
            ],
            love: [
                { text: "我愿意让您管理我的心", favorChange: 3 },
                { text: "您在我心中很特别", favorChange: 2 },
                { ignore: -12 }
            ]
        },
        confess: "我这个人，经历过战队的解散，也经历过转型的艰难。但在你面前，我找到了新的方向。你愿意和这个不断适应的选手，一起走向未来吗？",
        intimateEvents: [
            "伍晨在公会管理室耐心教你运营技巧，那份细致和责任心让你欣赏，工作后的交流让感情自然发展",
            "他带你去了一家网咖，在熟悉的游戏氛围中分享从选手到管理者的心路历程，那个夜晚很轻松愉快",
            "伍晨展现了他务实而可靠的一面，在帮你解决实际问题后，你们的距离在默契中悄然拉近"
        ]
    },

    // 邓复升 - 前微草骑士（绿色系）
    dengfusheng: {
        name: "邓复升",
        team: "league",
        gender: "male",
        bgColor: "bg-green-700", // 微草绿色
        borderColor: "border-green-800",
        textColor: "text-white",
        introTargets: [
            { target: "wangjiexi", team: "weicao", favorRequire: 25 },
            { target: "fangshiqian", team: "league", favorRequire: 20 },
            { target: "xubin", team: "weicao", favorRequire: 20 },
            { target: "gaoyingjie", team: "weicao", favorRequire: 20 },
            { target: "yangcong", team: "sanyiling", favorRequire: 20 }
        ],
        dialogs: {
            low: ["我是邓复升，前微草战队的骑士", "潮汐现在在皇风，用得还不错", "微草的双治疗+骑士体系，当年很坚固"],
            mid: ["你的骑士操作很稳健，有潜力", "和方士谦、王杰希配合的日子，很难忘", "看到微草现在的骑士，很欣慰"],
            high: ["能遇到理解骑士重要性的人，不容易", "你让我想起了守护微草防线的日子", "有时候看到比赛，手还是会痒"],
            love: ["我用盾牌守护过微草，现在想守护你", "骑士可以格挡攻击，却挡不住对你的心动", "你愿意让这个老骑士，成为你一生的守护者吗？"]
        },
        choices: {
            low: [
                { text: "邓前辈好！您的骑士很厉害", favorChange: 4 },
                { text: "潮汐是很好的骑士账号", favorChange: 3 },
                { ignore: -2 }
            ],
            mid: [
                { text: "能得到您的认可太荣幸了", favorChange: 5 },
                { text: "您的防守是教科书级别", favorChange: 3 },
                { ignore: -3 }
            ],
            high: [
                { text: "您永远是骑士的典范", favorChange: 5 },
                { text: "想向您学习防守技巧", favorChange: 4 },
                { ignore: -6 }
            ],
            love: [
                { text: "我愿意让您守护一生", favorChange: 3 },
                { text: "您的稳重很吸引人", favorChange: 2 },
                { ignore: -12 }
            ]
        },
        confess: "我这个人，在赛场上习惯了默默守护队友。但在你面前，我想走到前方，勇敢表达我的心意。你愿意接受这个总是站在后方的骑士吗？",
        intimateEvents: [
            "邓复升在训练场耐心教你骑士的格挡技巧，那份稳重和可靠让你安心，训练后的深夜交流让感情自然发展",
            "他带你去了一家传统的茶馆，在宁静的氛围中分享微草时期的防守心得，那个夜晚的对话让关系更加亲密",
            "在联盟的战术研讨会上，邓复升展现了他深厚的防守理解，会后单独为你解惑时，你们的距离在专业交流中拉近"
        ]
    },

    // 李艺博 - 前霸图选手，现解说（黑色系）
    liyibo: {
        name: "李艺博",
        team: "league",
        gender: "male",
        bgColor: "bg-black", // 霸图黑色
        borderColor: "border-gray-800",
        textColor: "text-white",
        introTargets: [
            { target: "hanwenqing", team: "batu", favorRequire: 25 },
            { target: "zhangxinjie", team: "batu", favorRequire: 20 },
            { target: "linjingyan", team: "batu", favorRequire: 20 },
            { target: "yuwenzhou", team: "lanyu", favorRequire: 20 },
            { target: "huangshaotian", team: "lanyu", favorRequire: 20 }
        ],
        dialogs: {
            low: ["我是李艺博，现在的荣耀解说", "你经常看荣耀比赛吗？我可是专业解说", "望山云雾，是我当年的账号卡，元素法师"],
            mid: ["你的游戏理解不错，有当解说的潜质", "从选手到解说，我经历了很大的转型", "有时候解说比赛，还是会想起当年打职业的日子"],
            high: ["和你讨论比赛很有趣，你很有见解", "解说这么多年，你是少数能跟上我思路的人", "看到你的进步，让我想起了年轻时的自己"],
            love: ["我解说过无数场比赛，却解说不清对你的感觉", "麦克风可以让全场听到我的声音，却传不到你心里", "你愿意让这个前选手现解说，为你解说一生的幸福吗？"]
        },
        choices: {
            low: [
                { text: "李指导好！我经常看您的解说", favorChange: 4 },
                { text: "您当年的元素法师厉害吗？", favorChange: 3 },
                { ignore: -2 }
            ],
            mid: [
                { text: "能得到您的认可太荣幸了", favorChange: 5 },
                { text: "您的解说很专业", favorChange: 3 },
                { ignore: -3 }
            ],
            high: [
                { text: "您的分析总是很精准", favorChange: 5 },
                { text: "想向您学习比赛解读", favorChange: 4 },
                { ignore: -6 }
            ],
            love: [
                { text: "我愿意听您解说我的人生", favorChange: 3 },
                { text: "您的声音让我心动", favorChange: 2 },
                { ignore: -12 }
            ]
        },
        confess: "我这个人，从选手到解说，一直在用嘴说话。但在你面前，我却常常词不达意。你愿意让这个靠说话为生的人，用一生向你诉说真心吗？",
        intimateEvents: [
            "李艺博在解说间为你单独解说了一场经典比赛，专业而迷人的声音让你沉醉，解说结束后的深夜交流让感情升温",
            "他带你去了一家安静的咖啡馆，在轻松的氛围中分享从选手转型解说的心路历程，那个夜晚的坦诚让关系更加亲密",
            "在联盟的庆功宴后，李艺博微醺中向你吐露了解说背后的压力与孤独，你们的距离在理解中悄然拉近"
        ]
    }

  };

console.log('NPC数据加载完成，包含', Object.keys(npcData).length, '个角色');



console.log('数据就绪');
