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

          <div class="template-blog__footer">
            <app-button
              v-if="hasMorePages"
              :disabled="pagination.loading"
              @click.native="handleLoadMoreEvent"
              v-text="loadMoreLabel"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getHead } from '~/helpers/metadata'

import AppButton from '~/components/AppButton'
import ArticleCard from '~/components/ArticleCard'

export default {
  components: {
    AppButton,
    ArticleCard
  },

  async asyncData({ app, error, params }) {
    const blog = await app.$nacelle.blogByHandle(params.blog).catch(() => {
      error({
        statusCode: 404,
        message: 'Blog not found'
      })
    })

    return {
      blog
    }
  },

  data() {
    return {
      pagination: {
        current: 1,
        loading: false
      }
    }
  },

  head() {
    return getHead({
      title: this.blog.title,
      description: this.blog.fields.summary
    })
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
    },

    /**
     * Returns if there are more pages.
     * @returns {boolean} - If more pages exist.
     */
    hasMorePages() {
      return this.pagination.current < this.blog.articles.pages
    },

    /**
     * Returns the label of the load more button.
     * @returns {string} - The current label.
     */
    loadMoreLabel() {
      return this.pagination.loading
        ? this.$t('pagination.loading')
        : this.$t('pagination.loadMore')
    }
  },

  methods: {
    /**
     * Loads additional articles into the page.
     * - Injects new articles and updates pagination object.
     */
    handleLoadMoreEvent() {
      this.pagination.loading = true

      if (!this.hasMorePages) {
        return
      }

      this.$nacelle
        .blogArticlesByHandle(
          this.$route.params.blog,
          this.pagination.current + 1
        )
        .then((response) => {
          if (response.length) {
            this.blog.articles.items.push(...response)
          }

          this.pagination.current += 1
          this.pagination.loading = false
        })
    }
  }
}
</script>

<style lang="scss">
.template-blog {
  &__header {
    padding: $LAYOUT_XL / 2 0 $LAYOUT_XL / 4;
  }

  &__grid {
    display: grid;
    gap: $SPACING_XL;
    grid-template-columns: repeat(2, 1fr);
    margin: $LAYOUT_XL 0;
  }

  &__footer {
    display: flex;
    justify-content: center;
    margin-top: $LAYOUT_XL;
    width: 100%;
  }

  @include mq($from: large) {
    &__header {
      padding: $LAYOUT_XL 0 $LAYOUT_XL / 2;
    }

    &__grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }
}
</style>
