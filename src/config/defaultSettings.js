/**
 * 项目默认配置项
 *
 */
export default {
  clientId: 'd7b3acf20efed15aaf3e',
  clientSecret: '3218bbf0edd44432d0b9605237c694d1662a74f0',
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
