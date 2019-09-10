import api from './index'
import Vue from '@/plugin/axios'

const axios = Vue.axios

export function addIssue (parameter) {
  return axios({
    url: api.addIssue,
    method: 'post',
    data: parameter
  })
}

export function updateIssue (parameter) {
  return axios({
    url: api.updateIssue + parameter.articleId,
    method: 'patch',
    data: parameter
  })
}

export function getIssue (parameter) {
  return axios({
    url: api.getIssue,
    method: 'get',
    params: parameter
  })
}

export function getIssueDetail (articleId) {
  return axios({
    url: api.getIssueDetail + articleId,
    method: 'get'
  })
}

export function lockIssue (articleId) {
  let url = api.lockIssue
  url = url.replace('#{number}', articleId)
  return axios({
    url: url,
    method: 'PUT'
  })
}
