export default function Loading() {
  return (
    <div className="container-page py-20">
      <div className="mx-auto flex max-w-md flex-col items-center justify-center py-20">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 animate-pulse rounded-full bg-apple-blue" style={{ animationDelay: "0ms" }} />
          <span className="h-2 w-2 animate-pulse rounded-full bg-apple-blue" style={{ animationDelay: "150ms" }} />
          <span className="h-2 w-2 animate-pulse rounded-full bg-apple-blue" style={{ animationDelay: "300ms" }} />
        </div>
        <p className="mt-4 text-[14px] text-apple-quaternary">加载中...</p>
      </div>
    </div>
  );
}
