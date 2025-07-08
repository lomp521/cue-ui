"use client"

import { useState } from "react"
import EventTypeSelection from "./eventTypeSelection"
import EventPublish from "./eventPublish"
import EventPublishProfessional from "./eventPublishProfessional"

interface EventPublishEntryProps {
  onBack?: () => void
}

export default function EventPublishEntry({ onBack }: EventPublishEntryProps) {
  const [showSelection, setShowSelection] = useState(true)
  const [selectedType, setSelectedType] = useState<'simple' | 'professional' | null>(null)

  const handleTypeSelect = (type: 'simple' | 'professional') => {
    setSelectedType(type)
    setShowSelection(false)
  }

  const handleBack = () => {
    if (selectedType) {
      // 如果已经选择了类型，返回到选择页面
      setSelectedType(null)
      setShowSelection(true)
    } else {
      // 否则返回到上级页面
      onBack?.()
    }
  }

  const handleSelectionClose = () => {
    // 关闭选择弹窗，返回到上级页面
    onBack?.()
  }

  // 显示类型选择弹窗
  if (showSelection) {
    return (
      <EventTypeSelection
        open={true}
        onClose={handleSelectionClose}
        onSelect={handleTypeSelect}
      />
    )
  }

  // 根据选择的类型显示对应的页面
  if (selectedType === 'simple') {
    return <EventPublish onBack={handleBack} />
  }

  if (selectedType === 'professional') {
    return <EventPublishProfessional onBack={handleBack} />
  }

  // 默认显示选择页面
  return (
    <EventTypeSelection
      open={true}
      onClose={handleSelectionClose}
      onSelect={handleTypeSelect}
    />
  )
} 