<template>
  <div class="template-article">
    <div class="container">
      <div class="row">
        <div class="col xs12">
          <div class="template-article__header">
            <h1 class="template-article__title">{{ article.title }}</h1>
            <p v-if="formattedDate" class="caption">{{ formattedDate }}</p>
          </div>

          <div class="template-articles__body">
            <block-content
              v-if="article.fields.content"
              :content="article.fields.content"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from '~/helpers/utils'

import BlockContent from '~/components/BlockContent'

export default {
  components: {
    BlockContent
  },

  async asyncData({ app, params, error }) {
    const article = await app.$nacelle.articleByParams(params).catch(() => {
      error({
        statusCode: 404,
        message: 'Article not found'
      })
    })

    return {
      article
    }
  },

  computed: {
    /**
     * Returns the formatted version of the date.
     * @returns {string|null} - The date string.
     */
    formattedDate() {
      return this.article.fields.date
        ? formatDate(this.article.fields.date)
        : null
    }
  }
}
</script>

<style lang="scss">
.template-article {
  &__header {
    padding: $LAYOUT_S / 2 0 $LAYOUT_S / 4;
  }

  &__title {
    margin-bottom: $SPACING_S;
  }

  @include mq($from: large) {
    &__header {
      padding: $LAYOUT_S 0 $LAYOUT_S / 2;
    }
  }
}
</style>
