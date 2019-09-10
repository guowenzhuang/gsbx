import config from '@/config/defaultSettings'

const api = {
  getCode: `https://github.com/login/oauth/authorize?client_id=${config.clientId}&scope=public_repo`,
  getToken: 'https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token',
  // getToken: 'https://cors.wenjunjiang.win/?remoteUrl=https://github.com/login/oauth/access_token',
  getActiveUser: 'https://api.github.com/user',
  addIssue: `https://api.github.com/repos/${config.username}/${config.articleRepo}/issues`,
  updateIssue: `https://api.github.com/repos/${config.username}/${config.articleRepo}/issues/`,
  getIssue: `https://api.github.com/repos/${config.username}/${config.articleRepo}/issues`,
  getIssueDetail: `https://api.github.com/repos/${config.username}/${config.articleRepo}/issues/`,
  imgUpload: 'https://sm.ms/api/v2/upload',
  imgDelete: 'https://sm.ms/api/v2/delete/',
  lockIssue: `https://api.github.com/repos/${config.username}/${config.articleRepo}/issues/#{number}/lock`
}
export default api
