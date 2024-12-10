# myvue1

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```
### 更新npm
```sh
npm install -g npm 
```
### 设置镜像源
```sh
npm config set registry https://mirrors.huaweicloud.com/repository/npm/
```
### 启动json-server
```sh
json-server --watch db.json
```
# 在本地仓库中更改文件
 
# 将更改添加到暂存区
git add .
 
# 提交更改，包括一条提交信息
git commit -m "描述您的更改"

# 添加远程仓库地址（将YOUR_USERNAME和YOUR_REPO替换为实际的用户名和仓库名）
git remote add origin git@github.com:lim0098/repo.git
 
# 推送本地仓库到GitHub远程仓库
git push origin master

# 远程仓库取到本地 . 代表当前路径
git clone <远程仓库URL> <本地路径>
git clone git@github.com:lim0098/shenv.git .

环境变量配置
https://blog.csdn.net/weixin_55049839/article/details/140871095