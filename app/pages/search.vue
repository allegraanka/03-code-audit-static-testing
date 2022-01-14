<template>
  <div class="template-search">
    <div class="container">
      <div class="template-search__hero">
        <div v-if="query">
          <p class="template-search__subtitle">{{ $t('search.title') }}</p>

          <h1 class="template-search__title">
            <q>{{ query }}</q>
          </h1>
        </div>

        <h1 v-else class="template-search__title">
          {{ $t('search.noSearch') }}
        </h1>
      </div>
    </div>

    <listing v-if="query" :query="query" />
  </div>
</template>

<script>
import Listing from '~/components/algolia/Listing'

export default {
  components: {
    Listing
  },

  data() {
    return {
      query: this.$route.query['shopify_pavers_products']?.query ?? false
    }
  }
}
</script>

<style lang="scss">
.template-search {
  &__hero {
    padding: $SPACING_M + $SPACING_2XS 0;
  }

  &__title {
    margin: 0;
  }

  &__subtitle {
    color: $COLOR_TEXT_LIGHT;
    font-size: ms(0);
    margin-bottom: $SPACING_S;
    margin-top: 0;
  }

  @include mq($from: large) {
    &__hero {
      padding: $SPACING_2XL 0;

      &::after {
        background-color: $COLOR_BORDER_LIGHT;
        content: '';
        height: 1px;
        left: 0;
        margin-top: $SPACING_2XL;
        position: absolute;
        width: 100vw;
      }
    }

    &__subtitle {
      font-size: ms(1);
    }
  }
}
</style>
