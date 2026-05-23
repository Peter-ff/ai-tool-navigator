import { NextResponse } from "next/server";
import { saveSubmission } from "@/lib/submission-store";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, website, tagline, category, description } = body;

    if (!name?.trim()) {
      return NextResponse.json({ error: "请填写工具名称" }, { status: 400 });
    }
    if (!website?.trim()) {
      return NextResponse.json({ error: "请填写官网地址" }, { status: 400 });
    }
    if (!tagline?.trim()) {
      return NextResponse.json({ error: "请填写一句话描述" }, { status: 400 });
    }
    if (!category?.trim()) {
      return NextResponse.json({ error: "请选择分类" }, { status: 400 });
    }

    const generatedSlug = name.trim().toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    const slug = (body.slug as string) || generatedSlug || "tool";

    const submission = {
      slug,
      name: name.trim(),
      website: website.trim(),
      tagline: tagline.trim(),
      category: (category as string) || "",
      description: (description as string) || "",
      submitted_at: new Date().toISOString(),
      status: "pending" as const,
    };

    const result = await saveSubmission(submission);
    if (!result.success) {
      return NextResponse.json({ error: "提交失败，请稍后重试" }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "提交成功，审核通过后将收录到网站" });
  } catch (e) {
    console.error("Submission error:", e);
    return NextResponse.json({ error: "提交失败，请稍后重试" }, { status: 500 });
  }
}
