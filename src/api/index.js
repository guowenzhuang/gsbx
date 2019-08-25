import config from '@/config/defaultSettings'

const api = {
  getCode: `https://github.com/login/oauth/authorize?client_id=${config.clientId}&scope=public_repo`,
  getToken: 'https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token',
  // getToken: 'https://cors.wenjunjiang.win/?remoteUrl=https://github.com/login/oauth/access_token',
  getActiveUser: 'https://api.github.com/user',
  issueArticle: `https://api.github.com/repos/${config.username}/${config.articleRepo}/issues`,
  getArticle: `https://api.github.com/repos/${config.username}/${config.articleRepo}/issues`
}
export default api
