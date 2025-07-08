"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      formData: {
        name: "",
        contact: "",
        phone: "",
        address: "",
        tableCount: "",
        tableTypes: [],
        openTime: "",
        closeTime: "",
        licenseImage: "",
        images: [],
        description: ""
      },
      tableTypes: [
        { value: "american", label: "美式八球" },
        { value: "chinese", label: "中式八球" },
        { value: "nineball", label: "九球" },
        { value: "snooker", label: "斯诺克" }
      ]
    };
  },
  methods: {
    handleTableTypeChange(e) {
      this.formData.tableTypes = e.detail.value;
    },
    handleOpenTimeChange(e) {
      this.formData.openTime = e.detail.value;
    },
    handleCloseTimeChange(e) {
      this.formData.closeTime = e.detail.value;
    },
    uploadLicense() {
      common_vendor.index.chooseImage({
        count: 1,
        sizeType: ["compressed"],
        sourceType: ["camera", "album"],
        success: (res) => {
          this.formData.licenseImage = res.tempFilePaths[0];
        }
      });
    },
    uploadImages() {
      const remainingCount = 6 - this.formData.images.length;
      common_vendor.index.chooseImage({
        count: remainingCount,
        sizeType: ["compressed"],
        sourceType: ["camera", "album"],
        success: (res) => {
          this.formData.images = [...this.formData.images, ...res.tempFilePaths];
        }
      });
    },
    previewImage(index) {
      common_vendor.index.previewImage({
        current: index,
        urls: this.formData.images
      });
    },
    deleteImage(index) {
      this.formData.images.splice(index, 1);
    },
    validateForm() {
      if (!this.formData.name) {
        common_vendor.index.showToast({ title: "请输入球馆名称", icon: "none" });
        return false;
      }
      if (!this.formData.contact) {
        common_vendor.index.showToast({ title: "请输入联系人", icon: "none" });
        return false;
      }
      if (!this.formData.phone) {
        common_vendor.index.showToast({ title: "请输入联系电话", icon: "none" });
        return false;
      }
      if (!this.formData.address) {
        common_vendor.index.showToast({ title: "请输入详细地址", icon: "none" });
        return false;
      }
      if (!this.formData.tableCount) {
        common_vendor.index.showToast({ title: "请输入球台数量", icon: "none" });
        return false;
      }
      if (!this.formData.openTime || !this.formData.closeTime) {
        common_vendor.index.showToast({ title: "请设置营业时间", icon: "none" });
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
    c: $data.formData.contact,
    d: common_vendor.o(($event) => $data.formData.contact = $event.detail.value),
    e: $data.formData.phone,
    f: common_vendor.o(($event) => $data.formData.phone = $event.detail.value),
    g: $data.formData.address,
    h: common_vendor.o(($event) => $data.formData.address = $event.detail.value),
    i: $data.formData.tableCount,
    j: common_vendor.o(common_vendor.m(($event) => $data.formData.tableCount = $event.detail.value, {
      number: true
    })),
    k: common_vendor.f($data.tableTypes, (type, k0, i0) => {
      return {
        a: type.value,
        b: $data.formData.tableTypes.includes(type.value),
        c: common_vendor.o((...args) => $options.handleTableTypeChange && $options.handleTableTypeChange(...args), type.value),
        d: common_vendor.t(type.label),
        e: type.value
      };
    }),
    l: common_vendor.t($data.formData.openTime || "开始时间"),
    m: $data.formData.openTime,
    n: common_vendor.o((...args) => $options.handleOpenTimeChange && $options.handleOpenTimeChange(...args)),
    o: common_vendor.t($data.formData.closeTime || "结束时间"),
    p: $data.formData.closeTime,
    q: common_vendor.o((...args) => $options.handleCloseTimeChange && $options.handleCloseTimeChange(...args)),
    r: $data.formData.licenseImage
  }, $data.formData.licenseImage ? {
    s: $data.formData.licenseImage
  } : {}, {
    t: common_vendor.o((...args) => $options.uploadLicense && $options.uploadLicense(...args)),
    v: common_vendor.f($data.formData.images, (image, index, i0) => {
      return {
        a: image,
        b: common_vendor.o(($event) => $options.deleteImage(index), index),
        c: index,
        d: common_vendor.o(($event) => $options.previewImage(index), index)
      };
    }),
    w: $data.formData.images.length < 6
  }, $data.formData.images.length < 6 ? {
    x: common_vendor.o((...args) => $options.uploadImages && $options.uploadImages(...args))
  } : {}, {
    y: $data.formData.description,
    z: common_vendor.o(($event) => $data.formData.description = $event.detail.value),
    A: common_vendor.o((...args) => $options.handleSubmit && $options.handleSubmit(...args)),
    B: common_vendor.o((...args) => $options.handleSubmit && $options.handleSubmit(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/venue-cert/venue-cert.js.map
