"use client"

import { useState } from "react"
import { Zap, Settings, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface EventTypeSelectionProps {
  open: boolean
  onClose: () => void
  onSelect: (type: 'simple' | 'professional') => void
}

export default function EventTypeSelection({ open, onClose, onSelect }: EventTypeSelectionProps) {
  const [selectedType, setSelectedType] = useState<'simple' | 'professional' | null>(null)

  const handleSelect = (type: 'simple' | 'professional') => {
    setSelectedType(type)
    onSelect(type)
  }

  const styles = {
    glass: "bg-white/20 backdrop-blur-md border border-white/30",
    glassCard: "bg-white/15 backdrop-blur-md border border-white/20 shadow-lg",
    gradientBg: "bg-gradient-to-br from-emerald-50 via-blue-50 to-cyan-50",
    gradientButton: "bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700",
    simpleGradient: "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600",
    professionalGradient: "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600",
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto p-0 border-0 bg-transparent">
        <div className={`${styles.gradientBg} rounded-2xl overflow-hidden`}>
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-emerald-400/20 to-blue-400/20 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-tr from-cyan-400/20 to-emerald-400/20 rounded-full blur-2xl"></div>
          </div>

          <div className="relative z-10 p-6">
            {/* Header */}
            <DialogHeader className="text-center mb-6">
              <div className="flex justify-between items-center mb-4">
                <div></div>
                <DialogTitle className="text-xl font-bold text-gray-800">选择赛事类型</DialogTitle>
                <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <DialogDescription className="text-gray-600">
                根据您的需求选择合适的赛事发布模式
              </DialogDescription>
            </DialogHeader>

            {/* Selection Cards */}
            <div className="space-y-4">
              {/* Simple Event */}
              <div 
                className={`${styles.glassCard} rounded-xl p-6 cursor-pointer transition-all hover:scale-[1.02] hover:shadow-lg ${
                  selectedType === 'simple' ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => handleSelect('simple')}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl ${styles.simpleGradient}`}>
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-800 mb-2">简易版赛事</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      快速发布，适合一般用户和小型比赛
                    </p>
                    <div className="space-y-1 text-xs text-gray-500">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                        <span>基本信息配置</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                        <span>简单赛事规程</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                        <span>基础奖金设置</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                        <span>快速发布流程</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Professional Event */}
              <div 
                className={`${styles.glassCard} rounded-xl p-6 cursor-pointer transition-all hover:scale-[1.02] hover:shadow-lg ${
                  selectedType === 'professional' ? 'ring-2 ring-purple-500' : ''
                }`}
                onClick={() => handleSelect('professional')}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl ${styles.professionalGradient}`}>
                    <Settings className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-800 mb-2">专业版赛事</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      功能完整，适合专业组织和大型赛事
                    </p>
                    <div className="space-y-1 text-xs text-gray-500">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                        <span>完整赛事管理</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                        <span>多阶段设置</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                        <span>高级裁判组管理</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                        <span>复活赛等复杂赛制</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Help Text */}
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">
                💡 提示：简易版功能简单快速，专业版功能更加完整
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 