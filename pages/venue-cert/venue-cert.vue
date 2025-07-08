<template>
  <view class="container">
    <!-- 页面标题 -->
    <view class="page-header">
      <text class="page-title">球馆认证</text>
      <text class="page-subtitle">申请成为认证台球馆</text>
    </view>

    <!-- 认证表单 -->
    <form @submit="handleSubmit">
      <!-- 基本信息 -->
      <view class="form-section">
        <text class="section-title">基本信息</text>
        
        <view class="form-item">
          <text class="form-label">球馆名称 *</text>
          <input 
            class="form-input" 
            v-model="formData.name" 
            placeholder="请输入球馆名称"
            maxlength="50"
          />
        </view>

        <view class="form-item">
          <text class="form-label">联系人 *</text>
          <input 
            class="form-input" 
            v-model="formData.contact" 
            placeholder="请输入联系人姓名"
            maxlength="20"
          />
        </view>

        <view class="form-item">
          <text class="form-label">联系电话 *</text>
          <input 
            class="form-input" 
            v-model="formData.phone" 
            placeholder="请输入联系电话"
            type="number"
            maxlength="11"
          />
        </view>

        <view class="form-item">
          <text class="form-label">详细地址 *</text>
          <textarea 
            class="form-textarea" 
            v-model="formData.address" 
            placeholder="请输入详细地址"
            maxlength="200"
          ></textarea>
        </view>
      </view>

      <!-- 球馆设施 -->
      <view class="form-section">
        <text class="section-title">球馆设施</text>
        
        <view class="form-item">
          <text class="form-label">球台数量 *</text>
          <input 
            class="form-input" 
            v-model.number="formData.tableCount" 
            placeholder="请输入球台数量"
            type="number"
          />
        </view>

        <view class="form-item">
          <text class="form-label">球台类型</text>
          <view class="checkbox-group">
            <label v-for="type in tableTypes" :key="type.value" class="checkbox-item">
              <checkbox 
                :value="type.value" 
                :checked="formData.tableTypes.includes(type.value)"
                @change="handleTableTypeChange"
              />
              <text>{{ type.label }}</text>
            </label>
          </view>
        </view>

        <view class="form-item">
          <text class="form-label">营业时间 *</text>
          <view class="time-picker-group">
            <picker 
              mode="time" 
              :value="formData.openTime" 
              @change="handleOpenTimeChange"
              class="time-picker"
            >
              <view class="time-display">{{ formData.openTime || '开始时间' }}</view>
            </picker>
            <text class="time-separator">至</text>
            <picker 
              mode="time" 
              :value="formData.closeTime" 
              @change="handleCloseTimeChange"
              class="time-picker"
            >
              <view class="time-display">{{ formData.closeTime || '结束时间' }}</view>
            </picker>
          </view>
        </view>
      </view>

      <!-- 资质证明 -->
      <view class="form-section">
        <text class="section-title">资质证明</text>
        
        <view class="form-item">
          <text class="form-label">营业执照</text>
          <view class="upload-area" @click="uploadLicense">
            <image v-if="formData.licenseImage" :src="formData.licenseImage" class="upload-preview" mode="aspectFit"></image>
            <view v-else class="upload-placeholder">
              <text class="upload-icon">📷</text>
              <text class="upload-text">点击上传营业执照</text>
            </view>
          </view>
        </view>

        <view class="form-item">
          <text class="form-label">球馆照片</text>
          <view class="image-grid">
            <view 
              v-for="(image, index) in formData.images" 
              :key="index" 
              class="image-item"
              @click="previewImage(index)"
            >
              <image :src="image" class="image-preview" mode="aspectFill"></image>
              <view class="image-delete" @click.stop="deleteImage(index)">×</view>
            </view>
            <view v-if="formData.images.length < 6" class="image-upload" @click="uploadImages">
              <text class="upload-icon">+</text>
              <text class="upload-text">添加照片</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 其他信息 -->
      <view class="form-section">
        <text class="section-title">其他信息</text>
        
        <view class="form-item">
          <text class="form-label">球馆描述</text>
          <textarea 
            class="form-textarea" 
            v-model="formData.description" 
            placeholder="请简要描述球馆特色和优势"
            maxlength="500"
          ></textarea>
        </view>
      </view>

      <!-- 提交按钮 -->
      <view class="form-actions">
        <button class="btn-submit" @click="handleSubmit">提交认证申请</button>
      </view>
    </form>
  </view>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        name: '',
        contact: '',
        phone: '',
        address: '',
        tableCount: '',
        tableTypes: [],
        openTime: '',
        closeTime: '',
        licenseImage: '',
        images: [],
        description: ''
      },
      tableTypes: [
        { value: 'american', label: '美式八球' },
        { value: 'chinese', label: '中式八球' },
        { value: 'nineball', label: '九球' },
        { value: 'snooker', label: '斯诺克' }
      ]
    }
  },
  methods: {
    handleTableTypeChange(e) {
      this.formData.tableTypes = e.detail.value
    },
    handleOpenTimeChange(e) {
      this.formData.openTime = e.detail.value
    },
    handleCloseTimeChange(e) {
      this.formData.closeTime = e.detail.value
    },
    uploadLicense() {
      uni.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['camera', 'album'],
        success: (res) => {
          this.formData.licenseImage = res.tempFilePaths[0]
        }
      })
    },
    uploadImages() {
      const remainingCount = 6 - this.formData.images.length
      uni.chooseImage({
        count: remainingCount,
        sizeType: ['compressed'],
        sourceType: ['camera', 'album'],
        success: (res) => {
          this.formData.images = [...this.formData.images, ...res.tempFilePaths]
        }
      })
    },
    previewImage(index) {
      uni.previewImage({
        current: index,
        urls: this.formData.images
      })
    },
    deleteImage(index) {
      this.formData.images.splice(index, 1)
    },
    validateForm() {
      if (!this.formData.name) {
        uni.showToast({ title: '请输入球馆名称', icon: 'none' })
        return false
      }
      if (!this.formData.contact) {
        uni.showToast({ title: '请输入联系人', icon: 'none' })
        return false
      }
      if (!this.formData.phone) {
        uni.showToast({ title: '请输入联系电话', icon: 'none' })
        return false
      }
      if (!this.formData.address) {
        uni.showToast({ title: '请输入详细地址', icon: 'none' })
        return false
      }
      if (!this.formData.tableCount) {
        uni.showToast({ title: '请输入球台数量', icon: 'none' })
        return false
      }
      if (!this.formData.openTime || !this.formData.closeTime) {
        uni.showToast({ title: '请设置营业时间', icon: 'none' })
        return false
      }
      return true
    },
    handleSubmit() {
      if (!this.validateForm()) {
        return
      }
      
      uni.showLoading({ title: '提交中...' })
      
      // 模拟提交
      setTimeout(() => {
        uni.hideLoading()
        uni.showToast({
          title: '申请已提交，请等待审核',
          icon: 'success',
          duration: 2000
        })
        
        setTimeout(() => {
          uni.navigateBack()
        }, 2000)
      }, 1500)
    }
  }
}
</script>

<style>
.container {
  min-height: 100vh;
  background: #f5f5f5;
  padding: 20rpx;
}

.page-header {
  text-align: center;
  padding: 40rpx 0;
}

.page-title {
  font-size: 48rpx;
  font-weight: 700;
  color: #333;
  display: block;
  margin-bottom: 16rpx;
}

.page-subtitle {
  font-size: 28rpx;
  color: #666;
}

.form-section {
  background: white;
  border-radius: 16rpx;
  padding: 32rpx 24rpx;
  margin-bottom: 24rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
}

.section-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #333;
  margin-bottom: 32rpx;
  display: block;
}

.form-item {
  margin-bottom: 32rpx;
}

.form-item:last-child {
  margin-bottom: 0;
}

.form-label {
  font-size: 28rpx;
  color: #333;
  margin-bottom: 16rpx;
  display: block;
}

.form-input {
  width: 100%;
  height: 80rpx;
  background: #f8f9fa;
  border: 2rpx solid #e9ecef;
  border-radius: 12rpx;
  padding: 0 20rpx;
  font-size: 28rpx;
  box-sizing: border-box;
}

.form-textarea {
  width: 100%;
  min-height: 120rpx;
  background: #f8f9fa;
  border: 2rpx solid #e9ecef;
  border-radius: 12rpx;
  padding: 20rpx;
  font-size: 28rpx;
  box-sizing: border-box;
}

.checkbox-group {
  display: flex;
  flex-wrap: wrap;
}

.checkbox-item {
  display: flex;
  align-items: center;
  margin-right: 40rpx;
  margin-bottom: 16rpx;
  font-size: 28rpx;
}

.checkbox-item checkbox {
  margin-right: 12rpx;
}

.time-picker-group {
  display: flex;
  align-items: center;
}

.time-picker {
  flex: 1;
}

.time-display {
  height: 80rpx;
  background: #f8f9fa;
  border: 2rpx solid #e9ecef;
  border-radius: 12rpx;
  padding: 0 20rpx;
  font-size: 28rpx;
  line-height: 80rpx;
  color: #333;
}

.time-separator {
  margin: 0 20rpx;
  font-size: 28rpx;
  color: #666;
}

.upload-area {
  width: 200rpx;
  height: 200rpx;
  border: 2rpx dashed #d9d9d9;
  border-radius: 12rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.upload-preview {
  width: 100%;
  height: 100%;
  border-radius: 12rpx;
}

.upload-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.upload-icon {
  font-size: 48rpx;
  color: #999;
  margin-bottom: 12rpx;
}

.upload-text {
  font-size: 24rpx;
  color: #999;
  text-align: center;
}

.image-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16rpx;
}

.image-item {
  position: relative;
  width: 160rpx;
  height: 160rpx;
}

.image-preview {
  width: 100%;
  height: 100%;
  border-radius: 12rpx;
}

.image-delete {
  position: absolute;
  top: -8rpx;
  right: -8rpx;
  width: 32rpx;
  height: 32rpx;
  background: #ff4d4f;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20rpx;
  font-weight: 600;
}

.image-upload {
  width: 160rpx;
  height: 160rpx;
  border: 2rpx dashed #d9d9d9;
  border-radius: 12rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.form-actions {
  padding: 40rpx 0;
}

.btn-submit {
  width: 100%;
  height: 88rpx;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12rpx;
  font-size: 32rpx;
  font-weight: 600;
}
</style>