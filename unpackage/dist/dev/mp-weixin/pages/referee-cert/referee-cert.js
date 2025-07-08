"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      formData: {
        name: "",
        gender: "",
        age: "",
        phone: "",
        idCard: "",
        region: [],
        grade: null,
        sportsTypes: [],
        experience: "",
        idCardFront: "",
        idCardBack: "",
        photo: "",
        certificates: [],
        agreeTerms: false
      },
      refereeGrades: [
        { value: "national_1", label: "CBA国家一级" },
        { value: "national_2", label: "CBA国家二级" },
        { value: "national_3", label: "CBA国家三级" },
        { value: "regional", label: "地区级" },
        { value: "local", label: "地方级" }
      ],
      sportsTypes: [
        { value: "american", label: "美式八球" },
        { value: "chinese", label: "中式八球" },
        { value: "nineball", label: "九球" },
        { value: "snooker", label: "斯诺克" },
        { value: "straight", label: "直板" }
      ]
    };
  },
  methods: {
    handleGenderChange(e) {
      this.formData.gender = e.detail.value;
    },
    handleRegionChange(e) {
      this.formData.region = e.detail.value;
    },
    handleGradeChange(e) {
      this.formData.grade = this.refereeGrades[e.detail.value];
    },
    handleSportsChange(e) {
      this.formData.sportsTypes = e.detail.value;
    },
    handleAgreeChange(e) {
      this.formData.agreeTerms = e.detail.value.length > 0;
    },
    uploadIdCardFront() {
      common_vendor.index.chooseImage({
        count: 1,
        sizeType: ["compressed"],
        sourceType: ["camera", "album"],
        success: (res) => {
          this.formData.idCardFront = res.tempFilePaths[0];
        }
      });
    },
    uploadIdCardBack() {
      common_vendor.index.chooseImage({
        count: 1,
        sizeType: ["compressed"],
        sourceType: ["camera", "album"],
        success: (res) => {
          this.formData.idCardBack = res.tempFilePaths[0];
        }
      });
    },
    uploadPhoto() {
      common_vendor.index.chooseImage({
        count: 1,
        sizeType: ["compressed"],
        sourceType: ["camera", "album"],
        success: (res) => {
          this.formData.photo = res.tempFilePaths[0];
        }
      });
    },
    uploadCertificates() {
      const remainingCount = 3 - this.formData.certificates.length;
      common_vendor.index.chooseImage({
        count: remainingCount,
        sizeType: ["compressed"],
        sourceType: ["camera", "album"],
        success: (res) => {
          this.formData.certificates = [...this.formData.certificates, ...res.tempFilePaths];
        }
      });
    },
    previewCertificate(index) {
      common_vendor.index.previewImage({
        current: index,
        urls: this.formData.certificates
      });
    },
    deleteCertificate(index) {
      this.formData.certificates.splice(index, 1);
    },
    validateForm() {
      if (!this.formData.name) {
        common_vendor.index.showToast({ title: "请输入姓名", icon: "none" });
        return false;
      }
      if (!this.formData.gender) {
        common_vendor.index.showToast({ title: "请选择性别", icon: "none" });
        return false;
      }
      if (!this.formData.age) {
        common_vendor.index.showToast({ title: "请输入年龄", icon: "none" });
        return false;
      }
      if (!this.formData.phone) {
        common_vendor.index.showToast({ title: "请输入联系电话", icon: "none" });
        return false;
      }
      if (!this.formData.idCard) {
        common_vendor.index.showToast({ title: "请输入身份证号", icon: "none" });
        return false;
      }
      if (!this.formData.region.length) {
        common_vendor.index.showToast({ title: "请选择所在地区", icon: "none" });
        return false;
      }
      if (!this.formData.grade) {
        common_vendor.index.showToast({ title: "请选择裁判等级", icon: "none" });
        return false;
      }
      if (!this.formData.agreeTerms) {
        common_vendor.index.showToast({ title: "请同意承诺声明", icon: "none" });
        return false;
      }
      return true;
    },
    handleSubmit() {
      if (!this.validateForm()) {
        return;
      }
      common_vendor.index.showLoading({ title: "提交中..." });
      setTimeout(() => {
        common_vendor.index.hideLoading();
        common_vendor.index.showToast({
          title: "申请已提交，请等待审核",
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
    a: $data.formData.name,
    b: common_vendor.o(($event) => $data.formData.name = $event.detail.value),
    c: $data.formData.gender === "male",
    d: $data.formData.gender === "female",
    e: common_vendor.o((...args) => $options.handleGenderChange && $options.handleGenderChange(...args)),
    f: $data.formData.age,
    g: common_vendor.o(common_vendor.m(($event) => $data.formData.age = $event.detail.value, {
      number: true
    })),
    h: $data.formData.phone,
    i: common_vendor.o(($event) => $data.formData.phone = $event.detail.value),
    j: $data.formData.idCard,
    k: common_vendor.o(($event) => $data.formData.idCard = $event.detail.value),
    l: common_vendor.t($data.formData.region.length ? $data.formData.region.join(" ") : "请选择所在地区"),
    m: $data.formData.region,
    n: common_vendor.o((...args) => $options.handleRegionChange && $options.handleRegionChange(...args)),
    o: common_vendor.t($data.formData.grade ? $data.formData.grade.label : "请选择裁判等级"),
    p: $data.refereeGrades,
    q: common_vendor.o((...args) => $options.handleGradeChange && $options.handleGradeChange(...args)),
    r: common_vendor.f($data.sportsTypes, (sport, k0, i0) => {
      return {
        a: sport.value,
        b: $data.formData.sportsTypes.includes(sport.value),
        c: common_vendor.o((...args) => $options.handleSportsChange && $options.handleSportsChange(...args), sport.value),
        d: common_vendor.t(sport.label),
        e: sport.value
      };
    }),
    s: $data.formData.experience,
    t: common_vendor.o(($event) => $data.formData.experience = $event.detail.value),
    v: $data.formData.idCardFront
  }, $data.formData.idCardFront ? {
    w: $data.formData.idCardFront
  } : {}, {
    x: common_vendor.o((...args) => $options.uploadIdCardFront && $options.uploadIdCardFront(...args)),
    y: $data.formData.idCardBack
  }, $data.formData.idCardBack ? {
    z: $data.formData.idCardBack
  } : {}, {
    A: common_vendor.o((...args) => $options.uploadIdCardBack && $options.uploadIdCardBack(...args)),
    B: $data.formData.photo
  }, $data.formData.photo ? {
    C: $data.formData.photo
  } : {}, {
    D: common_vendor.o((...args) => $options.uploadPhoto && $options.uploadPhoto(...args)),
    E: common_vendor.f($data.formData.certificates, (cert, index, i0) => {
      return {
        a: cert,
        b: common_vendor.o(($event) => $options.deleteCertificate(index), index),
        c: index,
        d: common_vendor.o(($event) => $options.previewCertificate(index), index)
      };
    }),
    F: $data.formData.certificates.length < 3
  }, $data.formData.certificates.length < 3 ? {
    G: common_vendor.o((...args) => $options.uploadCertificates && $options.uploadCertificates(...args))
  } : {}, {
    H: $data.formData.agreeTerms,
    I: common_vendor.o((...args) => $options.handleAgreeChange && $options.handleAgreeChange(...args)),
    J: common_vendor.o((...args) => $options.handleSubmit && $options.handleSubmit(...args)),
    K: common_vendor.o((...args) => $options.handleSubmit && $options.handleSubmit(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/referee-cert/referee-cert.js.map
