# Monorepo

基于 pnpm workspace 的全栈项目模板，前后端均使用 TypeScript。

```text
apps/
  web/       Vite + React + Tailwind CSS + Astryx
  server/    Hono + PostgreSQL
compose.yaml PostgreSQL 本地开发环境
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

前端默认地址为 `http://localhost:5173`，服务端为 `http://localhost:3000`。
前端开发环境将 `/api` 代理到服务端，`GET /api/health` 会检查数据库连接。

`.env` 中的数据库账号与密码用于本地开发。修改数据库账号、数据库名或端口后，
同步更新 `DATABASE_URL`。PostgreSQL 使用命名卷保存数据，`pnpm db:down` 会保留数据。
数据库账号与密码在数据卷首次初始化时生效，已有数据卷需通过 SQL 修改。

## 常用命令

| 命令 | 用途 |
| --- | --- |
| `pnpm dev` | 同时启动 web 与 server |
| `pnpm --filter web dev` | 单独启动前端 |
| `pnpm --filter server dev` | 单独启动服务端 |
| `pnpm typecheck` | 检查全部 TypeScript 类型 |
| `pnpm build` | 编译前后端，分别输出到各自的 dist 目录 |
| `pnpm --filter server start` | 启动编译后的服务端 |
| `pnpm db:up` | 启动 PostgreSQL 并等待健康检查通过 |
| `pnpm db:down` | 停止数据库 |
| `pnpm db:logs` | 查看数据库日志 |

## 样式与组件

组件使用 [Astryx](https://astryx.atmeta.com/docs/getting-started)，默认采用 Neutral 浅色主题。
组件与主题使用同一版本的预编译产物，组件按独立入口导入。
全局样式按照[官方 Vite + Tailwind 示例](https://github.com/meta/astryx/tree/main/apps/example-vite-tailwind)
声明 CSS 层顺序，并接入 Astryx 的 Tailwind 主题变量。
Core 与主题包需要同步升级，保持版本一致。

## 部署

前端静态文件位于 `apps/web/dist`，服务端入口为 `apps/server/dist/index.js`。
部署时配置 `DATABASE_URL`，并将前端站点的 `/api` 请求反向代理到 server。
