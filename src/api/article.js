import api from './index'
import Vue from '@/plugin/axios'

const axios = Vue.axios

export function issueArticle (parameter) {
  return axios({
    url: api.issueArticle,
    method: 'post',
    data: parameter
  })
}

export function updateArticle (parameter) {
  return axios({
    url: api.updateArticle + parameter.articleId,
    method: 'patch',
    data: parameter
  })
}

export function getArticle (parameter) {
  return axios({
    url: api.getArticle,
    method: 'get',
    params: parameter
  })
}

export function getArticleDetail (articleId) {
  return axios({
    url: api.getArticleDetail + articleId,
    method: 'get'
  })
}
