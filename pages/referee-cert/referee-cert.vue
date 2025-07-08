<template>
  <view class="container">
    <!-- 页面标题 -->
    <view class="page-header">
      <text class="page-title">裁判认证</text>
      <text class="page-subtitle">申请成为认证台球裁判</text>
    </view>

    <!-- 认证表单 -->
    <form @submit="handleSubmit">
      <!-- 个人信息 -->
      <view class="form-section">
        <text class="section-title">个人信息</text>
        
        <view class="form-item">
          <text class="form-label">姓名 *</text>
          <input 
            class="form-input" 
            v-model="formData.name" 
            placeholder="请输入真实姓名"
            maxlength="20"
          />
        </view>

        <view class="form-item">
          <text class="form-label">性别 *</text>
          <radio-group @change="handleGenderChange">
            <view class="radio-group">
              <label class="radio-item">
                <radio value="male" :checked="formData.gender === 'male'" />
                <text>男</text>
              </label>
              <label class="radio-item">
                <radio value="female" :checked="formData.gender === 'female'" />
                <text>女</text>
              </label>
            </view>
          </radio-group>
        </view>

        <view class="form-item">
          <text class="form-label">年龄 *</text>
          <input 
            class="form-input" 
            v-model.number="formData.age" 
            placeholder="请输入年龄"
            type="number"
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
          <text class="form-label">身份证号 *</text>
          <input 
            class="form-input" 
            v-model="formData.idCard" 
            placeholder="请输入身份证号码"
            maxlength="18"
          />
        </view>

        <view class="form-item">
          <text class="form-label">所在地区 *</text>
          <picker 
            mode="region" 
            :value="formData.region" 
            @change="handleRegionChange"
            class="region-picker"
          >
            <view class="region-display">
              {{ formData.region.length ? formData.region.join(' ') : '请选择所在地区' }}
            </view>
          </picker>
        </view>
      </view>

      <!-- 专业资质 -->
      <view class="form-section">
        <text class="section-title">专业资质</text>
        
        <view class="form-item">
          <text class="form-label">申请裁判等级 *</text>
          <picker 
            :range="refereeGrades" 
            :range-key="'label'"
            @change="handleGradeChange"
            class="grade-picker"
          >
            <view class="grade-display">
              {{ formData.grade ? formData.grade.label : '请选择裁判等级' }}
            </view>
          </picker>
        </view>

        <view class="form-item">
          <text class="form-label">专长项目</text>
          <view class="checkbox-group">
            <label v-for="sport in sportsTypes" :key="sport.value" class="checkbox-item">
              <checkbox 
                :value="sport.value" 
                :checked="formData.sportsTypes.includes(sport.value)"
                @change="handleSportsChange"
              />
              <text>{{ sport.label }}</text>
            </label>
          </view>
        </view>

        <view class="form-item">
          <text class="form-label">裁判经验</text>
          <textarea 
            class="form-textarea" 
            v-model="formData.experience" 
            placeholder="请简述您的台球裁判经验，包括参与过的比赛、获得的认证等"
            maxlength="500"
          ></textarea>
        </view>
      </view>

      <!-- 证件上传 -->
      <view class="form-section">
        <text class="section-title">证件上传</text>
        
        <view class="form-item">
          <text class="form-label">身份证正面</text>
          <view class="upload-area" @click="uploadIdCardFront">
            <image v-if="formData.idCardFront" :src="formData.idCardFront" class="upload-preview" mode="aspectFit"></image>
            <view v-else class="upload-placeholder">
              <text class="upload-icon">📷</text>
              <text class="upload-text">点击上传身份证正面</text>
            </view>
          </view>
        </view>

        <view class="form-item">
          <text class="form-label">身份证反面</text>
          <view class="upload-area" @click="uploadIdCardBack">
            <image v-if="formData.idCardBack" :src="formData.idCardBack" class="upload-preview" mode="aspectFit"></image>
            <view v-else class="upload-placeholder">
              <text class="upload-icon">📷</text>
              <text class="upload-text">点击上传身份证反面</text>
            </view>
          </view>
        </view>

        <view class="form-item">
          <text class="form-label">证件照</text>
          <view class="upload-area" @click="uploadPhoto">
            <image v-if="formData.photo" :src="formData.photo" class="upload-preview" mode="aspectFit"></image>
            <view v-else class="upload-placeholder">
              <text class="upload-icon">📷</text>
              <text class="upload-text">点击上传证件照</text>
            </view>
          </view>
        </view>

        <view class="form-item">
          <text class="form-label">相关证书（可选）</text>
          <view class="image-grid">
            <view 
              v-for="(cert, index) in formData.certificates" 
              :key="index" 
              class="image-item"
              @click="previewCertificate(index)"
            >
              <image :src="cert" class="image-preview" mode="aspectFill"></image>
              <view class="image-delete" @click.stop="deleteCertificate(index)">×</view>
            </view>
            <view v-if="formData.certificates.length < 3" class="image-upload" @click="uploadCertificates">
              <text class="upload-icon">+</text>
              <text class="upload-text">添加证书</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 承诺声明 -->
      <view class="form-section">
        <text class="section-title">承诺声明</text>
        
        <view class="declaration-text">
          <text>我承诺：</text>
          <text>1. 所提供的信息真实有效，如有虚假愿承担相应责任</text>
          <text>2. 严格遵守裁判职业道德，公平公正执裁</text>
          <text>3. 积极参与相关培训，不断提升专业水平</text>
          <text>4. 服从比赛组织方安排，认真完成裁判工作</text>
        </view>

        <view class="agreement-item">
          <checkbox 
            :checked="formData.agreeTerms"
            @change="handleAgreeChange"
          />
          <text class="agreement-text">我已阅读并同意以上承诺声明</text>
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
        gender: '',
        age: '',
        phone: '',
        idCard: '',
        region: [],
        grade: null,
        sportsTypes: [],
        experience: '',
        idCardFront: '',
        idCardBack: '',
        photo: '',
        certificates: [],
        agreeTerms: false
      },
      refereeGrades: [
        { value: 'national_1', label: 'CBA国家一级' },
        { value: 'national_2', label: 'CBA国家二级' },
        { value: 'national_3', label: 'CBA国家三级' },
        { value: 'regional', label: '地区级' },
        { value: 'local', label: '地方级' }
      ],
      sportsTypes: [
        { value: 'american', label: '美式八球' },
        { value: 'chinese', label: '中式八球' },
        { value: 'nineball', label: '九球' },
        { value: 'snooker', label: '斯诺克' },
        { value: 'straight', label: '直板' }
      ]
    }
  },
  methods: {
    handleGenderChange(e) {
      this.formData.gender = e.detail.value
    },
    handleRegionChange(e) {
      this.formData.region = e.detail.value
    },
    handleGradeChange(e) {
      this.formData.grade = this.refereeGrades[e.detail.value]
    },
    handleSportsChange(e) {
      this.formData.sportsTypes = e.detail.value
    },
    handleAgreeChange(e) {
      this.formData.agreeTerms = e.detail.value.length > 0
    },
    uploadIdCardFront() {
      uni.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['camera', 'album'],
        success: (res) => {
          this.formData.idCardFront = res.tempFilePaths[0]
        }
      })
    },
    uploadIdCardBack() {
      uni.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['camera', 'album'],
        success: (res) => {
          this.formData.idCardBack = res.tempFilePaths[0]
        }
      })
    },
    uploadPhoto() {
      uni.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['camera', 'album'],
        success: (res) => {
          this.formData.photo = res.tempFilePaths[0]
        }
      })
    },
    uploadCertificates() {
      const remainingCount = 3 - this.formData.certificates.length
      uni.chooseImage({
        count: remainingCount,
        sizeType: ['compressed'],
        sourceType: ['camera', 'album'],
        success: (res) => {
          this.formData.certificates = [...this.formData.certificates, ...res.tempFilePaths]
        }
      })
    },
    previewCertificate(index) {
      uni.previewImage({
        current: index,
        urls: this.formData.certificates
      })
    },
    deleteCertificate(index) {
      this.formData.certificates.splice(index, 1)
    },
    validateForm() {
      if (!this.formData.name) {
        uni.showToast({ title: '请输入姓名', icon: 'none' })
        return false
      }
      if (!this.formData.gender) {
        uni.showToast({ title: '请选择性别', icon: 'none' })
        return false
      }
      if (!this.formData.age) {
        uni.showToast({ title: '请输入年龄', icon: 'none' })
        return false
      }
      if (!this.formData.phone) {
        uni.showToast({ title: '请输入联系电话', icon: 'none' })
        return false
      }
      if (!this.formData.idCard) {
        uni.showToast({ title: '请输入身份证号', icon: 'none' })
        return false
      }
      if (!this.formData.region.length) {
        uni.showToast({ title: '请选择所在地区', icon: 'none' })
        return false
      }
      if (!this.formData.grade) {
        uni.showToast({ title: '请选择裁判等级', icon: 'none' })
        return false
      }
      if (!this.formData.agreeTerms) {
        uni.showToast({ title: '请同意承诺声明', icon: 'none' })
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

.radio-group {
  display: flex;
}

.radio-item {
  display: flex;
  align-items: center;
  margin-right: 40rpx;
  font-size: 28rpx;
}

.radio-item radio {
  margin-right: 12rpx;
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

.region-picker, .grade-picker {
  width: 100%;
}

.region-display, .grade-display {
  height: 80rpx;
  background: #f8f9fa;
  border: 2rpx solid #e9ecef;
  border-radius: 12rpx;
  padding: 0 20rpx;
  font-size: 28rpx;
  line-height: 80rpx;
  color: #333;
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

.declaration-text {
  background: #f8f9fa;
  border-radius: 12rpx;
  padding: 24rpx;
  margin-bottom: 24rpx;
}

.declaration-text text {
  display: block;
  font-size: 24rpx;
  color: #666;
  line-height: 1.6;
  margin-bottom: 8rpx;
}

.agreement-item {
  display: flex;
  align-items: center;
}

.agreement-text {
  margin-left: 12rpx;
  font-size: 28rpx;
  color: #333;
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