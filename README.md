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
.
├── bin
│   └── mvc.js # mvc 全局命令
├── lib
│   ├── ConfigTransform.js
│   ├── Creator.js # 交互提示
│   ├── Generator.js # 渲染模板
│   ├── PromptModuleApi.js # 将各个功能的提示语注入 Creator
│   ├── create.js # create 命令处理函数，读取交互命令，注入模版，安装依赖
│   ├── generator # 各个功能的模板
│   │   ├── babel
│   │   ├── linter
│   │   ├── router
│   │   ├── vue
│   │   ├── vuex
│   │   └── webpack
│   ├── promptModules # 各个功能的交互提示语
│   │   ├── babel.js
│   │   ├── linter.js
│   │   ├── router.js
│   │   └── vuex.js
│   └── utils
│       ├── clearConsole.js
│       ├── codemods
│       ├── configTransforms.js
│       ├── executeCommand.js
│       ├── logger.js
│       ├── normalizeFilePaths.js
│       ├── options.js
│       ├── rcPath.js
│       ├── sortObject.js
│       ├── stringifyJS.js
│       └── writeFileTree.js
├── package-lock.json
├── package.json
├── scripts # commit message 验证脚本 和项目无关 不需关注
│   └── verify-commit.js
├── yarn-error.log
└── yarn.lock
```

### 注入模版

- Generator.js
  - extendPackage() 合并依赖
  - async generate() 生成配置
    - extractConfigFiles() 提取 package.json 中的配置
    - resolveFiles() 解析 lib\generator\xx\template 中的文件
    - sortPkg() 依赖排序
    - writeFileTree() 写入文件

## TODO

- [ ] script 脚本被覆盖
- [ ] 安装依赖，无法显示 loading

## 参考链接

- [从零搭建一个 node 脚手架工具](https://segmentfault.com/a/1190000019791588)
