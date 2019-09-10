<template>
    <div class="personal">
        <div style="border-bottom: 1px solid #cccccc;font-size: 18px;">个人信息</div>
        <div class="userinfo">
            <a-row class="user-head" type="flex" justify="center" :gutter="20">
                <a-col :span="6">
                    <a-upload-dragger
                            name="avatar"
                            listType="picture-card"
                            class="avatar-uploader"
                            :showUploadList="false"
                            action="https://sm.ms/api/upload"
                            :beforeUpload="beforeUpload"
                            @change="handleChange"
                            accept="image/*"
                    >
                        <div v-if="user.headUrl != null" class="user-box">
                            <img :src="user.headUrl" alt="avatar"/>
                            <a-button style="margin-top: 5px">上传文件</a-button>
                        </div>
                        <div v-else>
                            <a-icon :type="loading ? 'loading' : 'plus'"/>
                            <div class="ant-upload-text">Upload</div>
                        </div>
                    </a-upload-dragger>
                </a-col>
            </a-row>
            <a-row class="user-name" align="middle" type="flex" justify="center" :gutter="20" style="margin-top: 8.8vh">
                <a-col :span="2" style="text-align: right">用户名:</a-col>
                <a-col :span="6">
                    <a-input placeholder="Basic usage" v-model="user.name" ref="userNameInput">
                        <a-icon slot="prefix" type="user"/>
                    </a-input>
                </a-col>
            </a-row>
            <div style="display: flex;justify-content: center;margin-top: 3vh">
                <a-button type="primary" @click="updateUser">确定修改</a-button>
            </div>
        </div>
    </div>
</template>

<script>
import { getIssue, updateIssue } from '@/api/article'
import { imgUpload, imgDelete } from '@/api/user'
import config from '@/config/defaultSettings'

export default {
  name: 'Personal',
  data () {
    return {
      user: {},
      loading: false,
      issue: {}
    }
  },
  methods: {
    /**
     * 修改用户信息
     */
    updateUser () {
      updateIssue({
        articleId: this.issue.number,
        body: JSON.stringify(this.user),
        labels: [config.userInfoLabel]
      }).then(updateRes => {
        this.$message.success('用户信息修改成功')
        this.$store.commit('setName', this.user.name)
      })
    },
    /**
     * 头像上传
     * @param info
     */
    handleChange (info) {
      let formData = new FormData()
      formData.append('smfile', info.file)
      this.$setLoading(true)
      imgUpload(formData)
        .then(imgRes => {
          this.$setLoading(false)
          imgRes.json().then((imgJson) => {
            if (imgJson.success) {
              this.user.headUrl = imgJson.data.url
              // 如果存在上一个头像删除上一个头像
              if (this.user.hash != null) {
                imgDelete(this.user.hash)
              }
              this.user.hash = imgJson.data.hash
              updateIssue({
                articleId: this.issue.number,
                body: JSON.stringify(this.user),
                labels: [config.userInfoLabel]
              }).then(updateRes => {
                this.$message.success('头像上传成功')
                this.$store.commit('setHead', this.user.headUrl)
              })
            } else {
              this.$message.error('头像上传失败,message: ' + imgJson.message)
            }
          })
        })
    },
    acceptUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      if (!isJPG) {
        this.$message.error('You can only upload JPG file!')
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('Image must smaller than 2MB!')
      }
      return isJPG && isLt2M
    },
    beforeUpload () {
      return false
    }
  },
  created () {
    getIssue({
      state: 'open',
      labels: config.userInfoLabel
    }).then(userRes => {
      this.user = JSON.parse(userRes[0].body)
      this.issue = userRes[0]
    })
  }
}
</script>

<style lang="scss">
    $headWH: 200px;
    .personal {
        padding-top: 3vh;
        padding-left: 2vw;
        text-align: left;

        .user-head > div {
            width: $headWH;
            height: $headWH;
            padding: 0 !important;
            /*overflow: hidden;*/
            .ant-upload.ant-upload-drag {
                border-radius: $headWH/2;
            }

            .ant-upload.ant-upload-drag .ant-upload {
                padding: 0 !important;

                img {
                    border-radius: $headWH/2;
                    width: $headWH;
                    height: $headWH;
                }
            }
        }
    }
</style>
