import Image from "next/image"
import {
  Search,
  MapPin,
  Calendar,
  Trophy,
  Users,
  Filter,
  Plus,
  Medal,
  Award,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CarouselBanner } from "@/components/carousel-banner"
import fs from "fs";
import path from "path";

export default function BilliardsCompetitionApp() {
  // 轮播图数据 - 可以根据不同标签页显示不同内容
  const competitionCarouselItems = [
    {
      id: 1,
      image: "/placeholder.svg?height=160&width=400",
      title: "全国台球锦标赛",
      subtitle: "报名截止：2025年8月1日",
    },
    {
      id: 2,
      image: "/placeholder.svg?height=160&width=400",
      title: "城市联赛火热进行中",
      subtitle: "奖金池总计50万元",
    },
    {
      id: 3,
      image: "/placeholder.svg?height=160&width=400",
      title: "新手训练营开启",
      subtitle: "免费参与，专业指导",
    },
  ]

  const rankingCarouselItems = [
    {
      id: 1,
      image: "/placeholder.svg?height=160&width=400",
      title: "月度球馆排行榜",
      subtitle: "查看最受欢迎的球馆",
    },
    {
      id: 2,
      image: "/placeholder.svg?height=160&width=400",
      title: "球馆设施评级",
      subtitle: "专业评测，客观公正",
    },
  ]

  const judgeCarouselItems = [
    {
      id: 1,
      image: "/placeholder.svg?height=160&width=400",
      title: "裁判认证培训",
      subtitle: "提升专业技能",
    },
    {
      id: 2,
      image: "/placeholder.svg?height=160&width=400",
      title: "优秀裁判表彰",
      subtitle: "公平公正，专业执裁",
    },
  ]

  const myEventsCarouselItems = [
    {
      id: 1,
      image: "/placeholder.svg?height=160&width=400",
      title: "我的比赛历程",
      subtitle: "记录每一次精彩对决",
    },
    {
      id: 2,
      image: "/placeholder.svg?height=160&width=400",
      title: "成就系统",
      subtitle: "解锁更多荣誉徽章",
    },
  ]

  const playerRankingCarouselItems = [
    {
      id: 1,
      image: "/placeholder.svg?height=160&width=400",
      title: "月度球员排行榜",
      subtitle: "根据累计奖金排名",
    },
    {
      id: 2,
      image: "/placeholder.svg?height=160&width=400",
      title: "年度最佳球员",
      subtitle: "技术与成绩并重",
    },
  ]

  // 根据索引获取稳定图片，避免 SSR / Hydration 不一致
  const getImageByIndex = (folder: string, index = 0) => {
    const dir = path.join(process.cwd(), "public/mock", folder)
    let files: string[] = []
    try {
      files = fs.readdirSync(dir)
    } catch (err) {
      console.error(err)
      return "/placeholder.svg"
    }
    if (!files.length) return "/placeholder.svg"
    const file = files[index % files.length]
    return `/mock/${folder}/${file}`
  }

  const playerRankings = [
    {
      id: 1,
      rank: 1,
      name: "乔峰",
      avatar: "/placeholder.svg?height=50&width=50",
      country: "🇨🇳",
      totalPrize: "134800元",
      gender: "male",
    },
    {
      id: 2,
      rank: 2,
      name: "段誉",
      avatar: "/placeholder.svg?height=50&width=50",
      country: "🇨🇳",
      totalPrize: "100000元",
      gender: "male",
    },
    {
      id: 3,
      rank: 3,
      name: "虚竹",
      avatar: "/placeholder.svg?height=50&width=50",
      country: "🇨🇳",
      totalPrize: "61300元",
      gender: "male",
    },
    {
      id: 4,
      rank: 4,
      name: "慕容复",
      avatar: "/placeholder.svg?height=50&width=50",
      country: "🇨🇳",
      totalPrize: "52000元",
      gender: "male",
    },
    {
      id: 5,
      rank: 5,
      name: "王语嫣",
      avatar: "/placeholder.svg?height=50&width=50",
      country: "🇨🇳",
      totalPrize: "50000元",
      gender: "female",
    },
    {
      id: 6,
      rank: 6,
      name: "阿朱",
      avatar: "/placeholder.svg?height=50&width=50",
      country: "🇨🇳",
      totalPrize: "44200元",
      gender: "female",
    },
    {
      id: 7,
      rank: 7,
      name: "阿紫",
      avatar: "/placeholder.svg?height=50&width=50",
      country: "🇨🇳",
      totalPrize: "37800元",
      gender: "female",
    },
    {
      id: 8,
      rank: 8,
      name: "钟灵",
      avatar: "/placeholder.svg?height=50&width=50",
      country: "🇨🇳",
      totalPrize: "35000元",
      gender: "female",
    },
  ]

  const hallRankings = [
    {
      id: 1,
      rank: 1,
      name: "逍遥派台球俱乐部",
      image: "/placeholder.svg?height=80&width=80",
      location: "大理市",
      totalPrize: "285600元",
      description: "无量山下，琅嬛福地",
    },
    {
      id: 2,
      rank: 2,
      name: "丐帮台球总舵",
      image: "/placeholder.svg?height=80&width=80",
      location: "洛阳市",
      totalPrize: "198500元",
      description: "天下第一大帮",
    },
    {
      id: 3,
      rank: 3,
      name: "少林台球院",
      image: "/placeholder.svg?height=80&width=80",
      location: "嵩山市",
      totalPrize: "176300元",
      description: "武林泰斗，千年古刹",
    },
    {
      id: 4,
      rank: 4,
      name: "慕容台球山庄",
      image: "/placeholder.svg?height=80&width=80",
      location: "姑苏市",
      totalPrize: "145200元",
      description: "以彼之道，还施彼身",
    },
    {
      id: 5,
      rank: 5,
      name: "星宿海台球宫",
      image: "/placeholder.svg?height=80&width=80",
      location: "西域",
      totalPrize: "128900元",
      description: "星宿老仙，法力无边",
    },
    {
      id: 6,
      rank: 6,
      name: "天山台球派",
      image: "/placeholder.svg?height=80&width=80",
      location: "天山市",
      totalPrize: "112400元",
      description: "缥缈峰上，灵鹫宫中",
    },
    {
      id: 7,
      rank: 7,
      name: "华山台球剑派",
      image: "/placeholder.svg?height=80&width=80",
      location: "华山市",
      totalPrize: "98700元",
      description: "剑气纵横三万里",
    },
    {
      id: 8,
      rank: 8,
      name: "武当台球山",
      image: "/placeholder.svg?height=80&width=80",
      location: "武当山",
      totalPrize: "87300元",
      description: "太极玄功，以柔克刚",
    },
  ]

  const competitions = [
    {
      id: 1,
      title: "杭州市美式八球邀请赛10",
      format: "美式八球",
      competitionType: "公开赛",
      totalPrize: "30000元",
      distance: "<5km",
      time: "2025-08-04 13:00",
      location: "杭州市",
      prizes: {
        champion: "4095元",
        runnerUp: "2000元",
        thirdPlace: "1000元",
      },
      image: "/placeholder.svg?height=80&width=80",
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
      prizes: {
        champion: "3000元",
        runnerUp: "1500元",
        thirdPlace: "800元",
      },
      image: "/placeholder.svg?height=80&width=80",
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
      prizes: {
        champion: "8000元",
        runnerUp: "4000元",
        thirdPlace: "2000元",
      },
      image: "/placeholder.svg?height=80&width=80",
      participants: 16,
      status: "即将开始",
    },
  ]

  const judgeRankings = [
    {
      id: 1,
      rank: 1,
      name: "武博然",
      avatar: "/placeholder.svg?height=50&width=50",
      location: "临沂市 威海市",
      points: "2275.5",
      certification: "CBA国家三级",
      verified: true,
    },
    {
      id: 2,
      rank: 2,
      name: "裁判长张会印",
      avatar: "/placeholder.svg?height=50&width=50",
      location: "威海市",
      points: "1829",
      certification: "CBA国家三级",
      verified: true,
    },
    {
      id: 3,
      rank: 3,
      name: "裁判李娅茹",
      avatar: "/placeholder.svg?height=50&width=50",
      location: "临沂市 威海市",
      points: "1331",
      certification: "CBA国家三级",
      verified: true,
    },
    {
      id: 4,
      rank: 4,
      name: "王庆法裁判团队",
      avatar: "/placeholder.svg?height=50&width=50",
      location: "临沂市 威海市",
      points: "964",
      certification: "CBA国家三级",
      verified: true,
    },
    {
      id: 5,
      rank: 5,
      name: "段正淳",
      avatar: "/placeholder.svg?height=50&width=50",
      location: "大理市",
      points: "856",
      certification: "CBA国家二级",
      verified: true,
    },
    {
      id: 6,
      rank: 6,
      name: "黄药师",
      avatar: "/placeholder.svg?height=50&width=50",
      location: "桃花岛",
      points: "742",
      certification: "CBA国家二级",
      verified: true,
    },
    {
      id: 7,
      rank: 7,
      name: "洪七公",
      avatar: "/placeholder.svg?height=50&width=50",
      location: "临安市",
      points: "689",
      certification: "CBA国家一级",
      verified: true,
    },
    {
      id: 8,
      rank: 8,
      name: "欧阳锋",
      avatar: "/placeholder.svg?height=50&width=50",
      location: "白驼山",
      points: "623",
      certification: "CBA国家一级",
      verified: true,
    },
  ]

  const myEvents = [
    {
      id: 1,
      title: "2024年华山论剑台球大赛",
      format: "美式八球",
      time: "2024-12-15 14:00",
      location: "华山市",
      image: "/placeholder.svg?height=80&width=80",
      myRank: 1,
      totalParticipants: 32,
      status: "已结束",
      prize: "5000元",
      description: "华山之巅，一决高下",
    },
    {
      id: 2,
      title: "少林寺台球邀请赛",
      format: "九球",
      time: "2024-11-20 10:00",
      location: "嵩山市",
      image: "/placeholder.svg?height=80&width=80",
      myRank: 3,
      totalParticipants: 24,
      status: "已结束",
      prize: "1500元",
      description: "禅武合一，球技精进",
    },
    {
      id: 3,
      title: "武当山台球锦标赛",
      format: "斯诺克",
      time: "2024-10-08 13:00",
      location: "武当山",
      image: "/placeholder.svg?height=80&width=80",
      myRank: 2,
      totalParticipants: 16,
      status: "已结束",
      prize: "3000元",
      description: "太极之道，以柔克刚",
    },
    {
      id: 4,
      title: "桃花岛台球公开赛",
      format: "美式八球",
      time: "2024-09-12 15:30",
      location: "桃花岛",
      image: "/placeholder.svg?height=80&width=80",
      myRank: 8,
      totalParticipants: 20,
      status: "已结束",
      prize: "0元",
      description: "奇门遁甲，变化无穷",
    },
    {
      id: 5,
      title: "大理台球邀请赛",
      format: "九球",
      time: "2024-08-25 11:00",
      location: "大理市",
      image: "/placeholder.svg?height=80&width=80",
      myRank: 5,
      totalParticipants: 28,
      status: "已结束",
      prize: "800元",
      description: "风花雪月，逍遥自在",
    },
    {
      id: 6,
      title: "姑苏台球精英赛",
      format: "美式八球",
      time: "2025-01-15 14:00",
      location: "姑苏市",
      image: "/placeholder.svg?height=80&width=80",
      myRank: 0,
      totalParticipants: 24,
      status: "进行中",
      prize: "0元",
      description: "以彼之道，还施彼身",
    },
    {
      id: 7,
      title: "临安台球新春赛",
      format: "斯诺克",
      time: "2025-02-08 10:00",
      location: "临安市",
      image: "/placeholder.svg?height=80&width=80",
      myRank: 0,
      totalParticipants: 32,
      status: "已报名",
      prize: "0元",
      description: "新春佳节，切磋球技",
    },
  ]

  // 用随机图片替换占位符
  competitions.forEach((c, i) => (c.image = getImageByIndex("competition", i)))
  hallRankings.forEach((h, i) => (h.image = getImageByIndex("billiard", i)))
  playerRankings.forEach((p, i) => (p.avatar = getImageByIndex("head", i)))
  judgeRankings.forEach((j, i) => (j.avatar = getImageByIndex("head", i)))
  myEvents.forEach((e, i) => (e.image = getImageByIndex("competition", i)))

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-50">
        <div className="flex items-center justify-between py-2">
          {/* <h1 className="text-xl font-bold text-gray-900">赛事</h1> */}
          {/* <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              <div className="w-1 h-1 bg-gray-400 rounded-full ml-1"></div>
              <div className="w-1 h-1 bg-gray-400 rounded-full ml-1"></div>
            </Button>
          </div> */}
        </div>

        {/* Location and Search */}
        <div className="px-4 pb-4 space-y-3">
          <div className="flex items-center gap-3">
            <Select defaultValue="shandong">
              <SelectTrigger className="w-32">
                <MapPin className="w-4 h-4 mr-1" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="shandong">山东省</SelectItem>
                <SelectItem value="beijing">北京市</SelectItem>
                <SelectItem value="shanghai">上海市</SelectItem>
                <SelectItem value="guangdong">广东省</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input placeholder="搜索赛事 / 选择项目" className="pl-10" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="competitions" className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-white mt-4 rounded-lg">
          <TabsTrigger value="competitions" className="text-sm">
            赛事
          </TabsTrigger>
          <TabsTrigger value="player-rankings" className="text-sm">
            球员排名
          </TabsTrigger>
          <TabsTrigger value="rankings" className="text-sm">
            球馆排名
          </TabsTrigger>
          <TabsTrigger value="judge" className="text-sm">
            裁判排名
          </TabsTrigger>
          <TabsTrigger value="my-events" className="text-sm">
            我的赛事
          </TabsTrigger>
        </TabsList>

        <TabsContent value="competitions" className="mt-4">
          {/* Carousel Banner */}
          <div className="mx-4 mb-4">
            <CarouselBanner items={competitionCarouselItems} />
          </div>

          {/* Hero Banner */}
          <div className="mx-4 mb-4">
            <Card className="relative overflow-hidden bg-gradient-to-r from-green-600 to-green-500 text-white">
              <CardContent className="py-0 px-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <h2 className="text-lg font-bold">组织你的台球赛事</h2>
                    <p className="text-green-100 text-sm">轻松创建和管理比赛</p>
                  </div>
                  <Button className="bg-white text-green-600 hover:bg-gray-100">
                    <Plus className="w-4 h-4 mr-1" />
                    赛事发布
                  </Button>
                </div>
                <div className="absolute -right-4 -bottom-4 opacity-20">
                  <div className="w-24 h-24 bg-white rounded-full"></div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <div className="px-4 mb-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              <Select defaultValue="all-location">
                <SelectTrigger className="w-24 h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-location">山东省</SelectItem>
                  <SelectItem value="jinan">济南市</SelectItem>
                  <SelectItem value="qingdao">青岛市</SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue="all-time">
                <SelectTrigger className="w-20 h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-time">时间</SelectItem>
                  <SelectItem value="today">今天</SelectItem>
                  <SelectItem value="week">本周</SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue="all-level">
                <SelectTrigger className="w-20 h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-level">段位</SelectItem>
                  <SelectItem value="beginner">初级</SelectItem>
                  <SelectItem value="intermediate">中级</SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue="all-prize">
                <SelectTrigger className="w-20 h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-prize">奖金</SelectItem>
                  <SelectItem value="high">高奖金</SelectItem>
                  <SelectItem value="medium">中等</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="sm" className="h-8 bg-transparent">
                <Filter className="w-3 h-3" />
              </Button>
            </div>
          </div>

          {/* Competition List */}
          <div className="px-4 space-y-4">
            {competitions.map((competition) => (
              <Card key={competition.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardContent className="px-4 py-0">
                  {/* Title at the top */}
                  <div className="mb-3">
                    <h2 className="font-semibold text-gray-900 text-base leading-tight">{competition.title}</h2>
                  </div>

                  <div className="flex gap-4 mb-0">
                    {/* Competition Image */}
                    <div className="relative">
                      <Image
                        src={competition.image || "/placeholder.svg"}
                        alt="台球桌"
                        width={80}
                        height={80}
                        className="rounded-lg object-cover bg-green-100"
                      />
                      <Badge
                        variant={competition.status === "报名中" ? "default" : "secondary"}
                        className="absolute -top-2 -right-2 text-xs"
                      >
                        {competition.status}
                      </Badge>
                    </div>

                    <div className="flex-1 space-y-1">
                      {/* Project Tag */}
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <span>项目:</span>
                        <span>{competition.format}</span>
                      </div>

                      {/* Type Tag */}
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <span>类型:</span>
                        <span>{competition.competitionType}</span>
                      </div>

                      <div className="flex items-center gap-1 text-xs text-gray-600">
                        <Calendar className="w-3 h-3" />
                        <span>{competition.time}</span>
                      </div>

                      <div className="flex items-center gap-1 text-xs text-gray-600">
                        <MapPin className="w-3 h-3" />
                        <span>{competition.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Prize Money Section - separate row */}
                  <div className="mb-3 px-3 py-1 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1">
                        <Trophy className="w-4 h-4 text-yellow-500" />
                        <span className="text-yellow-600 font-medium">冠军</span>
                        <span className="text-yellow-600 font-bold">{competition.prizes.champion}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Medal className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600 font-medium">亚军</span>
                        <span className="text-gray-600 font-bold">{competition.prizes.runnerUp}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Award className="w-4 h-4 text-orange-500" />
                        <span className="text-orange-600 font-medium">季军</span>
                        <span className="text-orange-600 font-bold">{competition.prizes.thirdPlace}</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom section with total prize and distance */}
                  <div className="flex items-center justify-between text-xs text-gray-600 pt-2 border-t border-gray-200">
                    <div className="flex items-center gap-1">
                      <Trophy className="w-3 h-3 text-green-600" />
                      <span className="text-green-600 font-medium">总奖金: {competition.totalPrize}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>距离: {competition.distance}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="player-rankings" className="mt-4">
          {/* Carousel Banner for Player Rankings */}
          <div className="mx-4 mb-6">
            <CarouselBanner items={playerRankingCarouselItems} />
          </div>

          {/* Filter Section */}
          <div className="px-4 mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">筛选:</span>
                <Select defaultValue="all">
                  <SelectTrigger className="w-20 h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部</SelectItem>
                    <SelectItem value="monthly">月度</SelectItem>
                    <SelectItem value="yearly">年度</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button variant="outline" size="sm" className="h-8 bg-transparent">
                <Filter className="w-3 h-3 mr-1" />
                筛选
              </Button>
            </div>
          </div>

          {/* Player Rankings List */}
          <div className="px-4 space-y-3">
            {playerRankings.map((player) => (
              <Card
                key={player.id}
                className={`overflow-hidden hover:shadow-md transition-shadow ${
                  player.rank === 1
                    ? "bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200"
                    : player.rank === 2
                      ? "bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200"
                      : player.rank === 3
                        ? "bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200"
                        : "bg-white"
                }`}
              >
                <CardContent className="px-4 py-0">
                  <div className="flex items-center gap-4">
                    {/* Rank Display */}
                    <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
                      {player.rank === 1 && <div className="text-2xl">👑</div>}
                      {player.rank === 2 && <div className="text-2xl">🥈</div>}
                      {player.rank === 3 && <div className="text-2xl">🥉</div>}
                      {player.rank > 3 && <span className="text-lg font-bold text-gray-700">{player.rank}</span>}
                    </div>

                    {/* Player Avatar */}
                    <div className="relative">
                      <Image
                        src={player.avatar || "/placeholder.svg"}
                        alt={player.name}
                        width={50}
                        height={50}
                        className="rounded-full object-cover"
                      />
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">{player.gender === "male" ? "♂" : "♀"}</span>
                      </div>
                    </div>

                    {/* Player Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-gray-900 font-extralight text-justify opacity-100 tracking-normal">
                          {player.name}
                        </h3>
                        <span className="text-lg">{player.country}</span>
                      </div>
                    </div>

                    {/* Prize Money */}
                    <div className="text-right">
                      <div className="text-xs text-gray-500 mb-1">累计奖金</div>
                      <div className="text-lg font-bold text-red-500">{player.totalPrize}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* My Ranking Section */}
            <Card className="bg-gray-50 border-dashed border-2 border-gray-300">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
                    <span className="text-sm text-gray-500">暂无排名</span>
                  </div>

                  <div className="relative">
                    <Image
                      src="/placeholder.svg?height=50&width=50"
                      alt="我"
                      width={50}
                      height={50}
                      className="rounded-full object-cover grayscale"
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gray-400 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">♂</span>
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-600">我</h3>
                      <span className="text-lg">🇨🇳</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs text-gray-500 mb-1">累计奖金</div>
                    <div className="text-lg font-bold text-gray-400">0元</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="rankings" className="mt-4">
          {/* Carousel Banner for Rankings */}
          <div className="mx-4 mb-6">
            <CarouselBanner items={rankingCarouselItems} />
          </div>

          {/* Filter Section 球馆排名 */}
          <div className="px-4 mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">筛选:</span>
                <Select defaultValue="all">
                  <SelectTrigger className="w-20 h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部</SelectItem>
                    <SelectItem value="monthly">月度</SelectItem>
                    <SelectItem value="yearly">年度</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button variant="outline" size="sm" className="h-8 bg-transparent">
                <Filter className="w-3 h-3 mr-1" />
                筛选
              </Button>
            </div>
          </div>

          {/* Hall Rankings List */}
          <div className="px-4 space-y-3">
            {hallRankings.map((hall) => (
              <Card
                key={hall.id}
                className={`relative overflow-hidden hover:shadow-md transition-shadow ${
                  hall.rank === 1
                    ? "bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200"
                    : hall.rank === 2
                      ? "bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200"
                      : hall.rank === 3
                        ? "bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200"
                        : "bg-white"
                }`}
              >
                {/* Rank Badge */}
                <div className="absolute bottom-0 right-2 w-8 h-8 flex items-center justify-center">
                  {hall.rank === 1 && <div className="text-xl">👑</div>}
                  {hall.rank === 2 && <div className="text-xl">🥈</div>}
                  {hall.rank === 3 && <div className="text-xl">🥉</div>}
                  {hall.rank > 3 && (
                    <span className="text-l text-gray-700">{hall.rank}</span>
                  )}
                </div>
                <CardContent className="py-0 px-4">
                  <div className="flex items-center gap-4">
                    {/* Hall Image */}
                    <div className="relative">
                      <Image
                        src={hall.image || "/placeholder.svg"}
                        alt={hall.name}
                        width={60}
                        height={60}
                        className="rounded-lg object-cover"
                      />
                    </div>

                    {/* Hall Info */}
                    <div className="flex-1">
                      <div className="space-y-1">
                        <h3 className="font-semibold text-gray-900 text-sm leading-tight">{hall.name}</h3>
                        <div className="flex items-center gap-1 text-xs text-gray-600">
                          <MapPin className="w-3 h-3" />
                          <span>{hall.location}</span>
                        </div>
                        <p className="text-xs text-gray-500 italic">{hall.description}</p>
                      </div>
                    </div>

                    {/* Prize Money */}
                    <div className="text-right">
                      <div className="text-xs text-gray-500 mb-1">累计奖金</div>
                      <div className="text-lg font-bold text-red-500">{hall.totalPrize}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="judge" className="mt-4">
          {/* Carousel Banner for Judge Rankings */}
          <div className="mx-4 mb-6">
            <CarouselBanner items={judgeCarouselItems} />
          </div>

          {/* Filter Section 裁判排名*/}
          <div className="px-4 mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">筛选:</span>
                <Select defaultValue="all">
                  <SelectTrigger className="w-20 h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部</SelectItem>
                    <SelectItem value="level1">国家一级</SelectItem>
                    <SelectItem value="level2">国家二级</SelectItem>
                    <SelectItem value="level3">国家三级</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button variant="outline" size="sm" className="h-8 bg-transparent">
                <Filter className="w-3 h-3 mr-1" />
                筛选
              </Button>
            </div>
          </div>

          {/* Judge Rankings List */}
          <div className="px-4 space-y-3">
            {judgeRankings.map((judge) => (
              <Card
                key={judge.id}
                className={`relative overflow-hidden hover:shadow-md transition-shadow ${
                  judge.rank === 1
                    ? "bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200"
                    : judge.rank === 2
                      ? "bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200"
                      : judge.rank === 3
                        ? "bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200"
                        : "bg-white"
                }`}
              >
                {/* Rank Badge */}
                <div className="absolute bottom-0 right-2 w-8 h-8 flex items-center justify-center">
                  {judge.rank === 1 && <div className="text-xl">👑</div>}
                  {judge.rank === 2 && <div className="text-xl">🥈</div>}
                  {judge.rank === 3 && <div className="text-xl">🥉</div>}
                  {judge.rank > 3 && (
                    <span className="text-lg font-bold text-gray-700">{judge.rank}</span>
                  )}
                </div>
                <CardContent className="px-4 py-0">
                  <div className="flex items-center gap-4">
                    {/* Judge Avatar */}
                    <div className="relative">
                      <Image
                        src={judge.avatar || "/placeholder.svg"}
                        alt={judge.name}
                        width={50}
                        height={50}
                        className="rounded-full object-cover"
                      />
                      {judge.verified && (
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center">
                          <Trophy className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>

                    {/* Judge Info */}
                    <div className="flex-1">
                      <div className="space-y-1">
                        <h3 className="font-semibold text-gray-900 text-sm leading-tight">{judge.name}</h3>
                        <div className="flex items-center gap-1 text-xs text-gray-600">
                          <MapPin className="w-3 h-3" />
                          <span>{judge.location}</span>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {judge.certification}
                        </Badge>
                      </div>
                    </div>

                    {/* Points */}
                    <div className="text-right">
                      <div className="text-xs text-gray-500 mb-1">执裁积分</div>
                      <div className="text-lg font-bold text-blue-600">{judge.points}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* My Judge Ranking Section */}
            <Card className="bg-gray-50 border-dashed border-2 border-gray-300">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
                    <span className="text-sm text-gray-500">暂无排名</span>
                  </div>

                  <div className="relative">
                    <Image
                      src="/placeholder.svg?height=50&width=50"
                      alt="我"
                      width={50}
                      height={50}
                      className="rounded-full object-cover grayscale"
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gray-400 rounded-full flex items-center justify-center">
                      <Trophy className="w-3 h-3 text-white" />
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="space-y-1">
                      <h3 className="font-semibold text-gray-600">我</h3>
                      <div className="flex items-center gap-1 text-xs text-gray-600">
                        <MapPin className="w-3 h-3" />
                        <span>未设置</span>
                      </div>
                      <Badge variant="outline" className="text-xs text-gray-400">
                        暂无认证
                      </Badge>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs text-gray-500 mb-1">执裁积分</div>
                    <div className="text-lg font-bold text-gray-400">0</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="my-events" className="mt-4">
          {/* Carousel Banner for My Events */}
          <div className="mx-4 mb-6">
            <CarouselBanner items={myEventsCarouselItems} />
          </div>

          {/* Filter Section */}
          <div className="px-4 mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">筛选:</span>
                <Select defaultValue="all">
                  <SelectTrigger className="w-20 h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部</SelectItem>
                    <SelectItem value="finished">已结束</SelectItem>
                    <SelectItem value="ongoing">进行中</SelectItem>
                    <SelectItem value="registered">已报名</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button variant="outline" size="sm" className="h-8 bg-transparent">
                <Filter className="w-3 h-3 mr-1" />
                筛选
              </Button>
            </div>
          </div>

          {/* My Events List */}
          <div className="px-4 space-y-3">
            {myEvents.map((event) => (
              <Card key={event.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    {/* Event Image */}
                    <div className="relative">
                      <Image
                        src={event.image || "/placeholder.svg"}
                        alt={event.title}
                        width={80}
                        height={80}
                        className="rounded-lg object-cover"
                      />
                      <Badge
                        variant={
                          event.status === "已结束" ? "secondary" : event.status === "进行中" ? "default" : "outline"
                        }
                        className="absolute -top-2 -right-2 text-xs"
                      >
                        {event.status}
                      </Badge>
                    </div>

                    {/* Event Info */}
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between">
                        <h3 className="font-semibold text-gray-900 text-sm leading-tight">{event.title}</h3>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-4 text-xs text-gray-600">
                          <span className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            {event.format}
                          </span>
                        </div>

                        <div className="flex items-center gap-1 text-xs text-gray-600">
                          <Calendar className="w-3 h-3" />
                          <span>{event.time}</span>
                        </div>

                        <div className="flex items-center gap-1 text-xs text-gray-600">
                          <MapPin className="w-3 h-3" />
                          <span>{event.location}</span>
                        </div>

                        <p className="text-xs text-gray-500 italic">{event.description}</p>
                      </div>
                    </div>

                    {/* My Ranking and Prize */}
                    <div className="text-right space-y-2">
                      {/* My Rank Display */}
                      <div className="flex flex-col items-center">
                        <div className="text-xs text-gray-500 mb-1">我的排名</div>
                        {event.myRank === 0 ? (
                          <div className="flex items-center gap-1">
                            {event.status === "进行中" ? (
                              <Clock className="w-4 h-4 text-blue-500" />
                            ) : event.status === "已报名" ? (
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            ) : (
                              <XCircle className="w-4 h-4 text-gray-400" />
                            )}
                            <span className="text-sm text-gray-500">
                              {event.status === "进行中" ? "比赛中" : event.status === "已报名" ? "已报名" : "-"}
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1">
                            {event.myRank === 1 && <div className="text-xl">👑</div>}
                            {event.myRank === 2 && <div className="text-xl">🥈</div>}
                            {event.myRank === 3 && <div className="text-xl">🥉</div>}
                            {event.myRank > 3 && (
                              <span className="text-lg font-bold text-gray-700">{event.myRank}</span>
                            )}
                            <span className="text-xs text-gray-500">/{event.totalParticipants}</span>
                          </div>
                        )}
                      </div>

                      {/* Prize Money */}
                      {event.prize !== "0元" && (
                        <div>
                          <div className="text-xs text-gray-500 mb-1">获得奖金</div>
                          <div className="text-sm font-bold text-red-500">{event.prize}</div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Statistics Summary */}
            <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900 mb-3">我的战绩统计</h3>
                <div className="grid grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-blue-600">7</div>
                    <div className="text-xs text-gray-600">参赛次数</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-yellow-600">1</div>
                    <div className="text-xs text-gray-600">冠军次数</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gray-600">3</div>
                    <div className="text-xs text-gray-600">前三次数</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-red-600">9300元</div>
                    <div className="text-xs text-gray-600">累计奖金</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="grid grid-cols-4 py-2">
          <button className="flex flex-col items-center py-2 text-blue-600">
            <Trophy className="w-5 h-5 mb-1" />
            <span className="text-xs">赛事</span>
          </button>
          <button className="flex flex-col items-center py-2 text-gray-400">
            <Users className="w-5 h-5 mb-1" />
            <span className="text-xs">交友</span>
          </button>
          <button className="flex flex-col items-center py-2 text-gray-400">
            <div className="w-5 h-5 mb-1 bg-gray-400 rounded"></div>
            <span className="text-xs">详情</span>
          </button>
          <button className="flex flex-col items-center py-2 text-gray-400">
            <div className="w-5 h-5 mb-1 bg-gray-400 rounded-full"></div>
            <span className="text-xs">我的</span>
          </button>
        </div>
      </div>

      {/* Bottom padding to account for fixed navigation */}
      <div className="h-20"></div>
    </div>
  )
}
