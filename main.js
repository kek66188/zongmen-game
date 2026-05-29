(() => {
  "use strict";

  const DEBUG_BALANCE = false;
  const DEBUG_BOUNDS = false;
  const UI_SAFE_TOP = 54;
  const UI_SAFE_BOTTOM = 96;
  const BATTLE_TOP_GAP = 8;
  const LEVEL_CONFIG = {
    level1: {
      id: "level1",
      order: 1,
      name: "山门初守",
      description: "妖潮初现，守住取经山门。",
      duration: 120,
      maxEnemies: 80,
      wallHp: 160,
      startExp: 8,
      baseExpNeed: 15,
      expGrowth: 1.18,
      enemyHpMultiplier: 1,
      enemySpeedMultiplier: 1,
      spawnMultiplier: 1,
      rewardMultiplier: 1,
      unlockRequired: null,
      newbieProtectionSeconds: 15,
      emergencyHealThreshold: 0.4,
      emergencyHealAmount: 30,
      enemyHpMaxMultiplier: 1.6,
      enemySpeedMaxMultiplier: 1.3,
      phases: [
        { time: 0, text: "妖潮初现" },
        { time: 20, text: "妖气渐浓" },
        { time: 40, text: "巨妖来袭" },
        { time: 70, text: "妖潮汹涌" },
        { time: 95, text: "最后冲击" },
        { time: 110, text: "山门决战" },
      ],
      spawnProfiles: [
        { start: 0, end: 20, intervalMin: 1.3, intervalMax: 1.6, extraChance: 0, weights: { imp: 1 } },
        { start: 20, end: 40, intervalMin: 1.1, intervalMax: 1.3, extraChance: 0, weights: { imp: 0.82, runner: 0.18 } },
        { start: 40, end: 70, intervalMin: 0.9, intervalMax: 1.1, extraChance: 0.05, weights: { imp: 0.58, runner: 0.2, shield: 0.1, brute: 0.12 } },
        { start: 70, end: 95, intervalMin: 0.75, intervalMax: 0.95, extraChance: 0.12, weights: { imp: 0.42, runner: 0.27, shield: 0.16, brute: 0.15 } },
        { start: 95, end: 120, intervalMin: 0.6, intervalMax: 0.8, extraChance: 0.18, weights: { imp: 0.4, runner: 0.3, shield: 0.16, brute: 0.14 } },
      ],
    },
    level2: {
      id: "level2",
      order: 2,
      name: "妖雾山道",
      description: "妖雾弥漫，疾行妖开始频繁出没。",
      duration: 135,
      maxEnemies: 90,
      wallHp: 160,
      startExp: 8,
      baseExpNeed: 16,
      expGrowth: 1.19,
      enemyHpMultiplier: 1.08,
      enemySpeedMultiplier: 1.03,
      spawnMultiplier: 1.05,
      rewardMultiplier: 1.15,
      unlockRequired: "level1",
      newbieProtectionSeconds: 12,
      emergencyHealThreshold: 0.4,
      emergencyHealAmount: 28,
      enemyHpMaxMultiplier: 1.58,
      enemySpeedMaxMultiplier: 1.28,
      phases: [
        { time: 0, text: "妖雾弥漫" },
        { time: 25, text: "影妖疾行" },
        { time: 55, text: "雾中妖影" },
        { time: 90, text: "护盾妖现" },
        { time: 120, text: "山道决战" },
      ],
      spawnProfiles: [
        { start: 0, end: 25, intervalMin: 1.35, intervalMax: 1.6, extraChance: 0, weights: { imp: 0.86, runner: 0.14 } },
        { start: 25, end: 55, intervalMin: 1.12, intervalMax: 1.32, extraChance: 0.04, weights: { imp: 0.62, runner: 0.32, shield: 0.06 } },
        { start: 55, end: 90, intervalMin: 0.92, intervalMax: 1.12, extraChance: 0.08, weights: { imp: 0.5, runner: 0.34, shield: 0.1, brute: 0.06 } },
        { start: 90, end: 120, intervalMin: 0.76, intervalMax: 0.96, extraChance: 0.14, weights: { imp: 0.42, runner: 0.36, shield: 0.14, brute: 0.08 } },
        { start: 120, end: 135, intervalMin: 0.64, intervalMax: 0.82, extraChance: 0.18, weights: { imp: 0.38, runner: 0.4, shield: 0.14, brute: 0.08 } },
      ],
    },
    level3: {
      id: "level3",
      order: 3,
      name: "巨妖压境",
      description: "巨妖踏破山路，山门防线承压。",
      duration: 150,
      maxEnemies: 95,
      wallHp: 165,
      startExp: 10,
      baseExpNeed: 17,
      expGrowth: 1.2,
      enemyHpMultiplier: 1.16,
      enemySpeedMultiplier: 1.05,
      spawnMultiplier: 1.1,
      rewardMultiplier: 1.25,
      unlockRequired: "level2",
      newbieProtectionSeconds: 10,
      emergencyHealThreshold: 0.38,
      emergencyHealAmount: 28,
      enemyHpMaxMultiplier: 1.56,
      enemySpeedMaxMultiplier: 1.26,
      phases: [
        { time: 0, text: "地动山摇" },
        { time: 30, text: "巨妖集结" },
        { time: 65, text: "山门承压" },
        { time: 105, text: "妖潮冲阵" },
        { time: 135, text: "巨妖压境" },
      ],
      spawnProfiles: [
        { start: 0, end: 30, intervalMin: 1.35, intervalMax: 1.58, extraChance: 0, weights: { imp: 0.82, runner: 0.12, brute: 0.06 } },
        { start: 30, end: 65, intervalMin: 1.08, intervalMax: 1.3, extraChance: 0.04, weights: { imp: 0.58, runner: 0.16, brute: 0.22, shield: 0.04 } },
        { start: 65, end: 105, intervalMin: 0.88, intervalMax: 1.08, extraChance: 0.1, weights: { imp: 0.45, runner: 0.16, brute: 0.3, shield: 0.09 } },
        { start: 105, end: 135, intervalMin: 0.72, intervalMax: 0.92, extraChance: 0.15, weights: { imp: 0.38, runner: 0.18, brute: 0.32, shield: 0.12 } },
        { start: 135, end: 150, intervalMin: 0.62, intervalMax: 0.8, extraChance: 0.2, weights: { imp: 0.35, runner: 0.18, brute: 0.34, shield: 0.13 } },
      ],
    },
    level4: {
      id: "level4",
      order: 4,
      name: "乱石古道",
      description: "妖物借乱石掩护突袭山门。",
      duration: 150,
      maxEnemies: 100,
      wallHp: 165,
      startExp: 10,
      baseExpNeed: 18,
      expGrowth: 1.21,
      enemyHpMultiplier: 1.25,
      enemySpeedMultiplier: 1.07,
      spawnMultiplier: 1.15,
      rewardMultiplier: 1.35,
      unlockRequired: "level3",
      newbieProtectionSeconds: 10,
      emergencyHealThreshold: 0.38,
      emergencyHealAmount: 26,
      enemyHpMaxMultiplier: 1.54,
      enemySpeedMaxMultiplier: 1.25,
      phases: [
        { time: 0, text: "乱石生妖" },
        { time: 30, text: "伏妖突袭" },
        { time: 70, text: "石道围攻" },
        { time: 110, text: "妖影压近" },
        { time: 138, text: "古道死守" },
      ],
      spawnProfiles: [
        { start: 0, end: 30, intervalMin: 1.3, intervalMax: 1.55, extraChance: 0, weights: { imp: 0.78, runner: 0.1, shield: 0.12 } },
        { start: 30, end: 70, intervalMin: 1.04, intervalMax: 1.24, extraChance: 0.06, weights: { imp: 0.5, runner: 0.18, shield: 0.24, brute: 0.08 } },
        { start: 70, end: 110, intervalMin: 0.84, intervalMax: 1.02, extraChance: 0.12, weights: { imp: 0.42, runner: 0.2, shield: 0.28, brute: 0.1 } },
        { start: 110, end: 138, intervalMin: 0.7, intervalMax: 0.88, extraChance: 0.18, weights: { imp: 0.36, runner: 0.24, shield: 0.28, brute: 0.12 } },
        { start: 138, end: 150, intervalMin: 0.6, intervalMax: 0.78, extraChance: 0.22, weights: { imp: 0.34, runner: 0.26, shield: 0.28, brute: 0.12 } },
      ],
    },
    level5: {
      id: "level5",
      order: 5,
      name: "黑风峡口",
      description: "黑风卷地，疾行妖数量明显增加。",
      duration: 165,
      maxEnemies: 105,
      wallHp: 170,
      startExp: 12,
      baseExpNeed: 19,
      expGrowth: 1.22,
      enemyHpMultiplier: 1.35,
      enemySpeedMultiplier: 1.1,
      spawnMultiplier: 1.2,
      rewardMultiplier: 1.5,
      unlockRequired: "level4",
      newbieProtectionSeconds: 10,
      emergencyHealThreshold: 0.36,
      emergencyHealAmount: 26,
      enemyHpMaxMultiplier: 1.52,
      enemySpeedMaxMultiplier: 1.24,
      phases: [
        { time: 0, text: "黑风骤起" },
        { time: 35, text: "疾影穿峡" },
        { time: 75, text: "妖风裂阵" },
        { time: 120, text: "峡口围杀" },
        { time: 150, text: "黑风决战" },
      ],
      spawnProfiles: [
        { start: 0, end: 35, intervalMin: 1.28, intervalMax: 1.5, extraChance: 0, weights: { imp: 0.76, runner: 0.2, shield: 0.04 } },
        { start: 35, end: 75, intervalMin: 1.0, intervalMax: 1.2, extraChance: 0.08, weights: { imp: 0.44, runner: 0.42, shield: 0.08, brute: 0.06 } },
        { start: 75, end: 120, intervalMin: 0.82, intervalMax: 1.0, extraChance: 0.14, weights: { imp: 0.36, runner: 0.46, shield: 0.1, brute: 0.08 } },
        { start: 120, end: 150, intervalMin: 0.68, intervalMax: 0.86, extraChance: 0.2, weights: { imp: 0.32, runner: 0.5, shield: 0.1, brute: 0.08 } },
        { start: 150, end: 165, intervalMin: 0.56, intervalMax: 0.74, extraChance: 0.24, weights: { imp: 0.32, runner: 0.5, shield: 0.1, brute: 0.08 } },
      ],
    },
    level6: {
      id: "level6",
      order: 6,
      name: "血月妖潮",
      description: "血月升起，妖潮数量暴涨。",
      duration: 165,
      maxEnemies: 110,
      wallHp: 170,
      startExp: 12,
      baseExpNeed: 20,
      expGrowth: 1.23,
      enemyHpMultiplier: 1.48,
      enemySpeedMultiplier: 1.12,
      spawnMultiplier: 1.28,
      rewardMultiplier: 1.7,
      unlockRequired: "level5",
      newbieProtectionSeconds: 10,
      emergencyHealThreshold: 0.36,
      emergencyHealAmount: 25,
      enemyHpMaxMultiplier: 1.5,
      enemySpeedMaxMultiplier: 1.23,
      phases: [
        { time: 0, text: "血月升空" },
        { time: 35, text: "群妖躁动" },
        { time: 75, text: "妖潮暴涨" },
        { time: 120, text: "血月压境" },
        { time: 150, text: "百妖冲门" },
      ],
      spawnProfiles: [
        { start: 0, end: 35, intervalMin: 1.25, intervalMax: 1.48, extraChance: 0.02, weights: { imp: 0.9, runner: 0.1 } },
        { start: 35, end: 75, intervalMin: 0.98, intervalMax: 1.18, extraChance: 0.12, weights: { imp: 0.72, runner: 0.18, shield: 0.06, brute: 0.04 } },
        { start: 75, end: 120, intervalMin: 0.78, intervalMax: 0.96, extraChance: 0.22, weights: { imp: 0.66, runner: 0.2, shield: 0.08, brute: 0.06 } },
        { start: 120, end: 150, intervalMin: 0.62, intervalMax: 0.8, extraChance: 0.3, weights: { imp: 0.62, runner: 0.22, shield: 0.1, brute: 0.06 } },
        { start: 150, end: 165, intervalMin: 0.5, intervalMax: 0.68, extraChance: 0.36, weights: { imp: 0.6, runner: 0.22, shield: 0.1, brute: 0.08 } },
      ],
    },
    level7: {
      id: "level7",
      order: 7,
      name: "破阵妖军",
      description: "护盾妖结阵而来，法术破阵成为关键。",
      duration: 180,
      maxEnemies: 115,
      wallHp: 175,
      startExp: 14,
      baseExpNeed: 21,
      expGrowth: 1.24,
      enemyHpMultiplier: 1.62,
      enemySpeedMultiplier: 1.14,
      spawnMultiplier: 1.34,
      rewardMultiplier: 1.9,
      unlockRequired: "level6",
      newbieProtectionSeconds: 10,
      emergencyHealThreshold: 0.35,
      emergencyHealAmount: 25,
      enemyHpMaxMultiplier: 1.48,
      enemySpeedMaxMultiplier: 1.22,
      phases: [
        { time: 0, text: "妖军列阵" },
        { time: 40, text: "护盾成群" },
        { time: 85, text: "破阵之战" },
        { time: 130, text: "妖军压门" },
        { time: 165, text: "法阵将破" },
      ],
      spawnProfiles: [
        { start: 0, end: 40, intervalMin: 1.25, intervalMax: 1.48, extraChance: 0.02, weights: { imp: 0.72, runner: 0.1, shield: 0.16, brute: 0.02 } },
        { start: 40, end: 85, intervalMin: 0.98, intervalMax: 1.16, extraChance: 0.12, weights: { imp: 0.4, runner: 0.14, shield: 0.38, brute: 0.08 } },
        { start: 85, end: 130, intervalMin: 0.78, intervalMax: 0.96, extraChance: 0.22, weights: { imp: 0.32, runner: 0.16, shield: 0.42, brute: 0.1 } },
        { start: 130, end: 165, intervalMin: 0.62, intervalMax: 0.82, extraChance: 0.3, weights: { imp: 0.3, runner: 0.18, shield: 0.4, brute: 0.12 } },
        { start: 165, end: 180, intervalMin: 0.5, intervalMax: 0.7, extraChance: 0.36, weights: { imp: 0.28, runner: 0.18, shield: 0.42, brute: 0.12 } },
      ],
    },
    level8: {
      id: "level8",
      order: 8,
      name: "万妖围山",
      description: "万妖围山，持续清场能力将决定生死。",
      duration: 180,
      maxEnemies: 120,
      wallHp: 175,
      startExp: 14,
      baseExpNeed: 22,
      expGrowth: 1.25,
      enemyHpMultiplier: 1.78,
      enemySpeedMultiplier: 1.16,
      spawnMultiplier: 1.42,
      rewardMultiplier: 2.15,
      unlockRequired: "level7",
      newbieProtectionSeconds: 10,
      emergencyHealThreshold: 0.35,
      emergencyHealAmount: 24,
      enemyHpMaxMultiplier: 1.46,
      enemySpeedMaxMultiplier: 1.21,
      phases: [
        { time: 0, text: "万妖围山" },
        { time: 40, text: "四面妖影" },
        { time: 85, text: "山门告急" },
        { time: 130, text: "妖潮漫山" },
        { time: 165, text: "死守山门" },
      ],
      spawnProfiles: [
        { start: 0, end: 40, intervalMin: 1.22, intervalMax: 1.45, extraChance: 0.04, weights: { imp: 0.68, runner: 0.18, shield: 0.1, brute: 0.04 } },
        { start: 40, end: 85, intervalMin: 0.95, intervalMax: 1.14, extraChance: 0.16, weights: { imp: 0.44, runner: 0.28, shield: 0.2, brute: 0.08 } },
        { start: 85, end: 130, intervalMin: 0.74, intervalMax: 0.94, extraChance: 0.28, weights: { imp: 0.38, runner: 0.3, shield: 0.22, brute: 0.1 } },
        { start: 130, end: 165, intervalMin: 0.58, intervalMax: 0.78, extraChance: 0.38, weights: { imp: 0.36, runner: 0.3, shield: 0.24, brute: 0.1 } },
        { start: 165, end: 180, intervalMin: 0.48, intervalMax: 0.66, extraChance: 0.45, weights: { imp: 0.34, runner: 0.32, shield: 0.24, brute: 0.1 } },
      ],
    },
    level9: {
      id: "level9",
      order: 9,
      name: "天门将破",
      description: "山门将破，巨妖与护盾妖联手压境。",
      duration: 195,
      maxEnemies: 125,
      wallHp: 180,
      startExp: 16,
      baseExpNeed: 23,
      expGrowth: 1.26,
      enemyHpMultiplier: 1.95,
      enemySpeedMultiplier: 1.18,
      spawnMultiplier: 1.5,
      rewardMultiplier: 2.45,
      unlockRequired: "level8",
      newbieProtectionSeconds: 10,
      emergencyHealThreshold: 0.34,
      emergencyHealAmount: 24,
      enemyHpMaxMultiplier: 1.44,
      enemySpeedMaxMultiplier: 1.2,
      phases: [
        { time: 0, text: "天门震颤" },
        { time: 45, text: "巨妖踏山" },
        { time: 95, text: "护盾妖阵" },
        { time: 145, text: "山门将破" },
        { time: 180, text: "天门死战" },
      ],
      spawnProfiles: [
        { start: 0, end: 45, intervalMin: 1.2, intervalMax: 1.42, extraChance: 0.05, weights: { imp: 0.62, runner: 0.12, shield: 0.14, brute: 0.12 } },
        { start: 45, end: 95, intervalMin: 0.92, intervalMax: 1.12, extraChance: 0.18, weights: { imp: 0.32, runner: 0.12, shield: 0.26, brute: 0.3 } },
        { start: 95, end: 145, intervalMin: 0.72, intervalMax: 0.92, extraChance: 0.3, weights: { imp: 0.28, runner: 0.12, shield: 0.32, brute: 0.28 } },
        { start: 145, end: 180, intervalMin: 0.56, intervalMax: 0.76, extraChance: 0.4, weights: { imp: 0.26, runner: 0.14, shield: 0.34, brute: 0.26 } },
        { start: 180, end: 195, intervalMin: 0.46, intervalMax: 0.64, extraChance: 0.48, weights: { imp: 0.24, runner: 0.14, shield: 0.34, brute: 0.28 } },
      ],
    },
    level10: {
      id: "level10",
      order: 10,
      name: "西行决战",
      description: "最终妖潮降临，守住此战即镇妖成功。",
      duration: 210,
      maxEnemies: 130,
      wallHp: 180,
      startExp: 18,
      baseExpNeed: 24,
      expGrowth: 1.27,
      enemyHpMultiplier: 2.15,
      enemySpeedMultiplier: 1.2,
      spawnMultiplier: 1.58,
      rewardMultiplier: 3,
      unlockRequired: "level9",
      newbieProtectionSeconds: 10,
      emergencyHealThreshold: 0.34,
      emergencyHealAmount: 24,
      enemyHpMaxMultiplier: 1.42,
      enemySpeedMaxMultiplier: 1.2,
      phases: [
        { time: 0, text: "终战开启" },
        { time: 45, text: "妖军倾巢" },
        { time: 95, text: "万妖压境" },
        { time: 145, text: "山门血战" },
        { time: 180, text: "最后防线" },
        { time: 200, text: "护山一击" },
      ],
      spawnProfiles: [
        { start: 0, end: 45, intervalMin: 1.18, intervalMax: 1.4, extraChance: 0.06, weights: { imp: 0.55, runner: 0.18, shield: 0.14, brute: 0.13 } },
        { start: 45, end: 95, intervalMin: 0.9, intervalMax: 1.08, extraChance: 0.2, weights: { imp: 0.34, runner: 0.22, shield: 0.22, brute: 0.22 } },
        { start: 95, end: 145, intervalMin: 0.68, intervalMax: 0.88, extraChance: 0.34, weights: { imp: 0.3, runner: 0.24, shield: 0.24, brute: 0.22 } },
        { start: 145, end: 180, intervalMin: 0.54, intervalMax: 0.72, extraChance: 0.44, weights: { imp: 0.28, runner: 0.24, shield: 0.24, brute: 0.24 } },
        { start: 180, end: 200, intervalMin: 0.46, intervalMax: 0.64, extraChance: 0.52, weights: { imp: 0.26, runner: 0.24, shield: 0.25, brute: 0.25 } },
        { start: 200, end: 210, intervalMin: 0.38, intervalMax: 0.56, extraChance: 0.62, weights: { imp: 0.25, runner: 0.25, shield: 0.25, brute: 0.25 } },
      ],
    },
  };
  const LEVEL_REALMS = [
    { start: 1, end: 10, name: "花果山妖乱", phaseText: "花果山妖乱开启" },
    { start: 11, end: 20, name: "高老庄异闻", phaseText: "高老庄妖影现形" },
    { start: 21, end: 30, name: "流沙河妖雾", phaseText: "流沙河妖雾翻涌" },
    { start: 31, end: 40, name: "火焰山终劫", phaseText: "火焰山万妖压境" },
  ];
  const LEVEL_NAMES = [
    "石猴初镇", "林间狐影", "灵田犬嚎", "夜守山门", "小妖成群",
    "寒潭虾影", "蛙僧叩阵", "妖雾压境", "山道伏妖", "黑风试炼",
    "高庄妖潮", "赤虾疾影", "石甲破阵", "毒雾山谷", "灯火焚林",
    "灵脉震荡", "夜叉窥门", "蛙僧妖阵", "群妖叩关", "水猿终劫",
    "流沙魔影", "鸟妖掠空", "咒师结阵", "猪龙压境", "雷云妖潮",
    "血月山门", "咒纹妖师", "九尾裂影", "万妖试炼", "白骨终战",
    "火焰大劫", "吸灵白骨", "冥雾围山", "破盾巨潮", "牛魔前锋",
    "灵墙将碎", "四方妖阵", "妖王亲临", "山门死守", "万妖终劫",
  ];
  const clampSetup = (value, min, max) => Math.max(min, Math.min(max, value));
  const ENEMY_UNLOCK_LEVEL = {
    foxDemon: 1,
    dogDemon: 2,
    shrimpDemon: 3,
    boarDragon: 4,
    frogDemon: 5,
    lampGranny: 12,
    stoneArmor: 13,
    yaksha: 17,
    wingDemon: 22,
    curseMage: 23,
    waterApe: 24,
    nineTailShade: 28,
    blackWind: 32,
    boneDemon: 33,
    bullVanguard: 35,
    bossBlackWind: 10,
    bossYellowWind: 20,
    bossBoneLady: 30,
    bossBullKing: 40,
  };
  const BOSS_LEVELS = {
    10: { type: "bossBlackWind", name: "黑风怪", appearText: "黑风怪来袭！" },
    20: { type: "bossYellowWind", name: "黄风妖王", appearText: "黄风妖王来袭！" },
    30: { type: "bossBoneLady", name: "白骨夫人", appearText: "白骨夫人现身！" },
    40: { type: "bossBullKing", name: "牛魔王", appearText: "牛魔王降临！" },
  };
  const getRealmByOrder = (order) => LEVEL_REALMS.find((realm) => order >= realm.start && order <= realm.end) || LEVEL_REALMS[0];
  const getStageIndexByOrder = (order) => Math.floor((order - 1) / 10);
  const getLevelDuration = (order) => {
    if (order === 1) return 120;
    if (order < 10) return 90;
    if (order === 10) return 120;
    if (order <= 20) return 120;
    if (order <= 30) return 150;
    if (order <= 39) return 180;
    return 210;
  };
  const getLevelHpMultiplier = (order) => {
    if (order <= 10) return 1 + (order - 1) * 0.11;
    if (order <= 20) return 2.1 + (order - 11) * 0.155;
    if (order <= 30) return 3.6 + (order - 21) * 0.21;
    return 5.6 + (order - 31) * 0.32;
  };
  const getAllowedEnemyTypes = (order) => Object.entries(ENEMY_UNLOCK_LEVEL)
    .filter(([id, unlock]) => unlock <= order && !id.startsWith("boss"))
    .map(([id]) => id);
  const getLevelEnemyTypes = (order) => {
    const allowed = new Set(["foxDemon"]);
    if (order >= 2) allowed.add("dogDemon");
    if (order >= 3) allowed.add("shrimpDemon");
    if (order >= 4) allowed.add("boarDragon");
    if (order >= 5) allowed.add("frogDemon");
    if (order >= 12) allowed.add("lampGranny");
    if (order >= 13) allowed.add("stoneArmor");
    if (order >= 17) allowed.add("yaksha");
    if (order >= 22) allowed.add("wingDemon");
    if (order >= 23) allowed.add("curseMage");
    if (order >= 24) allowed.add("waterApe");
    if (order >= 28) allowed.add("nineTailShade");
    if (order >= 32) allowed.add("blackWind");
    if (order >= 33) allowed.add("boneDemon");
    if (order >= 35) allowed.add("bullVanguard");
    return getAllowedEnemyTypes(order).filter((id) => allowed.has(id));
  };
  const buildEnemyWeights = (order, segment) => {
    const weights = { foxDemon: 1 };
    if (order >= 2) weights.dogDemon = 0.12 + segment * 0.035 + (order <= 10 ? 0.04 : 0);
    if (order >= 3) weights.shrimpDemon = 0.12 + segment * 0.05 + (order >= 5 ? 0.08 : 0);
    if (order >= 4) weights.boarDragon = 0.06 + segment * 0.035 + (order % 10 === 3 ? 0.12 : 0);
    if (order >= 5) weights.frogDemon = 0.06 + segment * 0.04 + (order % 10 === 8 ? 0.16 : 0);
    if (order >= 12) weights.lampGranny = 0.05 + segment * 0.025 + (order === 15 ? 0.12 : 0);
    if (order >= 13) weights.stoneArmor = 0.05 + segment * 0.025 + (order === 13 || order === 24 ? 0.14 : 0);
    if (order >= 17) weights.yaksha = 0.035 + segment * 0.02 + (order === 17 || order === 32 ? 0.08 : 0);
    if (order >= 22) weights.wingDemon = 0.05 + segment * 0.025 + (order === 22 ? 0.14 : 0);
    if (order >= 23) weights.curseMage = 0.035 + segment * 0.02 + (order === 23 || order === 27 ? 0.12 : 0);
    if (order >= 24) weights.waterApe = 0.03 + segment * 0.018 + (order === 24 || order === 26 ? 0.12 : 0);
    if (order >= 28) weights.nineTailShade = 0.045 + segment * 0.025 + (order === 28 ? 0.12 : 0);
    if (order >= 32) weights.blackWind = 0.04 + segment * 0.022 + (order === 32 || order === 38 ? 0.1 : 0);
    if (order >= 33) weights.boneDemon = 0.035 + segment * 0.02 + (order === 33 ? 0.1 : 0);
    if (order >= 35) weights.bullVanguard = 0.025 + segment * 0.014 + (order === 35 || order === 38 ? 0.08 : 0);
    if (order % 10 === 9) {
      weights.boarDragon = (weights.boarDragon || 0) + 0.08;
      weights.frogDemon = (weights.frogDemon || 0) + 0.08;
    }
    const allowed = new Set(getLevelEnemyTypes(order));
    for (const key of Object.keys(weights)) {
      if (!allowed.has(key)) delete weights[key];
    }
    return weights;
  };
  const buildSpawnProfiles = (order, duration) => {
    const cuts = [0, 0.22, 0.46, 0.68, 0.86, 1].map((value) => Math.round(duration * value));
    const stage = getStageIndexByOrder(order);
    const baseMin = Math.max(0.62, 1.35 - stage * 0.12 - order * 0.008);
    const pressure = order % 5 === 0 ? 0.08 : 0;
    return Array.from({ length: 5 }, (_, index) => ({
      start: cuts[index],
      end: cuts[index + 1] || duration,
      intervalMin: Math.max(0.42, baseMin - index * 0.14 - pressure),
      intervalMax: Math.max(0.58, baseMin + 0.24 - index * 0.12 - pressure),
      extraChance: clampSetup(0.02 * order + index * 0.08 + (order % 5 === 0 ? 0.08 : 0), 0, 0.68),
      weights: buildEnemyWeights(order, index),
    }));
  };
  const buildPhases = (order, duration, boss) => {
    const realm = getRealmByOrder(order);
    const texts = [
      realm.phaseText,
      order <= 10 ? "妖影渐密" : order <= 20 ? "异妖混入" : order <= 30 ? "魔影结阵" : "大劫压境",
      order % 5 === 0 ? "精英妖潮" : "妖潮转急",
      boss ? boss.appearText : "山门承压",
      order % 10 === 0 ? "终试死守" : "最后冲击",
    ];
    return [
      { time: 0, text: texts[0] },
      { time: Math.round(duration * 0.24), text: texts[1] },
      { time: Math.round(duration * 0.5), text: texts[2] },
      { time: boss ? Math.round(duration * 0.58) : Math.round(duration * 0.74), text: texts[3] },
      { time: Math.max(0, duration - 16), text: texts[4] },
    ];
  };
  const buildLevelConfig = (order) => {
    const id = `level${order}`;
    const duration = getLevelDuration(order);
    const boss = BOSS_LEVELS[order] ? { ...BOSS_LEVELS[order], time: Math.round(duration * 0.58) } : null;
    const hpMultiplier = Number(getLevelHpMultiplier(order).toFixed(2));
    const speedMultiplier = Number((1 + Math.floor((order - 1) / 5) * 0.045).toFixed(2));
    const enemyDamageMultiplier = Number((1 + (order - 1) * 0.055).toFixed(2));
    const spawnMultiplier = Number((1 + (order - 1) * 0.035).toFixed(2));
    const rewardMultiplier = Number((1 + (order - 1) * 0.09).toFixed(2));
    return {
      id,
      order,
      name: LEVEL_NAMES[order - 1],
      realm: getRealmByOrder(order).name,
      recommendedRealm: getRealmByOrder(order).name,
      description: `${getRealmByOrder(order).name}第 ${order} 试，妖潮随阶段逐步增强。`,
      duration,
      maxEnemies: order === 1 ? 80 : Math.min(150, 78 + order * 2),
      wallHp: order === 1 ? 160 : 150 + Math.min(90, order * 3),
      startExp: order === 1 ? 8 : 8 + Math.floor(order / 3),
      baseExpNeed: order === 1 ? 15 : 15 + Math.floor(order * 1.25),
      expGrowth: Number((1.18 + Math.min(0.12, order * 0.002)).toFixed(3)),
      enemyHpMultiplier: hpMultiplier,
      enemySpeedMultiplier: speedMultiplier,
      enemyDamageMultiplier,
      spawnMultiplier,
      rewardMultiplier,
      clearReward: 50 + order * 15 + (boss ? 100 : 0),
      unlockRequired: order === 1 ? null : `level${order - 1}`,
      newbieProtectionSeconds: order <= 10 ? 12 : 8,
      emergencyHealThreshold: order <= 20 ? 0.38 : 0.34,
      emergencyHealAmount: Math.max(18, 30 - Math.floor(order / 3)),
      enemyHpMaxMultiplier: order === 1 ? 1.6 : Number((1.16 + Math.min(0.1, order * 0.002)).toFixed(2)),
      enemySpeedMaxMultiplier: order === 1 ? 1.3 : Number((1.08 + Math.min(0.1, order * 0.002)).toFixed(2)),
      enemyTypes: getLevelEnemyTypes(order),
      eliteChance: order >= 5 ? clampSetup(0.015 * Math.floor(order / 5), 0.02, 0.14) : 0,
      boss,
      phases: buildPhases(order, duration, boss),
      spawnProfiles: buildSpawnProfiles(order, duration),
    };
  };
  for (let order = 1; order <= 40; order += 1) {
    const id = `level${order}`;
    LEVEL_CONFIG[id] = {
      ...(LEVEL_CONFIG[id] || {}),
      ...buildLevelConfig(order),
      ...(order === 1 ? { duration: 120, maxEnemies: 80, wallHp: 160, startExp: 8, baseExpNeed: 15 } : {}),
    };
  }
  Object.assign(LEVEL_CONFIG.level1, {
    name: "石猴初镇",
    description: "花果山外妖影初现，随西游角色守住第一道山门。",
    enemyHpMultiplier: 1,
    enemySpeedMultiplier: 1,
    enemyDamageMultiplier: 1,
    spawnMultiplier: 1,
    rewardMultiplier: 1,
    enemyHpMaxMultiplier: 1.6,
    enemySpeedMaxMultiplier: 1.3,
    enemyTypes: ["foxDemon", "dogDemon", "shrimpDemon", "boarDragon", "frogDemon"],
    phases: [
      { time: 0, text: "妖潮初现" },
      { time: 20, text: "妖气渐浓" },
      { time: 40, text: "巨妖来袭" },
      { time: 70, text: "妖潮汹涌" },
      { time: 95, text: "最后冲击" },
      { time: 110, text: "山门决战" },
    ],
    spawnProfiles: [
      { start: 0, end: 20, intervalMin: 1.3, intervalMax: 1.6, extraChance: 0, weights: { foxDemon: 1 } },
      { start: 20, end: 40, intervalMin: 1.1, intervalMax: 1.3, extraChance: 0, weights: { foxDemon: 0.72, dogDemon: 0.12, shrimpDemon: 0.16 } },
      { start: 40, end: 70, intervalMin: 0.9, intervalMax: 1.1, extraChance: 0.05, weights: { foxDemon: 0.5, dogDemon: 0.15, shrimpDemon: 0.18, frogDemon: 0.08, boarDragon: 0.09 } },
      { start: 70, end: 95, intervalMin: 0.75, intervalMax: 0.95, extraChance: 0.12, weights: { foxDemon: 0.38, dogDemon: 0.18, shrimpDemon: 0.22, frogDemon: 0.11, boarDragon: 0.11 } },
      { start: 95, end: 120, intervalMin: 0.6, intervalMax: 0.8, extraChance: 0.18, weights: { foxDemon: 0.34, dogDemon: 0.2, shrimpDemon: 0.24, frogDemon: 0.11, boarDragon: 0.11 } },
    ],
  });
  const LEVEL_LIST = Object.values(LEVEL_CONFIG).sort((a, b) => a.order - b.order);
  const MAX_PARTICLES = 250;
  const MAX_AURA_PARTICLES = 40;
  const SAVE_VERSION = 1;
  const SAVE_KEY = "zongmen_guardian_save_v1";
  const SAVE_VERSION_KEY = "zmsw_saveVersion";
  const SAVE_KEYS = {
    spiritStone: "zmsw_spiritStone",
    jade: "zmsw_jade",
    highestClearedLevel: "zmsw_highestClearedLevel",
    selectedLevel: "zmsw_selectedLevel",
    bestKills: "zmsw_bestKills",
    bestSurvivalTime: "zmsw_bestSurvivalTime",
    highestPlayerLevel: "zmsw_highestPlayerLevel",
    clearCount: "zmsw_clearCount",
    finalCleared: "zmsw_finalCleared",
    upgrades: "zmsw_upgrades",
    redeemedCodes: "zmsw_redeemedCodes",
    lastDailyRewardDate: "zmsw_lastDailyRewardDate",
    timeScale: "zmsw_timeScale",
    totalRechargeTest: "zmsw_totalRechargeTest",
    selectedHero: "zmsw_selectedHero",
    heroProgress: "zmsw_heroProgress",
    companions: "zmsw_companions",
    companionProgress: "zmsw_companionProgress",
    pendingCompanionInvites: "zmsw_pendingCompanionInvites",
    journeyTraining: "zmsw_journeyTraining",
  };
  const HIGHEST_CLEARED_KEY = SAVE_KEYS.highestClearedLevel;
  const LEGACY_HIGHEST_CLEARED_KEY = "highestClearedLevel";
  const TIMESCALE_KEY = SAVE_KEYS.timeScale;

  function hasStorageValue(key) {
    try {
      return localStorage.getItem(key) !== null;
    } catch (_err) {
      return false;
    }
  }

  function loadNumber(key, defaultValue = 0) {
    try {
      const raw = localStorage.getItem(key);
      const num = Number(raw);
      return Number.isFinite(num) ? num : defaultValue;
    } catch (_err) {
      return defaultValue;
    }
  }

  function saveNumber(key, value) {
    try {
      const num = Number(value);
      localStorage.setItem(key, String(Number.isFinite(num) ? num : 0));
    } catch (err) {
      console.warn("存档写入失败:", key, err);
    }
  }

  function loadJSON(key, defaultValue) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return defaultValue;
      return JSON.parse(raw);
    } catch (err) {
      console.warn("存档读取失败:", key, err);
      return defaultValue;
    }
  }

  function saveJSON(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.warn("存档写入失败:", key, err);
    }
  }

  function loadString(key, defaultValue = "") {
    try {
      const raw = localStorage.getItem(key);
      return raw === null ? defaultValue : String(raw);
    } catch (_err) {
      return defaultValue;
    }
  }

  function saveString(key, value) {
    try {
      localStorage.setItem(key, String(value ?? ""));
    } catch (err) {
      console.warn("存档写入失败:", key, err);
    }
  }

  function saveBool(key, value) {
    saveNumber(key, value ? 1 : 0);
  }

  function loadMigratedNumber(key, defaultValue = 0, legacyKeys = []) {
    if (hasStorageValue(key)) return loadNumber(key, defaultValue);
    for (const legacyKey of legacyKeys) {
      if (hasStorageValue(legacyKey)) {
        const value = loadNumber(legacyKey, defaultValue);
        saveNumber(key, value);
        return value;
      }
    }
    return defaultValue;
  }

  function isLocalStorageAvailable() {
    try {
      const current = localStorage.getItem(SAVE_VERSION_KEY);
      localStorage.setItem(SAVE_VERSION_KEY, current || String(SAVE_VERSION));
      return true;
    } catch (_err) {
      return false;
    }
  }

  const readTimeScaleSetting = () => {
    return loadNumber(TIMESCALE_KEY, 1) === 2 ? 2 : 1;
  };
  const writeTimeScaleSetting = (value) => {
    saveNumber(TIMESCALE_KEY, value === 2 ? 2 : 1);
  };
  const readHighestClearedSetting = () => {
    const primary = loadMigratedNumber(HIGHEST_CLEARED_KEY, 0, [LEGACY_HIGHEST_CLEARED_KEY]);
    const legacy = loadNumber(LEGACY_HIGHEST_CLEARED_KEY, 0);
    return clampSetup(Math.max(primary, legacy), 0, 40);
  };
  const writeHighestClearedSetting = (value) => {
    saveNumber(HIGHEST_CLEARED_KEY, clampSetup(Math.floor(value || 0), 0, 40));
  };

  const ENEMY_TYPES = {
    imp: {
      name: "小妖",
      hp: 20,
      speed: 42,
      radius: 13,
      damage: 5,
      exp: 5,
      body: "#245b5a",
      eye: "#ff6154",
    },
    brute: {
      name: "巨妖",
      hp: 70,
      speed: 24,
      radius: 22,
      damage: 12,
      exp: 10,
      body: "#315b57",
      eye: "#ff6b57",
    },
    runner: {
      name: "疾行妖",
      hp: 26,
      speed: 72,
      radius: 11,
      damage: 6,
      exp: 6,
      body: "#1f5657",
      eye: "#ff6b62",
    },
    shield: {
      name: "护盾妖",
      hp: 36,
      shield: 20,
      speed: 36,
      radius: 17,
      damage: 8,
      exp: 8,
      body: "#2f7470",
      eye: "#ff6b57",
    },
    poison: {
      name: "毒雾妖",
      hp: 64,
      speed: 34,
      radius: 15,
      damage: 7,
      exp: 9,
      unlockLevel: 12,
      type: "poison",
      visual: "poison",
      body: "#255642",
      eye: "#ff6b57",
      onDeath: "poisonCloud",
    },
    stone: {
      name: "石甲妖",
      hp: 92,
      speed: 25,
      radius: 18,
      damage: 10,
      exp: 11,
      unlockLevel: 13,
      type: "stone",
      visual: "stone",
      body: "#52645f",
      eye: "#ff6b57",
      swordDamageTaken: 0.62,
    },
    fireling: {
      name: "妖火童子",
      hp: 58,
      speed: 43,
      radius: 15,
      damage: 8,
      exp: 10,
      unlockLevel: 15,
      type: "fireling",
      visual: "fire",
      body: "#6a3f2b",
      eye: "#fff1bd",
      explodeNearWall: true,
      explodeRadius: 58,
      explodeDamageMult: 2.1,
    },
    yaksha: {
      name: "夜叉",
      hp: 86,
      speed: 72,
      radius: 16,
      damage: 16,
      exp: 14,
      unlockLevel: 17,
      type: "yaksha",
      visual: "yaksha",
      body: "#2b2344",
      eye: "#ff6b57",
    },
    flying: {
      name: "飞妖",
      hp: 74,
      speed: 58,
      radius: 15,
      damage: 9,
      exp: 13,
      unlockLevel: 22,
      type: "flying",
      visual: "flying",
      body: "#1d3f43",
      eye: "#ff6b57",
      flying: true,
      arrayDamageTaken: 0.3,
    },
    caster: {
      name: "咒师妖",
      hp: 102,
      speed: 30,
      radius: 17,
      damage: 9,
      exp: 16,
      unlockLevel: 23,
      type: "caster",
      visual: "caster",
      body: "#34254d",
      eye: "#ff6b57",
    },
    xuanArmor: {
      name: "玄甲巨妖",
      hp: 190,
      shield: 90,
      speed: 20,
      radius: 25,
      damage: 18,
      exp: 24,
      unlockLevel: 24,
      type: "xuanArmor",
      visual: "xuanArmor",
      body: "#293f3d",
      eye: "#ff6b57",
      swordDamageTaken: 0.74,
    },
    splitter: {
      name: "分裂妖",
      hp: 96,
      speed: 38,
      radius: 17,
      damage: 10,
      exp: 15,
      unlockLevel: 28,
      type: "splitter",
      visual: "splitter",
      body: "#284e50",
      eye: "#ff6b57",
      splitInto: ["imp", "runner"],
    },
    drainer: {
      name: "吸灵妖",
      hp: 118,
      speed: 32,
      radius: 18,
      damage: 11,
      exp: 18,
      unlockLevel: 32,
      type: "drainer",
      visual: "drainer",
      body: "#24385f",
      eye: "#ff6b57",
      drainAura: 0.08,
    },
    vanguard: {
      name: "妖王先锋",
      hp: 220,
      shield: 60,
      speed: 28,
      radius: 23,
      damage: 20,
      exp: 28,
      unlockLevel: 35,
      type: "vanguard",
      visual: "vanguard",
      body: "#4d2a25",
      eye: "#fff1bd",
      allySpeedAura: 0.1,
      auraRadius: 120,
    },
    boss10: {
      name: "黑角妖将",
      hp: 360,
      speed: 18,
      radius: 34,
      damage: 24,
      exp: 50,
      unlockLevel: 10,
      type: "boss10",
      visual: "boss",
      body: "#2a3030",
      eye: "#ff6b57",
      boss: true,
      summonTypes: ["imp", "runner"],
      summonInterval: 5.8,
    },
    boss20: {
      name: "筑基妖帅",
      hp: 760,
      shield: 120,
      speed: 16,
      radius: 38,
      damage: 34,
      exp: 80,
      unlockLevel: 20,
      type: "boss20",
      visual: "boss",
      body: "#312f45",
      eye: "#fff1bd",
      boss: true,
      allySpeedAura: 0.1,
      auraRadius: 150,
      summonTypes: ["shield", "brute"],
      summonInterval: 6.5,
    },
    boss30: {
      name: "金丹魔修",
      hp: 1250,
      shield: 260,
      speed: 14,
      radius: 40,
      damage: 38,
      exp: 120,
      unlockLevel: 30,
      type: "boss30",
      visual: "casterBoss",
      body: "#3a2854",
      eye: "#fff1bd",
      boss: true,
      summonTypes: ["caster", "poison"],
      summonInterval: 7,
      phaseShieldRate: 0.55,
      phaseShieldAmount: 260,
    },
    boss40: {
      name: "万妖王",
      hp: 2350,
      shield: 360,
      speed: 13,
      radius: 44,
      damage: 48,
      exp: 180,
      unlockLevel: 40,
      type: "boss40",
      visual: "kingBoss",
      body: "#4a2627",
      eye: "#fff1bd",
      boss: true,
      summonTypes: ["yaksha", "shield"],
      summonInterval: 6.4,
      phaseSummons: [
        { hpRate: 0.7, types: ["runner", "yaksha"], text: "万妖王召来疾影妖群！" },
        { hpRate: 0.4, shield: 520, text: "万妖王妖盾大开！" },
        { hpRate: 0.2, types: ["fireling", "fireling", "vanguard"], text: "万妖王唤出妖火死士！" },
      ],
    },
  };
  const JOURNEY_ENEMY_SKINS = {
    imp: { name: "狐妖", visual: "fox", body: "#b76b42", eye: "#ff4f45", lore: "花果山外流窜的小狐妖，身形轻巧，尾火摇晃。" },
    runner: { name: "赤虾子", visual: "shrimp", body: "#2c7b79", eye: "#ff4f45", lore: "水府逃出的虾兵妖，游影疾行，拖着青红水纹。" },
    brute: { name: "小野猪妖", visual: "boar", body: "#5a4738", eye: "#ff5b4f", lore: "披着破甲的野猪妖，皮厚力沉，专撞结界。" },
    shield: { name: "蛙僧", visual: "frog", body: "#517d55", eye: "#ff6b57", lore: "背负铜钹的蛙妖僧，妖纹护罩护住周身。" },
    poison: { name: "毒雾蛙婆", visual: "poisonFrog", body: "#315f3d", eye: "#ff6b57", lore: "吐雾成瘴的蛙婆，死后仍会留下毒烟。" },
    stone: { name: "石甲妖", visual: "stoneBeast", body: "#667066", eye: "#ff6b57", lore: "乱石成精，披甲带裂，寻常兵器难以破壳。" },
    fireling: { name: "灯花婆婆", visual: "lampGranny", body: "#7c4434", eye: "#fff1bd", lore: "端着妖火灯盏的老妖，近门便爆成火碗。" },
    yaksha: { name: "夜叉", visual: "yakshaCn", body: "#31233f", eye: "#ff4b45", lore: "双角利爪，夜行如鬼影，伤害极高。" },
    flying: { name: "鸟妖", visual: "birdDemon", body: "#213f42", eye: "#ff5b4f", lore: "山林鸟妖，掠空而来，地面阵法难以完全伤它。" },
    caster: { name: "咒师妖", visual: "spellMaster", body: "#3b2a55", eye: "#ff6b57", lore: "执杖画咒的妖师，符圈护身，常与妖潮结阵。" },
    xuanArmor: { name: "猪龙", visual: "pigDragon", body: "#354a42", eye: "#ff6b57", lore: "披玄甲的猪龙妖，慢而厚重，盾甲难破。" },
    splitter: { name: "九尾狐影", visual: "splitFox", body: "#65435d", eye: "#ff6b57", lore: "狐影裂身，死后分化小妖继续扑门。" },
    drainer: { name: "吸灵白骨", visual: "boneDrainer", body: "#35426a", eye: "#d7fff5", lore: "白骨披蓝焰，吸走灵气，让修为与冷却变钝。" },
    vanguard: { name: "牛魔先锋", visual: "bullVanguard", body: "#5c2e28", eye: "#fff1bd", lore: "牛魔麾下精锐，金红妖纹能鼓舞周围小妖。" },
    boss10: { name: "黑风怪", visual: "blackWindBoss", lore: "黑风山妖王，披风卷雾，召小妖冲阵。" },
    boss20: { name: "吴支祁", visual: "wuzhiqiBoss", lore: "水猿大妖，浪纹缠身，可号令护盾妖潮。" },
    boss30: { name: "白骨夫人", visual: "whiteBoneBoss", lore: "白骨幻相结阵，妖咒与幻影接连压门。" },
    boss40: { name: "牛魔王", visual: "bullKingBoss", lore: "终章妖王，火焰山群妖共主。" },
  };
  for (const [id, config] of Object.entries(ENEMY_TYPES)) {
    Object.assign(config, JOURNEY_ENEMY_SKINS[id] || {});
    config.type = config.type || id;
    config.unlockLevel = config.unlockLevel || ENEMY_UNLOCK_LEVEL[id] || 1;
    config.baseHp = config.hp;
    config.baseSpeed = config.speed;
    config.baseDamage = config.damage;
  }

  const CANONICAL_ENEMY_TYPES = {
    foxDemon: {
      key: "foxDemon",
      name: "狐妖",
      category: "normal",
      unlockLevel: 1,
      hp: 22,
      speed: 44,
      damage: 5,
      exp: 5,
      radius: 15,
      visual: "foxDemon",
      body: "#c97844",
      eye: "#ff4b45",
      colorTheme: { fur: "#c97844", belly: "#fff1bd", fire: "#f5a24d" },
      traits: ["灵活小怪", "狐火"],
      description: "山野狐火所化，耳尖尾大，常借妖雾穿行山林。",
      lore: "山野狐火所化，耳尖尾大，常借妖雾穿行山林。",
    },
    dogDemon: {
      key: "dogDemon",
      name: "犬妖",
      category: "normal",
      unlockLevel: 2,
      hp: 28,
      speed: 52,
      damage: 6,
      exp: 6,
      radius: 15,
      visual: "dogDemon",
      body: "#2b2b2c",
      eye: "#ff4b45",
      colorTheme: { fur: "#2b2b2c", cloth: "#8a6a44", belt: "#f5d78a" },
      traits: ["冲锋小怪", "爪击"],
      description: "黑毛犬头小妖，穿破布衣，低身前冲扑向山门。",
      lore: "黑毛犬头小妖，穿破布衣，低身前冲扑向山门。",
    },
    shrimpDemon: {
      key: "shrimpDemon",
      name: "赤虾子",
      category: "normal",
      unlockLevel: 3,
      hp: 24,
      speed: 74,
      damage: 6,
      exp: 6,
      radius: 12,
      visual: "shrimpDemon",
      body: "#d96943",
      eye: "#ff4b45",
      colorTheme: { shell: "#d96943", water: "#7fd1d8" },
      traits: ["高速小怪", "拖影"],
      description: "水府逃出的虾兵小妖，弯背长须，行如水线。",
      lore: "水府逃出的虾兵小妖，弯背长须，行如水线。",
    },
    boarDragon: {
      key: "boarDragon",
      name: "猪龙",
      category: "normal",
      unlockLevel: 4,
      hp: 74,
      speed: 24,
      damage: 12,
      exp: 10,
      radius: 23,
      visual: "boarDragon",
      body: "#6b4b3a",
      eye: "#ff5b4f",
      colorTheme: { hide: "#6b4b3a", scale: "#9f8b62", tusk: "#f3fff9" },
      traits: ["厚血推进", "獠牙"],
      description: "圆滚猪身长出龙须鳞片，慢而厚重，专撞结界。",
      lore: "圆滚猪身长出龙须鳞片，慢而厚重，专撞结界。",
    },
    frogDemon: {
      key: "frogDemon",
      name: "蛙妖",
      category: "normal",
      unlockLevel: 5,
      hp: 38,
      speed: 36,
      damage: 8,
      exp: 8,
      radius: 17,
      visual: "frogDemon",
      body: "#5f9d62",
      eye: "#ff6b57",
      jumpInterval: 2.4,
      jumpBoost: 1.55,
      colorTheme: { skin: "#5f9d62", robe: "#3f6f52", belly: "#d7fff5" },
      traits: ["跳跃推进", "蹲坐"],
      description: "鼓眼圆肚的蛙妖，披小荷袍，时不时一跃向前。",
      lore: "鼓眼圆肚的蛙妖，披小荷袍，时不时一跃向前。",
    },
    lampGranny: {
      key: "lampGranny",
      name: "灯花婆婆",
      category: "elite",
      unlockLevel: 12,
      hp: 62,
      speed: 34,
      damage: 8,
      exp: 10,
      radius: 16,
      visual: "lampGranny",
      body: "#6a3a34",
      eye: "#fff1bd",
      explodeNearWall: true,
      explodeRadius: 58,
      explodeDamageMult: 2.1,
      colorTheme: { robe: "#6a3a34", flame: "#ff8a45", lamp: "#f5d78a" },
      traits: ["火碗", "近门爆炎"],
      description: "端灯盏的小老太妖，火光照脸，近门时妖火炸裂。",
      lore: "端灯盏的小老太妖，火光照脸，近门时妖火炸裂。",
    },
    stoneArmor: {
      key: "stoneArmor",
      name: "石甲妖",
      category: "elite",
      unlockLevel: 13,
      hp: 94,
      speed: 25,
      damage: 10,
      exp: 11,
      radius: 19,
      visual: "stoneArmor",
      body: "#68736b",
      eye: "#ff6b57",
      swordDamageTaken: 0.62,
      colorTheme: { stone: "#68736b", crack: "#fff1bd" },
      traits: ["高护甲", "裂纹"],
      description: "灰青石壳成精，裂纹藏火，寻常兵器伤害降低。",
      lore: "灰青石壳成精，裂纹藏火，寻常兵器伤害降低。",
    },
    yaksha: {
      key: "yaksha",
      name: "夜叉",
      category: "elite",
      unlockLevel: 17,
      hp: 86,
      speed: 72,
      damage: 16,
      exp: 14,
      radius: 17,
      visual: "yakshaCn",
      body: "#342447",
      eye: "#ff4b45",
      colorTheme: { skin: "#342447", horn: "#f5d78a", claw: "#f3fff9" },
      traits: ["高速高伤", "利爪"],
      description: "双角利爪，披黑气而行，数量不多但压迫极强。",
      lore: "双角利爪，披黑气而行，数量不多但压迫极强。",
    },
    wingDemon: {
      key: "wingDemon",
      name: "飞妖",
      category: "elite",
      unlockLevel: 22,
      hp: 76,
      speed: 58,
      damage: 9,
      exp: 13,
      radius: 15,
      visual: "wingDemon",
      body: "#253f43",
      eye: "#ff5b4f",
      flying: true,
      arrayDamageTaken: 0.3,
      colorTheme: { wing: "#253f43", beak: "#e9b85f" },
      traits: ["飞行", "阵法减伤"],
      description: "鸟妖剪影掠空，翅影扑动，受地面阵法伤害降低。",
      lore: "鸟妖剪影掠空，翅影扑动，受地面阵法伤害降低。",
    },
    curseMage: {
      key: "curseMage",
      name: "咒师妖",
      category: "elite",
      unlockLevel: 23,
      hp: 104,
      speed: 30,
      damage: 9,
      exp: 16,
      radius: 18,
      visual: "curseMage",
      body: "#3d2b57",
      eye: "#ff6b57",
      allySpeedAura: 0.05,
      auraRadius: 100,
      colorTheme: { robe: "#3d2b57", charm: "#fff1bd", curse: "#bf7cff" },
      traits: ["咒印光环", "小怪加速"],
      description: "小妖道执杖画咒，脚下紫色咒印会鼓动附近妖物。",
      lore: "小妖道执杖画咒，脚下紫色咒印会鼓动附近妖物。",
    },
    nineTailShade: {
      key: "nineTailShade",
      name: "九尾狐影",
      category: "elite",
      unlockLevel: 28,
      hp: 96,
      speed: 42,
      damage: 10,
      exp: 15,
      radius: 18,
      visual: "nineTailShade",
      body: "#7c5c88",
      eye: "#ff6b57",
      splitInto: ["foxDemon", "shrimpDemon"],
      evadeChance: 0.16,
      colorTheme: { shade: "#d8b7e8", tail: "#fff1bd" },
      traits: ["幻影闪避", "分裂"],
      description: "白紫狐影摇出多尾，受击时偶尔化虚，死亡后裂出小妖。",
      lore: "白紫狐影摇出多尾，受击时偶尔化虚，死亡后裂出小妖。",
    },
    waterApe: {
      key: "waterApe",
      name: "水猿妖",
      category: "elite",
      unlockLevel: 24,
      hp: 186,
      shield: 70,
      speed: 22,
      damage: 17,
      exp: 23,
      radius: 25,
      visual: "waterApe",
      body: "#2d6e78",
      eye: "#ff6b57",
      waterPulse: true,
      colorTheme: { fur: "#2d6e78", wave: "#9fd9cf" },
      traits: ["水波", "厚血"],
      description: "青蓝水猿，臂长如桨，行走时水纹环绕。",
      lore: "青蓝水猿，臂长如桨，行走时水纹环绕。",
    },
    blackWind: {
      key: "blackWind",
      name: "黑风怪卒",
      category: "elite",
      unlockLevel: 32,
      hp: 118,
      speed: 58,
      damage: 12,
      exp: 18,
      radius: 18,
      visual: "blackWind",
      body: "#1d2430",
      eye: "#ff5b4f",
      dashInterval: 3.2,
      dashBoost: 2.2,
      colorTheme: { wind: "#1d2430", eye: "#ff5b4f" },
      traits: ["旋风冲刺", "拖影"],
      description: "黑色旋风团里露出眼睛、角与爪，短距冲刺压迫很强。",
      lore: "黑色旋风团里露出眼睛、角与爪，短距冲刺压迫很强。",
    },
    boneDemon: {
      key: "boneDemon",
      name: "白骨妖",
      category: "elite",
      unlockLevel: 33,
      hp: 112,
      speed: 34,
      damage: 11,
      exp: 18,
      radius: 18,
      visual: "boneDemon",
      body: "#e8f7ef",
      eye: "#ff4b45",
      reviveChance: 0.35,
      colorTheme: { bone: "#e8f7ef", ribbon: "#d84e45" },
      traits: ["概率复生", "骨片"],
      description: "白骨架缠红绸，死亡后有概率骨片重组再起。",
      lore: "白骨架缠红绸，死亡后有概率骨片重组再起。",
    },
    bullVanguard: {
      key: "bullVanguard",
      name: "牛魔先锋",
      category: "elite",
      unlockLevel: 35,
      hp: 220,
      shield: 60,
      speed: 28,
      damage: 20,
      exp: 28,
      radius: 24,
      visual: "bullVanguard",
      body: "#5c2e28",
      eye: "#fff1bd",
      allySpeedAura: 0.1,
      auraRadius: 120,
      colorTheme: { hide: "#5c2e28", mark: "#f5d78a" },
      traits: ["精英光环", "牛角"],
      description: "牛角壮体，金红妖纹绕身，能鼓舞周围小怪。",
      lore: "牛角壮体，金红妖纹绕身，能鼓舞周围小怪。",
    },
    bossBlackWind: {
      key: "bossBlackWind",
      name: "黑风怪",
      category: "boss",
      unlockLevel: 10,
      hp: 360,
      speed: 18,
      damage: 24,
      exp: 50,
      radius: 36,
      visual: "bossBlackWind",
      body: "#20282c",
      eye: "#ff6b57",
      boss: true,
      summonTypes: ["foxDemon", "dogDemon", "blackWind"],
      summonInterval: 5.8,
      colorTheme: { wind: "#20282c", gold: "#f5d78a" },
      traits: ["召唤", "黑风冲阵"],
      description: "黑风山妖王，披风卷雾，召小妖冲阵。",
      lore: "黑风山妖王，披风卷雾，召小妖冲阵。",
    },
    bossYellowWind: {
      key: "bossYellowWind",
      name: "黄风妖王",
      category: "boss",
      unlockLevel: 20,
      hp: 760,
      shield: 120,
      speed: 16,
      damage: 34,
      exp: 80,
      radius: 39,
      visual: "bossYellowWind",
      body: "#7b6531",
      eye: "#fff1bd",
      boss: true,
      allySpeedAura: 0.12,
      auraRadius: 155,
      summonTypes: ["frogDemon", "boarDragon", "stoneArmor"],
      summonInterval: 6.5,
      colorTheme: { wind: "#e9b85f", robe: "#7b6531" },
      traits: ["风压", "加速光环"],
      description: "黄风岭妖王，风砂绕身，能推着小怪向山门压来。",
      lore: "黄风岭妖王，风砂绕身，能推着小怪向山门压来。",
    },
    bossBoneLady: {
      key: "bossBoneLady",
      name: "白骨夫人",
      category: "boss",
      unlockLevel: 30,
      hp: 1250,
      shield: 260,
      speed: 14,
      damage: 38,
      exp: 120,
      radius: 41,
      visual: "bossBoneLady",
      body: "#e8f7ef",
      eye: "#ff4b45",
      boss: true,
      summonTypes: ["curseMage", "boneDemon"],
      summonInterval: 7,
      phaseShieldRate: 0.55,
      phaseShieldAmount: 260,
      colorTheme: { bone: "#e8f7ef", ribbon: "#d84e45" },
      traits: ["幻影", "阶段护盾"],
      description: "白骨幻相结阵，妖咒与骨影接连压门。",
      lore: "白骨幻相结阵，妖咒与骨影接连压门。",
    },
    bossBullKing: {
      key: "bossBullKing",
      name: "牛魔王",
      category: "boss",
      unlockLevel: 40,
      hp: 2350,
      shield: 360,
      speed: 13,
      damage: 48,
      exp: 180,
      radius: 46,
      visual: "bossBullKing",
      body: "#5b2b26",
      eye: "#fff1bd",
      boss: true,
      summonTypes: ["yaksha", "bullVanguard"],
      summonInterval: 6.4,
      phaseSummons: [
        { hpRate: 0.7, types: ["shrimpDemon", "blackWind"], text: "牛魔王号令黑风疾影！" },
        { hpRate: 0.4, shield: 520, text: "牛魔王妖甲大开！" },
        { hpRate: 0.2, types: ["lampGranny", "lampGranny", "bullVanguard"], text: "牛魔王唤出火焰山死士！" },
      ],
      colorTheme: { hide: "#5b2b26", flame: "#ff6b57", gold: "#f5d78a" },
      traits: ["终章 Boss", "分阶段"],
      description: "火焰山万妖共主，牛角如戟，妖纹如火。",
      lore: "火焰山万妖共主，牛角如戟，妖纹如火。",
    },
  };

  Object.assign(ENEMY_TYPES, CANONICAL_ENEMY_TYPES);
  const ENEMY_KEY_ALIASES = {
    small: "foxDemon",
    imp: "foxDemon",
    runner: "shrimpDemon",
    giant: "boarDragon",
    brute: "boarDragon",
    shield: "frogDemon",
    poison: "frogDemon",
    fire: "lampGranny",
    fireling: "lampGranny",
    stone: "stoneArmor",
    flying: "wingDemon",
    mage: "curseMage",
    caster: "curseMage",
    xuanArmor: "waterApe",
    split: "boneDemon",
    splitter: "nineTailShade",
    drainer: "boneDemon",
    elite: "bullVanguard",
    vanguard: "bullVanguard",
    boss10: "bossBlackWind",
    boss20: "bossYellowWind",
    boss30: "bossBoneLady",
    boss40: "bossBullKing",
  };
  for (const [legacy, canonical] of Object.entries(ENEMY_KEY_ALIASES)) {
    if (ENEMY_TYPES[canonical]) {
      ENEMY_TYPES[legacy] = {
        ...ENEMY_TYPES[canonical],
        key: legacy,
        aliasOf: canonical,
        type: canonical,
      };
    }
  }
  for (const [id, config] of Object.entries(ENEMY_TYPES)) {
    config.key = config.key || id;
    config.type = ENEMY_KEY_ALIASES[id] || config.type || id;
    config.hp = config.hp ?? config.baseHp;
    config.speed = config.speed ?? config.baseSpeed;
    config.damage = config.damage ?? config.baseDamage;
    config.unlockLevel = config.unlockLevel || ENEMY_UNLOCK_LEVEL[config.type] || ENEMY_UNLOCK_LEVEL[id] || 1;
    config.category = config.category || (config.boss ? "boss" : config.allySpeedAura || config.shield ? "elite" : "normal");
    config.baseHp = config.hp;
    config.baseSpeed = config.speed;
    config.baseDamage = config.damage;
  }
  const normalizeEnemyType = (type) => ENEMY_KEY_ALIASES[type] || type;
  const MONSTER_TEXT = {
    foxDemon: { name: "狐妖", traits: ["灵活小怪", "狐火"], description: "山野狐火所化，耳尖尾大，常借妖雾穿行山林。" },
    dogDemon: { name: "犬妖", traits: ["冲锋小怪", "爪击"], description: "黑毛犬头小妖，穿破布衣，低身前冲扑向山门。" },
    shrimpDemon: { name: "赤虾子", traits: ["高速小怪", "拖影"], description: "水府逃出的虾兵小妖，弯背长须，行如水线。" },
    boarDragon: { name: "猪龙", traits: ["厚血推进", "獠牙"], description: "圆滚猪身长出龙须鳞片，慢而厚重，专撞结界。" },
    frogDemon: { name: "蛙妖", traits: ["跳跃推进", "蹲坐"], description: "鼓眼圆肚的蛙妖，披小荷袍，时不时一跃向前。" },
    lampGranny: { name: "灯花婆婆", traits: ["火碗", "近门爆燃"], description: "端灯盏的小老太妖，火光照脸，近门时妖火炸裂。" },
    stoneArmor: { name: "石甲妖", traits: ["高护甲", "裂纹"], description: "灰青石壳成精，裂纹藏火，寻常兵器伤害降低。" },
    yaksha: { name: "夜叉", traits: ["高速高伤", "利爪"], description: "双角利爪，披黑气而行，数量不多但压迫极强。" },
    wingDemon: { name: "飞妖", traits: ["飞行", "阵法减伤"], description: "鸟妖剪影掠空，翅影扇动，受地面阵法伤害降低。" },
    curseMage: { name: "咒师妖", traits: ["咒印光环", "小怪加速"], description: "小妖道执杖画咒，脚下紫色咒印会鼓动附近妖物。" },
    nineTailShade: { name: "九尾狐影", traits: ["幻影闪避", "分裂"], description: "白紫狐影摇出多尾，受击时偶尔化虚，死亡后裂出小妖。" },
    waterApe: { name: "水猿妖", traits: ["水波", "厚血"], description: "青蓝水猿，臂长如桨，行走时水纹环绕。" },
    blackWind: { name: "黑风怪卒", traits: ["旋风冲刺", "拖影"], description: "黑色旋风团里露出眼睛、角与爪，短距冲刺压迫很强。" },
    boneDemon: { name: "白骨妖", traits: ["复生", "骨片"], description: "白骨架披红绸，死亡时可能骨片重组，再度爬起。" },
    bullVanguard: { name: "牛魔先锋", traits: ["精英光环", "牛角"], description: "壮硕牛角妖卒，金红妖纹缠身，能鼓动周围妖潮。" },
    bossBlackWind: { name: "黑风怪", traits: ["Boss", "召唤黑风"], description: "黑风山妖王，披风卷雾，召小妖冲阵。" },
    bossYellowWind: { name: "黄风妖王", traits: ["Boss", "风压光环"], description: "黄风岭妖王，风砂绕身，能推着小怪向山门压来。" },
    bossBoneLady: { name: "白骨夫人", traits: ["Boss", "阶段护盾"], description: "白骨幻相结阵，妖咒与骨影接连压门。" },
    bossBullKing: { name: "牛魔王", traits: ["终章 Boss", "分阶段"], description: "火焰山万妖共主，牛角如戟，妖纹如火。" },
  };
  for (const [id, text] of Object.entries(MONSTER_TEXT)) {
    if (CANONICAL_ENEMY_TYPES[id]) Object.assign(CANONICAL_ENEMY_TYPES[id], text, { lore: text.description });
    if (ENEMY_TYPES[id]) Object.assign(ENEMY_TYPES[id], text, { lore: text.description });
  }
  for (const [legacy, canonical] of Object.entries(ENEMY_KEY_ALIASES)) {
    if (ENEMY_TYPES[legacy] && MONSTER_TEXT[canonical]) {
      Object.assign(ENEMY_TYPES[legacy], MONSTER_TEXT[canonical], { lore: MONSTER_TEXT[canonical].description, key: legacy, aliasOf: canonical, type: canonical });
    }
  }
  const MONSTER_BOOK = Object.fromEntries(Object.entries(CANONICAL_ENEMY_TYPES).map(([id, config]) => [id, {
    name: config.name,
    title: config.traits?.[0] || "西游路上妖物",
    description: config.description || config.lore || "取经路上现身的志怪妖物。",
    unlockLevel: config.unlockLevel || 1,
    category: config.category || "normal",
    traits: config.traits || [],
  }]));

  ENEMY_TYPES.yellowRobeGoblin = {
    key: "yellowRobeGoblin",
    type: "yellowRobeGoblin",
    name: "黄袍小怪",
    category: "normal",
    unlockLevel: 1,
    hp: 48,
    baseHp: 48,
    speed: 38,
    baseSpeed: 38,
    damage: 6,
    baseDamage: 6,
    exp: 5,
    radius: 17,
    visual: "yellowRobeGoblin",
    traits: ["图鉴素材", "黄袍小妖"],
    description: "戴着镇字符帽的独眼小妖，常混在妖潮里探路。",
    lore: "戴着镇字符帽的独眼小妖，常混在妖潮里探路。",
  };
  CANONICAL_ENEMY_TYPES.yellowRobeGoblin = ENEMY_TYPES.yellowRobeGoblin;
  ENEMY_TYPES.goblin = { ...ENEMY_TYPES.yellowRobeGoblin, key: "goblin", aliasOf: "yellowRobeGoblin", type: "yellowRobeGoblin" };
  ENEMY_KEY_ALIASES.goblin = "yellowRobeGoblin";
  ENEMY_KEY_ALIASES.yellowRobeGoblin = "yellowRobeGoblin";
  ENEMY_KEY_ALIASES.waterDragon = "waterApe";
  MONSTER_BOOK.yellowRobeGoblin = {
    name: "黄袍小怪",
    title: "黄袍独眼小妖",
    description: "戴着镇字符帽的独眼小妖，常混在妖潮里探路。",
    unlockLevel: 1,
    category: "normal",
    traits: ["图鉴素材", "黄袍小妖"],
  };

  const MONSTER_SPRITES = {
    foxDemon: { sprite: "./assets/monsters/fox-demon.png", portraitScale: 1.04, battleScale: 0.42 },
    dogDemon: { sprite: "./assets/monsters/dog-demon.png", portraitScale: 1.08, battleScale: 0.46 },
    shrimpDemon: { sprite: "./assets/monsters/shrimp-demon.png", portraitScale: 1.02, battleScale: 0.44 },
    boarDragon: { sprite: "./assets/monsters/boar-dragon.png", portraitScale: 1.02, battleScale: 0.5 },
    frogDemon: { sprite: "./assets/monsters/frog-demon.png", portraitScale: 1.02, battleScale: 0.46 },
    lampGranny: { sprite: "./assets/monsters/lamp-granny.png", portraitScale: 1.02, battleScale: 0.46 },
    stoneArmor: { sprite: "./assets/monsters/stone-armor.png", portraitScale: 1.02, battleScale: 0.5 },
    yaksha: { sprite: "./assets/monsters/yaksha.png", portraitScale: 1.03, battleScale: 0.48 },
    wingDemon: { sprite: "./assets/monsters/wing-demon.png", portraitScale: 1.04, battleScale: 0.48 },
    boneDemon: { sprite: "./assets/monsters/bone-demon.png", portraitScale: 1.02, battleScale: 0.46 },
    bullVanguard: { sprite: "./assets/monsters/bull-vanguard.png", portraitScale: 1.08, battleScale: 0.58 },
    waterApe: { sprite: "./assets/monsters/water-dragon.png", portraitScale: 1.08, battleScale: 0.56 },
    yellowRobeGoblin: { sprite: "./assets/monsters/yellow-robe-goblin.png", portraitScale: 1.03, battleScale: 0.42 },
  };
  for (const [id, spriteInfo] of Object.entries(MONSTER_SPRITES)) {
    if (CANONICAL_ENEMY_TYPES[id]) Object.assign(CANONICAL_ENEMY_TYPES[id], spriteInfo);
    if (ENEMY_TYPES[id]) Object.assign(ENEMY_TYPES[id], spriteInfo);
    if (MONSTER_BOOK[id]) Object.assign(MONSTER_BOOK[id], { sprite: spriteInfo.sprite });
  }
  for (const [legacy, canonical] of Object.entries(ENEMY_KEY_ALIASES)) {
    if (ENEMY_TYPES[legacy] && MONSTER_SPRITES[canonical]) Object.assign(ENEMY_TYPES[legacy], MONSTER_SPRITES[canonical]);
  }

  const MONSTER_IMAGE_CACHE = new Map();

  function getMonsterSpriteRecord(key) {
    const normalized = normalizeEnemyType(key) || key;
    const config = ENEMY_TYPES[normalized] || CANONICAL_ENEMY_TYPES[normalized];
    const src = config?.sprite || MONSTER_SPRITES[normalized]?.sprite;
    if (!src) return null;
    if (MONSTER_IMAGE_CACHE.has(src)) return MONSTER_IMAGE_CACHE.get(src);
    const record = { src, image: new Image(), loaded: false, error: false, warned: false };
    record.image.onload = () => {
      record.loaded = true;
      if (window.hongyunGame?.state === "codex") window.hongyunGame.renderCodex();
    };
    record.image.onerror = () => {
      record.error = true;
      if (!record.warned) {
        record.warned = true;
        console.warn("Monster sprite failed to load:", src);
      }
    };
    record.image.src = src;
    MONSTER_IMAGE_CACHE.set(src, record);
    return record;
  }

  function drawMonsterSpriteImage(ctx, key, x, y, scale = 1, mode = "battle", state = {}) {
    const normalized = normalizeEnemyType(key) || key;
    const config = ENEMY_TYPES[normalized] || CANONICAL_ENEMY_TYPES[normalized] || {};
    const record = getMonsterSpriteRecord(normalized);
    if (!record || record.error || !record.loaded) return false;
    const spriteScale = mode === "gallery" ? (config.portraitScale || 1) : (config.battleScale || 0.42);
    const baseSize = mode === "gallery" ? 94 : 180;
    const size = baseSize * spriteScale * scale;
    const t = state.time || performance.now() / 1000;

    ctx.save();
    ctx.translate(x, y);
    if (mode === "battle") {
      monsterMist(ctx, "rgba(23, 63, 66, 0.22)", size * 0.78, t);
    }
    ctx.drawImage(record.image, -size / 2, -size * 0.76, size, size);
    if (state.hitPulse > 0) {
      ctx.save();
      ctx.globalAlpha = Math.min(0.55, state.hitPulse);
      ctx.globalCompositeOperation = "screen";
      ctx.fillStyle = "#fff1bd";
      ctx.fillRect(-size / 2, -size * 0.76, size, size);
      ctx.restore();
    }
    ctx.restore();
    return true;
  }

  function monsterRoundRectPath(ctx, x, y, width, height, radius) {
    const r = Math.min(radius, width / 2, height / 2);
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + width - r, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + r);
    ctx.lineTo(x + width, y + height - r);
    ctx.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
    ctx.lineTo(x + r, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
  }

  function monsterMist(ctx, color = "rgba(22, 47, 47, 0.28)", width = 44, t = 0) {
    ctx.save();
    ctx.globalAlpha = 0.72;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.ellipse(0, 18, width * (0.8 + Math.sin(t * 2) * 0.03), 8, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 0.38;
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    for (let i = 0; i < 3; i += 1) {
      ctx.beginPath();
      ctx.moveTo(-width * 0.48 + i * width * 0.34, 12 + i);
      ctx.quadraticCurveTo(-width * 0.22 + i * width * 0.34, 8 + Math.sin(t * 2 + i) * 2, width * 0.04 + i * width * 0.34, 13 - i);
      ctx.stroke();
    }
    ctx.restore();
  }

  function monsterInkStroke(ctx, color = "rgba(18, 45, 44, 0.72)", width = 2) {
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.stroke();
  }

  function monsterEyes(ctx, x1, y1, x2, y2, mode = "dot", size = 2) {
    ctx.save();
    ctx.fillStyle = "#ff5b4f";
    ctx.strokeStyle = "#ff5b4f";
    ctx.shadowColor = "#ff5b4f";
    ctx.shadowBlur = 5;
    if (mode === "slash") {
      ctx.lineWidth = Math.max(1.5, size);
      ctx.beginPath();
      ctx.moveTo(x1 - size * 2, y1 - size * 0.5);
      ctx.lineTo(x1 + size * 1.6, y1);
      ctx.moveTo(x2 + size * 2, y2 - size * 0.5);
      ctx.lineTo(x2 - size * 1.6, y2);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.arc(x1, y1, size, 0, Math.PI * 2);
      ctx.arc(x2, y2, size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  function drawFoxPortrait(ctx, x, y, scale = 1, mode = "battle", state = {}) {
    const t = state.time || performance.now() / 1000;
    const gallery = mode === "gallery";
    const hit = state.hitPulse || 0;
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    monsterMist(ctx, "rgba(129, 70, 55, 0.24)", gallery ? 58 : 42, t);

    const tailSwing = Math.sin(t * 2.4) * (gallery ? 5 : 3);
    ctx.save();
    ctx.translate(-8, -2);
    ctx.rotate((tailSwing - 10) * Math.PI / 180);
    const tailGrad = ctx.createLinearGradient(-46, -28, 4, 8);
    tailGrad.addColorStop(0, "#fff1bd");
    tailGrad.addColorStop(0.25, "#f0aa73");
    tailGrad.addColorStop(1, "#bd6a42");
    ctx.fillStyle = tailGrad;
    ctx.beginPath();
    ctx.moveTo(-4, 10);
    ctx.bezierCurveTo(-48, 14, -54, -30, -23, -38);
    ctx.bezierCurveTo(6, -45, 9, -20, -13, -12);
    ctx.bezierCurveTo(-25, -8, -21, 9, -4, 10);
    ctx.fill();
    monsterInkStroke(ctx, "rgba(101, 60, 43, 0.65)", 1.7);
    ctx.restore();

    ctx.fillStyle = hit > 0 ? "#fff1bd" : "#c76f3f";
    ctx.beginPath();
    ctx.moveTo(-18, -22);
    ctx.bezierCurveTo(-22, -2, -18, 18, 0, 22);
    ctx.bezierCurveTo(18, 18, 23, -1, 18, -22);
    ctx.bezierCurveTo(10, -29, -9, -29, -18, -22);
    ctx.fill();
    monsterInkStroke(ctx, "rgba(91, 53, 39, 0.72)", 1.9);

    ctx.fillStyle = "#f6c089";
    ctx.beginPath();
    ctx.moveTo(-15, -26);
    ctx.lineTo(-28, -52);
    ctx.quadraticCurveTo(-14, -45, -7, -29);
    ctx.moveTo(15, -26);
    ctx.lineTo(28, -52);
    ctx.quadraticCurveTo(14, -45, 7, -29);
    ctx.fill();
    monsterInkStroke(ctx, "rgba(91, 53, 39, 0.66)", 1.4);

    ctx.fillStyle = "#fff0cf";
    ctx.beginPath();
    ctx.ellipse(0, -5, 13, 15, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#e8f7ef";
    ctx.beginPath();
    ctx.ellipse(0, 10, 10, 8, 0, 0, Math.PI * 2);
    ctx.fill();
    monsterEyes(ctx, -6, -10, 6, -10, "slash", gallery ? 2.4 : 1.8);
    ctx.fillStyle = "#643c34";
    ctx.beginPath();
    ctx.arc(0, -4, 1.8, 0, Math.PI * 2);
    ctx.fill();

    if (gallery) {
      ctx.fillStyle = "rgba(232, 247, 239, 0.78)";
      ctx.beginPath();
      ctx.moveTo(-12, 7);
      ctx.quadraticCurveTo(0, 18, 12, 7);
      ctx.lineTo(9, 26);
      ctx.quadraticCurveTo(0, 31, -9, 26);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = "rgba(245, 215, 138, 0.7)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(-7, 18);
      ctx.lineTo(7, 18);
      ctx.stroke();
      ctx.fillStyle = "rgba(255, 190, 92, 0.52)";
      for (let i = 0; i < 3; i += 1) {
        const px = -34 + i * 34 + Math.sin(t * 2 + i) * 2;
        const py = -24 + Math.cos(t * 2.2 + i) * 5;
        ctx.beginPath();
        ctx.arc(px, py, 3.2 - i * 0.35, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.restore();
  }

  function drawDogDemonPortrait(ctx, x, y, scale = 1, mode = "battle", state = {}) {
    const t = state.time || performance.now() / 1000;
    const hit = state.hitPulse || 0;
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    monsterMist(ctx, "rgba(18, 31, 32, 0.28)", mode === "gallery" ? 58 : 42, t);
    ctx.rotate(-0.08);
    ctx.fillStyle = hit > 0 ? "#fff1bd" : "#1c3031";
    ctx.beginPath();
    ctx.moveTo(-22, -18);
    ctx.bezierCurveTo(-27, 4, -13, 21, 8, 19);
    ctx.bezierCurveTo(25, 17, 28, -4, 16, -23);
    ctx.bezierCurveTo(7, -34, -13, -32, -22, -18);
    ctx.fill();
    monsterInkStroke(ctx, "rgba(2, 18, 20, 0.74)", 2);
    ctx.fillStyle = "#121f20";
    ctx.beginPath();
    ctx.moveTo(-15, -29);
    ctx.lineTo(-31, -47);
    ctx.lineTo(-24, -20);
    ctx.moveTo(11, -30);
    ctx.lineTo(24, -49);
    ctx.lineTo(22, -20);
    ctx.fill();
    ctx.fillStyle = "#8d6b4f";
    ctx.beginPath();
    ctx.moveTo(-15, 4);
    ctx.quadraticCurveTo(0, 17, 17, 4);
    ctx.lineTo(12, 26);
    ctx.quadraticCurveTo(0, 32, -12, 26);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = "#f5d78a";
    ctx.lineWidth = 1.3;
    ctx.beginPath();
    ctx.moveTo(-12, 12);
    ctx.lineTo(12, 12);
    ctx.stroke();
    monsterEyes(ctx, -7, -14, 8, -14, "slash", 2);
    ctx.strokeStyle = "rgba(18, 31, 32, 0.78)";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(-18, 7);
    ctx.lineTo(-30, 18);
    ctx.moveTo(18, 5);
    ctx.lineTo(32, 14);
    ctx.stroke();
    ctx.restore();
  }

  function drawShrimpPortrait(ctx, x, y, scale = 1, mode = "battle", state = {}) {
    const t = state.time || performance.now() / 1000;
    const gallery = mode === "gallery";
    const hit = state.hitPulse || 0;
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    ctx.rotate(-0.18 + Math.sin(t * 5) * 0.025);
    monsterMist(ctx, "rgba(93, 150, 150, 0.24)", gallery ? 62 : 43, t);
    ctx.strokeStyle = "rgba(159, 217, 207, 0.45)";
    ctx.lineWidth = 1.4;
    for (let i = 0; i < 3; i += 1) {
      ctx.beginPath();
      ctx.moveTo(-34 + i * 12, 22 + i);
      ctx.quadraticCurveTo(-12 + i * 11, 16 + Math.sin(t * 2 + i) * 2, 16 + i * 10, 22);
      ctx.stroke();
    }

    const shell = hit > 0 ? "#fff1bd" : "#dd7041";
    for (let i = 0; i < 6; i += 1) {
      const px = -24 + i * 9;
      const py = Math.sin(i * 0.9) * 8 - i * 0.9;
      ctx.fillStyle = i % 2 ? "#f09a55" : shell;
      ctx.beginPath();
      ctx.ellipse(px, py, 8.5, 13, 0.65, 0, Math.PI * 2);
      ctx.fill();
      monsterInkStroke(ctx, "rgba(122, 55, 38, 0.62)", 1.1);
    }
    ctx.fillStyle = "#f3b077";
    ctx.beginPath();
    ctx.ellipse(28, -9, 13, 11, 0.12, 0, Math.PI * 2);
    ctx.fill();
    monsterInkStroke(ctx, "rgba(122, 55, 38, 0.7)", 1.4);
    monsterEyes(ctx, 24, -13, 34, -13, "dot", 1.8);

    ctx.strokeStyle = "#f5b078";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(35, -15);
    ctx.quadraticCurveTo(58, -39, 73, -26 + Math.sin(t * 2) * 3);
    ctx.moveTo(34, -10);
    ctx.quadraticCurveTo(60, -19, 74, -6 + Math.cos(t * 2.2) * 3);
    ctx.stroke();

    ctx.strokeStyle = "#db653c";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(23, 0);
    ctx.quadraticCurveTo(35, 9, 47, 2);
    ctx.moveTo(45, 2);
    ctx.lineTo(55, -5);
    ctx.moveTo(45, 2);
    ctx.lineTo(55, 9);
    ctx.moveTo(12, 11);
    ctx.quadraticCurveTo(23, 21, 35, 16);
    ctx.stroke();

    if (gallery) {
      ctx.strokeStyle = "rgba(168, 65, 45, 0.55)";
      ctx.lineWidth = 1;
      for (let i = 0; i < 5; i += 1) {
        ctx.beginPath();
        ctx.moveTo(-19 + i * 8, 11);
        ctx.lineTo(-14 + i * 8, 23);
        ctx.stroke();
      }
    }
    ctx.restore();
  }

  function drawBoarDragonPortrait(ctx, x, y, scale = 1, mode = "battle", state = {}) {
    const t = state.time || performance.now() / 1000;
    const gallery = mode === "gallery";
    const hit = state.hitPulse || 0;
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    monsterMist(ctx, "rgba(89, 61, 43, 0.25)", gallery ? 70 : 50, t);
    ctx.fillStyle = hit > 0 ? "#fff1bd" : "#b47a64";
    ctx.beginPath();
    ctx.moveTo(-31, -14);
    ctx.bezierCurveTo(-44, 7, -22, 28, 7, 25);
    ctx.bezierCurveTo(38, 22, 48, -4, 28, -24);
    ctx.bezierCurveTo(8, -42, -21, -35, -31, -14);
    ctx.fill();
    monsterInkStroke(ctx, "rgba(82, 50, 39, 0.7)", 2);

    ctx.fillStyle = "#c98a73";
    ctx.beginPath();
    ctx.ellipse(3, -9, 20, 17, 0, 0, Math.PI * 2);
    ctx.fill();
    monsterInkStroke(ctx, "rgba(82, 50, 39, 0.65)", 1.5);
    ctx.fillStyle = "#f1b69f";
    ctx.beginPath();
    ctx.ellipse(1, -2, 12, 8, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#5d392f";
    ctx.beginPath();
    ctx.arc(-4, -2, 1.8, 0, Math.PI * 2);
    ctx.arc(6, -2, 1.8, 0, Math.PI * 2);
    ctx.fill();
    monsterEyes(ctx, -10, -15, 13, -15, "dot", 2);

    ctx.fillStyle = "#fff1bd";
    ctx.beginPath();
    ctx.moveTo(-15, 2);
    ctx.quadraticCurveTo(-24, 11, -17, 16);
    ctx.quadraticCurveTo(-12, 10, -10, 3);
    ctx.moveTo(16, 1);
    ctx.quadraticCurveTo(27, 10, 20, 16);
    ctx.quadraticCurveTo(14, 10, 11, 3);
    ctx.fill();

    ctx.strokeStyle = "#e8d09b";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(-12, -5);
    ctx.quadraticCurveTo(-36, -17, -48, -1 + Math.sin(t * 2) * 2);
    ctx.moveTo(14, -5);
    ctx.quadraticCurveTo(39, -19, 50, -3 + Math.cos(t * 2) * 2);
    ctx.stroke();

    if (gallery) {
      ctx.fillStyle = "#6e8f84";
      for (let i = 0; i < 5; i += 1) {
        ctx.beginPath();
        ctx.moveTo(-22 + i * 10, -28 - Math.sin(i) * 2);
        ctx.lineTo(-15 + i * 10, -39);
        ctx.lineTo(-8 + i * 10, -27);
        ctx.fill();
      }
      ctx.strokeStyle = "rgba(83, 103, 93, 0.68)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(-28, -21);
      ctx.quadraticCurveTo(-5, -31, 25, -22);
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawFrogPortrait(ctx, x, y, scale = 1, mode = "battle", state = {}) {
    const t = state.time || performance.now() / 1000;
    const gallery = mode === "gallery";
    const hit = state.hitPulse || 0;
    const squat = Math.sin(t * 5) * (gallery ? 1.3 : 1.8);
    ctx.save();
    ctx.translate(x, y + squat);
    ctx.scale(scale, scale);
    monsterMist(ctx, "rgba(52, 108, 72, 0.25)", gallery ? 62 : 46, t);
    if (gallery) {
      ctx.fillStyle = "rgba(117, 164, 89, 0.5)";
      ctx.beginPath();
      ctx.ellipse(0, 22, 39, 12, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(31, 86, 87, 0.5)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, 22);
      ctx.lineTo(28, 15);
      ctx.stroke();
    }
    ctx.fillStyle = hit > 0 ? "#fff1bd" : "#4d9a62";
    ctx.beginPath();
    ctx.ellipse(0, 0, 24, 24, 0, 0, Math.PI * 2);
    ctx.fill();
    monsterInkStroke(ctx, "rgba(35, 77, 50, 0.7)", 1.8);
    ctx.fillStyle = "#f3fff9";
    ctx.beginPath();
    ctx.ellipse(0, 8, 15, 12, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#78bd70";
    ctx.beginPath();
    ctx.arc(-13, -21, 9, 0, Math.PI * 2);
    ctx.arc(13, -21, 9, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#f4fff8";
    ctx.beginPath();
    ctx.arc(-13, -21, 6, 0, Math.PI * 2);
    ctx.arc(13, -21, 6, 0, Math.PI * 2);
    ctx.fill();
    monsterEyes(ctx, -13, -21, 13, -21, "dot", 2.1);
    ctx.strokeStyle = "rgba(34, 73, 53, 0.65)";
    ctx.lineWidth = 3.2;
    ctx.beginPath();
    ctx.moveTo(-19, 13);
    ctx.quadraticCurveTo(-36, 21, -25, 28);
    ctx.moveTo(19, 13);
    ctx.quadraticCurveTo(36, 21, 25, 28);
    ctx.stroke();
    if (gallery) {
      ctx.fillStyle = "rgba(232, 247, 239, 0.72)";
      ctx.beginPath();
      ctx.moveTo(-10, -2);
      ctx.quadraticCurveTo(0, 4, 10, -2);
      ctx.lineTo(8, 12);
      ctx.quadraticCurveTo(0, 17, -8, 12);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = "rgba(245, 215, 138, 0.55)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(-7, 5);
      ctx.lineTo(7, 5);
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawLampGrannyPortrait(ctx, x, y, scale = 1, mode = "battle", state = {}) {
    const t = state.time || performance.now() / 1000;
    const gallery = mode === "gallery";
    const hit = state.hitPulse || 0;
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    monsterMist(ctx, "rgba(108, 59, 41, 0.24)", gallery ? 58 : 42, t);
    ctx.fillStyle = hit > 0 ? "#fff1bd" : "#6f3f38";
    ctx.beginPath();
    ctx.moveTo(-18, -18);
    ctx.bezierCurveTo(-26, -1, -23, 20, -4, 24);
    ctx.bezierCurveTo(17, 26, 24, 3, 13, -18);
    ctx.bezierCurveTo(5, -31, -10, -31, -18, -18);
    ctx.fill();
    monsterInkStroke(ctx, "rgba(64, 38, 35, 0.75)", 1.8);
    ctx.fillStyle = "#d7b88c";
    ctx.beginPath();
    ctx.ellipse(-3, -20, 12, 11, -0.08, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "rgba(88, 62, 53, 0.58)";
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(-12, -23);
    ctx.quadraticCurveTo(-2, -30, 9, -23);
    ctx.stroke();
    monsterEyes(ctx, -7, -20, 4, -20, "dot", 1.5);
    ctx.strokeStyle = "#5e3d31";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(-7, -14);
    ctx.quadraticCurveTo(-2, -11, 4, -14);
    ctx.stroke();

    ctx.strokeStyle = "#7c4b37";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(12, -4);
    ctx.quadraticCurveTo(30, -11, 39, -25);
    ctx.stroke();
    ctx.fillStyle = "#7d4f2f";
    ctx.beginPath();
    ctx.ellipse(44, -28, 11, 5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#ffb35f";
    ctx.shadowColor = "#ff9f43";
    ctx.shadowBlur = gallery ? 14 : 8;
    ctx.beginPath();
    ctx.moveTo(44, -56);
    ctx.bezierCurveTo(30, -39, 39, -28, 44, -29);
    ctx.bezierCurveTo(58, -34, 52, -45, 44, -56);
    ctx.fill();
    ctx.shadowBlur = 0;
    if (gallery) {
      ctx.fillStyle = "rgba(255, 191, 94, 0.5)";
      for (let i = 0; i < 5; i += 1) {
        ctx.beginPath();
        ctx.arc(30 + Math.sin(t + i) * 25, -42 + Math.cos(t * 1.5 + i) * 14, 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.restore();
  }

  function drawStoneArmorPortrait(ctx, x, y, scale = 1, mode = "battle", state = {}) {
    const t = state.time || performance.now() / 1000;
    const gallery = mode === "gallery";
    const hit = state.hitPulse || 0;
    const rock = hit > 0 ? "#fff1bd" : "#74807d";
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    monsterMist(ctx, "rgba(74, 90, 86, 0.26)", gallery ? 64 : 45, t);
    const stones = [
      [-10, -32, 18, 14, -0.2],
      [10, -28, 17, 13, 0.35],
      [-16, -10, 21, 19, 0.18],
      [9, -8, 24, 20, -0.12],
      [-4, 14, 28, 18, 0.05],
    ];
    stones.forEach(([sx, sy, sw, sh, rot], index) => {
      ctx.save();
      ctx.translate(sx, sy);
      ctx.rotate(rot);
      ctx.fillStyle = index % 2 ? "#66756f" : rock;
      ctx.beginPath();
      ctx.moveTo(-sw, -sh * 0.55);
      ctx.lineTo(-sw * 0.32, -sh);
      ctx.lineTo(sw * 0.74, -sh * 0.7);
      ctx.lineTo(sw, sh * 0.1);
      ctx.lineTo(sw * 0.3, sh);
      ctx.lineTo(-sw * 0.82, sh * 0.72);
      ctx.closePath();
      ctx.fill();
      monsterInkStroke(ctx, "rgba(35, 55, 54, 0.72)", 1.5);
      ctx.restore();
    });
    ctx.strokeStyle = hit > 0 ? "#fff1bd" : "rgba(23, 63, 66, 0.86)";
    ctx.lineWidth = gallery ? 2 : 1.5;
    ctx.beginPath();
    ctx.moveTo(-18, -17);
    ctx.lineTo(-3, -5);
    ctx.lineTo(-12, 7);
    ctx.moveTo(14, -20);
    ctx.lineTo(5, -8);
    ctx.lineTo(21, 1);
    ctx.moveTo(-1, 8);
    ctx.lineTo(13, 20);
    ctx.stroke();
    monsterEyes(ctx, -8, -18, 9, -16, "dot", 2.1);
    if (gallery) {
      ctx.strokeStyle = "rgba(243, 255, 249, 0.42)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(-29, 4);
      ctx.quadraticCurveTo(-44, 10, -42, 22);
      ctx.moveTo(30, 1);
      ctx.quadraticCurveTo(48, 7, 45, 21);
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawYakshaPortrait(ctx, x, y, scale = 1, mode = "battle", state = {}) {
    const t = state.time || performance.now() / 1000;
    const gallery = mode === "gallery";
    const hit = state.hitPulse || 0;
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    monsterMist(ctx, "rgba(48, 31, 65, 0.32)", gallery ? 64 : 44, t);
    ctx.fillStyle = "rgba(20, 17, 26, 0.62)";
    ctx.beginPath();
    ctx.moveTo(-29, -20);
    ctx.quadraticCurveTo(-43, 8, -26, 31);
    ctx.quadraticCurveTo(-3, 18, 24, 31);
    ctx.quadraticCurveTo(42, 4, 25, -22);
    ctx.quadraticCurveTo(0, -10, -29, -20);
    ctx.fill();
    ctx.fillStyle = hit > 0 ? "#fff1bd" : "#4d315f";
    ctx.beginPath();
    ctx.moveTo(-17, -24);
    ctx.bezierCurveTo(-28, -5, -20, 22, 0, 23);
    ctx.bezierCurveTo(23, 22, 29, -6, 16, -25);
    ctx.bezierCurveTo(8, -34, -8, -34, -17, -24);
    ctx.fill();
    monsterInkStroke(ctx, "rgba(27, 17, 34, 0.78)", 2);
    ctx.strokeStyle = "#f5d78a";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(-12, -31);
    ctx.quadraticCurveTo(-26, -50, -32, -28);
    ctx.moveTo(12, -31);
    ctx.quadraticCurveTo(27, -50, 32, -28);
    ctx.stroke();
    monsterEyes(ctx, -7, -17, 8, -17, "slash", 2.2);
    ctx.strokeStyle = "#241524";
    ctx.lineWidth = gallery ? 4.5 : 3.5;
    ctx.beginPath();
    ctx.moveTo(-19, 2);
    ctx.quadraticCurveTo(-39, 4, -45, -7);
    ctx.moveTo(20, 0);
    ctx.quadraticCurveTo(41, 3, 47, -10);
    ctx.stroke();
    ctx.strokeStyle = "#f3fff9";
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.moveTo(-44, -7);
    ctx.lineTo(-49, -16);
    ctx.moveTo(47, -10);
    ctx.lineTo(53, -19);
    ctx.stroke();
    if (gallery) {
      ctx.strokeStyle = "rgba(146, 92, 168, 0.45)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-37, -28);
      ctx.quadraticCurveTo(-62, -7, -44, 16);
      ctx.moveTo(37, -27);
      ctx.quadraticCurveTo(61, -5, 42, 17);
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawWingDemonPortrait(ctx, x, y, scale = 1, mode = "battle", state = {}) {
    const t = state.time || performance.now() / 1000;
    const gallery = mode === "gallery";
    const hit = state.hitPulse || 0;
    const flap = Math.sin(t * 7) * (gallery ? 8 : 5);
    ctx.save();
    ctx.translate(x, y - 6 + Math.sin(t * 3) * 2);
    ctx.scale(scale, scale);
    monsterMist(ctx, "rgba(28, 60, 62, 0.18)", gallery ? 58 : 38, t);
    ctx.fillStyle = "rgba(17, 38, 42, 0.82)";
    ctx.beginPath();
    ctx.moveTo(-8, -15);
    ctx.bezierCurveTo(-38, -42 - flap, -55, -2 - flap, -22, 7);
    ctx.quadraticCurveTo(-7, -3, -2, -13);
    ctx.moveTo(8, -15);
    ctx.bezierCurveTo(38, -42 - flap, 55, -2 - flap, 22, 7);
    ctx.quadraticCurveTo(7, -3, 2, -13);
    ctx.fill();
    monsterInkStroke(ctx, "rgba(10, 29, 31, 0.72)", 1.4);
    ctx.strokeStyle = "rgba(159, 217, 207, 0.34)";
    ctx.lineWidth = 1.1;
    ctx.beginPath();
    ctx.moveTo(-8, -10);
    ctx.lineTo(-35, -18 - flap * 0.4);
    ctx.moveTo(8, -10);
    ctx.lineTo(35, -18 - flap * 0.4);
    ctx.stroke();
    ctx.fillStyle = hit > 0 ? "#fff1bd" : "#274e51";
    ctx.beginPath();
    ctx.ellipse(0, -9, 11, 18, 0, 0, Math.PI * 2);
    ctx.fill();
    monsterInkStroke(ctx, "rgba(10, 29, 31, 0.72)", 1.3);
    ctx.fillStyle = "#e9b85f";
    ctx.beginPath();
    ctx.moveTo(-3, -20);
    ctx.lineTo(0, -28);
    ctx.lineTo(4, -20);
    ctx.fill();
    monsterEyes(ctx, -4, -13, 4, -13, "dot", 1.6);
    ctx.strokeStyle = "#152d30";
    ctx.lineWidth = 1.7;
    ctx.beginPath();
    ctx.moveTo(-5, 8);
    ctx.lineTo(-12, 18);
    ctx.moveTo(5, 8);
    ctx.lineTo(12, 18);
    ctx.stroke();
    ctx.restore();
  }

  function drawCurseMagePortrait(ctx, x, y, scale = 1, mode = "battle", state = {}) {
    const t = state.time || performance.now() / 1000;
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    monsterMist(ctx, "rgba(84, 54, 114, 0.26)", mode === "gallery" ? 58 : 42, t);
    ctx.strokeStyle = "rgba(198, 135, 255, 0.42)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 0, 30 + Math.sin(t * 3) * 2, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = "#3f315a";
    ctx.beginPath();
    ctx.moveTo(-17, -20);
    ctx.quadraticCurveTo(0, -35, 17, -20);
    ctx.lineTo(23, 24);
    ctx.quadraticCurveTo(0, 34, -23, 24);
    ctx.closePath();
    ctx.fill();
    monsterInkStroke(ctx, "rgba(36, 24, 50, 0.75)", 1.8);
    monsterEyes(ctx, -6, -16, 6, -16, "dot", 1.8);
    ctx.strokeStyle = "#fff1bd";
    ctx.lineWidth = 2.4;
    ctx.beginPath();
    ctx.moveTo(19, -20);
    ctx.lineTo(36, -43);
    ctx.stroke();
    ctx.fillStyle = "#fff1bd";
    ctx.fillRect(-32, -5, 12, 17);
    ctx.strokeStyle = "#d54b55";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(-29, 0);
    ctx.lineTo(-23, 0);
    ctx.moveTo(-29, 5);
    ctx.lineTo(-24, 9);
    ctx.stroke();
    ctx.restore();
  }

  function drawBoneDemonPortrait(ctx, x, y, scale = 1, mode = "battle", state = {}) {
    const t = state.time || performance.now() / 1000;
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    monsterMist(ctx, "rgba(228, 236, 224, 0.18)", mode === "gallery" ? 58 : 40, t);
    ctx.fillStyle = "#e8f7ef";
    ctx.beginPath();
    ctx.ellipse(0, -25, 14, 13, 0, 0, Math.PI * 2);
    ctx.fill();
    monsterInkStroke(ctx, "rgba(72, 80, 76, 0.66)", 1.4);
    monsterEyes(ctx, -5, -27, 5, -27, "dot", 1.8);
    ctx.strokeStyle = "#e8f7ef";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(0, -12);
    ctx.lineTo(0, 18);
    ctx.moveTo(-17, -1);
    ctx.lineTo(17, -1);
    ctx.moveTo(-14, 9);
    ctx.lineTo(14, 9);
    ctx.moveTo(-7, 18);
    ctx.lineTo(-16, 30);
    ctx.moveTo(7, 18);
    ctx.lineTo(16, 30);
    ctx.stroke();
    ctx.strokeStyle = "#d84e45";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(-19, -8);
    ctx.quadraticCurveTo(0, 2 + Math.sin(t * 4) * 2, 20, -10);
    ctx.stroke();
    ctx.restore();
  }

  function drawBlackWindPortrait(ctx, x, y, scale = 1, mode = "battle", state = {}) {
    const t = state.time || performance.now() / 1000;
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    monsterMist(ctx, "rgba(16, 27, 31, 0.28)", mode === "gallery" ? 66 : 48, t);
    ctx.strokeStyle = "rgba(18, 31, 32, 0.82)";
    ctx.lineWidth = mode === "gallery" ? 11 : 8;
    ctx.lineCap = "round";
    for (let i = 0; i < 4; i += 1) {
      ctx.beginPath();
      ctx.arc(0, -8, 13 + i * 7, t * 1.7 + i, t * 1.7 + i + Math.PI * 1.25);
      ctx.stroke();
    }
    ctx.fillStyle = "#18262a";
    ctx.beginPath();
    ctx.ellipse(0, -10, 22, 24, 0.1, 0, Math.PI * 2);
    ctx.fill();
    monsterEyes(ctx, -7, -13, 8, -13, "slash", 2.3);
    ctx.strokeStyle = "#f5d78a";
    ctx.lineWidth = 2.4;
    ctx.beginPath();
    ctx.moveTo(-9, -29);
    ctx.quadraticCurveTo(-20, -42, -24, -25);
    ctx.moveTo(9, -29);
    ctx.quadraticCurveTo(20, -42, 24, -25);
    ctx.stroke();
    ctx.restore();
  }

  function drawBossBlackWindPortrait(ctx, x, y, scale = 1, mode = "battle", state = {}) {
    const t = state.time || performance.now() / 1000;
    const gallery = mode === "gallery";
    const hit = state.hitPulse || 0;
    ctx.save();
    ctx.translate(x, y + (gallery ? 1 : 0));
    ctx.scale(scale, scale);
    monsterMist(ctx, "rgba(8, 18, 22, 0.36)", gallery ? 86 : 62, t);

    ctx.save();
    ctx.strokeStyle = "rgba(9, 17, 20, 0.78)";
    ctx.lineWidth = gallery ? 15 : 10;
    ctx.lineCap = "round";
    for (let i = 0; i < 5; i += 1) {
      ctx.beginPath();
      ctx.arc(0, -8, 24 + i * 8, t * 1.8 + i * 0.8, t * 1.8 + i * 0.8 + Math.PI * 1.15);
      ctx.stroke();
    }
    ctx.strokeStyle = "rgba(159, 217, 207, 0.34)";
    ctx.lineWidth = gallery ? 2.4 : 1.7;
    for (let i = 0; i < 4; i += 1) {
      ctx.beginPath();
      ctx.arc(0, -7, 18 + i * 11, -t * 2.2 + i, -t * 2.2 + i + Math.PI * 0.88);
      ctx.stroke();
    }
    ctx.restore();

    ctx.fillStyle = hit > 0 ? "#fff1bd" : "#151d21";
    ctx.beginPath();
    ctx.moveTo(-34, -32);
    ctx.bezierCurveTo(-56, -10, -42, 43, -5, 48);
    ctx.bezierCurveTo(35, 48, 55, 8, 35, -31);
    ctx.bezierCurveTo(20, -50, -18, -50, -34, -32);
    ctx.fill();
    monsterInkStroke(ctx, "rgba(3, 9, 12, 0.82)", gallery ? 3 : 2.4);

    ctx.fillStyle = "#111719";
    ctx.beginPath();
    ctx.ellipse(0, -23, 23, 19, 0, 0, Math.PI * 2);
    ctx.fill();
    monsterInkStroke(ctx, "rgba(245, 215, 138, 0.38)", 1.2);
    ctx.strokeStyle = "#f5d78a";
    ctx.lineWidth = gallery ? 4.5 : 3.4;
    ctx.beginPath();
    ctx.moveTo(-14, -40);
    ctx.quadraticCurveTo(-33, -63, -38, -34);
    ctx.moveTo(14, -40);
    ctx.quadraticCurveTo(33, -63, 38, -34);
    ctx.stroke();
    monsterEyes(ctx, -9, -25, 10, -25, "slash", gallery ? 2.9 : 2.2);

    ctx.strokeStyle = "rgba(245, 215, 138, 0.82)";
    ctx.lineWidth = gallery ? 3 : 2.2;
    ctx.beginPath();
    ctx.moveTo(-24, 0);
    ctx.quadraticCurveTo(0, 14 + Math.sin(t * 4) * 2, 26, 0);
    ctx.stroke();
    ctx.fillStyle = "rgba(255, 241, 189, 0.86)";
    for (let i = 0; i < 5; i += 1) {
      ctx.beginPath();
      ctx.arc(-22 + i * 11, 7 + Math.sin(t * 3 + i) * 1.3, gallery ? 2.3 : 1.8, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  function drawBossYellowWindPortrait(ctx, x, y, scale = 1, mode = "battle", state = {}) {
    const t = state.time || performance.now() / 1000;
    const gallery = mode === "gallery";
    const hit = state.hitPulse || 0;
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    monsterMist(ctx, "rgba(191, 142, 51, 0.26)", gallery ? 86 : 62, t);

    ctx.strokeStyle = "rgba(233, 184, 95, 0.52)";
    ctx.lineWidth = gallery ? 6 : 4;
    ctx.lineCap = "round";
    for (let i = 0; i < 5; i += 1) {
      const yy = -42 + i * 20;
      ctx.beginPath();
      ctx.moveTo(-62 + Math.sin(t * 2 + i) * 8, yy);
      ctx.quadraticCurveTo(-10, yy - 15, 54 + Math.cos(t * 2 + i) * 10, yy + 2);
      ctx.stroke();
    }
    ctx.strokeStyle = "rgba(255, 241, 189, 0.32)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(2, -8, 52 + Math.sin(t * 2.2) * 3, t, t + Math.PI * 1.35);
    ctx.stroke();

    ctx.fillStyle = hit > 0 ? "#fff1bd" : "#8b6a35";
    ctx.beginPath();
    ctx.moveTo(-31, -34);
    ctx.bezierCurveTo(-49, -3, -40, 39, -6, 49);
    ctx.bezierCurveTo(36, 52, 50, 10, 32, -34);
    ctx.bezierCurveTo(18, -53, -18, -54, -31, -34);
    ctx.fill();
    monsterInkStroke(ctx, "rgba(88, 59, 26, 0.78)", gallery ? 2.8 : 2.1);

    ctx.fillStyle = "#b58a42";
    ctx.beginPath();
    ctx.moveTo(-20, -37);
    ctx.lineTo(-31, -57);
    ctx.lineTo(-5, -44);
    ctx.moveTo(20, -37);
    ctx.lineTo(32, -56);
    ctx.lineTo(5, -44);
    ctx.fill();
    ctx.fillStyle = "#d8aa58";
    ctx.beginPath();
    ctx.ellipse(0, -25, 23, 17, 0, 0, Math.PI * 2);
    ctx.fill();
    monsterEyes(ctx, -8, -27, 8, -27, "slash", gallery ? 2.4 : 2);

    ctx.strokeStyle = "#fff1bd";
    ctx.lineWidth = 1.3;
    ctx.beginPath();
    ctx.moveTo(-14, -17);
    ctx.quadraticCurveTo(-34, -13, -46, -18);
    ctx.moveTo(14, -17);
    ctx.quadraticCurveTo(35, -13, 47, -18);
    ctx.stroke();

    ctx.fillStyle = "#f5d78a";
    ctx.beginPath();
    ctx.moveTo(24, -4);
    ctx.quadraticCurveTo(47, 5, 44, 31);
    ctx.quadraticCurveTo(30, 18, 16, 18);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = "rgba(122, 89, 38, 0.72)";
    ctx.lineWidth = 1.1;
    for (let i = 0; i < 4; i += 1) {
      ctx.beginPath();
      ctx.moveTo(24 + i * 4, 2 + i * 4);
      ctx.lineTo(41 - i * 3, 12 + i * 3);
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawBossBoneLadyPortrait(ctx, x, y, scale = 1, mode = "battle", state = {}) {
    const t = state.time || performance.now() / 1000;
    const gallery = mode === "gallery";
    const hit = state.hitPulse || 0;
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    monsterMist(ctx, "rgba(232, 247, 239, 0.18)", gallery ? 80 : 58, t);

    ctx.save();
    ctx.globalAlpha = 0.28;
    ctx.strokeStyle = "#d7fff5";
    ctx.lineWidth = 1.6;
    for (let i = 0; i < 3; i += 1) {
      ctx.beginPath();
      ctx.ellipse((i - 1) * 22, -10 + i * 8, 22, 48, i * 0.55 + Math.sin(t) * 0.05, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.restore();

    ctx.strokeStyle = "rgba(255, 107, 87, 0.78)";
    ctx.lineWidth = gallery ? 6 : 4;
    ctx.beginPath();
    ctx.moveTo(-36, -8);
    ctx.bezierCurveTo(-60, 12, -35, 38, -54, 57);
    ctx.moveTo(35, -10);
    ctx.bezierCurveTo(63, 10, 37, 38, 55, 58);
    ctx.stroke();

    ctx.fillStyle = hit > 0 ? "#fff1bd" : "#f0f7ef";
    ctx.beginPath();
    ctx.moveTo(-19, -39);
    ctx.bezierCurveTo(-34, -23, -31, 12, -7, 34);
    ctx.bezierCurveTo(8, 47, 27, 20, 25, -14);
    ctx.bezierCurveTo(24, -38, -2, -54, -19, -39);
    ctx.fill();
    monsterInkStroke(ctx, "rgba(69, 84, 78, 0.78)", gallery ? 2.4 : 1.9);

    ctx.fillStyle = "#e8f7ef";
    ctx.beginPath();
    ctx.ellipse(0, -39, 17, 19, 0, 0, Math.PI * 2);
    ctx.fill();
    monsterInkStroke(ctx, "rgba(69, 84, 78, 0.7)", 1.4);
    monsterEyes(ctx, -6, -41, 6, -41, "dot", gallery ? 2.4 : 1.8);
    ctx.strokeStyle = "#ff6b57";
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.moveTo(-10, -54);
    ctx.lineTo(2, -65);
    ctx.lineTo(13, -53);
    ctx.stroke();

    ctx.strokeStyle = "#cfded6";
    ctx.lineWidth = gallery ? 4.5 : 3.4;
    ctx.beginPath();
    ctx.moveTo(0, -19);
    ctx.lineTo(0, 38);
    ctx.moveTo(-19, -4);
    ctx.lineTo(21, -4);
    ctx.moveTo(-16, 9);
    ctx.lineTo(18, 9);
    ctx.moveTo(-7, 37);
    ctx.lineTo(-19, 58);
    ctx.moveTo(7, 37);
    ctx.lineTo(20, 58);
    ctx.stroke();

    ctx.strokeStyle = "rgba(49, 91, 87, 0.54)";
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(-16, -5);
    ctx.lineTo(16, 24);
    ctx.moveTo(16, -5);
    ctx.lineTo(-14, 24);
    ctx.stroke();
    ctx.restore();
  }

  function drawBossBullKingPortrait(ctx, x, y, scale = 1, mode = "battle", state = {}) {
    const t = state.time || performance.now() / 1000;
    const gallery = mode === "gallery";
    const hit = state.hitPulse || 0;
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    monsterMist(ctx, "rgba(105, 38, 27, 0.32)", gallery ? 96 : 70, t);

    ctx.save();
    ctx.globalAlpha = 0.35;
    ctx.strokeStyle = "#ff6b57";
    ctx.lineWidth = gallery ? 5 : 3.5;
    for (let i = 0; i < 4; i += 1) {
      ctx.beginPath();
      ctx.moveTo(-54 + i * 18, 52);
      ctx.quadraticCurveTo(-39 + i * 20, 28 + Math.sin(t * 3 + i) * 5, -27 + i * 20, 45);
      ctx.stroke();
    }
    ctx.restore();

    ctx.fillStyle = hit > 0 ? "#fff1bd" : "#6c3027";
    ctx.beginPath();
    ctx.moveTo(-38, -31);
    ctx.bezierCurveTo(-60, -3, -50, 43, -14, 57);
    ctx.bezierCurveTo(20, 69, 61, 39, 45, -13);
    ctx.bezierCurveTo(38, -43, -17, -60, -38, -31);
    ctx.fill();
    monsterInkStroke(ctx, "rgba(61, 24, 20, 0.86)", gallery ? 3.3 : 2.5);

    ctx.strokeStyle = "#f5d78a";
    ctx.lineWidth = gallery ? 8 : 6;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(-19, -45);
    ctx.quadraticCurveTo(-65, -77, -74, -27);
    ctx.moveTo(20, -45);
    ctx.quadraticCurveTo(66, -78, 75, -27);
    ctx.stroke();
    ctx.strokeStyle = "rgba(255, 241, 189, 0.54)";
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.moveTo(-49, -55);
    ctx.lineTo(-71, -30);
    ctx.moveTo(49, -56);
    ctx.lineTo(72, -31);
    ctx.stroke();

    ctx.fillStyle = "#7b3b31";
    ctx.beginPath();
    ctx.ellipse(0, -28, 29, 23, 0, 0, Math.PI * 2);
    ctx.fill();
    monsterEyes(ctx, -10, -32, 10, -32, "slash", gallery ? 3 : 2.4);
    ctx.fillStyle = "#8f4b3e";
    ctx.beginPath();
    ctx.ellipse(0, -17, 15, 9, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#fff1bd";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, -14, 8, 0.2, Math.PI - 0.2);
    ctx.stroke();

    ctx.strokeStyle = "#ff6b57";
    ctx.lineWidth = gallery ? 3 : 2.2;
    for (let i = -1; i <= 1; i += 1) {
      ctx.beginPath();
      ctx.moveTo(i * 14, -4);
      ctx.lineTo(i * 5, 42);
      ctx.stroke();
    }
    ctx.strokeStyle = "#3c1b18";
    ctx.lineWidth = gallery ? 7 : 5;
    ctx.beginPath();
    ctx.moveTo(41, -2);
    ctx.lineTo(70, 42);
    ctx.stroke();
    ctx.fillStyle = "#f5d78a";
    ctx.beginPath();
    ctx.moveTo(72, 38);
    ctx.lineTo(91, 51);
    ctx.lineTo(72, 60);
    ctx.lineTo(58, 47);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  function drawBullVanguardPortrait(ctx, x, y, scale = 1, mode = "battle", state = {}) {
    const t = state.time || performance.now() / 1000;
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    monsterMist(ctx, "rgba(95, 46, 40, 0.28)", mode === "gallery" ? 78 : 54, t);
    ctx.fillStyle = state.hitPulse > 0 ? "#fff1bd" : "#6a332b";
    ctx.beginPath();
    ctx.moveTo(-25, -19);
    ctx.bezierCurveTo(-40, 3, -31, 30, 0, 32);
    ctx.bezierCurveTo(32, 30, 41, 3, 25, -19);
    ctx.bezierCurveTo(14, -35, -14, -35, -25, -19);
    ctx.fill();
    monsterInkStroke(ctx, "rgba(61, 24, 20, 0.78)", 2.2);
    ctx.strokeStyle = "#f5d78a";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(-15, -30);
    ctx.quadraticCurveTo(-42, -53, -47, -20);
    ctx.moveTo(15, -30);
    ctx.quadraticCurveTo(42, -53, 47, -20);
    ctx.stroke();
    monsterEyes(ctx, -8, -17, 8, -17, "slash", 2.3);
    ctx.fillStyle = "#8e5044";
    ctx.beginPath();
    ctx.ellipse(0, -7, 12, 8, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#f5d78a";
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.moveTo(-18, -3);
    ctx.quadraticCurveTo(0, 8, 18, -3);
    ctx.moveTo(-15, 10);
    ctx.lineTo(15, 22);
    ctx.stroke();
    ctx.restore();
  }

  function drawMonsterIllustration(ctx, key, x, y, scale = 1, mode = "battle", state = {}) {
    const normalized = normalizeEnemyType(key) || "foxDemon";
    const t = state.time || performance.now() / 1000;
    const hitPulse = state.hitPulse || 0;
    if (drawMonsterSpriteImage(ctx, normalized, x, y, scale, mode, state)) return;
    ctx.save();
    if (hitPulse > 0) {
      ctx.shadowColor = "#fff1bd";
      ctx.shadowBlur = mode === "gallery" ? 18 : 8;
    }
    if (normalized === "bossBlackWind") {
      drawBossBlackWindPortrait(ctx, x, y, scale, mode, { ...state, time: t });
    } else if (normalized === "bossYellowWind") {
      drawBossYellowWindPortrait(ctx, x, y, scale, mode, { ...state, time: t });
    } else if (normalized === "bossBoneLady") {
      drawBossBoneLadyPortrait(ctx, x, y, scale, mode, { ...state, time: t });
    } else if (normalized === "bossBullKing") {
      drawBossBullKingPortrait(ctx, x, y, scale, mode, { ...state, time: t });
    } else {
      switch (normalized) {
        case "foxDemon":
          drawFoxPortrait(ctx, x, y, scale, mode, state);
          break;
        case "dogDemon":
          drawDogDemonPortrait(ctx, x, y, scale, mode, state);
          break;
        case "shrimpDemon":
          drawShrimpPortrait(ctx, x, y, scale, mode, state);
          break;
        case "boarDragon":
          drawBoarDragonPortrait(ctx, x, y, scale, mode, state);
          break;
        case "frogDemon":
          drawFrogPortrait(ctx, x, y, scale, mode, state);
          break;
        case "lampGranny":
          drawLampGrannyPortrait(ctx, x, y, scale, mode, state);
          break;
        case "stoneArmor":
          drawStoneArmorPortrait(ctx, x, y, scale, mode, state);
          break;
        case "yaksha":
          drawYakshaPortrait(ctx, x, y, scale, mode, state);
          break;
        case "wingDemon":
          drawWingDemonPortrait(ctx, x, y, scale, mode, state);
          break;
        case "curseMage":
          drawCurseMagePortrait(ctx, x, y, scale, mode, state);
          break;
        case "nineTailShade":
          drawFoxPortrait(ctx, x - 1, y, scale * 1.04, mode, { ...state, time: t, hitPulse });
          if (mode === "gallery") {
            ctx.save();
            ctx.globalAlpha = 0.35;
            drawFoxPortrait(ctx, x + 14, y - 2, scale * 0.9, mode, { ...state, time: t + 0.7 });
            ctx.restore();
          }
          break;
        case "waterApe":
          drawFrogPortrait(ctx, x - 4, y + 3, scale * 1.04, mode, state);
          ctx.save();
          ctx.translate(x, y);
          ctx.scale(scale, scale);
          ctx.strokeStyle = "rgba(159, 217, 207, 0.55)";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(0, 5, 34 + Math.sin(t * 3) * 3, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();
          break;
        case "blackWind":
          drawBlackWindPortrait(ctx, x, y, scale, mode, state);
          break;
        case "boneDemon":
          drawBoneDemonPortrait(ctx, x, y, scale, mode, state);
          break;
        case "bullVanguard":
          drawBullVanguardPortrait(ctx, x, y, scale, mode, state);
          break;
        default:
          drawFoxPortrait(ctx, x, y, scale, mode, state);
      }
    }
    ctx.restore();
  }

  const SKILL_ORDER = ["sword", "fire", "ice", "thunder", "array"];
  const DEFAULT_SKILL_THEMES = {
    sword: { name: "主武器", shortName: "武器", icon: "武", desc: "主角的核心武器攻击，自动追击最近妖怪。", projectileName: "武器影" },
    fire: { name: "范围法术", shortName: "法术", icon: "法", desc: "范围法术命中后，对一片妖怪造成伤害。" },
    ice: { name: "镇妖控制", shortName: "控制", icon: "镇", desc: "镇妖术压制妖怪，使其行动迟缓。" },
    thunder: { name: "天威雷法", shortName: "天威", icon: "雷", desc: "召来天威雷光，弹射劈击多个妖怪。" },
    array: { name: "护山法阵", shortName: "法阵", icon: "阵", desc: "在山门前展开法阵，持续打击靠近妖怪。" },
  };

  const HERO_SKILL_THEMES = {
    wukong: {
      sword: { name: "金箍棒影", shortName: "棒影", icon: "棒", desc: "挥出金色棍影，自动追击最近妖怪。", projectileName: "棍影", color: "#f5d78a", accent: "#e84b35" },
      fire: { name: "火眼金睛", shortName: "火眼", icon: "眼", desc: "火眼迸发金焰，命中后灼烧一片妖怪。", color: "#f0b23a", accent: "#ff6b57" },
      ice: { name: "定身咒", shortName: "定身", icon: "定", desc: "以定身法压制妖怪，使其行动迟缓。", color: "#ffe6a3", accent: "#bfeee4" },
      thunder: { name: "筋斗雷", shortName: "筋雷", icon: "雷", desc: "召来筋斗云雷光，弹射劈击多个妖怪。", color: "#fff1bd", accent: "#9fd9cf" },
      array: { name: "齐天战阵", shortName: "战阵", icon: "阵", desc: "在山门前展开战阵，持续打击靠近妖怪。", color: "#f5d78a", accent: "#e84b35" },
    },
    tangseng: {
      sword: { name: "禅杖佛光", shortName: "佛光", icon: "佛", desc: "禅杖引出佛光，自动净化最近妖怪。", projectileName: "佛光", color: "#fff1bd", accent: "#f3fff9" },
      fire: { name: "莲火佛印", shortName: "莲火", icon: "莲", desc: "佛印化作莲火，命中后净化一片妖气。", color: "#ffe6a3", accent: "#f5d78a" },
      ice: { name: "紧箍梵音", shortName: "梵音", icon: "咒", desc: "梵音回荡，使妖怪心神迟滞。", color: "#f3fff9", accent: "#d7fff5" },
      thunder: { name: "金刚雷音", shortName: "雷音", icon: "音", desc: "金刚雷音震荡妖群，弹射造成伤害。", color: "#fff1bd", accent: "#bfeee4" },
      array: { name: "金莲法阵", shortName: "莲阵", icon: "阵", desc: "展开金莲法阵，持续庇护山门并净化妖怪。", color: "#fff1bd", accent: "#f3fff9" },
    },
    bajie: {
      sword: { name: "钉耙横扫", shortName: "钉耙", icon: "耙", desc: "挥动九齿钉耙，横扫最近的妖怪。", projectileName: "耙影", color: "#d9a35d", accent: "#fff1bd" },
      fire: { name: "妖火乱耙", shortName: "火耙", icon: "火", desc: "钉耙卷起妖火，命中后炸裂成范围伤害。", color: "#e9b85f", accent: "#ff6b57" },
      ice: { name: "饕餮吞势", shortName: "吞势", icon: "吞", desc: "吞吸妖气，减缓妖怪推进。", color: "#e8f7ef", accent: "#d9a35d" },
      thunder: { name: "震地雷耙", shortName: "雷耙", icon: "雷", desc: "九齿钉耙震地，引雷击退妖群。", color: "#f5d78a", accent: "#8e643f" },
      array: { name: "土行耙阵", shortName: "耙阵", icon: "阵", desc: "在山门前布下土行耙阵，持续阻挡妖怪。", color: "#d9a35d", accent: "#fff1bd" },
    },
    shaseng: {
      sword: { name: "月牙铲斩", shortName: "铲斩", icon: "铲", desc: "挥出月牙铲影，斩向最近妖怪。", projectileName: "铲影", color: "#9fd9cf", accent: "#315b57" },
      fire: { name: "赤砂爆", shortName: "赤砂", icon: "砂", desc: "赤砂炸开，对范围内妖怪造成伤害。", color: "#e9b85f", accent: "#6bb8c7" },
      ice: { name: "流沙困阵", shortName: "流沙", icon: "沙", desc: "流沙缠住妖怪，使其行动缓慢。", color: "#9fd9cf", accent: "#bfeee4" },
      thunder: { name: "卷帘雷击", shortName: "雷击", icon: "雷", desc: "卷帘雷光劈击妖怪，并向附近弹射。", color: "#bfeee4", accent: "#6bb8c7" },
      array: { name: "弱水法阵", shortName: "弱水", icon: "阵", desc: "弱水法阵持续侵蚀经过的妖怪。", color: "#9fd9cf", accent: "#315b57" },
    },
  };

  const SKILL_CATEGORY_MAP = {
    sword: "weapon",
    fire: "spell",
    ice: "control",
    thunder: "thunder",
    array: "formation",
  };

  const getSkillTheme = (skillKey, heroKey = "wukong") => {
    const normalizedHero = heroKey === "tang" ? "tangseng" : heroKey;
    const heroTheme = HERO_SKILL_THEMES[normalizedHero] || HERO_SKILL_THEMES.wukong;
    return heroTheme[skillKey] || DEFAULT_SKILL_THEMES[skillKey] || {
      name: skillKey,
      shortName: skillKey,
      icon: "术",
      desc: "",
      projectileName: skillKey,
    };
  };

  const SKILL_LABELS = {
    sword: DEFAULT_SKILL_THEMES.sword.name,
    fire: DEFAULT_SKILL_THEMES.fire.name,
    ice: DEFAULT_SKILL_THEMES.ice.name,
    thunder: DEFAULT_SKILL_THEMES.thunder.name,
    array: DEFAULT_SKILL_THEMES.array.name,
  };
  const SKILL_ICONS = {
    sword: DEFAULT_SKILL_THEMES.sword.icon,
    fire: DEFAULT_SKILL_THEMES.fire.icon,
    ice: DEFAULT_SKILL_THEMES.ice.icon,
    thunder: DEFAULT_SKILL_THEMES.thunder.icon,
    array: DEFAULT_SKILL_THEMES.array.icon,
    global: "悟",
    wall: "护",
    crit: "斩",
  };

  const RARITY = {
    common: { label: "普通", mult: 1, className: "common" },
    rare: { label: "稀有", mult: 1.5, className: "rare" },
    epic: { label: "史诗", mult: 2.2, className: "epic" },
  };

  const GEM_DEFS = {
    attack: {
      name: "破邪灵石",
      shardName: "破邪碎晶",
      current: (level) => `万法伤害 +${level * 3}%`,
    },
    cooldown: {
      name: "流转灵石",
      shardName: "流转碎晶",
      current: (level) => `万法冷却 -${Math.min(level * 2, 40)}%`,
    },
    wall: {
      name: "山门灵石",
      shardName: "山门碎晶",
      current: (level) => `山门血量 +${level * 10}`,
    },
    crit: {
      name: "斩魄灵石",
      shardName: "斩魄碎晶",
      current: (level) => `暴击率 +${Math.min(level * 2, 50)}%`,
    },
    exp: {
      name: "悟道灵石",
      shardName: "悟道碎晶",
      current: (level) => `斩妖修为 +${level * 5}%`,
    },
  };

  const TALENT_DEFS = {
    swordDamage: {
      name: "兵器精通",
      max: 10,
      current: (level) => `主武器伤害 +${level * 5}%`,
    },
    fireMastery: {
      name: "法术精通",
      max: 10,
      current: (level) => `范围法术效果 +${level * 4}%`,
    },
    iceMastery: {
      name: "镇妖控制",
      max: 10,
      current: (level) => `控制效果 +${level * 3}%`,
    },
    thunderMastery: {
      name: "天威感应",
      max: 10,
      current: (level) => `天威伤害 +${level * 5}%`,
    },
    swordArrayMastery: {
      name: "阵法修行",
      max: 10,
      current: (level) => `阵法伤害 +${level * 5}%`,
    },
    wallFortify: {
      name: "城墙加固",
      max: 10,
      current: (level) => `山门血量 +${level * 15}`,
    },
    battleInsight: {
      name: "战斗领悟",
      max: 10,
      current: (level) => `斩妖修为 +${level * 3}%`,
    },
    startSpirit: {
      name: "起始灵力",
      max: 5,
      current: (level) => `开局修为 +${level * 5}`,
    },
  };

  const JOURNEY_TRAINING_DEFS = {
    barrier: {
      name: "山门结界",
      max: 80,
      baseCost: 100,
      current: (level) => `结界生命 +${level * 5}`,
      next: (level) => `结界生命 +${(level + 1) * 5}`,
      applies: "所有角色开局结界最大生命。",
    },
    weapon: {
      name: "兵器精通",
      max: 60,
      baseCost: 120,
      current: (level) => `主武器技能伤害 +${(level * 1.5).toFixed(1)}%`,
      next: (level) => `主武器技能伤害 +${((level + 1) * 1.5).toFixed(1)}%`,
      applies: "适用于：金箍棒影 / 禅杖佛光 / 钉耙横扫 / 月牙铲斩。",
    },
    spell: {
      name: "法术精通",
      max: 60,
      baseCost: 120,
      current: (level) => `范围法术伤害 +${(level * 1.5).toFixed(1)}%`,
      next: (level) => `范围法术伤害 +${((level + 1) * 1.5).toFixed(1)}%`,
      applies: "适用于：火眼金睛 / 莲火佛印 / 妖火乱耙 / 赤砂爆。",
    },
    control: {
      name: "镇妖控制",
      max: 50,
      baseCost: 130,
      current: (level) => `控制伤害 +${level}%，控制效果 +${(level * 0.5).toFixed(1)}%`,
      next: (level) => `控制伤害 +${level + 1}%，控制效果 +${((level + 1) * 0.5).toFixed(1)}%`,
      applies: "适用于：定身、梵音、吞势、流沙等迟缓与控制。",
    },
    thunder: {
      name: "天威感应",
      max: 50,
      baseCost: 150,
      current: (level) => `天威伤害 +${(level * 1.5).toFixed(1)}%，弹射保留 +${Math.min(level * 0.2, 12).toFixed(1)}%`,
      next: (level) => `天威伤害 +${((level + 1) * 1.5).toFixed(1)}%，弹射保留 +${Math.min((level + 1) * 0.2, 12).toFixed(1)}%`,
      applies: "适用于：筋斗雷 / 金刚雷音 / 震地雷耙 / 卷帘雷击。",
    },
    formation: {
      name: "阵法修行",
      max: 50,
      baseCost: 150,
      current: (level) => `阵法伤害 +${(level * 1.5).toFixed(1)}%，持续时间 +${(level * 0.2).toFixed(1)}%`,
      next: (level) => `阵法伤害 +${((level + 1) * 1.5).toFixed(1)}%，持续时间 +${((level + 1) * 0.2).toFixed(1)}%`,
      applies: "适用于：齐天战阵 / 金莲法阵 / 土行耙阵 / 弱水法阵。",
    },
    agility: {
      name: "行者身法",
      max: 40,
      baseCost: 180,
      current: (level) => `所有技能冷却 -${(level * 0.35).toFixed(2)}%`,
      next: (level) => `所有技能冷却 -${((level + 1) * 0.35).toFixed(2)}%`,
      applies: "冷却倍率最低为 0.75。",
    },
    demonSlayer: {
      name: "降妖心法",
      max: 50,
      baseCost: 220,
      current: (level) => `对精英和 Boss 伤害 +${level}%`,
      next: (level) => `对精英和 Boss 伤害 +${level + 1}%`,
      applies: "对精英妖怪、Boss 妖王额外生效。",
    },
    spiritGain: {
      name: "聚灵行囊",
      max: 50,
      baseCost: 160,
      current: (level) => `通关灵石 +${level * 2}%`,
      next: (level) => `通关灵石 +${(level + 1) * 2}%`,
      applies: "影响战斗结算获得的灵石。",
    },
    protection: {
      name: "护法金光",
      max: 50,
      baseCost: 180,
      current: (level) => `结界受到伤害 -${(level * 0.4).toFixed(1)}%`,
      next: (level) => `结界受到伤害 -${((level + 1) * 0.4).toFixed(1)}%`,
      applies: "最高可提供 40% 结界减伤。",
    },
  };

  const createDefaultJourneyTraining = () => Object.fromEntries(
    Object.keys(JOURNEY_TRAINING_DEFS).map((id) => [id, 0]),
  );

  const getJourneyTrainingNextCost = (id, level) => {
    const def = JOURNEY_TRAINING_DEFS[id];
    if (!def) return 0;
    return Math.floor(def.baseCost * Math.pow(1.18, Math.max(0, level)));
  };

  const journeyTrainingAliases = {
    barrier: ["barrier", "wall", "castle", "wallHp", "wallFoundation", "wallFortify"],
    weapon: ["weapon", "sword", "swordDamage", "feijian", "swordComprehension"],
    spell: ["spell", "fire", "fireDamage", "fireMastery"],
    control: ["control", "ice", "slow", "frost", "frostSkill", "iceMastery"],
    thunder: ["thunder", "thunderDamage", "thunderManual", "thunderMastery"],
    formation: ["formation", "array", "swordArray", "formationOld", "swordArrayAtlas", "swordArrayMastery"],
    agility: ["agility", "cooldown", "speed", "agilityOld"],
    demonSlayer: ["demonSlayer", "eliteBossDamage", "bossDamage"],
    spiritGain: ["spiritGain", "coinGain", "rewardGain", "battleInsight"],
    protection: ["protection", "damageReduction", "wallDamageReduction", "guard"],
  };

  const getLegacyJourneyLevel = (source, aliases) => {
    if (!source || typeof source !== "object") return 0;
    let level = 0;
    for (const key of aliases) {
      const value = Number(source[key]);
      if (Number.isFinite(value)) level = Math.max(level, Math.floor(value));
    }
    return level;
  };

  const normalizeJourneyTraining = (source = {}, legacy = {}) => {
    const normalized = createDefaultJourneyTraining();
    for (const [id, def] of Object.entries(JOURNEY_TRAINING_DEFS)) {
      const current = Number(source?.[id]);
      const migrated = getLegacyJourneyLevel(legacy, journeyTrainingAliases[id] || [id]);
      normalized[id] = clamp(Math.max(
        Number.isFinite(current) ? Math.floor(current) : 0,
        migrated,
      ), 0, def.max);
    }
    return normalized;
  };

  const HERO_IDS = ["wukong", "tangseng", "bajie", "shaseng"];
  const HERO_ALIASES = { tang: "tangseng", tangseng: "tangseng" };
  const normalizeHeroId = (id) => HERO_ALIASES[id] || id;
  const HERO_MAX_LEVEL = 50;
  const HERO_DEFS = {
    wukong: {
      key: "wukong",
      name: "孙悟空",
      title: "齐天大圣",
      role: "高爆发 / 暴击 / 连击 / 分身",
      shortRole: "暴击连击",
      weapon: "如意金箍棒",
      initialSkills: ["sword", "thunder"],
      activeSkills: ["金箍棒影", "毫毛分身"],
      passive: "暴击率 +8%，暴击伤害 +20%，每隔一段时间触发残影追击。",
      playstyle: "攻速快，爆发高，适合主动清怪。",
      color: "#f0b23a",
      accent: "#e84b35",
      labels: { sword: "金箍棒影", fire: "火眼金睛", ice: "定身咒", thunder: "筋斗雷", array: "齐天战阵" },
      icons: { sword: "棒", fire: "眼", ice: "定", thunder: "雷", array: "阵" },
      bonuses: { critChance: 0.08, critDamageBonus: 0.2, damageMultiplier: 1.04 },
    },
    tangseng: {
      key: "tangseng",
      name: "唐僧",
      title: "旃檀功德佛",
      role: "辅助 / 回复 / 佛光 / 稳健",
      shortRole: "佛光回复",
      weapon: "禅杖 / 佛光",
      initialSkills: ["ice", "array"],
      activeSkills: ["禅杖佛光", "紧箍梵音"],
      passive: "城墙周期回复，稀有升级概率提高，受击有小概率触发佛光护盾。",
      playstyle: "生存强，节奏稳，适合持久战。",
      color: "#fff1bd",
      accent: "#d7fff5",
      labels: { sword: "禅杖佛光", fire: "莲火佛印", ice: "紧箍梵音", thunder: "金刚雷音", array: "金莲法阵" },
      icons: { sword: "佛", fire: "莲", ice: "咒", thunder: "音", array: "阵" },
      bonuses: { cooldownMultiplier: 0.96, rareChanceBonus: 0.08, regenPerSecond: 0.12, shieldChance: 0.08 },
    },
    bajie: {
      key: "bajie",
      name: "猪八戒",
      title: "天蓬元帅",
      role: "肉盾 / 范围 / 击退 / 抗压",
      shortRole: "抗压范围",
      weapon: "九齿钉耙",
      initialSkills: ["fire", "array"],
      activeSkills: ["钉耙横扫", "震地退妖"],
      passive: "城墙最大血量 +20%，怪物撞墙伤害降低 10%，范围技能半径 +8%。",
      playstyle: "抗压强，范围横扫，适合妖潮堆叠。",
      color: "#d9a35d",
      accent: "#6f4d32",
      labels: { sword: "钉耙横扫", fire: "妖火乱耙", ice: "饕餮吞势", thunder: "震地雷耙", array: "土行耙阵" },
      icons: { sword: "耙", fire: "火", ice: "吞", thunder: "雷", array: "阵" },
      bonuses: { maxHpMultiplier: 1.2, wallDamageReduction: 0.1, fireRangeMultiplier: 1.08 },
    },
    shaseng: {
      key: "shaseng",
      name: "沙僧",
      title: "卷帘大将",
      role: "均衡 / 持续伤害 / 减速 / 控场",
      shortRole: "流沙控场",
      weapon: "月牙铲",
      initialSkills: ["sword", "ice"],
      activeSkills: ["月牙铲斩", "流沙困阵"],
      passive: "减速效果 +15%，持续伤害 +10%，控制持续时间 +10%。",
      playstyle: "控场稳定，适合拖慢妖群推进。",
      color: "#6bb8c7",
      accent: "#315b57",
      labels: { sword: "月牙铲斩", fire: "赤砂爆", ice: "流沙困阵", thunder: "卷帘雷击", array: "弱水法阵" },
      icons: { sword: "铲", fire: "砂", ice: "沙", thunder: "雷", array: "阵" },
      bonuses: { iceSlowBonus: 0.15, arrayDamageMultiplier: 1.06, dotDamageMultiplier: 1.1, controlDurationMultiplier: 1.1 },
    },
  };
  HERO_DEFS.tang = HERO_DEFS.tangseng;

  const COMPANION_DEFS = {
    wukong: { name: "孙悟空", skill: "分身突袭", cooldown: 18, desc: "生成金色残影冲向妖群，造成范围伤害。", color: "#f5b04e" },
    tangseng: { name: "唐僧", skill: "佛光普照", cooldown: 22, desc: "回复城墙，并短暂提升全体技能伤害。", color: "#fff1bd" },
    bajie: { name: "猪八戒", skill: "钉耙震地", cooldown: 20, desc: "震退城门前妖群并造成范围伤害。", color: "#d9a35d" },
    shaseng: { name: "沙僧", skill: "流沙牵引", cooldown: 20, desc: "生成流沙旋涡，减速并牵引妖怪。", color: "#7fd1d8" },
  };
  COMPANION_DEFS.tang = COMPANION_DEFS.tangseng;
  const getHeroExpNeed = (level) => Math.floor(100 * Math.pow(1.18, Math.max(1, level) - 1));
  const getHeroBreakthroughStage = (level) => Math.floor(Math.max(1, level) / 10);
  const getHeroLevelCap = (breakthrough = 0) => Math.min(HERO_MAX_LEVEL, Math.max(0, breakthrough) * 10 + 10);
  const getHeroBreakthroughCost = (stage) => 1000 * stage * stage;
  const getCompanionUpgradeCost = (level) => Math.floor(300 * Math.pow(1.22, Math.max(1, level) - 1));
  const normalizeHeroProgress = (hero = {}) => ({
    level: clamp(Math.floor(Number(hero.level) || 1), 1, HERO_MAX_LEVEL),
    exp: Math.max(0, Math.floor(Number(hero.exp) || 0)),
    breakthrough: clamp(Math.floor(Number(hero.breakthrough) || 0), 0, 4),
    wins: Math.max(0, Math.floor(Number(hero.wins) || 0)),
  });
  const getHeroLevelStatus = (hero) => {
    const data = normalizeHeroProgress(hero);
    const cap = getHeroLevelCap(data.breakthrough);
    const stage = getHeroBreakthroughStage(data.level);
    const blocked = data.level >= cap && data.level < HERO_MAX_LEVEL;
    return {
      ...data,
      cap,
      blocked,
      need: getHeroExpNeed(data.level),
      breakthroughStage: Math.max(1, stage),
      breakthroughCost: getHeroBreakthroughCost(Math.max(1, stage)),
    };
  };
  const addHeroExpToProgress = (hero, amount) => {
    const result = { beforeLevel: hero.level || 1, afterLevel: hero.level || 1, expGain: Math.max(0, Math.floor(amount || 0)), leveled: false, blocked: false };
    hero.exp = Math.max(0, Math.floor(hero.exp || 0)) + result.expGain;
    hero.level = clamp(Math.floor(hero.level || 1), 1, HERO_MAX_LEVEL);
    hero.breakthrough = clamp(Math.floor(hero.breakthrough || 0), 0, 4);
    while (hero.level < HERO_MAX_LEVEL) {
      const cap = getHeroLevelCap(hero.breakthrough);
      if (hero.level >= cap) {
        result.blocked = true;
        break;
      }
      const need = getHeroExpNeed(hero.level);
      if (hero.exp < need) break;
      hero.exp -= need;
      hero.level += 1;
      result.leveled = true;
    }
    result.afterLevel = hero.level;
    return result;
  };

  const RUNE_QUALITIES = {
    common: { label: "凡品", mult: 1, color: "#bfeee4", weight: 52 },
    fine: { label: "良品", mult: 1.35, color: "#d7fff5", weight: 30 },
    superior: { label: "上品", mult: 1.75, color: "#fff1bd", weight: 14 },
    spirit: { label: "灵品", mult: 2.25, color: "#f5d78a", weight: 4 },
  };

  const RUNE_DEFS = {
    crit: { name: "狂击符", category: "攻击符文", desc: "暴击率提升", effect: (m) => ({ critChance: 0.04 * m }) },
    pierce: { name: "穿透符", category: "攻击符文", desc: "主武器影穿透 +1", effect: (m) => ({ swordPierce: Math.max(1, Math.round(m)) }) },
    fireBurst: { name: "爆炎符", category: "攻击符文", desc: "火系爆炸范围提升", effect: (m) => ({ fireRange: 0.12 * m }) },
    chainThunder: { name: "连雷符", category: "攻击符文", desc: "天威弹射 +1", effect: (m) => ({ thunderBounce: Math.max(1, Math.round(m)) }) },
    bell: { name: "金钟符", category: "守御符文", desc: "结界最大血量提升", effect: (m) => ({ maxHpBonus: Math.round(28 * m) }) },
    guard: { name: "护体符", category: "守御符文", desc: "结界受到伤害降低", effect: (m) => ({ wallDamageReduction: 0.06 * m }) },
    returnHit: { name: "结界符", category: "守御符文", desc: "结界受击时反伤附近妖怪", effect: (m) => ({ retaliation: 8 * m }) },
    gather: { name: "聚灵符", category: "机缘符文", desc: "修为获取增加", effect: (m) => ({ expMultiplier: 0.12 * m }) },
    fortune: { name: "招财符", category: "机缘符文", desc: "通关灵石增加", effect: (m) => ({ coinMultiplier: 0.12 * m }) },
    time: { name: "时轮符", category: "机缘符文", desc: "技能冷却缩短", effect: (m) => ({ cooldownMultiplier: 1 - Math.min(0.18, 0.06 * m) }) },
  };

  const CHAPTERS = [
    { start: 1, end: 10, name: "第一章 花果山妖乱", intro: "花果山风起，群妖趁乱叩关。取经路第一步，从镇住山门开始。", boss: "黑风怪" },
    { start: 11, end: 20, name: "第二章 高老庄异闻", intro: "高老庄夜雾沉沉，猪妖、夜叉与石甲妖混入村道。", boss: "吴支祁" },
    { start: 21, end: 30, name: "第三章 流沙河妖雾", intro: "流沙河水雾翻卷，飞妖与咒师结阵，白骨幻影悄然逼近。", boss: "白骨夫人" },
    { start: 31, end: 40, name: "第四章 火焰山终劫", intro: "火焰山妖旗连天，牛魔王集万妖压境，终章将启。", boss: "牛魔王" },
  ];
  const getChapterByOrder = (order) => CHAPTERS.find((chapter) => order >= chapter.start && order <= chapter.end) || CHAPTERS[0];
  for (const level of LEVEL_LIST) {
    const chapter = getChapterByOrder(level.order);
    level.chapter = chapter.name;
    level.story = chapter.intro;
    level.description = `${chapter.name}：${level.name}。${chapter.intro}`;
  }

  const ACHIEVEMENT_DEFS = {
    clear10: { name: "初破黑风", desc: "首次通关第 10 关" },
    clear20: { name: "高庄镇妖", desc: "首次通关第 20 关" },
    clear30: { name: "白骨退散", desc: "首次通关第 30 关" },
    clear40: { name: "万妖退散", desc: "通关第 40 关" },
    kill1000: { name: "千妖斩", desc: "累计斩妖 1000" },
    threeSuperiorRunes: { name: "符箓有成", desc: "拥有 3 个上品及以上符文" },
  };

  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  const rand = (min, max) => min + Math.random() * (max - min);
  const distSq = (a, b, x, y) => {
    const dx = a - x;
    const dy = b - y;
    return dx * dx + dy * dy;
  };
  const formatTime = (seconds) => {
    const safe = Math.max(0, Math.floor(seconds));
    const m = Math.floor(safe / 60)
      .toString()
      .padStart(2, "0");
    const s = (safe % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };
  const pickRarity = () => {
    const roll = Math.random();
    if (roll < 0.1) return "epic";
    if (roll < 0.38) return "rare";
    return "common";
  };
  const pct = (value) => `${Math.round(value * 100)}%`;
  const randomFrom = (items) => items[Math.floor(Math.random() * items.length)];
  const roundedRectPath = (ctx, x, y, w, h, r) => {
    const radius = Math.max(0, Math.min(r, Math.abs(w) / 2, Math.abs(h) / 2));
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + w - radius, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
    ctx.lineTo(x + w, y + h - radius);
    ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
    ctx.lineTo(x + radius, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
  };
  const weightedPick = (weights) => {
    const entries = Object.entries(weights);
    const total = entries.reduce((sum, [, weight]) => sum + weight, 0);
    let roll = Math.random() * total;
    for (const [id, weight] of entries) {
      roll -= weight;
      if (roll <= 0) return id;
    }
    return entries[0][0];
  };
  const getLevelById = (id) => LEVEL_CONFIG[id] || LEVEL_CONFIG.level1;
  const coerceLevelId = (value, fallback = "level1") => {
    if (typeof value === "number" && Number.isFinite(value)) {
      const order = clampSetup(Math.floor(value), 1, 40);
      return `level${order}`;
    }
    const raw = String(value || "").trim();
    if (LEVEL_CONFIG[raw]) return raw;
    if (/^\d+$/.test(raw)) {
      const order = clampSetup(Number(raw), 1, 40);
      return `level${order}`;
    }
    const match = raw.match(/^level(\d+)$/i);
    if (match) {
      const order = clampSetup(Number(match[1]), 1, 40);
      return `level${order}`;
    }
    return LEVEL_CONFIG[fallback] ? fallback : "level1";
  };
  const getNextLevel = (id) => {
    const level = getLevelById(id);
    return LEVEL_LIST.find((item) => item.order === level.order + 1) || null;
  };
  const createDefaultLevels = () => {
    const levels = {};
    for (const level of LEVEL_LIST) {
      levels[level.id] = {
        unlocked: level.order === 1,
        cleared: false,
        bestKills: 0,
        bestLevel: 1,
        bestSurvivalTime: 0,
        clearCount: 0,
      };
    }
    return levels;
  };
  const getHighestUnlockedLevelId = (save) => {
    const levels = save?.levels || {};
    for (let i = LEVEL_LIST.length - 1; i >= 0; i -= 1) {
      const level = LEVEL_LIST[i];
      if (levels[level.id]?.unlocked) return level.id;
    }
    return "level1";
  };
  const getSavedSelectedLevelId = (save) => {
    const highest = getHighestUnlockedLevelId(save);
    const selected = coerceLevelId(save?.selectedLevelId || loadString(SAVE_KEYS.selectedLevel, highest), highest);
    return save?.levels?.[selected]?.unlocked ? selected : highest;
  };
  const getLevelExtraClearShards = (order) => {
    if (order >= 40) return 14;
    if (order >= 30) return 10;
    if (order >= 20) return 8;
    if (order >= 10) return 6;
    if (order >= 9) return 4;
    if (order >= 7) return 3;
    if (order >= 5) return 2;
    if (order >= 3) return 1;
    return 0;
  };
  const getLevelStars = (level) => clamp(Math.ceil(level.order / 2), 1, 5);

  const createDefaultSave = () => ({
    version: SAVE_VERSION,
    coins: 0,
    jade: 0,
    selectedLevelId: "level1",
    gems: {
      attack: { level: 0, shards: 0 },
      cooldown: { level: 0, shards: 0 },
      wall: { level: 0, shards: 0 },
      crit: { level: 0, shards: 0 },
      exp: { level: 0, shards: 0 },
    },
    talents: {
      swordDamage: 0,
      fireMastery: 0,
      iceMastery: 0,
      thunderMastery: 0,
      swordArrayMastery: 0,
      wallFortify: 0,
      battleInsight: 0,
      startSpirit: 0,
    },
    journeyTraining: createDefaultJourneyTraining(),
    records: {
      bestKills: 0,
      bestSurvivalTime: 0,
      bestLevel: 1,
      clearCount: 0,
      totalRuns: 0,
      highestClearedLevel: 0,
      totalKills: 0,
      highestPlayerLevel: 1,
      totalSpiritStone: 0,
      finalCleared: false,
    },
    levels: createDefaultLevels(),
    redeemedCodes: [],
    lastDailyRewardDate: "",
    totalRechargeTest: 0,
    settings: {
      soundEnabled: true,
      timeScale: readTimeScaleSetting(),
    },
    selectedHero: "",
    heroes: Object.fromEntries(HERO_IDS.map((id) => [id, { level: 1, exp: 0, breakthrough: 0, wins: 0 }])),
    companions: {
      invited: [],
      pendingInvites: [],
    },
    companionProgress: Object.fromEntries(HERO_IDS.map((id) => [id, { level: 1 }])),
    runes: {
      owned: [],
      equipped: [],
    },
    bestiary: {
      seen: {},
    },
    achievements: {
      unlocked: {},
    },
  });

  const getGemNextCost = (level) => {
    if (level === 0) return 3;
    if (level === 1) return 5;
    if (level === 2) return 8;
    return 3 + level * 3;
  };

  const getTalentNextCost = (level) => {
    if (level === 0) return 50;
    if (level === 1) return 80;
    if (level === 2) return 120;
    return 50 + level * level * 30;
  };

  const normalizeSave = (source) => {
    const save = createDefaultSave();
    if (!source || typeof source !== "object") return save;

    save.version = SAVE_VERSION;
    const sourceCoins = Number.isFinite(source.coins)
      ? source.coins
      : Number.isFinite(source.spiritStone)
        ? source.spiritStone
        : 0;
    save.coins = Math.max(0, Math.floor(sourceCoins));
    save.jade = Number.isFinite(source.jade) ? Math.max(0, Math.floor(source.jade)) : 0;
    save.selectedLevelId = coerceLevelId(source.selectedLevelId || source.selectedLevel || "level1", "level1");

    for (const id of Object.keys(GEM_DEFS)) {
      const gem = source.gems && source.gems[id];
      save.gems[id] = {
        level: Number.isFinite(gem?.level) ? Math.max(0, Math.floor(gem.level)) : 0,
        shards: Number.isFinite(gem?.shards) ? Math.max(0, Math.floor(gem.shards)) : 0,
      };
    }

    for (const id of Object.keys(TALENT_DEFS)) {
      const level = source.talents && source.talents[id];
      save.talents[id] = Number.isFinite(level)
        ? clamp(Math.floor(level), 0, TALENT_DEFS[id].max)
        : 0;
    }
    save.journeyTraining = normalizeJourneyTraining(
      source.journeyTraining || {},
      { ...(source.upgrades || {}), ...(source.talents || {}) },
    );

    const records = source.records || {};
    save.records.bestKills = Number.isFinite(records.bestKills) ? Math.max(0, Math.floor(records.bestKills)) : 0;
    save.records.bestSurvivalTime = Number.isFinite(records.bestSurvivalTime)
      ? Math.max(0, Math.floor(records.bestSurvivalTime))
      : 0;
    save.records.bestLevel = Number.isFinite(records.bestLevel) ? Math.max(1, Math.floor(records.bestLevel)) : 1;
    save.records.clearCount = Number.isFinite(records.clearCount) ? Math.max(0, Math.floor(records.clearCount)) : 0;
    save.records.totalRuns = Number.isFinite(records.totalRuns) ? Math.max(0, Math.floor(records.totalRuns)) : 0;
    save.records.highestClearedLevel = Math.max(
      Number.isFinite(records.highestClearedLevel) ? Math.max(0, Math.floor(records.highestClearedLevel)) : 0,
      readHighestClearedSetting(),
    );
    save.records.totalKills = Number.isFinite(records.totalKills) ? Math.max(0, Math.floor(records.totalKills)) : 0;
    save.records.highestPlayerLevel = Number.isFinite(records.highestPlayerLevel)
      ? Math.max(1, Math.floor(records.highestPlayerLevel))
      : save.records.bestLevel;
    save.records.totalSpiritStone = Number.isFinite(records.totalSpiritStone) ? Math.max(0, Math.floor(records.totalSpiritStone)) : 0;
    save.records.finalCleared = records.finalCleared === true || source.finalCleared === true;

    const sourceLevels = source.levels && typeof source.levels === "object" ? source.levels : null;
    save.levels = createDefaultLevels();
    for (const level of LEVEL_LIST) {
      const sourceLevel = sourceLevels?.[level.id] || {};
      const target = save.levels[level.id];
      target.unlocked = level.order === 1 || sourceLevel.unlocked === true;
      target.cleared = sourceLevel.cleared === true;
      target.bestKills = Number.isFinite(sourceLevel.bestKills) ? Math.max(0, Math.floor(sourceLevel.bestKills)) : 0;
      target.bestLevel = Number.isFinite(sourceLevel.bestLevel) ? Math.max(1, Math.floor(sourceLevel.bestLevel)) : 1;
      target.bestSurvivalTime = Number.isFinite(sourceLevel.bestSurvivalTime)
        ? Math.max(0, Math.floor(sourceLevel.bestSurvivalTime))
        : 0;
      target.clearCount = Number.isFinite(sourceLevel.clearCount) ? Math.max(0, Math.floor(sourceLevel.clearCount)) : 0;
      if (level.order <= save.records.highestClearedLevel) {
        target.unlocked = true;
        target.cleared = true;
      }
      if (level.order <= save.records.highestClearedLevel + 1) {
        target.unlocked = true;
      }
    }
    if (!sourceLevels && save.records.clearCount > 0) {
      save.levels.level1.cleared = true;
      save.levels.level1.clearCount = Math.max(1, save.levels.level1.clearCount);
      save.levels.level1.bestKills = Math.max(save.levels.level1.bestKills, save.records.bestKills);
      save.levels.level1.bestLevel = Math.max(save.levels.level1.bestLevel, save.records.bestLevel);
      save.levels.level1.bestSurvivalTime = Math.max(save.levels.level1.bestSurvivalTime, save.records.bestSurvivalTime);
      if (save.levels.level2) save.levels.level2.unlocked = true;
    }
    for (const level of LEVEL_LIST) {
      if (level.unlockRequired && save.levels[level.unlockRequired]?.cleared) {
        save.levels[level.id].unlocked = true;
      }
      if (save.levels[level.id]?.cleared) {
        save.records.highestClearedLevel = Math.max(save.records.highestClearedLevel, level.order);
      }
    }
    if (save.levels.level40?.cleared || save.records.highestClearedLevel >= 40) {
      save.records.finalCleared = true;
      if (save.levels.level40) {
        save.levels.level40.unlocked = true;
        save.levels.level40.cleared = true;
      }
    }
    if (!save.levels[save.selectedLevelId]?.unlocked) save.selectedLevelId = getHighestUnlockedLevelId(save);

    save.settings.soundEnabled = source.settings?.soundEnabled !== false;
    save.settings.timeScale = Number(source.settings?.timeScale) === 2 ? 2 : readTimeScaleSetting();
    save.redeemedCodes = Array.isArray(source.redeemedCodes)
      ? Array.from(new Set(source.redeemedCodes.map((code) => String(code)).filter(Boolean)))
      : [];
    save.lastDailyRewardDate = typeof source.lastDailyRewardDate === "string" ? source.lastDailyRewardDate : "";
    save.totalRechargeTest = Number.isFinite(source.totalRechargeTest) ? Math.max(0, Math.floor(source.totalRechargeTest)) : 0;
    const rawSelectedHero = normalizeHeroId(source.selectedHero || loadString(SAVE_KEYS.selectedHero, ""));
    save.selectedHero = HERO_DEFS[rawSelectedHero] ? rawSelectedHero : "";
    const sourceHeroes = source.heroes && typeof source.heroes === "object" ? source.heroes : {};
    for (const id of HERO_IDS) {
      const hero = sourceHeroes[id] || (id === "tangseng" ? sourceHeroes.tang : null) || {};
      save.heroes[id] = normalizeHeroProgress(hero);
    }
    const invited = Array.isArray(source.companions?.invited) ? source.companions.invited : [];
    const pendingInvites = Array.isArray(source.companions?.pendingInvites) ? source.companions.pendingInvites : [];
    save.companions.invited = Array.from(new Set(invited.map(normalizeHeroId).filter((id) => HERO_IDS.includes(id) && id !== save.selectedHero))).slice(0, 3);
    save.companions.pendingInvites = Array.from(new Set(pendingInvites.map((value) => Number(value)).filter((value) => [10, 20, 30].includes(value))));
    const sourceCompanionProgress = source.companionProgress && typeof source.companionProgress === "object" ? source.companionProgress : {};
    for (const id of HERO_IDS) {
      const progress = sourceCompanionProgress[id] || (id === "tangseng" ? sourceCompanionProgress.tang : null) || {};
      save.companionProgress[id] = { level: clamp(Math.floor(Number(progress.level) || 1), 1, 20) };
    }
    const sourceRunes = source.runes && typeof source.runes === "object" ? source.runes : {};
    save.runes.owned = Array.isArray(sourceRunes.owned)
      ? sourceRunes.owned
        .filter((rune) => rune && RUNE_DEFS[rune.id] && RUNE_QUALITIES[rune.quality])
        .map((rune, index) => ({
          uid: String(rune.uid || `rune_${Date.now()}_${index}`),
          id: rune.id,
          quality: rune.quality,
          obtainedAt: Number.isFinite(rune.obtainedAt) ? rune.obtainedAt : Date.now(),
        }))
      : [];
    const ownedIds = new Set(save.runes.owned.map((rune) => rune.uid));
    save.runes.equipped = Array.isArray(sourceRunes.equipped)
      ? sourceRunes.equipped.filter((uid) => ownedIds.has(uid)).slice(0, 3)
      : [];
    const seen = source.bestiary?.seen && typeof source.bestiary.seen === "object" ? source.bestiary.seen : {};
    save.bestiary.seen = {};
    for (const id of Object.keys(seen)) {
      const normalized = normalizeEnemyType(id);
      if (seen[id] && MONSTER_BOOK[normalized]) save.bestiary.seen[normalized] = true;
    }
    for (const id of Object.keys(MONSTER_BOOK)) {
      if (seen[id]) save.bestiary.seen[id] = true;
    }
    const unlocked = source.achievements?.unlocked && typeof source.achievements.unlocked === "object" ? source.achievements.unlocked : {};
    save.achievements.unlocked = {};
    for (const id of Object.keys(ACHIEVEMENT_DEFS)) {
      if (unlocked[id]) save.achievements.unlocked[id] = true;
    }
    return save;
  };

  const upgradeAliasToTalent = {
    wallFoundation: "wallFortify",
    wallFortify: "wallFortify",
    swordComprehension: "swordDamage",
    swordDamage: "swordDamage",
    fireMastery: "fireMastery",
    frostSkill: "iceMastery",
    iceMastery: "iceMastery",
    thunderManual: "thunderMastery",
    thunderMastery: "thunderMastery",
    swordArrayAtlas: "swordArrayMastery",
    swordArrayMastery: "swordArrayMastery",
    agility: "battleInsight",
    battleInsight: "battleInsight",
    startSpirit: "startSpirit",
  };

  function applyMirroredKeys(save) {
    save.coins = loadMigratedNumber(SAVE_KEYS.spiritStone, save.coins, ["spiritStone", "totalSpiritStone", "coins", "gold"]);
    save.jade = loadMigratedNumber(SAVE_KEYS.jade, save.jade, ["jade", "xianyu", "仙玉"]);
    save.records.highestClearedLevel = Math.max(
      save.records.highestClearedLevel || 0,
      loadMigratedNumber(SAVE_KEYS.highestClearedLevel, save.records.highestClearedLevel || 0, [LEGACY_HIGHEST_CLEARED_KEY]),
    );
    save.records.bestKills = Math.max(save.records.bestKills, loadMigratedNumber(SAVE_KEYS.bestKills, save.records.bestKills, ["bestKills"]));
    save.records.bestSurvivalTime = Math.max(
      save.records.bestSurvivalTime,
      loadMigratedNumber(SAVE_KEYS.bestSurvivalTime, save.records.bestSurvivalTime, ["bestSurvivalTime"]),
    );
    save.records.highestPlayerLevel = Math.max(
      save.records.highestPlayerLevel || 1,
      loadMigratedNumber(SAVE_KEYS.highestPlayerLevel, save.records.highestPlayerLevel || 1, ["highestPlayerLevel", "bestLevel"]),
    );
    save.records.bestLevel = Math.max(save.records.bestLevel || 1, save.records.highestPlayerLevel || 1);
    save.records.clearCount = Math.max(save.records.clearCount, loadMigratedNumber(SAVE_KEYS.clearCount, save.records.clearCount, ["clearCount"]));
    if (hasStorageValue(SAVE_KEYS.finalCleared)) save.records.finalCleared = loadNumber(SAVE_KEYS.finalCleared, 0) === 1;

    const selected = loadString(SAVE_KEYS.selectedLevel, save.selectedLevelId);
    save.selectedLevelId = coerceLevelId(selected, save.selectedLevelId);

    const mirroredUpgrades = loadJSON(SAVE_KEYS.upgrades, null);
    if (mirroredUpgrades && typeof mirroredUpgrades === "object") {
      for (const [key, value] of Object.entries(mirroredUpgrades)) {
        const talentId = upgradeAliasToTalent[key] || key;
        if (!TALENT_DEFS[talentId]) continue;
        const level = Number(value);
        if (Number.isFinite(level)) save.talents[talentId] = clamp(Math.floor(level), 0, TALENT_DEFS[talentId].max);
      }
    }
    const mirroredJourneyTraining = loadJSON(SAVE_KEYS.journeyTraining, null);
    save.journeyTraining = normalizeJourneyTraining(
      mirroredJourneyTraining || save.journeyTraining,
      { ...(mirroredUpgrades || {}), ...(save.talents || {}) },
    );

    const redeemed = loadJSON(SAVE_KEYS.redeemedCodes, null);
    if (Array.isArray(redeemed)) {
      save.redeemedCodes = Array.from(new Set(redeemed.map((code) => String(code)).filter(Boolean)));
    }
    if (hasStorageValue(SAVE_KEYS.lastDailyRewardDate)) save.lastDailyRewardDate = loadString(SAVE_KEYS.lastDailyRewardDate, "");
    save.settings.timeScale = loadNumber(SAVE_KEYS.timeScale, save.settings.timeScale) === 2 ? 2 : 1;
    save.totalRechargeTest = loadMigratedNumber(SAVE_KEYS.totalRechargeTest, save.totalRechargeTest, ["totalRechargeTest"]);
    const mirroredHero = normalizeHeroId(loadString(SAVE_KEYS.selectedHero, save.selectedHero || ""));
    if (HERO_DEFS[mirroredHero]) save.selectedHero = mirroredHero;
    const mirroredHeroProgress = loadJSON(SAVE_KEYS.heroProgress, null);
    if (mirroredHeroProgress && typeof mirroredHeroProgress === "object") {
      for (const id of HERO_IDS) save.heroes[id] = normalizeHeroProgress(mirroredHeroProgress[id] || (id === "tangseng" ? mirroredHeroProgress.tang : null) || save.heroes[id]);
    }
    const mirroredCompanions = loadJSON(SAVE_KEYS.companions, null);
    if (Array.isArray(mirroredCompanions)) {
      save.companions.invited = Array.from(new Set(mirroredCompanions.map(normalizeHeroId).filter((id) => HERO_IDS.includes(id) && id !== save.selectedHero))).slice(0, 3);
    }
    const mirroredCompanionProgress = loadJSON(SAVE_KEYS.companionProgress, null);
    if (mirroredCompanionProgress && typeof mirroredCompanionProgress === "object") {
      for (const id of HERO_IDS) {
        const progress = mirroredCompanionProgress[id] || (id === "tangseng" ? mirroredCompanionProgress.tang : null) || save.companionProgress[id];
        save.companionProgress[id] = { level: clamp(Math.floor(Number(progress?.level) || 1), 1, 20) };
      }
    }
    const mirroredPending = loadJSON(SAVE_KEYS.pendingCompanionInvites, null);
    if (Array.isArray(mirroredPending)) save.companions.pendingInvites = Array.from(new Set(mirroredPending.map(Number).filter((value) => [10, 20, 30].includes(value))));
    else if (Number.isFinite(Number(mirroredPending)) && Number(mirroredPending) > 0) {
      save.companions.pendingInvites = [10, 20, 30].slice(0, clamp(Math.floor(Number(mirroredPending)), 0, 3));
    }
    return save;
  }

  function reconcileSaveProgress(save) {
    save.version = SAVE_VERSION;
    save.records.highestClearedLevel = clampSetup(Math.floor(save.records.highestClearedLevel || 0), 0, 40);
    for (const level of LEVEL_LIST) {
      const state = save.levels[level.id] || createDefaultLevels()[level.id];
      save.levels[level.id] = state;
      if (level.order === 1 || level.order <= save.records.highestClearedLevel + 1) state.unlocked = true;
      if (level.order <= save.records.highestClearedLevel) state.cleared = true;
      if (state.cleared) {
        state.unlocked = true;
        save.records.highestClearedLevel = Math.max(save.records.highestClearedLevel, level.order);
      }
    }
    save.records.finalCleared = save.records.finalCleared === true || save.records.highestClearedLevel >= 40 || save.levels.level40?.cleared === true;
    save.journeyTraining = normalizeJourneyTraining(save.journeyTraining || {}, save.talents || {});
    if (save.records.finalCleared && save.levels.level40) {
      save.levels.level40.unlocked = true;
      save.levels.level40.cleared = true;
    }
    if (!save.levels[save.selectedLevelId]?.unlocked) save.selectedLevelId = getHighestUnlockedLevelId(save);
    save.records.bestLevel = Math.max(save.records.bestLevel || 1, save.records.highestPlayerLevel || 1);
    save.selectedHero = normalizeHeroId(save.selectedHero || "");
    if (!HERO_IDS.includes(save.selectedHero)) save.selectedHero = "";
    for (const id of HERO_IDS) {
      save.heroes[id] = normalizeHeroProgress(save.heroes[id]);
      const companionLevel = Number(save.companionProgress?.[id]?.level);
      save.companionProgress[id] = { level: clamp(Math.floor(Number.isFinite(companionLevel) ? companionLevel : 1), 1, 20) };
    }
    save.companions.invited = Array.from(new Set((save.companions.invited || []).map(normalizeHeroId).filter((id) => HERO_IDS.includes(id) && id !== save.selectedHero))).slice(0, 3);
    save.companions.pendingInvites = Array.from(new Set((save.companions.pendingInvites || []).filter((order) => [10, 20, 30].includes(order))));
    return save;
  }

  function saveSave(save) {
    const data = reconcileSaveProgress(save || createDefaultSave());
    saveJSON(SAVE_KEY, data);
    saveNumber(SAVE_VERSION_KEY, SAVE_VERSION);
    saveNumber(SAVE_KEYS.spiritStone, data.coins || 0);
    saveNumber(SAVE_KEYS.jade, data.jade || 0);
    saveNumber(SAVE_KEYS.highestClearedLevel, data.records.highestClearedLevel || 0);
    saveString(SAVE_KEYS.selectedLevel, data.selectedLevelId || getHighestUnlockedLevelId(data));
    saveNumber(SAVE_KEYS.bestKills, data.records.bestKills || 0);
    saveNumber(SAVE_KEYS.bestSurvivalTime, data.records.bestSurvivalTime || 0);
    saveNumber(SAVE_KEYS.highestPlayerLevel, data.records.highestPlayerLevel || data.records.bestLevel || 1);
    saveNumber(SAVE_KEYS.clearCount, data.records.clearCount || 0);
    saveBool(SAVE_KEYS.finalCleared, data.records.finalCleared === true);
    saveJSON(SAVE_KEYS.upgrades, data.talents || {});
    saveJSON(SAVE_KEYS.journeyTraining, data.journeyTraining || {});
    saveJSON(SAVE_KEYS.redeemedCodes, data.redeemedCodes || []);
    saveString(SAVE_KEYS.lastDailyRewardDate, data.lastDailyRewardDate || "");
    saveNumber(SAVE_KEYS.timeScale, data.settings?.timeScale === 2 ? 2 : 1);
    saveNumber(SAVE_KEYS.totalRechargeTest, data.totalRechargeTest || 0);
    saveString(SAVE_KEYS.selectedHero, data.selectedHero || "");
    saveJSON(SAVE_KEYS.heroProgress, data.heroes || {});
    saveJSON(SAVE_KEYS.companions, data.companions?.invited || []);
    saveJSON(SAVE_KEYS.companionProgress, data.companionProgress || {});
    saveJSON(SAVE_KEYS.pendingCompanionInvites, data.companions?.pendingInvites || []);
    return data;
  }

  function loadSave() {
    const rawSave = loadJSON(SAVE_KEY, null);
    const save = reconcileSaveProgress(applyMirroredKeys(normalizeSave(rawSave)));
    return saveSave(save);
  }

  function normalizeSaveCode(code) {
    return String(code || "")
      .trim()
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, "")
      .replace(/^ZM/, "")
      .slice(0, 8)
      .replace(/^(.{4})(.{1,4})$/, "ZM-$1-$2")
      .replace(/^$/, "");
  }

  function isValidSaveCode(code) {
    return /^ZM-[A-HJ-NP-Z2-9]{4}-[A-HJ-NP-Z2-9]{4}$/.test(String(code || "").toUpperCase());
  }

  function collectSaveData(sourceSave) {
    const save = reconcileSaveProgress(normalizeSave(sourceSave || loadSave()));
    const highestCleared = save.records.highestClearedLevel || 0;
    return {
      saveVersion: SAVE_VERSION,
      exportedAt: Date.now(),
      spiritStone: save.coins || 0,
      jade: save.jade || 0,
      highestClearedLevel: highestCleared,
      highestUnlockedLevel: Math.min(40, highestCleared + 1),
      selectedLevel: save.selectedLevelId || getHighestUnlockedLevelId(save),
      bestKills: save.records.bestKills || 0,
      bestSurvivalTime: save.records.bestSurvivalTime || 0,
      highestPlayerLevel: save.records.highestPlayerLevel || save.records.bestLevel || 1,
      clearCount: save.records.clearCount || 0,
      finalCleared: save.records.finalCleared === true,
      upgrades: save.talents || {},
      journeyTraining: save.journeyTraining || {},
      gems: save.gems || {},
      levels: save.levels || {},
      records: save.records || {},
      redeemedCodes: save.redeemedCodes || [],
      lastDailyRewardDate: save.lastDailyRewardDate || "",
      timeScale: save.settings?.timeScale === 2 ? 2 : 1,
      soundEnabled: save.settings?.soundEnabled !== false,
      totalRechargeTest: save.totalRechargeTest || 0,
      selectedHero: save.selectedHero || "",
      heroProgress: save.heroes || {},
      heroes: save.heroes || {},
      companions: save.companions || { invited: [], pendingInvites: [] },
      companionProgress: save.companionProgress || {},
      pendingCompanionInvites: save.companions?.pendingInvites || [],
      runes: save.runes || { owned: [], equipped: [] },
      bestiary: save.bestiary || { seen: {} },
      achievements: save.achievements || { unlocked: {} },
    };
  }

  function applySaveData(saveData) {
    if (!saveData || typeof saveData !== "object") throw new Error("云存档数据格式错误");
    const records = {
      ...(saveData.records && typeof saveData.records === "object" ? saveData.records : {}),
      bestKills: Number(saveData.bestKills) || 0,
      bestSurvivalTime: Number(saveData.bestSurvivalTime) || 0,
      bestLevel: Number(saveData.highestPlayerLevel) || Number(saveData.bestLevel) || 1,
      highestPlayerLevel: Number(saveData.highestPlayerLevel) || Number(saveData.bestLevel) || 1,
      clearCount: Number(saveData.clearCount) || 0,
      highestClearedLevel: Number(saveData.highestClearedLevel) || 0,
      finalCleared: saveData.finalCleared === true,
    };
    const cloudCompanions = Array.isArray(saveData.companions)
      ? { invited: saveData.companions, pendingInvites: saveData.pendingCompanionInvites || [] }
      : {
        ...(saveData.companions && typeof saveData.companions === "object" ? saveData.companions : {}),
        pendingInvites: saveData.companions?.pendingInvites || saveData.pendingCompanionInvites || [],
      };
    const source = {
      version: Number(saveData.saveVersion) || SAVE_VERSION,
      coins: Number(saveData.spiritStone ?? saveData.coins) || 0,
      jade: Number(saveData.jade) || 0,
      selectedLevelId: saveData.selectedLevel || saveData.selectedLevelId || "level1",
      gems: saveData.gems || {},
      talents: saveData.upgrades || saveData.talents || {},
      journeyTraining: saveData.journeyTraining || {},
      levels: saveData.levels || null,
      records,
      redeemedCodes: Array.isArray(saveData.redeemedCodes) ? saveData.redeemedCodes : [],
      lastDailyRewardDate: typeof saveData.lastDailyRewardDate === "string" ? saveData.lastDailyRewardDate : "",
      totalRechargeTest: Number(saveData.totalRechargeTest) || 0,
      settings: {
        soundEnabled: saveData.soundEnabled !== false,
        timeScale: Number(saveData.timeScale) === 2 ? 2 : 1,
      },
      selectedHero: normalizeHeroId(saveData.selectedHero || ""),
      heroes: saveData.heroProgress || saveData.heroes || {},
      companions: cloudCompanions,
      companionProgress: saveData.companionProgress || {},
      runes: saveData.runes || { owned: [], equipped: [] },
      bestiary: saveData.bestiary || { seen: {} },
      achievements: saveData.achievements || { unlocked: {} },
    };
    return saveSave(reconcileSaveProgress(normalizeSave(source)));
  }

  async function readJsonResponse(response) {
    let data = null;
    try {
      data = await response.json();
    } catch (_err) {
      // GitHub Pages returns an HTML 404 for /api/*.
    }
    if (!response.ok) {
      const fallback = response.status === 404
        ? "云存档服务未启用，请部署到 Vercel 后使用。"
        : `云存档请求失败（${response.status}）`;
      throw new Error(data?.error || fallback);
    }
    if (!data || data.ok === false) throw new Error(data?.error || "云存档服务返回异常");
    return data;
  }

  async function uploadCloudSave(saveData = collectSaveData()) {
    const bytes = new Blob([JSON.stringify(saveData)]).size;
    if (bytes > 100 * 1024) throw new Error("存档过大，暂时无法上传云存档。");
    let response;
    try {
      response = await fetch("/api/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ saveData }),
      });
    } catch (_err) {
      throw new Error("云存档服务未启用，请部署到 Vercel 后使用。");
    }
    return readJsonResponse(response);
  }

  async function loadCloudSaveByCode(code) {
    const normalized = normalizeSaveCode(code);
    if (!isValidSaveCode(normalized)) throw new Error("存档码格式不正确，请输入类似 ZM-8F3K-29D7 的格式。");
    let response;
    try {
      response = await fetch(`/api/load?code=${encodeURIComponent(normalized)}`);
    } catch (_err) {
      throw new Error("云存档服务未启用，请部署到 Vercel 后使用。");
    }
    return readJsonResponse(response);
  }

  function showCloudSavePanel() {
    if (window.hongyunGame) window.hongyunGame.showSaveInfo();
  }

  function rollRuneQuality(isBossLevel = false) {
    const weights = Object.entries(RUNE_QUALITIES).map(([id, quality]) => ({
      id,
      weight: quality.weight * (isBossLevel && (id === "superior" || id === "spirit") ? 2.1 : 1),
    }));
    const total = weights.reduce((sum, item) => sum + item.weight, 0);
    let roll = Math.random() * total;
    for (const item of weights) {
      roll -= item.weight;
      if (roll <= 0) return item.id;
    }
    return "common";
  }

  function createRuneDrop(isBossLevel = false) {
    const ids = Object.keys(RUNE_DEFS);
    const id = randomFrom(ids);
    return {
      uid: `rune_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      id,
      quality: rollRuneQuality(isBossLevel),
      obtainedAt: Date.now(),
    };
  }

  function getRuneDisplay(rune) {
    const def = RUNE_DEFS[rune?.id] || RUNE_DEFS.crit;
    const quality = RUNE_QUALITIES[rune?.quality] || RUNE_QUALITIES.common;
    return {
      ...rune,
      def,
      quality,
      name: `${quality.label}·${def.name}`,
      desc: `${def.category}：${def.desc}`,
    };
  }

  function getRuneBonuses(save) {
    const data = save || createDefaultSave();
    const owned = new Map((data.runes?.owned || []).map((rune) => [rune.uid, rune]));
    const bonuses = {
      critChance: 0,
      swordPierce: 0,
      fireRange: 0,
      thunderBounce: 0,
      maxHpBonus: 0,
      wallDamageReduction: 0,
      retaliation: 0,
      expMultiplier: 0,
      coinMultiplier: 0,
      cooldownMultiplier: 1,
    };
    for (const uid of data.runes?.equipped || []) {
      const rune = owned.get(uid);
      const def = RUNE_DEFS[rune?.id];
      const quality = RUNE_QUALITIES[rune?.quality];
      if (!def || !quality) continue;
      const effect = def.effect(quality.mult);
      for (const [key, value] of Object.entries(effect)) {
        if (key === "cooldownMultiplier") bonuses.cooldownMultiplier *= value;
        else bonuses[key] = (bonuses[key] || 0) + value;
      }
    }
    return bonuses;
  }

  function buildBattleModifiers(save) {
    const data = normalizeSave(save);
    const gems = data.gems;
    const talents = data.talents;
    const training = data.journeyTraining || createDefaultJourneyTraining();
    const runes = getRuneBonuses(data);
    const heroId = HERO_IDS.includes(data.selectedHero) ? data.selectedHero : "wukong";
    const hero = HERO_DEFS[heroId] || HERO_DEFS.wukong;
    const heroState = normalizeHeroProgress(data.heroes?.[heroId]);
    const heroLevel = heroState.level || 1;
    const breakthrough = heroState.breakthrough || 0;
    const heroBonuses = hero.bonuses || {};
    const levelDamage = heroId === "wukong" ? 1.04 : 1;
    const wukongShadow = heroId === "wukong" ? 1 + Math.floor((heroLevel - 1) / 5) * 0.1 : 1;
    const tangScale = heroId === "tangseng" ? 1 + (heroLevel - 1) * 0.02 : 1;
    const bajieWall = heroId === "bajie" ? 1 + (heroLevel - 1) * 0.015 : 1;
    const shasengDot = heroId === "shaseng" ? 1 + (heroLevel - 1) * 0.02 : 1;
    const shasengSlow = heroId === "shaseng" ? Math.floor(heroLevel / 5) * 0.02 : 0;
    const bajieRange = heroId === "bajie" ? Math.floor(heroLevel / 5) * 0.05 : 0;
    const tangRare = heroId === "tangseng" ? Math.floor(heroLevel / 5) * 0.005 : 0;
    return {
      damageMultiplier: (1 + gems.attack.level * 0.03) * (heroBonuses.damageMultiplier || 1) * levelDamage,
      cooldownMultiplier: (1 - Math.min(gems.cooldown.level * 0.02, 0.4)) *
        Math.max(0.75, 1 - training.agility * 0.0035) *
        (heroBonuses.cooldownMultiplier || 1) *
        runes.cooldownMultiplier,
      maxHpBonus: gems.wall.level * 10 + training.barrier * 5 + (runes.maxHpBonus || 0),
      maxHpMultiplier: (heroBonuses.maxHpMultiplier || 1) * bajieWall,
      critChance: Math.min(gems.crit.level * 0.02 + (heroBonuses.critChance || 0) + (runes.critChance || 0), 0.65),
      critDamageMultiplier: 2 + (heroBonuses.critDamageBonus || 0) + (heroId === "wukong" ? (heroLevel - 1) * 0.02 : 0),
      expMultiplier: 1 + gems.exp.level * 0.05 + talents.battleInsight * 0.03 + (runes.expMultiplier || 0),
      swordDamageMultiplier: 1 + training.weapon * 0.015,
      weaponDamageMultiplier: 1 + training.weapon * 0.015,
      spellDamageMultiplier: 1 + training.spell * 0.015,
      fireRangeMultiplier: 1 + (heroBonuses.fireRangeMultiplier ? heroBonuses.fireRangeMultiplier - 1 : 0) + (runes.fireRange || 0) + bajieRange,
      controlDamageMultiplier: 1 + training.control * 0.01,
      controlPowerBonus: training.control * 0.005,
      iceSlowBonus: (heroBonuses.iceSlowBonus || 0) + shasengSlow,
      thunderDamageMultiplier: 1 + training.thunder * 0.015,
      thunderBounceRetention: Math.min(0.84, 0.72 + training.thunder * 0.002),
      swordArrayDamageMultiplier: 1 + training.formation * 0.015 + (heroBonuses.arrayDamageMultiplier ? heroBonuses.arrayDamageMultiplier - 1 : 0),
      formationDamageMultiplier: 1 + training.formation * 0.015,
      formationDurationMultiplier: 1 + training.formation * 0.002,
      startExp: talents.startSpirit * 5,
      swordPierceBonus: (runes.swordPierce || 0) + (heroId === "wukong" ? breakthrough : 0),
      thunderBounceBonus: runes.thunderBounce || 0,
      wallDamageReduction: Math.min(0.55, (heroBonuses.wallDamageReduction || 0) + (runes.wallDamageReduction || 0) + Math.min(0.4, training.protection * 0.004) + (heroId === "bajie" ? breakthrough * 0.03 : 0)),
      retaliationDamage: runes.retaliation || 0,
      coinMultiplier: (runes.coinMultiplier || 0) + training.spiritGain * 0.02,
      spiritStoneRewardMultiplier: 1 + training.spiritGain * 0.02,
      eliteBossDamageMultiplier: 1 + training.demonSlayer * 0.01,
      rareChanceBonus: (heroBonuses.rareChanceBonus || 0) + tangRare,
      regenPerSecond: (heroBonuses.regenPerSecond || 0) * tangScale,
      shieldChance: heroBonuses.shieldChance || 0,
      shieldStrength: heroId === "tangseng" ? 1 + breakthrough * 0.1 : 1,
      dotDamageMultiplier: (heroBonuses.dotDamageMultiplier || 1) * shasengDot,
      controlDurationMultiplier: (heroBonuses.controlDurationMultiplier || 1) + (heroId === "shaseng" ? breakthrough : 0),
      shadowDamageMultiplier: wukongShadow,
      heroSpecific: { heroId, heroLevel, breakthrough },
    };
  }

  const getMetaBonuses = buildBattleModifiers;

  class SaveManager {
    constructor() {
      this.data = this.load();
    }

    load() {
      return loadSave();
    }

    save() {
      this.data = saveSave(this.data);
    }

    reset() {
      const keys = [
        SAVE_KEY,
        SAVE_VERSION_KEY,
        LEGACY_HIGHEST_CLEARED_KEY,
        ...Object.values(SAVE_KEYS),
      ];
      for (const key of keys) {
        try {
          localStorage.removeItem(key);
        } catch (_err) {
          // Reset can continue even if a browser blocks one key.
        }
      }
      this.data = createDefaultSave();
      this.save();
    }

    getMetaBonuses() {
      return getMetaBonuses(this.data);
    }

    getBattleModifiers() {
      return buildBattleModifiers(this.data);
    }

    upgradeGem(id) {
      const gem = this.data.gems[id];
      if (!gem) return { ok: false, message: "灵石不存在" };
      const cost = getGemNextCost(gem.level);
      if (gem.shards < cost) return { ok: false, message: "碎晶不足" };
      gem.shards -= cost;
      gem.level += 1;
      this.save();
      return { ok: true, message: `${GEM_DEFS[id].name} 升至 ${gem.level} 级` };
    }

    upgradeTalent(id) {
      const def = TALENT_DEFS[id];
      const level = this.data.talents[id];
      if (!def || level === undefined) return { ok: false, message: "功法不存在" };
      if (level >= def.max) return { ok: false, message: "功法已圆满" };
      const cost = getTalentNextCost(level);
      if (this.data.coins < cost) return { ok: false, message: "灵石不足" };
      this.data.coins -= cost;
      this.data.talents[id] += 1;
      this.save();
      return { ok: true, message: `${def.name} 修至 ${this.data.talents[id]} 级` };
    }

    upgradeJourneyTraining(id) {
      const def = JOURNEY_TRAINING_DEFS[id];
      if (!def) return { ok: false, message: "修行项不存在" };
      this.data.journeyTraining = normalizeJourneyTraining(this.data.journeyTraining || {}, this.data.talents || {});
      const level = this.data.journeyTraining[id] || 0;
      if (level >= def.max) return { ok: false, message: "此项修行已圆满" };
      const cost = getJourneyTrainingNextCost(id, level);
      if (this.data.coins < cost) return { ok: false, message: "灵石不足" };
      this.data.coins -= cost;
      this.data.journeyTraining[id] = level + 1;
      this.save();
      return { ok: true, message: `${def.name} 修至 Lv.${this.data.journeyTraining[id]}` };
    }

    selectHero(id) {
      if (!HERO_DEFS[id]) return { ok: false, message: "角色不存在" };
      this.data.selectedHero = id;
      this.data.companions.invited = (this.data.companions.invited || []).filter((heroId) => heroId !== id);
      this.save();
      return { ok: true, message: `已选择${HERO_DEFS[id].name}` };
    }

    inviteCompanion(id) {
      if (!COMPANION_DEFS[id] || id === this.data.selectedHero) return { ok: false, message: "该角色不能助战" };
      const invited = this.data.companions.invited || [];
      if (invited.includes(id)) return { ok: false, message: "已经邀请过该伙伴" };
      if (invited.length >= 3) return { ok: false, message: "助战阵容已满" };
      invited.push(id);
      this.data.companions.invited = invited;
      this.data.companions.pendingInvites = (this.data.companions.pendingInvites || []).slice(1);
      this.save();
      return { ok: true, message: `${COMPANION_DEFS[id].name}加入助战` };
    }

    selectHero(id) {
      const heroId = normalizeHeroId(id);
      if (!HERO_IDS.includes(heroId)) return { ok: false, message: "角色不存在" };
      this.data.selectedHero = heroId;
      this.data.heroes[heroId] = normalizeHeroProgress(this.data.heroes[heroId]);
      this.data.companions.invited = (this.data.companions.invited || []).map(normalizeHeroId).filter((item) => item !== heroId);
      this.save();
      return { ok: true, message: `已选择${HERO_DEFS[heroId].name}` };
    }

    breakthroughHero(id) {
      const heroId = normalizeHeroId(id);
      if (!HERO_IDS.includes(heroId)) return { ok: false, message: "角色不存在" };
      const hero = normalizeHeroProgress(this.data.heroes[heroId]);
      this.data.heroes[heroId] = hero;
      const status = getHeroLevelStatus(hero);
      if (!status.blocked) return { ok: false, message: "尚未到突破关口" };
      if (this.data.coins < status.breakthroughCost) return { ok: false, message: "灵石不足" };
      this.data.coins -= status.breakthroughCost;
      hero.breakthrough += 1;
      const result = addHeroExpToProgress(hero, 0);
      this.save();
      return { ok: true, message: `${HERO_DEFS[heroId].name}突破成功`, level: result.afterLevel };
    }

    inviteCompanion(id) {
      const heroId = normalizeHeroId(id);
      if (!HERO_IDS.includes(heroId) || heroId === this.data.selectedHero) return { ok: false, message: "该角色不能助战" };
      const invited = this.data.companions.invited || [];
      if (invited.includes(heroId)) return { ok: false, message: "已经邀请过该伙伴" };
      if (invited.length >= 3) return { ok: false, message: "助战阵容已满" };
      if (!(this.data.companions.pendingInvites || []).length) return { ok: false, message: "暂无伙伴邀请机会" };
      invited.push(heroId);
      this.data.companions.invited = invited;
      this.data.companions.pendingInvites = (this.data.companions.pendingInvites || []).slice(1);
      this.data.companionProgress[heroId] = this.data.companionProgress[heroId] || { level: 1 };
      this.save();
      return { ok: true, message: `${COMPANION_DEFS[heroId].name}加入助战` };
    }

    upgradeCompanion(id) {
      const heroId = normalizeHeroId(id);
      if (!HERO_IDS.includes(heroId)) return { ok: false, message: "伙伴不存在" };
      if (!(this.data.companions.invited || []).includes(heroId)) return { ok: false, message: "尚未邀请该伙伴" };
      const progress = this.data.companionProgress[heroId] || { level: 1 };
      const level = clamp(Math.floor(progress.level || 1), 1, 20);
      if (level >= 20) return { ok: false, message: "伙伴助战已满级" };
      const cost = getCompanionUpgradeCost(level);
      if (this.data.coins < cost) return { ok: false, message: "灵石不足" };
      this.data.coins -= cost;
      progress.level = level + 1;
      this.data.companionProgress[heroId] = progress;
      this.save();
      return { ok: true, message: `${COMPANION_DEFS[heroId].name}助战升至 Lv.${progress.level}` };
    }

    addRune(rune) {
      const item = rune || createRuneDrop(false);
      this.data.runes.owned.push(item);
      if (this.data.runes.equipped.length < 3) this.data.runes.equipped.push(item.uid);
      this.save();
      return item;
    }

    toggleRuneEquip(uid) {
      const owned = this.data.runes.owned.some((rune) => rune.uid === uid);
      if (!owned) return { ok: false, message: "符文不存在" };
      const equipped = this.data.runes.equipped;
      if (equipped.includes(uid)) {
        this.data.runes.equipped = equipped.filter((item) => item !== uid);
        this.save();
        return { ok: true, message: "已卸下符文" };
      }
      if (equipped.length >= 3) return { ok: false, message: "最多装备 3 枚符文" };
      equipped.push(uid);
      this.save();
      return { ok: true, message: "已装备符文" };
    }

    markEnemySeen(type) {
      const normalized = normalizeEnemyType(type);
      if (!MONSTER_BOOK[normalized]) return;
      this.data.bestiary.seen[normalized] = true;
    }

    unlockAchievement(id) {
      if (!ACHIEVEMENT_DEFS[id] || this.data.achievements.unlocked[id]) return false;
      this.data.achievements.unlocked[id] = true;
      return true;
    }

    updateAchievements(levelOrder) {
      if (levelOrder >= 10) this.unlockAchievement("clear10");
      if (levelOrder >= 20) this.unlockAchievement("clear20");
      if (levelOrder >= 30) this.unlockAchievement("clear30");
      if (levelOrder >= 40) this.unlockAchievement("clear40");
      if ((this.data.records.totalKills || 0) >= 1000) this.unlockAchievement("kill1000");
      const superiorCount = (this.data.runes.owned || []).filter((rune) => rune.quality === "superior" || rune.quality === "spirit").length;
      if (superiorCount >= 3) this.unlockAchievement("threeSuperiorRunes");
    }

    addRunResult({ victory, kills, survivalTime, level, levelId }) {
      const levelConfig = getLevelById(levelId);
      const levelRecord = this.data.levels[levelConfig.id] || createDefaultLevels()[levelConfig.id];
      this.data.levels[levelConfig.id] = levelRecord;
      const seconds = Math.floor(Math.min(survivalTime, levelConfig.duration));
      const clearReward = victory ? (levelConfig.clearReward || (50 + levelConfig.order * 15 + (levelConfig.boss ? 100 : 0))) : 0;
      const baseCoins = kills + Math.floor(seconds / 10) * 2 + clearReward;
      const rewardBonus = buildBattleModifiers(this.data).coinMultiplier || 0;
      const coins = Math.floor(baseCoins * (levelConfig.rewardMultiplier || 1) * (1 + rewardBonus));
      const clearShardBonus = victory ? getLevelExtraClearShards(levelConfig.order) : 0;
      const shardCount = Math.floor(kills / 30) + (victory ? 2 : 0) + clearShardBonus;
      const drops = {};
      const runeDrops = [];
      const gemIds = Object.keys(GEM_DEFS);

      for (let i = 0; i < shardCount; i += 1) {
        const id = randomFrom(gemIds);
        this.data.gems[id].shards += 1;
        drops[id] = (drops[id] || 0) + 1;
      }

      this.data.coins += coins;
      this.data.records.bestKills = Math.max(this.data.records.bestKills, kills);
      this.data.records.bestSurvivalTime = Math.max(this.data.records.bestSurvivalTime, seconds);
      this.data.records.bestLevel = Math.max(this.data.records.bestLevel, level);
      this.data.records.highestPlayerLevel = Math.max(this.data.records.highestPlayerLevel || 1, level);
      this.data.records.totalKills = (this.data.records.totalKills || 0) + kills;
      this.data.records.totalSpiritStone = (this.data.records.totalSpiritStone || 0) + coins;
      this.data.records.totalRuns += 1;
      levelRecord.bestKills = Math.max(levelRecord.bestKills, kills);
      levelRecord.bestSurvivalTime = Math.max(levelRecord.bestSurvivalTime, seconds);
      levelRecord.bestLevel = Math.max(levelRecord.bestLevel, level);
      let unlockedLevel = null;
      let pendingCompanionInvite = false;
      if (victory) {
        this.data.records.clearCount += 1;
        this.data.records.highestClearedLevel = Math.max(this.data.records.highestClearedLevel || 0, levelConfig.order);
        writeHighestClearedSetting(this.data.records.highestClearedLevel);
        if (levelConfig.order >= 40) this.data.records.finalCleared = true;
        levelRecord.cleared = true;
        levelRecord.clearCount += 1;
        const rune = createRuneDrop(!!levelConfig.boss);
        this.data.runes.owned.push(rune);
        if (this.data.runes.equipped.length < 3) this.data.runes.equipped.push(rune.uid);
        runeDrops.push(rune);
        if ([10, 20, 30].includes(levelConfig.order)) {
          const eligible = HERO_IDS.filter((id) => id !== this.data.selectedHero && !(this.data.companions.invited || []).includes(id));
          if (eligible.length && !this.data.companions.pendingInvites.includes(levelConfig.order)) {
            this.data.companions.pendingInvites.push(levelConfig.order);
            pendingCompanionInvite = true;
          }
        }
        const nextLevel = getNextLevel(levelConfig.id);
        if (nextLevel && !this.data.levels[nextLevel.id].unlocked) {
          this.data.levels[nextLevel.id].unlocked = true;
          unlockedLevel = nextLevel;
        }
      }
      const heroId = normalizeHeroId(this.data.selectedHero || "");
      let heroExpGain = 0;
      let heroLevelBefore = 1;
      let heroLevelAfter = 1;
      let heroNeedBreakthrough = false;
      if (HERO_IDS.includes(heroId)) {
        const hero = normalizeHeroProgress(this.data.heroes[heroId]);
        this.data.heroes[heroId] = hero;
        if (victory) hero.wins += 1;
        heroLevelBefore = hero.level;
        heroExpGain = kills * 2 + levelConfig.order * 20;
        if (victory) heroExpGain += 100 + levelConfig.order * 10;
        if (victory && levelConfig.order % 10 === 0) heroExpGain += 150;
        const heroResult = addHeroExpToProgress(hero, heroExpGain);
        heroLevelAfter = heroResult.afterLevel;
        heroNeedBreakthrough = heroResult.blocked;
      }
      this.updateAchievements(victory ? levelConfig.order : 0);
      this.save();

      return {
        coins,
        totalCoins: this.data.coins,
        drops,
        runeDrops,
        shardCount,
        survivalSeconds: seconds,
        levelName: levelConfig.name,
        levelId: levelConfig.id,
        unlockedLevelId: unlockedLevel?.id || null,
        unlockedLevelName: unlockedLevel?.name || "",
        pendingCompanionInvite,
        heroExpGain,
        heroLevelBefore,
        heroLevelAfter,
        heroNeedBreakthrough,
        heroName: HERO_DEFS[heroId]?.name || "",
      };
    }
  }

  class AudioManager {
    constructor(saveManager) {
      this.saveManager = saveManager;
      this.enabled = saveManager.data.settings.soundEnabled !== false;
      this.ctx = null;
      this.lastPlayed = {};
    }

    init() {
      if (!this.enabled) return;
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        if (!this.ctx) this.ctx = new AudioCtx();
        if (this.ctx.state === "suspended") this.ctx.resume();
      } catch (_err) {
        this.ctx = null;
      }
    }

    toggle() {
      this.enabled = !this.enabled;
      this.saveManager.data.settings.soundEnabled = this.enabled;
      this.saveManager.save();
      if (this.enabled) this.init();
      return this.enabled;
    }

    play(type) {
      if (!this.enabled) return;
      const now = performance.now();
      const throttle = {
        click: 80,
        sword: 70,
        fire: 220,
        ice: 180,
        thunder: 260,
        wall: 280,
        upgrade: 180,
        victory: 500,
        failure: 500,
        stage: 500,
      }[type] || 120;
      if (now - (this.lastPlayed[type] || 0) < throttle) return;
      this.lastPlayed[type] = now;
      this.init();
      if (!this.ctx) return;

      try {
        if (type === "click") this.tone(640, 0.05, "sine", 0.025);
        else if (type === "sword") this.tone(880, 0.045, "triangle", 0.035);
        else if (type === "fire") this.noise(0.18, 0.06, 0.18);
        else if (type === "ice") this.tone(520, 0.1, "sine", 0.04, 0, 0.55);
        else if (type === "thunder") {
          this.noise(0.18, 0.08, 0.22);
          this.tone(90, 0.22, "sawtooth", 0.045);
        } else if (type === "wall") this.tone(150, 0.09, "square", 0.035);
        else if (type === "upgrade") {
          this.tone(520, 0.08, "sine", 0.035);
          this.tone(780, 0.1, "sine", 0.03, 0.07);
        } else if (type === "victory") {
          this.tone(520, 0.12, "triangle", 0.045);
          this.tone(700, 0.14, "triangle", 0.04, 0.12);
          this.tone(920, 0.18, "triangle", 0.035, 0.26);
        } else if (type === "failure") {
          this.tone(220, 0.16, "sawtooth", 0.045);
          this.tone(150, 0.22, "sawtooth", 0.035, 0.16);
        } else if (type === "stage") {
          this.tone(360, 0.08, "triangle", 0.035);
          this.tone(540, 0.12, "triangle", 0.03, 0.08);
        }
      } catch (_err) {
        // Audio failures should never affect gameplay.
      }
    }

    tone(freq, duration, type, gainValue, delay = 0, endMultiplier = 1) {
      const start = this.ctx.currentTime + delay;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, start);
      osc.frequency.exponentialRampToValueAtTime(Math.max(40, freq * endMultiplier), start + duration);
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(gainValue, start + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(start);
      osc.stop(start + duration + 0.02);
    }

    noise(duration, gainValue, filterFreq) {
      const samples = Math.floor(this.ctx.sampleRate * duration);
      const buffer = this.ctx.createBuffer(1, samples, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < samples; i += 1) data[i] = Math.random() * 2 - 1;
      const source = this.ctx.createBufferSource();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();
      filter.type = "lowpass";
      filter.frequency.value = 900 + filterFreq * 1200;
      gain.gain.setValueAtTime(gainValue, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);
      source.buffer = buffer;
      source.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      source.start();
      source.stop(this.ctx.currentTime + duration);
    }
  }

  class Enemy {
    constructor(type, game, options = {}) {
      const normalizedType = normalizeEnemyType(type) || "foxDemon";
      const config = ENEMY_TYPES[normalizedType] || ENEMY_TYPES.foxDemon;
      const hpScale = game.enemyHpMultiplier || 1;
      const speedScale = game.enemySpeedMultiplier || 1;
      const damageScale = game.enemyDamageMultiplier || 1;
      this.config = config;
      this.sourceType = type;
      this.type = config.type || normalizedType;
      this.name = config.name;
      this.visual = config.visual || this.type;
      this.isBoss = options.boss || config.boss === true;
      this.elite = options.elite || false;
      this.x = Number.isFinite(options.x) ? options.x : rand(config.radius + 8, game.width - config.radius - 8);
      this.radius = config.radius * (this.isBoss ? 1 : rand(0.94, 1.08)) * (this.elite ? 1.08 : 1);
      this.y = Number.isFinite(options.y) ? options.y : game.battleTop - this.radius - rand(0, 8);
      this.maxHp = Math.round(config.hp * hpScale * (this.elite ? 1.75 : 1));
      this.hp = this.maxHp;
      this.maxShield = Math.round((config.shield || 0) * hpScale * (this.elite ? 1.4 : 1));
      this.shield = this.maxShield;
      this.baseSpeed = config.speed * speedScale * (this.isBoss ? 1 : rand(0.94, 1.08));
      this.damage = Math.max(1, Math.round(config.damage * damageScale * (this.elite ? 1.25 : 1)));
      this.exp = Math.round(config.exp * (this.elite ? 2 : 1));
      this.body = config.body;
      this.eye = config.eye;
      this.dead = false;
      this.slowUntil = 0;
      this.slowFactor = 1;
      this.stunUntil = 0;
      this.hitPulse = 0;
      this.burnVisualUntil = 0;
      this.visualSeed = rand(0, Math.PI * 2);
      this.specialTimer = rand(2.5, config.summonInterval || 5);
      this.jumpTimer = rand(0.4, config.jumpInterval || 1.2);
      this.jumpPulse = 0;
      this.dashTimer = rand(0.5, config.dashInterval || 2.4);
      this.dashPulse = 0;
      this.revived = false;
      this.phaseFlags = {};
      this.targetable = options.targetable === true || this.y >= game.battleTop + this.radius;
      this.entering = !this.targetable;
    }

    update(dt, game) {
      if (this.dead) return;
      this.hitPulse = Math.max(0, this.hitPulse - dt * 5);
      this.jumpPulse = Math.max(0, this.jumpPulse - dt * 2.8);
      this.dashPulse = Math.max(0, this.dashPulse - dt * 3.4);
      if (this.entering && this.y >= game.battleTop + this.radius) {
        this.entering = false;
        this.targetable = true;
      }
      if (this.isBoss && this.targetable) game.updateBossSpecial(this, dt);
      let speed = this.baseSpeed;
      if (this.config.jumpInterval) {
        this.jumpTimer -= dt;
        if (this.jumpTimer <= 0) {
          this.jumpPulse = 1;
          this.jumpTimer = this.config.jumpInterval * rand(0.82, 1.18);
        }
      }
      if (this.config.dashInterval) {
        this.dashTimer -= dt;
        if (this.dashTimer <= 0) {
          this.dashPulse = 1;
          this.dashTimer = this.config.dashInterval * rand(0.88, 1.2);
        }
      }
      if (game.elapsed < this.stunUntil) speed = 0;
      else if (game.elapsed < this.slowUntil) speed *= this.slowFactor;
      if (this.jumpPulse > 0) speed *= this.config.jumpBoost || 1.35;
      if (this.dashPulse > 0) speed *= this.config.dashBoost || 1.8;
      speed *= game.getEnemyAuraSpeedBonus(this);
      this.y += speed * dt;

      if (this.config.explodeNearWall && this.y + this.radius >= game.wallY - 26) {
        game.explodeEnemyNearWall(this);
        return;
      }

      if (this.y + this.radius >= game.wallY) {
        this.dead = true;
        game.damageWall(this.damage, this.x, game.wallY - 12);
      }
    }

    draw(ctx, game) {
      if (this.dead) return;
      const t = game.elapsed + this.visualSeed;
      ctx.save();
      ctx.translate(this.x, this.y);
      this.drawEnemyAura(ctx, game, t);
      if (["runner", "yaksha", "shrimpDemon", "yakshaCn", "blackWind"].includes(this.visual)) this.drawRunnerTrail(ctx, game, t);
      this.drawEnemyStatusEffects(ctx, game, t, true);

      const bouncy = ["foxDemon", "dogDemon", "frogDemon", "nineTailShade", "wingDemon"].includes(this.type);
      const heavy = ["boarDragon", "stoneArmor", "waterApe", "bullVanguard"].includes(this.type) || this.isBoss;
      const bob = bouncy ? Math.sin(t * 4.2) * 1.8 : Math.sin(t * 2.6) * 0.7;
      const breathe = heavy ? 1 + Math.sin(t * 2.8) * 0.035 : 1 + Math.sin(t * 3.8) * 0.015;
      const jumpSquash = this.jumpPulse > 0 ? Math.sin(this.jumpPulse * Math.PI) * 0.12 : 0;
      const dashStretch = this.dashPulse > 0 ? Math.sin(this.dashPulse * Math.PI) * 0.12 : 0;
      ctx.translate(0, bob);
      ctx.scale(breathe + dashStretch, breathe - jumpSquash);

      if (!this.drawJourneyEnemy(ctx, game, t)) {
        if (this.visual === "runner" || this.visual === "yaksha") this.drawRunnerDemon(ctx, game, t);
        else if (this.visual === "flying") this.drawFlyingDemon(ctx, game, t);
        else if (this.visual === "caster" || this.visual === "casterBoss") this.drawCasterDemon(ctx, game, t);
        else if (this.visual === "brute" || this.visual === "stone" || this.visual === "xuanArmor" || this.visual === "vanguard" || this.visual === "boss" || this.visual === "kingBoss") this.drawGiantDemon(ctx, game, t);
        else if (this.visual === "shield") this.drawShieldDemon(ctx, game, t);
        else this.drawSmallDemon(ctx, game, t);
      }

      this.drawEnemyTrait(ctx, game, t);
      this.drawHitOutline(ctx);
      this.drawEnemyStatusEffects(ctx, game, t, false);
      ctx.restore();
      if (this.targetable) this.drawEnemyHealthBar(ctx, game, t);
    }

    drawJourneyEnemy(ctx, game, t) {
      const key = normalizeEnemyType(this.type || this.visual);
      if (MONSTER_BOOK[key]) {
        const baseScale = this.isBoss ? this.radius / 42 : this.radius / 28;
        drawMonsterIllustration(ctx, key, 0, 0, baseScale, "battle", {
          time: t,
          hitPulse: this.hitPulse,
          shield: this.shield,
          enemy: this,
        });
        return true;
      }
      const visual = this.visual;
      if (visual === "foxDemon" || visual === "fox" || visual === "splitFox") return this.drawFoxEnemy(ctx, t, visual === "splitFox");
      if (visual === "dogDemon") return this.drawDogDemon(ctx, t);
      if (visual === "shrimpDemon" || visual === "shrimp") return this.drawShrimpEnemy(ctx, t);
      if (visual === "boarDragon" || visual === "boar") return this.drawBoarEnemy(ctx, t);
      if (visual === "frogDemon" || visual === "frog" || visual === "poisonFrog") return this.drawFrogEnemy(ctx, game, t, visual === "poisonFrog");
      if (visual === "lampGranny") return this.drawLampGranny(ctx, t);
      if (visual === "yakshaCn") return this.drawYakshaEnemy(ctx, t);
      if (visual === "stoneArmor" || visual === "stoneBeast") return this.drawStoneBeast(ctx, t);
      if (visual === "wingDemon" || visual === "birdDemon") return this.drawBirdDemon(ctx, t);
      if (visual === "curseMage" || visual === "spellMaster" || visual === "boneDrainer") return this.drawSpellMaster(ctx, t, visual === "boneDrainer");
      if (visual === "nineTailShade") return this.drawNineTailShade(ctx, t);
      if (visual === "waterApe") return this.drawWaterApe(ctx, t);
      if (visual === "blackWind") return this.drawBlackWind(ctx, t);
      if (visual === "boneDemon") return this.drawBoneDemon(ctx, t);
      if (visual === "pigDragon" || visual === "bullVanguard") return this.drawPigDragon(ctx, t, visual === "bullVanguard");
      if (visual === "bossBlackWind" || visual === "bossYellowWind" || visual === "bossBoneLady" || visual === "bossBullKing" || visual === "blackWindBoss" || visual === "wuzhiqiBoss" || visual === "whiteBoneBoss" || visual === "bullKingBoss") {
        return this.drawJourneyBoss(ctx, t, visual);
      }
      return false;
    }

    drawInkOutline(ctx, color = "rgba(13, 32, 34, 0.72)", width = 2) {
      ctx.strokeStyle = this.hitPulse > 0 ? "#fff1bd" : color;
      ctx.lineWidth = width;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.stroke();
    }

    drawFoxEnemy(ctx, t, split = false) {
      const r = this.radius;
      this.drawGroundMist(ctx, r, t, 0.75);
      const tailCount = this.visual === "nineTailShade" ? 5 : split ? 3 : 1;
      for (let i = 0; i < tailCount; i += 1) {
        const side = i - (tailCount - 1) / 2;
        ctx.strokeStyle = this.visual === "nineTailShade"
          ? "rgba(238, 208, 255, 0.46)"
          : split
            ? "rgba(255, 241, 189, 0.52)"
            : "rgba(255, 188, 114, 0.62)";
        ctx.lineWidth = r * 0.34;
        ctx.beginPath();
        ctx.moveTo(-r * 0.25 + side * r * 0.22, r * 0.34);
        ctx.quadraticCurveTo(-r * (1.3 + i * 0.1), r * (0.2 + Math.sin(t * 5 + i) * 0.1), -r * 1.15 + side * r * 0.18, -r * 0.62);
        ctx.stroke();
      }
      ctx.fillStyle = this.hitPulse > 0 ? "#fff1bd" : this.visual === "nineTailShade" ? "rgba(182, 123, 174, 0.78)" : split ? "#65435d" : "#b76b42";
      ctx.beginPath();
      ctx.ellipse(0, 0, r * 0.72, r * 0.9, 0, 0, Math.PI * 2);
      ctx.fill();
      this.drawInkOutline(ctx, "rgba(74, 42, 35, 0.76)", 1.8);
      ctx.fillStyle = split ? "#8d5c83" : "#f0aa73";
      ctx.beginPath();
      ctx.moveTo(-r * 0.42, -r * 0.72);
      ctx.lineTo(-r * 0.88, -r * 1.22);
      ctx.lineTo(-r * 0.16, -r * 0.98);
      ctx.moveTo(r * 0.42, -r * 0.72);
      ctx.lineTo(r * 0.88, -r * 1.22);
      ctx.lineTo(r * 0.16, -r * 0.98);
      ctx.fill();
      ctx.fillStyle = "#fff1bd";
      ctx.beginPath();
      ctx.ellipse(0, r * 0.28, r * 0.34, r * 0.22, 0, 0, Math.PI * 2);
      ctx.fill();
      this.drawRedEyes(ctx, r, "slash");
      ctx.fillStyle = "rgba(255, 204, 112, 0.54)";
      for (let i = 0; i < 3; i += 1) {
        ctx.beginPath();
        ctx.arc(Math.sin(t * 3 + i) * r * 0.96, -r * (0.38 + i * 0.18), r * 0.08, 0, Math.PI * 2);
        ctx.fill();
      }
      return true;
    }

    drawDogDemon(ctx, t) {
      const r = this.radius;
      this.drawGroundMist(ctx, r, t, 0.82);
      ctx.fillStyle = "rgba(18, 31, 32, 0.76)";
      ctx.beginPath();
      ctx.ellipse(-r * 0.58, r * 0.26, r * 0.26, r * 0.42, -0.28, 0, Math.PI * 2);
      ctx.ellipse(r * 0.58, r * 0.26, r * 0.26, r * 0.42, 0.28, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = this.hitPulse > 0 ? "#fff1bd" : "#202d2c";
      ctx.beginPath();
      ctx.moveTo(0, -r * 1.05);
      ctx.quadraticCurveTo(r * 0.82, -r * 0.52, r * 0.52, r * 0.92);
      ctx.lineTo(0, r * 0.72);
      ctx.lineTo(-r * 0.52, r * 0.92);
      ctx.quadraticCurveTo(-r * 0.82, -r * 0.52, 0, -r * 1.05);
      ctx.fill();
      this.drawInkOutline(ctx, "rgba(7, 18, 18, 0.82)", 2);
      ctx.fillStyle = "#35413d";
      ctx.beginPath();
      ctx.ellipse(0, r * 0.12, r * 0.62, r * 0.66, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#e9b85f";
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.moveTo(-r * 0.48, -r * 0.66);
      ctx.lineTo(-r * 0.82, -r * 1.18);
      ctx.lineTo(-r * 0.22, -r * 0.92);
      ctx.moveTo(r * 0.48, -r * 0.66);
      ctx.lineTo(r * 0.82, -r * 1.18);
      ctx.lineTo(r * 0.22, -r * 0.92);
      ctx.stroke();
      ctx.strokeStyle = "rgba(255, 241, 189, 0.52)";
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(-r * 0.5, r * 0.18);
      ctx.lineTo(-r * 0.92, r * 0.5);
      ctx.moveTo(r * 0.5, r * 0.18);
      ctx.lineTo(r * 0.92, r * 0.5);
      ctx.stroke();
      ctx.fillStyle = "#a85f35";
      ctx.fillRect(-r * 0.44, r * 0.34, r * 0.88, r * 0.14);
      this.drawRedEyes(ctx, r, "slash");
      return true;
    }

    drawShrimpEnemy(ctx, t) {
      const r = this.radius;
      this.drawRunnerTrail(ctx, null, t);
      ctx.strokeStyle = "rgba(127, 209, 216, 0.52)";
      ctx.lineWidth = 1.1;
      for (let i = 0; i < 3; i += 1) {
        ctx.beginPath();
        ctx.moveTo(-r * 0.2, -r * (0.9 + i * 0.12));
        ctx.quadraticCurveTo(-r * 1.2, -r * (1.05 + i * 0.12), -r * 1.6, -r * (0.2 + i * 0.1));
        ctx.moveTo(r * 0.2, -r * (0.9 + i * 0.12));
        ctx.quadraticCurveTo(r * 1.2, -r * (1.05 + i * 0.12), r * 1.6, -r * (0.2 + i * 0.1));
        ctx.stroke();
      }
      for (let i = 0; i < 4; i += 1) {
        ctx.fillStyle = this.hitPulse > 0 ? "#fff1bd" : i % 2 ? "#2f7470" : "#d46843";
        ctx.beginPath();
        ctx.ellipse(0, -r * 0.45 + i * r * 0.35, r * (0.48 - i * 0.03), r * 0.28, 0, 0, Math.PI * 2);
        ctx.fill();
        this.drawInkOutline(ctx, "rgba(18, 55, 55, 0.62)", 1.1);
      }
      this.drawRedEyes(ctx, r, "slash");
      return true;
    }

    drawBoarEnemy(ctx, t) {
      const r = this.radius;
      this.drawGroundMist(ctx, r, t, 1.05);
      ctx.fillStyle = this.hitPulse > 0 ? "#fff1bd" : "#5a4738";
      ctx.beginPath();
      ctx.ellipse(0, 0, r * 1.05, r * 0.82, 0, 0, Math.PI * 2);
      ctx.fill();
      this.drawInkOutline(ctx, "rgba(34, 23, 18, 0.72)", 2.4);
      ctx.fillStyle = "#74543f";
      ctx.beginPath();
      ctx.ellipse(0, r * 0.08, r * 0.48, r * 0.38, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#f3fff9";
      ctx.beginPath();
      ctx.moveTo(-r * 0.42, r * 0.12);
      ctx.lineTo(-r * 0.8, r * 0.36);
      ctx.lineTo(-r * 0.3, r * 0.34);
      ctx.moveTo(r * 0.42, r * 0.12);
      ctx.lineTo(r * 0.8, r * 0.36);
      ctx.lineTo(r * 0.3, r * 0.34);
      ctx.fill();
      ctx.strokeStyle = "#e9b85f";
      ctx.lineWidth = 2.4;
      ctx.beginPath();
      ctx.moveTo(-r * 0.48, -r * 0.65);
      ctx.lineTo(-r * 0.9, -r * 1);
      ctx.moveTo(r * 0.48, -r * 0.65);
      ctx.lineTo(r * 0.9, -r * 1);
      ctx.stroke();
      ctx.strokeStyle = "rgba(159, 217, 207, 0.62)";
      ctx.lineWidth = 1.2;
      for (const side of [-1, 1]) {
        ctx.beginPath();
        ctx.moveTo(side * r * 0.28, -r * 0.04);
        ctx.quadraticCurveTo(side * r * 0.82, r * 0.04, side * r * 1.06, -r * 0.24);
        ctx.stroke();
      }
      ctx.fillStyle = "rgba(159, 217, 207, 0.5)";
      for (let i = -2; i <= 2; i += 1) {
        ctx.beginPath();
        ctx.ellipse(i * r * 0.18, -r * 0.58, r * 0.09, r * 0.16, 0, 0, Math.PI * 2);
        ctx.fill();
      }
      this.drawRedEyes(ctx, r, "giant");
      return true;
    }

    drawFrogEnemy(ctx, game, t, poison = false) {
      const r = this.radius;
      if (this.shield > 0) this.drawShieldAura(ctx, game, t);
      this.drawGroundMist(ctx, r, t, poison ? 1.2 : 0.9);
      ctx.fillStyle = this.hitPulse > 0 ? "#fff1bd" : poison ? "#315f3d" : "#517d55";
      ctx.beginPath();
      ctx.ellipse(0, r * 0.08, r * 0.9, r * 0.68, 0, 0, Math.PI * 2);
      ctx.fill();
      this.drawInkOutline(ctx, "rgba(22, 58, 43, 0.72)", 2);
      ctx.fillStyle = poison ? "#98b85d" : "#79a969";
      for (const sx of [-0.38, 0.38]) {
        ctx.beginPath();
        ctx.ellipse(r * sx, -r * 0.55, r * 0.3, r * 0.24, 0, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.strokeStyle = "rgba(255, 241, 189, 0.58)";
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.arc(0, -r * 0.08, r * 0.42, 0.15, Math.PI - 0.15);
      ctx.stroke();
      this.drawRedEyes(ctx, r, "dot");
      if (poison) {
        ctx.fillStyle = "rgba(136, 210, 132, 0.5)";
        for (let i = 0; i < 4; i += 1) {
          ctx.beginPath();
          ctx.arc(Math.sin(t * 2 + i) * r, -r * (1.1 + i * 0.15), r * 0.08, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      return true;
    }

    drawLampGranny(ctx, t) {
      const r = this.radius;
      this.drawGroundMist(ctx, r, t, 0.8);
      ctx.fillStyle = this.hitPulse > 0 ? "#fff1bd" : "#4c3230";
      ctx.beginPath();
      ctx.moveTo(-r * 0.55, r * 0.8);
      ctx.quadraticCurveTo(0, -r * 1.15, r * 0.55, r * 0.8);
      ctx.closePath();
      ctx.fill();
      this.drawInkOutline(ctx, "rgba(38, 18, 16, 0.75)", 2);
      ctx.fillStyle = "#fff1bd";
      ctx.beginPath();
      ctx.arc(0, -r * 0.38, r * 0.28, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#ff6b57";
      ctx.beginPath();
      ctx.moveTo(0, -r * 1.42);
      ctx.quadraticCurveTo(r * 0.42, -r * 0.78, 0, -r * 0.5);
      ctx.quadraticCurveTo(-r * 0.42, -r * 0.84, 0, -r * 1.42);
      ctx.fill();
      ctx.strokeStyle = "#e9b85f";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, -r * 0.72, r * 0.48, 0, Math.PI * 2);
      ctx.stroke();
      this.drawRedEyes(ctx, r, "dot");
      return true;
    }

    drawYakshaEnemy(ctx, t) {
      const r = this.radius;
      this.drawRunnerTrail(ctx, null, t);
      ctx.fillStyle = this.hitPulse > 0 ? "#fff1bd" : "#31233f";
      ctx.beginPath();
      ctx.moveTo(0, -r * 1.2);
      ctx.lineTo(r * 0.82, -r * 0.2);
      ctx.lineTo(r * 0.42, r * 1.05);
      ctx.lineTo(0, r * 0.68);
      ctx.lineTo(-r * 0.42, r * 1.05);
      ctx.lineTo(-r * 0.82, -r * 0.2);
      ctx.closePath();
      ctx.fill();
      this.drawInkOutline(ctx, "rgba(19, 9, 26, 0.78)", 2);
      ctx.strokeStyle = "#e9b85f";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(-r * 0.3, -r * 0.88);
      ctx.quadraticCurveTo(-r * 1, -r * 1.34, -r * 0.98, -r * 0.45);
      ctx.moveTo(r * 0.3, -r * 0.88);
      ctx.quadraticCurveTo(r * 1, -r * 1.34, r * 0.98, -r * 0.45);
      ctx.stroke();
      this.drawRedEyes(ctx, r, "slash");
      return true;
    }

    drawStoneBeast(ctx, t) {
      const r = this.radius;
      this.drawGroundMist(ctx, r, t, 1);
      ctx.fillStyle = this.hitPulse > 0 ? "#fff1bd" : "#667066";
      ctx.beginPath();
      ctx.moveTo(0, -r * 1.1);
      ctx.lineTo(r * 0.9, -r * 0.2);
      ctx.lineTo(r * 0.6, r * 0.9);
      ctx.lineTo(-r * 0.6, r * 0.9);
      ctx.lineTo(-r * 0.9, -r * 0.2);
      ctx.closePath();
      ctx.fill();
      this.drawInkOutline(ctx, "rgba(44, 53, 48, 0.72)", 2.4);
      ctx.strokeStyle = "rgba(255, 241, 189, 0.38)";
      ctx.lineWidth = 1.2;
      for (let i = 0; i < 4; i += 1) {
        ctx.beginPath();
        ctx.moveTo(-r * 0.55 + i * r * 0.3, -r * 0.5 + i * r * 0.12);
        ctx.lineTo(-r * 0.2 + i * r * 0.25, r * 0.42);
        ctx.stroke();
      }
      this.drawRedEyes(ctx, r, "dot");
      return true;
    }

    drawBirdDemon(ctx, t) {
      const r = this.radius;
      const flap = Math.sin(t * 9) * r * 0.22;
      ctx.fillStyle = this.hitPulse > 0 ? "#fff1bd" : "#213f42";
      ctx.beginPath();
      ctx.ellipse(0, 0, r * 0.42, r * 0.74, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "rgba(20, 40, 43, 0.72)";
      for (const side of [-1, 1]) {
        ctx.beginPath();
        ctx.moveTo(side * r * 0.12, -r * 0.18);
        ctx.quadraticCurveTo(side * r * 1.5, -r * 0.8 - flap, side * r * 1.18, r * 0.58);
        ctx.quadraticCurveTo(side * r * 0.52, r * 0.18, side * r * 0.12, r * 0.28);
        ctx.fill();
      }
      ctx.fillStyle = "#e9b85f";
      ctx.beginPath();
      ctx.moveTo(0, -r * 0.82);
      ctx.lineTo(r * 0.18, -r * 1.16);
      ctx.lineTo(-r * 0.18, -r * 1.16);
      ctx.fill();
      this.drawRedEyes(ctx, r, "slash");
      return true;
    }

    drawSpellMaster(ctx, t, bone = false) {
      const r = this.radius;
      this.drawGroundMist(ctx, r, t, bone ? 1.1 : 0.8);
      ctx.strokeStyle = bone ? "rgba(215, 255, 245, 0.58)" : "rgba(255, 241, 189, 0.48)";
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(0, 0, r * (1.05 + Math.sin(t * 2) * 0.05), 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = this.hitPulse > 0 ? "#fff1bd" : bone ? "#35426a" : "#3b2a55";
      ctx.beginPath();
      ctx.moveTo(0, -r * 1.05);
      ctx.quadraticCurveTo(r * 0.75, -r * 0.1, r * 0.36, r * 1);
      ctx.lineTo(-r * 0.36, r * 1);
      ctx.quadraticCurveTo(-r * 0.75, -r * 0.1, 0, -r * 1.05);
      ctx.fill();
      this.drawInkOutline(ctx, "rgba(21, 15, 35, 0.74)", 2);
      ctx.strokeStyle = "#fff1bd";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(r * 0.62, -r * 0.7);
      ctx.lineTo(r * 0.92, r * 0.88);
      ctx.stroke();
      this.drawRedEyes(ctx, r, bone ? "dot" : "slash");
      return true;
    }

    drawNineTailShade(ctx, t) {
      ctx.save();
      ctx.globalAlpha = 0.78 + Math.sin(t * 7) * 0.08;
      this.drawFoxEnemy(ctx, t, true);
      ctx.restore();
      const r = this.radius;
      ctx.save();
      ctx.globalAlpha = 0.28;
      ctx.strokeStyle = "rgba(255, 241, 189, 0.8)";
      ctx.lineWidth = 1.1;
      ctx.beginPath();
      ctx.ellipse(Math.sin(t * 8) * r * 0.18, 0, r * 1.18, r * 0.96, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
      return true;
    }

    drawWaterApe(ctx, t) {
      const r = this.radius;
      this.drawGroundMist(ctx, r, t, 1.15);
      ctx.strokeStyle = "rgba(127, 209, 216, 0.5)";
      ctx.lineWidth = 1.4;
      for (let i = 0; i < 3; i += 1) {
        ctx.beginPath();
        ctx.ellipse(0, r * (0.55 + i * 0.12), r * (0.78 + i * 0.22), r * 0.18, 0, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.fillStyle = this.hitPulse > 0 ? "#fff1bd" : "#244f5a";
      ctx.beginPath();
      ctx.ellipse(0, 0, r * 0.8, r * 0.95, 0, 0, Math.PI * 2);
      ctx.fill();
      this.drawInkOutline(ctx, "rgba(12, 43, 48, 0.78)", 2.3);
      ctx.fillStyle = "#173f42";
      for (const side of [-1, 1]) {
        ctx.beginPath();
        ctx.ellipse(side * r * 0.78, r * 0.1, r * 0.26, r * 0.62, side * 0.26, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.strokeStyle = "rgba(215, 255, 245, 0.62)";
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(0, -r * 0.42, r * 0.48, 0.1, Math.PI - 0.1);
      ctx.stroke();
      this.drawRedEyes(ctx, r, "giant");
      return true;
    }

    drawBlackWind(ctx, t) {
      const r = this.radius;
      ctx.save();
      ctx.globalAlpha = 0.8;
      ctx.fillStyle = this.hitPulse > 0 ? "#fff1bd" : "rgba(18, 21, 24, 0.88)";
      for (let i = 0; i < 4; i += 1) {
        const a = t * 2.4 + i * Math.PI * 0.55;
        ctx.beginPath();
        ctx.ellipse(
          Math.cos(a) * r * 0.16,
          Math.sin(a) * r * 0.2,
          r * (0.72 - i * 0.05),
          r * (0.32 + i * 0.06),
          a,
          0,
          Math.PI * 2,
        );
        ctx.fill();
      }
      ctx.strokeStyle = "rgba(159, 217, 207, 0.48)";
      ctx.lineWidth = 1.3;
      for (let i = 0; i < 4; i += 1) {
        ctx.beginPath();
        ctx.arc(0, 0, r * (0.42 + i * 0.18), t * 2 + i, t * 2 + Math.PI * 1.2 + i);
        ctx.stroke();
      }
      ctx.fillStyle = "#ff6b57";
      ctx.shadowColor = "#ff6b57";
      ctx.shadowBlur = 4;
      ctx.beginPath();
      ctx.arc(-r * 0.22, -r * 0.18, Math.max(2, r * 0.1), 0, Math.PI * 2);
      ctx.arc(r * 0.22, -r * 0.18, Math.max(2, r * 0.1), 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      return true;
    }

    drawBoneDemon(ctx, t) {
      const r = this.radius;
      this.drawGroundMist(ctx, r, t, 0.86);
      ctx.strokeStyle = this.hitPulse > 0 ? "#fff1bd" : "#e8f7ef";
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(0, -r * 0.46);
      ctx.lineTo(0, r * 0.62);
      ctx.moveTo(-r * 0.48, -r * 0.16);
      ctx.lineTo(r * 0.48, -r * 0.16);
      ctx.moveTo(-r * 0.34, r * 0.08);
      ctx.lineTo(r * 0.34, r * 0.08);
      ctx.moveTo(-r * 0.2, r * 0.58);
      ctx.lineTo(-r * 0.46, r * 0.96);
      ctx.moveTo(r * 0.2, r * 0.58);
      ctx.lineTo(r * 0.46, r * 0.96);
      ctx.stroke();
      ctx.fillStyle = this.hitPulse > 0 ? "#fff1bd" : "#f3fff9";
      ctx.beginPath();
      ctx.ellipse(0, -r * 0.78, r * 0.46, r * 0.38, 0, 0, Math.PI * 2);
      ctx.fill();
      this.drawInkOutline(ctx, "rgba(49, 91, 87, 0.66)", 1.2);
      ctx.strokeStyle = "#ff6b57";
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.moveTo(-r * 0.52, -r * 0.04);
      ctx.quadraticCurveTo(0, r * 0.18 + Math.sin(t * 4) * 2, r * 0.54, -r * 0.08);
      ctx.stroke();
      this.drawRedEyes(ctx, r, "dot");
      return true;
    }

    drawPigDragon(ctx, t, vanguard = false) {
      const r = this.radius;
      this.drawGroundMist(ctx, r, t, 1.25);
      if (this.shield > 0) {
        ctx.strokeStyle = "rgba(159, 217, 207, 0.5)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(0, 0, r * 1.35, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.fillStyle = this.hitPulse > 0 ? "#fff1bd" : vanguard ? "#5c2e28" : "#354a42";
      ctx.beginPath();
      ctx.ellipse(0, 0, r * 1.05, r * 0.92, 0, 0, Math.PI * 2);
      ctx.fill();
      this.drawInkOutline(ctx, "rgba(16, 28, 25, 0.78)", 2.5);
      ctx.strokeStyle = vanguard ? "#f5d78a" : "#9fd9cf";
      ctx.lineWidth = 2.2;
      for (let i = -1; i <= 1; i += 1) {
        ctx.beginPath();
        ctx.moveTo(i * r * 0.35, -r * 0.72);
        ctx.lineTo(i * r * 0.18, r * 0.62);
        ctx.stroke();
      }
      ctx.fillStyle = "#f3fff9";
      ctx.beginPath();
      ctx.moveTo(-r * 0.5, r * 0.1);
      ctx.lineTo(-r * 0.92, r * 0.36);
      ctx.lineTo(-r * 0.38, r * 0.34);
      ctx.moveTo(r * 0.5, r * 0.1);
      ctx.lineTo(r * 0.92, r * 0.36);
      ctx.lineTo(r * 0.38, r * 0.34);
      ctx.fill();
      this.drawRedEyes(ctx, r, "giant");
      return true;
    }

    drawJourneyBoss(ctx, t, visual) {
      const r = this.radius;
      this.drawGroundMist(ctx, r, t, 1.7);
      const isBull = visual === "bossBullKing" || visual === "bullKingBoss";
      const isBone = visual === "bossBoneLady" || visual === "whiteBoneBoss";
      const isYellow = visual === "bossYellowWind" || visual === "wuzhiqiBoss";
      const isBlack = visual === "bossBlackWind" || visual === "blackWindBoss";
      const fill = this.hitPulse > 0
        ? "#fff1bd"
        : isBull
          ? "#5b2b26"
          : isBone
            ? "#e8f7ef"
            : isYellow
              ? "#806136"
              : isBlack
                ? "#20282c"
                : "#244f5a";
      ctx.fillStyle = fill;
      ctx.beginPath();
      ctx.moveTo(0, -r * 1.25);
      ctx.bezierCurveTo(r * 1.2, -r * 0.9, r * 1.25, r * 0.48, r * 0.4, r * 1.18);
      ctx.lineTo(0, r * 1.35);
      ctx.lineTo(-r * 0.4, r * 1.18);
      ctx.bezierCurveTo(-r * 1.25, r * 0.48, -r * 1.2, -r * 0.9, 0, -r * 1.25);
      ctx.fill();
      this.drawInkOutline(ctx, "rgba(16, 20, 24, 0.86)", 3.2);
      ctx.strokeStyle = isBull ? "#f5d78a" : isBone ? "#9fd9cf" : isYellow ? "#fff1bd" : "#e9b85f";
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(-r * 0.45, -r * 0.88);
      ctx.quadraticCurveTo(-r * 1.45, -r * 1.45, -r * 1.55, -r * 0.42);
      ctx.moveTo(r * 0.45, -r * 0.88);
      ctx.quadraticCurveTo(r * 1.45, -r * 1.45, r * 1.55, -r * 0.42);
      ctx.stroke();
      if (isYellow || isBlack) {
        ctx.strokeStyle = isYellow ? "rgba(255, 241, 189, 0.62)" : "rgba(159, 217, 207, 0.52)";
        ctx.lineWidth = 1.6;
        for (let i = 0; i < 4; i += 1) {
          ctx.beginPath();
          ctx.arc(0, r * 0.1, r * (0.45 + i * 0.15), t * (isYellow ? 1.7 : 2.4) + i, t * (isYellow ? 1.7 : 2.4) + Math.PI * 1.2 + i);
          ctx.stroke();
        }
      }
      if (isBone) {
        ctx.strokeStyle = "rgba(49, 91, 87, 0.6)";
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(-r * 0.35, -r * 0.45);
        ctx.lineTo(r * 0.35, r * 0.48);
        ctx.moveTo(r * 0.35, -r * 0.45);
        ctx.lineTo(-r * 0.35, r * 0.48);
        ctx.stroke();
        ctx.strokeStyle = "#ff6b57";
        ctx.lineWidth = 2.2;
        ctx.beginPath();
        ctx.moveTo(-r * 0.72, r * 0.18);
        ctx.quadraticCurveTo(0, r * 0.52 + Math.sin(t * 4) * 3, r * 0.72, r * 0.16);
        ctx.stroke();
      }
      if (isBull) {
        ctx.strokeStyle = "rgba(255, 107, 87, 0.64)";
        ctx.lineWidth = 2.4;
        for (let i = -1; i <= 1; i += 1) {
          ctx.beginPath();
          ctx.moveTo(i * r * 0.32, -r * 0.7);
          ctx.lineTo(i * r * 0.1, r * 0.62);
          ctx.stroke();
        }
      }
      this.drawRedEyes(ctx, r, isBull ? "giant" : "slash");
      return true;
    }

    drawEnemyAura(ctx, game, t) {
      const r = this.radius;
      const heavy = ["boarDragon", "stoneArmor", "waterApe", "bullVanguard"].includes(this.type) || this.isBoss;
      const auraR = r + (heavy ? 12 : 8) + Math.sin(t * 3) * 1.4;
      ctx.save();
      ctx.globalAlpha = ["shrimpDemon", "yaksha", "blackWind"].includes(this.type) ? 0.2 : 0.26;
      ctx.strokeStyle = this.shield > 0
        ? "#bfeee4"
        : this.visual === "blackWind"
          ? "rgba(13, 18, 22, 0.72)"
          : this.visual === "lampGranny"
            ? "rgba(233, 184, 95, 0.52)"
            : this.visual === "waterApe"
              ? "rgba(127, 209, 216, 0.56)"
              : "rgba(61, 29, 69, 0.42)";
      ctx.lineWidth = heavy ? 3 : 2;
      ctx.beginPath();
      ctx.ellipse(0, 0, auraR * 0.95, auraR * 0.72, Math.sin(t) * 0.12, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = ["shrimpDemon", "yaksha", "blackWind"].includes(this.type) ? "rgba(31, 86, 87, 0.16)" : "rgba(38, 18, 48, 0.14)";
      ctx.beginPath();
      ctx.ellipse(0, r * 0.72, auraR * 0.82, r * 0.34, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    drawSmallDemon(ctx, _game, t) {
      const r = this.radius;
      this.drawGroundMist(ctx, r, t, 0.9);

      ctx.fillStyle = this.hitPulse > 0 ? "#fff1bd" : "#173f42";
      ctx.beginPath();
      ctx.moveTo(0, -r * 1.05);
      ctx.bezierCurveTo(r * 0.78, -r * 0.78, r * 0.82, r * 0.42, 0, r * 0.92);
      ctx.bezierCurveTo(-r * 0.82, r * 0.42, -r * 0.78, -r * 0.78, 0, -r * 1.05);
      ctx.fill();

      ctx.fillStyle = "rgba(36, 91, 90, 0.72)";
      ctx.beginPath();
      ctx.ellipse(0, -r * 0.06, r * 0.78, r * 0.88, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = "#8fbfb8";
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.moveTo(-r * 0.4, -r * 0.78);
      ctx.lineTo(-r * 0.74, -r * 1.18);
      ctx.moveTo(r * 0.4, -r * 0.78);
      ctx.lineTo(r * 0.74, -r * 1.18);
      ctx.stroke();

      this.drawRedEyes(ctx, r, "dot");
      this.drawTailShadow(ctx, r, t);
    }

    drawRunnerDemon(ctx, _game, t) {
      const r = this.radius;
      this.drawGroundMist(ctx, r, t, 0.65);

      ctx.fillStyle = this.hitPulse > 0 ? "#fff1bd" : "#102d34";
      ctx.beginPath();
      ctx.moveTo(0, -r * 1.34);
      ctx.bezierCurveTo(r * 0.82, -r * 0.72, r * 0.5, r * 0.92, 0, r * 1.32);
      ctx.bezierCurveTo(-r * 0.5, r * 0.92, -r * 0.82, -r * 0.72, 0, -r * 1.34);
      ctx.fill();

      ctx.fillStyle = "rgba(31, 86, 87, 0.8)";
      ctx.beginPath();
      ctx.ellipse(0, -r * 0.08, r * 0.54, r * 1.06, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = "rgba(159, 217, 207, 0.62)";
      ctx.lineWidth = 1.1;
      for (let i = 0; i < 3; i += 1) {
        const x = (i - 1) * r * 0.55 + Math.sin(t * 5 + i) * 1.5;
        ctx.beginPath();
        ctx.moveTo(x, r * 0.55);
        ctx.lineTo(x - r * 0.34, r * 1.25);
        ctx.stroke();
      }

      this.drawRedEyes(ctx, r, "slash");
    }

    drawRunnerTrail(ctx, _game, t) {
      const r = this.radius;
      ctx.save();
      for (let i = 1; i <= 3; i += 1) {
        ctx.globalAlpha = 0.16 - i * 0.032;
        ctx.fillStyle = i % 2 ? "#173f42" : "#2f7470";
        ctx.beginPath();
        ctx.ellipse(
          Math.sin(t * 4 + i) * i * 1.5,
          -r * i * 0.95,
          r * (0.82 - i * 0.1),
          r * (1.08 - i * 0.12),
          0,
          0,
          Math.PI * 2,
        );
        ctx.fill();
      }
      ctx.strokeStyle = "rgba(215, 255, 245, 0.24)";
      ctx.lineWidth = 1;
      for (let i = 0; i < 3; i += 1) {
        const offset = (i - 1) * r * 0.5;
        ctx.beginPath();
        ctx.moveTo(offset, -r * 0.8 - i * 5);
        ctx.lineTo(offset - r * 0.35, -r * 2.2 - i * 4);
        ctx.stroke();
      }
      ctx.restore();
    }

    drawGiantDemon(ctx, _game, t) {
      const r = this.radius;
      this.drawGroundMist(ctx, r, t, 1.2);

      ctx.fillStyle = "rgba(12, 27, 29, 0.78)";
      ctx.beginPath();
      ctx.ellipse(-r * 0.82, r * 0.12, r * 0.28, r * 0.52, -0.42, 0, Math.PI * 2);
      ctx.ellipse(r * 0.82, r * 0.12, r * 0.28, r * 0.52, 0.42, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = this.hitPulse > 0 ? "#fff1bd" : "#172f2f";
      ctx.beginPath();
      ctx.moveTo(0, -r * 1.08);
      ctx.bezierCurveTo(r * 1.14, -r * 1.02, r * 1.28, r * 0.26, r * 0.42, r * 0.96);
      ctx.lineTo(0, r * 1.18);
      ctx.lineTo(-r * 0.42, r * 0.96);
      ctx.bezierCurveTo(-r * 1.28, r * 0.26, -r * 1.14, -r * 1.02, 0, -r * 1.08);
      ctx.fill();

      ctx.fillStyle = "rgba(49, 91, 87, 0.82)";
      ctx.beginPath();
      ctx.ellipse(0, -r * 0.08, r * 0.94, r * 0.92, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = "#e9b85f";
      ctx.lineWidth = 4.8;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(-r * 0.46, -r * 0.82);
      ctx.quadraticCurveTo(-r * 1.2, -r * 1.34, -r * 1.42, -r * 0.62);
      ctx.moveTo(r * 0.46, -r * 0.82);
      ctx.quadraticCurveTo(r * 1.2, -r * 1.34, r * 1.42, -r * 0.62);
      ctx.stroke();

      ctx.strokeStyle = "rgba(245, 215, 138, 0.55)";
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.moveTo(0, -r * 0.58);
      ctx.lineTo(-r * 0.16, -r * 0.22);
      ctx.lineTo(r * 0.14, r * 0.06);
      ctx.stroke();

      this.drawRedEyes(ctx, r, "giant");
      ctx.fillStyle = "#f3fff9";
      ctx.beginPath();
      ctx.moveTo(-r * 0.22, r * 0.24);
      ctx.lineTo(-r * 0.1, r * 0.5);
      ctx.lineTo(0, r * 0.24);
      ctx.moveTo(r * 0.22, r * 0.24);
      ctx.lineTo(r * 0.1, r * 0.5);
      ctx.lineTo(0, r * 0.24);
      ctx.fill();
    }

    drawShieldDemon(ctx, game, t) {
      const r = this.radius;
      if (this.shield > 0) this.drawShieldAura(ctx, game, t);
      this.drawGroundMist(ctx, r, t, 0.9);

      ctx.fillStyle = this.hitPulse > 0 ? "#fff1bd" : "#183a35";
      ctx.beginPath();
      ctx.moveTo(0, -r * 1.08);
      ctx.bezierCurveTo(r * 0.78, -r * 0.72, r * 0.72, r * 0.62, 0, r * 1);
      ctx.bezierCurveTo(-r * 0.72, r * 0.62, -r * 0.78, -r * 0.72, 0, -r * 1.08);
      ctx.fill();

      ctx.fillStyle = "rgba(47, 116, 112, 0.78)";
      ctx.beginPath();
      ctx.ellipse(0, -r * 0.02, r * 0.72, r * 0.86, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = "rgba(245, 215, 138, 0.5)";
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(-r * 0.32, -r * 0.54);
      ctx.lineTo(r * 0.28, -r * 0.06);
      ctx.lineTo(-r * 0.18, r * 0.38);
      ctx.stroke();

      ctx.strokeStyle = "#bfeee4";
      ctx.lineWidth = 2.4;
      ctx.beginPath();
      ctx.moveTo(-r * 0.44, -r * 0.76);
      ctx.lineTo(-r * 0.72, -r * 1.08);
      ctx.moveTo(r * 0.44, -r * 0.76);
      ctx.lineTo(r * 0.72, -r * 1.08);
      ctx.stroke();
      this.drawRedEyes(ctx, r, "dot");
    }

    drawFlyingDemon(ctx, _game, t) {
      const r = this.radius;
      ctx.save();
      ctx.globalAlpha = 0.34;
      ctx.fillStyle = "#0d2428";
      const flap = Math.sin(t * 9) * r * 0.18;
      ctx.beginPath();
      ctx.moveTo(-r * 0.18, -r * 0.18);
      ctx.quadraticCurveTo(-r * 1.6, -r * 0.82 - flap, -r * 1.08, r * 0.38);
      ctx.quadraticCurveTo(-r * 0.55, r * 0.05, -r * 0.16, r * 0.22);
      ctx.moveTo(r * 0.18, -r * 0.18);
      ctx.quadraticCurveTo(r * 1.6, -r * 0.82 - flap, r * 1.08, r * 0.38);
      ctx.quadraticCurveTo(r * 0.55, r * 0.05, r * 0.16, r * 0.22);
      ctx.fill();
      ctx.restore();

      ctx.fillStyle = this.hitPulse > 0 ? "#fff1bd" : "#16383b";
      ctx.beginPath();
      ctx.moveTo(0, -r * 1.02);
      ctx.bezierCurveTo(r * 0.52, -r * 0.48, r * 0.38, r * 0.8, 0, r * 1.02);
      ctx.bezierCurveTo(-r * 0.38, r * 0.8, -r * 0.52, -r * 0.48, 0, -r * 1.02);
      ctx.fill();
      this.drawRedEyes(ctx, r, "slash");
    }

    drawCasterDemon(ctx, _game, t) {
      const r = this.radius;
      this.drawGroundMist(ctx, r, t, 0.9);
      ctx.fillStyle = this.hitPulse > 0 ? "#fff1bd" : "#251f3b";
      ctx.beginPath();
      ctx.moveTo(0, -r * 1.2);
      ctx.quadraticCurveTo(r * 0.82, -r * 0.4, r * 0.58, r * 1.12);
      ctx.quadraticCurveTo(0, r * 0.72, -r * 0.58, r * 1.12);
      ctx.quadraticCurveTo(-r * 0.82, -r * 0.4, 0, -r * 1.2);
      ctx.fill();

      ctx.strokeStyle = "rgba(255, 241, 189, 0.72)";
      ctx.lineWidth = 1.3;
      ctx.beginPath();
      ctx.arc(0, -r * 0.08, r * 0.72, t, t + Math.PI * 1.35);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(r * 0.74, -r * 0.96);
      ctx.lineTo(r * 0.92, r * 0.82);
      ctx.moveTo(r * 0.64, -r * 0.7);
      ctx.lineTo(r * 1.02, -r * 0.7);
      ctx.stroke();
      this.drawRedEyes(ctx, r, "dot");
    }

    drawEnemyTrait(ctx, _game, t) {
      const r = this.radius;
      ctx.save();
      if (this.elite || this.config.allySpeedAura || this.isBoss) {
        ctx.strokeStyle = this.isBoss ? "rgba(255, 241, 189, 0.68)" : "rgba(233, 184, 95, 0.46)";
        ctx.lineWidth = this.isBoss ? 2.2 : 1.2;
        ctx.setLineDash([7, 6]);
        ctx.lineDashOffset = -t * 18;
        ctx.beginPath();
        ctx.ellipse(0, r * 0.68, r * (this.isBoss ? 1.25 : 1.05), r * 0.36, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
      }
      if (this.visual === "frogDemon" || this.visual === "poison") {
        ctx.fillStyle = "rgba(136, 210, 132, 0.58)";
        for (let i = 0; i < 4; i += 1) {
          const a = t * 2 + i * Math.PI * 0.5;
          ctx.beginPath();
          ctx.arc(Math.cos(a) * r * 0.85, Math.sin(a) * r * 0.72, Math.max(1.5, r * 0.11), 0, Math.PI * 2);
          ctx.fill();
        }
      }
      if (this.visual === "stoneArmor" || this.visual === "stone" || this.visual === "xuanArmor") {
        ctx.strokeStyle = "rgba(243, 255, 249, 0.42)";
        ctx.lineWidth = 1.1;
        ctx.beginPath();
        ctx.moveTo(-r * 0.42, -r * 0.52);
        ctx.lineTo(-r * 0.08, -r * 0.08);
        ctx.lineTo(-r * 0.28, r * 0.42);
        ctx.moveTo(r * 0.34, -r * 0.48);
        ctx.lineTo(r * 0.04, r * 0.08);
        ctx.lineTo(r * 0.34, r * 0.5);
        ctx.stroke();
      }
      if (this.visual === "lampGranny" || this.visual === "fire") {
        ctx.fillStyle = "rgba(233, 184, 95, 0.72)";
        for (let i = 0; i < 5; i += 1) {
          const a = -t * 4 + i * Math.PI * 0.4;
          ctx.beginPath();
          ctx.ellipse(Math.cos(a) * r * 0.82, Math.sin(a) * r * 0.72, r * 0.11, r * 0.2, a, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      if (this.visual === "yakshaCn" || this.visual === "yaksha") {
        ctx.strokeStyle = "rgba(243, 255, 249, 0.54)";
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(-r * 0.68, r * 0.1);
        ctx.lineTo(-r * 1.05, r * 0.46);
        ctx.moveTo(r * 0.68, r * 0.1);
        ctx.lineTo(r * 1.05, r * 0.46);
        ctx.stroke();
      }
      if (this.visual === "nineTailShade" || this.visual === "splitter") {
        ctx.strokeStyle = "rgba(255, 241, 189, 0.48)";
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(-r * 0.1, -r * 0.75);
        ctx.lineTo(r * 0.12, -r * 0.1);
        ctx.lineTo(-r * 0.04, r * 0.72);
        ctx.stroke();
      }
      if (this.visual === "waterApe" || this.visual === "drainer") {
        ctx.strokeStyle = "rgba(174, 188, 255, 0.46)";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(0, 0, r * (1.1 + Math.sin(t * 3) * 0.08), 0, Math.PI * 2);
        ctx.stroke();
      }
      if (this.visual === "blackWind") {
        ctx.strokeStyle = "rgba(159, 217, 207, 0.42)";
        ctx.lineWidth = 1.1;
        for (let i = 0; i < 3; i += 1) {
          ctx.beginPath();
          ctx.arc(0, 0, r * (0.8 + i * 0.18), t * 2 + i, t * 2 + Math.PI * 0.8 + i);
          ctx.stroke();
        }
      }
      if (this.visual === "boneDemon" || this.visual === "bossBoneLady") {
        ctx.fillStyle = "rgba(255, 107, 87, 0.6)";
        ctx.beginPath();
        ctx.ellipse(-r * 0.38, r * 0.04, r * 0.12, r * 0.26, -0.6, 0, Math.PI * 2);
        ctx.ellipse(r * 0.38, r * 0.04, r * 0.12, r * 0.26, 0.6, 0, Math.PI * 2);
        ctx.fill();
      }
      if (this.visual === "bossBullKing" || this.visual === "kingBoss") {
        ctx.fillStyle = "rgba(255, 241, 189, 0.72)";
        ctx.beginPath();
        ctx.moveTo(0, -r * 1.35);
        ctx.lineTo(-r * 0.22, -r * 1.02);
        ctx.lineTo(r * 0.22, -r * 1.02);
        ctx.fill();
      }
      ctx.restore();
    }

    drawShieldAura(ctx, _game, t) {
      const r = this.radius + 8;
      ctx.save();
      ctx.strokeStyle = "rgba(183, 239, 229, 0.66)";
      ctx.lineWidth = 2.2;
      ctx.setLineDash([5, 5]);
      ctx.lineDashOffset = -t * 14;
      ctx.beginPath();
      ctx.arc(0, 0, r + Math.sin(t * 5) * 1.2, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.strokeStyle = "rgba(255, 241, 189, 0.32)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(0, 0, r - 4, 0, Math.PI * 2);
      ctx.stroke();
      for (let i = 0; i < 6; i += 1) {
        const a = t * 1.2 + i * Math.PI / 3;
        ctx.beginPath();
        ctx.moveTo(Math.cos(a) * (r - 2), Math.sin(a) * (r - 2));
        ctx.lineTo(Math.cos(a) * (r + 5), Math.sin(a) * (r + 5));
        ctx.stroke();
      }
      ctx.restore();
    }

    drawGroundMist(ctx, r, t, scale = 1) {
      ctx.save();
      ctx.globalAlpha = 0.28;
      ctx.fillStyle = "#0b1b1e";
      for (let i = 0; i < 3; i += 1) {
        ctx.beginPath();
        ctx.ellipse(
          Math.sin(t * 1.6 + i) * r * 0.26,
          r * (0.72 + i * 0.08),
          r * (0.72 + i * 0.18) * scale,
          r * 0.18,
          0,
          0,
          Math.PI * 2,
        );
        ctx.fill();
      }
      ctx.restore();
    }

    drawTailShadow(ctx, r, t) {
      ctx.save();
      ctx.globalAlpha = 0.28;
      ctx.fillStyle = "#0b1b1e";
      ctx.beginPath();
      ctx.moveTo(0, r * 0.26);
      ctx.quadraticCurveTo(-r * 0.95, r * 0.38 + Math.sin(t * 3) * 1.5, -r * 1.42, r * 0.08);
      ctx.quadraticCurveTo(-r * 0.68, r * 0.12, 0, r * 0.44);
      ctx.fill();
      ctx.restore();
    }

    drawRedEyes(ctx, r, mode) {
      ctx.save();
      ctx.shadowColor = "#ff6b57";
      ctx.shadowBlur = 4;
      ctx.strokeStyle = "#ff6b57";
      ctx.fillStyle = "#ff6b57";
      if (mode === "slash") {
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(-r * 0.5, -r * 0.2);
        ctx.lineTo(-r * 0.12, -r * 0.12);
        ctx.moveTo(r * 0.5, -r * 0.2);
        ctx.lineTo(r * 0.12, -r * 0.12);
        ctx.stroke();
      } else if (mode === "giant") {
        ctx.beginPath();
        ctx.ellipse(-r * 0.34, -r * 0.2, r * 0.16, r * 0.1, -0.18, 0, Math.PI * 2);
        ctx.ellipse(r * 0.34, -r * 0.2, r * 0.16, r * 0.1, 0.18, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.arc(-r * 0.32, -r * 0.22, Math.max(2, r * 0.12), 0, Math.PI * 2);
        ctx.arc(r * 0.32, -r * 0.22, Math.max(2, r * 0.12), 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    drawHitOutline(ctx) {
      if (this.hitPulse <= 0) return;
      const r = this.radius + 4 + this.hitPulse * 3;
      ctx.save();
      ctx.globalAlpha = this.hitPulse * 0.72;
      ctx.strokeStyle = this.hitPulse > 0.5 ? "#fff1bd" : "#f3fff9";
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.ellipse(0, 0, r, r * 0.85, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }

    drawEnemyStatusEffects(ctx, game, t, behindBody) {
      const r = this.radius;
      const slowed = game.elapsed < this.slowUntil;
      const burning = game.elapsed < this.burnVisualUntil;
      const stunned = game.elapsed < this.stunUntil;

      if (behindBody && slowed) {
        ctx.save();
        ctx.strokeStyle = "rgba(183, 239, 255, 0.52)";
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.ellipse(0, r * 0.72, r * 1.1, r * 0.32, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      if (!behindBody && slowed) {
        ctx.save();
        ctx.strokeStyle = "rgba(215, 255, 245, 0.78)";
        ctx.lineWidth = 1;
        for (let i = 0; i < 4; i += 1) {
          const a = t * 1.8 + i * Math.PI * 0.5;
          const x = Math.cos(a) * r * 0.78;
          const y = Math.sin(a) * r * 0.62;
          ctx.beginPath();
          ctx.moveTo(x - 3, y);
          ctx.lineTo(x + 3, y);
          ctx.moveTo(x, y - 3);
          ctx.lineTo(x, y + 3);
          ctx.stroke();
        }
        ctx.restore();
      }

      if (!behindBody && burning) {
        ctx.save();
        ctx.fillStyle = "rgba(233, 184, 95, 0.78)";
        for (let i = 0; i < 4; i += 1) {
          const a = -t * 2.5 + i * Math.PI * 0.5;
          ctx.beginPath();
          ctx.arc(Math.cos(a) * r * 0.82, Math.sin(a) * r * 0.72, Math.max(1.6, r * 0.1), 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      if (!behindBody && stunned) {
        ctx.save();
        ctx.strokeStyle = "rgba(255, 241, 189, 0.72)";
        ctx.fillStyle = "rgba(255, 241, 189, 0.72)";
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(-3, -r - 12);
        ctx.lineTo(3, -r - 6);
        ctx.lineTo(-1, -r - 6);
        ctx.lineTo(4, -r - 1);
        ctx.stroke();
        for (let i = 0; i < 2; i += 1) {
          const a = t * 4 + i * Math.PI;
          ctx.beginPath();
          ctx.arc(Math.cos(a) * r * 0.52, -r - 7 + Math.sin(a) * 2, 1.8, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }
    }

    drawEnemyHealthBar(ctx, _game, t) {
      const hpRate = clamp(this.hp / this.maxHp, 0, 1);
      const heavy = this.isBoss || ["brute", "stone", "xuanArmor", "boarDragon", "stoneArmor", "waterApe", "bullVanguard"].includes(this.visual);
      const barW = this.radius * (this.isBoss ? 3.4 : heavy ? 2.9 : 2.35);
      const barH = this.isBoss ? 6.5 : heavy ? 5.5 : 3.8;
      const x = this.x - barW / 2;
      const y = this.y - this.radius - (heavy ? 18 : 14);
      const lowAlpha = hpRate < 0.28 ? 0.72 + Math.sin(t * 12) * 0.22 : 1;

      ctx.save();
      ctx.fillStyle = "rgba(15, 42, 42, 0.72)";
      ctx.strokeStyle = "rgba(255, 241, 189, 0.48)";
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      roundedRectPath(ctx, x, y, barW, barH, 3);
      ctx.fill();
      ctx.stroke();

      ctx.globalAlpha = lowAlpha;
      ctx.fillStyle = "#ff6b57";
      ctx.beginPath();
      roundedRectPath(ctx, x + 1, y + 1, Math.max(0, (barW - 2) * hpRate), Math.max(1, barH - 2), 3);
      ctx.fill();
      ctx.globalAlpha = 1;

      if (this.maxShield > 0) {
        const shieldRate = clamp(this.shield / this.maxShield, 0, 1);
        ctx.fillStyle = "rgba(15, 42, 42, 0.62)";
        ctx.beginPath();
        roundedRectPath(ctx, x, y + barH + 2, barW, 3.2, 2);
        ctx.fill();
        if (shieldRate > 0) {
          ctx.fillStyle = "#9fd9cf";
          ctx.beginPath();
          roundedRectPath(ctx, x + 1, y + barH + 2.8, Math.max(0, (barW - 2) * shieldRate), 1.8, 2);
          ctx.fill();
        }
      }
      ctx.restore();
    }
  }

  class Projectile {
    constructor(options) {
      Object.assign(this, options);
      this.active = true;
      this.life = options.life || 3;
      this.hitEnemies = new Set();
      this.angle = Math.atan2(this.vy, this.vx);
    }

    update(dt, game) {
      if (!this.active) return;
      this.life -= dt;
      if (this.target && !this.target.dead && this.speed) {
        this.angle = Math.atan2(this.target.y - this.y, this.target.x - this.x);
        this.vx = Math.cos(this.angle) * this.speed;
        this.vy = Math.sin(this.angle) * this.speed;
      }
      this.x += this.vx * dt;
      this.y += this.vy * dt;
      if (Math.random() < 0.55) {
        const color = this.kind === "fire" ? "#e9b85f" : this.kind === "ice" ? "#d7fff5" : "#f3fff9";
        const type = this.kind === "fire" ? "fire" : this.kind === "ice" ? "ice" : "sword";
        game.addParticle(
          this.x - Math.cos(this.angle) * 10,
          this.y - Math.sin(this.angle) * 10,
          color,
          rand(-12, 12),
          rand(-12, 12),
          rand(1.2, 3),
          rand(0.18, 0.38),
          type,
        );
      }

      if (
        this.life <= 0 ||
        this.x < -40 ||
        this.x > game.width + 40 ||
        this.y < -60 ||
        this.y > game.height + 60
      ) {
        this.active = false;
        return;
      }

      for (const enemy of game.enemies) {
        if (!game.isEnemyTargetable(enemy) || this.hitEnemies.has(enemy)) continue;
        const reach = enemy.radius + this.radius;
        if (distSq(this.x, this.y, enemy.x, enemy.y) > reach * reach) continue;

        this.hitEnemies.add(enemy);
        if (this.kind === "sword") {
          game.damageEnemy(enemy, this.damage, "sword", { x: this.x, y: this.y });
          game.spawnSlash(this.x, this.y, this.angle);
          this.pierce -= 1;
          if (this.pierce < 0) this.active = false;
        } else if (this.kind === "fire") {
          this.active = false;
          game.explode(this.x, this.y, this.range, this.damage, "fire");
          if (game.skills.fire.burn) {
            game.areaEffects.push(new AreaEffect({
              kind: "burn",
              x: this.x,
              y: this.y,
              radius: this.range * 0.78,
              duration: 2,
              damagePerSecond: this.damage * 0.28,
              color: "rgba(255, 109, 55, 0.24)",
              tickSource: "fire",
            }));
          }
        } else if (this.kind === "ice") {
          this.active = false;
          game.explode(this.x, this.y, this.range, this.damage, "ice");
          for (const target of game.enemies) {
            if (!game.isEnemyTargetable(target)) continue;
            const radius = this.range + target.radius;
            if (distSq(this.x, this.y, target.x, target.y) <= radius * radius) {
              target.slowUntil = Math.max(target.slowUntil, game.elapsed + this.slowDuration);
              target.slowFactor = Math.min(target.slowFactor, this.slowFactor);
            }
          }
        }
        break;
      }
    }

    draw(ctx) {
      if (!this.active) return;
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      if (this.kind === "sword") {
        const trail = ctx.createLinearGradient(-30, 0, 10, 0);
        trail.addColorStop(0, "rgba(118, 183, 164, 0)");
        trail.addColorStop(1, "rgba(215, 255, 245, 0.82)");
        ctx.strokeStyle = trail;
        ctx.lineWidth = 7;
        ctx.beginPath();
        ctx.moveTo(-28, 0);
        ctx.lineTo(7, 0);
        ctx.stroke();
        ctx.fillStyle = "#f3fff9";
        ctx.beginPath();
        ctx.moveTo(16, 0);
        ctx.lineTo(2, -4.5);
        ctx.lineTo(-12, -3);
        ctx.lineTo(-14, 0);
        ctx.lineTo(-12, 3);
        ctx.lineTo(2, 4.5);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = "#c99a43";
        ctx.fillRect(-17, -5, 4, 10);
        ctx.fillRect(-21, -2, 8, 4);
        ctx.strokeStyle = "#bfeee4";
        ctx.lineWidth = 1.5;
        ctx.stroke();
      } else if (this.kind === "fire") {
        ctx.fillStyle = "rgba(233, 184, 95, 0.28)";
        ctx.fillRect(-10, -13, 20, 26);
        ctx.fillStyle = "#fff1bd";
        ctx.strokeStyle = "#e9b85f";
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.rect(-8, -12, 16, 24);
        ctx.fill();
        ctx.stroke();
        ctx.strokeStyle = "#ff6b57";
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(-3, -7);
        ctx.lineTo(3, -4);
        ctx.lineTo(-2, 0);
        ctx.lineTo(4, 5);
        ctx.moveTo(-4, 7);
        ctx.lineTo(3, 8);
        ctx.stroke();
      } else if (this.kind === "ice") {
        ctx.fillStyle = "rgba(215, 255, 245, 0.25)";
        ctx.fillRect(-10, -12, 20, 24);
        ctx.fillStyle = "#f3fff9";
        ctx.strokeStyle = "#9fd9cf";
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.rect(-8, -11, 16, 22);
        ctx.fill();
        ctx.stroke();
        ctx.strokeStyle = "rgba(49, 116, 112, 0.9)";
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(-5, -5);
        ctx.lineTo(5, 5);
        ctx.moveTo(5, -5);
        ctx.lineTo(-5, 5);
        ctx.moveTo(-5, 0);
        ctx.lineTo(5, 0);
        ctx.stroke();
      }
      ctx.restore();
    }
  }

  class AreaEffect {
    constructor(options) {
      Object.assign(this, options);
      this.age = 0;
      this.active = true;
    }

    update(dt, game) {
      if (!this.active) return;
      this.age += dt;
      if (this.age >= this.duration) {
        this.active = false;
        return;
      }
      if (this.kind === "poison") {
        this.tickTimer = (this.tickTimer || 0) + dt;
        const touchingWall = this.y + this.radius >= game.wallY - 10;
        if (touchingWall && this.tickTimer >= 0.5) {
          this.tickTimer = 0;
          game.damageWall(this.wallDamage || 1, this.x, game.wallY - 18);
        }
        return;
      }
      if (this.damagePerSecond <= 0) return;
      const damage = this.damagePerSecond * dt;
      for (const enemy of game.enemies) {
        if (!game.isEnemyTargetable(enemy)) continue;
        const radius = this.radius + enemy.radius;
        if (distSq(this.x, this.y, enemy.x, enemy.y) <= radius * radius) {
          if (this.kind === "sand") {
            enemy.slowUntil = Math.max(enemy.slowUntil, game.elapsed + 0.3);
            enemy.slowFactor = Math.min(enemy.slowFactor, 0.58);
            enemy.x += (this.x - enemy.x) * dt * 0.35;
          }
          game.damageEnemy(enemy, damage, this.tickSource, { silent: true });
          if (this.kind === "array" && Math.random() < 0.18) {
            game.addParticle(enemy.x, enemy.y, "#d7fff5", rand(-35, 35), rand(-35, 35), rand(2, 4), rand(0.18, 0.35), "sword");
          }
        }
      }
    }

    draw(ctx) {
      if (!this.active) return;
      const t = 1 - this.age / this.duration;
      ctx.save();
      ctx.globalAlpha = clamp(t * 0.9, 0.14, 0.9);
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = this.kind === "array"
        ? "rgba(215, 255, 245, 0.68)"
        : this.kind === "poison"
          ? "rgba(136, 210, 132, 0.58)"
          : this.kind === "sand"
            ? "rgba(127, 209, 216, 0.62)"
            : this.kind === "quake"
              ? "rgba(245, 215, 138, 0.64)"
          : "rgba(233, 184, 95, 0.58)";
      ctx.lineWidth = 2;
      ctx.setLineDash(this.kind === "array" ? [8, 6] : [4, 5]);
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius * (0.9 + 0.08 * Math.sin(this.age * 8)), 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
      if (this.kind === "array") {
        ctx.translate(this.x, this.y);
        ctx.rotate(this.age * 1.8);
        ctx.strokeStyle = "rgba(215, 255, 245, 0.72)";
        ctx.lineWidth = 1.5;
        for (let i = 0; i < 8; i += 1) {
          const angle = (Math.PI * 2 * i) / 8;
          const x = Math.cos(angle) * this.radius * 0.68;
          const y = Math.sin(angle) * this.radius * 0.68;
          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(angle + Math.PI / 2);
          ctx.beginPath();
          ctx.moveTo(0, -9);
          ctx.lineTo(0, 9);
          ctx.moveTo(-4, -3);
          ctx.lineTo(0, -9);
          ctx.lineTo(4, -3);
          ctx.stroke();
          ctx.restore();
        }
        ctx.strokeStyle = "rgba(255, 241, 189, 0.58)";
        ctx.lineWidth = 1.2;
        for (let i = 0; i < 8; i += 1) {
          const a = (Math.PI * 2 * i) / 8;
          const inner = this.radius * 0.22;
          const outer = this.radius * 0.52;
          ctx.beginPath();
          ctx.moveTo(Math.cos(a) * inner, Math.sin(a) * inner);
          ctx.lineTo(Math.cos(a) * outer, Math.sin(a) * outer);
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(Math.cos(a) * this.radius * 0.78, Math.sin(a) * this.radius * 0.78, 3, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.beginPath();
        ctx.arc(0, 0, this.radius * 0.42, 0, Math.PI * 2);
        ctx.stroke();
      } else if (this.kind === "burn") {
        ctx.strokeStyle = "rgba(233, 184, 95, 0.62)";
        for (let i = 0; i < 6; i += 1) {
          const a = this.age * 2 + i;
          ctx.beginPath();
          ctx.arc(this.x + Math.cos(a) * this.radius * 0.35, this.y + Math.sin(a) * this.radius * 0.35, this.radius * 0.18, 0, Math.PI * 2);
          ctx.stroke();
        }
      } else if (this.kind === "poison") {
        ctx.fillStyle = "rgba(136, 210, 132, 0.22)";
        for (let i = 0; i < 9; i += 1) {
          const a = this.age * 1.4 + i * 0.7;
          ctx.beginPath();
          ctx.arc(this.x + Math.cos(a) * this.radius * 0.45, this.y + Math.sin(a * 1.3) * this.radius * 0.28, this.radius * 0.08, 0, Math.PI * 2);
          ctx.fill();
        }
      } else if (this.kind === "sand") {
        ctx.translate(this.x, this.y);
        ctx.rotate(this.age * 2.4);
        ctx.strokeStyle = "rgba(127, 209, 216, 0.58)";
        ctx.lineWidth = 1.3;
        for (let i = 0; i < 4; i += 1) {
          ctx.beginPath();
          ctx.arc(0, 0, this.radius * (0.25 + i * 0.15), i * 0.8, Math.PI + i * 0.8);
          ctx.stroke();
        }
      } else if (this.kind === "quake") {
        ctx.strokeStyle = "rgba(245, 215, 138, 0.68)";
        ctx.lineWidth = 2;
        for (let i = 0; i < 4; i += 1) {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius * (0.3 + i * 0.18 + this.age * 0.25), 0, Math.PI * 2);
          ctx.stroke();
        }
      }
      ctx.restore();
    }
  }

  class Particle {
    constructor(options) {
      Object.assign(this, options);
      this.age = 0;
      this.active = true;
      this.type = options.type || "hit";
      this.rotation = options.rotation || rand(0, Math.PI * 2);
      this.spin = options.spin || rand(-3, 3);
    }

    update(dt) {
      this.age += dt;
      if (this.age >= this.life) {
        this.active = false;
        return;
      }
      this.x += this.vx * dt;
      this.y += this.vy * dt;
      this.vx *= 0.985;
      this.vy *= 0.985;
      this.rotation += this.spin * dt;
    }

    draw(ctx) {
      if (!this.active) return;
      const alpha = 1 - this.age / this.life;
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      const size = Math.max(0.5, this.size * (0.45 + alpha * 0.75));
      if (this.type === "sword") {
        ctx.strokeStyle = this.color || "#d7fff5";
        ctx.lineWidth = Math.max(1, size * 0.55);
        ctx.beginPath();
        ctx.moveTo(-size * 1.8, 0);
        ctx.lineTo(size * 1.8, 0);
        ctx.stroke();
      } else if (this.type === "ice" || this.type === "shield") {
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(-size, 0);
        ctx.lineTo(size, 0);
        ctx.moveTo(0, -size);
        ctx.lineTo(0, size);
        ctx.moveTo(-size * 0.7, -size * 0.7);
        ctx.lineTo(size * 0.7, size * 0.7);
        ctx.moveTo(size * 0.7, -size * 0.7);
        ctx.lineTo(-size * 0.7, size * 0.7);
        ctx.stroke();
      } else if (this.type === "thunder") {
        ctx.globalAlpha = alpha * 0.5;
        ctx.strokeStyle = this.color || "#bfeee4";
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(-size * 0.4, -size);
        ctx.lineTo(size * 0.15, -size * 0.1);
        ctx.lineTo(-size * 0.1, -size * 0.1);
        ctx.lineTo(size * 0.45, size);
        ctx.stroke();
      } else if (this.type === "coin") {
        ctx.fillStyle = this.color || "#fff1bd";
        ctx.beginPath();
        ctx.arc(0, 0, size, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "rgba(70, 42, 8, 0.5)";
        ctx.lineWidth = 1;
        ctx.stroke();
      } else if (this.type === "fire") {
        ctx.fillStyle = this.color || "#e9b85f";
        ctx.beginPath();
        ctx.moveTo(0, -size * 1.4);
        ctx.quadraticCurveTo(size * 1.1, -size * 0.2, size * 0.3, size * 1.2);
        ctx.quadraticCurveTo(-size * 1.2, size * 0.2, 0, -size * 1.4);
        ctx.fill();
      } else if (this.type === "death") {
        ctx.globalAlpha = alpha * 0.62;
        ctx.fillStyle = this.color || "#6f8f8b";
        ctx.beginPath();
        ctx.ellipse(0, 0, size * 1.25, size * 0.7, this.rotation, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "rgba(215, 255, 245, 0.26)";
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(-size * 1.1, 0);
        ctx.quadraticCurveTo(0, -size * 0.9, size * 1.1, 0);
        ctx.stroke();
      } else {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(0, 0, size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }
  }

  class FloatingText {
    constructor(text, x, y, color = "#fff1ba", options = {}) {
      this.text = text;
      this.x = x;
      this.y = y;
      this.color = color;
      this.age = 0;
      this.life = options.life || 0.85;
      this.active = true;
      this.kind = options.kind || "normal";
      this.size = options.size || (this.kind === "crit" ? 18 : 13);
      this.vx = options.vx || rand(-8, 8);
      this.vy = options.vy || -38;
    }

    update(dt) {
      this.age += dt;
      this.x += this.vx * dt;
      this.y += this.vy * dt;
      this.vy += 18 * dt;
      if (this.age >= this.life) this.active = false;
    }

    draw(ctx) {
      if (!this.active) return;
      const t = this.age / this.life;
      const scale = this.kind === "crit"
        ? 1 + Math.sin(Math.min(1, t) * Math.PI) * 0.28
        : 1 + (1 - t) * 0.08;
      ctx.save();
      ctx.globalAlpha = 1 - t;
      ctx.translate(this.x, this.y);
      ctx.scale(scale, scale);
      ctx.lineWidth = 3;
      ctx.strokeStyle = "rgba(0, 0, 0, 0.45)";
      ctx.fillStyle = this.color;
      ctx.font = `bold ${this.size}px KaiTi, SimSun, serif`;
      ctx.textAlign = "center";
      ctx.strokeText(this.text, 0, 0);
      ctx.fillText(this.text, 0, 0);
      ctx.restore();
    }
  }

  class Skill {
    constructor(id, options) {
      this.id = id;
      Object.assign(this, options);
      this.timer = 0;
    }

    cooldown(game) {
      return Math.max(0.12, this.baseCooldown * this.cooldownMult * game.globalCooldownMult * (game.runtimeCooldownPenalty || 1));
    }

    update(dt, game) {
      if (!this.enabled || !game.hasTargetableEnemy()) return;
      this.timer -= dt;
      if (this.timer > 0) return;
      this.cast(game);
      this.timer += this.cooldown(game);
    }

    cast(game) {
      if (this.id === "sword") game.castSword();
      if (this.id === "fire") game.castFire();
      if (this.id === "ice") game.castIce();
      if (this.id === "thunder") game.castThunder();
      if (this.id === "array") game.castArray();
    }
  }

  class UpgradeSystem {
    constructor(game) {
      this.game = game;
      this.pool = this.createPool();
    }

    createPool() {
      return [
        {
          id: "global_damage",
          title: "万法归元",
          statText: (v) => `所有技能伤害 +${pct(v)}`,
          apply: (game, v) => {
            game.globalDamageMult *= 1 + v;
          },
          value: 0.1,
        },
        {
          id: "global_cooldown",
          title: "灵机流转",
          statText: (v) => `所有技能冷却 -${pct(v)}`,
          apply: (game, v) => {
            game.globalCooldownMult *= 1 - v;
          },
          value: 0.08,
        },
        {
          id: "wall_max",
          title: "玄石固城",
          statText: (v) => `城墙最大血量 +${Math.round(v)}`,
          apply: (game, v) => {
            const amount = Math.round(v);
            game.maxWallHp += amount;
            game.wallHp += amount;
          },
          value: 20,
        },
        {
          id: "wall_heal",
          title: "回春灵泉",
          statText: (v) => `城墙恢复 ${Math.round(v)} 血`,
          apply: (game, v) => {
            game.wallHp = Math.min(game.maxWallHp, game.wallHp + Math.round(v));
          },
          value: 15,
        },
        {
          id: "crit_rate",
          title: "破邪灵识",
          statText: (v) => `暴击率 +${pct(v)}`,
          apply: (game, v) => {
            game.critChance = Math.min(0.75, game.critChance + v);
          },
          value: 0.05,
        },
        {
          id: "crit_damage",
          title: "斩魄锋芒",
          statText: (v) => `暴击伤害 +${pct(v)}`,
          apply: (game, v) => {
            game.critDamage += v;
          },
          value: 0.2,
        },
        {
          id: "sword_damage",
          title: (theme) => `${theme.name}淬芒`,
          skill: "sword",
          statText: (v, _locked, theme) => `${theme.name}伤害 +${pct(v)}`,
          apply: (game, v) => {
            game.unlockSkill("sword");
            game.skills.sword.damageMult *= 1 + v;
          },
          value: 0.2,
        },
        {
          id: "sword_count",
          title: (theme) => `${theme.shortName}分影`,
          skill: "sword",
          statText: (v, _locked, theme) => `${theme.projectileName || theme.shortName}数量 +${Math.round(v)}`,
          apply: (game, v) => {
            game.unlockSkill("sword");
            game.skills.sword.count += Math.round(v);
          },
          value: 1,
          discrete: true,
        },
        {
          id: "sword_cooldown",
          title: (theme) => `${theme.shortName}疾发`,
          skill: "sword",
          statText: (v, _locked, theme) => `${theme.name}冷却 -${pct(v)}`,
          apply: (game, v) => {
            game.unlockSkill("sword");
            game.skills.sword.cooldownMult *= 1 - v;
          },
          value: 0.1,
        },
        {
          id: "sword_pierce",
          title: (theme) => `${theme.shortName}贯妖`,
          skill: "sword",
          statText: (v, _locked, theme) => `${theme.projectileName || theme.shortName}获得 ${Math.round(v)} 次穿透`,
          apply: (game, v) => {
            game.unlockSkill("sword");
            game.skills.sword.pierce += Math.round(v);
          },
          value: 1,
          discrete: true,
        },
        {
          id: "sword_speed",
          title: (theme) => `${theme.shortName}追风`,
          skill: "sword",
          statText: (v, _locked, theme) => `${theme.projectileName || theme.shortName}飞行速度 +${pct(v)}`,
          apply: (game, v) => {
            game.unlockSkill("sword");
            game.skills.sword.speedMult *= 1 + v;
          },
          value: 0.2,
        },
        {
          id: "fire_damage",
          title: (theme) => `${theme.shortName}炽燃`,
          skill: "fire",
          statText: (v, locked, theme) => `${locked ? `习得${theme.name}，` : ""}${theme.name}伤害 +${pct(v)}`,
          apply: (game, v) => {
            game.unlockSkill("fire");
            game.skills.fire.damageMult *= 1 + v;
          },
          value: 0.2,
        },
        {
          id: "fire_range",
          title: (theme) => `${theme.shortName}扩印`,
          skill: "fire",
          statText: (v, locked, theme) => `${locked ? `习得${theme.name}，` : ""}${theme.name}范围 +${pct(v)}`,
          apply: (game, v) => {
            game.unlockSkill("fire");
            game.skills.fire.rangeMult *= 1 + v;
          },
          value: 0.15,
        },
        {
          id: "fire_cooldown",
          title: (theme) => `${theme.shortName}疾发`,
          skill: "fire",
          statText: (v, locked, theme) => `${locked ? `习得${theme.name}，` : ""}${theme.name}冷却 -${pct(v)}`,
          apply: (game, v) => {
            game.unlockSkill("fire");
            game.skills.fire.cooldownMult *= 1 - v;
          },
          value: 0.1,
        },
        {
          id: "fire_burn",
          title: (theme) => `${theme.shortName}留痕`,
          skill: "fire",
          statText: (_v, locked, theme) => `${locked ? `习得${theme.name}，` : ""}${theme.name}命中后留下灼烧区域 2 秒`,
          apply: (game) => {
            game.unlockSkill("fire");
            game.skills.fire.burn = true;
          },
          value: 1,
          fixed: true,
        },
        {
          id: "ice_slow",
          title: (theme) => `${theme.shortName}镇妖`,
          skill: "ice",
          statText: (v, locked, theme) => `${locked ? `习得${theme.name}，` : ""}${theme.name}迟缓效果 +${pct(v)}`,
          apply: (game, v) => {
            game.unlockSkill("ice");
            game.skills.ice.slowPower = Math.min(0.82, game.skills.ice.slowPower + v);
          },
          value: 0.1,
        },
        {
          id: "ice_duration",
          title: (theme) => `${theme.shortName}绵长`,
          skill: "ice",
          statText: (v, locked, theme) => `${locked ? `习得${theme.name}，` : ""}${theme.name}持续时间 +${v.toFixed(1)} 秒`,
          apply: (game, v) => {
            game.unlockSkill("ice");
            game.skills.ice.slowDuration += v;
          },
          value: 1,
        },
        {
          id: "ice_range",
          title: (theme) => `${theme.shortName}外拓`,
          skill: "ice",
          statText: (v, locked, theme) => `${locked ? `习得${theme.name}，` : ""}${theme.name}范围 +${pct(v)}`,
          apply: (game, v) => {
            game.unlockSkill("ice");
            game.skills.ice.rangeMult *= 1 + v;
          },
          value: 0.15,
        },
        {
          id: "ice_vulnerable",
          title: (theme) => `${theme.shortName}破绽`,
          skill: "ice",
          statText: (v, locked, theme) => `${locked ? `习得${theme.name}，` : ""}受${theme.shortName}压制的妖怪承伤 +${pct(v)}`,
          apply: (game, v) => {
            game.unlockSkill("ice");
            game.iceVulnerabilityBonus += v;
          },
          value: 0.1,
        },
        {
          id: "thunder_damage",
          title: (theme) => `${theme.shortName}轰顶`,
          skill: "thunder",
          statText: (v, locked, theme) => `${locked ? `习得${theme.name}，` : ""}${theme.name}伤害 +${pct(v)}`,
          apply: (game, v) => {
            game.unlockSkill("thunder");
            game.skills.thunder.damageMult *= 1 + v;
          },
          value: 0.2,
        },
        {
          id: "thunder_bounce",
          title: (theme) => `${theme.shortName}连环`,
          skill: "thunder",
          statText: (v, locked, theme) => `${locked ? `习得${theme.name}，` : ""}${theme.name}弹射次数 +${Math.round(v)}`,
          apply: (game, v) => {
            game.unlockSkill("thunder");
            game.skills.thunder.bounces += Math.round(v);
          },
          value: 1,
          discrete: true,
        },
        {
          id: "thunder_cooldown",
          title: (theme) => `${theme.shortName}疾诵`,
          skill: "thunder",
          statText: (v, locked, theme) => `${locked ? `习得${theme.name}，` : ""}${theme.name}冷却 -${pct(v)}`,
          apply: (game, v) => {
            game.unlockSkill("thunder");
            game.skills.thunder.cooldownMult *= 1 - v;
          },
          value: 0.1,
        },
        {
          id: "thunder_stun",
          title: (theme) => `${theme.shortName}震魂`,
          skill: "thunder",
          statText: (_v, locked, theme) => `${locked ? `习得${theme.name}，` : ""}${theme.name}命中后短暂眩晕`,
          apply: (game) => {
            game.unlockSkill("thunder");
            game.skills.thunder.stun = true;
          },
          value: 1,
          fixed: true,
        },
        {
          id: "array_damage",
          title: (theme) => `${theme.shortName}鸣锋`,
          skill: "array",
          statText: (v, locked, theme) => `${locked ? `习得${theme.name}，` : ""}${theme.name}伤害 +${pct(v)}`,
          apply: (game, v) => {
            game.unlockSkill("array");
            game.skills.array.damageMult *= 1 + v;
          },
          value: 0.2,
        },
        {
          id: "array_range",
          title: (theme) => `${theme.shortName}扩界`,
          skill: "array",
          statText: (v, locked, theme) => `${locked ? `习得${theme.name}，` : ""}${theme.name}范围 +${pct(v)}`,
          apply: (game, v) => {
            game.unlockSkill("array");
            game.skills.array.rangeMult *= 1 + v;
          },
          value: 0.15,
        },
        {
          id: "array_duration",
          title: (theme) => `${theme.shortName}不息`,
          skill: "array",
          statText: (v, locked, theme) => `${locked ? `习得${theme.name}，` : ""}${theme.name}持续时间 +${v.toFixed(1)} 秒`,
          apply: (game, v) => {
            game.unlockSkill("array");
            game.skills.array.duration += v;
          },
          value: 1,
        },
        {
          id: "array_interval",
          title: (theme) => `${theme.shortName}更迭`,
          skill: "array",
          statText: (v, locked, theme) => `${locked ? `习得${theme.name}，` : ""}${theme.name}触发间隔 -${pct(v)}`,
          apply: (game, v) => {
            game.unlockSkill("array");
            game.skills.array.cooldownMult *= 1 - v;
          },
          value: 0.1,
        },
      ];
    }

    getGuaranteedOptionIds() {
      if (this.game.level === 1) {
        return ["sword_count", "sword_damage", "global_damage"];
      }
      if (this.game.level === 2) {
        return ["fire_damage", "fire_range", "ice_slow", "ice_range", "thunder_damage", "thunder_bounce", "array_damage", "array_range"];
      }
      if (this.game.level === 3) {
        return ["fire_range", "fire_damage", "ice_range", "ice_slow", "array_damage", "array_range", "thunder_bounce"];
      }
      return [];
    }

    rollOptions() {
      const source = [...this.pool];
      const picks = [];
      const makeOption = (base, forcedRarity) => {
        let rarityKey = forcedRarity || (base.fixed ? "rare" : pickRarity());
        if (!forcedRarity && !base.fixed && (this.game.metaBonuses.rareChanceBonus || 0) > 0 && Math.random() < this.game.metaBonuses.rareChanceBonus) {
          rarityKey = rarityKey === "common" ? "rare" : "epic";
        }
        const rarity = RARITY[rarityKey];
        const value = base.fixed
          ? base.value
          : base.discrete
            ? Math.max(1, Math.round(base.value * rarity.mult))
            : base.value * rarity.mult;
        const locked = base.skill ? !this.game.skills[base.skill].enabled : false;
        const theme = base.skill ? this.game.getSkillTheme(base.skill) : null;
        return {
          ...base,
          rarityKey,
          rarity,
          value,
          locked,
          title: typeof base.title === "function" ? base.title(theme) : base.title,
          desc: base.statText(value, locked, theme),
        };
      };

      while (picks.length < 3 && source.length) {
        const index = Math.floor(Math.random() * source.length);
        const base = source.splice(index, 1)[0];
        picks.push(makeOption(base));
      }

      const guaranteedIds = this.getGuaranteedOptionIds();
      if (guaranteedIds.length && !picks.some((option) => guaranteedIds.includes(option.id))) {
        const guaranteedBase = this.pool.find((item) => (
          guaranteedIds.includes(item.id) &&
          !picks.some((option) => option.id === item.id)
        ));
        if (guaranteedBase) picks[0] = makeOption(guaranteedBase, "rare");
      }
      return picks;
    }

    getUpgradeType(option) {
      if (option.skill === "fire" || option.skill === "ice" || option.skill === "thunder") return "符箓";
      if (option.skill === "array") return "法阵";
      if (option.skill === "sword") return "灵宝";
      if (option.id.includes("wall")) return "护山";
      return "功法";
    }

    getUpgradeIcon(option) {
      if (option.skill) return this.game.getSkillTheme(option.skill).icon || SKILL_ICONS[option.skill] || "术";
      if (option.id.includes("wall")) return SKILL_ICONS.wall;
      if (option.id.includes("crit")) return SKILL_ICONS.crit;
      return SKILL_ICONS.global;
    }

    show() {
      const options = this.rollOptions();
      const wrap = this.game.dom.upgradeOptions;
      wrap.innerHTML = "";
      for (const option of options) {
        const button = document.createElement("button");
        button.type = "button";
        button.className = `upgrade-card ${option.rarity.className}`;
        if (option.skill) {
          const theme = this.game.getSkillTheme(option.skill);
          button.style.setProperty("--skill-color", theme.color || "#fff1bd");
          button.style.setProperty("--skill-accent", theme.accent || "#9fd9cf");
        }
        button.innerHTML = `
          <span class="upgrade-icon">${this.getUpgradeIcon(option)}</span>
          <div class="upgrade-content">
            <div class="card-head">
              <strong>${option.title}</strong>
              <span class="card-badges">
                <span class="upgrade-type">${this.getUpgradeType(option)}</span>
                <span class="rarity">${option.rarity.label}</span>
              </span>
            </div>
            <p>${option.desc}</p>
            <span class="choose-label">参悟</span>
          </div>
        `;
        button.addEventListener("click", () => this.choose(option), { once: true });
        wrap.appendChild(button);
      }
      this.game.dom.upgradeOverlay.classList.remove("hidden");
    }

    choose(option) {
      const wasEnabled = option.skill ? this.game.skills[option.skill].enabled : false;
      option.apply(this.game, option.value);
      if (option.skill && wasEnabled) this.game.skills[option.skill].level += 1;
      this.game.dom.upgradeOverlay.classList.add("hidden");
      this.game.audio.play("upgrade");
      this.game.vibrate(25);
      this.game.finishLevelUp();
    }
  }

  class Game {
    constructor() {
      this.canvas = document.getElementById("gameCanvas");
      this.ctx = this.canvas.getContext("2d");
      this.dom = {
        levelText: document.getElementById("levelText"),
        heroHudLabel: document.getElementById("heroHudLabel"),
        expText: document.getElementById("expText"),
        timeText: document.getElementById("timeText"),
        stageText: document.getElementById("stageText"),
        speedBtn: document.getElementById("speedBtn"),
        wallHpText: document.getElementById("wallHpText"),
        killText: document.getElementById("killText"),
        skillStrip: document.getElementById("skillStrip"),
        homeOverlay: document.getElementById("homeOverlay"),
        cultivationOverlay: document.getElementById("cultivationOverlay"),
        runeOverlay: document.getElementById("runeOverlay"),
        codexOverlay: document.getElementById("codexOverlay"),
        achievementOverlay: document.getElementById("achievementOverlay"),
        companionOverlay: document.getElementById("companionOverlay"),
        saveInfoOverlay: document.getElementById("saveInfoOverlay"),
        upgradeOverlay: document.getElementById("upgradeOverlay"),
        upgradeOptions: document.getElementById("upgradeOptions"),
        gameOverOverlay: document.getElementById("gameOverOverlay"),
        resultEyebrow: document.getElementById("resultEyebrow"),
        resultTitle: document.getElementById("resultTitle"),
        resultTrialName: document.getElementById("resultTrialName"),
        resultTime: document.getElementById("resultTime"),
        resultKills: document.getElementById("resultKills"),
        resultLevel: document.getElementById("resultLevel"),
        resultClear: document.getElementById("resultClear"),
        resultCoins: document.getElementById("resultCoins"),
        resultTotalCoins: document.getElementById("resultTotalCoins"),
        resultShards: document.getElementById("resultShards"),
        resultHeroExp: document.getElementById("resultHeroExp"),
        resultUnlockNotice: document.getElementById("resultUnlockNotice"),
        homeCoins: document.getElementById("homeCoins"),
        selectedTrialText: document.getElementById("selectedTrialText"),
        levelList: document.getElementById("levelList"),
        heroList: document.getElementById("heroList"),
        runeSummary: document.getElementById("runeSummary"),
        runeList: document.getElementById("runeList"),
        codexList: document.getElementById("codexList"),
        achievementList: document.getElementById("achievementList"),
        companionList: document.getElementById("companionList"),
        cultivationCoins: document.getElementById("cultivationCoins"),
        gemList: document.getElementById("gemList"),
        talentList: document.getElementById("talentList"),
        bestKills: document.getElementById("bestKills"),
        bestTime: document.getElementById("bestTime"),
        bestLevel: document.getElementById("bestLevel"),
        clearCount: document.getElementById("clearCount"),
        totalRuns: document.getElementById("totalRuns"),
        startBtn: document.getElementById("startBtn"),
        heroBtn: document.getElementById("heroBtn"),
        companionBtn: document.getElementById("companionBtn"),
        cultivationBtn: document.getElementById("cultivationBtn"),
        runeBtn: document.getElementById("runeBtn"),
        codexBtn: document.getElementById("codexBtn"),
        achievementBtn: document.getElementById("achievementBtn"),
        soundToggleBtn: document.getElementById("soundToggleBtn"),
        saveInfoBtn: document.getElementById("saveInfoBtn"),
        saveInfoGrid: document.getElementById("saveInfoGrid"),
        uploadCloudSaveBtn: document.getElementById("uploadCloudSaveBtn"),
        loadCloudSaveBtn: document.getElementById("loadCloudSaveBtn"),
        cloudSaveCodeInput: document.getElementById("cloudSaveCodeInput"),
        cloudSaveResult: document.getElementById("cloudSaveResult"),
        copyCloudCodeBtn: document.getElementById("copyCloudCodeBtn"),
        closeSaveInfoBtn: document.getElementById("closeSaveInfoBtn"),
        backHomeBtn: document.getElementById("backHomeBtn"),
        closeRuneBtn: document.getElementById("closeRuneBtn"),
        closeCodexBtn: document.getElementById("closeCodexBtn"),
        closeAchievementBtn: document.getElementById("closeAchievementBtn"),
        skipCompanionBtn: document.getElementById("skipCompanionBtn"),
        resetSaveBtn: document.getElementById("resetSaveBtn"),
        pauseBtn: document.getElementById("pauseBtn"),
        restartBtn: document.getElementById("restartBtn"),
        againBtn: document.getElementById("againBtn"),
        replayLevelBtn: document.getElementById("replayLevelBtn"),
        resultHomeBtn: document.getElementById("resultHomeBtn"),
        toast: document.getElementById("toast"),
      };

      this.width = 360;
      this.height = 560;
      this.wallHeight = 62;
      this.wallY = this.height - this.wallHeight;
      this.uiSafeTop = UI_SAFE_TOP;
      this.uiSafeBottom = UI_SAFE_BOTTOM;
      this.battleTop = UI_SAFE_TOP + BATTLE_TOP_GAP;
      this.battleBottom = this.wallY - 6;
      this.state = "home";
      this.lastFrame = 0;
      this.toastTimer = 0;
      this.saveManager = new SaveManager();
      this.audio = new AudioManager(this.saveManager);
      this.upgrades = new UpgradeSystem(this);
      this.auraParticles = [];
      this.screenShake = 0;
      this.shakeTime = 0;
      this.flashAlpha = 0;
      this.redFlashAlpha = 0;
      this.wallHitFlash = 0;
      this.lastVibrate = 0;
      this.timeScale = this.saveManager.data.settings.timeScale === 2 ? 2 : 1;
      this.monsterGalleryMode = new URLSearchParams(window.location.search).get("monsterGallery") === "1";
      this.selectedLevelId = getSavedSelectedLevelId(this.saveManager.data);
      this.currentLevelConfig = getLevelById(this.selectedLevelId);

      this.bindEvents();
      this.reset();
      this.resize();
      this.renderTimeScale();
      this.renderHome();
      this.renderCultivation();
      this.renderRunes();
      this.renderCodex();
      this.renderAchievements();
      if (this.monsterGalleryMode) this.openCodex();
      requestAnimationFrame((time) => this.loop(time));
    }

    bindEvents() {
      window.addEventListener("resize", () => this.resize());
      this.dom.startBtn.addEventListener("click", () => this.start());
      this.dom.againBtn.addEventListener("click", () => this.handleResultPrimaryAction());
      this.dom.replayLevelBtn.addEventListener("click", () => this.replayResultLevel());
      this.dom.restartBtn.addEventListener("click", () => this.start());
      this.dom.pauseBtn.addEventListener("click", () => this.togglePause());
      this.dom.speedBtn.addEventListener("click", () => this.toggleTimeScale());
      this.dom.heroBtn?.addEventListener("click", () => {
        this.dom.heroList?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
      this.dom.companionBtn?.addEventListener("click", () => this.openCompanions());
      this.dom.cultivationBtn.addEventListener("click", () => this.openCultivation());
      this.dom.runeBtn.addEventListener("click", () => this.openRunes());
      this.dom.codexBtn.addEventListener("click", () => this.openCodex());
      this.dom.achievementBtn.addEventListener("click", () => this.openAchievements());
      this.dom.soundToggleBtn.addEventListener("click", () => this.toggleSound());
      this.dom.saveInfoBtn.addEventListener("click", () => this.showSaveInfo());
      this.dom.closeSaveInfoBtn.addEventListener("click", () => this.closeSaveInfo());
      this.dom.uploadCloudSaveBtn.addEventListener("click", () => this.handleUploadCloudSave());
      this.dom.loadCloudSaveBtn.addEventListener("click", () => this.handleLoadCloudSave());
      this.dom.copyCloudCodeBtn.addEventListener("click", () => this.copyCloudCode());
      this.dom.cloudSaveCodeInput.addEventListener("input", () => {
        this.dom.cloudSaveCodeInput.value = normalizeSaveCode(this.dom.cloudSaveCodeInput.value);
      });
      this.dom.backHomeBtn.addEventListener("click", () => this.showHome());
      this.dom.closeRuneBtn.addEventListener("click", () => this.showHome());
      this.dom.closeCodexBtn.addEventListener("click", () => this.showHome());
      this.dom.closeAchievementBtn.addEventListener("click", () => this.showHome());
      this.dom.skipCompanionBtn.addEventListener("click", () => this.closeCompanionInvite());
      this.dom.resultHomeBtn.addEventListener("click", () => this.showHome());
      this.dom.resetSaveBtn.addEventListener("click", () => this.resetSave());
      document.addEventListener("click", (event) => {
        if (event.target.closest("button")) {
          this.audio.init();
          this.audio.play("click");
        }
      });
    }

    createSkills() {
      const meta = this.metaBonuses;
      return {
        sword: new Skill("sword", {
          enabled: true,
          level: 1,
          baseDamage: 22,
          damageMult: meta.swordDamageMultiplier,
          baseCooldown: 0.65,
          cooldownMult: 1,
          count: 1,
          pierce: 0,
          baseSpeed: 624,
          speedMult: 1,
        }),
        fire: new Skill("fire", {
          enabled: false,
          level: 0,
          baseDamage: 26,
          damageMult: meta.spellDamageMultiplier || 1,
          baseCooldown: 2.2,
          cooldownMult: 1,
          baseRange: 58,
          rangeMult: meta.fireRangeMultiplier,
          baseSpeed: 340,
          burn: false,
        }),
        ice: new Skill("ice", {
          enabled: false,
          level: 0,
          baseDamage: 18,
          damageMult: meta.controlDamageMultiplier || 1,
          baseCooldown: 2.7,
          cooldownMult: 1,
          baseRange: 52,
          rangeMult: 1,
          slowPower: Math.min(0.82, 0.32 + meta.iceSlowBonus + (meta.controlPowerBonus || 0)),
          slowDuration: 2.5,
          baseSpeed: 330,
        }),
        thunder: new Skill("thunder", {
          enabled: false,
          level: 0,
          baseDamage: 38,
          damageMult: meta.thunderDamageMultiplier,
          baseCooldown: 3.4,
          cooldownMult: 1,
          bounces: 0,
          stun: false,
        }),
        array: new Skill("array", {
          enabled: false,
          level: 0,
          baseDamage: 18,
          damageMult: meta.swordArrayDamageMultiplier,
          baseCooldown: 5.2,
          cooldownMult: 1,
          baseRange: 76,
          rangeMult: 1,
          duration: 3 * (meta.formationDurationMultiplier || 1),
        }),
      };
    }

    reset() {
      const levelConfig = this.currentLevelConfig || getLevelById(this.selectedLevelId);
      this.currentLevelConfig = levelConfig;
      this.metaBonuses = this.saveManager.getMetaBonuses();
      this.heroId = this.saveManager.data.selectedHero || "wukong";
      this.heroDef = HERO_DEFS[this.heroId] || HERO_DEFS.wukong;
      this.companionIds = [...(this.saveManager.data.companions.invited || [])].map(normalizeHeroId).filter((id) => HERO_IDS.includes(id));
      this.companionTimers = Object.fromEntries(this.companionIds.map((id) => [id, rand(1.2, 3.2)]));
      this.heroShadowTimer = 4.5;
      this.heroRegenTimer = 1;
      this.companionBuffUntil = 0;
      this.elapsed = 0;
      this.level = 1;
      this.exp = levelConfig.startExp + this.metaBonuses.startExp;
      this.expToNext = levelConfig.baseExpNeed;
      this.maxWallHp = Math.round((levelConfig.wallHp + this.metaBonuses.maxHpBonus) * (this.metaBonuses.maxHpMultiplier || 1));
      this.wallHp = this.maxWallHp;
      this.kills = 0;
      this.difficultyTier = 0;
      this.spawnTimer = 0.8;
      this.enemyHpMultiplier = 1;
      this.enemySpeedMultiplier = 1;
      this.enemyDamageMultiplier = levelConfig.enemyDamageMultiplier || 1;
      this.currentSpawnInterval = 0;
      this.stageIndex = -1;
      this.lastDebugSecond = -10;
      this.emergencyHealUsed = false;
      this.bossSpawned = false;
      this.bossDefeated = false;
      this.bossEnemy = null;
      this.runtimeCooldownPenalty = 1;
      this.runtimeExpPenalty = 1;
      this.speedAuraEnemies = [];
      this.seenEnemyTypes = new Set();
      this.screenShake = 0;
      this.shakeTime = 0;
      this.flashAlpha = 0;
      this.redFlashAlpha = 0;
      this.wallHitFlash = 0;
      this.globalDamageMult = this.metaBonuses.damageMultiplier;
      this.globalCooldownMult = this.metaBonuses.cooldownMultiplier;
      this.critChance = this.metaBonuses.critChance;
      this.critDamage = this.metaBonuses.critDamageMultiplier;
      this.expMultiplier = this.metaBonuses.expMultiplier;
      this.iceVulnerabilityBonus = 0;
      this.enemies = [];
      this.projectiles = [];
      this.particles = [];
      this.floatingTexts = [];
      this.areaEffects = [];
      this.lightningEffects = [];
      this.skills = this.createSkills();
      for (const id of this.heroDef.initialSkills || []) {
        if (this.skills[id]) {
          this.skills[id].enabled = true;
          this.skills[id].level = Math.max(1, this.skills[id].level || 0);
        }
      }
      this.skills.sword.pierce += this.metaBonuses.swordPierceBonus || 0;
      this.skills.thunder.bounces += this.metaBonuses.thunderBounceBonus || 0;
      this.leveling = false;
      const firstPhase = (levelConfig.phases || levelConfig.stages || [])[0];
      if (this.dom.stageText) this.dom.stageText.textContent = firstPhase?.text || firstPhase?.name || levelConfig.name;
      this.renderSkillStrip();
      this.updateUI();
    }

    start() {
      if (!this.saveManager.data.selectedHero) {
        this.showToast("请先选择取经主角");
        this.renderHeroList();
        return;
      }
      const levelState = this.saveManager.data.levels[this.selectedLevelId];
      if (!levelState?.unlocked) {
        this.showToast("请先通关上一关");
        return;
      }
      this.currentLevelConfig = getLevelById(this.selectedLevelId);
      this.saveManager.data.selectedLevelId = this.selectedLevelId;
      this.saveManager.save();
      this.reset();
      this.state = "playing";
      this.dom.homeOverlay.classList.add("hidden");
      this.dom.cultivationOverlay.classList.add("hidden");
      this.dom.runeOverlay.classList.add("hidden");
      this.dom.codexOverlay.classList.add("hidden");
      this.dom.achievementOverlay.classList.add("hidden");
      this.dom.companionOverlay.classList.add("hidden");
      this.dom.saveInfoOverlay.classList.add("hidden");
      this.dom.gameOverOverlay.classList.add("hidden");
      this.dom.upgradeOverlay.classList.add("hidden");
      this.dom.pauseBtn.textContent = "调息";
      this.dom.pauseBtn.disabled = false;
      this.renderTimeScale();
      this.lastFrame = performance.now();
      this.updateStagePrompt(true);
      if (this.exp >= this.expToNext) this.beginLevelUp();
    }

    startLevel(levelId) {
      const level = getLevelById(levelId);
      this.selectedLevelId = level.id;
      this.currentLevelConfig = level;
      this.saveManager.data.selectedLevelId = level.id;
      this.saveManager.save();
      this.start();
    }

    handleResultPrimaryAction() {
      const result = this.lastResult;
      if (!result) {
        this.start();
        return;
      }
      if (result.pendingCompanionInvite) {
        this.showCompanionInvite();
        return;
      }
      if (!result.victory) {
        this.startLevel(result.levelId);
        return;
      }
      if (result.isFinalLevel || !result.nextLevelId) {
        this.showHome();
        return;
      }
      if (this.saveManager.data.levels[result.nextLevelId]) {
        this.saveManager.data.levels[result.nextLevelId].unlocked = true;
        this.saveManager.save();
      }
      this.startLevel(result.nextLevelId);
    }

    replayResultLevel() {
      const levelId = this.lastResult?.levelId || this.currentLevelConfig.id;
      this.startLevel(levelId);
    }

    showHome() {
      this.state = "home";
      this.selectedLevelId = getHighestUnlockedLevelId(this.saveManager.data);
      this.currentLevelConfig = getLevelById(this.selectedLevelId);
      this.saveManager.data.selectedLevelId = this.selectedLevelId;
      this.saveManager.save();
      this.dom.homeOverlay.classList.remove("hidden");
      this.dom.cultivationOverlay.classList.add("hidden");
      this.dom.runeOverlay.classList.add("hidden");
      this.dom.codexOverlay.classList.add("hidden");
      this.dom.achievementOverlay.classList.add("hidden");
      this.dom.companionOverlay.classList.add("hidden");
      this.dom.saveInfoOverlay.classList.add("hidden");
      this.dom.gameOverOverlay.classList.add("hidden");
      this.dom.upgradeOverlay.classList.add("hidden");
      this.dom.pauseBtn.disabled = false;
      this.dom.pauseBtn.textContent = "调息";
      this.renderTimeScale();
      this.renderHome();
    }

    openCultivation() {
      this.state = "cultivation";
      this.dom.homeOverlay.classList.add("hidden");
      this.dom.cultivationOverlay.classList.remove("hidden");
      this.dom.runeOverlay.classList.add("hidden");
      this.dom.codexOverlay.classList.add("hidden");
      this.dom.achievementOverlay.classList.add("hidden");
      this.renderCultivation();
    }

    openRunes() {
      this.state = "runes";
      this.dom.homeOverlay.classList.add("hidden");
      this.dom.runeOverlay.classList.remove("hidden");
      this.renderRunes();
    }

    openCodex() {
      this.state = "codex";
      this.dom.homeOverlay.classList.add("hidden");
      this.dom.codexOverlay.classList.remove("hidden");
      this.renderCodex();
    }

    openAchievements() {
      this.state = "achievements";
      this.dom.homeOverlay.classList.add("hidden");
      this.dom.achievementOverlay.classList.remove("hidden");
      this.renderAchievements();
    }

    toggleSound() {
      const enabled = this.audio.toggle();
      this.renderSoundToggle();
      this.showToast(enabled ? "音效已开启" : "音效已关闭");
    }

    toggleTimeScale() {
      this.timeScale = this.timeScale === 1 ? 2 : 1;
      writeTimeScaleSetting(this.timeScale);
      this.saveManager.data.settings.timeScale = this.timeScale;
      this.saveManager.save();
      this.renderTimeScale();
      this.showToast(this.timeScale === 2 ? "战斗速度 x2" : "战斗速度 x1");
    }

    renderTimeScale() {
      if (!this.dom.speedBtn) return;
      this.dom.speedBtn.textContent = this.timeScale === 2 ? "速 x2" : "速 x1";
      this.dom.speedBtn.classList.toggle("active", this.timeScale === 2);
      this.dom.speedBtn.setAttribute("aria-pressed", this.timeScale === 2 ? "true" : "false");
    }

    showSaveInfo() {
      this.renderSaveInfo();
      this.setCloudResult("");
      this.lastCloudCode = "";
      this.dom.copyCloudCodeBtn.classList.add("hidden");
      this.dom.saveInfoOverlay.classList.remove("hidden");
    }

    closeSaveInfo() {
      this.dom.saveInfoOverlay.classList.add("hidden");
    }

    renderSaveInfo() {
      const save = this.saveManager.data;
      const highestCleared = save.records.highestClearedLevel || 0;
      const highestUnlocked = Math.min(40, highestCleared + 1);
      const totalTrainingLevel = Object.values(save.journeyTraining || {}).reduce((sum, value) => sum + (Number(value) || 0), 0);
      const items = [
        ["存档版本", SAVE_VERSION],
        ["localStorage", isLocalStorageAvailable() ? "可用" : "不可用"],
        ["灵石", save.coins || 0],
        ["仙玉", save.jade || 0],
        ["最高通关", `第 ${highestCleared} 关`],
        ["最高解锁", `第 ${highestUnlocked} 关`],
        ["当前选择", `第 ${getLevelById(this.selectedLevelId).order} 关`],
        ["当前角色", HERO_DEFS[save.selectedHero]?.name || "孙悟空"],
        ["助战伙伴", (save.companions.invited || []).map((id) => COMPANION_DEFS[id]?.name).filter(Boolean).join("、") || "暂无"],
        ["已装备符文", `${(save.runes.equipped || []).length}/3`],
        ["妖怪图鉴", `${Object.keys(save.bestiary.seen || {}).length} 种`],
        ["修行总等级", totalTrainingLevel],
        ["礼包码记录", `${(save.redeemedCodes || []).length} 个`],
        ["每日奖励", save.lastDailyRewardDate || "未领取"],
        ["速度设置", `${this.timeScale}x`],
        ["模拟充值", save.totalRechargeTest || 0],
      ];
      this.dom.saveInfoGrid.innerHTML = items
        .map(([label, value]) => `<div><span>${label}</span><strong>${value}</strong></div>`)
        .join("");
    }

    setCloudResult(message, code = "") {
      if (!message) {
        this.dom.cloudSaveResult.textContent = "";
        this.dom.cloudSaveResult.classList.add("hidden");
        return;
      }
      this.dom.cloudSaveResult.innerHTML = code
        ? `${message}<strong>${code}</strong>换手机或清缓存后，可用该存档码恢复进度。`
        : message;
      this.dom.cloudSaveResult.classList.remove("hidden");
    }

    async handleUploadCloudSave() {
      this.dom.uploadCloudSaveBtn.disabled = true;
      this.setCloudResult("正在上传云存档...");
      try {
        const result = await uploadCloudSave(collectSaveData(this.saveManager.data));
        this.lastCloudCode = result.code;
        this.dom.cloudSaveCodeInput.value = result.code;
        this.dom.copyCloudCodeBtn.classList.remove("hidden");
        this.setCloudResult("云存档已上传\n请保存你的存档码：", result.code);
      } catch (err) {
        this.setCloudResult(err.message || "云存档上传失败");
      } finally {
        this.dom.uploadCloudSaveBtn.disabled = false;
      }
    }

    async handleLoadCloudSave() {
      const code = normalizeSaveCode(this.dom.cloudSaveCodeInput.value);
      this.dom.cloudSaveCodeInput.value = code;
      this.dom.loadCloudSaveBtn.disabled = true;
      this.setCloudResult("正在读取云存档...");
      try {
        const result = await loadCloudSaveByCode(code);
        const ok = window.confirm("读取云存档会覆盖当前本地存档，请确认已经备份当前进度。\n\n确认覆盖？");
        if (!ok) {
          this.setCloudResult("已取消读取云存档。");
          return;
        }
        this.saveManager.data = applySaveData(result.saveData);
        this.timeScale = this.saveManager.data.settings.timeScale === 2 ? 2 : 1;
        this.selectedLevelId = getSavedSelectedLevelId(this.saveManager.data);
        this.currentLevelConfig = getLevelById(this.selectedLevelId);
        this.reset();
        this.renderTimeScale();
        this.renderHome();
        this.renderCultivation();
        this.renderRunes();
        this.renderCodex();
        this.renderAchievements();
        this.renderSaveInfo();
        this.setCloudResult(`云存档读取成功：${result.code}`);
        this.showToast("云存档读取成功");
      } catch (err) {
        this.setCloudResult(err.message || "云存档读取失败");
      } finally {
        this.dom.loadCloudSaveBtn.disabled = false;
      }
    }

    async copyCloudCode() {
      const code = this.lastCloudCode || normalizeSaveCode(this.dom.cloudSaveCodeInput.value);
      if (!code) return;
      try {
        await navigator.clipboard.writeText(code);
        this.showToast("存档码已复制");
      } catch (_err) {
        this.setCloudResult(`请手动复制存档码：`, code);
      }
    }

    resetSave() {
      const ok = window.confirm("确定要重置存档吗？灵石、宝石、功法和历史战绩都会清空。");
      if (!ok) return;
      this.saveManager.reset();
      this.selectedLevelId = getHighestUnlockedLevelId(this.saveManager.data);
      this.currentLevelConfig = getLevelById(this.selectedLevelId);
      this.timeScale = this.saveManager.data.settings.timeScale === 2 ? 2 : 1;
      this.reset();
      this.renderHome();
      this.renderCultivation();
      this.renderRunes();
      this.renderCodex();
      this.renderAchievements();
      this.renderTimeScale();
      this.showToast("存档已重置");
    }

    togglePause() {
      if (this.state === "playing") {
        this.state = "paused";
        this.dom.pauseBtn.textContent = "继续守卫";
      } else if (this.state === "paused") {
        this.state = "playing";
        this.dom.pauseBtn.textContent = "调息";
        this.lastFrame = performance.now();
      }
    }

    resize() {
      const rect = this.canvas.parentElement.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
      this.width = Math.max(280, rect.width || 360);
      this.height = Math.max(260, rect.height || 520);
      this.uiSafeTop = clamp(this.height * 0.08, 32, UI_SAFE_TOP);
      this.uiSafeBottom = clamp(this.height * 0.13, 70, UI_SAFE_BOTTOM);
      this.battleTop = this.uiSafeTop + BATTLE_TOP_GAP;
      this.wallHeight = clamp(this.height * 0.12, 52, 76);
      const maxWallY = this.height - this.wallHeight;
      const minWallY = Math.min(maxWallY, this.battleTop + 120);
      this.wallY = clamp(this.height - this.uiSafeBottom + 14, minWallY, maxWallY);
      this.wallHeight = this.height - this.wallY;
      this.battleBottom = this.wallY - 8;
      this.canvas.width = Math.floor(this.width * dpr);
      this.canvas.height = Math.floor(this.height * dpr);
      this.canvas.style.width = `${this.width}px`;
      this.canvas.style.height = `${this.height}px`;
      this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!this.auraParticles.length) this.initAuraParticles();
    }

    loop(time) {
      const rawDt = Math.min((time - this.lastFrame) / 1000 || 0, 0.033);
      const dt = rawDt * this.timeScale;
      this.lastFrame = time;
      if (this.state === "playing") this.update(dt);
      this.draw();
      requestAnimationFrame((next) => this.loop(next));
    }

    update(dt) {
      this.elapsed += dt;
      this.difficultyTier = Math.floor(this.elapsed / 20);
      this.enemyHpMultiplier = this.getEnemyHpMultiplier();
      this.enemySpeedMultiplier = this.getEnemySpeedMultiplier();
      this.enemyDamageMultiplier = this.currentLevelConfig.enemyDamageMultiplier || 1;
      this.updateStagePrompt(false);
      this.debugBalanceLog();
      this.updateAuraParticles(dt);
      this.updateFeedback(dt);
      this.updateBossSpawn();
      this.updateRuntimeAuras();
      if (this.elapsed >= this.currentLevelConfig.duration) {
        if (this.currentLevelConfig.order === 40 && this.currentLevelConfig.boss && !this.bossDefeated) {
          this.endGame(false);
          return;
        }
        this.endGame(true);
        return;
      }

      this.updateSpawns(dt);
      for (const skill of Object.values(this.skills)) skill.update(dt, this);
      this.updateHeroAndCompanions(dt);
      for (const area of this.areaEffects) area.update(dt, this);
      for (const enemy of this.enemies) enemy.update(dt, this);
      for (const projectile of this.projectiles) projectile.update(dt, this);
      for (const particle of this.particles) particle.update(dt, this);
      for (const text of this.floatingTexts) text.update(dt, this);
      for (const bolt of this.lightningEffects) {
        bolt.life -= dt;
        bolt.age += dt;
      }

      this.cleanup();
      if (this.wallHp <= 0) this.endGame(false);
      this.updateUI();
    }

    cleanup() {
      const particleCap = this.timeScale === 2 ? 200 : MAX_PARTICLES;
      this.enemies = this.enemies.filter((item) => !item.dead);
      this.projectiles = this.projectiles.filter((item) => item.active);
      this.areaEffects = this.areaEffects.filter((item) => item.active);
      this.particles = this.particles.filter((item) => item.active).slice(-particleCap);
      this.floatingTexts = this.floatingTexts.filter((item) => item.active).slice(-60);
      this.lightningEffects = this.lightningEffects.filter((item) => item.life > 0).slice(-18);
    }

    getProgressRate() {
      return clamp(this.elapsed / this.currentLevelConfig.duration, 0, 1);
    }

    getEnemyHpMultiplier() {
      const levelConfig = this.currentLevelConfig;
      const growth = 1 + ((levelConfig.enemyHpMaxMultiplier || 1.6) - 1) * this.getProgressRate();
      return (levelConfig.enemyHpMultiplier || 1) * growth;
    }

    getEnemySpeedMultiplier() {
      const levelConfig = this.currentLevelConfig;
      const growth = 1 + ((levelConfig.enemySpeedMaxMultiplier || 1.3) - 1) * this.getProgressRate();
      return (levelConfig.enemySpeedMultiplier || 1) * growth;
    }

    getSpawnProfile() {
      const profiles = this.currentLevelConfig.spawnProfiles;
      return profiles.find((profile) => (
        this.elapsed >= profile.start && this.elapsed < profile.end
      )) || profiles[profiles.length - 1];
    }

    isEnemyTargetable(enemy) {
      return !!enemy
        && !enemy.dead
        && enemy.targetable === true
        && enemy.y >= this.battleTop + enemy.radius
        && enemy.y <= this.battleBottom + enemy.radius;
    }

    hasTargetableEnemy() {
      return this.enemies.some((enemy) => this.isEnemyTargetable(enemy));
    }

    updateStagePrompt(force) {
      const stages = this.currentLevelConfig.phases || this.currentLevelConfig.stages || [];
      let nextIndex = this.stageIndex;
      for (let i = 0; i < stages.length; i += 1) {
        if (this.elapsed >= stages[i].time) nextIndex = i;
      }
      if (!force && nextIndex === this.stageIndex) return;
      this.stageIndex = nextIndex;
      const stage = stages[this.stageIndex] || stages[0];
      const text = stage?.text || stage?.name || this.currentLevelConfig.name;
      if (this.dom.stageText) this.dom.stageText.textContent = text;
      this.showToast(text);
      this.audio.play("stage");
      this.floatingTexts.push(new FloatingText(text, this.width / 2, this.battleTop + 34, "#fff1bd", { size: 22, life: 1.2, kind: "crit" }));
    }

    debugBalanceLog() {
      if (!DEBUG_BALANCE) return;
      const bucket = Math.floor(this.elapsed / 10) * 10;
      if (bucket <= this.lastDebugSecond) return;
      this.lastDebugSecond = bucket;
      console.log("[balance]", {
        time: Math.floor(this.elapsed),
        level: this.level,
        exp: Math.floor(this.exp),
        enemies: this.enemies.length,
        kills: this.kills,
        wallHp: Math.ceil(this.wallHp),
        spawnInterval: Number(this.currentSpawnInterval.toFixed(2)),
        hpMultiplier: Number(this.enemyHpMultiplier.toFixed(2)),
        speedMultiplier: Number(this.enemySpeedMultiplier.toFixed(2)),
      });
    }

    initAuraParticles() {
      this.auraParticles = [];
      for (let i = 0; i < MAX_AURA_PARTICLES; i += 1) {
        this.auraParticles.push(this.createAuraParticle(true));
      }
    }

    createAuraParticle(randomY = false) {
      return {
        x: rand(0, this.width),
        y: randomY ? rand(0, this.wallY) : this.wallY + rand(0, 40),
        vx: rand(-5, 5),
        vy: rand(-13, -4),
        size: rand(0.7, 2.2),
        alpha: rand(0.16, 0.58),
        phase: rand(0, Math.PI * 2),
      };
    }

    updateAuraParticles(dt) {
      for (const mote of this.auraParticles) {
        mote.phase += dt * 1.4;
        mote.x += (mote.vx + Math.sin(mote.phase) * 4) * dt;
        mote.y += mote.vy * dt;
        if (mote.y < -10 || mote.x < -20 || mote.x > this.width + 20) {
          Object.assign(mote, this.createAuraParticle(false));
        }
      }
    }

    updateFeedback(dt) {
      this.shakeTime = Math.max(0, this.shakeTime - dt);
      if (this.shakeTime <= 0) this.screenShake = 0;
      this.flashAlpha = Math.max(0, this.flashAlpha - dt * 3.2);
      this.redFlashAlpha = Math.max(0, this.redFlashAlpha - dt * 4.2);
      this.wallHitFlash = Math.max(0, this.wallHitFlash - dt * 5);
    }

    addShake(strength, duration) {
      this.screenShake = Math.max(this.screenShake, strength);
      this.shakeTime = Math.max(this.shakeTime, duration);
    }

    addFlash(alpha = 0.22) {
      this.flashAlpha = Math.max(this.flashAlpha, alpha);
    }

    vibrate(ms) {
      if (!navigator.vibrate) return;
      const now = performance.now();
      if (now - this.lastVibrate < 300) return;
      this.lastVibrate = now;
      try {
        navigator.vibrate(ms);
      } catch (_err) {
        // Vibration support varies by browser.
      }
    }

    updateSpawns(dt) {
      const maxEnemies = this.currentLevelConfig.maxEnemies;
      if (this.enemies.length >= maxEnemies) return;
      this.spawnTimer -= dt;
      if (this.spawnTimer > 0) return;

      const profile = this.getSpawnProfile();
      const interval = Math.max(0.28, rand(profile.intervalMin, profile.intervalMax) / (this.currentLevelConfig.spawnMultiplier || 1));
      this.currentSpawnInterval = interval;
      const batch = 1 + (Math.random() < profile.extraChance ? 1 : 0);
      const count = Math.min(batch, maxEnemies - this.enemies.length);
      for (let i = 0; i < count; i += 1) this.spawnEnemy();
      this.spawnTimer = interval;
    }

    spawnEnemy(typeOverride = null, options = {}) {
      const type = normalizeEnemyType(typeOverride || weightedPick(this.getSpawnProfile().weights)) || "foxDemon";
      const enemy = new Enemy(type, this, options);
      if (!enemy.isBoss && !enemy.elite && this.currentLevelConfig.eliteChance && Math.random() < this.currentLevelConfig.eliteChance) {
        this.makeElite(enemy);
      }
      this.enemies.push(enemy);
      this.saveManager.markEnemySeen(enemy.type);
      this.maybeAnnounceEnemy(enemy);
      return enemy;
    }

    makeElite(enemy) {
      enemy.elite = true;
      enemy.name = `精英${enemy.name}`;
      enemy.maxHp = Math.round(enemy.maxHp * 1.75);
      enemy.hp = enemy.maxHp;
      enemy.maxShield = Math.round(enemy.maxShield * 1.35);
      enemy.shield = enemy.maxShield;
      enemy.damage = Math.round(enemy.damage * 1.22);
      enemy.exp = Math.round(enemy.exp * 1.8);
      enemy.radius *= 1.08;
    }

    maybeAnnounceEnemy(enemy) {
      const config = enemy.config || ENEMY_TYPES[enemy.type];
      if (!config || this.seenEnemyTypes.has(enemy.type)) return;
      this.seenEnemyTypes.add(enemy.type);
      if (enemy.isBoss) return;
      if ((config.unlockLevel || 1) <= 10 && !enemy.isBoss) return;
      const text = enemy.isBoss
        ? `${enemy.name}来袭！`
        : `新的妖物：${config.name}出现！`;
      this.showToast(text);
      this.floatingTexts.push(new FloatingText(text, this.width / 2, 96, enemy.isBoss ? "#fff1bd" : "#d7fff5", { size: enemy.isBoss ? 24 : 17, life: 1.4, kind: enemy.isBoss ? "crit" : "normal" }));
      if (enemy.isBoss) this.audio.play("stage");
    }

    updateBossSpawn() {
      const boss = this.currentLevelConfig.boss;
      if (!boss || this.bossSpawned || this.elapsed < boss.time) return;
      this.bossSpawned = true;
      const bossType = normalizeEnemyType(boss.type) || "bossBlackWind";
      const bossRadius = ENEMY_TYPES[bossType]?.radius || 44;
      const enemy = this.spawnEnemy(bossType, {
        boss: true,
        x: this.width / 2,
        y: this.battleTop - bossRadius * 1.1,
      });
      this.bossEnemy = enemy;
      this.showToast(boss.appearText || `${enemy.name}来袭！`);
      this.floatingTexts.push(new FloatingText(boss.appearText || `${enemy.name}来袭！`, this.width / 2, 92, "#fff1bd", { size: 26, life: 1.6, kind: "crit" }));
      this.addShake(6, 0.18);
      this.addFlash(0.08);
    }

    updateRuntimeAuras() {
      const drainCount = this.enemies.filter((enemy) => this.isEnemyTargetable(enemy) && enemy.config?.drainAura).length;
      this.runtimeCooldownPenalty = 1 + Math.min(0.28, drainCount * 0.08);
      this.runtimeExpPenalty = Math.max(0.72, 1 - drainCount * 0.08);
      this.speedAuraEnemies = this.enemies.filter((enemy) => this.isEnemyTargetable(enemy) && enemy.config?.allySpeedAura);
    }

    getEnemyAuraSpeedBonus(enemy) {
      if (!this.speedAuraEnemies?.length || enemy.isBoss) return 1;
      let bonus = 0;
      for (const aura of this.speedAuraEnemies) {
        if (aura === enemy || aura.dead) continue;
        const radius = aura.config.auraRadius || 120;
        if (distSq(aura.x, aura.y, enemy.x, enemy.y) <= radius * radius) {
          bonus = Math.max(bonus, aura.config.allySpeedAura || 0);
        }
      }
      return 1 + bonus;
    }

    updateHeroAndCompanions(dt) {
      if (this.metaBonuses.regenPerSecond) {
        this.heroRegenTimer -= dt;
        if (this.heroRegenTimer <= 0) {
          this.heroRegenTimer += 1;
          this.wallHp = Math.min(this.maxWallHp, this.wallHp + this.metaBonuses.regenPerSecond);
        }
      }
      if (this.heroId === "wukong") {
        this.heroShadowTimer -= dt;
        if (this.heroShadowTimer <= 0) {
          this.heroShadowTimer += 7;
          this.castHeroShadow();
        }
      }
      for (const id of this.companionIds || []) {
        const companionId = normalizeHeroId(id);
        const def = COMPANION_DEFS[companionId];
        if (!def) continue;
        const level = this.getCompanionLevel(id);
        const cooldown = def.cooldown * Math.max(0.82, 1 - (level - 1) * 0.006);
        this.companionTimers[id] = (this.companionTimers[id] || cooldown) - dt;
        if (this.companionTimers[id] > 0) continue;
        this.companionTimers[id] += cooldown;
        this.castCompanionSkill(id);
      }
    }

    getCompanionLevel(id) {
      const heroId = normalizeHeroId(id);
      const progress = this.saveManager.data.companionProgress?.[heroId] || { level: 1 };
      return clamp(Math.floor(progress.level || 1), 1, 20);
    }

    castHeroShadow() {
      const target = this.findClosestToWall();
      if (!target) return;
      const damage = this.skills.sword.baseDamage * this.skills.sword.damageMult * 1.15 * (this.metaBonuses.shadowDamageMultiplier || 1);
      this.damageEnemy(target, damage, "sword", { x: target.x, y: target.y - 8 });
      this.spawnSlash(target.x, target.y, -Math.PI / 2);
      this.floatingTexts.push(new FloatingText("残影追击", target.x, target.y - 24, "#fff1bd", { size: 14, life: 0.8 }));
      for (let i = 0; i < 14; i += 1) {
        this.addParticle(target.x, target.y, i % 2 ? "#f5d78a" : "#ff6b57", rand(-120, 120), rand(-90, 40), rand(2, 4.5), rand(0.28, 0.55), "sword");
      }
    }

    castCompanionSkill(id) {
      id = normalizeHeroId(id);
      const def = COMPANION_DEFS[id];
      if (!def) return;
      const level = this.getCompanionLevel(id);
      const power = 1 + (level - 1) * 0.08;
      const target = this.findDenseTarget() || this.findClosestToWall();
      if (id !== "tangseng" && !target) return;
      this.floatingTexts.push(new FloatingText(def.skill, this.width / 2, this.battleTop + 56, def.color, { size: 18, life: 1, kind: "crit" }));
      if (id === "wukong") {
        const radius = 86 + Math.floor(level / 5) * 8;
        const damage = 34 * power;
        for (const enemy of this.enemies) {
          if (!this.isEnemyTargetable(enemy)) continue;
          if (distSq(target.x, target.y, enemy.x, enemy.y) <= (radius + enemy.radius) ** 2) {
            this.damageEnemy(enemy, damage, "sword", { x: enemy.x, y: enemy.y, silent: false });
          }
        }
        this.lightningEffects.push({ x1: target.x - 80, y1: target.y - 35, x2: target.x + 80, y2: target.y + 35, life: 0.2, age: 0, sword: true });
        this.addShake(2.5, 0.08);
      } else if (id === "tangseng") {
        const heal = Math.round(this.maxWallHp * (0.08 + level * 0.002) + 12 * power);
        this.wallHp = Math.min(this.maxWallHp, this.wallHp + heal);
        this.companionBuffUntil = Math.max(this.companionBuffUntil, this.elapsed + 5 + Math.floor(level / 8));
        this.floatingTexts.push(new FloatingText(`佛光 +${heal}`, this.width / 2, this.wallY - 72, "#fff1bd", { size: 16, life: 1 }));
        for (let i = 0; i < 24; i += 1) {
          const a = (Math.PI * 2 * i) / 24;
          this.addParticle(this.width / 2, this.wallY - 45, "#fff1bd", Math.cos(a) * rand(35, 90), Math.sin(a) * rand(35, 90), rand(2, 4), rand(0.35, 0.75), "heal");
        }
      } else if (id === "bajie") {
        const centerX = this.width / 2;
        const centerY = this.wallY - 72;
        const radius = 110 + Math.floor(level / 4) * 8;
        this.areaEffects.push(new AreaEffect({ kind: "quake", x: centerX, y: centerY, radius, duration: 0.45, damagePerSecond: 0, color: "rgba(217, 163, 93, 0.2)", tickSource: "array" }));
        for (const enemy of this.enemies) {
          if (!this.isEnemyTargetable(enemy)) continue;
          if (distSq(centerX, centerY, enemy.x, enemy.y) <= (radius + enemy.radius) ** 2) {
            enemy.y = Math.max(this.battleTop + enemy.radius, enemy.y - (24 + level * 0.8));
            this.damageEnemy(enemy, 32 * power, "array", { x: enemy.x, y: enemy.y });
          }
        }
        this.addShake(5, 0.12);
      } else if (id === "shaseng") {
        const radius = 92 + Math.floor(level / 4) * 7;
        const duration = 3 + Math.floor(level / 6) * 0.45;
        this.areaEffects.push(new AreaEffect({ kind: "sand", x: target.x, y: target.y, radius, duration, damagePerSecond: 12 * power, color: "rgba(127, 209, 216, 0.2)", tickSource: "ice" }));
        for (const enemy of this.enemies) {
          if (!this.isEnemyTargetable(enemy)) continue;
          if (distSq(target.x, target.y, enemy.x, enemy.y) <= (radius + enemy.radius) ** 2) {
            enemy.slowUntil = Math.max(enemy.slowUntil, this.elapsed + 2.5 + level * 0.04);
            enemy.slowFactor = Math.min(enemy.slowFactor, Math.max(0.38, 0.55 - level * 0.006));
          }
        }
      }
    }

    damageWall(amount, x, y) {
      const protectedAmount = this.elapsed < this.currentLevelConfig.newbieProtectionSeconds
        ? amount * 0.5
        : amount;
      let shieldReduction = 0;
      if ((this.metaBonuses.shieldChance || 0) > 0 && Math.random() < this.metaBonuses.shieldChance) {
        shieldReduction = 0.35 * (this.metaBonuses.shieldStrength || 1);
        this.floatingTexts.push(new FloatingText("佛光护盾", x, y - 20, "#fff1bd", { size: 14, life: 0.8 }));
        for (let i = 0; i < 10; i += 1) this.addParticle(x, y, "#fff1bd", rand(-70, 70), rand(-70, 10), rand(2, 4), rand(0.25, 0.55), "heal");
      }
      const finalAmount = Math.max(1, Math.ceil(protectedAmount * (1 - (this.metaBonuses.wallDamageReduction || 0)) * (1 - shieldReduction)));
      this.wallHp = Math.max(0, this.wallHp - finalAmount);
      this.wallHitFlash = 1;
      this.redFlashAlpha = Math.max(this.redFlashAlpha, 0.18);
      this.addShake(5, 0.16);
      this.vibrate(25);
      this.audio.play("wall");
      this.floatingTexts.push(new FloatingText(`-${finalAmount}`, x, y, "#ff7f6b", { size: 15 }));
      for (let i = 0; i < 8; i += 1) {
        this.addParticle(x, y, "#fff1bd", rand(-80, 80), rand(-80, -20), rand(2, 5), rand(0.35, 0.7), "hit");
      }
      if (this.metaBonuses.retaliationDamage > 0) {
        for (const enemy of this.enemies) {
          if (!this.isEnemyTargetable(enemy)) continue;
          if (distSq(x, y, enemy.x, enemy.y) <= 100 * 100) {
            this.damageEnemy(enemy, this.metaBonuses.retaliationDamage, "array", { silent: true });
          }
        }
      }
      if (
        !this.emergencyHealUsed &&
        this.wallHp <= this.maxWallHp * this.currentLevelConfig.emergencyHealThreshold
      ) {
        this.triggerEmergencyHeal();
      }
    }

    explodeEnemyNearWall(enemy) {
      if (!enemy || enemy.dead) return;
      enemy.dead = true;
      const radius = enemy.config.explodeRadius || 58;
      const amount = Math.max(1, Math.round(enemy.damage * (enemy.config.explodeDamageMult || 1.8)));
      this.damageWall(amount, enemy.x, this.wallY - 20);
      this.addShake(4, 0.12);
      this.audio.play("fire");
      this.floatingTexts.push(new FloatingText("妖火自爆", enemy.x, enemy.y - 10, "#fff1bd", { size: 14, life: 0.9 }));
      for (let i = 0; i < 22; i += 1) {
        const angle = (Math.PI * 2 * i) / 22;
        const speed = rand(45, 140);
        this.addParticle(enemy.x, enemy.y, i % 2 ? "#e9b85f" : "#ff6b57", Math.cos(angle) * speed, Math.sin(angle) * speed, rand(2, 5), rand(0.35, 0.75), "fire");
      }
      this.areaEffects.push(new AreaEffect({
        kind: "fire-flash",
        x: enemy.x,
        y: enemy.y,
        radius,
        duration: 0.25,
        damagePerSecond: 0,
        color: "rgba(233, 184, 95, 0.22)",
        tickSource: "fire",
      }));
    }

    updateBossSpecial(enemy, dt) {
      if (!enemy || enemy.dead) return;
      const config = enemy.config;
      if (config.phaseShieldRate && !enemy.phaseFlags.shield && enemy.hp / enemy.maxHp <= config.phaseShieldRate) {
        enemy.phaseFlags.shield = true;
        enemy.maxShield = Math.max(enemy.maxShield, Math.round((config.phaseShieldAmount || 180) * (this.enemyHpMultiplier || 1)));
        enemy.shield = Math.max(enemy.shield, enemy.maxShield);
        this.showToast(`${enemy.name}重凝妖盾！`);
      }
      if (Array.isArray(config.phaseSummons)) {
        for (const phase of config.phaseSummons) {
          const key = `phase_${phase.hpRate}`;
          if (enemy.phaseFlags[key] || enemy.hp / enemy.maxHp > phase.hpRate) continue;
          enemy.phaseFlags[key] = true;
          if (phase.shield) {
            enemy.maxShield = Math.max(enemy.maxShield, Math.round(phase.shield * (this.enemyHpMultiplier || 1)));
            enemy.shield = Math.max(enemy.shield, enemy.maxShield);
          }
          if (phase.types) this.spawnBossMinions(enemy, phase.types);
          if (phase.text) {
            this.showToast(phase.text);
            this.floatingTexts.push(new FloatingText(phase.text, this.width / 2, 100, "#fff1bd", { size: 18, life: 1.25, kind: "crit" }));
          }
        }
      }
      if (!config.summonTypes?.length) return;
      enemy.specialTimer -= dt;
      if (enemy.specialTimer > 0) return;
      this.spawnBossMinions(enemy, config.summonTypes);
      enemy.specialTimer = config.summonInterval || 6;
    }

    spawnBossMinions(enemy, types) {
      const maxEnemies = this.currentLevelConfig.maxEnemies;
      const count = Math.min(types.length, Math.max(0, maxEnemies - this.enemies.length));
      for (let i = 0; i < count; i += 1) {
        const type = types[i % types.length];
        this.spawnEnemy(type, {
          x: clamp(enemy.x + rand(-60, 60), 20, this.width - 20),
          y: Math.max(10, enemy.y + rand(20, 72)),
        });
      }
    }

    triggerEmergencyHeal() {
      this.emergencyHealUsed = true;
      const amount = this.currentLevelConfig.emergencyHealAmount;
      this.wallHp = Math.min(this.maxWallHp, this.wallHp + amount);
      this.floatingTexts.push(new FloatingText(`护山结界激活 +${amount}`, this.width / 2, this.wallY - 48, "#d7fff5", { size: 16, life: 1.2 }));
      this.showToast(`护山结界激活 +${amount}`);
      for (let i = 0; i < 28; i += 1) {
        const angle = (Math.PI * 2 * i) / 28;
        const speed = rand(40, 115);
        this.addParticle(
          this.width / 2,
          this.wallY - 24,
          i % 2 ? "#d7fff5" : "#fff1bd",
          Math.cos(angle) * speed,
          Math.sin(angle) * speed - 35,
          rand(2, 5),
          rand(0.45, 0.9),
          "heal",
        );
      }
    }

    damageEnemy(enemy, baseAmount, source, options = {}) {
      if (!enemy || enemy.dead) return 0;
      if (!options.ignoreTargetable && !this.isEnemyTargetable(enemy)) return 0;
      let amount = baseAmount * this.globalDamageMult;
      if (this.elapsed < this.companionBuffUntil) amount *= 1.16;
      if (enemy.config?.swordDamageTaken && source === "sword") amount *= enemy.config.swordDamageTaken;
      if (enemy.config?.flying && source === "array") amount *= enemy.config.arrayDamageTaken || 0.3;
      if (source === "array") amount *= this.metaBonuses.dotDamageMultiplier || 1;
      if (enemy.elite || enemy.isBoss || enemy.config?.category === "elite" || enemy.config?.category === "boss") {
        amount *= this.metaBonuses.eliteBossDamageMultiplier || 1;
      }
      if (this.iceVulnerabilityBonus > 0 && this.elapsed < enemy.slowUntil) {
        amount *= 1 + this.iceVulnerabilityBonus;
      }
      if (!options.ignoreEvasion && enemy.config?.evadeChance && Math.random() < enemy.config.evadeChance) {
        enemy.hitPulse = 0.8;
        this.floatingTexts.push(new FloatingText("幻闪", enemy.x, enemy.y - enemy.radius, "#fff1bd", { size: 13 }));
        this.spawnHitParticles(enemy, "array", false);
        return 0;
      }
      const crit = Math.random() < this.critChance;
      if (crit) amount *= this.critDamage;
      const rounded = Math.max(1, Math.round(amount));
      let remaining = rounded;
      const hadShield = enemy.shield > 0;

      if (enemy.shield > 0) {
        const shieldHit = Math.min(enemy.shield, remaining);
        enemy.shield -= shieldHit;
        remaining -= shieldHit;
      }
      if (hadShield && enemy.shield <= 0) this.spawnShieldBreak(enemy);
      if (remaining > 0) enemy.hp -= remaining;
      enemy.hitPulse = 1;
      if (source === "fire") enemy.burnVisualUntil = Math.max(enemy.burnVisualUntil, this.elapsed + 0.75);

      if (!options.silent) {
        const color = crit ? "#fff1bd" : source === "ice" ? "#d7fff5" : "#f3fff9";
        this.floatingTexts.push(new FloatingText(
          `${crit ? "暴击 " : ""}${rounded}`,
          options.x || enemy.x,
          options.y || enemy.y,
          color,
          { kind: crit ? "crit" : "normal", size: crit ? 18 : 13 },
        ));
        if (source === "sword") this.audio.play("sword");
        if (source === "ice") this.audio.play("ice");
        this.spawnHitParticles(enemy, source, crit);
      }

      if (enemy.hp <= 0) this.killEnemy(enemy);
      return rounded;
    }

    spawnHitParticles(enemy, source, crit = false) {
      const colors = {
        sword: ["#d7fff5", "#fff1bd"],
        fire: ["#e9b85f", "#ff9f63"],
        ice: ["#d7fff5", "#9fd9cf"],
        thunder: ["#bfeee4", "#fff1bd"],
        array: ["#9fd9cf", "#f3fff9"],
      }[source] || ["#f3fff9", "#fff1bd"];
      const count = crit ? 6 : 4;
      for (let i = 0; i < count; i += 1) {
        const angle = rand(-Math.PI, 0);
        const speed = rand(22, crit ? 95 : 70);
        this.addParticle(
          enemy.x + rand(-enemy.radius * 0.35, enemy.radius * 0.35),
          enemy.y + rand(-enemy.radius * 0.3, enemy.radius * 0.25),
          randomFrom(colors),
          Math.cos(angle) * speed,
          Math.sin(angle) * speed - rand(8, 28),
          rand(1.4, crit ? 3.8 : 2.8),
          rand(0.22, 0.44),
          source === "ice" ? "ice" : source === "fire" ? "fire" : "hit",
        );
      }
    }

    spawnShieldBreak(enemy) {
      for (let i = 0; i < 18; i += 1) {
        const angle = (Math.PI * 2 * i) / 18;
        const speed = rand(45, 130);
        this.addParticle(
          enemy.x,
          enemy.y,
          "#76b7a4",
          Math.cos(angle) * speed,
          Math.sin(angle) * speed,
          rand(2, 5),
          rand(0.35, 0.7),
          "shield",
        );
      }
    }

    killEnemy(enemy) {
      if (enemy.dead) return;
      if (enemy.config?.reviveChance && !enemy.revived && Math.random() < enemy.config.reviveChance) {
        enemy.revived = true;
        enemy.hp = Math.max(1, Math.round(enemy.maxHp * 0.42));
        enemy.shield = 0;
        enemy.hitPulse = 1;
        this.floatingTexts.push(new FloatingText("白骨重聚", enemy.x, enemy.y - enemy.radius, "#d7fff5", { size: 13 }));
        for (let i = 0; i < 12; i += 1) {
          const angle = rand(0, Math.PI * 2);
          const speed = rand(28, 86);
          this.addParticle(enemy.x, enemy.y, i % 2 ? "#e8f7ef" : "#ff6b57", Math.cos(angle) * speed, Math.sin(angle) * speed, rand(1.6, 3.8), rand(0.34, 0.72), "death");
        }
        return;
      }
      enemy.dead = true;
      this.kills += 1;
      const expGain = Math.max(1, Math.round(enemy.exp * this.expMultiplier));
      this.addExp(Math.max(1, Math.round(expGain * (this.runtimeExpPenalty || 1))), enemy.x, enemy.y);
      if (enemy.config?.onDeath === "poisonCloud") this.spawnPoisonCloud(enemy);
      if (enemy.config?.splitInto?.length) this.spawnSplitChildren(enemy);
      this.spawnDeathParticles(enemy);
      if (enemy.isBoss) this.handleBossDeath(enemy);
      if (enemy.type === "boarDragon" || enemy.type === "bullVanguard" || enemy.isBoss) this.addShake(enemy.isBoss ? 7 : 4, enemy.isBoss ? 0.18 : 0.12);
    }

    spawnPoisonCloud(enemy) {
      this.areaEffects.push(new AreaEffect({
        kind: "poison",
        x: enemy.x,
        y: Math.min(this.wallY - 36, enemy.y + 8),
        radius: Math.max(42, enemy.radius * 2.4),
        duration: 3,
        damagePerSecond: 0,
        wallDamage: Math.max(1, Math.round(enemy.damage * 0.28)),
        color: "rgba(92, 145, 88, 0.18)",
        tickSource: "poison",
      }));
    }

    spawnSplitChildren(enemy) {
      const types = enemy.config.splitInto;
      for (let i = 0; i < 2; i += 1) {
        const type = types[i % types.length];
        const child = this.spawnEnemy(type, {
          x: clamp(enemy.x + (i ? 18 : -18), 18, this.width - 18),
          y: Math.max(8, enemy.y + rand(-8, 18)),
        });
        child.maxHp = Math.max(8, Math.round(child.maxHp * 0.55));
        child.hp = child.maxHp;
        child.damage = Math.max(1, Math.round(child.damage * 0.65));
        child.exp = Math.max(1, Math.round(child.exp * 0.35));
      }
    }

    handleBossDeath(enemy) {
      this.bossDefeated = true;
      this.bossEnemy = null;
      this.showToast(`${enemy.name}已伏诛！`);
      for (let i = 0; i < 42; i += 1) {
        const angle = (Math.PI * 2 * i) / 42;
        const speed = rand(70, 190);
        this.addParticle(enemy.x, enemy.y, i % 2 ? "#fff1bd" : "#9fd9cf", Math.cos(angle) * speed, Math.sin(angle) * speed, rand(2.5, 7), rand(0.55, 1.2), "death");
      }
      if (this.currentLevelConfig.order === 40 && this.state !== "ended") {
        this.endGame(true);
      }
    }

    spawnDeathParticles(enemy) {
      const visual = enemy.visual || enemy.type;
      const heavy = ["boarDragon", "stoneArmor", "waterApe", "bullVanguard"].includes(enemy.type);
      const count = enemy.isBoss ? 42 : heavy ? 24 : enemy.maxShield > 0 ? 18 : 13;
      const paletteMap = {
        lampGranny: ["#e9b85f", "#ff6b57", "#fff1bd"],
        stoneArmor: ["#667066", "#9aa7a2", "#f3fff9"],
        boneDemon: ["#e8f7ef", "#ff6b57", "#9fd9cf"],
        bossBoneLady: ["#e8f7ef", "#ff6b57", "#fff1bd"],
        blackWind: ["#111719", "#315b57", "#9fd9cf"],
        bossBlackWind: ["#111719", "#315b57", "#9fd9cf", "#fff1bd"],
        waterApe: ["#173f42", "#7fd1d8", "#d7fff5"],
        bossYellowWind: ["#806136", "#e9b85f", "#fff1bd"],
        bossBullKing: ["#5b2b26", "#ff6b57", "#f5d78a"],
      };
      const colors = paletteMap[visual] || ["#173f42", "#315b57", "#6f8f8b", "#9fd9cf"];
      for (let i = 0; i < count; i += 1) {
        const angle = rand(Math.PI * 1.05, Math.PI * 1.95);
        const speed = rand(30, heavy || enemy.isBoss ? 140 : 95);
        this.addParticle(
          enemy.x + rand(-enemy.radius * 0.38, enemy.radius * 0.38),
          enemy.y + rand(-enemy.radius * 0.22, enemy.radius * 0.38),
          randomFrom(colors),
          Math.cos(angle) * speed + rand(-18, 18),
          Math.sin(angle) * speed - rand(18, 56),
          rand(2, heavy || enemy.isBoss ? 6 : 4.5),
          rand(0.45, heavy || enemy.isBoss ? 1.05 : 0.85),
          "death",
        );
      }
    }

    addExp(amount, x, y) {
      this.exp += amount;
      if (x && y) this.floatingTexts.push(new FloatingText(`+${amount}修为`, x, y - 10, "#d7fff5", { size: 12 }));
      if (!this.leveling && this.exp >= this.expToNext && this.state === "playing") {
        this.beginLevelUp();
      }
    }

    beginLevelUp() {
      this.leveling = true;
      this.state = "upgrade";
      this.dom.pauseBtn.disabled = true;
      this.upgrades.show();
      this.updateUI();
    }

    finishLevelUp() {
      this.level += 1;
      this.exp -= this.expToNext;
      this.expToNext = Math.ceil(this.expToNext * this.currentLevelConfig.expGrowth);
      this.leveling = false;
      this.dom.pauseBtn.disabled = false;
      this.dom.pauseBtn.textContent = "调息";
      this.renderSkillStrip();
      if (this.exp >= this.expToNext) {
        this.beginLevelUp();
      } else {
        this.state = "playing";
        this.lastFrame = performance.now();
      }
      this.updateUI();
    }

    unlockSkill(id) {
      const skill = this.skills[id];
      if (!skill.enabled) {
        skill.enabled = true;
        skill.level = 1;
        skill.timer = 0.2;
        this.floatingTexts.push(new FloatingText(`习得${this.getSkillLabel(id)}`, this.width / 2, this.wallY - 95, "#d7fff5"));
      }
    }

    getCurrentHeroKey() {
      return normalizeHeroId(this.heroId || this.saveManager?.data?.selectedHero || "wukong") || "wukong";
    }

    getSkillTheme(id) {
      return getSkillTheme(id, this.getCurrentHeroKey());
    }

    getSkillLabel(id) {
      return this.getSkillTheme(id).name || SKILL_LABELS[id] || id;
    }

    getSkillIcon(id) {
      return this.getSkillTheme(id).icon || SKILL_ICONS[id] || "法";
    }

    findClosestToWall() {
      let target = null;
      for (const enemy of this.enemies) {
        if (!this.isEnemyTargetable(enemy)) continue;
        if (!target || enemy.y > target.y) target = enemy;
      }
      return target;
    }

    findDenseTarget() {
      let best = null;
      let bestScore = -Infinity;
      for (const enemy of this.enemies) {
        if (!this.isEnemyTargetable(enemy)) continue;
        let nearby = 0;
        for (const other of this.enemies) {
          if (!this.isEnemyTargetable(other) || other === enemy) continue;
          if (distSq(enemy.x, enemy.y, other.x, other.y) <= 76 * 76) nearby += 1;
        }
        const score = nearby * 22 + enemy.hp * 0.12 + enemy.y * 0.08;
        if (score > bestScore) {
          best = enemy;
          bestScore = score;
        }
      }
      return best;
    }

    findFastTarget() {
      let best = null;
      let bestScore = -Infinity;
      for (const enemy of this.enemies) {
        if (!this.isEnemyTargetable(enemy)) continue;
        const score = enemy.baseSpeed + enemy.y * 0.12;
        if (score > bestScore) {
          best = enemy;
          bestScore = score;
        }
      }
      return best;
    }

    randomEnemy(exclude = new Set()) {
      const candidates = this.enemies.filter((enemy) => this.isEnemyTargetable(enemy) && !exclude.has(enemy));
      if (!candidates.length) return null;
      return randomFrom(candidates);
    }

    castSword() {
      const skill = this.skills.sword;
      for (let i = 0; i < skill.count; i += 1) {
        const target = this.findClosestToWall();
        if (!target) return;
        const originX = this.width / 2 + (i - (skill.count - 1) / 2) * 18 + rand(-7, 7);
        const originY = this.wallY - 10;
        const angle = Math.atan2(target.y - originY, target.x - originX);
        const speed = skill.baseSpeed * skill.speedMult;
        this.projectiles.push(new Projectile({
          kind: "sword",
          target,
          x: originX,
          y: originY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          speed,
          radius: 7,
          damage: skill.baseDamage * skill.damageMult,
          pierce: skill.pierce,
          life: 2.2,
        }));
      }
    }

    castFire() {
      const target = this.findDenseTarget();
      if (!target) return;
      const skill = this.skills.fire;
      this.launchProjectile("fire", target, {
        damage: skill.baseDamage * skill.damageMult,
        range: skill.baseRange * skill.rangeMult,
        speed: skill.baseSpeed,
        radius: 9,
      });
    }

    castIce() {
      const target = this.findFastTarget();
      if (!target) return;
      const skill = this.skills.ice;
      this.launchProjectile("ice", target, {
        damage: skill.baseDamage * skill.damageMult,
        range: skill.baseRange * skill.rangeMult,
        speed: skill.baseSpeed,
        radius: 9,
        slowFactor: 1 - skill.slowPower,
        slowDuration: skill.slowDuration,
      });
    }

    launchProjectile(kind, target, options) {
      const originX = this.width / 2 + rand(-26, 26);
      const originY = this.wallY - 14;
      const angle = Math.atan2(target.y - originY, target.x - originX);
      this.projectiles.push(new Projectile({
        kind,
        target,
        x: originX,
        y: originY,
        vx: Math.cos(angle) * options.speed,
        vy: Math.sin(angle) * options.speed,
        speed: options.speed,
        radius: options.radius,
        damage: options.damage,
        range: options.range,
        slowFactor: options.slowFactor,
        slowDuration: options.slowDuration,
        life: 2.6,
      }));
    }

    castThunder() {
      const first = this.randomEnemy();
      if (!first) return;
      const skill = this.skills.thunder;
      const hit = new Set();
      let current = first;
      let previous = null;
      let damage = skill.baseDamage * skill.damageMult;
      const jumps = skill.bounces + 1;
      for (let i = 0; i < jumps && current; i += 1) {
        hit.add(current);
        if (previous) {
          this.lightningEffects.push({
            x1: previous.x,
            y1: previous.y,
            x2: current.x,
            y2: current.y,
            life: 0.18,
            age: 0,
          });
        }
        this.lightningStrike(current, damage, skill.stun);
        damage *= this.metaBonuses.thunderBounceRetention || 0.72;
        previous = current;
        current = this.findNearestEnemy(current.x, current.y, 118, hit);
      }
    }

    findNearestEnemy(x, y, range, exclude) {
      let best = null;
      let bestD = range * range;
      for (const enemy of this.enemies) {
        if (!this.isEnemyTargetable(enemy) || exclude.has(enemy)) continue;
        const d = distSq(x, y, enemy.x, enemy.y);
        if (d < bestD) {
          best = enemy;
          bestD = d;
        }
      }
      return best;
    }

    lightningStrike(enemy, damage, stun) {
      const topX = enemy.x + rand(-26, 26);
      this.lightningEffects.push({
        x1: topX,
        y1: Math.max(this.battleTop, enemy.y - 160),
        x2: enemy.x,
        y2: enemy.y,
        life: 0.22,
        age: 0,
      });
      this.damageEnemy(enemy, damage, "thunder", { x: enemy.x, y: enemy.y - 8 });
      this.audio.play("thunder");
      this.addFlash(0.06);
      this.addShake(1.2, 0.07);
      this.vibrate(8);
      if (stun) enemy.stunUntil = Math.max(enemy.stunUntil, this.elapsed + 0.45);
      for (let i = 0; i < 4; i += 1) {
        this.addParticle(enemy.x, enemy.y, i % 2 ? "#d7fff5" : "#fff1bd", rand(-70, 70), rand(-85, 45), rand(1.4, 2.6), rand(0.16, 0.32), "thunder");
      }
    }

    castArray() {
      const skill = this.skills.array;
      const radius = skill.baseRange * skill.rangeMult;
      this.areaEffects.push(new AreaEffect({
        kind: "array",
        x: this.width / 2,
        y: this.wallY - radius * 0.55,
        radius,
        duration: skill.duration,
        damagePerSecond: skill.baseDamage * skill.damageMult,
        color: "rgba(118, 183, 164, 0.18)",
        tickSource: "array",
      }));
      for (let i = 0; i < 10; i += 1) {
        const a = (Math.PI * 2 * i) / 10;
        this.addParticle(
          this.width / 2 + Math.cos(a) * radius * 0.55,
          this.wallY - radius * 0.55 + Math.sin(a) * radius * 0.55,
          "#d7fff5",
          Math.cos(a) * 18,
          Math.sin(a) * 18,
          rand(2, 4),
          rand(0.35, 0.65),
          "sword",
        );
      }
    }

    explode(x, y, radius, damage, source) {
      for (const enemy of this.enemies) {
        if (!this.isEnemyTargetable(enemy)) continue;
        const reach = radius + enemy.radius;
        if (distSq(x, y, enemy.x, enemy.y) <= reach * reach) {
          this.damageEnemy(enemy, damage, source, { x: enemy.x, y: enemy.y });
        }
      }
      const color = source === "ice" ? "#d7fff5" : "#e9b85f";
      const count = source === "ice" ? 20 : 24;
      this.audio.play(source === "ice" ? "ice" : "fire");
      if (source === "fire") this.addShake(3, 0.1);
      for (let i = 0; i < count; i += 1) {
        const angle = (Math.PI * 2 * i) / count + rand(-0.12, 0.12);
        const speed = rand(50, 145);
        this.addParticle(x, y, color, Math.cos(angle) * speed, Math.sin(angle) * speed, rand(2, 5), rand(0.32, 0.68), source === "ice" ? "ice" : "fire");
      }
      this.areaEffects.push(new AreaEffect({
        kind: source === "ice" ? "frost-flash" : "fire-flash",
        x,
        y,
        radius,
        duration: 0.22,
        damagePerSecond: 0,
        color: source === "ice" ? "rgba(215, 255, 245, 0.26)" : "rgba(233, 184, 95, 0.24)",
        tickSource: source,
      }));
    }

    spawnSlash(x, y, angle) {
      this.lightningEffects.push({
        x1: x - Math.cos(angle) * 15,
        y1: y - Math.sin(angle) * 15,
        x2: x + Math.cos(angle) * 20,
        y2: y + Math.sin(angle) * 20,
        life: 0.14,
        age: 0,
        sword: true,
      });
      for (let i = 0; i < 5; i += 1) {
        this.addParticle(x, y, "#d7fff5", rand(-55, 55), rand(-55, 55), rand(1.5, 3.5), rand(0.2, 0.42), "sword");
      }
    }

    addParticle(x, y, color, vx, vy, size, life, type = "hit") {
      const particleCap = this.timeScale === 2 ? 200 : MAX_PARTICLES;
      if (this.particles.length >= particleCap) this.particles.shift();
      this.particles.push(new Particle({ x, y, color, vx, vy, size, life, type }));
    }

    endGame(victory) {
      if (this.state === "ended") return;
      this.state = "ended";
      this.leveling = false;
      this.dom.pauseBtn.disabled = true;
      this.dom.pauseBtn.textContent = "调息";
      this.dom.upgradeOverlay.classList.add("hidden");
      this.audio.play(victory ? "victory" : "failure");
      this.vibrate(victory ? 45 : 65);

      const reward = this.saveManager.addRunResult({
        victory,
        kills: this.kills,
        survivalTime: this.elapsed,
        level: this.level,
        levelId: this.currentLevelConfig.id,
      });
      const nextLevel = getNextLevel(this.currentLevelConfig.id);
      this.lastResult = {
        victory,
        levelId: this.currentLevelConfig.id,
        levelOrder: this.currentLevelConfig.order,
        nextLevelId: victory && nextLevel ? nextLevel.id : null,
        nextLevelName: victory && nextLevel ? nextLevel.name : "",
        isFinalLevel: this.currentLevelConfig.order >= 40,
        pendingCompanionInvite: !!reward.pendingCompanionInvite,
      };

      this.dom.resultEyebrow.textContent = victory ? "守住山门" : "妖潮破门";
      this.dom.resultTitle.textContent = victory
        ? this.currentLevelConfig.order >= 40
          ? "万妖退散，山门永固"
          : this.currentLevelConfig.boss
            ? "妖劫已破"
            : "守山成功"
        : "山门失守";
      this.dom.gameOverOverlay.classList.toggle("victory", victory);
      this.dom.gameOverOverlay.classList.toggle("failure", !victory);
      this.dom.resultTrialName.textContent = `第 ${this.currentLevelConfig.order} 关 ${reward.levelName}`;
      this.dom.resultTime.textContent = formatTime(reward.survivalSeconds);
      this.dom.resultKills.textContent = this.kills;
      this.dom.resultLevel.textContent = this.level;
      this.dom.resultClear.textContent = victory ? "已通关" : "未通关";
      this.dom.resultCoins.textContent = reward.coins;
      this.dom.resultTotalCoins.textContent = reward.totalCoins;
      this.dom.resultShards.textContent = this.formatShardDrops(reward.drops, reward.runeDrops);
      if (this.dom.resultHeroExp) {
        const heroLabel = reward.heroName || "角色";
        const levelText = reward.heroLevelAfter > reward.heroLevelBefore
          ? `${heroLabel}提升至 Lv.${reward.heroLevelAfter}`
          : `${heroLabel} +${reward.heroExpGain} 经验`;
        this.dom.resultHeroExp.textContent = reward.heroNeedBreakthrough ? `${levelText}，需要突破后继续升级` : levelText;
      }
      if (victory && this.currentLevelConfig.id === "level40") {
        this.dom.resultUnlockNotice.textContent = "万妖退散，山门永固";
        this.dom.resultUnlockNotice.classList.remove("hidden");
      } else if (victory && this.currentLevelConfig.id === "level10") {
        this.dom.resultUnlockNotice.textContent = nextLevel
          ? `炼气终试已破，已解锁：第 ${nextLevel.order} 关 ${nextLevel.name}`
          : "炼气终试已破，筑基妖潮将启！";
        this.dom.resultUnlockNotice.classList.remove("hidden");
      } else if (victory && nextLevel) {
        this.dom.resultUnlockNotice.textContent = `已解锁：第 ${nextLevel.order} 关 ${nextLevel.name}`;
        this.dom.resultUnlockNotice.classList.remove("hidden");
      } else if (reward.pendingCompanionInvite) {
        this.dom.resultUnlockNotice.textContent = "新的西游伙伴可邀请助战";
        this.dom.resultUnlockNotice.classList.remove("hidden");
      } else if (reward.unlockedLevelName) {
        this.dom.resultUnlockNotice.textContent = `新试炼已解封：${reward.unlockedLevelName}`;
        this.dom.resultUnlockNotice.classList.remove("hidden");
      } else if (!victory) {
        this.dom.resultUnlockNotice.textContent = "可继续强化后再战";
        this.dom.resultUnlockNotice.classList.remove("hidden");
      } else {
        this.dom.resultUnlockNotice.textContent = "";
        this.dom.resultUnlockNotice.classList.add("hidden");
      }
      if (reward.pendingCompanionInvite) {
        this.dom.resultUnlockNotice.textContent = "获得伙伴邀请机会";
        this.dom.resultUnlockNotice.classList.remove("hidden");
      }
      this.configureResultButtons(victory);
      this.dom.gameOverOverlay.classList.remove("hidden");
      this.dom.gameOverOverlay.scrollTop = 0;
      this.floatingTexts.push(new FloatingText(`+${reward.coins}灵石`, this.width / 2, this.wallY - 110, "#fff1bd", { size: 18, life: 1.2, kind: "crit" }));
      for (let i = 0; i < 18; i += 1) {
        this.addParticle(this.width / 2, this.wallY - 90, "#fff1bd", rand(-80, 80), rand(-120, -25), rand(2, 4), rand(0.55, 1), "coin");
      }
      this.renderHome();
      this.renderCultivation();
      this.renderRunes();
      this.renderCodex();
      this.renderAchievements();
    }

    configureResultButtons(victory) {
      const result = this.lastResult;
      if (!result) return;
      this.dom.resultHomeBtn.textContent = "返回关卡";
      this.dom.replayLevelBtn.classList.toggle("hidden", !victory);
      if (victory) {
        if (result.pendingCompanionInvite) {
          this.dom.againBtn.textContent = "邀请伙伴";
          this.dom.replayLevelBtn.textContent = "重玩本关";
          return;
        }
        if (result.isFinalLevel) {
          this.dom.againBtn.textContent = "返回山门";
          this.dom.replayLevelBtn.textContent = "重玩终劫";
        } else {
          this.dom.againBtn.textContent = "进入下一关";
          this.dom.replayLevelBtn.textContent = "重玩本关";
        }
      } else {
        this.dom.againBtn.textContent = "再战本关";
        this.dom.replayLevelBtn.textContent = "重玩本关";
      }
    }

    formatShardDrops(drops, runeDrops = []) {
      const entries = Object.entries(drops);
      const parts = entries.map(([id, count]) => `${GEM_DEFS[id].shardName} x${count}`);
      for (const rune of runeDrops || []) parts.push(getRuneDisplay(rune).name);
      if (!parts.length) return "无";
      return parts.join("、");
    }

    updateUI() {
      if (this.dom.heroHudLabel) this.dom.heroHudLabel.textContent = this.heroDef ? this.heroDef.name : "境界";
      this.dom.levelText.textContent = this.level;
      this.dom.expText.textContent = `${Math.floor(this.exp)} / ${this.expToNext}`;
      const remaining = this.currentLevelConfig.duration - this.elapsed;
      this.dom.timeText.textContent = formatTime(remaining);
      this.dom.wallHpText.textContent = `${Math.ceil(this.wallHp)} / ${this.maxWallHp}`;
      this.dom.killText.textContent = this.kills;
      const hpLow = this.wallHp / this.maxWallHp <= 0.3;
      this.dom.wallHpText.classList.toggle("danger-text", hpLow);
      this.dom.timeText.classList.toggle("danger-text", remaining <= 30);
      this.dom.expText.style.setProperty("--exp-rate", `${clamp(this.exp / this.expToNext, 0, 1) * 100}%`);
    }

    renderHome() {
      const save = this.saveManager.data;
      if (!save.levels[this.selectedLevelId]?.unlocked) {
        this.selectedLevelId = getHighestUnlockedLevelId(save);
        this.currentLevelConfig = getLevelById(this.selectedLevelId);
      }
      this.dom.homeCoins.textContent = save.coins;
      this.dom.bestKills.textContent = save.records.bestKills;
      this.dom.bestTime.textContent = formatTime(save.records.bestSurvivalTime);
      this.dom.bestLevel.textContent = save.records.bestLevel;
      this.dom.clearCount.textContent = save.records.clearCount;
      this.dom.totalRuns.textContent = save.records.totalRuns;
      this.renderHeroList();
      this.renderLevelSelector();
      this.renderSoundToggle();
    }

    renderHeroList() {
      if (!this.dom.heroList) return;
      const save = this.saveManager.data;
      this.dom.heroList.innerHTML = "";
      for (const id of HERO_IDS) {
        const hero = HERO_DEFS[id];
        const state = normalizeHeroProgress(save.heroes[id]);
        const status = getHeroLevelStatus(state);
        const button = document.createElement("button");
        button.type = "button";
        button.className = `hero-card ${save.selectedHero === id ? "selected" : ""}`;
        button.innerHTML = `
          <canvas class="hero-portrait" width="72" height="72" data-hero="${id}"></canvas>
          <div class="hero-copy">
            <strong>${hero.name} · Lv.${state.level}</strong>
            <p>${hero.role}</p>
            <p>${hero.passive}</p>
            <p>${status.blocked ? `需要突破：${status.breakthroughCost} 灵石` : `经验 ${Math.floor(state.exp)} / ${status.need}`}</p>
            <div class="hero-tags"><span>${hero.initialSkills.map((skill) => getSkillTheme(skill, id).name).join("</span><span>")}</span><span>胜场 ${state.wins || 0}</span></div>
          </div>
        `;
        button.addEventListener("click", () => {
          const result = status.blocked && save.selectedHero === id
            ? this.saveManager.breakthroughHero(id)
            : this.saveManager.selectHero(id);
          this.heroId = this.saveManager.data.selectedHero || id;
          this.heroDef = HERO_DEFS[this.heroId] || hero;
          this.showToast(result.message);
          this.renderHome();
          this.renderSkillStrip();
        });
        this.dom.heroList.appendChild(button);
      }
      this.drawHeroPortraits(this.dom.heroList);
    }

    drawHeroPortraits(root = document) {
      root.querySelectorAll("canvas.hero-portrait").forEach((canvas) => {
        const id = canvas.dataset.hero;
        const hero = HERO_DEFS[id] || HERO_DEFS.wukong;
        const ctx = canvas.getContext("2d");
        const w = canvas.width;
        const h = canvas.height;
        ctx.clearRect(0, 0, w, h);
        const grad = ctx.createRadialGradient(w * 0.35, h * 0.25, 4, w / 2, h / 2, w * 0.5);
        grad.addColorStop(0, "rgba(255,255,255,0.8)");
        grad.addColorStop(0.45, hero.color);
        grad.addColorStop(1, "rgba(23,63,66,0.9)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(w / 2, h / 2, w * 0.46, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#fff1bd";
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.fillStyle = "rgba(23, 63, 66, 0.72)";
        ctx.beginPath();
        ctx.ellipse(w / 2, h * 0.56, w * 0.22, h * 0.28, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = hero.accent;
        if (id === "wukong") {
          ctx.fillRect(w * 0.2, h * 0.34, w * 0.6, 4);
          ctx.fillStyle = "#fff1bd";
          ctx.beginPath();
          ctx.arc(w * 0.5, h * 0.3, 7, 0, Math.PI * 2);
          ctx.fill();
        } else if (id === "tangseng" || id === "tang") {
          ctx.beginPath();
          ctx.arc(w * 0.5, h * 0.28, 12, Math.PI, 0);
          ctx.fill();
          ctx.strokeStyle = "#fff1bd";
          ctx.beginPath();
          ctx.arc(w * 0.5, h * 0.43, 22, 0, Math.PI * 2);
          ctx.stroke();
        } else if (id === "bajie") {
          ctx.beginPath();
          ctx.ellipse(w * 0.5, h * 0.44, 16, 10, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "#f3fff9";
          ctx.fillRect(w * 0.37, h * 0.42, 5, 7);
          ctx.fillRect(w * 0.58, h * 0.42, 5, 7);
        } else {
          ctx.strokeStyle = "#d7fff5";
          ctx.lineWidth = 5;
          ctx.beginPath();
          ctx.moveTo(w * 0.25, h * 0.72);
          ctx.lineTo(w * 0.78, h * 0.22);
          ctx.stroke();
          ctx.fillStyle = "#fff1bd";
          ctx.beginPath();
          ctx.arc(w * 0.52, h * 0.5, 5, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.fillStyle = "#ff6b57";
        ctx.beginPath();
        ctx.arc(w * 0.43, h * 0.52, 2.2, 0, Math.PI * 2);
        ctx.arc(w * 0.57, h * 0.52, 2.2, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    renderRunes() {
      if (!this.dom.runeList) return;
      const save = this.saveManager.data;
      const equipped = new Set(save.runes.equipped || []);
      const owned = save.runes.owned || [];
      this.dom.runeSummary.textContent = owned.length
        ? `已拥有 ${owned.length} 枚符文，已装备 ${equipped.size}/3。通关会获得随机符文，Boss 关更容易出上品与灵品。`
        : "暂未获得符文。通关任意试炼后会掉落第一枚符文。";
      this.dom.runeList.innerHTML = "";
      if (!owned.length) {
        const empty = document.createElement("article");
        empty.className = "system-card";
        empty.innerHTML = `<span class="system-icon">符</span><div class="system-copy"><strong>符文未开匣</strong><p>先通关一关，带回第一枚取经符箓。</p></div>`;
        this.dom.runeList.appendChild(empty);
        return;
      }
      for (const rune of owned) {
        const info = getRuneDisplay(rune);
        const card = document.createElement("button");
        card.type = "button";
        card.className = `system-card ${equipped.has(rune.uid) ? "equipped" : ""}`;
        card.innerHTML = `
          <span class="system-icon" style="color:${info.quality.color}">符</span>
          <div class="system-copy">
            <strong>${info.name}</strong>
            <p>${info.desc}</p>
            <div class="system-tags"><span>${equipped.has(rune.uid) ? "已装备" : "点击装备"}</span><span>${info.def.category}</span></div>
          </div>
        `;
        card.addEventListener("click", () => {
          const result = this.saveManager.toggleRuneEquip(rune.uid);
          this.showToast(result.message);
          this.renderRunes();
        });
        this.dom.runeList.appendChild(card);
      }
    }

    renderCodex() {
      if (!this.dom.codexList) return;
      const seen = this.saveManager.data.bestiary.seen || {};
      this.dom.codexList.innerHTML = "";
      const galleryMode = this.monsterGalleryMode || new URLSearchParams(window.location.search).get("monsterGallery") === "1";
      this.dom.codexList.classList.toggle("monster-gallery-mode", galleryMode);
      for (const [id, def] of Object.entries(MONSTER_BOOK)) {
        const unlocked = galleryMode || !!seen[id] || (def.unlockLevel || 1) <= 1;
        const spritePath = def.sprite || ENEMY_TYPES[id]?.sprite || "";
        const spriteRecord = galleryMode && spritePath ? getMonsterSpriteRecord(id) : null;
        const spriteStatus = !spritePath ? "专属绘制" : spriteRecord?.error ? "加载失败" : spriteRecord?.loaded ? "已加载" : "加载中";
        const card = document.createElement("article");
        card.className = `system-card monster-card ${def.category === "boss" ? "boss-card" : ""} ${def.category === "elite" ? "elite-card" : ""} ${unlocked ? "" : "locked"}`;
        card.innerHTML = `
          <canvas class="monster-portrait" width="132" height="132" aria-label="${unlocked ? def.name : "未遭遇妖怪"}"></canvas>
          <div class="system-copy">
            <strong>${unlocked ? def.name : "未遭遇妖怪"}</strong>
            <p>${unlocked ? (def.description || "取经路上现身的志怪妖物。") : `第 ${def.unlockLevel || 1} 关后可能出现。`}</p>
            <div class="system-tags"><span>${def.category === "boss" ? "Boss" : def.category === "elite" ? "精英" : "妖怪"}</span><span>解锁 ${def.unlockLevel || 1}</span></div>
          </div>
        `;
        if (galleryMode) {
          const spriteMeta = document.createElement("p");
          spriteMeta.className = "sprite-path";
          spriteMeta.textContent = spritePath ? `${spriteStatus} · ${spritePath}` : spriteStatus;
          card.querySelector(".system-copy")?.appendChild(spriteMeta);
        }
        this.dom.codexList.appendChild(card);
        this.drawMonsterPortrait(card.querySelector(".monster-portrait"), id, unlocked);
      }
    }

    drawMonsterPortrait(canvas, id, unlocked) {
      if (!canvas) return;
      const key = normalizeEnemyType(id);
      const def = MONSTER_BOOK[key] || {};
      const galleryMode = !!canvas.closest(".monster-gallery-mode");
      const cssSize = galleryMode
        ? (def.category === "boss" ? 148 : 132)
        : (def.category === "boss" ? 132 : def.category === "elite" ? 118 : 108);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = cssSize * dpr;
      canvas.height = cssSize * dpr;
      canvas.style.width = `${cssSize}px`;
      canvas.style.height = `${cssSize}px`;
      const ctx = canvas.getContext("2d");
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, cssSize, cssSize);

      const gradient = ctx.createLinearGradient(0, 0, cssSize, cssSize);
      gradient.addColorStop(0, "rgba(243, 255, 249, 0.25)");
      gradient.addColorStop(0.42, "rgba(159, 217, 207, 0.16)");
      gradient.addColorStop(1, "rgba(23, 63, 66, 0.7)");
      ctx.fillStyle = gradient;
      ctx.strokeStyle = unlocked ? "rgba(255, 241, 189, 0.72)" : "rgba(191, 238, 228, 0.32)";
      ctx.lineWidth = 1.4;
      monsterRoundRectPath(ctx, 4, 4, cssSize - 8, cssSize - 8, 24);
      ctx.fill();
      ctx.stroke();

      ctx.strokeStyle = "rgba(255, 241, 189, 0.28)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(14, cssSize - 20);
      ctx.quadraticCurveTo(cssSize * 0.5, cssSize - 30, cssSize - 14, cssSize - 20);
      ctx.stroke();

      if (!unlocked) {
        ctx.save();
        ctx.globalAlpha = 0.45;
        ctx.translate(cssSize / 2, cssSize * 0.58);
        monsterMist(ctx, "#0b1b1e", cssSize * 0.36, 0);
        ctx.fillStyle = "rgba(23, 63, 66, 0.88)";
        ctx.beginPath();
        ctx.ellipse(0, -4, cssSize * 0.17, cssSize * 0.23, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#fff1bd";
        ctx.font = `bold ${Math.round(cssSize * 0.28)}px KaiTi, SimSun, serif`;
        ctx.textAlign = "center";
        ctx.fillText("?", 0, 6);
        ctx.restore();
        return;
      }

      const t = performance.now() / 1000;
      const galleryScales = {
        foxDemon: 1.14,
        shrimpDemon: 0.98,
        boarDragon: 1.1,
        frogDemon: 1.18,
        lampGranny: 1.1,
        stoneArmor: 1.08,
        yaksha: 1.02,
        wingDemon: 0.98,
      };
      const compactScales = {
        foxDemon: 1.02,
        shrimpDemon: 0.78,
        boarDragon: 0.98,
        frogDemon: 1.08,
        lampGranny: 0.98,
        stoneArmor: 0.96,
        yaksha: 0.9,
        wingDemon: 0.88,
      };
      const scale = galleryMode
        ? (def.category === "boss" ? 1.34 : galleryScales[key] || 1.06)
        : (def.category === "boss" ? 1.2 : compactScales[key] || 0.94);
      const drawX = key === "foxDemon" || key === "nineTailShade"
        ? cssSize * 0.57
        : key === "shrimpDemon"
          ? cssSize * 0.43
          : cssSize / 2;
      drawMonsterIllustration(ctx, key, drawX, cssSize * 0.65, scale, "gallery", { time: t });
    }

    drawMonsterPortraitShape(ctx, key) {
      const drawEyes = (mode = "dot") => {
        ctx.save();
        ctx.fillStyle = "#ff6b57";
        ctx.strokeStyle = "#ff6b57";
        ctx.shadowColor = "#ff6b57";
        ctx.shadowBlur = 4;
        if (mode === "slash") {
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(-9, -4);
          ctx.lineTo(-3, -3);
          ctx.moveTo(9, -4);
          ctx.lineTo(3, -3);
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.arc(-5.5, -4, 2, 0, Math.PI * 2);
          ctx.arc(5.5, -4, 2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      };
      const drawHorns = (color = "#f5d78a", spread = 8, height = 15) => {
        ctx.strokeStyle = color;
        ctx.lineWidth = 2.5;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(-spread, -11);
        ctx.quadraticCurveTo(-spread - 8, -height, -spread - 10, -4);
        ctx.moveTo(spread, -11);
        ctx.quadraticCurveTo(spread + 8, -height, spread + 10, -4);
        ctx.stroke();
      };

      if (key === "foxDemon") {
        this.drawPortraitMist(ctx, 17, "#442d38");
        ctx.strokeStyle = "rgba(255, 188, 114, 0.78)";
        ctx.lineWidth = 7;
        ctx.beginPath();
        ctx.moveTo(-2, 9);
        ctx.quadraticCurveTo(-20, 3, -16, -12);
        ctx.stroke();
        ctx.fillStyle = "#c97844";
        ctx.beginPath();
        ctx.ellipse(0, 0, 11, 15, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#f0aa73";
        ctx.beginPath();
        ctx.moveTo(-7, -11);
        ctx.lineTo(-15, -23);
        ctx.lineTo(-2, -16);
        ctx.moveTo(7, -11);
        ctx.lineTo(15, -23);
        ctx.lineTo(2, -16);
        ctx.fill();
        ctx.fillStyle = "#fff1bd";
        ctx.beginPath();
        ctx.ellipse(0, 7, 5, 4, 0, 0, Math.PI * 2);
        ctx.fill();
        drawEyes("slash");
      } else if (key === "dogDemon") {
        this.drawPortraitMist(ctx, 16, "#0b1b1e");
        ctx.fillStyle = "#202d2c";
        ctx.beginPath();
        ctx.moveTo(0, -18);
        ctx.quadraticCurveTo(14, -9, 8, 15);
        ctx.lineTo(0, 11);
        ctx.lineTo(-8, 15);
        ctx.quadraticCurveTo(-14, -9, 0, -18);
        ctx.fill();
        ctx.strokeStyle = "#e9b85f";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(-8, -12);
        ctx.lineTo(-16, -23);
        ctx.moveTo(8, -12);
        ctx.lineTo(16, -23);
        ctx.stroke();
        ctx.fillStyle = "#a85f35";
        ctx.fillRect(-9, 8, 18, 4);
        drawEyes("slash");
      } else if (key === "shrimpDemon") {
        ctx.strokeStyle = "rgba(127, 209, 216, 0.75)";
        ctx.lineWidth = 1.2;
        for (const side of [-1, 1]) {
          ctx.beginPath();
          ctx.moveTo(side * 3, -13);
          ctx.quadraticCurveTo(side * 20, -20, side * 22, -3);
          ctx.stroke();
        }
        for (let i = 0; i < 4; i += 1) {
          ctx.fillStyle = i % 2 ? "#2f7470" : "#d96943";
          ctx.beginPath();
          ctx.ellipse(0, -8 + i * 6, 9 - i, 5, 0, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.strokeStyle = "#f5d78a";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(-12, 3, 5, -1.2, 1.2);
        ctx.arc(12, 3, 5, Math.PI - 1.2, Math.PI + 1.2);
        ctx.stroke();
        drawEyes("slash");
      } else if (key === "boarDragon") {
        this.drawPortraitMist(ctx, 20, "#2a211c");
        ctx.fillStyle = "#6b4b3a";
        ctx.beginPath();
        ctx.ellipse(0, 0, 17, 13, 0, 0, Math.PI * 2);
        ctx.fill();
        drawHorns("#e9b85f", 9, 23);
        ctx.fillStyle = "#f3fff9";
        ctx.beginPath();
        ctx.moveTo(-8, 2);
        ctx.lineTo(-16, 8);
        ctx.lineTo(-5, 8);
        ctx.moveTo(8, 2);
        ctx.lineTo(16, 8);
        ctx.lineTo(5, 8);
        ctx.fill();
        ctx.strokeStyle = "#9fd9cf";
        ctx.lineWidth = 1.1;
        ctx.beginPath();
        ctx.moveTo(-5, -3);
        ctx.quadraticCurveTo(-18, 0, -20, -7);
        ctx.moveTo(5, -3);
        ctx.quadraticCurveTo(18, 0, 20, -7);
        ctx.stroke();
        drawEyes();
      } else if (key === "frogDemon") {
        this.drawPortraitMist(ctx, 17, "#163d31");
        ctx.fillStyle = "#5f9d62";
        ctx.beginPath();
        ctx.ellipse(0, 3, 16, 12, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#79b76e";
        for (const side of [-1, 1]) {
          ctx.beginPath();
          ctx.ellipse(side * 7, -10, 5, 4, 0, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.fillStyle = "#d7fff5";
        ctx.beginPath();
        ctx.ellipse(0, 7, 8, 5, 0, 0, Math.PI * 2);
        ctx.fill();
        drawEyes();
      } else if (key === "lampGranny") {
        this.drawPortraitMist(ctx, 18, "#4a211e");
        ctx.fillStyle = "#6a3a34";
        ctx.beginPath();
        ctx.moveTo(-11, 16);
        ctx.quadraticCurveTo(0, -20, 11, 16);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = "#fff1bd";
        ctx.beginPath();
        ctx.arc(0, -7, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#ff6b57";
        ctx.beginPath();
        ctx.moveTo(0, -25);
        ctx.quadraticCurveTo(9, -12, 0, -5);
        ctx.quadraticCurveTo(-9, -13, 0, -25);
        ctx.fill();
        drawEyes();
      } else if (key === "stoneArmor") {
        ctx.fillStyle = "#68736b";
        ctx.beginPath();
        ctx.moveTo(0, -20);
        ctx.lineTo(16, -5);
        ctx.lineTo(11, 16);
        ctx.lineTo(-11, 16);
        ctx.lineTo(-16, -5);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = "rgba(255, 241, 189, 0.55)";
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(-7, -8);
        ctx.lineTo(-1, 0);
        ctx.lineTo(-5, 11);
        ctx.moveTo(7, -8);
        ctx.lineTo(1, 2);
        ctx.lineTo(8, 12);
        ctx.stroke();
        drawEyes();
      } else if (key === "yaksha") {
        this.drawPortraitMist(ctx, 18, "#1b0d24");
        ctx.fillStyle = "#342447";
        ctx.beginPath();
        ctx.moveTo(0, -21);
        ctx.lineTo(15, -2);
        ctx.lineTo(8, 17);
        ctx.lineTo(0, 11);
        ctx.lineTo(-8, 17);
        ctx.lineTo(-15, -2);
        ctx.closePath();
        ctx.fill();
        drawHorns("#f5d78a", 7, 25);
        ctx.strokeStyle = "#f3fff9";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(-12, 5);
        ctx.lineTo(-20, 12);
        ctx.moveTo(12, 5);
        ctx.lineTo(20, 12);
        ctx.stroke();
        drawEyes("slash");
      } else if (key === "wingDemon") {
        const flap = 2;
        ctx.fillStyle = "rgba(20, 40, 43, 0.8)";
        for (const side of [-1, 1]) {
          ctx.beginPath();
          ctx.moveTo(side * 2, -4);
          ctx.quadraticCurveTo(side * 24, -16 - flap, side * 17, 10);
          ctx.quadraticCurveTo(side * 8, 3, side * 2, 6);
          ctx.fill();
        }
        ctx.fillStyle = "#253f43";
        ctx.beginPath();
        ctx.ellipse(0, 0, 7, 15, 0, 0, Math.PI * 2);
        ctx.fill();
        drawEyes("slash");
      } else if (key === "curseMage") {
        this.drawPortraitMist(ctx, 17, "#281b3e");
        ctx.strokeStyle = "rgba(255, 241, 189, 0.62)";
        ctx.beginPath();
        ctx.arc(0, 2, 18, 0.2, Math.PI * 1.55);
        ctx.stroke();
        ctx.fillStyle = "#3d2b57";
        ctx.beginPath();
        ctx.moveTo(0, -20);
        ctx.quadraticCurveTo(14, -5, 8, 17);
        ctx.quadraticCurveTo(0, 10, -8, 17);
        ctx.quadraticCurveTo(-14, -5, 0, -20);
        ctx.fill();
        ctx.strokeStyle = "#fff1bd";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(13, -16);
        ctx.lineTo(18, 16);
        ctx.stroke();
        drawEyes();
      } else if (key === "nineTailShade") {
        this.drawPortraitMist(ctx, 20, "#40284d");
        ctx.strokeStyle = "rgba(238, 208, 255, 0.58)";
        ctx.lineWidth = 4.8;
        for (let i = -2; i <= 2; i += 1) {
          ctx.beginPath();
          ctx.moveTo(i * 2, 10);
          ctx.quadraticCurveTo(i * 7 - 11, 1, i * 7 - 9, -16);
          ctx.stroke();
        }
        ctx.fillStyle = "rgba(182, 123, 174, 0.82)";
        ctx.beginPath();
        ctx.ellipse(0, 0, 10, 14, 0, 0, Math.PI * 2);
        ctx.fill();
        drawEyes("slash");
      } else if (key === "waterApe") {
        this.drawPortraitMist(ctx, 19, "#174c57");
        ctx.strokeStyle = "rgba(127, 209, 216, 0.72)";
        for (let i = 0; i < 3; i += 1) {
          ctx.beginPath();
          ctx.ellipse(0, 8 + i * 2, 13 + i * 4, 4, 0, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.fillStyle = "#2d6e78";
        ctx.beginPath();
        ctx.ellipse(0, 0, 13, 16, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#173f42";
        for (const side of [-1, 1]) {
          ctx.beginPath();
          ctx.ellipse(side * 14, 3, 5, 13, side * 0.25, 0, Math.PI * 2);
          ctx.fill();
        }
        drawEyes();
      } else if (key === "blackWind") {
        ctx.fillStyle = "rgba(18, 21, 24, 0.88)";
        for (let i = 0; i < 4; i += 1) {
          ctx.beginPath();
          ctx.ellipse(Math.cos(i) * 2, Math.sin(i) * 2, 16 - i, 7 + i * 1.5, i * 0.8, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.strokeStyle = "rgba(159, 217, 207, 0.56)";
        for (let i = 0; i < 3; i += 1) {
          ctx.beginPath();
          ctx.arc(0, 0, 8 + i * 5, i, i + Math.PI * 1.15);
          ctx.stroke();
        }
        drawEyes();
      } else if (key === "boneDemon") {
        ctx.strokeStyle = "#e8f7ef";
        ctx.lineWidth = 3;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(0, -7);
        ctx.lineTo(0, 13);
        ctx.moveTo(-8, -1);
        ctx.lineTo(8, -1);
        ctx.moveTo(-4, 11);
        ctx.lineTo(-11, 20);
        ctx.moveTo(4, 11);
        ctx.lineTo(11, 20);
        ctx.stroke();
        ctx.fillStyle = "#f3fff9";
        ctx.beginPath();
        ctx.ellipse(0, -15, 8, 7, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#ff6b57";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.quadraticCurveTo(-10, 5, 13, 3);
        ctx.stroke();
        drawEyes();
      } else if (key === "bullVanguard") {
        this.drawPortraitMist(ctx, 21, "#351b19");
        ctx.fillStyle = "#5c2e28";
        ctx.beginPath();
        ctx.ellipse(0, 2, 16, 15, 0, 0, Math.PI * 2);
        ctx.fill();
        drawHorns("#f5d78a", 11, 26);
        ctx.strokeStyle = "#ff6b57";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(-5, -10);
        ctx.lineTo(1, 10);
        ctx.moveTo(6, -8);
        ctx.lineTo(-1, 11);
        ctx.stroke();
        drawEyes();
      } else if (key === "bossBlackWind" || key === "bossYellowWind" || key === "bossBoneLady" || key === "bossBullKing") {
        const bossColor = key === "bossBullKing" ? "#5b2b26" : key === "bossBoneLady" ? "#e8f7ef" : key === "bossYellowWind" ? "#806136" : "#20282c";
        this.drawPortraitMist(ctx, 22, key === "bossYellowWind" ? "#806136" : "#111719");
        ctx.fillStyle = bossColor;
        ctx.beginPath();
        ctx.moveTo(0, -22);
        ctx.bezierCurveTo(21, -16, 19, 11, 5, 20);
        ctx.lineTo(0, 17);
        ctx.lineTo(-5, 20);
        ctx.bezierCurveTo(-19, 11, -21, -16, 0, -22);
        ctx.fill();
        drawHorns(key === "bossBoneLady" ? "#9fd9cf" : "#f5d78a", 10, 27);
        if (key === "bossBoneLady") {
          ctx.strokeStyle = "#ff6b57";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.quadraticCurveTo(-14, 9, 14, 8);
          ctx.stroke();
        }
        drawEyes(key === "bossBullKing" ? "dot" : "slash");
      }
    }

    drawPortraitMist(ctx, r, color) {
      ctx.save();
      ctx.globalAlpha = 0.26;
      ctx.fillStyle = color;
      for (let i = 0; i < 3; i += 1) {
        ctx.beginPath();
        ctx.ellipse(Math.sin(i) * 2, 13 + i * 2, r + i * 3, 5, 0, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    renderAchievements() {
      if (!this.dom.achievementList) return;
      const unlocked = this.saveManager.data.achievements.unlocked || {};
      this.dom.achievementList.innerHTML = "";
      for (const [id, def] of Object.entries(ACHIEVEMENT_DEFS)) {
        const done = !!unlocked[id];
        const card = document.createElement("article");
        card.className = `system-card ${done ? "equipped" : "locked"}`;
        card.innerHTML = `
          <span class="system-icon">${done ? "成" : "未"}</span>
          <div class="system-copy">
            <strong>${def.name}</strong>
            <p>${def.desc}</p>
            <div class="system-tags"><span>${done ? "已完成" : "未完成"}</span></div>
          </div>
        `;
        this.dom.achievementList.appendChild(card);
      }
    }

    showCompanionInvite() {
      const pending = this.saveManager.data.companions.pendingInvites || [];
      if (!pending.length || !this.dom.companionOverlay) return false;
      const invited = new Set(this.saveManager.data.companions.invited || []);
      const eligible = HERO_IDS.filter((id) => id !== this.saveManager.data.selectedHero && !invited.has(id));
      if (!eligible.length) return false;
      this.dom.companionList.innerHTML = "";
      for (const id of eligible) {
        const hero = HERO_DEFS[id];
        const companion = COMPANION_DEFS[id];
        const button = document.createElement("button");
        button.type = "button";
        button.className = "hero-card";
        button.innerHTML = `
          <canvas class="hero-portrait" width="72" height="72" data-hero="${id}"></canvas>
          <div class="hero-copy">
            <strong>${hero.name}</strong>
            <p>${companion.skill}：${companion.desc}</p>
            <div class="hero-tags"><span>助战技能</span><span>${hero.role}</span></div>
          </div>
        `;
        button.addEventListener("click", () => {
          if (!window.confirm(`确定邀请 ${hero.name} 共同作战吗？`)) return;
          const result = this.saveManager.inviteCompanion(id);
          this.showToast(result.message);
          this.closeCompanionInvite();
          this.renderHome();
        });
        this.dom.companionList.appendChild(button);
      }
      this.drawHeroPortraits(this.dom.companionList);
      this.dom.companionOverlay.classList.remove("hidden");
      return true;
    }

    closeCompanionInvite() {
      if (this.dom.companionOverlay) this.dom.companionOverlay.classList.add("hidden");
      if (this.state === "companions") {
        this.state = "home";
        this.dom.homeOverlay.classList.remove("hidden");
      }
      this.renderHome();
    }

    openCompanions() {
      if (!this.dom.companionOverlay) return;
      this.state = "companions";
      this.dom.homeOverlay.classList.add("hidden");
      this.renderCompanionPanel(false);
      this.dom.companionOverlay.classList.remove("hidden");
    }

    renderCompanionPanel(inviteOnly = false) {
      if (!this.dom.companionList) return false;
      const save = this.saveManager.data;
      const invited = new Set(save.companions.invited || []);
      const pendingCount = (save.companions.pendingInvites || []).length;
      const ids = inviteOnly
        ? HERO_IDS.filter((id) => id !== save.selectedHero && !invited.has(id))
        : HERO_IDS.filter((id) => id !== save.selectedHero);
      this.dom.companionList.innerHTML = "";
      for (const id of ids) {
        const hero = HERO_DEFS[id];
        const companion = COMPANION_DEFS[id];
        const joined = invited.has(id);
        const progress = save.companionProgress[id] || { level: 1 };
        const level = clamp(Math.floor(progress.level || 1), 1, 20);
        const cost = getCompanionUpgradeCost(level);
        const card = document.createElement("article");
        card.className = `hero-card ${joined ? "selected" : ""}`;
        card.innerHTML = `
          <canvas class="hero-portrait" width="72" height="72" data-hero="${id}"></canvas>
          <div class="hero-copy">
            <strong>${hero.name} · ${companion.skill} · Lv.${level}</strong>
            <p>${companion.desc}</p>
            <div class="hero-tags"><span>${joined ? "已加入" : "未邀请"}</span><span>${hero.role}</span></div>
            <div class="hero-actions"></div>
          </div>
        `;
        const actions = card.querySelector(".hero-actions");
        if (joined) {
          const upgradeBtn = document.createElement("button");
          upgradeBtn.type = "button";
          upgradeBtn.className = "primary-button mini";
          upgradeBtn.textContent = level >= 20 ? "已满级" : `升级 ${cost} 灵石`;
          upgradeBtn.disabled = level >= 20;
          upgradeBtn.addEventListener("click", () => {
            const result = this.saveManager.upgradeCompanion(id);
            this.showToast(result.message);
            this.renderCompanionPanel(inviteOnly);
            this.renderHome();
          });
          actions.appendChild(upgradeBtn);
        } else {
          const inviteBtn = document.createElement("button");
          inviteBtn.type = "button";
          inviteBtn.className = "ghost-button";
          inviteBtn.textContent = pendingCount ? "邀请" : "暂无邀请";
          inviteBtn.disabled = !pendingCount;
          inviteBtn.addEventListener("click", () => {
            if (!window.confirm(`确定邀请 ${hero.name} 共同作战吗？`)) return;
            const result = this.saveManager.inviteCompanion(id);
            this.showToast(result.message);
            if (result.ok && this.lastResult) {
              this.lastResult.pendingCompanionInvite = false;
              this.configureResultButtons(this.lastResult.victory);
              if (this.dom.resultUnlockNotice && this.lastResult.nextLevelName) {
                this.dom.resultUnlockNotice.textContent = `伙伴已入阵，下一关已解锁：${this.lastResult.nextLevelName}`;
                this.dom.resultUnlockNotice.classList.remove("hidden");
              }
            }
            this.renderCompanionPanel(inviteOnly);
            this.renderHome();
            if (result.ok && inviteOnly) this.closeCompanionInvite();
          });
          actions.appendChild(inviteBtn);
        }
        this.dom.companionList.appendChild(card);
      }
      this.drawHeroPortraits(this.dom.companionList);
      return ids.length > 0;
    }

    showCompanionInvite() {
      const pending = this.saveManager.data.companions.pendingInvites || [];
      if (!pending.length || !this.dom.companionOverlay) return false;
      if (!this.renderCompanionPanel(true)) return false;
      this.dom.companionOverlay.classList.remove("hidden");
      return true;
    }

    closeCompanionInvite() {
      if (this.dom.companionOverlay) this.dom.companionOverlay.classList.add("hidden");
      if (this.state === "companions") {
        this.state = "home";
        this.dom.homeOverlay.classList.remove("hidden");
      }
      this.renderHome();
    }

    renderLevelSelector() {
      if (!this.dom.levelList) return;
      const save = this.saveManager.data;
      const selectedLevel = getLevelById(this.selectedLevelId);
      this.dom.selectedTrialText.textContent = `当前试炼：${selectedLevel.order}. ${selectedLevel.name} · ${formatTime(selectedLevel.duration)} · 奖励 x${selectedLevel.rewardMultiplier}`;
      this.dom.levelList.innerHTML = "";
      for (const level of LEVEL_LIST) {
        if ([1, 11, 21, 31].includes(level.order)) {
          const title = document.createElement("div");
          title.className = "level-group-title";
          title.textContent = getRealmByOrder(level.order).name;
          this.dom.levelList.appendChild(title);
        }
        const state = save.levels[level.id] || createDefaultLevels()[level.id];
        const unlocked = state?.unlocked;
        const cleared = state?.cleared;
        const button = document.createElement("button");
        const currentChallenge = unlocked && !cleared && this.selectedLevelId === level.id;
        button.type = "button";
        button.className = `level-card ${this.selectedLevelId === level.id ? "selected" : ""} ${currentChallenge ? "current" : ""} ${unlocked ? "" : "locked"}`;
        const stars = "★★★★★".slice(0, getLevelStars(level));
        const enemies = (level.enemyTypes || []).slice(0, 4).map((id) => ENEMY_TYPES[id]?.name || id).join("、");
        button.innerHTML = `
          <div class="level-card-top">
            <strong>${level.order}. ${level.name}</strong>
            <span class="level-state ${unlocked ? cleared ? "cleared" : "" : "locked"}">${unlocked ? cleared ? "已镇守" : "已解封" : "未解封"}</span>
          </div>
          <p>${level.realm || level.recommendedRealm} · ${level.description}</p>
          <div class="level-card-meta">
            <span>时长 ${formatTime(level.duration)}</span>
            <span>难度 ${stars}</span>
            <span>奖励 x${level.rewardMultiplier}</span>
            <span>${level.boss ? "Boss" : level.eliteChance ? "精英" : "妖潮"}</span>
            <span>${enemies}</span>
          </div>
          <div class="level-card-records">
            <span>斩妖 ${state.bestKills}</span>
            <span>境界 ${state.bestLevel}</span>
            <span>存活 ${formatTime(state.bestSurvivalTime)}</span>
            <span>镇守 ${state.clearCount}</span>
          </div>
        `;
        button.addEventListener("click", () => {
          if (!unlocked) {
            this.showToast("请先通关上一关");
            return;
          }
          this.selectedLevelId = level.id;
          this.currentLevelConfig = level;
          this.saveManager.data.selectedLevelId = level.id;
          this.saveManager.save();
          this.renderLevelSelector();
        });
        this.dom.levelList.appendChild(button);
      }
    }

    renderSoundToggle() {
      if (!this.dom.soundToggleBtn) return;
      this.dom.soundToggleBtn.textContent = this.audio.enabled ? "音效：开" : "音效：关";
      this.dom.soundToggleBtn.classList.toggle("muted", !this.audio.enabled);
    }

    renderCultivation() {
      const save = this.saveManager.data;
      this.dom.cultivationCoins.textContent = save.coins;
      this.renderGemList();
      this.renderTalentList();
    }

    renderGemList() {
      this.dom.gemList.innerHTML = "";
      for (const [id, def] of Object.entries(GEM_DEFS)) {
        const gem = this.saveManager.data.gems[id];
        const cost = getGemNextCost(gem.level);
        const card = document.createElement("article");
        card.className = "growth-card";
        card.innerHTML = `
          <div class="growth-card-title">
            <strong>${def.name}</strong>
            <span class="level-tag">Lv.${gem.level}</span>
          </div>
          <div class="growth-meta">
            <div><span>持有碎晶</span><strong>${gem.shards}</strong></div>
            <div><span>下阶所需</span><strong>${cost}</strong></div>
            <div><span>当前灵效</span><strong>${def.current(gem.level)}</strong></div>
            <div><span>下阶灵效</span><strong>${def.current(gem.level + 1)}</strong></div>
          </div>
        `;
        const button = document.createElement("button");
        button.type = "button";
        button.className = `growth-button ${gem.shards >= cost ? "can-upgrade" : ""}`;
        button.textContent = "镶嵌升级";
        button.addEventListener("click", () => {
          const result = this.saveManager.upgradeGem(id);
          this.showToast(result.message);
          this.renderHome();
          this.renderCultivation();
        });
        card.appendChild(button);
        this.dom.gemList.appendChild(card);
      }
    }

    renderTalentList() {
      this.dom.talentList.innerHTML = "";
      this.saveManager.data.journeyTraining = normalizeJourneyTraining(
        this.saveManager.data.journeyTraining || {},
        this.saveManager.data.talents || {},
      );
      for (const [id, def] of Object.entries(JOURNEY_TRAINING_DEFS)) {
        const level = this.saveManager.data.journeyTraining[id] || 0;
        const maxed = level >= def.max;
        const cost = maxed ? 0 : getJourneyTrainingNextCost(id, level);
        const card = document.createElement("article");
        card.className = "growth-card";
        card.innerHTML = `
          <div class="growth-card-title">
            <strong>${def.name}</strong>
            <span class="level-tag">Lv.${level}/${def.max}</span>
          </div>
          <div class="growth-meta">
            <div><span>当前功效</span><strong>${def.current(level)}</strong></div>
            <div><span>下阶功效</span><strong>${maxed ? "已圆满" : def.next(level)}</strong></div>
            <div><span>修炼消耗</span><strong>${maxed ? "-" : `${cost} 灵石`}</strong></div>
            <div><span>当前灵石</span><strong>${this.saveManager.data.coins}</strong></div>
          </div>
          <p class="growth-note">${def.applies}</p>
        `;
        const button = document.createElement("button");
        button.type = "button";
        const canUpgrade = !maxed && this.saveManager.data.coins >= cost;
        button.className = `growth-button ${maxed ? "maxed" : ""} ${canUpgrade ? "can-upgrade" : ""}`;
        button.disabled = maxed;
        button.textContent = maxed ? "已圆满" : "修行升级";
        button.addEventListener("click", () => {
          const result = this.saveManager.upgradeJourneyTraining(id);
          this.showToast(result.message);
          this.renderHome();
          this.renderCultivation();
        });
        card.appendChild(button);
        this.dom.talentList.appendChild(card);
      }
    }

    renderSkillStrip() {
      if (!this.dom.skillStrip) return;
      this.dom.skillStrip.innerHTML = "";
      for (const id of SKILL_ORDER) {
        const skill = this.skills[id];
        const theme = this.getSkillTheme(id);
        const item = document.createElement("div");
        item.className = `skill-chip skill-${id} ${skill.enabled ? "" : "locked"}`;
        item.style.setProperty("--skill-color", theme.color || "#fff1bd");
        item.style.setProperty("--skill-accent", theme.accent || "#9fd9cf");
        const value = skill.enabled ? `Lv.${skill.level}` : "未悟";
        item.innerHTML = `<span class="skill-icon">${theme.icon || this.getSkillIcon(id)}</span><strong>${theme.name || this.getSkillLabel(id)}</strong><span>${value}</span>`;
        this.dom.skillStrip.appendChild(item);
      }
      for (const id of this.companionIds || []) {
        const def = COMPANION_DEFS[id];
        if (!def) continue;
        const item = document.createElement("div");
        item.className = "skill-chip companion-chip";
        item.innerHTML = `<span class="skill-icon">${def.name.slice(0, 1)}</span><strong>${def.skill}</strong><span>助战 Lv.${this.getCompanionLevel(id)}</span>`;
        this.dom.skillStrip.appendChild(item);
      }
    }

    showToast(message) {
      window.clearTimeout(this.toastTimer);
      this.dom.toast.textContent = message;
      this.dom.toast.classList.remove("hidden");
      this.toastTimer = window.setTimeout(() => {
        this.dom.toast.classList.add("hidden");
      }, 1800);
    }

    draw() {
      const ctx = this.ctx;
      ctx.clearRect(0, 0, this.width, this.height);
      ctx.save();
      if (this.shakeTime > 0 && this.screenShake > 0) {
        const amount = this.screenShake * (this.shakeTime / Math.max(this.shakeTime, 0.001));
        ctx.translate(rand(-amount, amount), rand(-amount, amount));
      }
      this.drawBackground(ctx);
      for (const area of this.areaEffects) area.draw(ctx);
      for (const enemy of this.enemies) enemy.draw(ctx, this);
      for (const projectile of this.projectiles) projectile.draw(ctx);
      for (const bolt of this.lightningEffects) this.drawBolt(ctx, bolt);
      for (const particle of this.particles) particle.draw(ctx);
      for (const text of this.floatingTexts) text.draw(ctx);
      this.drawWall(ctx);
      this.drawBossBar(ctx);
      this.drawBattleBounds(ctx);
      ctx.restore();
      if (this.flashAlpha > 0) {
        ctx.save();
        ctx.globalAlpha = this.flashAlpha;
        ctx.fillStyle = "#f3fff9";
        ctx.fillRect(0, 0, this.width, this.height);
        ctx.restore();
      }
      if (this.redFlashAlpha > 0) {
        ctx.save();
        ctx.globalAlpha = this.redFlashAlpha;
        ctx.fillStyle = "#ff6b57";
        ctx.fillRect(0, 0, this.width, this.height);
        ctx.restore();
      }
      if (this.state === "paused") this.drawPause(ctx);
    }

    drawBackground(ctx) {
      const progress = clamp(this.elapsed / this.currentLevelConfig.duration, 0, 1);
      const sky = ctx.createLinearGradient(0, 0, 0, this.height);
      sky.addColorStop(0, progress > 0.75 ? "#1f5657" : "#2f7470");
      sky.addColorStop(0.5, "#4f9a91");
      sky.addColorStop(1, "#bfeee4");
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, this.width, this.height);

      ctx.save();
      ctx.globalAlpha = 0.46;
      const moonX = this.width * 0.78;
      const moonY = this.height * 0.12;
      ctx.fillStyle = "rgba(255, 241, 189, 0.22)";
      ctx.beginPath();
      ctx.arc(moonX, moonY, Math.min(44, this.width * 0.11), 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "rgba(243, 255, 249, 0.12)";
      ctx.beginPath();
      ctx.arc(moonX, moonY, Math.min(70, this.width * 0.17), 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      const fogAlpha = progress < 0.25 ? 0.08 : progress < 0.5 ? 0.12 : progress < 0.75 ? 0.17 : 0.24;
      const fog = ctx.createRadialGradient(this.width / 2, 0, 20, this.width / 2, 0, this.width * 0.8);
      fog.addColorStop(0, `rgba(74, 55, 90, ${fogAlpha})`);
      fog.addColorStop(0.55, `rgba(255, 107, 87, ${fogAlpha * 0.2})`);
      fog.addColorStop(1, "rgba(74, 55, 90, 0)");
      ctx.fillStyle = fog;
      ctx.fillRect(0, 0, this.width, this.wallY);

      const gateFog = ctx.createLinearGradient(0, this.battleTop - 22, 0, this.battleTop + 18);
      gateFog.addColorStop(0, "rgba(23, 63, 66, 0)");
      gateFog.addColorStop(0.5, "rgba(159, 217, 207, 0.16)");
      gateFog.addColorStop(1, "rgba(23, 63, 66, 0)");
      ctx.fillStyle = gateFog;
      ctx.fillRect(0, this.battleTop - 24, this.width, 48);
      ctx.save();
      ctx.strokeStyle = "rgba(255, 241, 189, 0.34)";
      ctx.lineWidth = 1;
      ctx.setLineDash([9, 8]);
      ctx.beginPath();
      ctx.moveTo(18, this.battleTop);
      ctx.lineTo(this.width - 18, this.battleTop);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();

      ctx.save();
      ctx.globalAlpha = 0.18;
      ctx.strokeStyle = "#fff1bd";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(this.width * 0.5, this.wallY * 0.42, this.width * 0.27, 0, Math.PI * 2);
      ctx.arc(this.width * 0.5, this.wallY * 0.42, this.width * 0.2, 0, Math.PI * 2);
      ctx.stroke();
      for (let i = 0; i < 8; i += 1) {
        const a = (Math.PI * 2 * i) / 8 + progress * 0.5;
        ctx.beginPath();
        ctx.moveTo(this.width * 0.5 + Math.cos(a) * this.width * 0.11, this.wallY * 0.42 + Math.sin(a) * this.width * 0.11);
        ctx.lineTo(this.width * 0.5 + Math.cos(a) * this.width * 0.24, this.wallY * 0.42 + Math.sin(a) * this.width * 0.24);
        ctx.stroke();
      }
      ctx.restore();

      for (const mote of this.auraParticles) {
        ctx.globalAlpha = mote.alpha * (0.7 + progress * 0.18);
        ctx.fillStyle = mote.phase % 2 > 1 ? "#f3fff9" : "#fff1bd";
        ctx.beginPath();
        ctx.arc(mote.x, mote.y, mote.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      ctx.save();
      ctx.globalAlpha = 0.22;
      ctx.fillStyle = "#f3fff9";
      for (let i = 0; i < 5; i += 1) {
        const y = this.wallY * (0.23 + i * 0.14);
        const drift = Math.sin(this.elapsed * 0.12 + i) * 18;
        ctx.beginPath();
        ctx.ellipse(this.width * (0.16 + i * 0.18) + drift, y, this.width * 0.24, 12 + i * 2, 0, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      this.drawMountainLayer(ctx, this.wallY - 116, "rgba(35, 94, 91, 0.45)", [
        [0, 52], [0.16, 18], [0.28, 60], [0.46, 12], [0.62, 58], [0.8, 24], [1, 68],
      ]);
      this.drawMountainLayer(ctx, this.wallY - 78, "rgba(23, 63, 66, 0.5)", [
        [0, 42], [0.22, 6], [0.44, 58], [0.68, 0], [1, 58],
      ]);

      ctx.save();
      ctx.globalAlpha = 0.18;
      ctx.strokeStyle = "#f3fff9";
      ctx.lineWidth = 1;
      for (let y = this.wallY - 52; y < this.wallY + 8; y += 16) {
        ctx.beginPath();
        for (let x = 0; x <= this.width; x += 20) {
          const waveY = y + Math.sin(x * 0.035 + this.elapsed * 0.8) * 3;
          if (x === 0) ctx.moveTo(x, waveY);
          else ctx.lineTo(x, waveY);
        }
        ctx.stroke();
      }
      ctx.restore();

      if (progress > 0.9) {
        ctx.fillStyle = "rgba(255, 107, 87, 0.07)";
        ctx.fillRect(0, 0, this.width, this.height);
      }
    }

    drawMountainLayer(ctx, baseY, color, points) {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(0, this.wallY);
      for (const [xRate, yOffset] of points) {
        ctx.lineTo(this.width * xRate, baseY + yOffset);
      }
      ctx.lineTo(this.width, this.wallY);
      ctx.closePath();
      ctx.fill();
    }

    drawWall(ctx) {
      const hpRate = clamp(this.wallHp / this.maxWallHp, 0, 1);
      const wallTop = this.wallY;
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, wallTop, this.width, this.height - wallTop);
      ctx.clip();
      ctx.fillStyle = "rgba(191, 238, 228, 0.28)";
      ctx.fillRect(0, wallTop, this.width, this.wallHeight);

      const wallGrad = ctx.createLinearGradient(0, wallTop, 0, this.height);
      wallGrad.addColorStop(0, this.wallHitFlash > 0 ? "#ffb3a8" : "#d7fff5");
      wallGrad.addColorStop(0.42, "#9fd9cf");
      wallGrad.addColorStop(1, "#2f7470");
      ctx.fillStyle = wallGrad;
      ctx.fillRect(0, wallTop + 18, this.width, this.wallHeight - 18);

      ctx.fillStyle = "rgba(49, 91, 87, 0.48)";
      ctx.fillRect(0, wallTop + 10, this.width, 12);
      ctx.fillStyle = "rgba(243, 255, 249, 0.58)";
      for (let x = -12; x < this.width; x += 34) {
        ctx.fillRect(x, wallTop + 6, 24, 18);
      }

      const center = this.width / 2;
      const gateW = Math.min(170, this.width * 0.48);
      const roofY = wallTop + 6;
      ctx.fillStyle = "rgba(49, 91, 87, 0.9)";
      ctx.beginPath();
      ctx.moveTo(center - gateW * 0.58, roofY + 22);
      ctx.quadraticCurveTo(center - gateW * 0.18, roofY - 8, center, roofY + 4);
      ctx.quadraticCurveTo(center + gateW * 0.18, roofY - 8, center + gateW * 0.58, roofY + 22);
      ctx.lineTo(center + gateW * 0.5, roofY + 27);
      ctx.lineTo(center - gateW * 0.5, roofY + 27);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = "rgba(255, 241, 189, 0.82)";
      ctx.lineWidth = 1.6;
      ctx.stroke();

      ctx.fillStyle = "rgba(243, 255, 249, 0.7)";
      ctx.fillRect(center - gateW * 0.32, wallTop + 30, 12, 34);
      ctx.fillRect(center + gateW * 0.32 - 12, wallTop + 30, 12, 34);
      ctx.fillStyle = "rgba(23, 63, 66, 0.72)";
      ctx.fillRect(center - gateW * 0.18, wallTop + 38, gateW * 0.36, 28);
      ctx.strokeStyle = "rgba(255, 241, 189, 0.62)";
      ctx.strokeRect(center - gateW * 0.18, wallTop + 38, gateW * 0.36, 28);

      ctx.fillStyle = "rgba(255, 241, 189, 0.95)";
      ctx.font = "bold 13px KaiTi, SimSun, serif";
      ctx.textAlign = "center";
      ctx.fillText("西行门", center, wallTop + 30);

      ctx.fillStyle = "rgba(255, 107, 87, 0.46)";
      ctx.beginPath();
      ctx.moveTo(center - gateW * 0.48, wallTop + 27);
      ctx.lineTo(center - gateW * 0.48, wallTop + 55);
      ctx.lineTo(center - gateW * 0.42, wallTop + 49);
      ctx.lineTo(center - gateW * 0.48, wallTop + 43);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(center + gateW * 0.48, wallTop + 27);
      ctx.lineTo(center + gateW * 0.48, wallTop + 55);
      ctx.lineTo(center + gateW * 0.42, wallTop + 49);
      ctx.lineTo(center + gateW * 0.48, wallTop + 43);
      ctx.fill();

      ctx.strokeStyle = "rgba(255, 241, 189, 0.54)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, wallTop + 22);
      ctx.lineTo(this.width, wallTop + 22);
      ctx.stroke();

      ctx.strokeStyle = "rgba(49, 91, 87, 0.24)";
      ctx.lineWidth = 1;
      for (let x = 10; x < this.width; x += 34) {
        ctx.beginPath();
        ctx.moveTo(x, wallTop + 28);
        ctx.lineTo(x + 22, wallTop + 28);
        ctx.moveTo(x - 6, wallTop + 48);
        ctx.lineTo(x + 20, wallTop + 48);
        ctx.stroke();
      }

      const damageRate = 1 - hpRate;
      if (damageRate > 0.18) {
        ctx.strokeStyle = `rgba(20, 12, 8, ${0.22 + damageRate * 0.46})`;
        ctx.lineWidth = 1.4;
        const crackCount = Math.floor(3 + damageRate * 10);
        for (let i = 0; i < crackCount; i += 1) {
          const x = (i * 47 + 23) % this.width;
          const y = wallTop + 18 + (i * 17) % Math.max(18, this.wallHeight - 34);
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x + 8, y + 7);
          ctx.lineTo(x + 4, y + 15);
          ctx.stroke();
        }
      }

      ctx.fillStyle = "rgba(0, 0, 0, 0.42)";
      ctx.fillRect(16, this.height - 23, this.width - 32, 8);
      ctx.fillStyle = hpRate > 0.35 ? "#d7fff5" : "#ff6b57";
      ctx.fillRect(16, this.height - 23, (this.width - 32) * hpRate, 8);

      ctx.save();
      ctx.globalAlpha = 0.22 + hpRate * 0.22;
      ctx.strokeStyle = hpRate > 0.35 ? "#d7fff5" : "#ff6b57";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(center, wallTop + 32, Math.min(this.width * 0.38, 150), Math.PI * 1.08, Math.PI * 1.92);
      ctx.stroke();
      ctx.restore();
      ctx.restore();
    }

    drawBolt(ctx, bolt) {
      const alpha = clamp(bolt.life / 0.22, 0, 1);
      ctx.save();
      ctx.globalAlpha = alpha;
      if (!bolt.sword) {
        ctx.fillStyle = `rgba(243, 255, 249, ${alpha * 0.05})`;
        ctx.beginPath();
        ctx.arc(bolt.x2, bolt.y2, 20 * alpha, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.strokeStyle = bolt.sword ? "#f3fff9" : `rgba(215, 255, 245, ${alpha * 0.72})`;
      ctx.shadowColor = bolt.sword ? "#bfeee4" : "rgba(255, 241, 189, 0.45)";
      ctx.shadowBlur = bolt.sword ? 3 : 2;
      ctx.lineWidth = bolt.sword ? 3 : 2.2;
      ctx.beginPath();
      ctx.moveTo(bolt.x1, bolt.y1);
      const segments = bolt.sword ? 1 : 5;
      for (let i = 1; i < segments; i += 1) {
        const t = i / segments;
        const x = bolt.x1 + (bolt.x2 - bolt.x1) * t + rand(-5, 5);
        const y = bolt.y1 + (bolt.y2 - bolt.y1) * t;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(bolt.x2, bolt.y2);
      ctx.stroke();
      ctx.shadowBlur = 0;
      ctx.font = `bold ${bolt.sword ? 15 : 14}px KaiTi, SimSun, serif`;
      ctx.textAlign = "center";
      ctx.fillStyle = bolt.sword ? `rgba(243, 255, 249, ${alpha})` : `rgba(255, 241, 189, ${alpha * 0.42})`;
      ctx.fillText(bolt.sword ? "斩" : "雷", bolt.x2, bolt.y2 - (bolt.sword ? 8 : 12));
      ctx.restore();
    }

    drawBossBar(ctx) {
      const boss = this.bossEnemy;
      if (!boss || boss.dead || !boss.isBoss) return;
      const w = Math.min(this.width - 46, 340);
      const x = (this.width - w) / 2;
      const y = Math.max(8, this.battleTop - 42);
      const hpRate = clamp(boss.hp / boss.maxHp, 0, 1);
      const shieldRate = boss.maxShield > 0 ? clamp(boss.shield / boss.maxShield, 0, 1) : 0;
      ctx.save();
      ctx.fillStyle = "rgba(23, 63, 66, 0.72)";
      ctx.strokeStyle = "rgba(255, 241, 189, 0.82)";
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      roundedRectPath(ctx, x, y, w, 30, 15);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "#fff1bd";
      ctx.font = "bold 13px KaiTi, SimSun, serif";
      ctx.textAlign = "center";
      ctx.fillText(boss.name, this.width / 2, y + 12);
      ctx.fillStyle = "rgba(10, 32, 34, 0.78)";
      ctx.beginPath();
      roundedRectPath(ctx, x + 14, y + 17, w - 28, 7, 4);
      ctx.fill();
      ctx.fillStyle = "#ff6b57";
      ctx.beginPath();
      roundedRectPath(ctx, x + 15, y + 18, Math.max(0, (w - 30) * hpRate), 5, 3);
      ctx.fill();
      if (Array.isArray(boss.config?.phaseSummons)) {
        ctx.strokeStyle = "rgba(255, 241, 189, 0.78)";
        ctx.lineWidth = 1;
        for (const phase of boss.config.phaseSummons) {
          const px = x + 15 + (w - 30) * clamp(phase.hpRate || 0, 0, 1);
          ctx.beginPath();
          ctx.moveTo(px, y + 17);
          ctx.lineTo(px, y + 25);
          ctx.stroke();
        }
      }
      if (shieldRate > 0) {
        ctx.fillStyle = "rgba(159, 217, 207, 0.72)";
        ctx.beginPath();
        roundedRectPath(ctx, x + 15, y + 24, Math.max(0, (w - 30) * shieldRate), 2.4, 2);
        ctx.fill();
      }
      ctx.restore();
    }

    drawBattleBounds(ctx) {
      if (!DEBUG_BOUNDS) return;
      ctx.save();
      ctx.lineWidth = 1;
      ctx.font = "11px sans-serif";
      ctx.textAlign = "left";
      [
        ["BATTLE_TOP", this.battleTop, "rgba(255, 241, 189, 0.7)"],
        ["BATTLE_BOTTOM", this.battleBottom, "rgba(159, 217, 207, 0.7)"],
        ["WALL_Y", this.wallY, "rgba(255, 107, 87, 0.7)"],
      ].forEach(([label, y, color]) => {
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(this.width, y);
        ctx.stroke();
        ctx.fillText(label, 6, y - 3);
      });
      ctx.restore();
    }

    drawPause(ctx) {
      ctx.save();
      ctx.fillStyle = "rgba(23, 63, 66, 0.42)";
      ctx.fillRect(0, 0, this.width, this.height);
      ctx.fillStyle = "#fff1bd";
      ctx.font = "bold 26px KaiTi, SimSun, serif";
      ctx.textAlign = "center";
      ctx.fillText("调息中", this.width / 2, this.height / 2);
      ctx.restore();
    }
  }

  window.addEventListener("DOMContentLoaded", () => {
    window.hongyunGame = new Game();
    window.getMetaBonuses = () => window.hongyunGame.saveManager.getMetaBonuses();
    window.showCloudSavePanel = showCloudSavePanel;
  });
})();
