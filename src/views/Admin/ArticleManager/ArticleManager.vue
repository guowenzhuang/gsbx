<template>
    <div>
        <h1>我的文章</h1>
        <a-list :dataSource="article">
            <a-list-item slot="renderItem" slot-scope="item, index" style="border: 1px solid cornflowerblue">
                <a-list-item-meta :description="item.body">
                    <a slot="title" href="javascript:void(0)">
                        <span>{{index+1}}-{{item.title}}</span>
                        <span style="float: right">{{item.created_at}}</span>
                    </a>
                </a-list-item-meta>
            </a-list-item>
        </a-list>
    </div>
</template>

<script>
import { getArticle } from '@/api/article'
import config from '@/config/defaultSettings'

export default {
  name: 'ArticleManager',
  data () {
    return {
      article: []
    }
  },
  created () {
    getArticle({
      state: 'open',
      labels: [config.articleLabel]
    }).then(res => {
      this.article = res
    })
  }
}
</script>

<style scoped>

</style>
