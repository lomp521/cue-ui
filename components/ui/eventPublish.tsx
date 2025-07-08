"use client"

import { useState } from "react"
import { ArrowLeft, Calendar, Trophy, Users, Clock, Save, Send, Upload, MapPin, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface EventPublishProps {
  onBack?: () => void
}

interface PrizeLevel {
  id: string
  rankFrom: number
  rankTo: number
  amount: number
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
}

export default function EventPublish({ onBack }: EventPublishProps) {
  const [activeTab, setActiveTab] = useState("basic")
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
    registrationFee: 0
  })

  const eventTypes = ["邀请赛", "公开赛[线上]", "会员赛", "内部赛"]
  const gameProjects = ["中式8球", "斯诺克", "九球", "十球"]
  const genderOptions = ["不限", "男", "女"]
  const winRules = ["3局2胜", "5局3胜", "7局4胜"]
  const registrationTypes = ["可报名可邀请", "仅邀请"]

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

  const styles = {
    glass: "bg-white/20 backdrop-blur-md border border-white/30",
    glassCard: "bg-white/15 backdrop-blur-md border border-white/20 shadow-lg",
    glassInput: "bg-white/50 backdrop-blur-sm border border-white/40",
    glassButton: "bg-white/30 backdrop-blur-md border border-white/40 hover:bg-white/40",
    gradientBg: "bg-gradient-to-br from-emerald-50 via-blue-50 to-cyan-50",
    gradientButton: "bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700",
  }

  return (
    <div className={`min-h-screen ${styles.gradientBg} relative overflow-hidden`}>
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-400/20 to-blue-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-cyan-400/20 to-emerald-400/20 rounded-full blur-3xl"></div>
      </div>



      {/* Header */}
      <div className="relative z-10 p-4">
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" size="icon" className={`rounded-full ${styles.glassButton}`} onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="text-center">
            <h1 className="text-lg font-semibold text-gray-800">简易版赛事</h1>
            <p className="text-sm text-gray-600">Event Publishing</p>
          </div>
          <Button variant="ghost" size="sm" className="text-gray-600">
            帮助
          </Button>
        </div>

        {/* Tabs Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className={`grid w-full grid-cols-5 ${styles.glass} rounded-xl p-1`}>
            <TabsTrigger value="basic" className="text-xs data-[state=active]:bg-white/50">基本信息</TabsTrigger>
            <TabsTrigger value="schedule" className="text-xs data-[state=active]:bg-white/50">赛事规程</TabsTrigger>
            <TabsTrigger value="prizes" className="text-xs data-[state=active]:bg-white/50">奖金设置</TabsTrigger>
            <TabsTrigger value="referees" className="text-xs data-[state=active]:bg-white/50">裁判组</TabsTrigger>
            <TabsTrigger value="settings" className="text-xs data-[state=active]:bg-white/50">比赛设置</TabsTrigger>
          </TabsList>

          {/* Basic Info Tab */}
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

                {/* 赛事类型和比赛项目 */}
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

                {/* 性别限制 */}
                <div>
                  <Label className="text-sm font-medium text-gray-700">性别 *</Label>
                  <div className="flex gap-2 mt-2">
                    {genderOptions.map((gender) => (
                      <Button
                        key={gender}
                        variant={formData.gender === gender ? "default" : "outline"}
                        size="sm"
                        className={`flex-1 rounded-xl ${formData.gender === gender ? styles.gradientButton : styles.glassButton}`}
                        onClick={() => setFormData(prev => ({ ...prev, gender }))}
                      >
                        {gender}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* 比赛城市 */}
                <div>
                  <Label className="text-sm font-medium text-gray-700">比赛城市 *</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      placeholder="请选择比赛城市"
                      value={formData.city}
                      onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                      className={`flex-1 ${styles.glassInput} rounded-xl`}
                    />
                    <Button variant="outline" size="icon" className={`${styles.glassButton} rounded-xl`}>
                      ▼
                    </Button>
                  </div>
                </div>

                {/* 详细地址 */}
                <div>
                  <Label htmlFor="address" className="text-sm font-medium text-gray-700">详细地址 *</Label>
                  <Input
                    id="address"
                    placeholder="请填写比赛详细地址"
                    value={formData.address}
                    onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                    className={`mt-1 ${styles.glassInput} rounded-xl`}
                  />
                </div>

                {/* 地址定位 */}
                <div>
                  <Label className="text-sm font-medium text-gray-700">地址定位 *</Label>
                  <Button variant="outline" className={`mt-1 w-full ${styles.glassButton} rounded-xl`}>
                    <MapPin className="h-4 w-4 mr-2" />
                    点击获取当前位置，便于参赛者导航
                  </Button>
                  <p className="text-xs text-gray-500 mt-1">用户根据定位获得当前距离与导航F对地</p>
                </div>

                {/* 比赛开始时间 */}
                <div>
                  <Label htmlFor="startTime" className="text-sm font-medium text-gray-700">比赛开始时间 *</Label>
                  <Input
                    id="startTime"
                    type="datetime-local"
                    value={formData.startTime}
                    onChange={(e) => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
                    className={`mt-1 ${styles.glassInput} rounded-xl`}
                  />
                  <p className="text-xs text-gray-500 mt-1">仅展示，不会影响比赛进程</p>
                </div>

                {/* 咨询电话 */}
                <div>
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-700">咨询电话 *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="请填写咨询电话，最长11位"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className={`mt-1 ${styles.glassInput} rounded-xl ${errors.phone ? 'border-red-500' : ''}`}
                  />
                  {errors.phone && (
                    <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
                  )}
                </div>

                {/* 合作用户 */}
                <div>
                  <Label className="text-sm font-medium text-gray-700">合作用户</Label>
                  <Button variant="outline" className={`mt-1 w-full ${styles.glassButton} rounded-xl justify-start`}>
                    点击选择用户作为合作方，可输入手机号或用户ID
                    <span className="ml-auto">›</span>
                  </Button>
                  <p className="text-xs text-gray-500 mt-1">选择用户可以U级赛事主体，ID,电话</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Schedule Tab */}
          <TabsContent value="schedule" className="mt-6 space-y-6">
            <Card className={`${styles.glass} rounded-2xl shadow-lg`}>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Clock className="w-5 h-5 text-orange-600" />
                  赛事规程
                </CardTitle>
                <CardDescription>
                  这里有一个赛事规范文案，含清单信息中表的营程
                  修改一个赛事项的全文本规历
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

          {/* Prizes Tab */}
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

          {/* Referees Tab */}
          <TabsContent value="referees" className="mt-6 space-y-6">
            <Card className={`${styles.glass} rounded-2xl shadow-lg`}>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  裁判组
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* 裁判长 */}
                <div>
                  <Label className="text-sm font-medium text-gray-700">裁判长</Label>
                  <Button variant="outline" className={`mt-1 w-full ${styles.glassButton} rounded-xl justify-start`}>
                    选择裁判长
                    <span className="ml-auto">›</span>
                  </Button>
                  {formData.chief && (
                    <div className="mt-2 flex items-center gap-3 p-3 bg-white/30 rounded-xl">
                      <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-medium">
                        台
                      </div>
                      <div>
                        <div className="font-medium">台球宝官方</div>
                        <div className="text-sm text-gray-600">10000030</div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 裁判员 */}
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

                <div className="text-center text-sm text-gray-600 py-4">
                  此功能仅限接设置裁判长和裁判员
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="mt-6 space-y-6">
            <Card className={`${styles.glass} rounded-2xl shadow-lg`}>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-purple-600" />
                  比赛设置
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* 参赛人数上限 */}
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
                  <p className="text-xs text-gray-500 mt-1">最少2人，无上限</p>
                </div>

                {/* 获胜规则 */}
                <div>
                  <Label className="text-sm font-medium text-gray-700">获胜规则</Label>
                  <Select
                    value={formData.winRule}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, winRule: value }))}
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

                {/* 参赛方式 */}
                <div>
                  <Label className="text-sm font-medium text-gray-700">参赛方式</Label>
                  <div className="flex gap-2 mt-2">
                    {registrationTypes.map((type) => (
                      <Button
                        key={type}
                        variant={formData.registrationType === type ? "default" : "outline"}
                        size="sm"
                        className={`flex-1 rounded-xl text-xs ${formData.registrationType === type ? styles.gradientButton : styles.glassButton}`}
                        onClick={() => setFormData(prev => ({ ...prev, registrationType: type }))}
                      >
                        {type === "可报名可邀请" ? "可报名可邀请" : "仅邀请"}
                      </Button>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className={`flex-1 rounded-xl text-xs ${styles.glassButton}`}
                    >
                      只查看(查看)
                    </Button>
                  </div>
                </div>

                {/* 报名费 */}
                <div>
                  <Label htmlFor="registrationFee" className="text-sm font-medium text-gray-700">
                    报名费
                  </Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Input
                      id="registrationFee"
                      type="number"
                      value={formData.registrationFee}
                      onChange={(e) => setFormData(prev => ({ ...prev, registrationFee: parseFloat(e.target.value) || 0 }))}
                      placeholder="请输入报名费"
                      className={`flex-1 ${styles.glassInput} rounded-xl`}
                    />
                    <span className="text-sm text-gray-600">元</span>
                  </div>
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
              className={`flex-1 ${styles.gradientButton} rounded-xl shadow-lg`} 
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