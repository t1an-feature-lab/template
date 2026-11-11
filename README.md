# React + Go

使用 React、TypeScript、Vite、Tailwind CSS、shadcn/ui 和 Go 的全栈项目模板，数据库为 PostgreSQL。

```text
src/
  App.tsx              前端首页
  main.tsx             React 入口
  index.css            全局样式与主题
  components/ui/       shadcn/ui 组件
  lib/utils.ts         样式工具函数
main.go                Go HTTP 服务与数据库连接池
go.mod                 Go module
components.json        shadcn/ui 配置
compose.yaml           PostgreSQL 本地开发环境
```

## 环境要求

- Go 1.25 或更高版本
- Node.js 24 或更高版本
- pnpm 10.33.2
- Docker 与 Docker Compose

## 开始开发

```sh
pnpm install
go mod download
cp .env.example .env
pnpm db:up
```

在一个终端启动 Go 服务：

```sh
pnpm dev:server
```

在另一个终端启动前端：

```sh
pnpm dev
```

前端默认地址为 `http://localhost:5173`，Go 服务默认为 `http://localhost:8080`。
Vite 将 `/api` 请求代理到 Go 服务。`GET /api/health` 检查数据库连接，
正常时返回 200，数据库不可用时返回 503。

## 环境变量与数据库

Go 服务从项目根目录的 `.env` 读取配置，系统环境变量优先。
`PORT` 控制服务端口，Vite 从同一配置读取开发代理端口。
`DATABASE_URL` 用于 PostgreSQL 连接，仅在 Go 服务端使用。

`.env.example` 中的数据库账号与密码用于本地开发。修改账号、数据库名或端口后，
同步更新 `DATABASE_URL`。
PostgreSQL 使用命名卷保存数据，`pnpm db:down` 会保留数据。
数据库账号与密码在数据卷首次初始化时生效，已有数据卷需通过 SQL 修改。

## 常用命令

| 命令 | 用途 |
| --- | --- |
| `pnpm dev` | 启动前端开发服务 |
| `pnpm dev:server` | 启动 Go 服务 |
| `pnpm typecheck` | 检查前端 TypeScript 类型 |
| `pnpm check:server` | 执行 Go 静态检查 |
| `pnpm build` | 构建前端到 dist |
| `pnpm build:server` | 编译 Go 服务到 bin/server |
| `pnpm preview` | 预览前端构建产物 |
| `pnpm db:up` | 启动 PostgreSQL 并等待健康检查通过 |
| `pnpm db:down` | 停止数据库 |
| `pnpm db:logs` | 查看数据库日志 |

## 组件与样式

使用 [shadcn/ui](https://ui.shadcn.com/docs/installation/vite) 的 Radix Nova 风格、Neutral 主题与 Tailwind CSS。
组件源码位于 `src/components/ui`，导入别名 `@/` 指向 `src/`。

```sh
pnpm exec shadcn add input
```

## 部署

前端构建产物位于 `dist`，使用静态服务器托管，并将 `/api` 反向代理到 Go 服务。
配置生产环境的 `DATABASE_URL` 和 `PORT`，启动 `bin/server`。
