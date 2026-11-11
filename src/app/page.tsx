import {Button} from '@/components/ui/button'

export default function Home() {
  return (
    <main className="mx-auto flex min-h-svh max-w-3xl flex-col items-start justify-center gap-4 px-6 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">项目模板</h1>
      <p className="text-muted-foreground">项目已就绪，可以开始开发。</p>
      <Button asChild>
        <a href="/api/health">查看服务状态</a>
      </Button>
    </main>
  )
}
