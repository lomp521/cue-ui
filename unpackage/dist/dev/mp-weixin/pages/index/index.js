"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      currentTab: 0,
      tabs: [
        { name: "比赛", key: "competitions" },
        { name: "球员榜", key: "players" },
        { name: "球馆榜", key: "halls" },
        { name: "裁判榜", key: "judges" },
        { name: "我的赛事", key: "myEvents" }
      ],
      competitions: [
        {
          id: 1,
          title: "杭州市美式八球邀请赛10",
          format: "美式八球",
          competitionType: "公开赛",
          totalPrize: "30000元",
          distance: "<5km",
          time: "2025-08-04 13:00",
          location: "杭州市",
          image: "/static/mock/competition/1.png",
          participants: 32,
          status: "报名中"
        },
        {
          id: 2,
          title: "广州市九球邀请赛2",
          format: "九球",
          competitionType: "限档赛",
          totalPrize: "22000元",
          distance: "<20km",
          time: "2025-08-05 13:00",
          location: "广州市",
          image: "/static/mock/competition/2.png",
          participants: 24,
          status: "报名中"
        },
        {
          id: 3,
          title: "上海斯诺克公开赛",
          format: "斯诺克",
          competitionType: "会员赛",
          totalPrize: "40000元",
          distance: ">80km",
          time: "2025-08-06 14:00",
          location: "上海市",
          image: "/static/mock/competition/3.png",
          participants: 16,
          status: "即将开始"
        }
      ],
      playerRankings: [
        {
          id: 1,
          rank: 1,
          name: "乔峰",
          country: "🇨🇳",
          totalPrize: "134800元",
          gender: "male"
        },
        {
          id: 2,
          rank: 2,
          name: "段誉",
          country: "🇨🇳",
          totalPrize: "100000元",
          gender: "male"
        },
        {
          id: 3,
          rank: 3,
          name: "虚竹",
          country: "🇨🇳",
          totalPrize: "61300元",
          gender: "male"
        }
      ],
      hallRankings: [
        {
          id: 1,
          rank: 1,
          name: "逍遥派台球俱乐部",
          location: "大理市",
          totalPrize: "285600元",
          description: "无量山下，琅嬛福地"
        },
        {
          id: 2,
          rank: 2,
          name: "丐帮台球总舵",
          location: "洛阳市",
          totalPrize: "198500元",
          description: "天下第一大帮"
        }
      ],
      judgeRankings: [
        {
          id: 1,
          rank: 1,
          name: "武博然",
          location: "临沂市 威海市",
          points: "2275.5",
          certification: "CBA国家三级",
          verified: true
        },
        {
          id: 2,
          rank: 2,
          name: "裁判长张会印",
          location: "威海市",
          points: "1829",
          certification: "CBA国家三级",
          verified: true
        }
      ],
      myEvents: [
        {
          id: 1,
          title: "2024年华山论剑台球大赛",
          format: "美式八球",
          competitionType: "公开赛",
          time: "2024-12-15 14:00",
          location: "华山市",
          image: "/static/mock/competition/4.png",
          myRank: 1,
          totalParticipants: 32,
          status: "已结束",
          prize: "5000元"
        }
      ]
    };
  },
  computed: {
    currentCarouselItems() {
      const carouselData = {
        0: [
          {
            id: 1,
            image: "/static/mock/competition/1.png",
            title: "全国台球锦标赛",
            subtitle: "报名截止：2025年8月1日"
          },
          {
            id: 2,
            image: "/static/mock/competition/2.png",
            title: "城市联赛火热进行中",
            subtitle: "奖金池总计50万元"
          }
        ],
        1: [
          {
            id: 1,
            image: "/static/mock/head/1.png",
            title: "月度球员排行榜",
            subtitle: "根据累计奖金排名"
          }
        ],
        2: [
          {
            id: 1,
            image: "/static/mock/billiard/1.png",
            title: "月度球馆排行榜",
            subtitle: "查看最受欢迎的球馆"
          }
        ],
        3: [
          {
            id: 1,
            image: "/static/mock/head/2.png",
            title: "裁判认证培训",
            subtitle: "提升专业技能"
          }
        ],
        4: [
          {
            id: 1,
            image: "/static/mock/competition/5.png",
            title: "我的比赛历程",
            subtitle: "记录每一次精彩对决"
          }
        ]
      };
      return carouselData[this.currentTab] || carouselData[0];
    }
  },
  methods: {
    switchTab(index) {
      this.currentTab = index;
    },
    showFilter() {
      common_vendor.index.showToast({
        title: "筛选功能",
        icon: "none"
      });
    },
    navigateToEventMenu() {
      common_vendor.index.navigateTo({
        url: "/pages/event-menu/event-menu"
      });
    },
    navigateToPage(page) {
      const pageMap = {
        "venue-cert": "/pages/venue-cert/venue-cert",
        "referee-cert": "/pages/referee-cert/referee-cert",
        "event-simulation": "/pages/event-simulation/event-simulation"
      };
      common_vendor.index.navigateTo({
        url: pageMap[page]
      });
    },
    getPlayerAvatar(id) {
      const avatars = [
        "/static/mock/head/1.png",
        "/static/mock/head/2.png",
        "/static/mock/head/3.png",
        "/static/mock/head/4.png",
        "/static/mock/head/5.png"
      ];
      return avatars[(id - 1) % avatars.length];
    },
    getHallImage(id) {
      const images = [
        "/static/mock/billiard/1.png",
        "/static/mock/billiard/2.png",
        "/static/mock/billiard/3.png"
      ];
      return images[(id - 1) % images.length];
    },
    getJudgeAvatar(id) {
      return this.getPlayerAvatar(id);
    }
  }
};
if (!Array) {
  const _component_uni_icons = common_vendor.resolveComponent("uni-icons");
  _component_uni_icons();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.p({
      type: "search",
      size: "18",
      color: "#999"
    }),
    b: common_vendor.p({
      type: "tune",
      size: "18"
    }),
    c: common_vendor.o((...args) => $options.showFilter && $options.showFilter(...args)),
    d: common_vendor.f($data.tabs, (tab, index, i0) => {
      return {
        a: common_vendor.t(tab.name),
        b: index,
        c: $data.currentTab === index ? 1 : "",
        d: common_vendor.o(($event) => $options.switchTab(index), index)
      };
    }),
    e: common_vendor.f($options.currentCarouselItems, (item, k0, i0) => {
      return {
        a: item.image,
        b: common_vendor.t(item.title),
        c: common_vendor.t(item.subtitle),
        d: item.id
      };
    }),
    f: common_vendor.o((...args) => $options.navigateToEventMenu && $options.navigateToEventMenu(...args)),
    g: common_vendor.o(($event) => $options.navigateToPage("venue-cert")),
    h: common_vendor.o(($event) => $options.navigateToPage("referee-cert")),
    i: common_vendor.o(($event) => $options.navigateToPage("event-simulation")),
    j: $data.currentTab === 0
  }, $data.currentTab === 0 ? {
    k: common_vendor.f($data.competitions, (competition, k0, i0) => {
      return {
        a: competition.image,
        b: common_vendor.t(competition.title),
        c: common_vendor.t(competition.format),
        d: common_vendor.t(competition.competitionType),
        e: common_vendor.t(competition.totalPrize),
        f: common_vendor.t(competition.distance),
        g: common_vendor.t(competition.time),
        h: common_vendor.t(competition.status),
        i: common_vendor.n(competition.status === "报名中" ? "status-open" : "status-starting"),
        j: common_vendor.t(competition.participants),
        k: competition.id
      };
    })
  } : {}, {
    l: $data.currentTab === 1
  }, $data.currentTab === 1 ? {
    m: common_vendor.f($data.playerRankings, (player, k0, i0) => {
      return {
        a: common_vendor.t(player.rank),
        b: $options.getPlayerAvatar(player.id),
        c: common_vendor.t(player.name),
        d: common_vendor.t(player.country),
        e: common_vendor.t(player.totalPrize),
        f: player.id
      };
    })
  } : {}, {
    n: $data.currentTab === 2
  }, $data.currentTab === 2 ? {
    o: common_vendor.f($data.hallRankings, (hall, k0, i0) => {
      return {
        a: common_vendor.t(hall.rank),
        b: $options.getHallImage(hall.id),
        c: common_vendor.t(hall.name),
        d: common_vendor.t(hall.location),
        e: common_vendor.t(hall.totalPrize),
        f: common_vendor.t(hall.description),
        g: hall.id
      };
    })
  } : {}, {
    p: $data.currentTab === 3
  }, $data.currentTab === 3 ? {
    q: common_vendor.f($data.judgeRankings, (judge, k0, i0) => {
      return common_vendor.e({
        a: common_vendor.t(judge.rank),
        b: $options.getJudgeAvatar(judge.id),
        c: common_vendor.t(judge.name),
        d: common_vendor.t(judge.location),
        e: common_vendor.t(judge.points),
        f: common_vendor.t(judge.certification),
        g: judge.verified
      }, judge.verified ? {} : {}, {
        h: judge.id
      });
    })
  } : {}, {
    r: $data.currentTab === 4
  }, $data.currentTab === 4 ? {
    s: common_vendor.f($data.myEvents, (event, k0, i0) => {
      return {
        a: event.image,
        b: common_vendor.t(event.title),
        c: common_vendor.t(event.format),
        d: common_vendor.t(event.competitionType),
        e: common_vendor.t(event.time),
        f: common_vendor.t(event.location),
        g: common_vendor.t(event.myRank),
        h: common_vendor.t(event.totalParticipants),
        i: common_vendor.t(event.prize),
        j: event.id
      };
    })
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
