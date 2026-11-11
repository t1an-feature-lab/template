# Next.js

使用 Next.js App Router、TypeScript、PostgreSQL、Tailwind CSS 和 shadcn/ui 的项目模板。

```text
src/
  app/
    api/health/route.ts  数据库健康检查
    globals.css         全局样式与主题
    layout.tsx          根布局
    page.tsx            首页
  components/ui/        shadcn/ui 组件
  lib/
    db.ts               PostgreSQL 连接池
    utils.ts            样式工具函数
components.json         shadcn/ui 配置
compose.yaml            PostgreSQL 本地开发环境
```

## 环境要求

- Node.js 24 或更高版本
- pnpm 10.33.2
- Docker 与 Docker Compose

## 开始开发

```sh
pnpm install
cp .env.example .env
pnpm db:up
pnpm dev
```

访问 `http://localhost:3000`。`GET /api/health` 会检查数据库连接：正常时返回 200，
不可用时返回 503。Next.js 自动读取项目根目录的 `.env` 文件。

## 数据库

`.env.example` 提供本地开发使用的数据库配置。修改账号、数据库名或端口后，
同步更新 `DATABASE_URL`。连接池仅供服务端使用，并在开发热更新时复用。

PostgreSQL 使用 Docker 命名卷保存数据，`pnpm db:down` 会保留数据。
数据库账号与密码在数据卷首次初始化时生效，已有数据卷需通过 SQL 修改。

## 常用命令

| 命令 | 用途 |
| --- | --- |
| `pnpm dev` | 启动开发服务 |
| `pnpm typecheck` | 生成路由类型并检查 TypeScript |
| `pnpm build` | 创建生产构建 |
| `pnpm start` | 启动生产服务 |
| `pnpm db:up` | 启动 PostgreSQL 并等待健康检查通过 |
| `pnpm db:down` | 停止数据库 |
| `pnpm db:logs` | 查看数据库日志 |

## 组件与样式

使用 [shadcn/ui](https://ui.shadcn.com/docs/installation/next) 的 Radix Nova 风格、Neutral 主题和 Tailwind CSS。
组件源码保存在 `src/components/ui`，通过 `@/components/ui` 导入。

添加组件：

```sh
pnpm exec shadcn add input
```

## 部署

配置生产环境的 `DATABASE_URL`，执行 `pnpm build` 后使用 `pnpm start` 启动。
应用和健康检查接口由同一个 Next.js 服务提供。
