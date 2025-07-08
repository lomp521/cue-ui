"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      recentActivities: [
        {
          id: 1,
          type: "event",
          icon: "🏆",
          title: "杭州市美式八球邀请赛已发布",
          time: "2小时前"
        },
        {
          id: 2,
          type: "venue",
          icon: "🏢",
          title: "逍遥派台球俱乐部通过认证",
          time: "5小时前"
        },
        {
          id: 3,
          type: "referee",
          icon: "👨‍⚖️",
          title: "新增3名认证裁判",
          time: "1天前"
        },
        {
          id: 4,
          type: "simulation",
          icon: "🎮",
          title: "比赛模拟功能更新",
          time: "2天前"
        }
      ]
    };
  },
  methods: {
    navigateToPublish() {
      common_vendor.index.navigateTo({
        url: "/pages/event-publish/event-publish"
      });
    },
    navigateToSimulation() {
      common_vendor.index.navigateTo({
        url: "/pages/event-simulation/event-simulation"
      });
    },
    navigateToVenueCert() {
      common_vendor.index.navigateTo({
        url: "/pages/venue-cert/venue-cert"
      });
    },
    navigateToRefereeCert() {
      common_vendor.index.navigateTo({
        url: "/pages/referee-cert/referee-cert"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.navigateToPublish && $options.navigateToPublish(...args)),
    b: common_vendor.o((...args) => $options.navigateToSimulation && $options.navigateToSimulation(...args)),
    c: common_vendor.o((...args) => $options.navigateToVenueCert && $options.navigateToVenueCert(...args)),
    d: common_vendor.o((...args) => $options.navigateToRefereeCert && $options.navigateToRefereeCert(...args)),
    e: common_vendor.f($data.recentActivities, (activity, k0, i0) => {
      return {
        a: common_vendor.t(activity.icon),
        b: common_vendor.n(activity.type),
        c: common_vendor.t(activity.title),
        d: common_vendor.t(activity.time),
        e: activity.id
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/event-menu/event-menu.js.map
