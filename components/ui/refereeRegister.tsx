"use client"

import { useState } from "react"
import { ArrowLeft, Info, Upload, Save, Send, User, Award, Shield, FileText, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface RefereeRegistrationProps {
  onBack?: () => void
}

export default function RefereeRegistration({ onBack }: RefereeRegistrationProps) {
  const [formData, setFormData] = useState({
    refereeCertificate: null as File | null,
    supplementaryCertificate: null as File | null,
    supplementaryMaterials: "",
    idFront: null as File | null,
    idBack: null as File | null,
    coverPhoto: null as File | null,
    displayName: "",
    province: "",
    city: "",
    phone: "",
    realName: "",
  })

  // 页面进入时自动弹出信息说明
  const [showInfo, setShowInfo] = useState(true)

  const provinces = ["北京市", "上海市", "广东省", "浙江省", "江苏省", "山东省", "河南省", "四川省"]
  const cities = {
    北京市: ["北京市"],
    上海市: ["上海市"],
    广东省: ["广州市", "深圳市", "珠海市", "佛山市", "东莞市"],
    浙江省: ["杭州市", "宁波市", "温州市", "嘉兴市", "湖州市"],
    江苏省: ["南京市", "苏州市", "无锡市", "常州市", "南通市"],
    山东省: ["济南市", "青岛市", "烟台市", "潍坊市", "临沂市"],
    河南省: ["郑州市", "洛阳市", "开封市", "安阳市", "新乡市"],
    四川省: ["成都市", "绵阳市", "德阳市", "南充市", "宜宾市"],
  }

  const handleFileUpload = (field: string, file: File | null) => {
    setFormData((prev) => ({ ...prev, [field]: file }))
  }

  const handleSaveDraft = () => {
    console.log("Saving draft:", formData)
    // Implement draft saving logic
  }

  const handleSubmitReview = () => {
    console.log("Submitting for review:", formData)
    // Implement submission logic
  }

  // 内联样式定义
  const styles = {
    glass: "bg-white/20 backdrop-blur-md border border-white/30",
    glassCard: "bg-white/15 backdrop-blur-md border border-white/20 shadow-lg",
    glassInput: "bg-white/50 backdrop-blur-sm border border-white/40",
    glassButton: "bg-white/30 backdrop-blur-md border border-white/40 hover:bg-white/40",
    gradientBg: "bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50",
    gradientButton: "bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700",
    uploadArea: "bg-white/30 backdrop-blur-sm border-2 border-dashed border-white/40",
    dialogOverlay: "bg-black/20 backdrop-blur-sm",
  }

  return (
    <div className={`min-h-screen ${styles.gradientBg} relative overflow-hidden`}>
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 p-4">
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" size="icon" className={`rounded-full ${styles.glassButton}`} onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="text-center">
            <h1 className="text-lg font-semibold text-gray-800">裁判认证</h1>
            <p className="text-sm text-gray-600">Referee Registration</p>
          </div>
          <Dialog open={showInfo} onOpenChange={setShowInfo}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className={`rounded-full ${styles.glassButton}`}>
                <Info className="h-5 w-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className={`${styles.glass} rounded-2xl border-white/30 shadow-2xl max-w-sm mx-4`}>
              <DialogHeader>
                <DialogTitle className="text-lg font-semibold">裁判入驻资料收集说明</DialogTitle>
                <DialogDescription className="space-y-4 text-left">
                  <p className="text-sm text-gray-700">为保障平台裁判信息的真实性与专业性，裁判入驻需提供以下资料：</p>
                  <div>
                    <ul className="text-sm space-y-1 text-gray-600">
                      <li>• 裁判资质证书或相关资格证明</li>
                      <li>• 本人身份证正反面照片</li>
                      <li>• 本人近期清晰照片（用于平台展示）</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm text-gray-700">
                      以上信息将仅用于平台的资质审核、信息展示及后续管理服务。我们承诺严格保护您的隐私，所有资料仅限内部使用，绝不会泄露、出售或用于其他用途。
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-700">
                      如有任何疑问，请联系平台客服，我们将竭诚为您服务。感谢您的支持与配合！
                    </p>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>

        {/* Registration Form */}
        <div className="space-y-6">
          {/* Certificate Upload */}
          <Card className={`${styles.glass} rounded-2xl shadow-lg`}>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-600" />
                资质证明
              </CardTitle>
              <CardDescription>请上传裁判相关证书或资格证明</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">裁判证书照片 *</Label>
                  <div className={`mt-1 ${styles.uploadArea} rounded-xl p-4 text-center`}>
                    <Upload className="w-6 h-6 mx-auto mb-1 text-gray-500" />
                    <p className="text-xs text-gray-600">上传证书</p>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload("refereeCertificate", e.target.files?.[0] || null)}
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">补充资质 (选填)</Label>
                  <div className={`mt-1 ${styles.uploadArea} rounded-xl p-4 text-center`}>
                    <Upload className="w-6 h-6 mx-auto mb-1 text-gray-500" />
                    <p className="text-xs text-gray-600">其他资质</p>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload("supplementaryCertificate", e.target.files?.[0] || null)}
                    />
                  </div>
                </div>
              </div>
              <div>
                <Label htmlFor="personalIntro" className="text-sm font-medium">
                  个人简介 (选填)
                </Label>
                <Textarea
                  id="personalIntro"
                  placeholder="请简述执裁经验(年限,赛事等)"
                  value={formData.supplementaryMaterials}
                  onChange={(e) => setFormData((prev) => ({ ...prev, supplementaryMaterials: e.target.value }))}
                  className={`mt-1 ${styles.glassInput} rounded-xl resize-none`}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Identity Verification */}
          <Card className={`${styles.glass} rounded-2xl shadow-lg`}>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-600" />
                身份验证
              </CardTitle>
              <CardDescription>请上传身份证正反面照片</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">身份证正面 *</Label>
                  <div className={`mt-1 ${styles.uploadArea} rounded-xl p-4 text-center`}>
                    <Upload className="w-6 h-6 mx-auto mb-1 text-gray-500" />
                    <p className="text-xs text-gray-600">上传正面</p>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload("idFront", e.target.files?.[0] || null)}
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">身份证反面 *</Label>
                  <div className={`mt-1 ${styles.uploadArea} rounded-xl p-4 text-center`}>
                    <Upload className="w-6 h-6 mx-auto mb-1 text-gray-500" />
                    <p className="text-xs text-gray-600">上传反面</p>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload("idBack", e.target.files?.[0] || null)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Display Information */}
          <Card className={`${styles.glass} rounded-2xl shadow-lg`}>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="w-5 h-5 text-purple-600" />
                展示信息
              </CardTitle>
              <CardDescription>用于平台展示的个人信息</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm font-medium">展示封面 *</Label>
                <div className={`mt-1 ${styles.uploadArea} rounded-xl text-center aspect-video max-w-xs mx-auto`}>
                  <div className="flex flex-col items-center justify-center h-full p-4">
                    <User className="w-8 h-8 mb-2 text-gray-500" />
                    <p className="text-sm text-gray-600">上传个人照片</p>
                    <p className="text-xs text-gray-500 mt-1">16:9比例，用于平台展示</p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileUpload("coverPhoto", e.target.files?.[0] || null)}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="displayName" className="text-sm font-medium">
                  展示名称 *
                </Label>
                <Input
                  id="displayName"
                  placeholder="请输入在平台上显示的名称"
                  value={formData.displayName}
                  onChange={(e) => setFormData((prev) => ({ ...prev, displayName: e.target.value }))}
                  className={`mt-1 ${styles.glassInput} rounded-xl`}
                />
              </div>
            </CardContent>
          </Card>

          {/* Personal Information */}
          <Card className={`${styles.glass} rounded-2xl shadow-lg`}>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="w-5 h-5 text-green-600" />
                个人信息
              </CardTitle>
              <CardDescription>请填写真实的个人信息</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="realName" className="text-sm font-medium">
                  真实姓名 *
                </Label>
                <Input
                  id="realName"
                  placeholder="请输入真实姓名"
                  value={formData.realName}
                  onChange={(e) => setFormData((prev) => ({ ...prev, realName: e.target.value }))}
                  className={`mt-1 ${styles.glassInput} rounded-xl`}
                />
              </div>
              <div>
                <Label htmlFor="phone" className="text-sm font-medium">
                  联系电话 *
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="请输入联系电话"
                  value={formData.phone}
                  onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                  className={`mt-1 ${styles.glassInput} rounded-xl`}
                />
              </div>
              <div>
                <Label className="text-sm font-medium flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-600" />
                  常驻地区 *
                </Label>
                <div className="grid grid-cols-2 gap-3 mt-1">
                  <Select
                    value={formData.province}
                    onValueChange={(value) => {
                      setFormData((prev) => ({ ...prev, province: value, city: "" }))
                    }}
                  >
                    <SelectTrigger className={`${styles.glassInput} rounded-xl`}>
                      <SelectValue placeholder="选择省份" />
                    </SelectTrigger>
                    <SelectContent>
                      {provinces.map((province) => (
                        <SelectItem key={province} value={province}>
                          {province}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select
                    value={formData.city}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, city: value }))}
                    disabled={!formData.province}
                  >
                    <SelectTrigger className={`${styles.glassInput} rounded-xl`}>
                      <SelectValue placeholder="选择城市" />
                    </SelectTrigger>
                    <SelectContent>
                      {formData.province &&
                        cities[formData.province as keyof typeof cities]?.map((city) => (
                          <SelectItem key={city} value={city}>
                            {city}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4 pb-8">
            <Button variant="outline" className={`flex-1 ${styles.glassButton} rounded-xl`} onClick={handleSaveDraft}>
              <Save className="w-4 h-4 mr-2" />
              保存草稿
            </Button>
            <Button className={`flex-1 ${styles.gradientButton} rounded-xl shadow-lg`} onClick={handleSubmitReview}>
              <Send className="w-4 h-4 mr-2" />
              提交审核
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
