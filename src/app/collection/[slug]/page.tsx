import { notFound } from "next/navigation";
import Link from "next/link";
import { loadCollections, loadAllTools } from "@/lib/data";
import { ToolCard } from "@/components/tool/ToolCard";
import { ChevronRight, Calendar, User } from "lucide-react";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const collections = await loadCollections();
  return collections.map((c) => ({ slug: c.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const collections = await loadCollections();
  const collection = collections.find((c) => c.slug === slug);
  if (!collection) return {};
  return {
    title: collection.title,
    description: collection.description,
  };
}

export default async function CollectionPage({ params }: Props) {
  const { slug } = await params;
  const collections = await loadCollections();
  const collection = collections.find((c) => c.slug === slug);
  if (!collection) notFound();

  const allTools = await loadAllTools();
  const tools = collection.tools
    .map((s) => allTools.find((t) => t.slug === s))
    .filter((t): t is NonNullable<typeof t> => t != null);

  return (
    <div className="container-page py-8">
      <nav className="mb-6 flex items-center gap-1 text-[13px] text-apple-quaternary">
        <Link href="/" className="hover:text-apple-blue transition-colors">首页</Link>
        <ChevronRight size={13} />
        <span className="text-apple-tertiary">{collection.title}</span>
      </nav>

      <div className="mx-auto max-w-3xl">
        <h1 className="text-[28px] font-bold tracking-tight text-apple-text sm:text-[34px]">
          {collection.title}
        </h1>
        <p className="mt-2 text-[17px] text-apple-secondary">{collection.description}</p>
        <div className="mt-3 flex items-center gap-4 text-[13px] text-apple-quaternary">
          <span className="flex items-center gap-1.5">
            <Calendar size={13} />
            {collection.published_date}
          </span>
          <span className="flex items-center gap-1.5">
            <User size={13} />
            {collection.author}
          </span>
        </div>

        {collection.intro_content && (
          <div className="mt-6 rounded-[24px] bg-white p-7 text-[15px] leading-relaxed text-apple-tertiary sm:p-9">
            {collection.intro_content}
          </div>
        )}

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {tools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </div>
    </div>
  );
}
