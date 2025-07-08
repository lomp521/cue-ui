"use client"

import { useState } from "react"
import { ArrowLeft, Play, Pause, RotateCcw, Trophy, Users, Target, Timer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface EventSimulationProps {
  onBack?: () => void
}

export default function EventSimulation({ onBack }: EventSimulationProps) {
  const [isSimulating, setIsSimulating] = useState(false)
  const [currentRound, setCurrentRound] = useState(1)
  const [simulationSpeed, setSimulationSpeed] = useState(1)

  // 模拟数据
  const [matches, setMatches] = useState([
    {
      id: 1,
      round: 1,
      player1: { name: "张三", score: 0, ranking: 1 },
      player2: { name: "李四", score: 0, ranking: 5 },
      status: "pending",
      table: 1,
    },
    {
      id: 2,
      round: 1,
      player1: { name: "王五", score: 0, ranking: 3 },
      player2: { name: "赵六", score: 0, ranking: 7 },
      status: "pending",
      table: 2,
    },
    {
      id: 3,
      round: 1,
      player1: { name: "钱七", score: 0, ranking: 2 },
      player2: { name: "孙八", score: 0, ranking: 6 },
      status: "pending",
      table: 3,
    },
    {
      id: 4,
      round: 1,
      player1: { name: "周九", score: 0, ranking: 4 },
      player2: { name: "吴十", score: 0, ranking: 8 },
      status: "pending",
      table: 4,
    },
  ])

  const handleStartSimulation = () => {
    setIsSimulating(true)
    // 模拟比赛进行
    simulateMatch()
  }

  const handlePauseSimulation = () => {
    setIsSimulating(false)
  }

  const handleResetSimulation = () => {
    setIsSimulating(false)
    setCurrentRound(1)
    setMatches(prev => prev.map(match => ({
      ...match,
      player1: { ...match.player1, score: 0 },
      player2: { ...match.player2, score: 0 },
      status: "pending"
    })))
  }

  const simulateMatch = () => {
    if (!isSimulating) return
    
    setTimeout(() => {
      setMatches(prev => prev.map(match => {
        if (match.status === "pending") {
          const score1 = Math.floor(Math.random() * 15) + 1
          const score2 = Math.floor(Math.random() * 15) + 1
          return {
            ...match,
            player1: { ...match.player1, score: score1 },
            player2: { ...match.player2, score: score2 },
            status: score1 > score2 ? "player1_wins" : "player2_wins"
          }
        }
        return match
      }))
      
      if (isSimulating) {
        simulateMatch()
      }
    }, 2000 / simulationSpeed)
  }

  const styles = {
    glass: "bg-white/20 backdrop-blur-md border border-white/30",
    glassCard: "bg-white/15 backdrop-blur-md border border-white/20 shadow-lg",
    glassButton: "bg-white/30 backdrop-blur-md border border-white/40 hover:bg-white/40",
    gradientBg: "bg-gradient-to-br from-orange-50 via-red-50 to-pink-50",
    gradientButton: "bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700",
  }

  return (
    <div className={`min-h-screen ${styles.gradientBg} relative overflow-hidden`}>
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-400/20 to-red-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-pink-400/20 to-orange-400/20 rounded-full blur-3xl"></div>
      </div>



      {/* Header */}
      <div className="relative z-10 p-4">
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" size="icon" className={`rounded-full ${styles.glassButton}`} onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="text-center">
            <h1 className="text-lg font-semibold text-gray-800">赛事模拟</h1>
            <p className="text-sm text-gray-600">Event Simulation</p>
          </div>
          <div className="w-10"></div>
        </div>

        {/* Simulation Control */}
        <Card className={`${styles.glass} rounded-2xl shadow-lg mb-6`}>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Target className="w-5 h-5 text-orange-600" />
              模拟控制台
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-gray-700">
                  第 {currentRound} 轮
                </Badge>
                <Badge variant={isSimulating ? "default" : "secondary"}>
                  {isSimulating ? "进行中" : "暂停"}
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Timer className="w-4 h-4" />
                <span>速度: {simulationSpeed}x</span>
              </div>
            </div>
            
            <div className="flex gap-3">
              {!isSimulating ? (
                <Button
                  className={`flex-1 ${styles.gradientButton} rounded-xl`}
                  onClick={handleStartSimulation}
                >
                  <Play className="w-4 h-4 mr-2" />
                  开始模拟
                </Button>
              ) : (
                <Button
                  variant="outline"
                  className={`flex-1 ${styles.glassButton} rounded-xl`}
                  onClick={handlePauseSimulation}
                >
                  <Pause className="w-4 h-4 mr-2" />
                  暂停模拟
                </Button>
              )}
              
              <Button
                variant="outline"
                className={`${styles.glassButton} rounded-xl`}
                onClick={handleResetSimulation}
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>

            <div className="mt-4 flex gap-2">
              <span className="text-sm text-gray-600">模拟速度:</span>
              {[0.5, 1, 2, 4].map(speed => (
                <Button
                  key={speed}
                  variant={simulationSpeed === speed ? "default" : "outline"}
                  size="sm"
                  className="rounded-lg"
                  onClick={() => setSimulationSpeed(speed)}
                >
                  {speed}x
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tournament Bracket */}
        <Card className={`${styles.glass} rounded-2xl shadow-lg mb-6`}>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-600" />
              赛程表
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {matches.map((match) => (
                <div
                  key={match.id}
                  className="bg-white/30 backdrop-blur-sm rounded-xl p-4 border border-white/40"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        台桌 {match.table}
                      </Badge>
                      <Badge 
                        variant={
                          match.status === "pending" ? "secondary" :
                          match.status === "player1_wins" ? "default" : "default"
                        }
                        className="text-xs"
                      >
                        {match.status === "pending" ? "等待开始" : "已结束"}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className={`flex items-center justify-between p-2 rounded-lg ${
                        match.status === "player1_wins" ? "bg-green-100/50" : "bg-white/20"
                      }`}>
                        <div>
                          <span className="font-medium text-gray-800">{match.player1.name}</span>
                          <span className="text-xs text-gray-600 ml-2">#{match.player1.ranking}</span>
                        </div>
                        <span className="font-bold text-lg">{match.player1.score}</span>
                      </div>
                      
                      <div className="text-center text-xs text-gray-500 my-1">VS</div>
                      
                      <div className={`flex items-center justify-between p-2 rounded-lg ${
                        match.status === "player2_wins" ? "bg-green-100/50" : "bg-white/20"
                      }`}>
                        <div>
                          <span className="font-medium text-gray-800">{match.player2.name}</span>
                          <span className="text-xs text-gray-600 ml-2">#{match.player2.ranking}</span>
                        </div>
                        <span className="font-bold text-lg">{match.player2.score}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Statistics */}
        <Card className={`${styles.glass} rounded-2xl shadow-lg`}>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              统计信息
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">8</div>
                <div className="text-sm text-gray-600">参赛选手</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">4</div>
                <div className="text-sm text-gray-600">比赛台桌</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">
                  {matches.filter(m => m.status !== "pending").length}
                </div>
                <div className="text-sm text-gray-600">已完成</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">
                  {matches.filter(m => m.status === "pending").length}
                </div>
                <div className="text-sm text-gray-600">进行中</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bottom Spacing */}
        <div className="h-8"></div>
      </div>
    </div>
  )
} 