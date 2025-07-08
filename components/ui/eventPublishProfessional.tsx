"use client"

import { useState } from "react"
import { ArrowLeft, Calendar, Trophy, Users, Clock, Save, Send, Upload, Plus, Minus, Settings2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface EventPublishProfessionalProps {
  onBack?: () => void
}

interface PrizeLevel {
  id: string
  rankFrom: number
  rankTo: number
  amount: number
}

interface Stage {
  id: string
  name: string
  format: string
  grouping: string
  maxParticipants: number
  winnersToNext: number
  winRule: string
  entryStage: string
  registrationType: string
  registrationFee: number
  revivalFee: number
}

interface FormData {
  // 基本信息
  cover: string
  eventName: string
  eventType: string
  gameProject: string
  gender: string
  city: string
  address: string
  location: { lat: number; lng: number } | null
  startTime: string
  phone: string
  partners: string[]
  
  // 赛事规程
  schedule: string
  
  // 奖金设置
  prizes: PrizeLevel[]
  
  // 裁判组
  chief: string
  referees: string[]
  
  // 比赛设置
  maxParticipants: number
  winRule: string
  registrationType: string
  registrationFee: number
  
  // 阶段设置
  stages: Stage[]
}

export default function EventPublishProfessional({ onBack }: EventPublishProfessionalProps) {
  const [activeTab, setActiveTab] = useState("basic")
  const [activeStage, setActiveStage] = useState(0)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    cover: "",
    eventName: "",
    eventType: "",
    gameProject: "",
    gender: "不限",
    city: "",
    address: "",
    location: null,
    startTime: "",
    phone: "",
    partners: [],
    schedule: `**************
默认规程模板，您可以编辑内容或清空后自定义
**************

主办单位：
承办单位：
赞助单位：
指定器材：
比赛项目：
参赛资格：
比赛时间：XXXX年XX月XX日 至 XX月XX日
比赛地点：
报名费用：XXX元/人（其它费用自理）
报名须知：
1、XXX
2、XXX  
3、XXX
抽签方式：线上自动抽签/XX月XX日 XX:XX之前
赛场占参加线下抽签
比赛方式：
1、比赛为胜方冲球单败淘汰制。设二轮资格赛，首轮
资格赛失利，第二轮资格赛报名收取XX元报名费
方现金结算台费；
2、初始阶段采用X局X胜制；正赛阶段采用XX局XX胜
制；
3、比赛规则采用中国台球协会中式台球标准规则（；；
行；
赛事奖励：
冠军XXXXX元现金+奖杯证书
亚军XXXXX元现金+奖杯证书  
季军XXXXX元现金+奖杯证书
8强XXXXX元现金+证书
16强XXXXX元现金+证书`,
    prizes: [
      { id: "1", rankFrom: 1, rankTo: 1, amount: 10000 },
      { id: "2", rankFrom: 2, rankTo: 2, amount: 5000 },
      { id: "3", rankFrom: 3, rankTo: 3, amount: 2000 },
      { id: "4", rankFrom: 4, rankTo: 4, amount: 1000 },
      { id: "5", rankFrom: 5, rankTo: 8, amount: 500 }
    ],
    chief: "",
    referees: [],
    maxParticipants: 512,
    winRule: "3局2胜",
    registrationType: "可报名可邀请",
    registrationFee: 0,
    stages: [
      {
        id: "stage1",
        name: "阶段一",
        format: "单败",
        grouping: "不分组",
        maxParticipants: 512,
        winnersToNext: 0,
        winRule: "3局2胜",
        entryStage: "阶段一",
        registrationType: "可报名可邀请",
        registrationFee: 0,
        revivalFee: 0
      }
    ]
  })

  const eventTypes = ["邀请赛", "公开赛[线上]", "会员赛", "内部赛"]
  const gameProjects = ["中式8球", "斯诺克", "九球", "十球"]
  const winRules = ["3局2胜", "5局3胜", "7局4胜"]
  const registrationTypes = ["可报名可邀请", "仅邀请"]
  const stageFormats = ["单败", "双败", "循环赛", "瑞士制"]
  const groupingOptions = ["不分组", "按地区分组", "随机分组"]

  // 表单校验函数
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    // 基本信息校验
    if (!formData.cover) newErrors.cover = "请上传赛事封面"
    if (!formData.eventName.trim()) newErrors.eventName = "请填写赛事名称"
    if (formData.eventName.length > 50) newErrors.eventName = "赛事名称不超过50字符"
    if (!formData.eventType) newErrors.eventType = "请选择赛事类型"
    if (!formData.gameProject) newErrors.gameProject = "请选择比赛项目"
    if (!formData.city) newErrors.city = "请选择比赛城市"
    if (!formData.address.trim()) newErrors.address = "请填写详细地址"
    if (!formData.location) newErrors.location = "请获取地址定位"
    if (!formData.startTime) newErrors.startTime = "请选择比赛开始时间"
    if (!formData.phone.trim()) {
      newErrors.phone = "请填写咨询电话"
    } else if (!/^\d{11}$/.test(formData.phone)) {
      newErrors.phone = "请输入正确的11位手机号"
    }

    // 比赛设置校验
    if (formData.maxParticipants < 2) newErrors.maxParticipants = "参赛人数不能少于2人"
    if (formData.registrationFee < 0) newErrors.registrationFee = "报名费不能为负数"

    // 阶段设置校验
    formData.stages.forEach((stage, index) => {
      if (!stage.name.trim()) newErrors[`stage_${index}_name`] = "请填写阶段名称"
      if (stage.maxParticipants < 2) newErrors[`stage_${index}_participants`] = "参赛人数不能少于2人"
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSaveDraft = async () => {
    setIsSubmitting(true)
    try {
      console.log("保存草稿:", formData)
      // 这里可以调用API保存草稿
    } finally {
      setIsSubmitting(false)
    }
  }

  const handlePublish = async () => {
    if (!validateForm()) {
      // 如果有错误，切换到第一个有错误的标签页
      if (errors.eventName || errors.eventType || errors.gameProject || errors.city || errors.address || errors.phone) {
        setActiveTab("basic")
      } else if (Object.keys(errors).some(key => key.startsWith('stage_'))) {
        setActiveTab("stages")
      }
      return
    }

    setIsSubmitting(true)
    try {
      console.log("发布赛事:", formData)
      // 这里可以调用API发布赛事
    } finally {
      setIsSubmitting(false)
    }
  }

  const addPrizeLevel = () => {
    const newPrize: PrizeLevel = {
      id: Date.now().toString(),
      rankFrom: 1,
      rankTo: 1,
      amount: 0
    }
    setFormData(prev => ({
      ...prev,
      prizes: [...prev.prizes, newPrize]
    }))
  }

  const removePrizeLevel = (id: string) => {
    setFormData(prev => ({
      ...prev,
      prizes: prev.prizes.filter(prize => prize.id !== id)
    }))
  }

  const updatePrizeLevel = (id: string, field: keyof PrizeLevel, value: number) => {
    setFormData(prev => ({
      ...prev,
      prizes: prev.prizes.map(prize => 
        prize.id === id ? { ...prize, [field]: value } : prize
      )
    }))
  }

  const addStage = () => {
    const newStage: Stage = {
      id: `stage${formData.stages.length + 1}`,
      name: `阶段${formData.stages.length + 1}`,
      format: "单败",
      grouping: "不分组",
      maxParticipants: 512,
      winnersToNext: 0,
      winRule: "3局2胜",
      entryStage: "阶段一",
      registrationType: "可报名可邀请",
      registrationFee: 0,
      revivalFee: 0
    }
    setFormData(prev => ({
      ...prev,
      stages: [...prev.stages, newStage]
    }))
    setActiveStage(formData.stages.length)
  }

  const removeStage = (index: number) => {
    if (formData.stages.length > 1) {
      setFormData(prev => ({
        ...prev,
        stages: prev.stages.filter((_, i) => i !== index)
      }))
      if (activeStage >= index && activeStage > 0) {
        setActiveStage(activeStage - 1)
      }
    }
  }

  const updateStage = (index: number, field: keyof Stage, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      stages: prev.stages.map((stage, i) => 
        i === index ? { ...stage, [field]: value } : stage
      )
    }))
  }

  const styles = {
    glass: "bg-white/20 backdrop-blur-md border border-white/30",
    glassCard: "bg-white/15 backdrop-blur-md border border-white/20 shadow-lg",
    glassInput: "bg-white/50 backdrop-blur-sm border border-white/40",
    glassButton: "bg-white/30 backdrop-blur-md border border-white/40 hover:bg-white/40",
    gradientBg: "bg-gradient-to-br from-emerald-50 via-blue-50 to-cyan-50",
    gradientButton: "bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700",
    professionalGradient: "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600",
  }

  return (
    <div className={`min-h-screen ${styles.gradientBg} relative overflow-hidden`}>
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-cyan-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
      </div>



      {/* Header */}
      <div className="relative z-10 p-4">
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" size="icon" className={`rounded-full ${styles.glassButton}`} onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="text-center">
            <h1 className="text-lg font-semibold text-gray-800">专业版赛事</h1>
            <p className="text-sm text-gray-600">Professional Event</p>
          </div>
          <Button variant="ghost" size="sm" className="text-gray-600">
            帮助
          </Button>
        </div>

        {/* Tabs Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className={`grid w-full grid-cols-6 ${styles.glass} rounded-xl p-1`}>
            <TabsTrigger value="basic" className="text-xs data-[state=active]:bg-white/50">基本信息</TabsTrigger>
            <TabsTrigger value="schedule" className="text-xs data-[state=active]:bg-white/50">赛事规程</TabsTrigger>
            <TabsTrigger value="prizes" className="text-xs data-[state=active]:bg-white/50">奖金设置</TabsTrigger>
            <TabsTrigger value="referees" className="text-xs data-[state=active]:bg-white/50">裁判组</TabsTrigger>
            <TabsTrigger value="settings" className="text-xs data-[state=active]:bg-white/50">比赛设置</TabsTrigger>
            <TabsTrigger value="stages" className="text-xs data-[state=active]:bg-white/50">阶段设置</TabsTrigger>
          </TabsList>

          {/* 复用简易版的前几个标签页内容 */}
          {/* Basic Info Tab - 与简易版相同 */}
          <TabsContent value="basic" className="mt-6 space-y-6">
            <Card className={`${styles.glass} rounded-2xl shadow-lg`}>
              <CardContent className="p-6 space-y-4">
                {/* 赛事封面 */}
                <div>
                  <Label className="text-sm font-medium text-gray-700">赛事封面 *</Label>
                  <div className={`mt-2 border-2 border-dashed border-gray-300 rounded-xl p-8 text-center ${styles.glassInput}`}>
                    <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">点击上传赛事封面图片，建议16:9比例</p>
                    <p className="text-xs text-gray-400 mt-1">支持JPG/PNG，最大5MB</p>
                  </div>
                </div>

                {/* 赛事名称 */}
                <div>
                  <Label htmlFor="eventName" className="text-sm font-medium text-gray-700">赛事名称 *</Label>
                  <Input
                    id="eventName"
                    placeholder="请填写赛事名称"
                    value={formData.eventName}
                    onChange={(e) => setFormData(prev => ({ ...prev, eventName: e.target.value }))}
                    className={`mt-1 ${styles.glassInput} rounded-xl ${errors.eventName ? 'border-red-500' : ''}`}
                  />
                  {errors.eventName && (
                    <p className="text-xs text-red-500 mt-1">{errors.eventName}</p>
                  )}
                </div>

                {/* 其他基本信息字段... */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">赛事类型 *</Label>
                    <Select
                      value={formData.eventType}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, eventType: value }))}
                    >
                      <SelectTrigger className={`mt-1 ${styles.glassInput} rounded-xl`}>
                        <SelectValue placeholder="请选择赛事类型" />
                      </SelectTrigger>
                      <SelectContent>
                        {eventTypes.map((type) => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">比赛项目 *</Label>
                    <Select
                      value={formData.gameProject}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, gameProject: value }))}
                    >
                      <SelectTrigger className={`mt-1 ${styles.glassInput} rounded-xl`}>
                        <SelectValue placeholder="请选择比赛项目" />
                      </SelectTrigger>
                      <SelectContent>
                        {gameProjects.map((project) => (
                          <SelectItem key={project} value={project}>{project}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* 其他字段省略，与简易版相同... */}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Schedule Tab - 与简易版相同 */}
          <TabsContent value="schedule" className="mt-6 space-y-6">
            <Card className={`${styles.glass} rounded-2xl shadow-lg`}>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Clock className="w-5 h-5 text-orange-600" />
                  赛事规程
                </CardTitle>
                <CardDescription>
                  填写详细的赛事规程和比赛规则
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  value={formData.schedule}
                  onChange={(e) => setFormData(prev => ({ ...prev, schedule: e.target.value }))}
                  className={`${styles.glassInput} rounded-xl resize-none`}
                  rows={20}
                  placeholder="请编辑赛事规程内容..."
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Prizes Tab - 与简易版相同 */}
          <TabsContent value="prizes" className="mt-6 space-y-6">
            <Card className={`${styles.glass} rounded-2xl shadow-lg`}>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-600" />
                  奖金设置
                </CardTitle>
                <CardDescription>此处只设置现金奖励</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">总奖金</span>
                  <span className="text-lg font-semibold text-emerald-600">
                    冠军奖金：{Math.max(...formData.prizes.map(p => p.amount))}元
                  </span>
                </div>

                <div className="space-y-3">
                  {formData.prizes.map((prize) => (
                    <div key={prize.id} className="flex items-center gap-3 p-3 bg-white/30 rounded-xl">
                      <Input
                        type="number"
                        value={prize.rankFrom}
                        onChange={(e) => updatePrizeLevel(prize.id, 'rankFrom', parseInt(e.target.value) || 1)}
                        className="w-16 text-center"
                        min="1"
                      />
                      <span className="text-sm">至</span>
                      <Input
                        type="number"
                        value={prize.rankTo}
                        onChange={(e) => updatePrizeLevel(prize.id, 'rankTo', parseInt(e.target.value) || 1)}
                        className="w-16 text-center"
                        min="1"
                      />
                      <Input
                        type="number"
                        value={prize.amount}
                        onChange={(e) => updatePrizeLevel(prize.id, 'amount', parseInt(e.target.value) || 0)}
                        className="flex-1"
                        placeholder="奖金金额"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        className="text-red-500 hover:text-red-700"
                        onClick={() => removePrizeLevel(prize.id)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                <Button
                  variant="outline"
                  className={`w-full ${styles.glassButton} rounded-xl`}
                  onClick={addPrizeLevel}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  添加
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Referees Tab - 与简易版相同 */}
          <TabsContent value="referees" className="mt-6 space-y-6">
            <Card className={`${styles.glass} rounded-2xl shadow-lg`}>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  裁判组
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-gray-700">裁判长</Label>
                  <Button variant="outline" className={`mt-1 w-full ${styles.glassButton} rounded-xl justify-start`}>
                    选择裁判长
                    <span className="ml-auto">›</span>
                  </Button>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700">裁判员</Label>
                  <Button variant="outline" className={`mt-1 w-full ${styles.glassButton} rounded-xl justify-start`}>
                    选择裁判员
                    <span className="ml-auto">›</span>
                  </Button>
                  <div className="mt-4 text-center text-gray-500 py-8">
                    未选择裁判员
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab - 与简易版相同 */}
          <TabsContent value="settings" className="mt-6 space-y-6">
            <Card className={`${styles.glass} rounded-2xl shadow-lg`}>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-purple-600" />
                  比赛设置
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="maxParticipants" className="text-sm font-medium text-gray-700">
                    参赛人数上限
                  </Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Input
                      id="maxParticipants"
                      type="number"
                      value={formData.maxParticipants}
                      onChange={(e) => setFormData(prev => ({ ...prev, maxParticipants: parseInt(e.target.value) || 512 }))}
                      className={`flex-1 ${styles.glassInput} rounded-xl`}
                    />
                    <span className="text-sm text-gray-600">人</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">每组最少2人，无上限</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Stages Tab - 专业版新增 */}
          <TabsContent value="stages" className="mt-6 space-y-6">
            <Card className={`${styles.glass} rounded-2xl shadow-lg`}>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Settings2 className="w-5 h-5 text-purple-600" />
                  阶段设置
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* 阶段标签页 */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2">
                  {formData.stages.map((stage, index) => (
                    <Button
                      key={stage.id}
                      variant={activeStage === index ? "default" : "outline"}
                      size="sm"
                      className={`flex-shrink-0 rounded-xl ${
                        activeStage === index ? styles.professionalGradient : styles.glassButton
                      }`}
                      onClick={() => setActiveStage(index)}
                    >
                      {stage.name}
                    </Button>
                  ))}
                  <Button
                    variant="outline"
                    size="icon"
                    className={`flex-shrink-0 ${styles.glassButton} rounded-xl`}
                    onClick={addStage}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                {/* 当前阶段信息 */}
                {formData.stages[activeStage] && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">当前阶段</span>
                      <span className="text-lg font-semibold text-purple-600">
                        {formData.stages[activeStage].name}
                      </span>
                    </div>

                    {/* 阶段名称 */}
                    <div>
                      <Label className="text-sm font-medium text-gray-700">阶段名称</Label>
                      <Input
                        placeholder="请填写阶段名称"
                        value={formData.stages[activeStage].name}
                        onChange={(e) => updateStage(activeStage, 'name', e.target.value)}
                        className={`mt-1 ${styles.glassInput} rounded-xl`}
                      />
                    </div>

                    {/* 比赛形式 */}
                    <div>
                      <Label className="text-sm font-medium text-gray-700">比赛形式</Label>
                      <Select
                        value={formData.stages[activeStage].format}
                        onValueChange={(value) => updateStage(activeStage, 'format', value)}
                      >
                        <SelectTrigger className={`mt-1 ${styles.glassInput} rounded-xl`}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {stageFormats.map((format) => (
                            <SelectItem key={format} value={format}>{format}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* 分组 */}
                    <div>
                      <Label className="text-sm font-medium text-gray-700">分组</Label>
                      <Select
                        value={formData.stages[activeStage].grouping}
                        onValueChange={(value) => updateStage(activeStage, 'grouping', value)}
                      >
                        <SelectTrigger className={`mt-1 ${styles.glassInput} rounded-xl`}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {groupingOptions.map((option) => (
                            <SelectItem key={option} value={option}>{option}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* 参赛人数上限 */}
                    <div>
                      <Label className="text-sm font-medium text-gray-700">参赛人数上限</Label>
                      <div className="flex items-center gap-2 mt-1">
                        <Input
                          type="number"
                          value={formData.stages[activeStage].maxParticipants}
                          onChange={(e) => updateStage(activeStage, 'maxParticipants', parseInt(e.target.value) || 0)}
                          className={`flex-1 ${styles.glassInput} rounded-xl`}
                        />
                        <span className="text-sm text-gray-600">人</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">每组最少2人，无上限</p>
                    </div>

                    {/* 胜出人数 */}
                    <div>
                      <Label className="text-sm font-medium text-gray-700">胜出人数</Label>
                      <Input
                        type="number"
                        value={formData.stages[activeStage].winnersToNext}
                        onChange={(e) => updateStage(activeStage, 'winnersToNext', parseInt(e.target.value) || 0)}
                        className={`mt-1 ${styles.glassInput} rounded-xl`}
                        placeholder="进入下一阶段的人数"
                      />
                    </div>

                    {/* 获胜规则 */}
                    <div>
                      <Label className="text-sm font-medium text-gray-700">获胜规则</Label>
                      <Select
                        value={formData.stages[activeStage].winRule}
                        onValueChange={(value) => updateStage(activeStage, 'winRule', value)}
                      >
                        <SelectTrigger className={`mt-1 ${styles.glassInput} rounded-xl`}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {winRules.map((rule) => (
                            <SelectItem key={rule} value={rule}>{rule}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* 胜方进入阶段 */}
                    <div>
                      <Label className="text-sm font-medium text-gray-700">胜方进入阶段</Label>
                      <Select
                        value={formData.stages[activeStage].entryStage}
                        onValueChange={(value) => updateStage(activeStage, 'entryStage', value)}
                      >
                        <SelectTrigger className={`mt-1 ${styles.glassInput} rounded-xl`}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {formData.stages.map((stage) => (
                            <SelectItem key={stage.id} value={stage.name}>{stage.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* 参赛方式 */}
                    <div>
                      <Label className="text-sm font-medium text-gray-700">参赛方式</Label>
                      <Select
                        value={formData.stages[activeStage].registrationType}
                        onValueChange={(value) => updateStage(activeStage, 'registrationType', value)}
                      >
                        <SelectTrigger className={`mt-1 ${styles.glassInput} rounded-xl`}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {registrationTypes.map((type) => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* 首次参赛报名费 */}
                    <div>
                      <Label className="text-sm font-medium text-gray-700">首次参赛报名费</Label>
                      <div className="flex items-center gap-2 mt-1">
                        <Input
                          type="number"
                          value={formData.stages[activeStage].registrationFee}
                          onChange={(e) => updateStage(activeStage, 'registrationFee', parseFloat(e.target.value) || 0)}
                          placeholder="请输入首次参赛报名费"
                          className={`flex-1 ${styles.glassInput} rounded-xl`}
                        />
                        <span className="text-sm text-gray-600">元</span>
                      </div>
                    </div>

                    {/* 败者复活报名费 */}
                    <div>
                      <Label className="text-sm font-medium text-gray-700">败者复活报名费</Label>
                      <div className="flex items-center gap-2 mt-1">
                        <Input
                          type="number"
                          value={formData.stages[activeStage].revivalFee}
                          onChange={(e) => updateStage(activeStage, 'revivalFee', parseFloat(e.target.value) || 0)}
                          placeholder="请输入败者复活报名费"
                          className={`flex-1 ${styles.glassInput} rounded-xl`}
                        />
                        <span className="text-sm text-gray-600">元</span>
                      </div>
                    </div>

                    {/* 删除阶段按钮 */}
                    {formData.stages.length > 1 && (
                      <Button
                        variant="destructive"
                        className="w-full rounded-xl"
                        onClick={() => removeStage(activeStage)}
                      >
                        删除当前阶段
                      </Button>
                    )}
                  </div>
                )}
                
                <div className="text-center text-sm text-gray-600 py-4">
                  其它内容与简易版相同
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Bottom Action Buttons */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t border-white/30">
          <div className="text-center text-xs text-gray-600 mb-3">
            还不会发布赛事？超详细的赛事发布教程来了
          </div>
          <div className="flex gap-4">
            <Button 
              variant="outline" 
              className={`flex-1 ${styles.glassButton} rounded-xl`} 
              onClick={handleSaveDraft}
              disabled={isSubmitting}
            >
              <Save className="w-4 h-4 mr-2" />
              {isSubmitting ? "保存中..." : "保存"}
            </Button>
            <Button 
              className={`flex-1 ${styles.professionalGradient} rounded-xl shadow-lg`} 
              onClick={handlePublish}
              disabled={isSubmitting}
            >
              <Send className="w-4 h-4 mr-2" />
              {isSubmitting ? "发布中..." : "立即发布"}
            </Button>
          </div>
        </div>

        {/* Extra space for bottom fixed bar */}
        <div className="h-32"></div>
      </div>
    </div>
  )
} 