<template>
  <view class="container">
    <!-- 搜索栏 -->
    <view class="search-bar">
      <view class="search-input">
        <uni-icons type="search" size="18" color="#999"></uni-icons>
        <input placeholder="搜索比赛、球馆或球员" class="search-text" />
      </view>
      <view class="filter-btn" @click="showFilter">
        <uni-icons type="tune" size="18"></uni-icons>
      </view>
    </view>

    <!-- Tab切换 -->
    <view class="tabs">
      <view 
        v-for="(tab, index) in tabs" 
        :key="index"
        class="tab-item"
        :class="{ active: currentTab === index }"
        @click="switchTab(index)"
      >
        {{ tab.name }}
      </view>
    </view>

    <!-- 轮播图 -->
    <swiper 
      class="carousel" 
      :indicator-dots="true" 
      :autoplay="true" 
      :interval="3000"
      indicator-color="rgba(255,255,255,0.5)"
      indicator-active-color="#667eea"
    >
      <swiper-item v-for="item in currentCarouselItems" :key="item.id">
        <view class="carousel-item">
          <image :src="item.image" class="carousel-image" mode="aspectFill"></image>
          <view class="carousel-content">
            <text class="carousel-title">{{ item.title }}</text>
            <text class="carousel-subtitle">{{ item.subtitle }}</text>
          </view>
        </view>
      </swiper-item>
    </swiper>

    <!-- 功能入口 -->
    <view class="features">
      <view class="feature-item" @click="navigateToEventMenu">
        <view class="feature-icon">🏆</view>
        <text class="feature-text">赛事管理</text>
      </view>
      <view class="feature-item" @click="navigateToPage('venue-cert')">
        <view class="feature-icon">🎱</view>
        <text class="feature-text">球馆认证</text>
      </view>
      <view class="feature-item" @click="navigateToPage('referee-cert')">
        <view class="feature-icon">👨‍⚖️</view>
        <text class="feature-text">裁判认证</text>
      </view>
      <view class="feature-item" @click="navigateToPage('event-simulation')">
        <view class="feature-icon">🎮</view>
        <text class="feature-text">比赛模拟</text>
      </view>
    </view>

    <!-- 内容区域 -->
    <view class="content">
      <!-- 比赛列表 -->
      <view v-if="currentTab === 0" class="competitions">
        <view v-for="competition in competitions" :key="competition.id" class="card competition-card">
          <view class="competition-header">
            <image :src="competition.image" class="competition-image" mode="aspectFill"></image>
            <view class="competition-info">
              <text class="competition-title">{{ competition.title }}</text>
              <view class="competition-meta">
                <text class="meta-item">{{ competition.format }}</text>
                <text class="meta-item">{{ competition.competitionType }}</text>
              </view>
              <view class="competition-details">
                <text class="detail-item">🏆 {{ competition.totalPrize }}</text>
                <text class="detail-item">📍 {{ competition.distance }}</text>
                <text class="detail-item">⏰ {{ competition.time }}</text>
              </view>
            </view>
          </view>
          <view class="competition-footer">
            <view class="status-badge" :class="competition.status === '报名中' ? 'status-open' : 'status-starting'">
              {{ competition.status }}
            </view>
            <text class="participants">{{ competition.participants }}人参赛</text>
          </view>
        </view>
      </view>

      <!-- 球员排行榜 -->
      <view v-if="currentTab === 1" class="rankings">
        <view v-for="player in playerRankings" :key="player.id" class="card ranking-card">
          <view class="ranking-content">
            <view class="rank-number">{{ player.rank }}</view>
            <image :src="getPlayerAvatar(player.id)" class="player-avatar" mode="aspectFill"></image>
            <view class="player-info">
              <view class="player-name">
                <text>{{ player.name }}</text>
                <text class="country">{{ player.country }}</text>
              </view>
              <text class="prize-amount">累计奖金: {{ player.totalPrize }}</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 球馆排行榜 -->
      <view v-if="currentTab === 2" class="hall-rankings">
        <view v-for="hall in hallRankings" :key="hall.id" class="card hall-card">
          <view class="hall-content">
            <view class="rank-number">{{ hall.rank }}</view>
            <image :src="getHallImage(hall.id)" class="hall-image" mode="aspectFill"></image>
            <view class="hall-info">
              <text class="hall-name">{{ hall.name }}</text>
              <text class="hall-location">📍 {{ hall.location }}</text>
              <text class="hall-prize">总奖金: {{ hall.totalPrize }}</text>
              <text class="hall-desc">{{ hall.description }}</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 裁判排行榜 -->
      <view v-if="currentTab === 3" class="judge-rankings">
        <view v-for="judge in judgeRankings" :key="judge.id" class="card judge-card">
          <view class="judge-content">
            <view class="rank-number">{{ judge.rank }}</view>
            <image :src="getJudgeAvatar(judge.id)" class="judge-avatar" mode="aspectFill"></image>
            <view class="judge-info">
              <text class="judge-name">{{ judge.name }}</text>
              <text class="judge-location">📍 {{ judge.location }}</text>
              <text class="judge-points">积分: {{ judge.points }}</text>
              <view class="judge-cert">
                <text class="cert-text">{{ judge.certification }}</text>
                <text v-if="judge.verified" class="verified">✓</text>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- 我的赛事 -->
      <view v-if="currentTab === 4" class="my-events">
        <view v-for="event in myEvents" :key="event.id" class="card event-card">
          <view class="event-header">
            <image :src="event.image" class="event-image" mode="aspectFill"></image>
            <view class="event-info">
              <text class="event-title">{{ event.title }}</text>
              <view class="event-meta">
                <text class="meta-item">{{ event.format }}</text>
                <text class="meta-item">{{ event.competitionType }}</text>
              </view>
              <text class="event-time">⏰ {{ event.time }}</text>
              <text class="event-location">📍 {{ event.location }}</text>
            </view>
          </view>
          <view class="event-result">
            <view class="rank-badge">第{{ event.myRank }}名</view>
            <text class="total-participants">共{{ event.totalParticipants }}人</text>
            <text class="prize">奖金: {{ event.prize }}</text>
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
      currentTab: 0,
      tabs: [
        { name: '比赛', key: 'competitions' },
        { name: '球员榜', key: 'players' },
        { name: '球馆榜', key: 'halls' },
        { name: '裁判榜', key: 'judges' },
        { name: '我的赛事', key: 'myEvents' }
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
          status: "报名中",
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
          status: "报名中",
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
          status: "即将开始",
        }
      ],
      playerRankings: [
        {
          id: 1,
          rank: 1,
          name: "乔峰",
          country: "🇨🇳",
          totalPrize: "134800元",
          gender: "male",
        },
        {
          id: 2,
          rank: 2,
          name: "段誉",
          country: "🇨🇳",
          totalPrize: "100000元",
          gender: "male",
        },
        {
          id: 3,
          rank: 3,
          name: "虚竹",
          country: "🇨🇳",
          totalPrize: "61300元",
          gender: "male",
        }
      ],
      hallRankings: [
        {
          id: 1,
          rank: 1,
          name: "逍遥派台球俱乐部",
          location: "大理市",
          totalPrize: "285600元",
          description: "无量山下，琅嬛福地",
        },
        {
          id: 2,
          rank: 2,
          name: "丐帮台球总舵",
          location: "洛阳市",
          totalPrize: "198500元",
          description: "天下第一大帮",
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
          verified: true,
        },
        {
          id: 2,
          rank: 2,
          name: "裁判长张会印",
          location: "威海市",
          points: "1829",
          certification: "CBA国家三级",
          verified: true,
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
          prize: "5000元",
        }
      ]
    }
  },
  computed: {
    currentCarouselItems() {
      const carouselData = {
        0: [
          {
            id: 1,
            image: "/static/mock/competition/1.png",
            title: "全国台球锦标赛",
            subtitle: "报名截止：2025年8月1日",
          },
          {
            id: 2,
            image: "/static/mock/competition/2.png",
            title: "城市联赛火热进行中",
            subtitle: "奖金池总计50万元",
          }
        ],
        1: [
          {
            id: 1,
            image: "/static/mock/head/1.png",
            title: "月度球员排行榜",
            subtitle: "根据累计奖金排名",
          }
        ],
        2: [
          {
            id: 1,
            image: "/static/mock/billiard/1.png",
            title: "月度球馆排行榜",
            subtitle: "查看最受欢迎的球馆",
          }
        ],
        3: [
          {
            id: 1,
            image: "/static/mock/head/2.png",
            title: "裁判认证培训",
            subtitle: "提升专业技能",
          }
        ],
        4: [
          {
            id: 1,
            image: "/static/mock/competition/5.png",
            title: "我的比赛历程",
            subtitle: "记录每一次精彩对决",
          }
        ]
      }
      return carouselData[this.currentTab] || carouselData[0]
    }
  },
  methods: {
    switchTab(index) {
      this.currentTab = index
    },
    showFilter() {
      uni.showToast({
        title: '筛选功能',
        icon: 'none'
      })
    },
    navigateToEventMenu() {
      uni.navigateTo({
        url: '/pages/event-menu/event-menu'
      })
    },
    navigateToPage(page) {
      const pageMap = {
        'venue-cert': '/pages/venue-cert/venue-cert',
        'referee-cert': '/pages/referee-cert/referee-cert',
        'event-simulation': '/pages/event-simulation/event-simulation'
      }
      uni.navigateTo({
        url: pageMap[page]
      })
    },
    getPlayerAvatar(id) {
      const avatars = [
        '/static/mock/head/1.png',
        '/static/mock/head/2.png',
        '/static/mock/head/3.png',
        '/static/mock/head/4.png',
        '/static/mock/head/5.png'
      ]
      return avatars[(id - 1) % avatars.length]
    },
    getHallImage(id) {
      const images = [
        '/static/mock/billiard/1.png',
        '/static/mock/billiard/2.png',
        '/static/mock/billiard/3.png'
      ]
      return images[(id - 1) % images.length]
    },
    getJudgeAvatar(id) {
      return this.getPlayerAvatar(id)
    }
  }
}
</script>

<style>
.container {
  min-height: 100vh;
  background: #f5f5f5;
}

.search-bar {
  display: flex;
  align-items: center;
  padding: 20rpx;
  background: white;
  margin-bottom: 20rpx;
}

.search-input {
  flex: 1;
  display: flex;
  align-items: center;
  background: #f8f9fa;
  border-radius: 24rpx;
  padding: 16rpx 24rpx;
  margin-right: 20rpx;
}

.search-text {
  margin-left: 16rpx;
  font-size: 28rpx;
  color: #666;
}

.filter-btn {
  padding: 16rpx;
  background: #667eea;
  border-radius: 12rpx;
}

.tabs {
  display: flex;
  background: white;
  padding: 0 20rpx;
  margin-bottom: 20rpx;
}

.tab-item {
  flex: 1;
  text-align: center;
  padding: 24rpx 0;
  font-size: 28rpx;
  color: #666;
  border-bottom: 4rpx solid transparent;
}

.tab-item.active {
  color: #667eea;
  border-bottom-color: #667eea;
  font-weight: 600;
}

.carousel {
  height: 320rpx;
  margin-bottom: 20rpx;
}

.carousel-item {
  position: relative;
  height: 100%;
  border-radius: 16rpx;
  overflow: hidden;
  margin: 0 20rpx;
}

.carousel-image {
  width: 100%;
  height: 100%;
}

.carousel-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0,0,0,0.7));
  padding: 40rpx 24rpx 24rpx;
  color: white;
}

.carousel-title {
  font-size: 32rpx;
  font-weight: 600;
  display: block;
  margin-bottom: 8rpx;
}

.carousel-subtitle {
  font-size: 24rpx;
  opacity: 0.9;
}

.features {
  display: flex;
  padding: 0 20rpx 20rpx;
}

.feature-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24rpx;
  background: white;
  border-radius: 16rpx;
  margin-right: 20rpx;
}

.feature-item:last-child {
  margin-right: 0;
}

.feature-icon {
  font-size: 48rpx;
  margin-bottom: 16rpx;
}

.feature-text {
  font-size: 24rpx;
  color: #666;
}

.content {
  padding: 0 20rpx;
}

.competition-card {
  margin-bottom: 24rpx;
}

.competition-header {
  display: flex;
  margin-bottom: 20rpx;
}

.competition-image {
  width: 120rpx;
  height: 120rpx;
  border-radius: 12rpx;
  margin-right: 20rpx;
}

.competition-info {
  flex: 1;
}

.competition-title {
  font-size: 32rpx;
  font-weight: 600;
  margin-bottom: 12rpx;
  display: block;
}

.competition-meta {
  display: flex;
  margin-bottom: 12rpx;
}

.meta-item {
  padding: 8rpx 16rpx;
  background: #f0f0f0;
  border-radius: 8rpx;
  font-size: 20rpx;
  margin-right: 12rpx;
}

.competition-details {
  display: flex;
  flex-direction: column;
}

.detail-item {
  font-size: 24rpx;
  color: #666;
  margin-bottom: 4rpx;
}

.competition-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 20rpx;
  border-top: 2rpx solid #f0f0f0;
}

.status-badge {
  padding: 8rpx 16rpx;
  border-radius: 8rpx;
  font-size: 24rpx;
  font-weight: 600;
}

.status-open {
  background: #e8f5e8;
  color: #52c41a;
}

.status-starting {
  background: #fff7e6;
  color: #fa8c16;
}

.participants {
  font-size: 24rpx;
  color: #666;
}

.ranking-card, .hall-card, .judge-card {
  margin-bottom: 20rpx;
}

.ranking-content, .hall-content, .judge-content {
  display: flex;
  align-items: center;
}

.rank-number {
  width: 60rpx;
  height: 60rpx;
  background: #667eea;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  margin-right: 20rpx;
}

.player-avatar, .judge-avatar {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  margin-right: 20rpx;
}

.hall-image {
  width: 80rpx;
  height: 80rpx;
  border-radius: 12rpx;
  margin-right: 20rpx;
}

.player-info, .hall-info, .judge-info {
  flex: 1;
}

.player-name, .hall-name, .judge-name {
  font-size: 32rpx;
  font-weight: 600;
  margin-bottom: 8rpx;
  display: block;
}

.country {
  margin-left: 12rpx;
}

.prize-amount, .hall-location, .hall-prize, .hall-desc, .judge-location, .judge-points {
  font-size: 24rpx;
  color: #666;
  margin-bottom: 4rpx;
  display: block;
}

.judge-cert {
  display: flex;
  align-items: center;
}

.cert-text {
  font-size: 24rpx;
  color: #667eea;
}

.verified {
  margin-left: 8rpx;
  color: #52c41a;
  font-weight: 600;
}

.event-card {
  margin-bottom: 24rpx;
}

.event-header {
  display: flex;
  margin-bottom: 20rpx;
}

.event-image {
  width: 120rpx;
  height: 120rpx;
  border-radius: 12rpx;
  margin-right: 20rpx;
}

.event-info {
  flex: 1;
}

.event-title {
  font-size: 32rpx;
  font-weight: 600;
  margin-bottom: 12rpx;
  display: block;
}

.event-meta {
  display: flex;
  margin-bottom: 12rpx;
}

.event-time, .event-location {
  font-size: 24rpx;
  color: #666;
  margin-bottom: 4rpx;
  display: block;
}

.event-result {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 20rpx;
  border-top: 2rpx solid #f0f0f0;
}

.rank-badge {
  padding: 8rpx 16rpx;
  background: #ffd700;
  color: #8b4513;
  border-radius: 8rpx;
  font-size: 24rpx;
  font-weight: 600;
}

.total-participants, .prize {
  font-size: 24rpx;
  color: #666;
}
</style>