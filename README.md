模仿 vue-cli 的脚手架

## TODO

- 初始化项目
  - 拉取模板
  - 安装依赖
  - 推送项目到 Github
- 添加模版
- 删除模版

## 项目结构

```bash
├─.vscode
├─bin
│  └─mvc.js     # mvc 全局命令
├─lib
│  ├─promptModules   # 各个模块的交互提示语
│  ├─utils      # 一系列工具函数
│  ├─generator  # 各个功能的模板
│  │  ├─babel   # babel 模板
│  │  ├─linter  # eslint 模板
│  │  ├─router  # vue-router 模板
│  │  ├─vue     # vue 模板
│  │  ├─vuex    # vuex 模板
│  │  └─webpack # webpack 模板
│  ├─create.js  # create 命令处理函数，读取交互命令，注入模版，安装依赖
│  ├─Creator.js # 处理交互提示
│  ├─Generator.js # 渲染模板
│  └─PromptModuleAPI.js # 将各个功能的提示语注入 Creator
└─scripts       # commit message 验证脚本 和项目无关 不需关注
```

### 注入模版

- Generator.js
  - extendPackage() 合并依赖
  - async generate() 生成配置
    - extractConfigFiles() 提取 package.json 中的配置

## 参考链接

- [从零搭建一个 node 脚手架工具](https://segmentfault.com/a/1190000019791588)
