<template>
  <div class="search-overlay" :class="{ 'search-overlay--no-query': !query }">
    <ais-instant-search
      :search-client="searchClient"
      :index-name="resultsIndex"
    >
      <ais-configure :hits-per-page.camel="3" :query="query" />

      <div class="container">
        <div class="row no-margin-bottom">
          <div class="col xs12 l3 push-l1">
            <div>
              <div class="search-overlay__suggestions">
                <span class="search-overlay__subtitle label">
                  {{ suggestionsSubtitle }}
                </span>

                <ais-index :index-name="suggestionsIndex">
                  <ais-configure :hits-per-page.camel="5" :query="query" />

                  <ais-autocomplete>
                    <template #default="{ indices }">
                      <p
                        v-if="indicesToSuggestions(indices).length <= 0"
                        class="search-overlay__no-results body-2"
                      >
                        {{ $t('searchOverlay.noSuggestions') }}
                      </p>

                      <nuxt-link
                        v-for="suggestion in indicesToSuggestions(indices)"
                        :key="suggestion.query"
                        :to="getQueryPath(suggestion.query)"
                        class="search-overlay__suggestion body-1"
                      >
                        <ais-highlight
                          attribute="query"
                          :hit="suggestion"
                          highlighted-tag-name="strong"
                        />
                      </nuxt-link>
                    </template>
                  </ais-autocomplete>
                </ais-index>
              </div>

              <ais-refinement-list
                v-if="query"
                class="search-overlay__suggestions"
                attribute="vendor"
                :limit="3"
              >
                <template #default="{ items }">
                  <div v-show="items.length > 0">
                    <span class="search-overlay__subtitle label">
                      {{ $t('searchOverlay.brands') }}
                    </span>

                    <a
                      v-for="item in items"
                      :key="item.value"
                      class="search-overlay__suggestion body-1"
                      :href="`/search?shopify_products[refinementList][vendor][0]=${item.value}`"
                    >
                      {{ item.label }}
                    </a>
                  </div>
                </template>
              </ais-refinement-list>
            </div>

            <ais-stats>
              <template #default="{ nbHits }">
                <div
                  v-show="query && nbHits > 0"
                  class="
                    search-overlay__view-all search-overlay__view-all--desktop
                  "
                >
                  <app-button :url="getQueryPath()">
                    {{
                      $tc('searchOverlay.viewAllResults', 1, { count: nbHits })
                    }}
                  </app-button>
                </div>
              </template>
            </ais-stats>
          </div>

          <div class="col xs12 l6 push-l2">
            <div class="search-overlay__results">
              <span class="search-overlay__subtitle label">
                {{ resultsSubtitle }}
              </span>

              <ais-hits>
                <template #default="{ items }">
                  <p
                    v-if="items.length <= 0"
                    class="search-overlay__no-results body-2"
                  >
                    {{ $t('searchOverlay.noResults') }}
                  </p>

                  <template v-else>
                    <div class="search-overlay__grid">
                      <product-card
                        v-for="(item, index) in items"
                        :key="`${item.handle}-${index}`"
                        :title="item.title"
                        :handle="item.handle"
                        :vendor="item.vendor"
                        :thumbnail-src="item.image"
                        :price="item.price"
                        :compare-at="item.compare_at_price"
                        mobile
                      />
                    </div>

                    <ais-stats>
                      <template #default="{ nbHits }">
                        <div
                          v-show="query && nbHits > 0"
                          class="
                            search-overlay__view-all
                            search-overlay__view-all--mobile
                          "
                        >
                          <app-button :url="getQueryPath()" block>
                            {{
                              $tc('searchOverlay.viewAllResults', 1, {
                                count: nbHits
                              })
                            }}
                          </app-button>
                        </div>
                      </template>
                    </ais-stats>
                  </template>
                </template>
              </ais-hits>
            </div>
          </div>
        </div>
      </div>
    </ais-instant-search>
  </div>
</template>

<script>
import algoliasearch from 'algoliasearch/lite'

import AppButton from '~/components/AppButton'
import ProductCard from '~/components/ProductCard'

import { prefix } from '~/plugins/algolia'

export default {
  components: {
    AppButton,
    ProductCard
  },

  props: {
    query: {
      type: String,
      default: ''
    },

    searchRequested: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      searchClient: algoliasearch(
        'LMMQ6OH1AA',
        'bb658e261329f9b76566b5f6feb43455'
      ),
      resultsIndex: prefix,
      suggestionsIndex: 'Pavers Suggestions'
    }
  },

  computed: {
    /**
     * Returns the dynamic subtitle for the suggestions.
     * @returns {string} - The subtitle.
     */
    suggestionsSubtitle() {
      return this.query
        ? this.$t('searchOverlay.suggestionsSubtitle.withQuery')
        : this.$t('searchOverlay.suggestionsSubtitle.withoutQuery')
    },

    /**
     * Returns the dynamic subtitle for the results.
     * @returns {string} - The subtitle.
     */
    resultsSubtitle() {
      return this.query
        ? this.$t('searchOverlay.resultsSubtitle.withQuery')
        : this.$t('searchOverlay.resultsSubtitle.withoutQuery')
    }
  },

  watch: {
    /**
     * Watches for a search request.
     * - Submits search if true.
     *
     * @param {boolean} value - The current value.
     */
    searchRequested(value) {
      if (value) {
        this.submitSearch()
      }
    }
  },

  methods: {
    /**
     * Returns the base query path.
     * @param {string} query - The query to override.
     * @returns {string} - The path to the search results page.
     */
    getQueryPath(query) {
      return query || this.query
        ? `/search?query=${query || this.query}`
        : '/search'
    },

    /**
     * Transforms a set of indices into query suggestions.
     *
     * @param {Array} indices - The list of indices.
     * @returns {Array} - The query suggestions.
     */
    indicesToSuggestions(indices) {
      return indices.reduce(
        (accumulator, current) => [...accumulator, ...current.results.hits],
        []
      )
    },

    /**
     * Submits the search event.
     */
    submitSearch() {
      this.$router.push(this.getQueryPath())
    }
  }
}
</script>

<style lang="scss">
.search-overlay {
  $parent: &;
  background-color: $COLOR_BACKGROUND_WHITE;
  padding: ($SPACING_M + $SPACING_XS + $SPACING_3XS) 0;
  width: 100%;

  &__suggestions {
    &:not(:last-of-type) {
      margin-bottom: $SPACING_L;
    }
  }

  &__subtitle {
    display: block;
    margin-bottom: $SPACING_XS;
  }

  &__suggestion,
  a#{&}__suggestion {
    color: $COLOR_TEXT_PRIMARY;
    display: block;
    text-decoration: none;

    &:not(:last-of-type) {
      margin-bottom: ($SPACING_XS + $SPACING_3XS);
    }
  }

  &__no-results {
    color: $COLOR_TEXT_LIGHT;
  }

  &__view-all {
    margin-top: $SPACING_L;

    &#{&}--desktop {
      display: none;
    }
  }

  .button {
    text-decoration: none;
    text-transform: uppercase;
  }

  @include mq($until: large) {
    &__grid {
      .product-card {
        &:not(:last-of-type) {
          margin-bottom: $SPACING_S;
        }
      }
    }

    &__results {
      margin-top: $SPACING_L;
    }

    &#{&}--no-query {
      #{$parent}__results {
        display: none;
      }
    }
  }

  @include mq($from: large) {
    /* prettier-ignore */
    background: linear-gradient(to right, $COLOR_BACKGROUND_LIGHT 36.889%, $COLOR_BACKGROUND_WHITE 0);
    padding: $SPACING_3XL 0 ($LAYOUT_M + $SPACING_2XS + $SPACING_3XS) 0;
    position: relative;

    &__subtitle {
      margin-bottom: $SPACING_S;
    }

    &__suggestions {
      max-width: 90%;

      &:not(:last-of-type) {
        margin-bottom: $SPACING_2XL;
      }
    }

    &__grid {
      column-gap: $SPACING_M;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      margin-bottom: 0;
    }

    &__view-all {
      &#{&}--mobile {
        display: none;
      }

      &#{&}--desktop {
        display: block;
        margin-top: $SPACING_2XL;
        max-width: 90%;
      }
    }
  }

  @include mq($from: wide) {
    /* prettier-ignore */
    background: linear-gradient(to right, $COLOR_BACKGROUND_LIGHT 38.889%, $COLOR_BACKGROUND_WHITE 0);
  }
}
</style>
