<template>
    <div>
        <h1>新建文章</h1>
        <a-form
                @submit="issueArticle"
                :form="articleForm">
            <a-form-item
                    label="文章标题"
                    :label-col="{ span: 5 }"
                    :wrapper-col="{ span: 12 }">
                <a-input
                        v-decorator="[
                        'title',
                        {rules: [{ required: true, message: '请输入文章标题' }]}]"
                />
            </a-form-item>
            <a-form-item
                    label="文章内容"
                    :label-col="{ span: 5 }"
                    :wrapper-col="{ span: 12 }">
                <a-textarea
                        :rows="4"
                        v-decorator="[
                        'body',
                        {rules: [{ required: true, message: '请输入文章内容' }]}]"
                />
            </a-form-item>
            <a-form-item
                    :wrapper-col="{ span: 12, offset: 5 }"
            >
                <a-button
                        type="primary"
                        html-type="submit"
                >
                    发布文章
                </a-button>
            </a-form-item>
        </a-form>
    </div>
</template>

<script>
import { issueArticle } from '@/api/article'
import config from '@/config/defaultSettings'

export default {
  name: 'WriteArticle',
  data () {
    return {
      articleForm: this.$form.createForm(this)
    }
  },
  methods: {
    issueArticle (e) {
      e.preventDefault()
      this.articleForm.validateFields((err, values) => {
        if (!err) {
          issueArticle({
            title: values.title,
            body: values.body,
            labels: [config.articleLabel]
          }).then(res => {
            this.$message.success('发表成功')
          })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
