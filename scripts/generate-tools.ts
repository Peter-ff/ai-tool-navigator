// Batch tool generator — run with: npx tsx scripts/generate-tools.ts
import * as fs from "fs";
import * as path from "path";

const TOOLS_DIR = path.join(process.cwd(), "content/tools");
const LOAD_TOOLS_PATH = path.join(process.cwd(), "src/lib/load-tools.ts");

interface ToolInput {
  name: string;
  tagline: string;
  description: string;
  category: string;
  subcategory?: string;
  tags: string[];
  website: string;
  pricing_type: "free" | "freemium" | "paid" | "open-source";
  free_tier?: string;
  starting_price?: string;
  plans?: { name: string; price: string; features: string[] }[];
  platforms: string[];
  features: string[];
  use_cases: string[];
  rating: number;
  review_count: number;
  favorites_count: number;
}

const tools: ToolInput[] = [
  // ===== AI 写作 (ai-writing) =====
  {
    name: "Grammarly", tagline: "全球领先的 AI 写作助手，语法纠错与风格优化一步到位", description: "Grammarly 是全球最知名的 AI 写作辅助工具，提供语法检查、拼写纠正、语气调整、风格优化和查重等功能。支持浏览器扩展、桌面应用和移动设备，深度集成 Gmail、Google Docs、Word 等办公场景。企业版还提供品牌语气定制和团队协作功能。",
    category: "ai-writing", subcategory: "grammar-check", tags: ["写作助手", "语法检查", "风格优化", "商业产品"],
    website: "https://www.grammarly.com", pricing_type: "freemium", free_tier: "基础语法和拼写检查免费", starting_price: "$12/月",
    plans: [{ name: "Free", price: "免费", features: ["基础语法检查", "拼写纠正", "语气检测"] }, { name: "Premium", price: "$12/月", features: ["高级语法建议", "语气调整", "查重", "全句改写"] }, { name: "Business", price: "$15/人/月", features: ["品牌语气定制", "团队管理", "优先支持"] }],
    platforms: ["web", "desktop", "browser-extension", "mobile"], features: ["语法纠错", "拼写检查", "语气调整", "风格优化", "查重", "句子改写", "品牌语气定制"], use_cases: ["日常写作", "商务邮件", "学术论文", "品牌文案"], rating: 4.8, review_count: 45000, favorites_count: 32000,
  },
  {
    name: "QuillBot", tagline: "AI 驱动的文章改写和摘要工具，让写作更流畅", description: "QuillBot 是一款专注于文本改写和摘要生成的 AI 写作工具。核心功能包括文章智能改写（多种模式可选）、语法检查、摘要生成和引用管理。学术用户特别青睐其改写功能，可有效避免抄袭并提升表达质量。",
    category: "ai-writing", subcategory: "rewriting", tags: ["改写工具", "摘要生成", "学术写作", "商业产品"],
    website: "https://quillbot.com", pricing_type: "freemium", free_tier: "125 词/次改写", starting_price: "$9.95/月",
    plans: [{ name: "Free", price: "免费", features: ["125 词改写", "2 种改写模式"] }, { name: "Premium", price: "$9.95/月", features: ["无限改写", "8 种模式", "查重", "摘要生成"] }],
    platforms: ["web", "browser-extension"], features: ["智能改写", "语法检查", "摘要生成", "引用管理", "查重"], use_cases: ["学术写作", "文章润色", "论文降重", "多语言改写"], rating: 4.6, review_count: 28000, favorites_count: 22000,
  },
  {
    name: "Writesonic", tagline: "一站式 AI 内容创作平台，从博客到广告文案全覆盖", description: "Writesonic 是功能全面的 AI 内容生成平台，覆盖博客文章、广告文案、产品描述、社媒内容、落地页等场景。内置 SEO 优化功能，支持与 WordPress 和 SurferSEO 集成。Ai Article Writer 功能可一键生成长篇 SEO 友好文章。",
    category: "ai-writing", subcategory: "content-writing", tags: ["内容创作", "SEO", "营销文案", "商业产品"],
    website: "https://writesonic.com", pricing_type: "freemium", free_tier: "每月 25 次生成", starting_price: "$16/月",
    plans: [{ name: "Free", price: "免费", features: ["25 次生成/月"] }, { name: "Individual", price: "$16/月", features: ["无限生成", "SEO 优化", "AI Article Writer"] }, { name: "Enterprise", price: "定制", features: ["团队协作", "SSO", "API 访问"] }],
    platforms: ["web"], features: ["文章生成", "广告文案", "SEO 优化", "落地页生成", "WordPress 集成"], use_cases: ["博客写作", "广告文案", "产品描述", "社媒运营"], rating: 4.5, review_count: 12000, favorites_count: 18000,
  },
  {
    name: "Rytr", tagline: "高性价比 AI 写作助手，适合初创团队和个人创作者", description: "Rytr 是一款轻量级、高性价比的 AI 写作工具，支持 40+ 种使用场景和 30+ 种语言。内置语气调节、文章大纲生成和 SEO 分析功能。以其友好的价格和简洁的界面深受自由职业者和初创团队喜爱。",
    category: "ai-writing", subcategory: "content-writing", tags: ["写作助手", "多语言", "高性价比", "商业产品"],
    website: "https://rytr.me", pricing_type: "freemium", free_tier: "每月 10,000 字符", starting_price: "$9/月",
    plans: [{ name: "Free", price: "免费", features: ["10,000 字符/月"] }, { name: "Saver", price: "$9/月", features: ["100,000 字符/月", "40+ 场景"] }, { name: "Unlimited", price: "$29/月", features: ["无限生成", "专属客服"] }],
    platforms: ["web", "browser-extension"], features: ["多场景模板", "30+ 语言", "语气调节", "SEO 分析", "大纲生成"], use_cases: ["日常写作", "内容营销", "邮件写作", "社交媒体"], rating: 4.7, review_count: 8000, favorites_count: 14000,
  },
  {
    name: "NovelAI", tagline: "专为故事和小说创作打造的 AI 写作工具，想象力无限", description: "NovelAI 是一款面向小说作者和故事创作者的 AI 写作工坊。基于自研的 Kayra 模型，支持故事续写、情节生成、世界观构建和角色设定。特色功能包括 Lorebook（世界观管理）和图片生成，让文字与视觉创作融为一体。在二次元创作社区拥有极高人气。",
    category: "ai-writing", subcategory: "novel-writing", tags: ["小说写作", "故事创作", "二次元", "AI 图片", "商业产品"],
    website: "https://novelai.net", pricing_type: "paid", starting_price: "$10/月",
    plans: [{ name: "Tablet", price: "$10/月", features: ["1000 次生成", "基础模型"] }, { name: "Scroll", price: "$15/月", features: ["2000 次生成", "Kayra 模型"] }, { name: "Opus", price: "$25/月", features: ["无限生成", "图片生成", "高级模型"] }],
    platforms: ["web"], features: ["故事续写", "世界观管理", "角色设定", "AI 图片生成", "多模型选择"], use_cases: ["小说创作", "故事构思", "角色发展", "世界观构建"], rating: 4.5, review_count: 6500, favorites_count: 12000,
  },
  {
    name: "Wordtune", tagline: "AI 改写和语气优化专家，让你的表达更精准有力", description: "Wordtune 是 AI21 Labs 推出的写作辅助工具，专注于句子级别的改写和语气优化。不同于一般的语法检查工具，Wordtune 能理解上下文并提供多种改写方案，让表达更清晰、正式或随意。支持浏览器扩展，无缝集成日常办公场景。",
    category: "ai-writing", subcategory: "rewriting", tags: ["改写工具", "语气优化", "句子润色", "商业产品"],
    website: "https://www.wordtune.com", pricing_type: "freemium", free_tier: "每天 10 次改写", starting_price: "$9.99/月",
    platforms: ["web", "browser-extension"], features: ["句子改写", "语气调节", "段落扩写", "跨语言改写", "摘要生成"], use_cases: ["商务邮件", "日常写作", "学术润色", "跨语言沟通"], rating: 4.6, review_count: 11000, favorites_count: 16000,
  },
  {
    name: "ProWritingAid", tagline: "专业级写作分析和风格改进工具，作家的第二双眼睛", description: "ProWritingAid 是面向专业作者的深度写作分析工具，提供 25+ 种写作报告，涵盖语法、风格、可读性、黏着词、节奏等维度。与 Grammarly 不同，它更侧重于教授写作技巧而不仅仅是纠错。支持与 Scrivener、Word、Google Docs 深度集成。",
    category: "ai-writing", subcategory: "grammar-check", tags: ["写作分析", "风格改进", "专业写作", "商业产品"],
    website: "https://prowritingaid.com", pricing_type: "freemium", free_tier: "500 词/次分析", starting_price: "$10/月",
    platforms: ["web", "desktop", "browser-extension"], features: ["25+ 写作报告", "语法风格分析", "可读性评估", "节奏分析", "黏着词检测", "Scrivener 集成"], use_cases: ["小说写作", "学术论文", "商务写作", "写作学习"], rating: 4.5, review_count: 9000, favorites_count: 11000,
  },
  {
    name: "TextCortex", tagline: "企业级 AI 写作和内容自动化平台，打造品牌专属写作助手", description: "TextCortex 是面向企业的 AI 内容自动化平台。除了基础的文本生成和改写外，还支持品牌声音定制、知识库管理和多语言翻译。支持 API 接入和浏览器扩展，可与 Zendesk、Salesforce 等企业工具集成。",
    category: "ai-writing", subcategory: "content-writing", tags: ["企业写作", "品牌定制", "内容自动化", "商业产品"],
    website: "https://textcortex.com", pricing_type: "freemium", free_tier: "每天 20 次生成", starting_price: "$5.99/月",
    platforms: ["web", "browser-extension"], features: ["文本生成", "品牌声音定制", "知识库管理", "多语言翻译", "API 接入"], use_cases: ["企业内容", "品牌文案", "客服回复", "多语言内容"], rating: 4.4, review_count: 3500, favorites_count: 6000,
  },

  // ===== AI 绘画 (ai-image) =====
  {
    name: "Stable Diffusion", tagline: "开源 AI 图像生成模型之王，无限创意可能", description: "Stable Diffusion 是 Stability AI 开发的开源 AI 图像生成模型，拥有庞大的社区生态和海量衍生模型。用户可以通过文生图、图生图、图像修复等多种模式创作高质量图像。开源性使其在自定义模型训练和工作流集成方面拥有无与伦比的灵活性。",
    category: "ai-image", subcategory: "image-generation", tags: ["图像生成", "开源", "文生图", "社区驱动"],
    website: "https://stability.ai", pricing_type: "open-source", starting_price: "免费",
    platforms: ["web", "desktop"], features: ["文生图", "图生图", "图像修复", "自定义模型", "ControlNet 精准控制", "ComfyUI 工作流"], use_cases: ["数字艺术", "概念设计", "产品展示", "社交媒体配图"], rating: 4.8, review_count: 38000, favorites_count: 45000,
  },
  {
    name: "Adobe Firefly", tagline: "Adobe 出品的企业级 AI 图像生成，安全合规可商用", description: "Adobe Firefly 是 Adobe 推出的 AI 创意工具套件，深度集成在 Photoshop、Illustrator 等 Creative Cloud 应用中。使用 Adobe Stock 授权内容训练，确保生成内容安全可商用。支持文字生成图像、生成式填充、文字效果、3D 转图像等功能。",
    category: "ai-image", subcategory: "image-generation", tags: ["图像生成", "Adobe", "企业创意", "商用安全", "商业产品"],
    website: "https://www.adobe.com/products/firefly.html", pricing_type: "freemium", free_tier: "每月 25 次生成", starting_price: "$4.99/月",
    platforms: ["web"], features: ["文生图", "生成式填充", "文字效果", "3D 转图像", "Photoshop 集成", "商用安全"], use_cases: ["平面设计", "广告创意", "产品展示", "社交媒体"], rating: 4.6, review_count: 22000, favorites_count: 28000,
  },
  {
    name: "DALL·E", tagline: "OpenAI 的图像生成模型，以精准的语义理解和创意表现见长", description: "DALL·E 是 OpenAI 开发的 AI 图像生成系统，以惊人的语义理解能力和创意表现力著称。DALL·E 3 深度集成在 ChatGPT 中，用户可通过自然语言对话迭代优化图像。擅长文字渲染、精确构图和风格化创作。",
    category: "ai-image", subcategory: "image-generation", tags: ["图像生成", "OpenAI", "语义理解", "商业产品"],
    website: "https://openai.com/dall-e-3", pricing_type: "paid", starting_price: "包含在 ChatGPT Plus 订阅中",
    platforms: ["web", "mobile"], features: ["文生图", "对话式迭代", "文字渲染", "风格化创作", "ChatGPT 集成"], use_cases: ["创意设计", "插画创作", "品牌设计", "概念可视化"], rating: 4.7, review_count: 35000, favorites_count: 40000,
  },
  {
    name: "Ideogram", tagline: "文字渲染最精准的 AI 图像生成工具，Logo 和海报首选", description: "Ideogram 以精准的文字渲染能力在 AI 图像工具中脱颖而出。特别擅长在图像中准确生成文字内容，使其成为 Logo 设计、海报制作和社交图片创作的理想选择。多次迭代后图像质量和风格多样性显著提升。",
    category: "ai-image", subcategory: "image-generation", tags: ["图像生成", "文字渲染", "Logo 设计", "商业产品"],
    website: "https://ideogram.ai", pricing_type: "freemium", free_tier: "每天 25 次生成", starting_price: "$8/月",
    platforms: ["web"], features: ["精准文字渲染", "文生图", "多种风格", "Logo 生成", "海报设计"], use_cases: ["Logo 设计", "海报制作", "社交媒体图片", "品牌视觉"], rating: 4.5, review_count: 15000, favorites_count: 20000,
  },
  {
    name: "SeaArt", tagline: "国产 AI 绘画平台，海量模型和在线工作流一站搞定", description: "SeaArt（海艺）是国产 AI 绘画平台的佼佼者，整合了大量 Stable Diffusion 模型和 LoRA，用户无需本地部署即可在线使用。提供文生图、图生图、ControlNet、AI 写真等功能。中文界面友好，在国内 AI 绘画社区拥有广泛用户基础。",
    category: "ai-image", subcategory: "image-generation", tags: ["AI 绘画", "国产", "在线创作", "社区"],
    website: "https://www.seaart.ai", pricing_type: "freemium", free_tier: "每日免费额度", starting_price: "¥29/月",
    platforms: ["web"], features: ["文生图", "图生图", "ControlNet", "AI 写真", "海量 LoRA", "在线工作流"], use_cases: ["二次元创作", "AI 写真", "角色设计", "数字艺术"], rating: 4.3, review_count: 22000, favorites_count: 18000,
  },
  {
    name: "Clipdrop", tagline: "AI 图像编辑工具套件，由 Stability AI 提供支持", description: "Clipdrop 是 Stability AI 推出的 AI 图像处理工具集，功能涵盖背景删除、物体移除、图像放大、光线重打、文字移除等。使用简单直观，无需设计经验。已被 Jasper 收购，但独立产品仍然运营良好。",
    category: "ai-image", subcategory: "image-editing", tags: ["图像编辑", "背景处理", "AI 工具集", "商业产品"],
    website: "https://clipdrop.co", pricing_type: "freemium", free_tier: "有限免费使用", starting_price: "$9/月",
    platforms: ["web", "mobile"], features: ["背景删除", "物体移除", "图像超分", "光线重打", "文字移除", "素描生成"], use_cases: ["电商修图", "照片编辑", "产品摄影", "社交媒体"], rating: 4.6, review_count: 8000, favorites_count: 12000,
  },
  {
    name: "Playground AI", tagline: "免费在线 AI 图像创作画布，混合编辑模式独树一帜", description: "Playground AI 提供免费在线的 AI 图像生成和编辑画布。其独特的混合编辑模式允许用户在实际图像上进行局部 AI 重绘，精准控制创作过程。社区活跃，大量用户分享提示词和作品灵感。",
    category: "ai-image", subcategory: "image-generation", tags: ["图像生成", "在线画布", "混合编辑", "免费"],
    website: "https://playground.com", pricing_type: "freemium", free_tier: "每天 500 张免费生成", starting_price: "$12/月",
    platforms: ["web"], features: ["文生图", "混合编辑画布", "图像扩展", "社区灵感", "多模型支持"], use_cases: ["创意设计", "图像编辑", "灵感探索", "社交媒体"], rating: 4.4, review_count: 10000, favorites_count: 15000,
  },

  // ===== AI 编程 (ai-coding) =====
  {
    name: "Windsurf", tagline: "Codeium 出品的 AI 原生 IDE，代码编辑器的下一代形态", description: "Windsurf（原名 Codeium）是 Codeium 公司推出的 AI 原生代码编辑器，基于 VS Code 但完全重构了 AI 交互体验。核心特色是 Cascade 模式——AI 能自动分析代码库上下文并进行多文件编辑。支持多种编程语言和框架，提供免费的个人使用方案。",
    category: "ai-coding", subcategory: "code-completion", tags: ["代码编辑器", "AI 编程", "IDE", "商业产品"],
    website: "https://codeium.com/windsurf", pricing_type: "freemium", free_tier: "个人免费", starting_price: "$10/月",
    platforms: ["desktop"], features: ["Cascade 多文件编辑", "智能代码补全", "自然语言编程", "代码库上下文理解", "多模型支持"], use_cases: ["日常编码", "代码重构", "Bug 修复", "项目生成"], rating: 4.7, review_count: 18000, favorites_count: 22000,
  },
  {
    name: "Tabnine", tagline: "企业级 AI 代码补全，专注代码安全和隐私保护", description: "Tabnine 是最早的 AI 代码补全工具之一，定位企业市场，强调代码安全和隐私保护。支持私有部署和 IP 合规的模型训练。提供整行补全、全函数生成、代码解释和测试生成等功能。支持 30+ 种 IDE 集成。",
    category: "ai-coding", subcategory: "code-completion", tags: ["代码补全", "企业安全", "私有部署", "商业产品"],
    website: "https://www.tabnine.com", pricing_type: "freemium", free_tier: "基础补全免费", starting_price: "$12/月",
    plans: [{ name: "Starter", price: "免费", features: ["基础代码补全"] }, { name: "Pro", price: "$12/月", features: ["高级AI补全", "整行和全函数生成"] }, { name: "Enterprise", price: "定制", features: ["私有部署", "IP 合规", "团队管理"] }],
    platforms: ["desktop"], features: ["整行补全", "全函数生成", "代码解释", "测试生成", "私有部署"], use_cases: ["企业开发", "代码补全", "代码审查", "安全优先场景"], rating: 4.4, review_count: 9000, favorites_count: 13000,
  },
  {
    name: "Replit", tagline: "云端 AI 开发环境，浏览器里完成从编码到部署全流程", description: "Replit 是全球最大的云端开发环境之一，内置 AI 编程助手 Ghostwriter。用户无需安装任何软件，在浏览器中即可完成编码、调试、协作和部署。支持 50+ 种编程语言，是学习和快速原型开发的绝佳选择。",
    category: "ai-coding", subcategory: "code-completion", tags: ["云端 IDE", "在线编程", "AI 助手", "协作开发", "商业产品"],
    website: "https://replit.com", pricing_type: "freemium", free_tier: "有限计算资源", starting_price: "$15/月",
    platforms: ["web", "mobile"], features: ["云端开发环境", "Ghostwriter AI", "实时协作", "一键部署", "50+ 语言支持"], use_cases: ["快速原型", "编程学习", "协作开发", "项目演示"], rating: 4.6, review_count: 15000, favorites_count: 20000,
  },
  {
    name: "v0", tagline: "Vercel 出品的 AI UI 生成工具，用文字描述直接生成前端代码", description: "v0 是 Vercel 开发的 AI 前端 UI 生成工具。用户通过自然语言描述界面需求，v0 即可生成 React/Next.js 组件代码。生成的代码基于 shadcn/ui 和 Tailwind CSS，可直接复制到项目中使用。特别适合快速搭建产品原型和落地页。",
    category: "ai-coding", subcategory: "code-completion", tags: ["UI 生成", "前端开发", "React", "原型设计", "商业产品"],
    website: "https://v0.dev", pricing_type: "freemium", free_tier: "每月有限免费额度", starting_price: "$20/月",
    platforms: ["web"], features: ["自然语言生成 UI", "React 组件输出", "Tailwind CSS", "shadcn/ui 集成", "可复制代码"], use_cases: ["UI 原型", "落地页开发", "组件设计", "前端加速"], rating: 4.6, review_count: 12000, favorites_count: 18000,
  },
  {
    name: "Lovable", tagline: "AI 驱动的全栈应用构建平台，从想法到产品只需几分钟", description: "Lovable 是 AI 全栈应用构建平台，用户用自然语言描述产品想法，AI 自动生成完整的前后端代码和数据库。支持一键部署、版本回滚和实时预览。适合非技术创业者快速验证产品想法，也适合开发者加速原型开发。",
    category: "ai-coding", subcategory: "code-completion", tags: ["全栈开发", "应用构建", "快速原型", "AI 生成", "商业产品"],
    website: "https://lovable.dev", pricing_type: "freemium", free_tier: "有限免费项目", starting_price: "$20/月",
    platforms: ["web"], features: ["自然语言构建应用", "全栈代码生成", "数据库自动设计", "一键部署", "实时预览"], use_cases: ["MVP 构建", "产品原型", "内部工具", "非技术创业"], rating: 4.5, review_count: 8000, favorites_count: 14000,
  },
  {
    name: "Sourcegraph Cody", tagline: "基于代码知识图谱的 AI 编程助手，理解整个代码库", description: "Cody 是 Sourcegraph 推出的 AI 编程助手，核心优势是能理解整个代码仓库的上下文而非仅当前文件。通过代码知识图谱技术，Cody 可以精准回答关于代码库的问题、生成符合项目风格的代码、自动编写单元测试。",
    category: "ai-coding", subcategory: "code-completion", tags: ["代码助手", "代码搜索", "知识图谱", "商业产品"],
    website: "https://sourcegraph.com/cody", pricing_type: "freemium", free_tier: "个人开发者免费", starting_price: "$9/月",
    platforms: ["desktop", "browser-extension"], features: ["全仓库上下文理解", "代码搜索问答", "自动补全", "单元测试生成", "代码审查"], use_cases: ["大型项目开发", "代码库理解", "代码审查", "技术文档"], rating: 4.5, review_count: 7000, favorites_count: 10000,
  },

  // ===== AI 视频 (ai-video) =====
  {
    name: "Sora", tagline: "OpenAI 的文本生成视频模型，开启 AI 视频创作新纪元", description: "Sora 是 OpenAI 推出的文本到视频生成模型，能根据文字描述生成长达 60 秒的高质量视频。在物理世界理解和运动连贯性方面表现卓越，能生成复杂场景、多角色和精确运动的视频内容。目前通过 ChatGPT Plus/Pro 订阅提供。",
    category: "ai-video", subcategory: "video-generation", tags: ["视频生成", "OpenAI", "文生视频", "前沿技术", "商业产品"],
    website: "https://openai.com/sora", pricing_type: "paid", starting_price: "包含在 ChatGPT Plus 订阅中",
    platforms: ["web"], features: ["文生视频", "长达 60 秒", "多角色场景", "物理世界模拟", "视频扩展和编辑"], use_cases: ["创意视频", "概念演示", "社交媒体", "短片制作"], rating: 4.5, review_count: 18000, favorites_count: 35000,
  },
  {
    name: "Pika", tagline: "AI 视频生成新秀，简单易用的视频创作工具", description: "Pika Labs 是快速崛起的 AI 视频生成平台，以极简的用户体验和不断创新的功能著称。支持文生视频、图生视频、视频风格转换、视频扩展和 Lip Sync 等。Pika 2.0 引入了场景元素和更精准的运动控制。",
    category: "ai-video", subcategory: "video-generation", tags: ["视频生成", "AI 创作", "创意工具", "商业产品"],
    website: "https://pika.art", pricing_type: "freemium", free_tier: "免费有限生成", starting_price: "$10/月",
    platforms: ["web"], features: ["文生视频", "图生视频", "视频风格转换", "Lip Sync", "视频扩展"], use_cases: ["短视频创作", "社交内容", "创意表达", "广告素材"], rating: 4.4, review_count: 14000, favorites_count: 22000,
  },
  {
    name: "Synthesia", tagline: "企业级 AI 数字人视频制作平台，无需拍摄即可批量生产视频", description: "Synthesia 是全球领先的 AI 数字人视频制作平台。用户只需输入文本，即可生成由逼真数字人播报的专业视频。支持 140+ 种语言和 230+ 个 AI 虚拟形象，也可以创建自己的数字分身。广泛应用于企业培训、营销和内部沟通。",
    category: "ai-video", subcategory: "video-generation", tags: ["数字人", "视频制作", "企业培训", "多语言", "商业产品"],
    website: "https://www.synthesia.io", pricing_type: "paid", starting_price: "$22/月",
    plans: [{ name: "Starter", price: "$22/月", features: ["1 个 AI 形象", "120 种语言"] }, { name: "Creator", price: "$67/月", features: ["3 个 AI 形象", "自定义背景"] }, { name: "Enterprise", price: "定制", features: ["数字分身", "团队管理", "API"] }],
    platforms: ["web"], features: ["AI 数字人播报", "140+ 语言", "230+ 虚拟形象", "自定义数字分身", "模板库"], use_cases: ["企业培训", "营销视频", "产品演示", "内部沟通"], rating: 4.7, review_count: 16000, favorites_count: 24000,
  },
  {
    name: "InVideo AI", tagline: "AI 一键生成视频，输入主题自动完成剪辑和配音", description: "InVideo AI 是面向营销和社交媒体的一站式 AI 视频创作平台。用户只需输入视频主题或文章链接，AI 即可自动生成包含素材、字幕、配音和背景音乐的完整视频。内置海量模板和素材库，支持多平台尺寸适配。",
    category: "ai-video", subcategory: "video-editing", tags: ["视频制作", "AI 剪辑", "营销", "社交媒体", "商业产品"],
    website: "https://invideo.io", pricing_type: "freemium", free_tier: "免费有限导出", starting_price: "$20/月",
    platforms: ["web", "mobile"], features: ["AI 主题生成视频", "海量模板", "自动配音", "素材库", "多平台尺寸"], use_cases: ["社媒视频", "营销广告", "YouTube", "产品宣传"], rating: 4.5, review_count: 12000, favorites_count: 16000,
  },
  {
    name: "D-ID", tagline: "AI 数字人面部动画技术，让静态照片开口说话", description: "D-ID 是 AI 面部动画技术的先驱，专注于让静态照片和图像产生逼真的说话动画。其 Creative Reality™ 技术结合了面部动画和文本生成，可创建个性化的数字人视频。广泛应用于教育、营销和客户服务场景。",
    category: "ai-video", subcategory: "video-generation", tags: ["数字人", "面部动画", "AI 视频", "商业产品"],
    website: "https://www.d-id.com", pricing_type: "freemium", free_tier: "有限免费额度", starting_price: "$5.99/月",
    platforms: ["web"], features: ["面部动画", "AI 说话视频", "数字人创作", "API 接口", "多语言支持"], use_cases: ["虚拟讲师", "客服视频", "营销互动", "个性化视频"], rating: 4.3, review_count: 6000, favorites_count: 10000,
  },

  // ===== AI 办公 (ai-office) =====
  {
    name: "Microsoft Copilot", tagline: "微软全家桶内置 AI 助手，Office 和 Windows 的智能副驾驶", description: "Microsoft Copilot 是微软将 AI 深度整合进其产品生态的旗舰功能，覆盖 Word、Excel、PowerPoint、Outlook、Teams 等办公应用。在 Word 中可起草和改写文档，在 Excel 中可用自然语言分析数据，在 PowerPoint 中可一键生成演示文稿。Windows 11 系统级集成更实现了跨应用的 AI 辅助。",
    category: "ai-office", subcategory: "office-suite", tags: ["办公套件", "Microsoft", "写作", "数据分析", "商业产品"],
    website: "https://copilot.microsoft.com", pricing_type: "paid", starting_price: "$30/用户/月",
    platforms: ["web", "desktop", "mobile"], features: ["Word 文档生成", "Excel 数据分析", "PPT 自动生成", "Outlook 邮件辅助", "Teams 会议摘要", "Windows 系统集成"], use_cases: ["文档写作", "数据分析", "演示制作", "会议纪要", "邮件管理"], rating: 4.5, review_count: 25000, favorites_count: 35000,
  },
  {
    name: "Beautiful.ai", tagline: "AI 驱动的演示文稿设计工具，让你的 PPT 专业又美观", description: "Beautiful.ai 使用 AI 自动化和智能模板来创建精美的演示文稿。用户添加内容后，AI 自动调整布局、间距和排版，确保每页幻灯片都专业美观。支持团队协作、品牌模板和多种导出格式。无需设计经验即可制作出设计感十足的 PPT。",
    category: "ai-office", subcategory: "presentations", tags: ["演示文稿", "PPT", "自动设计", "团队协作", "商业产品"],
    website: "https://www.beautiful.ai", pricing_type: "freemium", free_tier: "有限模板和功能", starting_price: "$12/月",
    platforms: ["web"], features: ["AI 智能布局", "海量模板", "品牌定制", "团队协作", "多种导出"], use_cases: ["商业演示", "教学课件", "项目汇报", "融资路演"], rating: 4.5, review_count: 9000, favorites_count: 13000,
  },
  {
    name: "Tome", tagline: "AI 叙事和演示工具，一键将想法转化为引人入胜的故事", description: "Tome 是面向现代职场的 AI 叙事和演示工具。它打破了传统 PPT 的线性结构，以卡片式、响应式的页面呈现信息。用户输入一个主题，AI 即可生成结构完整、设计精美的演示文稿，支持嵌入 Figma 设计稿、视频和实时数据。",
    category: "ai-office", subcategory: "presentations", tags: ["演示工具", "叙事", "AI 生成", "商业产品"],
    website: "https://tome.app", pricing_type: "freemium", free_tier: "有限免费页面", starting_price: "$8/月",
    platforms: ["web"], features: ["AI 主题生成", "卡片式排版", "响应式设计", "Figma 嵌入", "数据分析集成"], use_cases: ["商业提案", "策略概览", "项目展示", "设计评审"], rating: 4.4, review_count: 7000, favorites_count: 11000,
  },
  {
    name: "SlidesAI", tagline: "Google Slides 的 AI 插件，输入文本即可生成完整演示文稿", description: "SlidesAI 是 Google Slides 的 AI 插件，专注于将文本内容自动转换为设计精美的演示幻灯片。支持从文章、笔记或大纲一键生成 PPT，自动提取要点并匹配合适的版式和图片。是教育工作者和职场人士的高效工具。",
    category: "ai-office", subcategory: "presentations", tags: ["Google Slides", "PPT 生成", "AI 插件", "商业产品"],
    website: "https://www.slidesai.io", pricing_type: "freemium", free_tier: "每月 3 次生成", starting_price: "$10/月",
    platforms: ["web", "browser-extension"], features: ["文本转 PPT", "Google Slides 集成", "自动排版", "图片推荐", "多语言支持"], use_cases: ["教学课件", "会议演示", "内容总结", "快速报告"], rating: 4.3, review_count: 5000, favorites_count: 8000,
  },
  {
    name: "Taskade", tagline: "AI 驱动的团队协作工作空间，任务、文档和思维导图一体", description: "Taskade 是新一代 AI 协作工作空间，将任务管理、文档编辑、思维导图和团队沟通合而为一。内置 AI 代理可以自动生成项目计划、会议议程、工作流模板等。支持实时多人协作和跨平台同步。",
    category: "ai-office", subcategory: "meeting-assistant", tags: ["协作", "任务管理", "AI 代理", "思维导图", "商业产品"],
    website: "https://www.taskade.com", pricing_type: "freemium", free_tier: "基础功能免费", starting_price: "$8/月",
    platforms: ["web", "desktop", "mobile"], features: ["AI 生成项目计划", "智能任务管理", "思维导图", "实时协作", "AI 代理"], use_cases: ["项目管理", "会议准备", "知识管理", "团队协作"], rating: 4.5, review_count: 6000, favorites_count: 9000,
  },
  {
    name: "Clockwise", tagline: "AI 智能日历调度，自动优化你的工作时间安排", description: "Clockwise 是 AI 驱动的智能日历工具，自动分析你的会议安排和时间使用模式，智能调度以创造更多的深度工作时间。支持团队范围的日历优化，减少碎片化时间，提升整体效率。与 Google Calendar 和 Outlook 集成。",
    category: "ai-office", subcategory: "calendar", tags: ["日历管理", "时间优化", "深度工作", "Google 集成", "商业产品"],
    website: "https://www.getclockwise.com", pricing_type: "freemium", free_tier: "基础功能免费", starting_price: "$6.75/月",
    platforms: ["web", "browser-extension"], features: ["智能时间调度", "专注时间保护", "团队日历优化", "会议冲突解决", "工作时间分析"], use_cases: ["日程管理", "深度工作", "会议优化", "团队效率"], rating: 4.6, review_count: 4000, favorites_count: 7000,
  },

  // ===== AI 设计 (ai-design) =====
  {
    name: "Figma AI", tagline: "设计师最爱的协作工具，AI 加持让设计更快更智能", description: "Figma AI 是 Figma 内置的 AI 功能套件，帮助设计师在熟悉的工作流中运用 AI 加速创作。包括 AI 生成设计初稿、自动命名图层、智能搜索资源、背景移除等。保持了 Figma 一贯的协作优势，AI 作为辅助而非替代设计师。",
    category: "ai-design", subcategory: "ux-ui", tags: ["UI 设计", "协作", "AI 辅助", "设计系统", "商业产品"],
    website: "https://www.figma.com/ai", pricing_type: "freemium", free_tier: "免费计划可用", starting_price: "$12/月",
    platforms: ["web", "desktop"], features: ["AI 生成设计", "自动命名图层", "智能搜索", "背景移除", "设计系统管理"], use_cases: ["UI/UX 设计", "原型制作", "设计系统", "团队协作"], rating: 4.8, review_count: 30000, favorites_count: 38000,
  },
  {
    name: "Uizard", tagline: "手绘草图秒变 UI 设计稿，AI 让产品原型设计零门槛", description: "Uizard 是面向产品经理和非设计师的 AI UI 设计工具。支持将手绘草图拍照后自动转换为数字设计稿，也能用文字描述生成界面设计。内置丰富的模板和组件库，支持实时协作和导出为代码。",
    category: "ai-design", subcategory: "ux-ui", tags: ["UI 设计", "原型", "AI 转换", "快速设计", "商业产品"],
    website: "https://uizard.io", pricing_type: "freemium", free_tier: "基础功能免费", starting_price: "$12/月",
    platforms: ["web"], features: ["手绘转设计", "文字生成 UI", "模板库", "实时协作", "代码导出"], use_cases: ["产品原型", "快速验证", "设计沟通", "非设计者创作"], rating: 4.4, review_count: 6000, favorites_count: 9000,
  },
  {
    name: "Khroma", tagline: "AI 色彩搭配工具，训练你的专属配色模型", description: "Khroma 是一款创新的 AI 配色工具。用户首先选择一组喜欢的颜色，AI 学习你的色彩偏好后生成专属配色方案。提供无限配色组合、渐变色建议和色板管理功能。是设计师和品牌运营的配色利器。",
    category: "ai-design", subcategory: "color-palette", tags: ["配色", "AI 学习", "设计工具", "免费"],
    website: "https://www.khroma.co", pricing_type: "free", free_tier: "完全免费",
    platforms: ["web"], features: ["AI 配色学习", "无限配色生成", "渐变色建议", "色板管理", "对比度检测"], use_cases: ["品牌配色", "UI 设计", "插画配色", "营销设计"], rating: 4.3, review_count: 4000, favorites_count: 6000,
  },
  {
    name: "Designs.ai", tagline: "一站式 AI 创作平台，Logo、视频和图片全覆盖", description: "Designs.ai 是面向营销团队的一站式 AI 创意平台。整合了 Logo 设计、视频制作、图片编辑、文案生成等功能。AI 根据品牌信息自动生成统一的视觉素材，确保品牌一致性。特别适合小型团队和自由职业者。",
    category: "ai-design", subcategory: "branding", tags: ["品牌设计", "AI 创作", "Logo", "营销", "商业产品"],
    website: "https://designs.ai", pricing_type: "paid", starting_price: "$19/月",
    platforms: ["web"], features: ["AI Logo 设计", "视频制作", "图片编辑", "文案生成", "品牌套件"], use_cases: ["品牌设计", "营销素材", "社媒内容", "Logo 创作"], rating: 4.2, review_count: 5000, favorites_count: 7000,
  },

  // ===== AI 营销 (ai-marketing) =====
  {
    name: "HubSpot AI", tagline: "营销自动化巨头的 AI 升级，内容、邮件和 CRM 全覆盖", description: "HubSpot AI 是 HubSpot 营销平台内置的 AI 功能集。支持 AI 撰写营销邮件、生成社交媒体内容、创建落地页、分析客户数据等。与 HubSpot CRM 深度集成，可根据客户行为自动触发个性化营销。是企业级入站营销的 AI 驱动引擎。",
    category: "ai-marketing", subcategory: "marketing-automation", tags: ["营销自动化", "CRM", "邮件营销", "企业", "商业产品"],
    website: "https://www.hubspot.com", pricing_type: "paid", starting_price: "$15/月",
    platforms: ["web"], features: ["AI 邮件撰写", "社媒内容生成", "落地页创建", "客户行为分析", "自动化工作流"], use_cases: ["邮件营销", "社媒运营", "线索培育", "数据分析"], rating: 4.5, review_count: 20000, favorites_count: 25000,
  },
  {
    name: "Anyword", tagline: "AI 预测文案效果，数据驱动优化营销内容转化率", description: "Anyword 是专注转化率优化的 AI 文案平台。其独特之处在于能预测文案在不同渠道和受众中的表现，给出转化率评分。支持广告文案、落地页、社交媒体和邮件等多种营销场景，基于数据不断优化内容策略。",
    category: "ai-marketing", subcategory: "copywriting", tags: ["文案优化", "转化率", "预测分析", "A/B 测试", "商业产品"],
    website: "https://anyword.com", pricing_type: "paid", starting_price: "$39/月",
    platforms: ["web", "browser-extension"], features: ["文案效果预测", "转化率评分", "受众定向", "A/B 测试", "多场景模板"], use_cases: ["广告文案", "落地页优化", "邮件营销", "社媒内容"], rating: 4.4, review_count: 4000, favorites_count: 6000,
  },
  {
    name: "MarketMuse", tagline: "AI 内容策略和 SEO 优化平台，数据驱动的内容规划", description: "MarketMuse 是面向内容营销团队的 AI 策略平台。通过分析 SERP 和竞争对手内容，AI 自动生成内容简报、关键词建议和主题覆盖度评分。帮助团队系统化地产出高排名内容，而非凭感觉写作。",
    category: "ai-marketing", subcategory: "seo", tags: ["SEO", "内容策略", "关键词分析", "内容规划", "商业产品"],
    website: "https://www.marketmuse.com", pricing_type: "paid", starting_price: "$149/月",
    platforms: ["web"], features: ["AI 内容简报", "关键词分析", "主题覆盖度评分", "竞争对手分析", "内容优化建议"], use_cases: ["SEO 内容策略", "博客规划", "知识库建设", "内容审计"], rating: 4.3, review_count: 3000, favorites_count: 5000,
  },

  // ===== AI 音频 (ai-audio) =====
  {
    name: "Murf AI", tagline: "最逼真的 AI 语音合成，制作专业配音从未如此简单", description: "Murf AI 是领先的 AI 语音合成平台，提供 120+ 种超逼真的 AI 声音，覆盖 20+ 种语言。用户可以精细调节语速、语调和停顿，将文本转换为专业级配音。广泛用于视频配音、播客制作、电子学习和广告配音。",
    category: "ai-audio", subcategory: "tts", tags: ["语音合成", "配音", "AI 声音", "商业产品"],
    website: "https://murf.ai", pricing_type: "freemium", free_tier: "10 分钟免费生成", starting_price: "$19/月",
    platforms: ["web"], features: ["120+ AI 声音", "20+ 语言", "语调调节", "背景音乐", "视频同步"], use_cases: ["视频配音", "播客制作", "电子学习", "广告配音"], rating: 4.6, review_count: 10000, favorites_count: 14000,
  },
  {
    name: "Speechify", tagline: "AI 文字转语音阅读器，让每篇文章都能被听见", description: "Speechify 是广受欢迎的 AI 文字转语音应用。可以将网页、PDF、电子书和文档转换为自然流畅的音频朗读。支持名人声音（如 Snoop Dogg、Gwyneth Paltrow），提供跨设备同步阅读进度。对阅读障碍者和多任务学习者特别有帮助。",
    category: "ai-audio", subcategory: "tts", tags: ["文字转语音", "阅读", "名人声音", "学习辅助", "商业产品"],
    website: "https://speechify.com", pricing_type: "freemium", free_tier: "基础声音免费", starting_price: "$11.58/月",
    platforms: ["web", "browser-extension", "mobile"], features: ["自然语音朗读", "名人声音", "PDF/电子书朗读", "跨设备同步", "速度调节"], use_cases: ["文章朗读", "学习辅助", "文档审听", "多任务阅读"], rating: 4.7, review_count: 18000, favorites_count: 22000,
  },
  {
    name: "LALAL.AI", tagline: "AI 音轨分离工具，从任何歌曲中提取人声和乐器", description: "LALAL.AI 是专业的 AI 音轨分离工具，可以精准地从音乐中分离人声和伴奏，或分离出鼓、贝斯、钢琴等独立乐器轨道。使用先进的神经网络技术，分离质量在同类产品中名列前茅。DJ、音乐制作人和卡拉 OK 爱好者的必备工具。",
    category: "ai-audio", subcategory: "audio-editing", tags: ["音轨分离", "人声提取", "音乐制作", "AI 音频", "商业产品"],
    website: "https://www.lalal.ai", pricing_type: "freemium", free_tier: "10 分钟免费处理", starting_price: "$15/次",
    platforms: ["web", "desktop"], features: ["人声伴奏分离", "多乐器分离", "高精度算法", "批量处理", "多格式导出"], use_cases: ["音乐制作", "卡拉OK", "Remix", "采样提取"], rating: 4.5, review_count: 7000, favorites_count: 10000,
  },
  {
    name: "Krisp", tagline: "AI 降噪神器，会议和通话的背景噪音一键消失", description: "Krisp 是全球领先的 AI 实时降噪工具，在会议通话中过滤背景噪音、回声和他人声音。支持所有主流会议平台（Zoom、Teams、Meet 等），本地处理确保隐私安全。全球超过 2000 家企业使用，是远程办公的刚需工具。",
    category: "ai-audio", subcategory: "audio-editing", tags: ["降噪", "会议", "AI 音频", "远程办公", "商业产品"],
    website: "https://krisp.ai", pricing_type: "freemium", free_tier: "每天 60 分钟免费", starting_price: "$8/月",
    platforms: ["desktop", "mobile"], features: ["AI 实时降噪", "回声消除", "他人声音过滤", "所有会议平台兼容", "本地处理保隐私"], use_cases: ["远程会议", "客户通话", "播客录制", "线上教学"], rating: 4.7, review_count: 14000, favorites_count: 18000,
  },
  {
    name: "Voicemod", tagline: "实时 AI 变声器，游戏、直播和娱乐的声音变形工具", description: "Voicemod 是业界领先的实时 AI 变声器，可在游戏、直播和通话中实时改变声音。提供数百种声音效果和 AI 语音皮肤，支持自定义声音创作。深受游戏玩家、直播主和内容创作者喜爱，月活用户超 4000 万。",
    category: "ai-audio", subcategory: "voice-changer", tags: ["变声器", "AI 声音", "游戏", "直播", "商业产品"],
    website: "https://www.voicemod.net", pricing_type: "freemium", free_tier: "有限声音效果", starting_price: "一次性付费 $14.99",
    platforms: ["desktop"], features: ["实时变声", "数百种音效", "AI 语音皮肤", "自定义声音", "Voicelab 声音创作"], use_cases: ["游戏娱乐", "直播互动", "内容创作", "声音匿名"], rating: 4.3, review_count: 12000, favorites_count: 16000,
  },

  // ===== AI 教育 (ai-education) =====
  {
    name: "Khanmigo", tagline: "可汗学院的 AI 导师，一对一引导式学习而非直接给答案", description: "Khanmigo 是可汗学院基于 GPT-4 打造的 AI 学习助手。不同于直接给学生答案，Khanmigo 采用苏格拉底式提问，引导学习者独立思考。覆盖数学、科学、编程、人文等多个学科，提供个性化辅导和写作反馈。K-12 教育 AI 应用的标杆。",
    category: "ai-education", subcategory: "tutoring", tags: ["AI 辅导", "教育", "可汗学院", "K-12", "学习"],
    website: "https://www.khanmigo.ai", pricing_type: "paid", starting_price: "$4/月",
    platforms: ["web"], features: ["AI 一对一辅导", "苏格拉底式提问", "写作反馈", "多学科覆盖", "教师工具"], use_cases: ["课后辅导", "家庭学习", "写作提升", "教师辅助"], rating: 4.6, review_count: 8000, favorites_count: 12000,
  },
  {
    name: "Quizlet AI", tagline: "全球最大的学习平台 AI 升级，智能生成闪卡和测验", description: "Quizlet AI（Q-Chat）是 Quizlet 学习平台的 AI 增强功能。AI 自动从学习材料中生成闪卡、测验题和学习计划。Q-Chat 提供对话式学习体验，模拟导师提问帮助学生巩固知识。全球超过 6000 万学习者使用。",
    category: "ai-education", subcategory: "flashcards", tags: ["学习工具", "闪卡", "AI 测验", "记忆", "商业产品"],
    website: "https://quizlet.com", pricing_type: "freemium", free_tier: "基础功能免费", starting_price: "$7.99/月",
    platforms: ["web", "mobile"], features: ["AI 生成闪卡", "智能测验", "Q-Chat 学习", "学习计划", "记忆曲线"], use_cases: ["语言学习", "考试备考", "知识记忆", "课堂辅助"], rating: 4.5, review_count: 25000, favorites_count: 30000,
  },
  {
    name: "ELSA Speak", tagline: "AI 英语发音教练，精准到音素级别的口语纠正", description: "ELSA Speak 是专注于英语发音纠正的 AI 应用。使用专利级语音识别技术，能检测到音素级别的发音错误并提供个性化纠正方案。提供实时反馈、评分和渐进式学习路径。被全球 100+ 国家用户使用，是英语口语提升的效率工具。",
    category: "ai-education", subcategory: "language-learning", tags: ["英语学习", "发音纠正", "AI 教练", "商业产品"],
    website: "https://elsaspeak.com", pricing_type: "freemium", free_tier: "基础课程免费", starting_price: "$11.99/月",
    platforms: ["mobile"], features: ["音素级发音检测", "实时纠错", "个性化学习路径", "评分系统", "情景对话"], use_cases: ["英语口语", "发音纠正", "面试准备", "日常沟通"], rating: 4.5, review_count: 12000, favorites_count: 15000,
  },
  {
    name: "Socratic by Google", tagline: "Google 的 AI 作业助手，拍照解题并引导学习", description: "Socratic 是 Google 推出的 AI 学习应用。学生拍照上传作业题，AI 识别问题并提供解题步骤、概念解释和相关学习资源。基于 Google AI 和搜索技术，覆盖数学、科学、历史、英语等学科。完全免费，是学生完成作业和自学的得力助手。",
    category: "ai-education", subcategory: "homework-help", tags: ["作业辅导", "拍照解题", "Google", "免费"],
    website: "https://socratic.org", pricing_type: "free", free_tier: "完全免费",
    platforms: ["mobile"], features: ["拍照识题", "AI 解题步骤", "概念讲解", "学习视频推荐", "多学科覆盖"], use_cases: ["作业辅导", "考前复习", "自学", "概念理解"], rating: 4.4, review_count: 10000, favorites_count: 14000,
  },

  // ===== AI 客服 (ai-customer-service) =====
  {
    name: "Zendesk AI", tagline: "客服行业标杆的 AI 升级，智能工单、机器人和知识库", description: "Zendesk AI 是全球领先客服平台 Zendesk 的 AI 功能集。包括智能工单分类和路由、AI 回答机器人、知识库自动生成和客服人员辅助等。帮助企业减少客服响应时间，提高解决率和客户满意度。",
    category: "ai-customer-service", subcategory: "chatbot", tags: ["客服", "工单", "AI 机器人", "企业", "商业产品"],
    website: "https://www.zendesk.com", pricing_type: "paid", starting_price: "$19/月",
    platforms: ["web", "mobile"], features: ["智能工单路由", "AI 客服机器人", "知识库自动生成", "客服辅助", "情感分析"], use_cases: ["客户支持", "IT 服务台", "HR 服务", "自助服务"], rating: 4.4, review_count: 15000, favorites_count: 18000,
  },
  {
    name: "Intercom Fin", tagline: "AI 客服机器人新标准，直接回答而非仅给出文章链接", description: "Fin 是 Intercom 推出的新一代 AI 客服机器人，由 GPT-4 驱动。与传统机器人不同，Fin 能直接理解和回答客户问题，而非简单地推送帮助文章链接。支持多语言自动切换，无法回答时无缝转接人工。大幅降低了企业的客服工单量。",
    category: "ai-customer-service", subcategory: "chatbot", tags: ["AI 机器人", "客服", "GPT-4", "自动化", "商业产品"],
    website: "https://www.intercom.com/fin", pricing_type: "paid", starting_price: "$0.99/解决",
    platforms: ["web"], features: ["AI 直接回答", "多语言自动切换", "人工无缝转接", "知识库学习", "数据分析"], use_cases: ["客户支持", "售前咨询", "帮助中心", "SaaS 客服"], rating: 4.6, review_count: 6000, favorites_count: 9000,
  },
  {
    name: "Tidio", tagline: "轻量级 AI 客服和营销聊天工具，中小企业的首选", description: "Tidio 是面向中小企业的 AI 客服和营销聊天平台。结合了 Live Chat、AI 聊天机器人和营销自动化功能。Lyro AI 机器人可以自动处理高达 70% 的常见客户问题。界面简洁、设置简单，无需技术背景即可上手。",
    category: "ai-customer-service", subcategory: "chatbot", tags: ["在线客服", "AI 机器人", "中小企业", "营销", "商业产品"],
    website: "https://www.tidio.com", pricing_type: "freemium", free_tier: "基础功能免费", starting_price: "$29/月",
    platforms: ["web", "mobile"], features: ["AI 聊天机器人", "Live Chat", "营销自动化", "邮件整合", "访客追踪"], use_cases: ["在线客服", "销售转化", "客户管理", "订单咨询"], rating: 4.7, review_count: 10000, favorites_count: 13000,
  },

  // ===== AI 数据 (ai-data) =====
  {
    name: "Dataiku", tagline: "企业级 AI 和数据科学平台，从数据准备到模型部署全流程", description: "Dataiku 是面向企业的一体化数据科学和机器学习平台。提供可视化数据准备、AutoML 建模、模型部署和 MLOps 全流程支持。支持代码和无代码两种工作模式，让数据科学家和业务分析师在同一平台上协作。",
    category: "ai-data", subcategory: "data-analysis", tags: ["数据科学", "AutoML", "MLOps", "企业", "商业产品"],
    website: "https://www.dataiku.com", pricing_type: "paid", starting_price: "联系销售",
    platforms: ["web"], features: ["可视化数据准备", "AutoML", "模型部署", "MLOps", "协作开发"], use_cases: ["数据科学", "机器学习", "商业智能", "AI 部署"], rating: 4.5, review_count: 5000, favorites_count: 7000,
  },
  {
    name: "DataRobot", tagline: "自动化机器学习平台先驱，让 AI 模型构建变得简单高效", description: "DataRobot 是自动化机器学习（AutoML）领域的先驱和领导者。平台自动完成特征工程、模型选择、超参数调优和部署，大幅降低企业构建 AI 模型的门槛。支持时间序列预测、分类、回归等多种建模任务。",
    category: "ai-data", subcategory: "data-analysis", tags: ["AutoML", "机器学习", "预测建模", "企业", "商业产品"],
    website: "https://www.datarobot.com", pricing_type: "paid", starting_price: "联系销售",
    platforms: ["web"], features: ["自动特征工程", "模型自动选择", "超参数调优", "一键部署", "模型监控"], use_cases: ["预测建模", "客户流失预测", "需求预测", "风险评估"], rating: 4.4, review_count: 4000, favorites_count: 6000,
  },
  {
    name: "Obviously AI", tagline: "无代码 AI 预测建模，上传数据即可获得预测结果", description: "Obviously AI 是无代码 AI 预测平台，面向非技术用户设计。用户只需上传 CSV 数据，选择预测目标列，平台自动完成所有建模步骤并生成可用的预测 API。所有操作通过点击完成，无需编写代码，是商业分析师进行快速数据建模的理想工具。",
    category: "ai-data", subcategory: "data-analysis", tags: ["无代码", "预测分析", "CSV 建模", "商业智能", "商业产品"],
    website: "https://www.obviously.ai", pricing_type: "paid", starting_price: "$299/月",
    platforms: ["web"], features: ["无代码建模", "自动数据预处理", "模型评估报告", "预测 API", "CSV 上传"], use_cases: ["商业预测", "客户分析", "风险评估", "快速建模"], rating: 4.3, review_count: 2000, favorites_count: 3000,
  },

  // ===== AI 生活 (ai-lifestyle) =====
  {
    name: "Oura AI", tagline: "智能戒指 + AI 健康数据分析，比你更了解你的身体", description: "Oura Ring 是智能健康戒指的行业标杆，结合 AI 分析睡眠、活动、心率和体温等数据。Oura AI Advisor 功能可基于你的长期健康数据提供个性化建议，帮助改善睡眠质量、管理压力和优化运动表现。是量化自我运动的代表产品。",
    category: "ai-lifestyle", subcategory: "health", tags: ["健康", "智能穿戴", "睡眠分析", "AI 健康", "商业产品"],
    website: "https://ouraring.com", pricing_type: "paid", starting_price: "$299（硬件）+ $5.99/月",
    platforms: ["mobile"], features: ["AI 睡眠分析", "健康趋势洞察", "压力管理", "运动恢复评估", "体温监测"], use_cases: ["睡眠改善", "健康管理", "运动优化", "压力调节"], rating: 4.5, review_count: 15000, favorites_count: 20000,
  },
  {
    name: "Cleo", tagline: "AI 理财助手，用聊天的方式管理个人财务", description: "Cleo 是面向年轻人的 AI 理财聊天机器人。用户以自然语言与 Cleo 聊天，即可了解消费习惯、设置预算、自动储蓄和获取理财建议。幽默风趣的互动风格深受 Z 世代用户喜爱，让原本枯燥的理财变得有趣和个性化。",
    category: "ai-lifestyle", subcategory: "health", tags: ["理财", "AI 助手", "聊天", "预算", "商业产品"],
    website: "https://www.cleo.com", pricing_type: "freemium", free_tier: "基础功能免费", starting_price: "$5.99/月",
    platforms: ["mobile"], features: ["AI 消费分析", "智能预算", "自动储蓄", "理财建议", "账单提醒"], use_cases: ["个人理财", "预算管理", "储蓄目标", "消费追踪"], rating: 4.4, review_count: 10000, favorites_count: 14000,
  },
  {
    name: "Plant.id", tagline: "拍照识植物 AI，植物学家装在你的手机里", description: "Plant.id 是基于 AI 图像识别的植物识别应用。用户拍照后，AI 精确识别植物的种类、健康状况和病虫害信息。覆盖 30,000+ 种植物，识别准确率达 92% 以上。是园艺爱好者和专业种植者的必备工具，也提供 API 接口供企业使用。",
    category: "ai-lifestyle", subcategory: "lifestyle", tags: ["植物识别", "AI 图像", "园艺", "健康检测", "商业产品"],
    website: "https://plant.id", pricing_type: "freemium", free_tier: "免费有限识别", starting_price: "$3.99/月",
    platforms: ["web", "mobile"], features: ["AI 植物识别", "病害检测", "健康评估", "30,000+ 物种", "API 接口"], use_cases: ["植物识别", "园艺管理", "病虫害防治", "自然教育"], rating: 4.3, review_count: 6000, favorites_count: 8000,
  },
  {
    name: "Yummly", tagline: "AI 个性化食谱推荐，根据你的口味和冰箱食材智能匹配", description: "Yummly 是 AI 驱动的智能食谱和烹饪助手平台。根据用户的饮食偏好、过敏信息和手头食材，AI 智能推荐个性化食谱。支持营养追踪、购物清单自动生成和烹饪指导。让家常烹饪更省心、更健康。",
    category: "ai-lifestyle", subcategory: "lifestyle", tags: ["食谱", "AI 推荐", "烹饪", "个性化", "商业产品"],
    website: "https://www.yummly.com", pricing_type: "freemium", free_tier: "基础功能免费", starting_price: "$4.99/月",
    platforms: ["web", "mobile"], features: ["个性化食谱推荐", "食材识别", "营养追踪", "购物清单", "烹饪步骤指导"], use_cases: ["家庭烹饪", "饮食规划", "健康管理", "食材利用"], rating: 4.4, review_count: 8000, favorites_count: 11000,
  },
  {
    name: "Sleep Cycle", tagline: "AI 智能闹钟，在浅睡阶段唤醒你，醒来精力充沛", description: "Sleep Cycle 是全球下载量最高的智能闹钟应用之一。通过手机传感器分析睡眠周期，AI 在用户处于最浅睡眠阶段时唤醒，减少起床疲惫感。提供详细的睡眠质量报告、打鼾检测和睡前放松指导。帮助数百万人改善睡眠质量。",
    category: "ai-lifestyle", subcategory: "lifestyle", tags: ["睡眠", "AI 闹钟", "健康", "数据分析", "商业产品"],
    website: "https://www.sleepcycle.com", pricing_type: "freemium", free_tier: "基础闹钟免费", starting_price: "$29.99/年",
    platforms: ["mobile"], features: ["智能唤醒", "睡眠周期分析", "打鼾检测", "睡前放松", "睡眠报告"], use_cases: ["睡眠改善", "作息规律", "健康追踪", "早起辅助"], rating: 4.6, review_count: 20000, favorites_count: 25000,
  },
];

// Generate full tool JSON
function generateToolJSON(t: ToolInput, slug: string) {
  const now = new Date().toISOString().split("T")[0];
  return {
    slug,
    name: t.name,
    tagline: t.tagline,
    description: t.description,
    category: t.category,
    subcategory: t.subcategory || "",
    tags: t.tags,
    website: t.website,
    logo: `/logos/${slug}.svg`,
    screenshots: [],
    pricing: {
      type: t.pricing_type,
      free_tier: t.free_tier || "",
      starting_price: t.starting_price || "",
      plans: t.plans || [],
    },
    platforms: t.platforms,
    features: t.features,
    use_cases: t.use_cases,
    rating: t.rating,
    review_count: t.review_count,
    favorites_count: t.favorites_count,
    alternatives: [],
    related_collections: [],
    added_date: now,
    updated_date: now,
    status: "published",
  };
}

function slugify(name: string): string {
  return name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

// Main
function main() {
  fs.mkdirSync(TOOLS_DIR, { recursive: true });

  const slugs: string[] = [];

  for (const t of tools) {
    const slug = slugify(t.name);
    const json = generateToolJSON(t, slug);
    const filePath = path.join(TOOLS_DIR, `${slug}.json`);
    fs.writeFileSync(filePath, JSON.stringify(json, null, 2) + "\n");
    slugs.push(slug);
    console.log(`  ✓ ${slug} (${t.category})`);
  }

  // Generate load-tools.ts registry
  const sorted = [...slugs].sort();
  const lines: string[] = [];
  lines.push("// Auto-generated by scripts/generate-tools.ts");
  lines.push("// Edit that script to add tools, then re-run it");
  lines.push("");
  lines.push("const toolModules = {");
  for (const slug of sorted) {
    lines.push(`  "${slug}": () => import("@/content/tools/${slug}.json"),`);
  }
  lines.push("};");
  lines.push("");
  lines.push('import type { Tool } from "./types";');
  lines.push("");
  lines.push("let _cache: Tool[] | null = null;");
  lines.push("");
  lines.push("export async function loadAllTools(): Promise<Tool[]> {");
  lines.push("  if (_cache) return _cache;");
  lines.push("  const results = await Promise.all(");
  lines.push("    Object.values(toolModules).map((fn) => fn())");
  lines.push("  );");
  lines.push("  _cache = results");
  lines.push('    .map((m) => (m as { default: Tool }).default ?? (m as Tool))');
  lines.push('    .filter((t) => t.status === "published");');
  lines.push("  return _cache;");
  lines.push("}");

  fs.writeFileSync(LOAD_TOOLS_PATH, lines.join("\n") + "\n");

  console.log(`\nDone! ${tools.length} tools generated.`);
  console.log(`Registry updated at ${LOAD_TOOLS_PATH}`);
}

main();
