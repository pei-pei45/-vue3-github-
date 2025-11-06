<<<<<<< HEAD

# 🔍 GitHub User Finder

A modern, feature-rich Vue 3 application for searching and exploring GitHub users and their repositories.

基于 Vue 3 实现的 GitHub 用户搜索应用，支持查看用户信息和仓库展示。

## ✨ Features / 功能特性

### 🎯 Core Features / 核心功能

- **User Search / 用户搜索**: Search for any GitHub user by username / 通过用户名搜索任何 GitHub 用户
- **User Profile / 用户资料**: View detailed user information including bio, location, company, and website / 查看详细的用户信息，包括简介、位置、公司和网站
- **Repository List / 仓库列表**: Browse user's top repositories sorted by recent updates / 浏览用户的热门仓库，按最近更新排序
- **Statistics / 统计数据**: View follower count, following, repositories, and gists / 查看关注者数量、关注数、仓库数和 Gists

### 🚀 Advanced Features / 高级功能

- **Dark Mode / 暗黑模式**: Toggle between light and dark themes with persistent preference / 在亮色和暗色主题之间切换，保存偏好设置
- **Search History / 搜索历史**: Quick access to recently searched users (stores last 5) / 快速访问最近搜索的用户（保存最近 5 个）
- **Request Caching / 请求缓存**: Faster subsequent searches with in-memory caching / 通过内存缓存加快后续搜索速度
- **Loading States / 加载状态**: Smooth loading animations and skeleton screens / 流畅的加载动画和骨架屏
- **Error Handling / 错误处理**: User-friendly error messages with retry options / 用户友好的错误消息和重试选项
- **Responsive Design / 响应式设计**: Fully responsive layout for all screen sizes / 适配所有屏幕尺寸的完全响应式布局
- **Accessibility / 无障碍访问**: ARIA labels and semantic HTML for better accessibility / ARIA 标签和语义化 HTML，提供更好的可访问性

### 💡 User Experience / 用户体验

- **Copy Username / 复制用户名**: One-click copy to clipboard / 一键复制到剪贴板
- **Share Profile / 分享资料**: Native share API support with fallback / 原生分享 API 支持，带降级方案
- **Keyboard Shortcuts / 键盘快捷键**: Press Enter to search quickly / 按 Enter 键快速搜索
- **Clear Search / 清除搜索**: Quick clear button in search input / 搜索输入框中的快速清除按钮
- **External Links / 外部链接**: All GitHub links open in new tabs / 所有 GitHub 链接在新标签页中打开
- **Smooth Animations / 流畅动画**: Fade-in effects and hover transitions / 淡入效果和悬停过渡

## 🛠️ Tech Stack / 技术栈

- **Vue 3**: Composition API with `<script setup>`
- **Vue Router 4**: Client-side routing / 客户端路由
- **Axios**: HTTP client for GitHub API / GitHub API 的 HTTP 客户端
- **CSS Variables**: Theme system with dark mode support / 支持暗黑模式的主题系统
- **LocalStorage**: Persistent theme and search history / 持久化主题和搜索历史

## 📦 Installation / 安装

```bash
# Install dependencies / 安装依赖
npm install

# Run development server / 运行开发服务器
npm run serve

# Build for production / 生产环境构建
npm run build

# Lint and fix files / 代码检查和修复
npm run lint
```

## 🎨 Optimizations Implemented / 已实现的优化

### Code Quality / 代码质量

- ✅ Fixed component naming (UserInformtion → UserInformation) / 修复组件命名
- ✅ Removed unused Vuex store / 移除未使用的 Vuex store
- ✅ Cleaned up router configuration / 清理路由配置
- ✅ Removed dead code and unused imports / 移除无用代码和未使用的导入
- ✅ Added proper error handling / 添加适当的错误处理

### Performance / 性能

- ✅ Request caching to reduce API calls / 请求缓存以减少 API 调用
- ✅ Optimized component rendering / 优化组件渲染
- ✅ Efficient state management with Composition API / 使用 Composition API 进行高效的状态管理
- ✅ Lazy loading ready structure / 支持懒加载的结构

### UI/UX / 用户界面/用户体验

- ✅ Modern design with CSS variables / 使用 CSS 变量的现代设计
- ✅ Dark mode with theme persistence / 支持主题持久化的暗黑模式
- ✅ Responsive layout for all devices / 适配所有设备的响应式布局
- ✅ Loading states and skeleton screens / 加载状态和骨架屏
- ✅ Smooth animations and transitions / 流畅的动画和过渡效果
- ✅ Better empty states and error messages / 更好的空状态和错误消息

### Accessibility / 无障碍访问

- ✅ Semantic HTML elements / 语义化 HTML 元素
- ✅ ARIA labels for interactive elements / 交互元素的 ARIA 标签
- ✅ Keyboard navigation support / 键盘导航支持
- ✅ Focus states for all interactive elements / 所有交互元素的焦点状态

## 🌐 API

This application uses the [GitHub REST API v3](https://docs.github.com/en/rest) to fetch user data and repositories.

本应用使用 [GitHub REST API v3](https://docs.github.com/en/rest) 获取用户数据和仓库信息。

**Note / 注意**: The GitHub API has rate limits for unauthenticated requests (60 requests per hour per IP).
GitHub API 对未经身份验证的请求有速率限制（每小时每 IP 60 个请求）。

## 📱 Browser Support / 浏览器支持

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License / 许可证

This project is open source and available under the MIT License.

本项目是开源的，使用 MIT 许可证。

## 🤝 Contributing / 贡献

Contributions, issues, and feature requests are welcome!

欢迎贡献、提出问题和功能请求！

## 👨‍💻 Author / 作者

Built with using Vue 3

使用 Vue 3-cil 构建

---

### Customize configuration / 自定义配置

See [Configuration Reference](https://cli.vuejs.org/config/).

> > > > > > > b24b5ffcbad6db655e0cd224316a2eccc9fb24d4
