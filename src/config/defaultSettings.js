/**
 * 项目默认配置项
 *
 */
export default {
  clientId: 'd318e11d5b12bf0417b6',
  clientSecret: '35d61b835b940179de4d8dc1d3b9541ed4cd55f9',
  // 仓库所属用户名
  username: 'guowenzhuang',
  // 文章仓库地址
  articleRepo: 'gsbxComment',
  articleLabel: 'article',
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
          title: '文章管理',
          key: 'articleManager',
          icon: 'file-text'
        }
      ]
    }
  ]
}
