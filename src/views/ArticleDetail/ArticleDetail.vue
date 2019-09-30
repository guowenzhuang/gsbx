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

            <div class="right_list">

                <a-col :span="4" class="direct" ref="direct">
                    <h2 style="margin-bottom: 1px;">目录：</h2>
                    <ul>

                        <li
                                v-for="item in directorys"
                                :class='"ml"+item.level'
                                :key="item.a_id"
                                :style="{marginLeft :((item.level-1)*12)+'px' }">

                            <a :href="'#'+item.a_id">{{item.text}}</a>
                        </li>
                    </ul>

                </a-col>
            </div>
            <a-col :span="16" class="markdown-body" v-directory="{setDirectorys,directorys}"
                   v-html="article.body"/>

        </a-row>
        <button class="button_list" ref="button_list" v-on:click="showDirectory">三</button>
        <a-drawer
                title="目录"
                placement="right"
                :closable="false"
                :visible="directoryVisible"
                @close="directoryClose"
        >
            <div class="direct">
                <ul @click="directoryClose">

                    <li
                            v-for="item in directorys"
                            :class='"ml"+item.level'
                            :key="item.a_id"
                            :style="{marginLeft :((item.level-1)*12)+'px' }">

                        <a :href="'#'+item.a_id">{{item.text}}</a>
                    </li>
                </ul>
            </div>
        </a-drawer>
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
      directorys: [],
      directoryVisible: false
    }
  },
  computed: {
    ...mapState({
      userinfo: state => state.userinfo
    })
  },
  methods: {
    directoryClose () {
      this.directoryVisible = false
    },
    setDirectorys (directorys) {
      this.directorys = directorys
      console.log(this.directorys)
    },
    showDirectory () {
      this.directoryVisible = true
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

        .button_list {
            display: none;
        }

        @media screen and (max-width: 1000px) {
            .direct {
                display: none;
            }
            .button_list {
                display: block;
                position: fixed;
                bottom: 5vh;
                right: 5vw;
                cursor: pointer;
            }
            & {
                padding: 0;
            }
            .body {
                padding-left: 0.8vw !important;

                .markdown-body {
                    margin-left: 0.8vw !important;
                }
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

            .markdown-body {
                margin-left: 16.66666667%;
            }

            .direct {
                margin-left: 80%;
                position: fixed;
                top: 15vh;
                overflow: auto;
                border-left: 1px solid #000;
                padding: 20px 0 20px 5px;
            }
        }

    }

    .direct {
        .ml1 {
            font-size: 18px;
        }

        ul {
            line-height: 30px;
            padding: 20px !important;
            padding-top: 10px !important;
        }

        li {
            list-style: circle;
        }

        a {
            color: #5cadff;

            &:hover {
                color: #ff9900;
                list-style: circle;
            }
        }

    }
</style>
