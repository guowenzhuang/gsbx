<template>
    <div class="home">
        <div class="top">
            <div class="content-front">
                <div class="content-title">无服务器博客</div>
                <div class="content-body">
                    <div>无服务器实现的带后台管理的博客</div>
                </div>
                <div class="arrow-down" @click="scrollBody">
                    <svg class="header__down" id="headerDown" viewBox="0 0 32 32" width="100%" height="100%">
                        <path d="M15.992 25.304c-0 0-0 0-0.001 0-0.516 0-0.981-0.216-1.31-0.563l-0.001-0.001-14.187-14.996c-0.306-0.323-0.494-0.76-0.494-1.241 0-0.998 0.809-1.807 1.807-1.807 0.517 0 0.983 0.217 1.313 0.565l0.001 0.001 12.875 13.612 12.886-13.612c0.331-0.348 0.797-0.565 1.314-0.565 0.481 0 0.918 0.187 1.242 0.493l-0.001-0.001c0.723 0.687 0.755 1.832 0.072 2.555l-14.201 14.996c-0.33 0.348-0.795 0.564-1.311 0.564-0.001 0-0.003 0-0.004 0h0z"></path>
                    </svg>
                </div>
            </div>
            <canvas id="canvas"></canvas>
        </div>
        <div class="articles-body">
            <a-list :dataSource="article"
                    itemLayout="vertical"
                    size="large">
                <a-list-item slot="renderItem" slot-scope="item">
                    <a-list-item-meta>
                        <h2 slot="title" class="article-title">
                            <a href="javascript:void(0)" @click="toArticleDetail(item)">{{item.title}}</a>
                        </h2>
                        <p slot="description" v-html="item.desc"></p>
                    </a-list-item-meta>
                    <div class="footer">
                        <span>{{item.user.login}}</span>
                        <time>{{item.created_time}}</time>
                    </div>
                </a-list-item>
            </a-list>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { getIssue } from '@/api/article'
import config from '@/config/defaultSettings'
import dayjs from 'dayjs'

export default {
  name: 'home',
  data () {
    return {
      article: []
    }
  },
  computed: {
    ...mapState({
      userinfo: state => state.userinfo
    })
  },
  methods: {
    /**
     * 跳转到文章详情页
     */
    toArticleDetail (item) {
      this.$router.push({
        path: '/articleDetail',
        query: {
          articleId: item.number
        }
      })
    },
    /**
     * 滚动到内容区域
     */
    scrollBody () {
      this.scrollAnimation(0, window.innerHeight)
    },
    /**
     * 滚动到指定区域
     */
    scrollAnimation (currentY, targetY) {
      // 获取当前位置方法
      // const currentY = document.documentElement.scrollTop || document.body.scrollTop
      // 计算需要移动的距离
      let needScrollTop = targetY - currentY
      let _currentY = currentY
      setTimeout(() => {
        // 一次调用滑动帧数，每次调用会不一样
        const dist = Math.ceil(needScrollTop / 10)
        _currentY += dist
        window.scrollTo(_currentY, currentY)
        // 如果移动幅度小于十个像素，直接移动，否则递归调用，实现动画效果
        if (needScrollTop > 10 || needScrollTop < -10) {
          this.scrollAnimation(_currentY, targetY)
        } else {
          window.scrollTo(_currentY, targetY)
        }
      }, 1)
    },
    airplaneInit () {
      const canvas = document.getElementById('canvas')
      var ctx = canvas.getContext('2d')
      var width = canvas.width = window.innerWidth - 20
      var height = canvas.height = window.innerHeight
      var particleCount = 100
      var particles = []

      function init () {
        for (var i = 0; i < particleCount; i++) {
          createParticle()
        }
      }

      function createParticle () {
        var newParticle = new Particle()
        newParticle.initialize()
        particles.push(newParticle)
      }

      function Particle () {
        this.initialize = function () {
          this.x = Math.random() * width
          this.y = Math.random() * height + height
          this.v = 5 + Math.random() * 5
          this.s = 5 + Math.random() * 5
        }

        this.update = function () {
          this.x += Math.sin(this.s)
          this.s -= 0.1
          this.y -= this.v * 0.5
          if (this.isOutOfBounds()) {
            this.initialize()
          }
        }

        this.draw = function () {
          ctx.fillRect(this.x, this.y, this.s, this.s)
          ctx.fillStyle = 'rgba(255,255,255,.5)'
          ctx.fill()
        }

        this.isOutOfBounds = function () {
          return ((this.x < 0) || (this.x > width) || (this.y < 0) || (this.y > height))
        }
      }

      function render () {
        ctx.clearRect(0, 0, width, height)
        for (var i = 0; i < particles.length; i++) {
          particles[i].update()
          particles[i].draw()
        }
        requestAnimationFrame(render)
      }

      window.addEventListener('resize', resize)

      function resize () {
        width = canvas.width = window.innerWidth - 20
        height = canvas.height = window.innerHeight
      }

      init()
      render()
    }
  },
  created () {
    getIssue({
      state: 'open',
      labels: config.articleLabel
    }).then(res => {
      res = res.map(item => {
        // 转换显示内容
        let oDiv = document.createElement('div')
        oDiv.innerHTML = item.body
        item.desc = oDiv.innerText
        // 转换时间
        item.created_time = dayjs(item.created_at).format('YYYY-MM-DD HH:mm:ss')
        return item
      })
      this.article = res
    })
  },
  mounted () {
    // 加载冒泡
    this.airplaneInit()
  }
}
</script>
<style lang="scss">
    $topHeight: 100vh;
    .top {
        width: 100%;
        height: $topHeight;
        background: url('/gsbx/img/xue.jpg') no-repeat;
        background-size: cover;

        #canvas {
            position: absolute;
            left: 0;
            top: 0;
        }

        .content-front {
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            position: relative;
            z-index: 1;

            .content-title {
                font-size: 38px;
                color: white;
                cursor: pointer;
            }

            .content-body {
                & > div {
                    font-size: 20px;
                    color: #cccccc;
                }
            }

            .header__down {
                animation: bounce 4s 2s infinite;
                height: 34px;
                width: 34px;
                position: absolute;
                bottom: 10px;
                cursor: pointer;
                color: rgba(255, 255, 255, 0.8);

                &:hover {
                    color: #fff;
                }
            }

            svg {
                fill: currentColor;
                display: inline-block;
                stroke-width: 0;
                stroke: currentColor;
            }

        }
    }

    .articles-body {
        margin-top: 5vh;
        width: 100%;
        margin-bottom: 20vh;

        & > div {
            width: 60%;
            margin: 0 auto;
            box-shadow: 8px 14px 38px rgba(39, 44, 49, 0.06), 1px 3px 8px rgba(39, 44, 49, 0.03);
            background-color: rgba(255, 255, 255, 0.9);
            border-radius: 5px;
            color: #738a94;
            @media screen and (max-width: 1000px) {
                & {
                    width: 100%;
                    margin: 0 0;
                }
            }
        }

        .ant-list-item {
            padding: 20px 18px;
            text-align: left;

            .article-title {
                font-weight: bold;
                font-size: 24px;
                line-height: 24px;

                & a {
                    color: rgba(21, 23, 26, 0.8);
                }
            }

            .ant-list-item-meta-description {
                color: rgba(21, 23, 26, 0.8);

                p {
                    width: 100%;
                    overflow: hidden;
                    display: -webkit-box;
                    text-overflow: ellipsis;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;

                    @media screen and (max-width: 1000px) {
                        & {
                            width: 90vw;
                        }
                    }
                }
            }

            .footer {
                display: flex;
                justify-content: space-between;
            }
        }
    }
</style>
