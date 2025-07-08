"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      simulationData: {
        format: null,
        playerCount: null,
        tournamentType: null,
        speed: "normal"
      },
      gameFormats: [
        { value: "american", label: "美式八球" },
        { value: "chinese", label: "中式八球" },
        { value: "nineball", label: "九球" },
        { value: "snooker", label: "斯诺克" }
      ],
      playerCounts: [4, 8, 16, 32],
      tournamentTypes: [
        { value: "single", label: "单败淘汰" },
        { value: "double", label: "双败淘汰" },
        { value: "roundrobin", label: "循环赛" },
        { value: "swiss", label: "瑞士制" }
      ],
      players: [
        { name: "乔峰", avatar: "/static/mock/head/1.png", skill: 95, selected: false },
        { name: "段誉", avatar: "/static/mock/head/2.png", skill: 88, selected: false },
        { name: "虚竹", avatar: "/static/mock/head/3.png", skill: 92, selected: false },
        { name: "慕容复", avatar: "/static/mock/head/4.png", skill: 89, selected: false },
        { name: "王语嫣", avatar: "/static/mock/head/5.png", skill: 75, selected: false },
        { name: "阿朱", avatar: "/static/mock/head/1.png", skill: 78, selected: false },
        { name: "阿紫", avatar: "/static/mock/head/2.png", skill: 82, selected: false },
        { name: "钟灵", avatar: "/static/mock/head/3.png", skill: 73, selected: false },
        { name: "木婉清", avatar: "/static/mock/head/4.png", skill: 76, selected: false },
        { name: "甘宝宝", avatar: "/static/mock/head/5.png", skill: 71, selected: false },
        { name: "秦红棉", avatar: "/static/mock/head/1.png", skill: 79, selected: false },
        { name: "阮星竹", avatar: "/static/mock/head/2.png", skill: 77, selected: false },
        { name: "李青萝", avatar: "/static/mock/head/3.png", skill: 74, selected: false },
        { name: "马夫人", avatar: "/static/mock/head/4.png", skill: 72, selected: false },
        { name: "康敏", avatar: "/static/mock/head/5.png", skill: 68, selected: false },
        { name: "包不同", avatar: "/static/mock/head/1.png", skill: 85, selected: false },
        { name: "风波恶", avatar: "/static/mock/head/2.png", skill: 83, selected: false },
        { name: "邓百川", avatar: "/static/mock/head/3.png", skill: 84, selected: false },
        { name: "公冶乾", avatar: "/static/mock/head/4.png", skill: 81, selected: false },
        { name: "全冠清", avatar: "/static/mock/head/5.png", skill: 80, selected: false },
        { name: "鸠摩智", avatar: "/static/mock/head/1.png", skill: 93, selected: false },
        { name: "无崖子", avatar: "/static/mock/head/2.png", skill: 96, selected: false },
        { name: "苏星河", avatar: "/static/mock/head/3.png", skill: 87, selected: false },
        { name: "丁春秋", avatar: "/static/mock/head/4.png", skill: 86, selected: false },
        { name: "游坦之", avatar: "/static/mock/head/5.png", skill: 69, selected: false },
        { name: "庄聚贤", avatar: "/static/mock/head/1.png", skill: 70, selected: false },
        { name: "白世镜", avatar: "/static/mock/head/2.png", skill: 67, selected: false },
        { name: "司马林", avatar: "/static/mock/head/3.png", skill: 66, selected: false },
        { name: "哲罗星", avatar: "/static/mock/head/4.png", skill: 65, selected: false },
        { name: "出尘子", avatar: "/static/mock/head/5.png", skill: 64, selected: false },
        { name: "摘星子", avatar: "/static/mock/head/1.png", skill: 63, selected: false },
        { name: "天狼子", avatar: "/static/mock/head/2.png", skill: 62, selected: false }
      ],
      isSimulating: false,
      matchHistory: [],
      finalResult: null
    };
  },
  computed: {
    selectedPlayers() {
      return this.players.filter((player) => player.selected);
    },
    canStartSimulation() {
      return this.simulationData.format && this.simulationData.playerCount && this.simulationData.tournamentType && this.selectedPlayers.length === this.simulationData.playerCount && !this.isSimulating;
    }
  },
  methods: {
    handleFormatChange(e) {
      this.simulationData.format = this.gameFormats[e.detail.value];
    },
    handlePlayerCountChange(e) {
      this.simulationData.playerCount = this.playerCounts[e.detail.value];
      this.clearSelection();
    },
    handleTournamentTypeChange(e) {
      this.simulationData.tournamentType = this.tournamentTypes[e.detail.value];
    },
    handleSpeedChange(e) {
      this.simulationData.speed = e.detail.value;
    },
    togglePlayerSelection(index) {
      if (this.selectedPlayers.length >= this.simulationData.playerCount && !this.players[index].selected) {
        common_vendor.index.showToast({
          title: `最多选择${this.simulationData.playerCount}名球员`,
          icon: "none"
        });
        return;
      }
      this.players[index].selected = !this.players[index].selected;
    },
    randomSelectPlayers() {
      this.clearSelection();
      const shuffled = [...this.players].sort(() => Math.random() - 0.5);
      for (let i = 0; i < this.simulationData.playerCount; i++) {
        const playerIndex = this.players.findIndex((p) => p.name === shuffled[i].name);
        this.players[playerIndex].selected = true;
      }
    },
    clearSelection() {
      this.players.forEach((player) => {
        player.selected = false;
      });
    },
    async startSimulation() {
      this.isSimulating = true;
      this.matchHistory = [];
      this.finalResult = null;
      const selectedPlayers = [...this.selectedPlayers];
      const speedDelay = {
        fast: 500,
        normal: 1e3,
        slow: 2e3
      };
      if (this.simulationData.tournamentType.value === "single") {
        await this.runSingleElimination(selectedPlayers, speedDelay[this.simulationData.speed]);
      }
      this.isSimulating = false;
    },
    async runSingleElimination(players, delay) {
      let currentRound = 1;
      let currentPlayers = [...players];
      while (currentPlayers.length > 1) {
        const roundName = this.getRoundName(currentPlayers.length, currentRound);
        const winners = [];
        for (let i = 0; i < currentPlayers.length; i += 2) {
          if (i + 1 < currentPlayers.length) {
            const player1 = currentPlayers[i];
            const player2 = currentPlayers[i + 1];
            const match = {
              round: roundName,
              player1,
              player2,
              result: null,
              isCurrent: true
            };
            this.matchHistory.push(match);
            await this.delay(delay);
            const winner = this.simulateMatch(player1, player2);
            const score = this.generateScore();
            match.result = {
              winner: winner.name,
              score
            };
            match.isCurrent = false;
            winners.push(winner);
            await this.delay(delay);
          } else {
            winners.push(currentPlayers[i]);
          }
        }
        currentPlayers = winners;
        currentRound++;
      }
      this.generateFinalResult(currentPlayers[0]);
    },
    simulateMatch(player1, player2) {
      const skill1 = player1.skill;
      const skill2 = player2.skill;
      const totalSkill = skill1 + skill2;
      const player1WinRate = skill1 / totalSkill;
      const randomFactor = 0.2;
      const adjustedWinRate = player1WinRate + (Math.random() - 0.5) * randomFactor;
      return Math.random() < adjustedWinRate ? player1 : player2;
    },
    generateScore() {
      const scores = ["7-0", "7-1", "7-2", "7-3", "7-4", "7-5", "7-6"];
      return scores[Math.floor(Math.random() * scores.length)];
    },
    getRoundName(playerCount, round) {
      if (playerCount === 2)
        return "决赛";
      if (playerCount === 4)
        return "半决赛";
      if (playerCount === 8)
        return "1/4决赛";
      if (playerCount === 16)
        return "1/8决赛";
      return `第${round}轮`;
    },
    generateFinalResult(champion) {
      const finalMatch = this.matchHistory[this.matchHistory.length - 1];
      const runnerUp = finalMatch.player1.name === champion.name ? finalMatch.player2 : finalMatch.player1;
      let thirdPlace = null;
      if (this.matchHistory.length > 1) {
        const semiMatches = this.matchHistory.filter((match) => match.round === "半决赛");
        if (semiMatches.length >= 2) {
          const losers = semiMatches.map((match) => {
            const winner = match.result.winner;
            return match.player1.name === winner ? match.player2 : match.player1;
          });
          thirdPlace = losers.find((player) => player.name !== runnerUp.name) || losers[0];
        }
      }
      this.finalResult = {
        champion,
        runnerUp,
        thirdPlace
      };
    },
    delay(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
    restartSimulation() {
      this.matchHistory = [];
      this.finalResult = null;
      this.isSimulating = false;
    },
    saveResult() {
      common_vendor.index.showToast({
        title: "结果已保存",
        icon: "success"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t($data.simulationData.format ? $data.simulationData.format.label : "请选择比赛项目"),
    b: $data.gameFormats,
    c: common_vendor.o((...args) => $options.handleFormatChange && $options.handleFormatChange(...args)),
    d: common_vendor.t($data.simulationData.playerCount ? $data.simulationData.playerCount + "人" : "请选择参赛人数"),
    e: $data.playerCounts,
    f: common_vendor.o((...args) => $options.handlePlayerCountChange && $options.handlePlayerCountChange(...args)),
    g: common_vendor.t($data.simulationData.tournamentType ? $data.simulationData.tournamentType.label : "请选择赛制"),
    h: $data.tournamentTypes,
    i: common_vendor.o((...args) => $options.handleTournamentTypeChange && $options.handleTournamentTypeChange(...args)),
    j: $data.simulationData.speed === "fast",
    k: $data.simulationData.speed === "normal",
    l: $data.simulationData.speed === "slow",
    m: common_vendor.o((...args) => $options.handleSpeedChange && $options.handleSpeedChange(...args)),
    n: $data.simulationData.playerCount
  }, $data.simulationData.playerCount ? {
    o: common_vendor.f($data.players, (player, index, i0) => {
      return common_vendor.e({
        a: player.avatar,
        b: common_vendor.t(player.name),
        c: common_vendor.t(player.skill),
        d: player.selected
      }, player.selected ? {} : {}, {
        e: index,
        f: player.selected ? 1 : "",
        g: common_vendor.o(($event) => $options.togglePlayerSelection(index), index)
      });
    }),
    p: common_vendor.o((...args) => $options.randomSelectPlayers && $options.randomSelectPlayers(...args)),
    q: common_vendor.o((...args) => $options.clearSelection && $options.clearSelection(...args))
  } : {}, {
    r: common_vendor.t($data.isSimulating ? "模拟进行中..." : "开始模拟"),
    s: !$options.canStartSimulation,
    t: common_vendor.o((...args) => $options.startSimulation && $options.startSimulation(...args)),
    v: $data.matchHistory.length > 0
  }, $data.matchHistory.length > 0 ? {
    w: common_vendor.f($data.matchHistory, (match, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(match.round),
        b: common_vendor.t(match.player1.name),
        c: common_vendor.t(match.player2.name),
        d: match.result
      }, match.result ? {
        e: common_vendor.t(match.result.score),
        f: common_vendor.t(match.result.winner)
      } : {}, {
        g: index,
        h: match.isCurrent ? 1 : ""
      });
    })
  } : {}, {
    x: $data.finalResult
  }, $data.finalResult ? common_vendor.e({
    y: $data.finalResult.champion.avatar,
    z: common_vendor.t($data.finalResult.champion.name),
    A: $data.finalResult.runnerUp
  }, $data.finalResult.runnerUp ? {
    B: $data.finalResult.runnerUp.avatar,
    C: common_vendor.t($data.finalResult.runnerUp.name)
  } : {}, {
    D: $data.finalResult.thirdPlace
  }, $data.finalResult.thirdPlace ? {
    E: $data.finalResult.thirdPlace.avatar,
    F: common_vendor.t($data.finalResult.thirdPlace.name)
  } : {}, {
    G: common_vendor.o((...args) => $options.restartSimulation && $options.restartSimulation(...args)),
    H: common_vendor.o((...args) => $options.saveResult && $options.saveResult(...args))
  }) : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/event-simulation/event-simulation.js.map
