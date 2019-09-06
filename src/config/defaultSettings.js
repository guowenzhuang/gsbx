/**
 * 项目默认配置项
 *
 */
const NODEENV = process.env.NODE_ENV
export default {
  clientId: NODEENV === 'production' ? 'd318e11d5b12bf0417b6' : 'd7b3acf20efed15aaf3e',
  clientSecret: NODEENV === 'production' ? '35d61b835b940179de4d8dc1d3b9541ed4cd55f9' : '3218bbf0edd44432d0b9605237c694d1662a74f0',
  // 仓库所属用户名
  username: 'guowenzhuang',
  // 文章仓库地址
  articleRepo: 'gsbxComment',
  articleLabel: 'article',
  articleMarkdownLabel: 'article-md',
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
