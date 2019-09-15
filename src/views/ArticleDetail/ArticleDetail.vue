<template>
    <div class="article-detail">
        <div class="title">
            <h2 class="article-title">{{article.title}}</h2>
            <div>
                <span>作者: {{article.user.login}}</span>
            </div>
            <div>
                <time class="time">日期: {{article.created_time}}</time>
            </div>
        </div>
        <div class="body">
            <div class="markdown-body" v-html="article.body"></div>
        </div>
    </div>
</template>

<script>
import { getIssueDetail } from '@/api/article'
import dayjs from 'dayjs'
import { mapState } from 'vuex'

export default {
  name: 'ArticleDetail',
  data () {
    return {
      article: {
        user: {}
      }
    }
  },
  computed: {
    ...mapState({
      userinfo: state => state.userinfo
    })
  },
  created () {
    getIssueDetail(this.$route.query.articleId)
      .then(articleRes => {
        articleRes.created_time = dayjs(articleRes.created_at).format('YYYY-MM-DD HH:mm:ss')
        this.article = articleRes
      })
  }
}
</script>

<style scoped lang="scss">
    .article-detail {
        padding: 3vh 6vh;
        text-align: left;
        @media screen and (max-width: 1000px) {
            & {
                padding: 0;
            }
            .body{
                padding-left: 0.8vw !important;
            }
        }

        .title {
            text-align: center;

            .article-title {
                font-weight: bold;
                font-size: 28px;
                line-height: 28px;
            }

            .time {
                font-size: 12px;
                color: #738a94;
            }
        }

        .body {
            width: 100%;
            overflow: hidden;
            margin: 0 auto;
        }

    }

</style>
