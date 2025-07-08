"use client"

import { useState } from "react"
import { ArrowLeft, Info, Upload, MapPin, Save, Send, Building2, Camera } from "lucide-react"
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

interface BilliardHallRegistrationProps {
  onBack?: () => void
}

export default function BilliardHallRegistration({ onBack }: BilliardHallRegistrationProps) {
  const [formData, setFormData] = useState({
    hallName: "",
    phone: "",
    province: "",
    city: "",
    district: "",
    address: "",
    location: { lat: 0, lng: 0 },
    businessLicense: null as File | null,
    idFront: null as File | null,
    idBack: null as File | null,
  })

  // 页面进入时自动弹出信息说明
  const [showInfo, setShowInfo] = useState(true)

  const provinces = ["北京市", "上海市", "广东省", "浙江省", "江苏省"]
  const cities = ["北京市", "上海市", "广州市", "深圳市", "杭州市", "南京市"]
  const districts = ["朝阳区", "海淀区", "西城区", "东城区", "丰台区"]

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
    gradientBg: "bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50",
    gradientButton: "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700",
    uploadArea: "bg-white/30 backdrop-blur-sm border-2 border-dashed border-white/40",
  }

  return (
    <div className={`min-h-screen ${styles.gradientBg} relative overflow-hidden`}>
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-pink-400/20 to-blue-400/20 rounded-full blur-3xl"></div>
      </div>



      {/* Header */}
      <div className="relative z-10 p-4">
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" size="icon" className={`rounded-full ${styles.glassButton}`} onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="text-center">
            <h1 className="text-lg font-semibold text-gray-800">球馆认证</h1>
            <p className="text-sm text-gray-600">Billiard Hall Registration</p>
          </div>
          <Dialog open={showInfo} onOpenChange={setShowInfo}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className={`rounded-full ${styles.glassButton}`}>
                <Info className="h-5 w-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className={`${styles.glass} rounded-2xl border-white/30 shadow-2xl max-w-sm mx-4`}>
              <DialogHeader>
                <DialogTitle className="text-lg font-semibold">注册信息说明</DialogTitle>
                <DialogDescription className="space-y-4 text-left">
                  <div>
                    <h4 className="font-medium mb-2 text-gray-800">所需资料：</h4>
                    <ul className="text-sm space-y-1 text-gray-600">
                      <li>• 球馆展示名称</li>
                      <li>• 联系电话</li>
                      <li>• 详细地址信息</li>
                      <li>• 营业执照照片</li>
                      <li>• 法人身份证正反面</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2 text-gray-800">隐私政策：</h4>
                    <p className="text-sm text-gray-600">
                      我们承诺保护您的个人信息安全，所有上传的资料仅用于球馆认证审核，不会用于其他商业用途。审核通过后，您的球馆信息将在平台上展示，帮助用户找到您的球馆。
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2 text-gray-800">审核流程：</h4>
                    <p className="text-sm text-gray-600">
                      提交资料后，我们将在1-3个工作日内完成审核。审核结果将通过短信和站内消息通知您。
                    </p>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>

        {/* Registration Form */}
        <div className="space-y-6">
          {/* Basic Information */}
          <Card className={`${styles.glass} rounded-2xl shadow-lg`}>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Building2 className="w-5 h-5 text-blue-600" />
                基本信息
              </CardTitle>
              <CardDescription>请填写球馆的基本信息</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="hallName" className="text-sm font-medium">
                  球馆名称 *
                </Label>
                <Input
                  id="hallName"
                  placeholder="请输入球馆展示名称"
                  value={formData.hallName}
                  onChange={(e) => setFormData((prev) => ({ ...prev, hallName: e.target.value }))}
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
            </CardContent>
          </Card>

          {/* Location Information */}
          <Card className={`${styles.glass} rounded-2xl shadow-lg`}>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <MapPin className="w-5 h-5 text-emerald-600" />
                位置信息
              </CardTitle>
              <CardDescription>请选择球馆所在地区</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <Label className="text-sm font-medium">省份 *</Label>
                  <Select
                    value={formData.province}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, province: value }))}
                  >
                    <SelectTrigger className={`mt-1 ${styles.glassInput} rounded-xl`}>
                      <SelectValue placeholder="省份" />
                    </SelectTrigger>
                    <SelectContent>
                      {provinces.map((province) => (
                        <SelectItem key={province} value={province}>
                          {province}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm font-medium">城市 *</Label>
                  <Select
                    value={formData.city}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, city: value }))}
                  >
                    <SelectTrigger className={`mt-1 ${styles.glassInput} rounded-xl`}>
                      <SelectValue placeholder="城市" />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map((city) => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm font-medium">区县 *</Label>
                  <Select
                    value={formData.district}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, district: value }))}
                  >
                    <SelectTrigger className={`mt-1 ${styles.glassInput} rounded-xl`}>
                      <SelectValue placeholder="区县" />
                    </SelectTrigger>
                    <SelectContent>
                      {districts.map((district) => (
                        <SelectItem key={district} value={district}>
                          {district}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="address" className="text-sm font-medium">
                  详细地址 *
                </Label>
                <Textarea
                  id="address"
                  placeholder="请输入详细地址（不含省市区）"
                  value={formData.address}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
                  className={`mt-1 ${styles.glassInput} rounded-xl resize-none`}
                  rows={3}
                />
              </div>
              <div>
                <Label className="text-sm font-medium">地图定位</Label>
                <Button variant="outline" className={`w-full mt-1 ${styles.glassButton} rounded-xl`}>
                  <MapPin className="w-4 h-4 mr-2" />
                  点击设置精确位置
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Document Upload */}
          <Card className={`${styles.glass} rounded-2xl shadow-lg`}>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Camera className="w-5 h-5 text-purple-600" />
                证件上传
              </CardTitle>
              <CardDescription>请上传相关证件照片</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm font-medium">营业执照 *</Label>
                <div className={`mt-1 ${styles.uploadArea} rounded-xl p-6 text-center`}>
                  <Upload className="w-8 h-8 mx-auto mb-2 text-gray-500" />
                  <p className="text-sm text-gray-600">点击上传营业执照</p>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileUpload("businessLicense", e.target.files?.[0] || null)}
                  />
                </div>
              </div>
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
