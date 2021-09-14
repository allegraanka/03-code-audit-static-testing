<template>
  <div class="template-blog">
    <div class="template-blog__header">
      <div class="container">
        <div class="row">
          <div class="col xs12 l6">
            <h1>{{ blog.title }}</h1>

            <p v-if="blog.description">
              {{ blog.description }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col xs12">
          <div class="template-blog__grid">
            <article-card
              v-for="(article, index) in articles"
              :key="index"
              :title="article.title"
              :date="article.date"
              :url="article.url"
              :summary="article.summary"
              :image-url="article.imageUrl"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ArticleCard from '~/components/ArticleCard'

export default {
  components: {
    ArticleCard
  },

  async asyncData({ app, error, params }) {
    const blog = await app.$nacelle.blogByHandle(params.handle).catch(() => {
      error({
        statusCode: 404,
        message: 'Blog not found'
      })
    })

    return {
      blog
    }
  },

  computed: {
    /**
     * Returns the transformed list of articles.
     * @returns {Array} - The articles list.
     */
    articles() {
      return this.blog.articles.items.map((item) => ({
        title: item.title,
        date: item.fields.date,
        url: `/blogs/${this.blog.handle}/${item.handle}`,
        imageUrl: item.fields.image?.asset.url,
        summary: item.fields.summary
      }))
    }
  }
}
</script>

<style lang="scss">
.template-blog {
  &__header {
    padding: $LAYOUT_S / 2 0 $LAYOUT_S / 4;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin: $LAYOUT_S 0;
  }

  @include mq($from: large) {
    &__header {
      padding: $LAYOUT_S 0 $LAYOUT_S / 2;
    }

    &__grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }
}
</style>
