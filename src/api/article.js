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
export function getArticle (parameter) {
  return axios({
    url: api.getArticle,
    method: 'get',
    data: parameter
  })
}
