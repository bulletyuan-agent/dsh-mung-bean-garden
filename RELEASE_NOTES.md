# 豆的一生 v1.0.4

首个可公开安装的 DSH 发行版。

- 黑白手绘 SVG 绿豆养成，包含完整生命周期、多豆繁殖及独立照料。
- 复用 DSH 默认模型与认证生成形态、五官、性格和对话。
- 支持桌面 dsh-app 与 Web；界面和 CSS 已内联打包，通过 DSH Connection 通信。
- 局域网访客入口默认 `http://主机IP:19816/bean/`。
- 存档默认为当前 DSH profile 的 `data/mung-bean-garden/`，与安装路径分离。
- 17 项规则、通信和发行检查通过；实际 tarball 不包含私人路径、存档或聊天。

## 安装

在 DSH「插件 → 发现 → 添加索引源」中添加：

```text
https://raw.githubusercontent.com/bulletyuan-agent/dsh-mung-bean-garden/main/index.json
```

选择「豆的一生」并安装。如果没有「发现」，先启用实验插件「自定义插件市场」。索引固定到此版本的具体 Git 提交。

也可以在 DSH 中请 Agent 安装：

```text
git+https://github.com/bulletyuan-agent/dsh-mung-bean-garden.git#v1.0.4
```

需要 DSH 0.2.1-rc.5 或兼容的更高版本，以及可用的默认模型。源码仓库和索引为社区发布，不代表 DSH 官方。

附件提供预构建 npm 格式压缩包和 SHA-256 校验文件。旧本地版迁移请先备份并同时复制三份 JSON 存档，详见 README。
