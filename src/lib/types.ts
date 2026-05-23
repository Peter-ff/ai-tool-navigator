export interface PricingPlan {
  name: string;
  price: string;
  features: string[];
}

export interface Tool {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: CategorySlug;
  subcategory?: string;
  tags: string[];
  website: string;
  logo: string;
  screenshots: string[];
  pricing: {
    type: "free" | "freemium" | "paid" | "open-source";
    free_tier?: string;
    starting_price?: string;
    plans?: PricingPlan[];
  };
  platforms: ("web" | "desktop" | "mobile" | "browser-extension")[];
  features: string[];
  use_cases: string[];
  rating: number;
  review_count: number;
  favorites_count: number;
  affiliate_link?: string;
  affiliate_provider?: string;
  alternatives: string[];
  related_collections: string[];
  added_date: string;
  updated_date: string;
  status: "published" | "draft" | "pending";
}

export type CategorySlug =
  | "ai-writing"
  | "ai-image"
  | "ai-coding"
  | "ai-video"
  | "ai-office"
  | "ai-design"
  | "ai-marketing"
  | "ai-audio"
  | "ai-education"
  | "ai-customer-service"
  | "ai-data"
  | "ai-lifestyle";

export interface Category {
  slug: CategorySlug;
  name: string;
  icon: string;
  description: string;
  subcategories: { slug: string; name: string }[];
}

export interface Collection {
  slug: string;
  title: string;
  description: string;
  cover_image: string;
  intro_content: string;
  tools: string[];
  tags: string[];
  published_date: string;
  author: string;
}

export type RecommendationType =
  | "theme-pack"
  | "comparison"
  | "new-tools"
  | "free-alternatives"
  | "workflow";

export interface DailyRecommendation {
  date: string;
  type: RecommendationType;
  title: string;
  description: string;
  tools: {
    slug: string;
    reason: string;
  }[];
}

export const CATEGORIES: Category[] = [
  {
    slug: "ai-writing",
    name: "AI 写作",
    icon: "pen-line",
    description: "各类 AI 写作辅助工具，覆盖文案、论文、小说等场景",
    subcategories: [
      { slug: "general-writing", name: "通用写作" },
      { slug: "copywriting", name: "文案营销" },
      { slug: "essay-writing", name: "论文写作" },
      { slug: "novel-writing", name: "小说创作" },
      { slug: "email-assistant", name: "邮件助手" },
    ],
  },
  {
    slug: "ai-image",
    name: "AI 绘画",
    icon: "image",
    description: "AI 图像生成与编辑工具，从文生图到智能修图",
    subcategories: [
      { slug: "text-to-image", name: "文生图" },
      { slug: "image-to-image", name: "图生图" },
      { slug: "style-transfer", name: "风格迁移" },
      { slug: "ai-retouch", name: "AI 修图" },
      { slug: "logo-generator", name: "Logo 生成" },
    ],
  },
  {
    slug: "ai-coding",
    name: "AI 编程",
    icon: "code",
    description: "AI 辅助编程工具，提升开发效率",
    subcategories: [
      { slug: "code-completion", name: "代码补全" },
      { slug: "low-code", name: "低代码/无代码" },
      { slug: "testing", name: "测试" },
      { slug: "deployment", name: "部署" },
    ],
  },
  {
    slug: "ai-video",
    name: "AI 视频",
    icon: "video",
    description: "AI 视频生成、编辑与处理工具",
    subcategories: [
      { slug: "text-to-video", name: "文生视频" },
      { slug: "video-editing", name: "视频编辑" },
      { slug: "digital-human", name: "数字人" },
      { slug: "subtitle", name: "字幕生成" },
    ],
  },
  {
    slug: "ai-office",
    name: "AI 办公",
    icon: "briefcase",
    description: "提升日常办公效率的 AI 工具",
    subcategories: [
      { slug: "ppt-generator", name: "PPT 生成" },
      { slug: "doc-processor", name: "文档处理" },
      { slug: "meeting-notes", name: "会议纪要" },
      { slug: "schedule", name: "日程管理" },
    ],
  },
  {
    slug: "ai-design",
    name: "AI 设计",
    icon: "palette",
    description: "AI 驱动的设计工具",
    subcategories: [
      { slug: "ui-design", name: "UI 设计" },
      { slug: "graphic-design", name: "平面设计" },
      { slug: "3d-generation", name: "3D 生成" },
    ],
  },
  {
    slug: "ai-marketing",
    name: "AI 营销",
    icon: "trending-up",
    description: "AI 营销与增长工具",
    subcategories: [
      { slug: "seo", name: "SEO 优化" },
      { slug: "social-media", name: "社媒运营" },
      { slug: "ad-copy", name: "广告文案" },
    ],
  },
  {
    slug: "ai-audio",
    name: "AI 音频",
    icon: "music",
    description: "AI 语音与音乐工具",
    subcategories: [
      { slug: "tts", name: "语音合成" },
      { slug: "music-generation", name: "音乐生成" },
      { slug: "audio-editing", name: "音频编辑" },
    ],
  },
  {
    slug: "ai-education",
    name: "AI 教育",
    icon: "book-open",
    description: "AI 驱动的学习与教育工具",
    subcategories: [
      { slug: "language-learning", name: "语言学习" },
      { slug: "knowledge-management", name: "知识管理" },
    ],
  },
  {
    slug: "ai-customer-service",
    name: "AI 客服",
    icon: "headphones",
    description: "智能客服与沟通工具",
    subcategories: [
      { slug: "chatbot", name: "聊天机器人" },
      { slug: "knowledge-base", name: "知识库" },
    ],
  },
  {
    slug: "ai-data",
    name: "AI 数据",
    icon: "bar-chart",
    description: "AI 数据分析与处理工具",
    subcategories: [
      { slug: "data-analysis", name: "数据分析" },
      { slug: "visualization", name: "数据可视化" },
    ],
  },
  {
    slug: "ai-lifestyle",
    name: "AI 生活",
    icon: "heart",
    description: "日常生活中的 AI 应用",
    subcategories: [
      { slug: "travel", name: "旅行规划" },
      { slug: "health", name: "健康管理" },
      { slug: "companion", name: "AI 陪伴" },
    ],
  },
];

export const RECOMMENDATION_TYPE_LABELS: Record<RecommendationType, string> = {
  "theme-pack": "场景主题包",
  comparison: "横向对比",
  "new-tools": "新工具速递",
  "free-alternatives": "免费替代品",
  workflow: "工作流搭配",
};
