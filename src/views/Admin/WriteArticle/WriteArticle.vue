<template>
    <div class="write-article">
        <div style="border-bottom: 1px solid #cccccc;font-size: 18px;text-align: left">新建文章</div>
        <h2>文章标题</h2>
        <a-input v-model="article.title" style="width: 60%"/>
        <h2 style="margin-top: 3vh">文章内容</h2>
        <mavon-editor codeStyle="tomorrow-night" @change="markChange" v-model="article.markdownbody"/>
        <div style="text-align: left;margin-top: 3vh">
            <a-button type="primary" @click="issueArticle">
                发布文章
            </a-button>
        </div>
    </div>
</template>

<script>
import { addIssue } from '@/api/article'
import config from '@/config/defaultSettings'

export default {
  name: 'WriteArticle',
  data () {
    return {
      article: {
        title: '',
        body: '',
        markdownbody: ''
      }
    }
  },
  methods: {
    issueArticle () {
      if (this.article.title == null || this.article.title === '') {
        this.$message.error('请输入标题')
        return
      }
      if (this.article.markdownbody == null || this.article.markdownbody === '') {
        this.$message.error('请输入内容')
        return
      }
      // 发表文章
      addIssue({
        ...this.article,
        labels: [config.articleLabel]
      }).then(res => {
        // 发表markdown
        addIssue({
          title: this.article.title,
          body: this.article.markdownbody,
          labels: [config.articleMarkdownLabel]
        }).then(mdRes => {
          this.$message.success('发表成功')
        })
      })
    },
    markChange (value, render) {
      this.article.body = render
    }
  }
}
</script>

<style>
    .write-article {
        padding-top: 3vh;
        padding-left: 2vw;
    }
</style>
