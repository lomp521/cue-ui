"use client"

import { ArrowLeft, ChevronRight, Building2, UserCheck, Calendar, Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"

interface EventPublishingPageProps {
  onNavigate?: (featureId: string) => void
  onBack?: () => void
}

export default function EventPublishingPage({ onNavigate, onBack }: EventPublishingPageProps) {
  const features = [
    {
      id: "venue-certification",
      title: "球馆认证",
      subtitle: "认证您的球馆资质",
      icon: Building2,
      iconBg: "bg-blue-500/20",
      iconColor: "text-blue-600",
    },
    {
      id: "referee-certification",
      title: "裁判认证",
      subtitle: "获得专业裁判资格",
      icon: UserCheck,
      iconBg: "bg-purple-500/20",
      iconColor: "text-purple-600",
    },
    {
      id: "event-publishing",
      title: "赛事发布",
      subtitle: "发布您的台球赛事",
      icon: Calendar,
      iconBg: "bg-emerald-500/20",
      iconColor: "text-emerald-600",
    },
    {
      id: "event-simulation",
      title: "赛事模拟",
      subtitle: "体验模拟赛事功能",
      icon: Trophy,
      iconBg: "bg-orange-500/20",
      iconColor: "text-orange-600",
    },
  ]

  return (
    <div className="min-h-screen max-w-sm mx-auto bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-10 right-8 w-32 h-32 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-2xl"></div>
      <div className="absolute bottom-20 left-6 w-40 h-40 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-2xl"></div>
      <div className="absolute top-1/3 left-4 w-24 h-24 bg-gradient-to-br from-emerald-200/30 to-blue-200/30 rounded-full blur-2xl"></div>

      <div className="relative z-10 p-4">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            size="icon"
            className="mb-4 backdrop-blur-xl bg-white/40 hover:bg-white/60 border border-white/50 rounded-full shadow-lg transition-all duration-300"
            onClick={onBack}
          >
            <ArrowLeft className="h-5 w-5 text-gray-700" />
          </Button>

          {/* Title */}
          <div className="text-center">
            <div className="backdrop-blur-xl bg-white/30 rounded-2xl p-6 border border-white/50 shadow-xl">
              <div className="flex items-center justify-center gap-3 text-2xl font-bold">
                {/* 与 */}
                <div className="relative">
                  <div className="backdrop-blur-sm bg-gradient-to-br from-blue-500/20 to-purple-500/20 px-4 py-2 rounded-xl border border-white/40 shadow-lg">
                    <span className="text-gray-800 font-black">与</span>
                  </div>
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-400 rounded-full"></div>
                </div>

                <span className="text-gray-600 text-lg font-medium">心共振</span>

                {/* 搭 */}
                <div className="relative">
                  <div className="backdrop-blur-sm bg-gradient-to-br from-purple-500/20 to-pink-500/20 px-4 py-2 rounded-xl border border-white/40 shadow-lg">
                    <span className="text-gray-800 font-black">搭</span>
                  </div>
                  <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-purple-400 rounded-full"></div>
                </div>

                <span className="text-gray-600 text-lg font-medium">趣同行</span>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="space-y-4">
          {features.map((feature) => {
            const IconComponent = feature.icon
            return (
              <div
                key={feature.id}
                className="group backdrop-blur-xl bg-white/25 hover:bg-white/35 rounded-2xl p-4 border border-white/40 shadow-lg hover:shadow-xl cursor-pointer transition-all duration-300 hover:scale-[1.02]"
                onClick={() => onNavigate?.(feature.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {/* Icon */}
                    <div
                      className={`${feature.iconBg} backdrop-blur-sm p-3 rounded-xl border border-white/30 shadow-md`}
                    >
                      <IconComponent className={`h-6 w-6 ${feature.iconColor}`} />
                    </div>

                    {/* Content */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">{feature.title}</h3>
                      <p className="text-sm text-gray-600">{feature.subtitle}</p>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="backdrop-blur-sm bg-white/30 p-2 rounded-full border border-white/40 group-hover:bg-white/50 transition-all duration-300">
                    <ChevronRight className="h-5 w-5 text-gray-600" />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom Spacing */}
        <div className="h-8"></div>
      </div>
    </div>
  )
}
