<template>
    <div class="article-update">
        <div class="left">
            <div style="border-bottom: 1px solid #cccccc;font-size: 18px;">修改文章</div>
            <div style="margin-top: 3vh">
                <span>选择文章: </span>
                <a-select :defaultValue="activle" style="width: 150px;" @change="changeArticle">
                    <a-select-option :key="item.number" v-for="item in articleAll" :value="item.title">{{item.title}}
                    </a-select-option>
                </a-select>
            </div>
        </div>
        <h2>文章标题</h2>
        <a-input v-model="article.title" style="width: 60%"/>
        <h2 style="margin-top: 3vh">文章内容</h2>
        <mavon-editor codeStyle="tomorrow-night" @change="markChange" v-model="article.markdownbody"/>
        <div style="text-align: left;margin-top: 3vh">
            <a-button type="primary" @click="updateArticle">
                修改文章
            </a-button>
        </div>
    </div>
</template>

<script>
import { getArticle, updateArticle } from '@/api/article'
import config from '@/config/defaultSettings'
import dayjs from 'dayjs'

export default {
  name: 'ArticleUpdate',
  data () {
    return {
      article: {
        title: '',
        body: '',
        markdownbody: ''
      },
      articleAll: [],
      activle: '',
      mdAll: [],
      activeKey: []
    }
  },
  methods: {
    /**
     * 选择当前文章并赋值到文本框里
     */
    changeArticle (value, option) {
      this.activeKey[0] = option.data.key
      this.mdAll.forEach(item => {
        if (item.title === value) {
          this.article.title = item.title
          this.article.markdownbody = item.body
          this.activeKey[1] = item.number
        }
      })
    },
    markChange (value, render) {
      this.article.body = render
    },
    updateArticle () {
      // 修改文章
      updateArticle({
        articleId: this.activeKey[0],
        ...this.article,
        labels: [config.articleLabel]
      }).then(res => {
        // 发表markdown
        updateArticle({
          articleId: this.activeKey[1],
          title: this.article.title,
          body: this.article.markdownbody,
          labels: [config.articleMarkdownLabel]
        }).then(mdRes => {
          this.$message.success('修改成功')
        })
      })
    }
  },
  created () {
    // 获取文章
    getArticle({
      state: 'open',
      labels: config.articleLabel
    }).then(res => {
      res = res.map(item => {
        // 转换时间
        item.created_time = dayjs(item.created_at).format('YYYY-MM-DD HH:mm:ss')
        return item
      })
      this.articleAll = res
    })
    // 获取markdown
    getArticle({
      state: 'open',
      labels: config.articleMarkdownLabel
    }).then(res => {
      res = res.map(item => {
        // 转换时间
        item.created_time = dayjs(item.created_at).format('YYYY-MM-DD HH:mm:ss')
        return item
      })
      this.mdAll = res
    })
  }
}
</script>

<style lang="scss">
    .article-update {
        padding-top: 3vh;
        padding-left: 2vw;

        & > .left {
            text-align: left;

        }
    }
</style>
