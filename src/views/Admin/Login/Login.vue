<template>
    <div class="admin-login">
        <div>
            <div>
                <h2>
                    <icon name="gsbx-Artboard" style="font-size: 50px;"/>
                    GSBX博客后台管理登录
                </h2>
                <p style="font-size: 14px">一个不用服务器的开源博客</p>
            </div>
            <div class="logo-div" @click="login">
                <div style="font-size: 16px;">点击登录</div>
                <icon name="gsbx-github" style="font-size: 50px;margin-top: 10px"/>
            </div>
        </div>
    </div>
</template>

<script>
import api from '@/api'
import { getToken, getActiceUser } from '@/api/user'
import config from '@/config/defaultSettings'
import Cookie from 'js-cookie'

export default {
  name: 'Login',
  data () {
    return {}
  },
  methods: {
    login () {
      location.href = api.getCode
    }
  },
  created () {
    // 查询是否有token
    if (Cookie.get('token') == null || Cookie.get('token') === '') {
      const codes = window.location.href.match(/code=(\S*)#/)

      if (codes == null || codes === '') {
        return
      }
      const code = codes[1]
      getToken({
        client_id: config.clientId,
        client_secret: config.clientSecret,
        code: code
      }).then(res => {
        let token = null
        if (api.getToken === 'https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token') {
          token = res.split('=')[1].split('&')[0]
          if (token === 'bad_verification_code') {
            alert('登录失败')
            return
          }
        } else {
          token = res.access_token
        }
        console.log(token, res)
        getActiceUser({
          access_token: token
        }).then(userRes => {
          sessionStorage.setItem('loginname', userRes.login)
          sessionStorage.setItem('name', userRes.name)
          // Cookie保存token
          Cookie.set('token', token)
          this.$router.push('/admin/home')
        })
      })
    } else {
      this.$router.push('/admin/home')
    }
  }
}
</script>
<style scoped lang="scss">
    .admin-login {
        background-size: cover;
        width: 100vw;
        padding-top: 15vh;
        background: url("/gsbx/img/logobg.svg") no-repeat;
        display: flex;
        flex-direction: column;
        align-items: center;

        .logo-div {
            margin-top: 3vh;
            border: 1px solid #1890FF;
            cursor: pointer;
        }
    }
</style>
