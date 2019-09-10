<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="https://s2.ax1x.com/2019/09/06/nMd7U1.jpg" alt="Project logo"></a>
</p>

<h3 align="center">GSBX个人博客</h3>

---

<p align="center"> 
    一个无需服务器动态个人博客系统
    <br> 
</p>

## 📝 目录

- [介绍](#about)
- [起步](#run)
- [发布到github pages](#fabu)
- [案例](#anlie)
- [图例](#tulie)
- [TODO](#todo)
- [作者](#author)

## 🧐 介绍 <a name = 'about'></a>

GSBX:前端采用vue+antd开发,无须服务器,部署到github pages 只要简单几步就可实现无服务个人博客系统

## 🏁  起步 <a name = 'run'></a>

1. 获取 Client ID和Client Secret 
   
   1) 打开github官网: [https://github.com](https://github.com/)
   
   2) 点开settings-Developer settings-OAuth Apps-New Oauth Apps
   
   3) 按照提示填写,注意Authorization callback URL是回调地址 githubpages地址+/admin/login 
      
      例如 https://guowenzhuang.github.io/gsbx/admin/login
   
   4) 填写完毕后就能获取到 Client ID和Client Secret了

2. 准备个空仓库存数据(注意不要设置为私有哦)

3. 拉取项目
   
   ```java
   git clone https://github.com/guowenzhuang/gsbx.git
   ```

4. 修改项目配置
   
   项目配置在 /gsbx/src/config/defaultSettings.js 
   
   ```javascript
   export default {  
     // github登录必须的clientId和clientSecret 如果本地运行不用动,
     // 如果需要部署到github pages需要分别替换clientId和clientSecret的前一个配置为第一步获取的clientId和client Secret
   
     clientId: NODEENV === 'production' ? 'd318e11d5b12bf0417b6' : 'd7b3acf20efed15aaf3e',
     clientSecret: NODEENV === 'production' ? '35d61b835b940179de4d8dc1d3b9541ed4cd55f9' : '3218bbf0edd44432d0b9605237c694d1662a74f0',
     // 仓库所属用户名(必填) 
     username: 'guowenzhuang',
     // 存放数据仓库地址(必填) 
     articleRepo: 'gsbxComment',
     // 存放文章的标签名
     articleLabel: 'article',
     // 存放文章时的markdown内容标签名
     articleMarkdownLabel: 'article-md',
     // 菜单导航
     adminMenu: [
       {
         title: 'dashboard',
         key: 'dashboard',
         icon: 'pie-chart',
         children: [
           {
             title: '工作台',
             key: 'workbench',
             icon: 'reconciliation'
           }
         ]
       },
       {
         title: '文章管理',
         key: 'article',
         icon: 'book',
         children: [
           {
             title: '写文章',
             key: 'writeArticle',
             icon: 'plus-square'
           },
           {
             title: '修改文章',
             key: 'articleUpdate',
             icon: 'file-text'
           }
         ]
       }
     ]
   }
   ```

5. 启动项目
   
   ```javascript
   1. 安装依赖
   npm install 或者 npm install
   2. 运行
   npm run serve 或者 yarn run serve
   ```
   首页入口: http://localhost:9256/gsbx/
                 
   后台管理入口: http://localhost:9256/gsbx/admin
  

## 🎈 发布到github pages <a name = 'fabu'></a>
1. fork 此仓库

2. 拉取fork后的仓库

3. 修改项目配置里的 clientId和clientSecret

4. 编译项目
   
   ```javascript
   npm run build 或者 yarn run build
   ```
   
5. 放入到fork后的仓库 gh-pages分支下 
   
6. 开启github pages

![NTuMfcojBD2XdGr](https://i.loli.net/2019/09/06/NTuMfcojBD2XdGr.png)

## 🎨 案例 <a name = "anlie"></a>
https://guowenzhuang.github.io/gsbx/

## 🎨 图例 <a name = "tulie"></a>

![6TpwHYKfoRPUd71](https://i.loli.net/2019/09/06/6TpwHYKfoRPUd71.png)

![rbJ8oeSVw3Egnxh](https://i.loli.net/2019/09/06/rbJ8oeSVw3Egnxh.png)

![8A7dLF2OvfSpZJY](https://i.loli.net/2019/09/06/8A7dLF2OvfSpZJY.png)

![eGxI1nNCMR5KZuf](https://i.loli.net/2019/09/06/eGxI1nNCMR5KZuf.png)

## 🚀 TODO <a name = "todo"></a>



## ✍️ 作者 <a name = "author"></a>

[@gwz](https://guowenzhuang.github.io/gsbx/)

微信

![CdqxBRMuFAY614Z](https://i.loli.net/2019/09/06/CdqxBRMuFAY614Z.jpg)
