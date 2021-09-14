<template>
  <div class="article-card">
    <nuxt-link v-if="imageUrl" class="article-card__thumbnail" :to="url">
      <responsive-image :src="imageUrl" :alt="title" />
    </nuxt-link>

    <nuxt-link v-if="title" :to="url" class="article-card__title h6">
      {{ title }}
    </nuxt-link>

    <p v-if="formattedDate" class="article-card__date caption">
      {{ formattedDate }}
    </p>

    <p v-if="summary" class="body-2">{{ summary }}</p>
  </div>
</template>

<script>
import ResponsiveImage from '~/components/ResponsiveImage'

import { formatDate } from '~/helpers/utils'

export default {
  components: {
    ResponsiveImage
  },

  props: {
    title: {
      type: String,
      default: null
    },

    date: {
      type: String,
      default: null
    },

    summary: {
      type: String,
      default: null
    },

    url: {
      type: String,
      default: '/'
    },

    imageUrl: {
      type: String,
      default: null
    }
  },

  computed: {
    /**
     * Returns the formatted version of the date.
     * @returns {string|null} - The date string.
     */
    formattedDate() {
      return this.date ? formatDate(this.date) : null
    }
  }
}
</script>

<style lang="scss">
.article-card {
  color: $COLOR_TEXT_PRIMARY;

  &__thumbnail {
    display: block;
    margin-bottom: $SPACING_S;
  }

  &__title {
    color: inherit;
    display: block;
    margin-bottom: $SPACING_S;
  }

  &__date {
    margin-bottom: $SPACING_XS;
  }
}
</style>
