<template>
  <view class="container">
    <!-- 页面标题 -->
    <view class="page-header">
      <text class="page-title">比赛模拟</text>
      <text class="page-subtitle">模拟台球比赛过程和结果</text>
    </view>

    <!-- 模拟设置 -->
    <view class="form-section">
      <text class="section-title">模拟设置</text>
      
      <view class="form-item">
        <text class="form-label">比赛项目</text>
        <picker 
          :range="gameFormats" 
          :range-key="'label'"
          @change="handleFormatChange"
          class="format-picker"
        >
          <view class="format-display">
            {{ simulationData.format ? simulationData.format.label : '请选择比赛项目' }}
          </view>
        </picker>
      </view>

      <view class="form-item">
        <text class="form-label">参赛人数</text>
        <picker 
          :range="playerCounts" 
          @change="handlePlayerCountChange"
          class="count-picker"
        >
          <view class="count-display">
            {{ simulationData.playerCount ? simulationData.playerCount + '人' : '请选择参赛人数' }}
          </view>
        </picker>
      </view>

      <view class="form-item">
        <text class="form-label">赛制</text>
        <picker 
          :range="tournamentTypes" 
          :range-key="'label'"
          @change="handleTournamentTypeChange"
          class="tournament-picker"
        >
          <view class="tournament-display">
            {{ simulationData.tournamentType ? simulationData.tournamentType.label : '请选择赛制' }}
          </view>
        </picker>
      </view>

      <view class="form-item">
        <text class="form-label">模拟速度</text>
        <radio-group @change="handleSpeedChange">
          <view class="radio-group">
            <label class="radio-item">
              <radio value="fast" :checked="simulationData.speed === 'fast'" />
              <text>快速</text>
            </label>
            <label class="radio-item">
              <radio value="normal" :checked="simulationData.speed === 'normal'" />
              <text>正常</text>
            </label>
            <label class="radio-item">
              <radio value="slow" :checked="simulationData.speed === 'slow'" />
              <text>慢速</text>
            </label>
          </view>
        </radio-group>
      </view>
    </view>

    <!-- 参赛球员 -->
    <view v-if="simulationData.playerCount" class="form-section">
      <text class="section-title">参赛球员</text>
      
      <view class="player-grid">
        <view 
          v-for="(player, index) in players" 
          :key="index"
          class="player-card"
          :class="{ selected: player.selected }"
          @click="togglePlayerSelection(index)"
        >
          <image :src="player.avatar" class="player-avatar" mode="aspectFill"></image>
          <text class="player-name">{{ player.name }}</text>
          <text class="player-skill">技能: {{ player.skill }}</text>
          <view v-if="player.selected" class="selection-mark">✓</view>
        </view>
      </view>

      <view class="player-actions">
        <button class="btn-random" @click="randomSelectPlayers">随机选择</button>
        <button class="btn-clear" @click="clearSelection">清空选择</button>
      </view>
    </view>

    <!-- 模拟控制 -->
    <view class="simulation-control">
      <button 
        class="btn-start" 
        :disabled="!canStartSimulation"
        @click="startSimulation"
      >
        {{ isSimulating ? '模拟进行中...' : '开始模拟' }}
      </button>
    </view>

    <!-- 比赛进程 -->
    <view v-if="matchHistory.length > 0" class="match-history">
      <text class="section-title">比赛进程</text>
      
      <view class="history-list">
        <view 
          v-for="(match, index) in matchHistory" 
          :key="index"
          class="match-item"
          :class="{ current: match.isCurrent }"
        >
          <view class="match-round">{{ match.round }}</view>
          <view class="match-players">
            <view class="player-vs">
              <text class="player-name">{{ match.player1.name }}</text>
              <text class="vs">VS</text>
              <text class="player-name">{{ match.player2.name }}</text>
            </view>
            <view v-if="match.result" class="match-result">
              <text class="score">{{ match.result.score }}</text>
              <text class="winner">胜者: {{ match.result.winner }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 比赛结果 -->
    <view v-if="finalResult" class="final-result">
      <text class="section-title">比赛结果</text>
      
      <view class="podium">
        <view class="podium-item champion">
          <view class="rank-badge gold">🥇</view>
          <image :src="finalResult.champion.avatar" class="result-avatar" mode="aspectFill"></image>
          <text class="result-name">{{ finalResult.champion.name }}</text>
          <text class="result-title">冠军</text>
        </view>
        
        <view v-if="finalResult.runnerUp" class="podium-item runner-up">
          <view class="rank-badge silver">🥈</view>
          <image :src="finalResult.runnerUp.avatar" class="result-avatar" mode="aspectFill"></image>
          <text class="result-name">{{ finalResult.runnerUp.name }}</text>
          <text class="result-title">亚军</text>
        </view>
        
        <view v-if="finalResult.thirdPlace" class="podium-item third">
          <view class="rank-badge bronze">🥉</view>
          <image :src="finalResult.thirdPlace.avatar" class="result-avatar" mode="aspectFill"></image>
          <text class="result-name">{{ finalResult.thirdPlace.name }}</text>
          <text class="result-title">季军</text>
        </view>
      </view>

      <view class="result-actions">
        <button class="btn-restart" @click="restartSimulation">重新模拟</button>
        <button class="btn-save" @click="saveResult">保存结果</button>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      simulationData: {
        format: null,
        playerCount: null,
        tournamentType: null,
        speed: 'normal'
      },
      gameFormats: [
        { value: 'american', label: '美式八球' },
        { value: 'chinese', label: '中式八球' },
        { value: 'nineball', label: '九球' },
        { value: 'snooker', label: '斯诺克' }
      ],
      playerCounts: [4, 8, 16, 32],
      tournamentTypes: [
        { value: 'single', label: '单败淘汰' },
        { value: 'double', label: '双败淘汰' },
        { value: 'roundrobin', label: '循环赛' },
        { value: 'swiss', label: '瑞士制' }
      ],
      players: [
        { name: '乔峰', avatar: '/static/mock/head/1.png', skill: 95, selected: false },
        { name: '段誉', avatar: '/static/mock/head/2.png', skill: 88, selected: false },
        { name: '虚竹', avatar: '/static/mock/head/3.png', skill: 92, selected: false },
        { name: '慕容复', avatar: '/static/mock/head/4.png', skill: 89, selected: false },
        { name: '王语嫣', avatar: '/static/mock/head/5.png', skill: 75, selected: false },
        { name: '阿朱', avatar: '/static/mock/head/1.png', skill: 78, selected: false },
        { name: '阿紫', avatar: '/static/mock/head/2.png', skill: 82, selected: false },
        { name: '钟灵', avatar: '/static/mock/head/3.png', skill: 73, selected: false },
        { name: '木婉清', avatar: '/static/mock/head/4.png', skill: 76, selected: false },
        { name: '甘宝宝', avatar: '/static/mock/head/5.png', skill: 71, selected: false },
        { name: '秦红棉', avatar: '/static/mock/head/1.png', skill: 79, selected: false },
        { name: '阮星竹', avatar: '/static/mock/head/2.png', skill: 77, selected: false },
        { name: '李青萝', avatar: '/static/mock/head/3.png', skill: 74, selected: false },
        { name: '马夫人', avatar: '/static/mock/head/4.png', skill: 72, selected: false },
        { name: '康敏', avatar: '/static/mock/head/5.png', skill: 68, selected: false },
        { name: '包不同', avatar: '/static/mock/head/1.png', skill: 85, selected: false },
        { name: '风波恶', avatar: '/static/mock/head/2.png', skill: 83, selected: false },
        { name: '邓百川', avatar: '/static/mock/head/3.png', skill: 84, selected: false },
        { name: '公冶乾', avatar: '/static/mock/head/4.png', skill: 81, selected: false },
        { name: '全冠清', avatar: '/static/mock/head/5.png', skill: 80, selected: false },
        { name: '鸠摩智', avatar: '/static/mock/head/1.png', skill: 93, selected: false },
        { name: '无崖子', avatar: '/static/mock/head/2.png', skill: 96, selected: false },
        { name: '苏星河', avatar: '/static/mock/head/3.png', skill: 87, selected: false },
        { name: '丁春秋', avatar: '/static/mock/head/4.png', skill: 86, selected: false },
        { name: '游坦之', avatar: '/static/mock/head/5.png', skill: 69, selected: false },
        { name: '庄聚贤', avatar: '/static/mock/head/1.png', skill: 70, selected: false },
        { name: '白世镜', avatar: '/static/mock/head/2.png', skill: 67, selected: false },
        { name: '司马林', avatar: '/static/mock/head/3.png', skill: 66, selected: false },
        { name: '哲罗星', avatar: '/static/mock/head/4.png', skill: 65, selected: false },
        { name: '出尘子', avatar: '/static/mock/head/5.png', skill: 64, selected: false },
        { name: '摘星子', avatar: '/static/mock/head/1.png', skill: 63, selected: false },
        { name: '天狼子', avatar: '/static/mock/head/2.png', skill: 62, selected: false }
      ],
      isSimulating: false,
      matchHistory: [],
      finalResult: null
    }
  },
  computed: {
    selectedPlayers() {
      return this.players.filter(player => player.selected)
    },
    canStartSimulation() {
      return this.simulationData.format && 
             this.simulationData.playerCount && 
             this.simulationData.tournamentType &&
             this.selectedPlayers.length === this.simulationData.playerCount &&
             !this.isSimulating
    }
  },
  methods: {
    handleFormatChange(e) {
      this.simulationData.format = this.gameFormats[e.detail.value]
    },
    handlePlayerCountChange(e) {
      this.simulationData.playerCount = this.playerCounts[e.detail.value]
      this.clearSelection()
    },
    handleTournamentTypeChange(e) {
      this.simulationData.tournamentType = this.tournamentTypes[e.detail.value]
    },
    handleSpeedChange(e) {
      this.simulationData.speed = e.detail.value
    },
    togglePlayerSelection(index) {
      if (this.selectedPlayers.length >= this.simulationData.playerCount && !this.players[index].selected) {
        uni.showToast({
          title: `最多选择${this.simulationData.playerCount}名球员`,
          icon: 'none'
        })
        return
      }
      this.players[index].selected = !this.players[index].selected
    },
    randomSelectPlayers() {
      this.clearSelection()
      const shuffled = [...this.players].sort(() => Math.random() - 0.5)
      for (let i = 0; i < this.simulationData.playerCount; i++) {
        const playerIndex = this.players.findIndex(p => p.name === shuffled[i].name)
        this.players[playerIndex].selected = true
      }
    },
    clearSelection() {
      this.players.forEach(player => {
        player.selected = false
      })
    },
    async startSimulation() {
      this.isSimulating = true
      this.matchHistory = []
      this.finalResult = null
      
      const selectedPlayers = [...this.selectedPlayers]
      const speedDelay = {
        fast: 500,
        normal: 1000,
        slow: 2000
      }
      
      if (this.simulationData.tournamentType.value === 'single') {
        await this.runSingleElimination(selectedPlayers, speedDelay[this.simulationData.speed])
      }
      
      this.isSimulating = false
    },
    async runSingleElimination(players, delay) {
      let currentRound = 1
      let currentPlayers = [...players]
      
      while (currentPlayers.length > 1) {
        const roundName = this.getRoundName(currentPlayers.length, currentRound)
        const roundMatches = []
        const winners = []
        
        // 配对比赛
        for (let i = 0; i < currentPlayers.length; i += 2) {
          if (i + 1 < currentPlayers.length) {
            const player1 = currentPlayers[i]
            const player2 = currentPlayers[i + 1]
            
            const match = {
              round: roundName,
              player1,
              player2,
              result: null,
              isCurrent: true
            }
            
            this.matchHistory.push(match)
            await this.delay(delay)
            
            // 模拟比赛结果
            const winner = this.simulateMatch(player1, player2)
            const score = this.generateScore()
            
            match.result = {
              winner: winner.name,
              score
            }
            match.isCurrent = false
            
            winners.push(winner)
            roundMatches.push(match)
            
            await this.delay(delay)
          } else {
            // 轮空
            winners.push(currentPlayers[i])
          }
        }
        
        currentPlayers = winners
        currentRound++
      }
      
      // 生成最终结果
      this.generateFinalResult(currentPlayers[0])
    },
    simulateMatch(player1, player2) {
      // 根据技能值计算获胜概率
      const skill1 = player1.skill
      const skill2 = player2.skill
      const totalSkill = skill1 + skill2
      const player1WinRate = skill1 / totalSkill
      
      // 添加一些随机性
      const randomFactor = 0.2
      const adjustedWinRate = player1WinRate + (Math.random() - 0.5) * randomFactor
      
      return Math.random() < adjustedWinRate ? player1 : player2
    },
    generateScore() {
      const scores = ['7-0', '7-1', '7-2', '7-3', '7-4', '7-5', '7-6']
      return scores[Math.floor(Math.random() * scores.length)]
    },
    getRoundName(playerCount, round) {
      if (playerCount === 2) return '决赛'
      if (playerCount === 4) return '半决赛'
      if (playerCount === 8) return '1/4决赛'
      if (playerCount === 16) return '1/8决赛'
      return `第${round}轮`
    },
    generateFinalResult(champion) {
      // 从比赛历史中找出亚军和季军
      const finalMatch = this.matchHistory[this.matchHistory.length - 1]
      const runnerUp = finalMatch.player1.name === champion.name ? finalMatch.player2 : finalMatch.player1
      
      let thirdPlace = null
      if (this.matchHistory.length > 1) {
        const semiMatches = this.matchHistory.filter(match => match.round === '半决赛')
        if (semiMatches.length >= 2) {
          const losers = semiMatches.map(match => {
            const winner = match.result.winner
            return match.player1.name === winner ? match.player2 : match.player1
          })
          thirdPlace = losers.find(player => player.name !== runnerUp.name) || losers[0]
        }
      }
      
      this.finalResult = {
        champion,
        runnerUp,
        thirdPlace
      }
    },
    delay(ms) {
      return new Promise(resolve => setTimeout(resolve, ms))
    },
    restartSimulation() {
      this.matchHistory = []
      this.finalResult = null
      this.isSimulating = false
    },
    saveResult() {
      uni.showToast({
        title: '结果已保存',
        icon: 'success'
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

.format-picker, .count-picker, .tournament-picker {
  width: 100%;
}

.format-display, .count-display, .tournament-display {
  height: 80rpx;
  background: #f8f9fa;
  border: 2rpx solid #e9ecef;
  border-radius: 12rpx;
  padding: 0 20rpx;
  font-size: 28rpx;
  line-height: 80rpx;
  color: #333;
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

.player-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16rpx;
  margin-bottom: 32rpx;
}

.player-card {
  position: relative;
  background: #f8f9fa;
  border: 2rpx solid #e9ecef;
  border-radius: 12rpx;
  padding: 16rpx;
  text-align: center;
  transition: all 0.3s;
}

.player-card.selected {
  background: #e6f7ff;
  border-color: #1890ff;
}

.player-avatar {
  width: 60rpx;
  height: 60rpx;
  border-radius: 50%;
  margin-bottom: 8rpx;
}

.player-name {
  font-size: 24rpx;
  color: #333;
  margin-bottom: 4rpx;
  display: block;
}

.player-skill {
  font-size: 20rpx;
  color: #666;
}

.selection-mark {
  position: absolute;
  top: 8rpx;
  right: 8rpx;
  width: 24rpx;
  height: 24rpx;
  background: #1890ff;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16rpx;
  font-weight: 600;
}

.player-actions {
  display: flex;
  gap: 20rpx;
}

.btn-random, .btn-clear {
  flex: 1;
  height: 80rpx;
  border-radius: 12rpx;
  font-size: 28rpx;
}

.btn-random {
  background: #1890ff;
  color: white;
  border: none;
}

.btn-clear {
  background: #f8f9fa;
  color: #666;
  border: 2rpx solid #e9ecef;
}

.simulation-control {
  padding: 40rpx 0;
}

.btn-start {
  width: 100%;
  height: 88rpx;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12rpx;
  font-size: 32rpx;
  font-weight: 600;
}

.btn-start:disabled {
  background: #f5f5f5;
  color: #ccc;
}

.match-history {
  background: white;
  border-radius: 16rpx;
  padding: 32rpx 24rpx;
  margin-bottom: 24rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
}

.history-list {
  max-height: 600rpx;
  overflow-y: scroll;
}

.match-item {
  display: flex;
  align-items: center;
  padding: 20rpx;
  border-bottom: 2rpx solid #f0f0f0;
  transition: background 0.3s;
}

.match-item.current {
  background: #fff7e6;
  border-color: #fa8c16;
}

.match-item:last-child {
  border-bottom: none;
}

.match-round {
  width: 120rpx;
  font-size: 24rpx;
  color: #666;
  font-weight: 600;
}

.match-players {
  flex: 1;
}

.player-vs {
  display: flex;
  align-items: center;
  margin-bottom: 8rpx;
}

.player-name {
  font-size: 28rpx;
  color: #333;
}

.vs {
  margin: 0 20rpx;
  font-size: 24rpx;
  color: #999;
}

.match-result {
  display: flex;
  align-items: center;
  gap: 20rpx;
}

.score {
  font-size: 24rpx;
  color: #666;
}

.winner {
  font-size: 24rpx;
  color: #52c41a;
  font-weight: 600;
}

.final-result {
  background: white;
  border-radius: 16rpx;
  padding: 32rpx 24rpx;
  margin-bottom: 24rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
}

.podium {
  display: flex;
  justify-content: center;
  align-items: end;
  margin-bottom: 40rpx;
  padding: 40rpx 0;
  background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
  border-radius: 16rpx;
}

.podium-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 20rpx;
}

.champion {
  order: 2;
  margin-bottom: 0;
}

.runner-up {
  order: 1;
  margin-bottom: 40rpx;
}

.third {
  order: 3;
  margin-bottom: 40rpx;
}

.rank-badge {
  font-size: 48rpx;
  margin-bottom: 16rpx;
}

.result-avatar {
  width: 100rpx;
  height: 100rpx;
  border-radius: 50%;
  margin-bottom: 12rpx;
  border: 4rpx solid white;
}

.result-name {
  font-size: 28rpx;
  color: #333;
  font-weight: 600;
  margin-bottom: 8rpx;
  display: block;
}

.result-title {
  font-size: 24rpx;
  color: #666;
}

.result-actions {
  display: flex;
  gap: 20rpx;
}

.btn-restart, .btn-save {
  flex: 1;
  height: 80rpx;
  border-radius: 12rpx;
  font-size: 28rpx;
}

.btn-restart {
  background: #f8f9fa;
  color: #666;
  border: 2rpx solid #e9ecef;
}

.btn-save {
  background: #52c41a;
  color: white;
  border: none;
}
</style>