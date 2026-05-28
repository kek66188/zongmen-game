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
      description: "妖潮初现，守住宗门山门。",
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
        { time: 110, text: "宗门决战" },
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
      description: "巨妖踏破山路，宗门防线承压。",
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
        { time: 165, text: "死守宗门" },
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
      name: "宗门决战",
      description: "最终妖潮降临，守住此战即护宗成功。",
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
        { time: 145, text: "宗门血战" },
        { time: 180, text: "最后防线" },
        { time: 200, text: "护宗一击" },
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
    { start: 1, end: 10, name: "炼气试炼", phaseText: "炼气试炼开启" },
    { start: 11, end: 20, name: "筑基妖潮", phaseText: "筑基妖潮开启" },
    { start: 21, end: 30, name: "金丹魔影", phaseText: "金丹魔影降临" },
    { start: 31, end: 40, name: "元婴大劫", phaseText: "元婴大劫将至" },
  ];
  const LEVEL_NAMES = [
    "山门初试", "林间妖影", "灵田骚乱", "夜守山门", "小妖成群",
    "寒潭异动", "符阵初成", "妖雾压境", "山道伏妖", "炼气终试",
    "筑基妖潮", "疾影来袭", "石甲破阵", "毒雾山谷", "妖火焚林",
    "灵脉震荡", "夜叉窥门", "护盾妖阵", "群妖叩关", "筑基终劫",
    "金丹魔影", "飞妖掠空", "咒师结阵", "玄甲压境", "雷云妖潮",
    "血月山门", "咒纹妖师", "双阵夹击", "万妖试炼", "金丹终战",
    "元婴大劫", "妖王前锋", "冥雾围山", "破盾巨潮", "天魔压境",
    "灵墙将碎", "四方妖阵", "妖王亲临", "山门死守", "万妖终劫",
  ];
  const clampSetup = (value, min, max) => Math.max(min, Math.min(max, value));
  const ENEMY_UNLOCK_LEVEL = {
    imp: 1,
    runner: 2,
    brute: 3,
    shield: 4,
    poison: 12,
    stone: 13,
    fireling: 15,
    yaksha: 17,
    flying: 22,
    caster: 23,
    xuanArmor: 24,
    splitter: 28,
    drainer: 32,
    vanguard: 35,
    boss10: 10,
    boss20: 20,
    boss30: 30,
    boss40: 40,
  };
  const BOSS_LEVELS = {
    10: { type: "boss10", name: "黑角妖将", appearText: "黑角妖将来袭！" },
    20: { type: "boss20", name: "筑基妖帅", appearText: "筑基妖帅压阵！" },
    30: { type: "boss30", name: "金丹魔修", appearText: "金丹魔修现身！" },
    40: { type: "boss40", name: "万妖王", appearText: "万妖王降临！" },
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
    const allowed = new Set(["imp"]);
    if (order >= 2) allowed.add("runner");
    if (order >= 3) allowed.add("brute");
    if (order >= 4) allowed.add("shield");
    if (order >= 12) allowed.add("poison");
    if (order >= 13) allowed.add("stone");
    if (order >= 15) allowed.add("fireling");
    if (order >= 17) allowed.add("yaksha");
    if (order >= 22) allowed.add("flying");
    if (order >= 23) allowed.add("caster");
    if (order >= 24) allowed.add("xuanArmor");
    if (order >= 28) allowed.add("splitter");
    if (order >= 32) allowed.add("drainer");
    if (order >= 35) allowed.add("vanguard");
    return getAllowedEnemyTypes(order).filter((id) => allowed.has(id));
  };
  const buildEnemyWeights = (order, segment) => {
    const weights = { imp: 1 };
    if (order >= 2) weights.runner = 0.1 + segment * 0.04 + (order >= 5 ? 0.1 : 0);
    if (order >= 3) weights.brute = 0.06 + segment * 0.035 + (order % 10 === 3 ? 0.12 : 0);
    if (order >= 4) weights.shield = 0.06 + segment * 0.04 + (order % 10 === 8 ? 0.16 : 0);
    if (order >= 12) weights.poison = 0.05 + segment * 0.025 + (order === 14 ? 0.12 : 0);
    if (order >= 13) weights.stone = 0.05 + segment * 0.025 + (order === 13 || order === 24 ? 0.14 : 0);
    if (order >= 15) weights.fireling = 0.05 + segment * 0.025 + (order === 15 || order === 40 ? 0.1 : 0);
    if (order >= 17) weights.yaksha = 0.035 + segment * 0.02 + (order === 17 || order === 32 ? 0.08 : 0);
    if (order >= 22) weights.flying = 0.05 + segment * 0.025 + (order === 22 ? 0.14 : 0);
    if (order >= 23) weights.caster = 0.035 + segment * 0.02 + (order === 23 || order === 27 ? 0.12 : 0);
    if (order >= 24) weights.xuanArmor = 0.03 + segment * 0.018 + (order === 24 || order === 34 ? 0.12 : 0);
    if (order >= 28) weights.splitter = 0.045 + segment * 0.025 + (order === 28 ? 0.12 : 0);
    if (order >= 32) weights.drainer = 0.035 + segment * 0.018 + (order === 32 || order === 33 ? 0.1 : 0);
    if (order >= 35) weights.vanguard = 0.025 + segment * 0.014 + (order === 35 || order === 38 ? 0.08 : 0);
    if (order % 10 === 9) {
      weights.brute = (weights.brute || 0) + 0.08;
      weights.shield = (weights.shield || 0) + 0.08;
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
    name: "山门初试",
    description: "妖潮初现，守住宗门山门。",
    enemyHpMultiplier: 1,
    enemySpeedMultiplier: 1,
    enemyDamageMultiplier: 1,
    spawnMultiplier: 1,
    rewardMultiplier: 1,
    enemyHpMaxMultiplier: 1.6,
    enemySpeedMaxMultiplier: 1.3,
    enemyTypes: ["imp", "runner", "shield", "brute"],
    phases: [
      { time: 0, text: "妖潮初现" },
      { time: 20, text: "妖气渐浓" },
      { time: 40, text: "巨妖来袭" },
      { time: 70, text: "妖潮汹涌" },
      { time: 95, text: "最后冲击" },
      { time: 110, text: "宗门决战" },
    ],
    spawnProfiles: [
      { start: 0, end: 20, intervalMin: 1.3, intervalMax: 1.6, extraChance: 0, weights: { imp: 1 } },
      { start: 20, end: 40, intervalMin: 1.1, intervalMax: 1.3, extraChance: 0, weights: { imp: 0.82, runner: 0.18 } },
      { start: 40, end: 70, intervalMin: 0.9, intervalMax: 1.1, extraChance: 0.05, weights: { imp: 0.58, runner: 0.2, shield: 0.1, brute: 0.12 } },
      { start: 70, end: 95, intervalMin: 0.75, intervalMax: 0.95, extraChance: 0.12, weights: { imp: 0.42, runner: 0.27, shield: 0.16, brute: 0.15 } },
      { start: 95, end: 120, intervalMin: 0.6, intervalMax: 0.8, extraChance: 0.18, weights: { imp: 0.4, runner: 0.3, shield: 0.16, brute: 0.14 } },
    ],
  });
  const LEVEL_LIST = Object.values(LEVEL_CONFIG).sort((a, b) => a.order - b.order);
  const MAX_PARTICLES = 250;
  const MAX_AURA_PARTICLES = 40;
  const SAVE_KEY = "zongmen_guardian_save_v1";
  const HIGHEST_CLEARED_KEY = "zmsw_highestClearedLevel";
  const LEGACY_HIGHEST_CLEARED_KEY = "highestClearedLevel";
  const TIMESCALE_KEY = "zmsw_timeScale";
  const readTimeScaleSetting = () => {
    try {
      return Number(localStorage.getItem(TIMESCALE_KEY)) === 2 ? 2 : 1;
    } catch (_err) {
      return 1;
    }
  };
  const writeTimeScaleSetting = (value) => {
    try {
      localStorage.setItem(TIMESCALE_KEY, String(value === 2 ? 2 : 1));
    } catch (_err) {
      // Local storage can be unavailable in private or embedded browsers.
    }
  };
  const readHighestClearedSetting = () => {
    try {
      const primary = Number(localStorage.getItem(HIGHEST_CLEARED_KEY));
      const legacy = Number(localStorage.getItem(LEGACY_HIGHEST_CLEARED_KEY));
      return clampSetup(Math.max(Number.isFinite(primary) ? primary : 0, Number.isFinite(legacy) ? legacy : 0), 0, 40);
    } catch (_err) {
      return 0;
    }
  };
  const writeHighestClearedSetting = (value) => {
    try {
      localStorage.setItem(HIGHEST_CLEARED_KEY, String(clampSetup(Math.floor(value || 0), 0, 40)));
    } catch (_err) {
      // Local storage can be unavailable in private or embedded browsers.
    }
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
  for (const [id, config] of Object.entries(ENEMY_TYPES)) {
    config.type = config.type || id;
    config.unlockLevel = config.unlockLevel || ENEMY_UNLOCK_LEVEL[id] || 1;
    config.baseHp = config.hp;
    config.baseSpeed = config.speed;
    config.baseDamage = config.damage;
  }

  const SKILL_ORDER = ["sword", "fire", "ice", "thunder", "array"];
  const SKILL_LABELS = {
    sword: "飞剑",
    fire: "火符",
    ice: "冰符",
    thunder: "天雷",
    array: "剑阵",
  };
  const SKILL_ICONS = {
    sword: "✦",
    fire: "符",
    ice: "❄",
    thunder: "雷",
    array: "阵",
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
      name: "强化飞剑",
      max: 10,
      current: (level) => `飞剑伤害 +${level * 5}%`,
    },
    fireMastery: {
      name: "火符精通",
      max: 10,
      current: (level) => `火符爆炸范围 +${level * 4}%`,
    },
    iceMastery: {
      name: "冰符精通",
      max: 10,
      current: (level) => `冰符减速效果 +${level * 3}%`,
    },
    thunderMastery: {
      name: "天雷精通",
      max: 10,
      current: (level) => `天雷伤害 +${level * 5}%`,
    },
    swordArrayMastery: {
      name: "剑阵精通",
      max: 10,
      current: (level) => `剑阵伤害 +${level * 5}%`,
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
    coins: 0,
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
    },
    levels: createDefaultLevels(),
    settings: {
      soundEnabled: true,
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

    save.coins = Number.isFinite(source.coins) ? Math.max(0, Math.floor(source.coins)) : 0;

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

    save.settings.soundEnabled = source.settings?.soundEnabled !== false;
    return save;
  };

  const getMetaBonuses = (save) => {
    const data = normalizeSave(save);
    const gems = data.gems;
    const talents = data.talents;
    return {
      damageMultiplier: 1 + gems.attack.level * 0.03,
      cooldownMultiplier: 1 - Math.min(gems.cooldown.level * 0.02, 0.4),
      maxHpBonus: gems.wall.level * 10 + talents.wallFortify * 15,
      critChance: Math.min(gems.crit.level * 0.02, 0.5),
      critDamageMultiplier: 2,
      expMultiplier: 1 + gems.exp.level * 0.05 + talents.battleInsight * 0.03,
      swordDamageMultiplier: 1 + talents.swordDamage * 0.05,
      fireRangeMultiplier: 1 + talents.fireMastery * 0.04,
      iceSlowBonus: talents.iceMastery * 0.03,
      thunderDamageMultiplier: 1 + talents.thunderMastery * 0.05,
      swordArrayDamageMultiplier: 1 + talents.swordArrayMastery * 0.05,
      startExp: talents.startSpirit * 5,
    };
  };

  class SaveManager {
    constructor() {
      this.data = this.load();
    }

    load() {
      try {
        const raw = localStorage.getItem(SAVE_KEY);
        if (!raw) {
          const fresh = createDefaultSave();
          localStorage.setItem(SAVE_KEY, JSON.stringify(fresh));
          return fresh;
        }
        const parsed = JSON.parse(raw);
        const normalized = normalizeSave(parsed);
        localStorage.setItem(SAVE_KEY, JSON.stringify(normalized));
        return normalized;
      } catch (_err) {
        const fresh = createDefaultSave();
        localStorage.setItem(SAVE_KEY, JSON.stringify(fresh));
        return fresh;
      }
    }

    save() {
      localStorage.setItem(SAVE_KEY, JSON.stringify(this.data));
      writeHighestClearedSetting(this.data.records?.highestClearedLevel || 0);
    }

    reset() {
      localStorage.removeItem(SAVE_KEY);
      localStorage.removeItem(HIGHEST_CLEARED_KEY);
      localStorage.removeItem(LEGACY_HIGHEST_CLEARED_KEY);
      this.data = createDefaultSave();
      this.save();
    }

    getMetaBonuses() {
      return getMetaBonuses(this.data);
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

    addRunResult({ victory, kills, survivalTime, level, levelId }) {
      const levelConfig = getLevelById(levelId);
      const levelRecord = this.data.levels[levelConfig.id] || createDefaultLevels()[levelConfig.id];
      this.data.levels[levelConfig.id] = levelRecord;
      const seconds = Math.floor(Math.min(survivalTime, levelConfig.duration));
      const clearReward = victory ? (levelConfig.clearReward || (50 + levelConfig.order * 15 + (levelConfig.boss ? 100 : 0))) : 0;
      const baseCoins = kills + Math.floor(seconds / 10) * 2 + clearReward;
      const coins = Math.floor(baseCoins * (levelConfig.rewardMultiplier || 1));
      const clearShardBonus = victory ? getLevelExtraClearShards(levelConfig.order) : 0;
      const shardCount = Math.floor(kills / 30) + (victory ? 2 : 0) + clearShardBonus;
      const drops = {};
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
      if (victory) {
        this.data.records.clearCount += 1;
        this.data.records.highestClearedLevel = Math.max(this.data.records.highestClearedLevel || 0, levelConfig.order);
        writeHighestClearedSetting(this.data.records.highestClearedLevel);
        levelRecord.cleared = true;
        levelRecord.clearCount += 1;
        const nextLevel = getNextLevel(levelConfig.id);
        if (nextLevel && !this.data.levels[nextLevel.id].unlocked) {
          this.data.levels[nextLevel.id].unlocked = true;
          unlockedLevel = nextLevel;
        }
      }
      this.save();

      return {
        coins,
        totalCoins: this.data.coins,
        drops,
        shardCount,
        survivalSeconds: seconds,
        levelName: levelConfig.name,
        levelId: levelConfig.id,
        unlockedLevelId: unlockedLevel?.id || null,
        unlockedLevelName: unlockedLevel?.name || "",
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
      const config = ENEMY_TYPES[type];
      const hpScale = game.enemyHpMultiplier || 1;
      const speedScale = game.enemySpeedMultiplier || 1;
      const damageScale = game.enemyDamageMultiplier || 1;
      this.config = config;
      this.type = type;
      this.name = config.name;
      this.visual = config.visual || type;
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
      this.phaseFlags = {};
      this.targetable = options.targetable === true || this.y >= game.battleTop + this.radius;
      this.entering = !this.targetable;
    }

    update(dt, game) {
      if (this.dead) return;
      this.hitPulse = Math.max(0, this.hitPulse - dt * 5);
      if (this.entering && this.y >= game.battleTop + this.radius) {
        this.entering = false;
        this.targetable = true;
      }
      if (this.isBoss && this.targetable) game.updateBossSpecial(this, dt);
      let speed = this.baseSpeed;
      if (game.elapsed < this.stunUntil) speed = 0;
      else if (game.elapsed < this.slowUntil) speed *= this.slowFactor;
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
      if (this.visual === "runner" || this.visual === "yaksha") this.drawRunnerTrail(ctx, game, t);
      this.drawEnemyStatusEffects(ctx, game, t, true);

      const bob = this.type === "imp" ? Math.sin(t * 4.2) * 1.8 : Math.sin(t * 2.6) * 0.7;
      const breathe = this.type === "brute" ? 1 + Math.sin(t * 2.8) * 0.035 : 1 + Math.sin(t * 3.8) * 0.015;
      ctx.translate(0, bob);
      ctx.scale(breathe, breathe);

      if (this.visual === "runner" || this.visual === "yaksha") this.drawRunnerDemon(ctx, game, t);
      else if (this.visual === "flying") this.drawFlyingDemon(ctx, game, t);
      else if (this.visual === "caster" || this.visual === "casterBoss") this.drawCasterDemon(ctx, game, t);
      else if (this.visual === "brute" || this.visual === "stone" || this.visual === "xuanArmor" || this.visual === "vanguard" || this.visual === "boss" || this.visual === "kingBoss") this.drawGiantDemon(ctx, game, t);
      else if (this.visual === "shield") this.drawShieldDemon(ctx, game, t);
      else this.drawSmallDemon(ctx, game, t);

      this.drawEnemyTrait(ctx, game, t);
      this.drawHitOutline(ctx);
      this.drawEnemyStatusEffects(ctx, game, t, false);
      ctx.restore();
      if (this.targetable) this.drawEnemyHealthBar(ctx, game, t);
    }

    drawEnemyAura(ctx, game, t) {
      const r = this.radius;
      const auraR = r + (this.type === "brute" ? 12 : 8) + Math.sin(t * 3) * 1.4;
      ctx.save();
      ctx.globalAlpha = this.type === "runner" ? 0.2 : 0.26;
      ctx.strokeStyle = this.type === "shield" && this.shield > 0 ? "#bfeee4" : "rgba(61, 29, 69, 0.7)";
      ctx.lineWidth = this.type === "brute" ? 3 : 2;
      ctx.beginPath();
      ctx.ellipse(0, 0, auraR * 0.95, auraR * 0.72, Math.sin(t) * 0.12, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = this.type === "runner" ? "rgba(31, 86, 87, 0.16)" : "rgba(38, 18, 48, 0.18)";
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
      if (this.visual === "poison") {
        ctx.fillStyle = "rgba(136, 210, 132, 0.58)";
        for (let i = 0; i < 4; i += 1) {
          const a = t * 2 + i * Math.PI * 0.5;
          ctx.beginPath();
          ctx.arc(Math.cos(a) * r * 0.85, Math.sin(a) * r * 0.72, Math.max(1.5, r * 0.11), 0, Math.PI * 2);
          ctx.fill();
        }
      }
      if (this.visual === "stone" || this.visual === "xuanArmor") {
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
      if (this.visual === "fire") {
        ctx.fillStyle = "rgba(233, 184, 95, 0.72)";
        for (let i = 0; i < 5; i += 1) {
          const a = -t * 4 + i * Math.PI * 0.4;
          ctx.beginPath();
          ctx.ellipse(Math.cos(a) * r * 0.82, Math.sin(a) * r * 0.72, r * 0.11, r * 0.2, a, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      if (this.visual === "yaksha") {
        ctx.strokeStyle = "rgba(243, 255, 249, 0.54)";
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(-r * 0.68, r * 0.1);
        ctx.lineTo(-r * 1.05, r * 0.46);
        ctx.moveTo(r * 0.68, r * 0.1);
        ctx.lineTo(r * 1.05, r * 0.46);
        ctx.stroke();
      }
      if (this.visual === "splitter") {
        ctx.strokeStyle = "rgba(255, 241, 189, 0.48)";
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(-r * 0.1, -r * 0.75);
        ctx.lineTo(r * 0.12, -r * 0.1);
        ctx.lineTo(-r * 0.04, r * 0.72);
        ctx.stroke();
      }
      if (this.visual === "drainer") {
        ctx.strokeStyle = "rgba(174, 188, 255, 0.46)";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(0, 0, r * (1.1 + Math.sin(t * 3) * 0.08), 0, Math.PI * 2);
        ctx.stroke();
      }
      if (this.visual === "kingBoss") {
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
      const heavy = this.isBoss || this.visual === "brute" || this.visual === "stone" || this.visual === "xuanArmor";
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
        if (this.tickTimer >= 0.5) {
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
          title: "飞剑淬芒",
          skill: "sword",
          statText: (v) => `飞剑伤害 +${pct(v)}`,
          apply: (game, v) => {
            game.unlockSkill("sword");
            game.skills.sword.damageMult *= 1 + v;
          },
          value: 0.2,
        },
        {
          id: "sword_count",
          title: "剑影分光",
          skill: "sword",
          statText: (v) => `飞剑数量 +${Math.round(v)}`,
          apply: (game, v) => {
            game.unlockSkill("sword");
            game.skills.sword.count += Math.round(v);
          },
          value: 1,
          discrete: true,
        },
        {
          id: "sword_cooldown",
          title: "御剑无滞",
          skill: "sword",
          statText: (v) => `飞剑冷却 -${pct(v)}`,
          apply: (game, v) => {
            game.unlockSkill("sword");
            game.skills.sword.cooldownMult *= 1 - v;
          },
          value: 0.1,
        },
        {
          id: "sword_pierce",
          title: "贯虹剑意",
          skill: "sword",
          statText: (v) => `飞剑获得 ${Math.round(v)} 次穿透`,
          apply: (game, v) => {
            game.unlockSkill("sword");
            game.skills.sword.pierce += Math.round(v);
          },
          value: 1,
          discrete: true,
        },
        {
          id: "sword_speed",
          title: "流星驭剑",
          skill: "sword",
          statText: (v) => `飞剑飞行速度 +${pct(v)}`,
          apply: (game, v) => {
            game.unlockSkill("sword");
            game.skills.sword.speedMult *= 1 + v;
          },
          value: 0.2,
        },
        {
          id: "fire_damage",
          title: "火符炽燃",
          skill: "fire",
          statText: (v, locked) => `${locked ? "解锁火符，" : ""}火符伤害 +${pct(v)}`,
          apply: (game, v) => {
            game.unlockSkill("fire");
            game.skills.fire.damageMult *= 1 + v;
          },
          value: 0.2,
        },
        {
          id: "fire_range",
          title: "焰纹扩印",
          skill: "fire",
          statText: (v, locked) => `${locked ? "解锁火符，" : ""}火符爆炸范围 +${pct(v)}`,
          apply: (game, v) => {
            game.unlockSkill("fire");
            game.skills.fire.rangeMult *= 1 + v;
          },
          value: 0.15,
        },
        {
          id: "fire_cooldown",
          title: "朱砂疾书",
          skill: "fire",
          statText: (v, locked) => `${locked ? "解锁火符，" : ""}火符冷却 -${pct(v)}`,
          apply: (game, v) => {
            game.unlockSkill("fire");
            game.skills.fire.cooldownMult *= 1 - v;
          },
          value: 0.1,
        },
        {
          id: "fire_burn",
          title: "余焰留痕",
          skill: "fire",
          statText: (_v, locked) => `${locked ? "解锁火符，" : ""}火符爆炸后留下灼烧区域 2 秒`,
          apply: (game) => {
            game.unlockSkill("fire");
            game.skills.fire.burn = true;
          },
          value: 1,
          fixed: true,
        },
        {
          id: "ice_slow",
          title: "寒符凝霜",
          skill: "ice",
          statText: (v, locked) => `${locked ? "解锁冰符，" : ""}冰符减速效果 +${pct(v)}`,
          apply: (game, v) => {
            game.unlockSkill("ice");
            game.skills.ice.slowPower = Math.min(0.82, game.skills.ice.slowPower + v);
          },
          value: 0.1,
        },
        {
          id: "ice_duration",
          title: "霜息绵长",
          skill: "ice",
          statText: (v, locked) => `${locked ? "解锁冰符，" : ""}冰符持续时间 +${v.toFixed(1)} 秒`,
          apply: (game, v) => {
            game.unlockSkill("ice");
            game.skills.ice.slowDuration += v;
          },
          value: 1,
        },
        {
          id: "ice_range",
          title: "冰轮外拓",
          skill: "ice",
          statText: (v, locked) => `${locked ? "解锁冰符，" : ""}冰符范围 +${pct(v)}`,
          apply: (game, v) => {
            game.unlockSkill("ice");
            game.skills.ice.rangeMult *= 1 + v;
          },
          value: 0.15,
        },
        {
          id: "ice_vulnerable",
          title: "寒侵骨隙",
          skill: "ice",
          statText: (v, locked) => `${locked ? "解锁冰符，" : ""}被冰冻敌人受到伤害 +${pct(v)}`,
          apply: (game, v) => {
            game.unlockSkill("ice");
            game.iceVulnerabilityBonus += v;
          },
          value: 0.1,
        },
        {
          id: "thunder_damage",
          title: "天雷轰顶",
          skill: "thunder",
          statText: (v, locked) => `${locked ? "解锁天雷，" : ""}天雷伤害 +${pct(v)}`,
          apply: (game, v) => {
            game.unlockSkill("thunder");
            game.skills.thunder.damageMult *= 1 + v;
          },
          value: 0.2,
        },
        {
          id: "thunder_bounce",
          title: "雷引连环",
          skill: "thunder",
          statText: (v, locked) => `${locked ? "解锁天雷，" : ""}天雷弹射次数 +${Math.round(v)}`,
          apply: (game, v) => {
            game.unlockSkill("thunder");
            game.skills.thunder.bounces += Math.round(v);
          },
          value: 1,
          discrete: true,
        },
        {
          id: "thunder_cooldown",
          title: "雷诀疾诵",
          skill: "thunder",
          statText: (v, locked) => `${locked ? "解锁天雷，" : ""}天雷冷却 -${pct(v)}`,
          apply: (game, v) => {
            game.unlockSkill("thunder");
            game.skills.thunder.cooldownMult *= 1 - v;
          },
          value: 0.1,
        },
        {
          id: "thunder_stun",
          title: "震魂余威",
          skill: "thunder",
          statText: (_v, locked) => `${locked ? "解锁天雷，" : ""}天雷命中后短暂眩晕`,
          apply: (game) => {
            game.unlockSkill("thunder");
            game.skills.thunder.stun = true;
          },
          value: 1,
          fixed: true,
        },
        {
          id: "array_damage",
          title: "剑阵鸣锋",
          skill: "array",
          statText: (v, locked) => `${locked ? "解锁剑阵，" : ""}剑阵伤害 +${pct(v)}`,
          apply: (game, v) => {
            game.unlockSkill("array");
            game.skills.array.damageMult *= 1 + v;
          },
          value: 0.2,
        },
        {
          id: "array_range",
          title: "阵纹扩界",
          skill: "array",
          statText: (v, locked) => `${locked ? "解锁剑阵，" : ""}剑阵范围 +${pct(v)}`,
          apply: (game, v) => {
            game.unlockSkill("array");
            game.skills.array.rangeMult *= 1 + v;
          },
          value: 0.15,
        },
        {
          id: "array_duration",
          title: "剑势不息",
          skill: "array",
          statText: (v, locked) => `${locked ? "解锁剑阵，" : ""}剑阵持续时间 +${v.toFixed(1)} 秒`,
          apply: (game, v) => {
            game.unlockSkill("array");
            game.skills.array.duration += v;
          },
          value: 1,
        },
        {
          id: "array_interval",
          title: "阵机更迭",
          skill: "array",
          statText: (v, locked) => `${locked ? "解锁剑阵，" : ""}剑阵触发间隔 -${pct(v)}`,
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
        const rarityKey = forcedRarity || (base.fixed ? "rare" : pickRarity());
        const rarity = RARITY[rarityKey];
        const value = base.fixed
          ? base.value
          : base.discrete
            ? Math.max(1, Math.round(base.value * rarity.mult))
            : base.value * rarity.mult;
        const locked = base.skill ? !this.game.skills[base.skill].enabled : false;
        return {
          ...base,
          rarityKey,
          rarity,
          value,
          locked,
          desc: base.statText(value, locked),
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
      if (option.skill) return SKILL_ICONS[option.skill] || "✦";
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
        expText: document.getElementById("expText"),
        timeText: document.getElementById("timeText"),
        stageText: document.getElementById("stageText"),
        speedBtn: document.getElementById("speedBtn"),
        wallHpText: document.getElementById("wallHpText"),
        killText: document.getElementById("killText"),
        skillStrip: document.getElementById("skillStrip"),
        homeOverlay: document.getElementById("homeOverlay"),
        cultivationOverlay: document.getElementById("cultivationOverlay"),
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
        resultUnlockNotice: document.getElementById("resultUnlockNotice"),
        homeCoins: document.getElementById("homeCoins"),
        selectedTrialText: document.getElementById("selectedTrialText"),
        levelList: document.getElementById("levelList"),
        cultivationCoins: document.getElementById("cultivationCoins"),
        gemList: document.getElementById("gemList"),
        talentList: document.getElementById("talentList"),
        bestKills: document.getElementById("bestKills"),
        bestTime: document.getElementById("bestTime"),
        bestLevel: document.getElementById("bestLevel"),
        clearCount: document.getElementById("clearCount"),
        totalRuns: document.getElementById("totalRuns"),
        startBtn: document.getElementById("startBtn"),
        cultivationBtn: document.getElementById("cultivationBtn"),
        soundToggleBtn: document.getElementById("soundToggleBtn"),
        backHomeBtn: document.getElementById("backHomeBtn"),
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
      this.timeScale = readTimeScaleSetting();
      this.selectedLevelId = getHighestUnlockedLevelId(this.saveManager.data);
      this.currentLevelConfig = getLevelById(this.selectedLevelId);

      this.bindEvents();
      this.reset();
      this.resize();
      this.renderTimeScale();
      this.renderHome();
      this.renderCultivation();
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
      this.dom.cultivationBtn.addEventListener("click", () => this.openCultivation());
      this.dom.soundToggleBtn.addEventListener("click", () => this.toggleSound());
      this.dom.backHomeBtn.addEventListener("click", () => this.showHome());
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
          damageMult: 1,
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
          damageMult: 1,
          baseCooldown: 2.7,
          cooldownMult: 1,
          baseRange: 52,
          rangeMult: 1,
          slowPower: Math.min(0.82, 0.32 + meta.iceSlowBonus),
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
          duration: 3,
        }),
      };
    }

    reset() {
      const levelConfig = this.currentLevelConfig || getLevelById(this.selectedLevelId);
      this.currentLevelConfig = levelConfig;
      this.metaBonuses = this.saveManager.getMetaBonuses();
      this.elapsed = 0;
      this.level = 1;
      this.exp = levelConfig.startExp + this.metaBonuses.startExp;
      this.expToNext = levelConfig.baseExpNeed;
      this.maxWallHp = levelConfig.wallHp + this.metaBonuses.maxHpBonus;
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
      this.leveling = false;
      const firstPhase = (levelConfig.phases || levelConfig.stages || [])[0];
      if (this.dom.stageText) this.dom.stageText.textContent = firstPhase?.text || firstPhase?.name || levelConfig.name;
      this.renderSkillStrip();
      this.updateUI();
    }

    start() {
      const levelState = this.saveManager.data.levels[this.selectedLevelId];
      if (!levelState?.unlocked) {
        this.showToast("请先通关上一关");
        return;
      }
      this.currentLevelConfig = getLevelById(this.selectedLevelId);
      this.reset();
      this.state = "playing";
      this.dom.homeOverlay.classList.add("hidden");
      this.dom.cultivationOverlay.classList.add("hidden");
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
      this.start();
    }

    handleResultPrimaryAction() {
      const result = this.lastResult;
      if (!result) {
        this.start();
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
      this.dom.homeOverlay.classList.remove("hidden");
      this.dom.cultivationOverlay.classList.add("hidden");
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
      this.renderCultivation();
    }

    toggleSound() {
      const enabled = this.audio.toggle();
      this.renderSoundToggle();
      this.showToast(enabled ? "音效已开启" : "音效已关闭");
    }

    toggleTimeScale() {
      this.timeScale = this.timeScale === 1 ? 2 : 1;
      writeTimeScaleSetting(this.timeScale);
      this.renderTimeScale();
      this.showToast(this.timeScale === 2 ? "战斗速度 x2" : "战斗速度 x1");
    }

    renderTimeScale() {
      if (!this.dom.speedBtn) return;
      this.dom.speedBtn.textContent = this.timeScale === 2 ? "速 x2" : "速 x1";
      this.dom.speedBtn.classList.toggle("active", this.timeScale === 2);
      this.dom.speedBtn.setAttribute("aria-pressed", this.timeScale === 2 ? "true" : "false");
    }

    resetSave() {
      const ok = window.confirm("确定要重置存档吗？灵石、宝石、功法和历史战绩都会清空。");
      if (!ok) return;
      this.saveManager.reset();
      this.selectedLevelId = getHighestUnlockedLevelId(this.saveManager.data);
      this.currentLevelConfig = getLevelById(this.selectedLevelId);
      this.reset();
      this.renderHome();
      this.renderCultivation();
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
      const type = typeOverride || weightedPick(this.getSpawnProfile().weights);
      const enemy = new Enemy(type, this, options);
      if (!enemy.isBoss && !enemy.elite && this.currentLevelConfig.eliteChance && Math.random() < this.currentLevelConfig.eliteChance) {
        this.makeElite(enemy);
      }
      this.enemies.push(enemy);
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
      const enemy = this.spawnEnemy(boss.type, {
        boss: true,
        x: this.width / 2,
        y: this.battleTop - ENEMY_TYPES[boss.type].radius * 1.1,
      });
      this.bossEnemy = enemy;
      this.showToast(boss.appearText || `${enemy.name}来袭！`);
      this.floatingTexts.push(new FloatingText(boss.appearText || `${enemy.name}来袭！`, this.width / 2, 92, "#fff1bd", { size: 26, life: 1.6, kind: "crit" }));
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

    damageWall(amount, x, y) {
      const finalAmount = this.elapsed < this.currentLevelConfig.newbieProtectionSeconds
        ? Math.ceil(amount * 0.5)
        : amount;
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
      this.floatingTexts.push(new FloatingText(`宗门护阵激活 +${amount}`, this.width / 2, this.wallY - 48, "#d7fff5", { size: 16, life: 1.2 }));
      this.showToast(`宗门护阵激活 +${amount}`);
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
      if (enemy.config?.swordDamageTaken && source === "sword") amount *= enemy.config.swordDamageTaken;
      if (enemy.config?.flying && source === "array") amount *= enemy.config.arrayDamageTaken || 0.3;
      if (this.iceVulnerabilityBonus > 0 && this.elapsed < enemy.slowUntil) {
        amount *= 1 + this.iceVulnerabilityBonus;
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
      enemy.dead = true;
      this.kills += 1;
      const expGain = Math.max(1, Math.round(enemy.exp * this.expMultiplier));
      this.addExp(Math.max(1, Math.round(expGain * (this.runtimeExpPenalty || 1))), enemy.x, enemy.y);
      if (enemy.config?.onDeath === "poisonCloud") this.spawnPoisonCloud(enemy);
      if (enemy.config?.splitInto?.length) this.spawnSplitChildren(enemy);
      this.spawnDeathParticles(enemy);
      if (enemy.isBoss) this.handleBossDeath(enemy);
      if (enemy.type === "brute" || enemy.isBoss) this.addShake(enemy.isBoss ? 7 : 4, enemy.isBoss ? 0.18 : 0.12);
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
      const count = enemy.type === "brute" ? 24 : enemy.type === "shield" ? 18 : 13;
      const colors = ["#173f42", "#315b57", "#6f8f8b", "#9fd9cf"];
      for (let i = 0; i < count; i += 1) {
        const angle = rand(Math.PI * 1.05, Math.PI * 1.95);
        const speed = rand(30, enemy.type === "brute" ? 130 : 95);
        this.addParticle(
          enemy.x + rand(-enemy.radius * 0.38, enemy.radius * 0.38),
          enemy.y + rand(-enemy.radius * 0.22, enemy.radius * 0.38),
          randomFrom(colors),
          Math.cos(angle) * speed + rand(-18, 18),
          Math.sin(angle) * speed - rand(18, 56),
          rand(2, enemy.type === "brute" ? 6 : 4.5),
          rand(0.45, enemy.type === "brute" ? 1.05 : 0.85),
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
        this.floatingTexts.push(new FloatingText(`习得${SKILL_LABELS[id]}`, this.width / 2, this.wallY - 95, "#d7fff5"));
      }
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
        damage *= 0.72;
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
      this.dom.resultShards.textContent = this.formatShardDrops(reward.drops);
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
      this.configureResultButtons(victory);
      this.dom.gameOverOverlay.classList.remove("hidden");
      this.dom.gameOverOverlay.scrollTop = 0;
      this.floatingTexts.push(new FloatingText(`+${reward.coins}灵石`, this.width / 2, this.wallY - 110, "#fff1bd", { size: 18, life: 1.2, kind: "crit" }));
      for (let i = 0; i < 18; i += 1) {
        this.addParticle(this.width / 2, this.wallY - 90, "#fff1bd", rand(-80, 80), rand(-120, -25), rand(2, 4), rand(0.55, 1), "coin");
      }
      this.renderHome();
      this.renderCultivation();
    }

    configureResultButtons(victory) {
      const result = this.lastResult;
      if (!result) return;
      this.dom.resultHomeBtn.textContent = "返回关卡";
      this.dom.replayLevelBtn.classList.toggle("hidden", !victory);
      if (victory) {
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

    formatShardDrops(drops) {
      const entries = Object.entries(drops);
      if (!entries.length) return "无";
      return entries.map(([id, count]) => `${GEM_DEFS[id].shardName} x${count}`).join("、");
    }

    updateUI() {
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
      this.renderLevelSelector();
      this.renderSoundToggle();
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
      for (const [id, def] of Object.entries(TALENT_DEFS)) {
        const level = this.saveManager.data.talents[id];
        const maxed = level >= def.max;
        const cost = maxed ? 0 : getTalentNextCost(level);
        const card = document.createElement("article");
        card.className = "growth-card";
        card.innerHTML = `
          <div class="growth-card-title">
            <strong>${def.name}</strong>
            <span class="level-tag">Lv.${level}/${def.max}</span>
          </div>
          <div class="growth-meta">
            <div><span>当前功效</span><strong>${def.current(level)}</strong></div>
            <div><span>下阶功效</span><strong>${maxed ? "已圆满" : def.current(level + 1)}</strong></div>
            <div><span>修炼消耗</span><strong>${maxed ? "-" : `${cost} 灵石`}</strong></div>
            <div><span>当前灵石</span><strong>${this.saveManager.data.coins}</strong></div>
          </div>
        `;
        const button = document.createElement("button");
        button.type = "button";
        const canUpgrade = !maxed && this.saveManager.data.coins >= cost;
        button.className = `growth-button ${maxed ? "maxed" : ""} ${canUpgrade ? "can-upgrade" : ""}`;
        button.disabled = maxed;
        button.textContent = maxed ? "已圆满" : "修炼功法";
        button.addEventListener("click", () => {
          const result = this.saveManager.upgradeTalent(id);
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
        const item = document.createElement("div");
        item.className = `skill-chip skill-${id} ${skill.enabled ? "" : "locked"}`;
        const value = skill.enabled ? `Lv.${skill.level}` : "未悟";
        item.innerHTML = `<span class="skill-icon">${SKILL_ICONS[id]}</span><strong>${SKILL_LABELS[id]}</strong><span>${value}</span>`;
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
      ctx.fillText("宗门", center, wallTop + 30);

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
      const y = 12;
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
  });
})();
