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
        <a-row class="body">
            <a-col :span="4" class="direct">
                <ul>
                    <li
                            v-for="item in directorys"
                            :key="item.a_id"
                            :style="{marginLeft :((item.level-1)*12)+'px' }">

                        <a :href="'#'+item.a_id">{{item.text}}</a>
                    </li>
                </ul>
            </a-col>
            <a-col :span="16" class="markdown-body" v-directory="{setDirectorys,directorys}"
                   v-html="article.body"/>
        </a-row>
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
      },
      directorys: []
    }
  },
  computed: {
    ...mapState({
      userinfo: state => state.userinfo
    })
  },
  methods: {
    setDirectorys (directorys) {
      this.directorys = directorys
      console.log(this.directorys)
    }
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
            .body {
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
            display: flex;
            .direct{
                position: fixed;
                top: 15vh;
                overflow: auto;
            }
            .markdown-body{
                margin-left: 16.66666667%;
            }
        }

    }

</style>
