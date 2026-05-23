// Second batch of tools — run with: npx tsx scripts/generate-tools-batch2.ts
import * as fs from "fs";
import * as path from "path";

const TOOLS_DIR = path.join(process.cwd(), "content/tools");

interface ToolInput {
  name: string; tagline: string; description: string; category: string;
  tags: string[]; website: string; pricing_type: "free" | "freemium" | "paid" | "open-source";
  free_tier?: string; starting_price?: string; platforms: string[]; features: string[];
  use_cases: string[]; rating: number; review_count: number; favorites_count: number;
}

const tools: ToolInput[] = [
  // ===== More AI 写作 =====
  { name: "Hemingway Editor", tagline: "让写作更简洁有力的风格编辑器，海明威式写作助手", description: "Hemingway Editor 是一款专注于写作风格改进的编辑工具。它高亮标记复杂句、被动语态、副词滥用和难读段落，帮助用户写出更清晰、更有力的文字。虽然不是生成式 AI，但结合 AI 分析能力后能精准定位写作问题并提供改进建议。", category: "ai-writing", tags: ["写作风格", "简洁写作", "可读性", "编辑"], website: "https://hemingwayapp.com", pricing_type: "freemium", free_tier: "网页版免费", starting_price: "$19.99", platforms: ["web", "desktop"], features: ["可读性评分", "复杂句高亮", "被动语态检测", "副词标记", "格式导出"], use_cases: ["文章润色", "博客写作", "商务报告", "英文写作"], rating: 4.4, review_count: 6000, favorites_count: 8000 },
  { name: "HyperWrite", tagline: "AI 写作助手，学习你的风格并自动完成写作", description: "HyperWrite 是学习用户写作风格的 AI 助手。通过分析你的历史写作，AI 学会模仿你的语气和风格，在写作时提供个性化建议和自动补全。支持浏览器扩展，在 Gmail、Google Docs 等场景中无缝辅助。", category: "ai-writing", tags: ["写作助手", "个性化", "风格学习", "商业产品"], website: "https://www.hyperwriteai.com", pricing_type: "freemium", free_tier: "每日有限使用", starting_price: "$19.99/月", platforms: ["web", "browser-extension"], features: ["风格学习", "智能补全", "邮件辅助", "长文生成", "浏览器集成"], use_cases: ["日常写作", "邮件", "社交媒体", "内容创作"], rating: 4.3, review_count: 3000, favorites_count: 5000 },
  { name: "LongShot AI", tagline: "长篇文章 AI 写作专家，事实核查和 SEO 优化一步到位", description: "LongShot AI 是专注长篇内容创作的 AI 平台。特色功能包括实时事实核查（减少 AI 幻觉）、SEO 评分和多语言支持。适合需要专业长文内容的博主、记者和内容营销团队。", category: "ai-writing", tags: ["长文写作", "事实核查", "SEO", "商业产品"], website: "https://www.longshot.ai", pricing_type: "freemium", free_tier: "有限免费生成", starting_price: "$19/月", platforms: ["web"], features: ["事实核查", "长文生成", "SEO 评分", "多语言", "内容模板"], use_cases: ["博客写作", "新闻报道", "白皮书", "SEO 内容"], rating: 4.3, review_count: 2500, favorites_count: 4000 },

  // ===== More AI 编程 =====
  { name: "Cline", tagline: "VS Code 最热 AI 编程插件，开源免费的全能编程助手", description: "Cline 是 VS Code 上最受欢迎的开源 AI 编程插件之一。支持 Claude、GPT-4 等多种模型，可以在终端执行命令、读写文件、自动修复错误。开源社区驱动，更新极快，功能直逼商业 AI IDE。", category: "ai-coding", tags: ["AI 编程", "VS Code", "开源", "免费"], website: "https://cline.bot", pricing_type: "free", free_tier: "完全免费（需自备 API key）", platforms: ["desktop"], features: ["多模型支持", "终端操作", "文件管理", "自动修复", "开源"], use_cases: ["代码编写", "Bug 修复", "项目生成", "代码审查"], rating: 4.8, review_count: 9000, favorites_count: 15000 },
  { name: "Augment Code", tagline: "企业级 AI 编程平台，理解百万行代码库全局上下文", description: "Augment Code 是面向专业开发者的 AI 编程助手，主打对大型代码库的深度理解。支持百万行级别的代码上下文分析，提供精准的补全建议和重构方案。由前 Google Brain 和 Stripe 工程师联合创立。", category: "ai-coding", tags: ["AI 编程", "企业", "大型代码库", "商业产品"], website: "https://www.augmentcode.com", pricing_type: "paid", starting_price: "$30/月", platforms: ["desktop"], features: ["超长上下文", "智能补全", "代码重构", "团队协作", "安全优先"], use_cases: ["企业开发", "大型项目", "代码维护", "技术债管理"], rating: 4.4, review_count: 3000, favorites_count: 5000 },

  // ===== More AI 视频 =====
  { name: "Runway Gen-3", tagline: "AI 视频生成标杆，Gen-3 模型带来电影级画质", description: "Runway 是 AI 创意工具的行业引领者。Gen-3 模型在视频生成的画质、连贯性和可控性上都有质的飞跃。除了文生视频，还提供视频到视频的风格转换、运动画笔、绿幕抠像等功能。影视级创作工具的标杆。", category: "ai-video", tags: ["视频生成", "电影级", "创意工具", "商业产品"], website: "https://runwayml.com", pricing_type: "freemium", free_tier: "有限免费生成", starting_price: "$12/月", platforms: ["web"], features: ["文生视频 Gen-3", "运动画笔", "视频风格转换", "绿幕抠像", "多工具集成"], use_cases: ["短片创作", "广告制作", "概念可视化", "影视后期"], rating: 4.6, review_count: 20000, favorites_count: 28000 },
  { name: "Pictory", tagline: "AI 长视频转短视频，博客文章自动变视频", description: "Pictory 是专注内容再利用的 AI 视频工具。能自动将长篇文章或长视频转化为适合社交媒体的短视频片段，AI 自动提取要点、添加字幕和品牌标识。是企业内容营销团队的效率倍增器。", category: "ai-video", tags: ["视频剪辑", "内容再利用", "社交媒体", "商业产品"], website: "https://pictory.ai", pricing_type: "paid", starting_price: "$19/月", platforms: ["web"], features: ["长视频转短视频", "文章转视频", "自动字幕", "品牌模板", "AI 要点提取"], use_cases: ["内容营销", "社交媒体", "YouTube Shorts", "博客转视频"], rating: 4.4, review_count: 8000, favorites_count: 11000 },

  // ===== More AI 绘画 =====
  { name: "DreamStudio", tagline: "Stability AI 官方出品的在线 AI 绘画工作台，SD 模型原生体验", description: "DreamStudio 是 Stability AI 的官方在线图像生成平台，提供 Stable Diffusion 模型的原生体验。支持文生图、图生图、Negative Prompt 和多种画幅比例。是体验 SD 模型最简单的方式，无需本地部署。", category: "ai-image", tags: ["图像生成", "Stable Diffusion", "在线工具", "商业产品"], website: "https://dreamstudio.ai", pricing_type: "paid", starting_price: "$10/次充值", platforms: ["web"], features: ["文生图", "图生图", "Negative Prompt", "多种模型", "高分辨率输出"], use_cases: ["数字艺术", "概念设计", "创意探索", "图像素材"], rating: 4.5, review_count: 15000, favorites_count: 20000 },
  { name: "Photoroom", tagline: "AI 电商产品图片处理，一键去背景和生成场景图", description: "Photoroom 是面向电商和营销的 AI 图片编辑工具。核心功能包括：AI 背景移除（精确到发丝级别）、AI 场景生成（产品融入生活场景）、批量处理和 API 接口。深受 Shopify 卖家和电商运营团队喜爱。", category: "ai-image", tags: ["图片编辑", "电商", "去背景", "AI 场景", "商业产品"], website: "https://www.photoroom.com", pricing_type: "freemium", free_tier: "有限免费处理", starting_price: "$7.49/月", platforms: ["web", "mobile"], features: ["AI 背景移除", "AI 场景生成", "批量处理", "API 接口", "模板库"], use_cases: ["电商产品图", "社交营销", "商品展示", "品牌视觉"], rating: 4.7, review_count: 12000, favorites_count: 16000 },
  { name: "GetImg AI", tagline: "一站式 AI 图像平台，生成、编辑和训练自定义模型", description: "GetImg AI 是多功能 AI 图像平台，整合了图像生成（Stable Diffusion 驱动）、图像编辑、AI 头像和自定义模型训练功能。支持 Dreambooth 训练个人模型，可在线管理多个自定义模型。是 AI 创作者的综合性工具箱。", category: "ai-image", tags: ["图像生成", "模型训练", "AI 头像", "在线工作流", "商业产品"], website: "https://getimg.ai", pricing_type: "freemium", free_tier: "每月 100 次生成", starting_price: "$9/月", platforms: ["web"], features: ["文生图", "图生图", "自定义模型训练", "AI 头像", "图像编辑"], use_cases: ["数字创作", "角色设计", "模型训练", "AI 写真"], rating: 4.4, review_count: 8000, favorites_count: 11000 },

  // ===== More AI 办公 =====
  { name: "Otter AI", tagline: "AI 会议记录和转录专家，实时转写自动生成会议纪要", description: "Otter AI 是 AI 驱动的会议助手，能实时转录会议对话并自动生成摘要和行动项。支持 Zoom、Google Meet、Teams 等主流平台。会议结束后自动发送包含要点、关键词和待办事项的会议记录。是远程办公人士的效率工具。", category: "ai-office", tags: ["会议记录", "转录", "AI 摘要", "远程办公", "商业产品"], website: "https://otter.ai", pricing_type: "freemium", free_tier: "每月 300 分钟", starting_price: "$16.99/月", platforms: ["web", "mobile", "browser-extension"], features: ["实时转录", "AI 会议摘要", "行动项提取", "多平台集成", "回放搜索"], use_cases: ["会议记录", "访谈转录", "课堂笔记", "远程协作"], rating: 4.6, review_count: 18000, favorites_count: 22000 },
  { name: "Sanebox", tagline: "AI 邮件管理，自动分类重要邮件和清理垃圾", description: "Sanebox 是 AI 邮件管理工具，通过分析你的邮件行为模式自动将邮件分类为重要、一般和低优先级。支持 Gmail、Outlook、Yahoo 等所有主流邮箱。AI 学习你的习惯，重要邮件不被淹没，垃圾邮件自动归档。", category: "ai-office", tags: ["邮件管理", "AI 分类", "效率", "商业产品"], website: "https://www.sanebox.com", pricing_type: "paid", starting_price: "$7/月", platforms: ["web"], features: ["AI 邮件分类", "重要邮件优先", "垃圾过滤", "邮件摘要", "跨邮箱支持"], use_cases: ["邮件管理", "效率提升", "商务沟通", "信息整理"], rating: 4.3, review_count: 5000, favorites_count: 7000 },

  // ===== More AI 营销 =====
  { name: "Seventh Sense", tagline: "AI 邮件发送时间优化，在最佳时刻触达每个收件人", description: "Seventh Sense 是专注邮件发送时间优化的 AI 工具。不同于批量群发，它分析每个收件人的邮件打开行为，为每个联系人选择最佳发送时刻。与 HubSpot 和 Marketo 集成，显著提升邮件打开率和点击率。", category: "ai-marketing", tags: ["邮件营销", "AI 优化", "HubSpot", "转化率", "商业产品"], website: "https://www.theseventhsense.com", pricing_type: "paid", starting_price: "$64/月", platforms: ["web"], features: ["个性化发送时间", "行为分析", "HubSpot 集成", "A/B 测试", "报告分析"], use_cases: ["邮件营销", "线索培育", "客户沟通", "活动推广"], rating: 4.5, review_count: 2000, favorites_count: 3000 },
  { name: "AdCreative AI", tagline: "AI 广告创意生成，批量产出高转化率的广告素材", description: "AdCreative AI 是专注广告创意素材生成的 AI 平台。能批量生成符合各平台尺寸要求的广告图片、文案和短视频，支持品牌统一风格和 A/B 测试。与 Facebook、Google、Instagram 等广告平台直接对接，一键投放。", category: "ai-marketing", tags: ["广告创意", "AI 生成", "社交媒体", "商业产品"], website: "https://www.adcreative.ai", pricing_type: "paid", starting_price: "$29/月", platforms: ["web"], features: ["批量创意生成", "多平台尺寸", "品牌风格统一", "A/B 测试", "广告平台对接"], use_cases: ["广告投放", "创意测试", "社媒运营", "品牌推广"], rating: 4.4, review_count: 4000, favorites_count: 6000 },

  // ===== More AI 设计 =====
  { name: "Brandmark", tagline: "AI Logo 和品牌视觉设计，几分钟搞定全套品牌标识", description: "Brandmark 是 AI 驱动的品牌设计工具，能根据品牌名称和行业自动生成 Logo、配色方案、字体搭配和名片设计。AI 提供数百个设计方案供选择，支持在线微调和矢量格式导出。是创业者在零预算阶段的品牌设计首选。", category: "ai-design", tags: ["Logo 设计", "品牌设计", "AI 生成", "商业产品"], website: "https://brandmark.io", pricing_type: "paid", starting_price: "$25/一次性", platforms: ["web"], features: ["AI Logo 生成", "配色方案", "字体推荐", "品牌套件", "矢量导出"], use_cases: ["品牌设计", "Logo 创作", "创业品牌", "个人品牌"], rating: 4.3, review_count: 5000, favorites_count: 7000 },
  { name: "Fronty", tagline: "图片转前端代码，截图直接生成 HTML/CSS", description: "Fronty 是 AI 图片转代码工具，上传 UI 设计截图或手绘草图，AI 自动生成 HTML/CSS 代码。生成的代码基于 Bootstrap 和现代 CSS，可直接使用或进一步编辑。是前端开发和设计师快速原型化的利器。", category: "ai-design", tags: ["图片转代码", "前端", "HTML/CSS", "AI 生成", "商业产品"], website: "https://fronty.com", pricing_type: "freemium", free_tier: "有限免费转换", starting_price: "$9/月", platforms: ["web"], features: ["图片转 HTML/CSS", "Bootstrap 代码", "响应式布局", "在线编辑器", "导出代码"], use_cases: ["UI 开发", "原型设计", "设计稿转换", "快速开发"], rating: 4.1, review_count: 3000, favorites_count: 4000 },

  // ===== More AI 音频 =====
  { name: "AIVA", tagline: "AI 音乐作曲大师，创作原创配乐和背景音乐", description: "AIVA（Artificial Intelligence Virtual Artist）是 AI 音乐作曲工具的先锋。能根据风格、情感和用途参数生成原创音乐，覆盖古典、电子、电影配乐等 250+ 种风格。已为多部电影和游戏创作配乐，被 SACEM 认可为正式作曲家。", category: "ai-audio", tags: ["音乐创作", "AI 作曲", "配乐", "版权音乐", "商业产品"], website: "https://www.aiva.ai", pricing_type: "freemium", free_tier: "每月 3 次下载", starting_price: "€11/月", platforms: ["web"], features: ["AI 音乐创作", "250+ 风格", "情感参数调节", "版权免费", "乐谱编辑"], use_cases: ["视频配乐", "游戏音乐", "播客背景", "广告配乐"], rating: 4.4, review_count: 5000, favorites_count: 8000 },
  { name: "Boomy", tagline: "AI 音乐创作和发行平台，一键发布到 Spotify 和 Apple Music", description: "Boomy 让音乐创作变得无比简单。用户选择风格和情绪，AI 几秒内生成完整歌曲。更特别的是，Boomy 直接对接 Spotify、Apple Music、TikTok 等平台，用户可一键发布原创歌曲并获得版税收入。让每个人都能成为音乐人。", category: "ai-audio", tags: ["音乐创作", "AI 作曲", "音乐发行", "版税"], website: "https://boomy.com", pricing_type: "freemium", free_tier: "有限免费发布", starting_price: "$2.99/月", platforms: ["web", "mobile"], features: ["一键生成歌曲", "多风格", "平台发行", "版税收入", "协作创作"], use_cases: ["音乐创作", "内容配乐", "个人表达", "版税收入"], rating: 4.2, review_count: 6000, favorites_count: 9000 },
  { name: "Cleanvoice", tagline: "AI 播客音频清理，自动去除填充词、停顿和噪音", description: "Cleanvoice 是专为播客和音频创作者打造的 AI 清理工具。自动识别并删除录音中的“嗯”、“啊”等填充词、过长停顿和嘴唇啧声。也支持多语言填充词识别。处理速度极快，大幅减少音频后期编辑时间。", category: "ai-audio", tags: ["音频清理", "播客", "AI 编辑", "商业产品"], website: "https://cleanvoice.ai", pricing_type: "freemium", free_tier: "30 分钟免费", starting_price: "$10/月", platforms: ["web"], features: ["填充词删除", "停顿清理", "嘴唇啧声去除", "多语言支持", "批量处理"], use_cases: ["播客制作", "视频配音", "课程录制", "会议记录"], rating: 4.5, review_count: 3000, favorites_count: 5000 },

  // ===== More AI 教育 =====
  { name: "Gradescope", tagline: "AI 辅助批改和评分，教师减负神器", description: "Gradescope 是 Turnitin 旗下的 AI 批改平台。AI 自动识别和分组相似的答案，教师只需批改一次，AI 将评分应用到所有相同答案。支持手写作业识别和编程作业自动评分。已被全球顶尖大学广泛采用。", category: "ai-education", tags: ["批改", "评分", "教师工具", "教育科技", "商业产品"], website: "https://www.gradescope.com", pricing_type: "paid", starting_price: "机构定价", platforms: ["web"], features: ["AI 答案分组", "批量评分", "手写识别", "编程自动评分", "评分分析"], use_cases: ["作业批改", "考试评分", "编程课程", "大规模教学"], rating: 4.5, review_count: 4000, favorites_count: 6000 },
  { name: "Century Tech", tagline: "AI 自适应学习平台，为每个学生定制学习路径", description: "Century Tech 是 AI 驱动的自适应学习平台。AI 分析每个学生的知识掌握程度、学习速度和遗忘曲线，动态推荐学习内容和练习。教师端可以实时查看全班学习进度和薄弱环节。已获多个国际教育科技奖项。", category: "ai-education", tags: ["自适应学习", "个性化", "K-12", "AI 教育", "商业产品"], website: "https://www.century.tech", pricing_type: "paid", starting_price: "学校定价", platforms: ["web"], features: ["AI 学习路径", "知识诊断", "实时进度", "教师仪表盘", "遗忘曲线优化"], use_cases: ["课堂教学", "个性化学习", "课后辅导", "教育评估"], rating: 4.4, review_count: 2500, favorites_count: 4000 },
  { name: "Speak", tagline: "AI 口语学习应用，与 AI 进行沉浸式对话练习", description: "Speak 是 AI 驱动的语言学习应用，专注于口语能力提升。通过 AI 对话引擎，用户可以与 AI 进行真实场景的口语对话练习。AI 提供实时发音反馈、语法纠正和流利度评分。支持英语和韩语，在韩国和日本市场增长迅猛。", category: "ai-education", tags: ["语言学习", "AI 对话", "口语", "商业产品"], website: "https://www.speak.com", pricing_type: "freemium", free_tier: "基础课程免费", starting_price: "$14.99/月", platforms: ["mobile"], features: ["AI 对话练习", "实时发音反馈", "语法纠正", "流利度评分", "场景化学习"], use_cases: ["英语口语", "面试准备", "商务对话", "日常交流"], rating: 4.7, review_count: 8000, favorites_count: 12000 },

  // ===== More AI 客服 =====
  { name: "Ada", tagline: "企业级 AI 客服自动化平台，无代码搭建智能客服机器人", description: "Ada 是面向企业的无代码 AI 客服机器人平台。通过拖拽式界面，非技术人员即可搭建能处理复杂问题的客服机器人。支持多语言、多渠道部署（Web、App、Messenger、WhatsApp 等），自动与 CRM 和工单系统集成。", category: "ai-customer-service", tags: ["客服机器人", "无代码", "多渠道", "企业", "商业产品"], website: "https://www.ada.cx", pricing_type: "paid", starting_price: "联系销售", platforms: ["web", "mobile"], features: ["无代码搭建", "多语言支持", "多渠道部署", "CRM 集成", "分析仪表盘"], use_cases: ["客户服务", "售前咨询", "订单查询", "FAQ 自动化"], rating: 4.4, review_count: 3500, favorites_count: 5000 },
  { name: "Forethought", tagline: "AI 客服智能工单，自动分类、路由和解决客户问题", description: "Forethought 是 AI 客服平台的创新者，由前 NASA 工程师创立。AI 自动对客户咨询进行分类、路由和回答，能处理复杂的企业级客服场景。其 Solve 产品可自动解决高达 40% 的常见问题，大幅减少人工工单量。", category: "ai-customer-service", tags: ["客服自动化", "AI 分类", "工单路由", "企业", "商业产品"], website: "https://forethought.ai", pricing_type: "paid", starting_price: "联系销售", platforms: ["web"], features: ["AI 自动分类", "智能路由", "自动回答", "情感分析", "知识库整合"], use_cases: ["客服中心", "IT 服务", "HR 咨询", "售前支持"], rating: 4.3, review_count: 2000, favorites_count: 3000 },

  // ===== More AI 数据 =====
  { name: "H2O.ai", tagline: "开源 AI 和机器学习平台，企业级 AutoML 民主化", description: "H2O.ai 是开源 AI 和机器学习的先驱，为企业提供完整的 AI 平台解决方案。H2O-3 和 Driverless AI 自动完成特征工程、模型选择和部署。开源社区活跃，广泛用于金融风控、医疗诊断和市场营销等场景。", category: "ai-data", tags: ["AutoML", "开源", "数据科学", "企业", "商业产品"], website: "https://www.h2o.ai", pricing_type: "open-source", free_tier: "开源免费", starting_price: "企业版联系销售", platforms: ["web", "desktop"], features: ["AutoML", "特征工程", "模型部署", "开源", "Driverless AI"], use_cases: ["金融风控", "医疗诊断", "营销预测", "时间序列"], rating: 4.5, review_count: 5000, favorites_count: 8000 },
  { name: "Akkio", tagline: "无代码 AI 预测平台，拖拽数据即可构建模型", description: "Akkio 是面向非技术用户的 AI 预测平台。用户上传 CSV 数据后，AI 自动探索数据模式、选择最优模型并生成预测报告。所有操作通过拖拽完成，无需编写代码。特别适合营销和销售团队进行客户行为预测。", category: "ai-data", tags: ["无代码", "预测分析", "数据分析", "商业智能", "商业产品"], website: "https://www.akkio.com", pricing_type: "freemium", free_tier: "有限免费使用", starting_price: "$49/月", platforms: ["web"], features: ["无代码建模", "AI 数据探索", "预测报告", "模型比较", "API 部署"], use_cases: ["销售预测", "客户分析", "营销优化", "风险估计"], rating: 4.3, review_count: 2000, favorites_count: 3000 },
  { name: "MonkeyLearn", tagline: "AI 文本分析平台，自动分类、标签和情感分析", description: "MonkeyLearn 是专注文本分析的 AI 平台。无需编码即可训练文本分类、情感分析和关键词提取模型。支持批量处理、自定义标签和 API 集成。被广泛用于客户反馈分析、评论监控和工单分类。", category: "ai-data", tags: ["文本分析", "情感分析", "分类", "AI 平台", "商业产品"], website: "https://monkeylearn.com", pricing_type: "freemium", free_tier: "有限免费额度", starting_price: "$299/月", platforms: ["web"], features: ["文本分类", "情感分析", "关键词提取", "自定义标签", "API 集成"], use_cases: ["客户反馈分析", "评论监控", "工单分类", "舆情分析"], rating: 4.4, review_count: 3000, favorites_count: 4000 },

  // ===== More AI 生活 =====
  { name: "Wowzer", tagline: "AI 健身教练，根据你的身体状况自动制定训练计划", description: "Wowzer 是 AI 驱动的个性化健身应用。AI 根据用户的体能水平、目标和可用设备自动生成训练计划，并通过摄像头实时纠正动作姿势。提供瑜伽、力量训练、HIIT 等多种课程类型。把私人教练装进手机里。", category: "ai-lifestyle", tags: ["健身", "AI 教练", "动作纠正", "健康"], website: "https://www.wowzer.ai", pricing_type: "freemium", free_tier: "基础课程免费", starting_price: "$9.99/月", platforms: ["mobile"], features: ["AI 训练计划", "动作实时纠正", "多课程类型", "进度追踪", "个性化建议"], use_cases: ["家庭健身", "瑜伽练习", "体重管理", "运动康复"], rating: 4.3, review_count: 4000, favorites_count: 6000 },
  { name: "Mint AI", tagline: "AI 个人财务管理，自动记账和智能预算建议", description: "Mint 是 Intuit 旗下的个人财务管理应用，AI 增强后提供更智能的财务洞察。自动同步银行账户和信用卡，AI 分析消费模式、预测账单和提供省钱建议。是北美最受欢迎的个人理财应用之一。", category: "ai-lifestyle", tags: ["理财", "记账", "AI 分析", "预算", "免费"], website: "https://mint.intuit.com", pricing_type: "free", free_tier: "完全免费（广告支持）", platforms: ["web", "mobile"], features: ["自动记账", "AI 消费分析", "预算建议", "账单提醒", "财务规划"], use_cases: ["个人记账", "预算管理", "财务规划", "省钱"], rating: 4.5, review_count: 25000, favorites_count: 28000 },
  { name: "Woebot Health", tagline: "AI 心理健康助手，基于 CBT 的对话式情绪管理", description: "Woebot 是基于认知行为疗法（CBT）的 AI 心理健康聊天机器人。通过对话方式帮助用户识别负面思维模式、学习应对技巧和改善情绪状态。由斯坦福大学心理学家团队开发，有临床研究支持其有效性。不能替代专业心理医生。", category: "ai-lifestyle", tags: ["心理健康", "CBT", "AI 聊天", "情绪管理"], website: "https://woebothealth.com", pricing_type: "free", free_tier: "基础功能免费", platforms: ["mobile"], features: ["AI 情绪对话", "CBT 工具", "情绪追踪", "冥想指导", "心理教育"], use_cases: ["情绪管理", "减压", "焦虑应对", "自我认知"], rating: 4.2, review_count: 8000, favorites_count: 10000 },
  { name: "PictureThis", tagline: "拍照识植物，AI 植物医生和园艺顾问", description: "PictureThis 是全球最受欢迎的植物识别应用之一。拍照即可识别 30,000+ 种植物，AI 分析植物健康状况并提供病虫害诊断和养护建议。深受园艺爱好者和户外运动者喜爱，是 Apple 设计奖获得者。", category: "ai-lifestyle", tags: ["植物识别", "AI 图像", "园艺", "健康诊断", "商业产品"], website: "https://www.picturethisai.com", pricing_type: "freemium", free_tier: "每日有限识别", starting_price: "$29.99/年", platforms: ["mobile"], features: ["AI 植物识别", "病害诊断", "养护建议", "园艺社区", "AR 功能"], use_cases: ["植物识别", "园艺养护", "户外探索", "自然教育"], rating: 4.7, review_count: 35000, favorites_count: 38000 },
  { name: "Calm AI", tagline: "AI 个性化冥想和睡眠指导，帮你找回内心的平静", description: "Calm 是全球领先的冥想和心理健康应用，2025 年引入 AI 功能后提供更个性化的冥想推荐。AI 根据用户的情绪状态、睡眠数据和偏好自动推荐冥想课程、睡前故事和呼吸练习。帮助你更好地管理压力、改善睡眠。", category: "ai-lifestyle", tags: ["冥想", "睡眠", "AI 推荐", "心理健康", "商业产品"], website: "https://www.calm.com", pricing_type: "freemium", free_tier: "有限课程免费", starting_price: "$14.99/月", platforms: ["mobile", "web"], features: ["AI 冥想推荐", "睡眠故事", "呼吸练习", "情绪追踪", "个性化课程"], use_cases: ["冥想入门", "改善睡眠", "减压放松", "专注力提升"], rating: 4.6, review_count: 40000, favorites_count: 42000 },
];

function slugify(name: string): string {
  return name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

function main() {
  fs.mkdirSync(TOOLS_DIR, { recursive: true });
  const now = new Date().toISOString().split("T")[0];
  let count = 0;

  for (const t of tools) {
    const slug = slugify(t.name);
    const json = {
      slug,
      name: t.name,
      tagline: t.tagline,
      description: t.description,
      category: t.category,
      subcategory: "",
      tags: t.tags,
      website: t.website,
      logo: `/logos/${slug}.svg`,
      screenshots: [],
      pricing: {
        type: t.pricing_type,
        free_tier: t.free_tier || "",
        starting_price: t.starting_price || "",
        plans: [],
      },
      platforms: t.platforms,
      features: t.features,
      use_cases: t.use_cases,
      rating: t.rating,
      review_count: t.review_count,
      favorites_count: t.favorites_count,
      alternatives: [] as string[],
      related_collections: [] as string[],
      added_date: now,
      updated_date: now,
      status: "published",
    };
    const filePath = path.join(TOOLS_DIR, `${slug}.json`);
    fs.writeFileSync(filePath, JSON.stringify(json, null, 2) + "\n");
    console.log(`  ✓ ${slug} (${t.category})`);
    count++;
  }

  console.log(`\nBatch 2 done! ${count} tools generated.`);
  console.log("Run: npx tsx scripts/generate-registry.ts to update the registry.");
}

main();
