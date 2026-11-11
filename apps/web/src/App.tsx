import {Button} from '@astryxdesign/core/Button'
import {Heading} from '@astryxdesign/core/Heading'
import {Text} from '@astryxdesign/core/Text'

export default function App() {
  return (
    <main className="mx-auto flex min-h-svh max-w-3xl flex-col items-start justify-center gap-4 px-6 py-12">
      <Heading level={1}>项目模板</Heading>
      <Text as="p">项目已就绪，可以开始开发。</Text>
      <Button href="/api/health" variant="primary" label="查看服务状态" />
    </main>
  )
}
