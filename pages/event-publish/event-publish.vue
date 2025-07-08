<template>
  <view class="container">
    <!-- 页面标题 -->
    <view class="page-header">
      <text class="page-title">发布赛事</text>
      <text class="page-subtitle">创建新的台球比赛活动</text>
    </view>

    <!-- 发布表单 -->
    <form @submit="handleSubmit">
      <!-- 基本信息 -->
      <view class="form-section">
        <text class="section-title">基本信息</text>
        
        <view class="form-item">
          <text class="form-label">比赛名称 *</text>
          <input 
            class="form-input" 
            v-model="formData.title" 
            placeholder="请输入比赛名称"
            maxlength="50"
          />
        </view>

        <view class="form-item">
          <text class="form-label">比赛类型 *</text>
          <picker 
            :range="eventTypes" 
            :range-key="'label'"
            @change="handleEventTypeChange"
            class="type-picker"
          >
            <view class="type-display">
              {{ formData.eventType ? formData.eventType.label : '请选择比赛类型' }}
            </view>
          </picker>
        </view>

        <view class="form-item">
          <text class="form-label">比赛项目 *</text>
          <picker 
            :range="gameFormats" 
            :range-key="'label'"
            @change="handleFormatChange"
            class="format-picker"
          >
            <view class="format-display">
              {{ formData.format ? formData.format.label : '请选择比赛项目' }}
            </view>
          </picker>
        </view>

        <view class="form-item">
          <text class="form-label">比赛时间 *</text>
          <view class="datetime-group">
            <picker 
              mode="date" 
              :value="formData.date" 
              @change="handleDateChange"
              class="date-picker"
            >
              <view class="datetime-display">{{ formData.date || '选择日期' }}</view>
            </picker>
            <picker 
              mode="time" 
              :value="formData.time" 
              @change="handleTimeChange"
              class="time-picker"
            >
              <view class="datetime-display">{{ formData.time || '选择时间' }}</view>
            </picker>
          </view>
        </view>

        <view class="form-item">
          <text class="form-label">比赛地点 *</text>
          <input 
            class="form-input" 
            v-model="formData.location" 
            placeholder="请输入比赛地点"
            maxlength="100"
          />
        </view>
      </view>

      <!-- 参赛设置 -->
      <view class="form-section">
        <text class="section-title">参赛设置</text>
        
        <view class="form-item">
          <text class="form-label">参赛人数 *</text>
          <input 
            class="form-input" 
            v-model.number="formData.maxParticipants" 
            placeholder="请输入最大参赛人数"
            type="number"
          />
        </view>

        <view class="form-item">
          <text class="form-label">报名费用</text>
          <input 
            class="form-input" 
            v-model.number="formData.entryFee" 
            placeholder="请输入报名费用（元）"
            type="number"
          />
        </view>

        <view class="form-item">
          <text class="form-label">报名截止时间 *</text>
          <view class="datetime-group">
            <picker 
              mode="date" 
              :value="formData.registrationEndDate" 
              @change="handleRegEndDateChange"
              class="date-picker"
            >
              <view class="datetime-display">{{ formData.registrationEndDate || '选择日期' }}</view>
            </picker>
            <picker 
              mode="time" 
              :value="formData.registrationEndTime" 
              @change="handleRegEndTimeChange"
              class="time-picker"
            >
              <view class="datetime-display">{{ formData.registrationEndTime || '选择时间' }}</view>
            </picker>
          </view>
        </view>

        <view class="form-item">
          <text class="form-label">参赛要求</text>
          <textarea 
            class="form-textarea" 
            v-model="formData.requirements" 
            placeholder="请输入参赛要求，如年龄限制、技能等级等"
            maxlength="200"
          ></textarea>
        </view>
      </view>

      <!-- 奖励设置 -->
      <view class="form-section">
        <text class="section-title">奖励设置</text>
        
        <view class="form-item">
          <text class="form-label">总奖金池</text>
          <input 
            class="form-input" 
            v-model.number="formData.totalPrize" 
            placeholder="请输入总奖金金额（元）"
            type="number"
          />
        </view>

        <view class="prize-distribution">
          <text class="prize-label">奖金分配</text>
          <view class="prize-item">
            <text class="prize-rank">冠军</text>
            <input 
              class="prize-input" 
              v-model.number="formData.firstPrize" 
              placeholder="金额"
              type="number"
            />
            <text class="prize-unit">元</text>
          </view>
          <view class="prize-item">
            <text class="prize-rank">亚军</text>
            <input 
              class="prize-input" 
              v-model.number="formData.secondPrize" 
              placeholder="金额"
              type="number"
            />
            <text class="prize-unit">元</text>
          </view>
          <view class="prize-item">
            <text class="prize-rank">季军</text>
            <input 
              class="prize-input" 
              v-model.number="formData.thirdPrize" 
              placeholder="金额"
              type="number"
            />
            <text class="prize-unit">元</text>
          </view>
        </view>
      </view>

      <!-- 比赛规则 -->
      <view class="form-section">
        <text class="section-title">比赛规则</text>
        
        <view class="form-item">
          <text class="form-label">比赛规则说明</text>
          <textarea 
            class="form-textarea large" 
            v-model="formData.rules" 
            placeholder="请详细说明比赛规则，包括赛制、计分方式、犯规处理等"
            maxlength="1000"
          ></textarea>
        </view>
      </view>

      <!-- 联系信息 -->
      <view class="form-section">
        <text class="section-title">联系信息</text>
        
        <view class="form-item">
          <text class="form-label">联系人 *</text>
          <input 
            class="form-input" 
            v-model="formData.contactName" 
            placeholder="请输入联系人姓名"
            maxlength="20"
          />
        </view>

        <view class="form-item">
          <text class="form-label">联系电话 *</text>
          <input 
            class="form-input" 
            v-model="formData.contactPhone" 
            placeholder="请输入联系电话"
            type="number"
            maxlength="11"
          />
        </view>

        <view class="form-item">
          <text class="form-label">微信号</text>
          <input 
            class="form-input" 
            v-model="formData.wechat" 
            placeholder="请输入微信号（可选）"
            maxlength="50"
          />
        </view>
      </view>

      <!-- 比赛海报 -->
      <view class="form-section">
        <text class="section-title">比赛海报</text>
        
        <view class="form-item">
          <text class="form-label">上传海报图片</text>
          <view class="poster-upload" @click="uploadPoster">
            <image v-if="formData.poster" :src="formData.poster" class="poster-preview" mode="aspectFit"></image>
            <view v-else class="poster-placeholder">
              <text class="upload-icon">🖼️</text>
              <text class="upload-text">点击上传比赛海报</text>
              <text class="upload-hint">建议尺寸：750x1000px</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 提交按钮 -->
      <view class="form-actions">
        <button class="btn-draft" @click="saveDraft">保存草稿</button>
        <button class="btn-submit" @click="handleSubmit">发布比赛</button>
      </view>
    </form>
  </view>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        title: '',
        eventType: null,
        format: null,
        date: '',
        time: '',
        location: '',
        maxParticipants: '',
        entryFee: '',
        registrationEndDate: '',
        registrationEndTime: '',
        requirements: '',
        totalPrize: '',
        firstPrize: '',
        secondPrize: '',
        thirdPrize: '',
        rules: '',
        contactName: '',
        contactPhone: '',
        wechat: '',
        poster: ''
      },
      eventTypes: [
        { value: 'open', label: '公开赛' },
        { value: 'invitation', label: '邀请赛' },
        { value: 'club', label: '俱乐部赛' },
        { value: 'amateur', label: '业余赛' },
        { value: 'professional', label: '专业赛' }
      ],
      gameFormats: [
        { value: 'american', label: '美式八球' },
        { value: 'chinese', label: '中式八球' },
        { value: 'nineball', label: '九球' },
        { value: 'snooker', label: '斯诺克' },
        { value: 'straight', label: '直板' }
      ]
    }
  },
  methods: {
    handleEventTypeChange(e) {
      this.formData.eventType = this.eventTypes[e.detail.value]
    },
    handleFormatChange(e) {
      this.formData.format = this.gameFormats[e.detail.value]
    },
    handleDateChange(e) {
      this.formData.date = e.detail.value
    },
    handleTimeChange(e) {
      this.formData.time = e.detail.value
    },
    handleRegEndDateChange(e) {
      this.formData.registrationEndDate = e.detail.value
    },
    handleRegEndTimeChange(e) {
      this.formData.registrationEndTime = e.detail.value
    },
    uploadPoster() {
      uni.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['camera', 'album'],
        success: (res) => {
          this.formData.poster = res.tempFilePaths[0]
        }
      })
    },
    validateForm() {
      if (!this.formData.title) {
        uni.showToast({ title: '请输入比赛名称', icon: 'none' })
        return false
      }
      if (!this.formData.eventType) {
        uni.showToast({ title: '请选择比赛类型', icon: 'none' })
        return false
      }
      if (!this.formData.format) {
        uni.showToast({ title: '请选择比赛项目', icon: 'none' })
        return false
      }
      if (!this.formData.date || !this.formData.time) {
        uni.showToast({ title: '请设置比赛时间', icon: 'none' })
        return false
      }
      if (!this.formData.location) {
        uni.showToast({ title: '请输入比赛地点', icon: 'none' })
        return false
      }
      if (!this.formData.maxParticipants) {
        uni.showToast({ title: '请输入参赛人数', icon: 'none' })
        return false
      }
      if (!this.formData.registrationEndDate || !this.formData.registrationEndTime) {
        uni.showToast({ title: '请设置报名截止时间', icon: 'none' })
        return false
      }
      if (!this.formData.contactName) {
        uni.showToast({ title: '请输入联系人', icon: 'none' })
        return false
      }
      if (!this.formData.contactPhone) {
        uni.showToast({ title: '请输入联系电话', icon: 'none' })
        return false
      }
      return true
    },
    saveDraft() {
      uni.showToast({
        title: '草稿已保存',
        icon: 'success'
      })
    },
    handleSubmit() {
      if (!this.validateForm()) {
        return
      }
      
      uni.showLoading({ title: '发布中...' })
      
      // 模拟发布
      setTimeout(() => {
        uni.hideLoading()
        uni.showToast({
          title: '比赛发布成功',
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

.form-textarea.large {
  min-height: 200rpx;
}

.type-picker, .format-picker {
  width: 100%;
}

.type-display, .format-display {
  height: 80rpx;
  background: #f8f9fa;
  border: 2rpx solid #e9ecef;
  border-radius: 12rpx;
  padding: 0 20rpx;
  font-size: 28rpx;
  line-height: 80rpx;
  color: #333;
}

.datetime-group {
  display: flex;
  gap: 20rpx;
}

.date-picker, .time-picker {
  flex: 1;
}

.datetime-display {
  height: 80rpx;
  background: #f8f9fa;
  border: 2rpx solid #e9ecef;
  border-radius: 12rpx;
  padding: 0 20rpx;
  font-size: 28rpx;
  line-height: 80rpx;
  color: #333;
  text-align: center;
}

.prize-distribution {
  border: 2rpx solid #e9ecef;
  border-radius: 12rpx;
  padding: 24rpx;
  background: #f8f9fa;
}

.prize-label {
  font-size: 28rpx;
  color: #333;
  margin-bottom: 20rpx;
  display: block;
}

.prize-item {
  display: flex;
  align-items: center;
  margin-bottom: 16rpx;
}

.prize-item:last-child {
  margin-bottom: 0;
}

.prize-rank {
  width: 80rpx;
  font-size: 24rpx;
  color: #666;
}

.prize-input {
  flex: 1;
  height: 60rpx;
  background: white;
  border: 2rpx solid #d9d9d9;
  border-radius: 8rpx;
  padding: 0 16rpx;
  font-size: 24rpx;
  margin: 0 12rpx;
}

.prize-unit {
  font-size: 24rpx;
  color: #666;
}

.poster-upload {
  width: 300rpx;
  height: 400rpx;
  border: 2rpx dashed #d9d9d9;
  border-radius: 12rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.poster-preview {
  width: 100%;
  height: 100%;
  border-radius: 12rpx;
}

.poster-placeholder {
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
  margin-bottom: 8rpx;
}

.upload-hint {
  font-size: 20rpx;
  color: #ccc;
}

.form-actions {
  display: flex;
  gap: 20rpx;
  padding: 40rpx 0;
}

.btn-draft {
  flex: 1;
  height: 88rpx;
  background: #f8f9fa;
  color: #666;
  border: 2rpx solid #e9ecef;
  border-radius: 12rpx;
  font-size: 32rpx;
}

.btn-submit {
  flex: 2;
  height: 88rpx;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12rpx;
  font-size: 32rpx;
  font-weight: 600;
}
</style>