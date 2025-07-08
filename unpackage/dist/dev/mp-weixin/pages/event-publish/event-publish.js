"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      formData: {
        title: "",
        eventType: null,
        format: null,
        date: "",
        time: "",
        location: "",
        maxParticipants: "",
        entryFee: "",
        registrationEndDate: "",
        registrationEndTime: "",
        requirements: "",
        totalPrize: "",
        firstPrize: "",
        secondPrize: "",
        thirdPrize: "",
        rules: "",
        contactName: "",
        contactPhone: "",
        wechat: "",
        poster: ""
      },
      eventTypes: [
        { value: "open", label: "公开赛" },
        { value: "invitation", label: "邀请赛" },
        { value: "club", label: "俱乐部赛" },
        { value: "amateur", label: "业余赛" },
        { value: "professional", label: "专业赛" }
      ],
      gameFormats: [
        { value: "american", label: "美式八球" },
        { value: "chinese", label: "中式八球" },
        { value: "nineball", label: "九球" },
        { value: "snooker", label: "斯诺克" },
        { value: "straight", label: "直板" }
      ]
    };
  },
  methods: {
    handleEventTypeChange(e) {
      this.formData.eventType = this.eventTypes[e.detail.value];
    },
    handleFormatChange(e) {
      this.formData.format = this.gameFormats[e.detail.value];
    },
    handleDateChange(e) {
      this.formData.date = e.detail.value;
    },
    handleTimeChange(e) {
      this.formData.time = e.detail.value;
    },
    handleRegEndDateChange(e) {
      this.formData.registrationEndDate = e.detail.value;
    },
    handleRegEndTimeChange(e) {
      this.formData.registrationEndTime = e.detail.value;
    },
    uploadPoster() {
      common_vendor.index.chooseImage({
        count: 1,
        sizeType: ["compressed"],
        sourceType: ["camera", "album"],
        success: (res) => {
          this.formData.poster = res.tempFilePaths[0];
        }
      });
    },
    validateForm() {
      if (!this.formData.title) {
        common_vendor.index.showToast({ title: "请输入比赛名称", icon: "none" });
        return false;
      }
      if (!this.formData.eventType) {
        common_vendor.index.showToast({ title: "请选择比赛类型", icon: "none" });
        return false;
      }
      if (!this.formData.format) {
        common_vendor.index.showToast({ title: "请选择比赛项目", icon: "none" });
        return false;
      }
      if (!this.formData.date || !this.formData.time) {
        common_vendor.index.showToast({ title: "请设置比赛时间", icon: "none" });
        return false;
      }
      if (!this.formData.location) {
        common_vendor.index.showToast({ title: "请输入比赛地点", icon: "none" });
        return false;
      }
      if (!this.formData.maxParticipants) {
        common_vendor.index.showToast({ title: "请输入参赛人数", icon: "none" });
        return false;
      }
      if (!this.formData.registrationEndDate || !this.formData.registrationEndTime) {
        common_vendor.index.showToast({ title: "请设置报名截止时间", icon: "none" });
        return false;
      }
      if (!this.formData.contactName) {
        common_vendor.index.showToast({ title: "请输入联系人", icon: "none" });
        return false;
      }
      if (!this.formData.contactPhone) {
        common_vendor.index.showToast({ title: "请输入联系电话", icon: "none" });
        return false;
      }
      return true;
    },
    saveDraft() {
      common_vendor.index.showToast({
        title: "草稿已保存",
        icon: "success"
      });
    },
    handleSubmit() {
      if (!this.validateForm()) {
        return;
      }
      common_vendor.index.showLoading({ title: "发布中..." });
      setTimeout(() => {
        common_vendor.index.hideLoading();
        common_vendor.index.showToast({
          title: "比赛发布成功",
          icon: "success",
          duration: 2e3
        });
        setTimeout(() => {
          common_vendor.index.navigateBack();
        }, 2e3);
      }, 1500);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.formData.title,
    b: common_vendor.o(($event) => $data.formData.title = $event.detail.value),
    c: common_vendor.t($data.formData.eventType ? $data.formData.eventType.label : "请选择比赛类型"),
    d: $data.eventTypes,
    e: common_vendor.o((...args) => $options.handleEventTypeChange && $options.handleEventTypeChange(...args)),
    f: common_vendor.t($data.formData.format ? $data.formData.format.label : "请选择比赛项目"),
    g: $data.gameFormats,
    h: common_vendor.o((...args) => $options.handleFormatChange && $options.handleFormatChange(...args)),
    i: common_vendor.t($data.formData.date || "选择日期"),
    j: $data.formData.date,
    k: common_vendor.o((...args) => $options.handleDateChange && $options.handleDateChange(...args)),
    l: common_vendor.t($data.formData.time || "选择时间"),
    m: $data.formData.time,
    n: common_vendor.o((...args) => $options.handleTimeChange && $options.handleTimeChange(...args)),
    o: $data.formData.location,
    p: common_vendor.o(($event) => $data.formData.location = $event.detail.value),
    q: $data.formData.maxParticipants,
    r: common_vendor.o(common_vendor.m(($event) => $data.formData.maxParticipants = $event.detail.value, {
      number: true
    })),
    s: $data.formData.entryFee,
    t: common_vendor.o(common_vendor.m(($event) => $data.formData.entryFee = $event.detail.value, {
      number: true
    })),
    v: common_vendor.t($data.formData.registrationEndDate || "选择日期"),
    w: $data.formData.registrationEndDate,
    x: common_vendor.o((...args) => $options.handleRegEndDateChange && $options.handleRegEndDateChange(...args)),
    y: common_vendor.t($data.formData.registrationEndTime || "选择时间"),
    z: $data.formData.registrationEndTime,
    A: common_vendor.o((...args) => $options.handleRegEndTimeChange && $options.handleRegEndTimeChange(...args)),
    B: $data.formData.requirements,
    C: common_vendor.o(($event) => $data.formData.requirements = $event.detail.value),
    D: $data.formData.totalPrize,
    E: common_vendor.o(common_vendor.m(($event) => $data.formData.totalPrize = $event.detail.value, {
      number: true
    })),
    F: $data.formData.firstPrize,
    G: common_vendor.o(common_vendor.m(($event) => $data.formData.firstPrize = $event.detail.value, {
      number: true
    })),
    H: $data.formData.secondPrize,
    I: common_vendor.o(common_vendor.m(($event) => $data.formData.secondPrize = $event.detail.value, {
      number: true
    })),
    J: $data.formData.thirdPrize,
    K: common_vendor.o(common_vendor.m(($event) => $data.formData.thirdPrize = $event.detail.value, {
      number: true
    })),
    L: $data.formData.rules,
    M: common_vendor.o(($event) => $data.formData.rules = $event.detail.value),
    N: $data.formData.contactName,
    O: common_vendor.o(($event) => $data.formData.contactName = $event.detail.value),
    P: $data.formData.contactPhone,
    Q: common_vendor.o(($event) => $data.formData.contactPhone = $event.detail.value),
    R: $data.formData.wechat,
    S: common_vendor.o(($event) => $data.formData.wechat = $event.detail.value),
    T: $data.formData.poster
  }, $data.formData.poster ? {
    U: $data.formData.poster
  } : {}, {
    V: common_vendor.o((...args) => $options.uploadPoster && $options.uploadPoster(...args)),
    W: common_vendor.o((...args) => $options.saveDraft && $options.saveDraft(...args)),
    X: common_vendor.o((...args) => $options.handleSubmit && $options.handleSubmit(...args)),
    Y: common_vendor.o((...args) => $options.handleSubmit && $options.handleSubmit(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/event-publish/event-publish.js.map
