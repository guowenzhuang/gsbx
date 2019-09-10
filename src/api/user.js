import api from './index'
import Vue from '@/plugin/axios'

const axios = Vue.axios

export function getToken (parameter) {
  return axios({
    url: api.getToken,
    method: 'post',
    data: parameter
  })
}

export function getActiceUser (parameter) {
  return axios({
    url: api.getActiveUser,
    method: 'get',
    params: parameter
  })
}

export function imgUpload (formData) {
  return fetch(api.imgUpload, {
    method: 'POST',
    body: formData
  })
}

export function imgDelete (hash) {
  return fetch(api.imgDelete + hash, {
    method: 'GET'
  })
}
