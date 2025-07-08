<template>
  <view class="container">
    <!-- 页面标题 -->
    <view class="page-header">
      <text class="page-title">赛事管理</text>
      <text class="page-subtitle">发布、管理和模拟台球比赛</text>
    </view>

    <!-- 功能卡片 -->
    <view class="feature-cards">
      <view class="feature-card" @click="navigateToPublish">
        <view class="card-icon">📝</view>
        <view class="card-content">
          <text class="card-title">发布赛事</text>
          <text class="card-desc">创建新的台球比赛活动</text>
        </view>
        <view class="card-arrow">→</view>
      </view>

      <view class="feature-card" @click="navigateToSimulation">
        <view class="card-icon">🎮</view>
        <view class="card-content">
          <text class="card-title">比赛模拟</text>
          <text class="card-desc">模拟比赛过程和结果</text>
        </view>
        <view class="card-arrow">→</view>
      </view>

      <view class="feature-card" @click="navigateToVenueCert">
        <view class="card-icon">🏢</view>
        <view class="card-content">
          <text class="card-title">球馆认证</text>
          <text class="card-desc">申请球馆资质认证</text>
        </view>
        <view class="card-arrow">→</view>
      </view>

      <view class="feature-card" @click="navigateToRefereeCert">
        <view class="card-icon">👨‍⚖️</view>
        <view class="card-content">
          <text class="card-title">裁判认证</text>
          <text class="card-desc">申请裁判资格认证</text>
        </view>
        <view class="card-arrow">→</view>
      </view>
    </view>

    <!-- 快速统计 -->
    <view class="stats-section">
      <text class="section-title">数据统计</text>
      <view class="stats-grid">
        <view class="stat-item">
          <text class="stat-number">1,234</text>
          <text class="stat-label">总比赛数</text>
        </view>
        <view class="stat-item">
          <text class="stat-number">567</text>
          <text class="stat-label">认证球馆</text>
        </view>
        <view class="stat-item">
          <text class="stat-number">89</text>
          <text class="stat-label">认证裁判</text>
        </view>
        <view class="stat-item">
          <text class="stat-number">45</text>
          <text class="stat-label">进行中</text>
        </view>
      </view>
    </view>

    <!-- 最近活动 -->
    <view class="recent-section">
      <text class="section-title">最近活动</text>
      <view class="activity-list">
        <view v-for="activity in recentActivities" :key="activity.id" class="activity-item">
          <view class="activity-icon" :class="activity.type">{{ activity.icon }}</view>
          <view class="activity-content">
            <text class="activity-title">{{ activity.title }}</text>
            <text class="activity-time">{{ activity.time }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      recentActivities: [
        {
          id: 1,
          type: 'event',
          icon: '🏆',
          title: '杭州市美式八球邀请赛已发布',
          time: '2小时前'
        },
        {
          id: 2,
          type: 'venue',
          icon: '🏢',
          title: '逍遥派台球俱乐部通过认证',
          time: '5小时前'
        },
        {
          id: 3,
          type: 'referee',
          icon: '👨‍⚖️',
          title: '新增3名认证裁判',
          time: '1天前'
        },
        {
          id: 4,
          type: 'simulation',
          icon: '🎮',
          title: '比赛模拟功能更新',
          time: '2天前'
        }
      ]
    }
  },
  methods: {
    navigateToPublish() {
      uni.navigateTo({
        url: '/pages/event-publish/event-publish'
      })
    },
    navigateToSimulation() {
      uni.navigateTo({
        url: '/pages/event-simulation/event-simulation'
      })
    },
    navigateToVenueCert() {
      uni.navigateTo({
        url: '/pages/venue-cert/venue-cert'
      })
    },
    navigateToRefereeCert() {
      uni.navigateTo({
        url: '/pages/referee-cert/referee-cert'
      })
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
  padding: 40rpx 0 60rpx;
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

.feature-cards {
  margin-bottom: 60rpx;
}

.feature-card {
  display: flex;
  align-items: center;
  background: white;
  border-radius: 16rpx;
  padding: 32rpx 24rpx;
  margin-bottom: 24rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
}

.card-icon {
  font-size: 48rpx;
  margin-right: 24rpx;
}

.card-content {
  flex: 1;
}

.card-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #333;
  display: block;
  margin-bottom: 8rpx;
}

.card-desc {
  font-size: 24rpx;
  color: #666;
}

.card-arrow {
  font-size: 32rpx;
  color: #667eea;
  font-weight: 600;
}

.stats-section {
  margin-bottom: 60rpx;
}

.section-title {
  font-size: 36rpx;
  font-weight: 600;
  color: #333;
  margin-bottom: 32rpx;
  display: block;
}

.stats-grid {
  display: flex;
  background: white;
  border-radius: 16rpx;
  overflow: hidden;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
}

.stat-item {
  flex: 1;
  text-align: center;
  padding: 32rpx 16rpx;
  border-right: 2rpx solid #f0f0f0;
}

.stat-item:last-child {
  border-right: none;
}

.stat-number {
  font-size: 40rpx;
  font-weight: 700;
  color: #667eea;
  display: block;
  margin-bottom: 8rpx;
}

.stat-label {
  font-size: 24rpx;
  color: #666;
}

.recent-section {
  margin-bottom: 40rpx;
}

.activity-list {
  background: white;
  border-radius: 16rpx;
  overflow: hidden;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
}

.activity-item {
  display: flex;
  align-items: center;
  padding: 24rpx;
  border-bottom: 2rpx solid #f8f9fa;
}

.activity-item:last-child {
  border-bottom: none;
}

.activity-icon {
  width: 60rpx;
  height: 60rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24rpx;
  margin-right: 20rpx;
}

.activity-icon.event {
  background: #fff2f0;
  color: #fa541c;
}

.activity-icon.venue {
  background: #f6ffed;
  color: #52c41a;
}

.activity-icon.referee {
  background: #f0f5ff;
  color: #1890ff;
}

.activity-icon.simulation {
  background: #fff7e6;
  color: #fa8c16;
}

.activity-content {
  flex: 1;
}

.activity-title {
  font-size: 28rpx;
  color: #333;
  display: block;
  margin-bottom: 8rpx;
}

.activity-time {
  font-size: 24rpx;
  color: #999;
}
</style>