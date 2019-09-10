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
import { getIssue, addIssue } from '@/api/article'
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
      const code = this.$route.query.code

      if (code == null || code === '') {
        return
      }
      getToken({
        client_id: config.clientId,
        client_secret: config.clientSecret,
        code: code
      }).then(res => {
        let token = null
        if (api.getToken === 'https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token') {
          token = res.split('=')[1].split('&')[0]
          if (token === 'bad_verification_code') {
            this.$message.error('登录失败')
            return
          }
        } else {
          token = res.access_token
        }
        // Cookie保存token
        Cookie.set('token', token)
        // 获取用户信息
        getIssue({
          state: 'open',
          labels: config.userInfoLabel
        }).then(userRes => {
          // 没有用户信息
          if (userRes.length === 0) {
            getActiceUser({
              access_token: token
            }).then(userRes => {
              if (userRes.login !== config.username) {
                this.$message.error('不是此用户的博客管理系统')
                return
              }

              // 把用户信息存到issue
              let userinfo = {
                loginname: userRes.login,
                name: userRes.name
              }
              addIssue({
                title: '用户个人信息',
                body: JSON.stringify(userinfo),
                labels: [config.userInfoLabel]
              }).then(() => {
                this.$store.commit('setName', userRes.name)
                sessionStorage.setItem('loginname', userRes.login)
                this.$router.push('/admin/home')
              })
            })
          } else {
            const userBody = userRes[0].body
            let userinfo = JSON.parse(userBody)
            sessionStorage.setItem('loginname', userinfo.loginname)
            this.$store.commit('setName', userinfo.name)

            this.$router.push('/admin/home')
          }
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
