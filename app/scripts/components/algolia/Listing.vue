<template>
  <div class="listing">
    <ais-instant-search
      :search-client="searchClient"
      :routing="routing"
      :index-name="prefix"
    >
      <ais-configure
        :filters="filters"
        :hits-per-page.camel="21"
        :query="query"
      />

      <filter-drawer :attributes="attributes" />

      <ais-infinite-hits :cache="cache" :transform-items="transformItems">
        <template #default="{ items, refineNext, results, isLastPage }">
          <button
            v-show="hasFacets(results)"
            class="listing__filter-toggle"
            @click.prevent="openDrawer({ namespace: 'filter-drawer' })"
          >
            {{ $t('collection.filterToggle') }}
            <icon-caret-right />
          </button>

          <div class="listing__toolbar">
            <div v-show="results.hits.length > 0" class="listing__sort">
              <ais-sort-by :items="sortByOptions">
                <template
                  #default="{ items: sortItems, refine, currentRefinement }"
                >
                  <select @change="({ target }) => refine(target.value)">
                    <option
                      v-for="item in sortItems"
                      :key="item.value"
                      :value="item.value"
                      :selected="currentRefinement === item.value"
                      v-text="item.label"
                    />
                  </select>
                </template>
              </ais-sort-by>
            </div>

            <div class="listing__count">
              {{ $tc('collection.productCount', 1, { count: results.nbHits }) }}
            </div>
          </div>

          <div
            v-if="results.hits.length > 0"
            class="listing__grid-container container"
          >
            <div class="row">
              <div class="col xs12 l3">
                <div class="listing__filter-sidebar">
                  <span class="listing__filter-title label">
                    {{ $t('collection.filterTitle') }}
                  </span>

                  <current-refinements class="listing__current-refinements" />

                  <accordion
                    v-if="hasFacets(results)"
                    class="listing__filter-accordion"
                    :single-open="false"
                  >
                    <template #default="{ handleClick, activeItems }">
                      <accordion-item
                        v-for="attribute in attributes"
                        v-show="facetHasOptions(attribute.name, results)"
                        :id="attribute._key"
                        :key="attribute._key"
                        :label="titleCase(attribute.title)"
                        :is-active="activeItems.includes(attribute._key)"
                        icon="caret"
                        @accordion-control-click="handleClick(attribute._key)"
                      >
                        <attribute
                          :name="attribute.name"
                          :type="attribute.type"
                        />
                      </accordion-item>
                    </template>
                  </accordion>

                  <p v-else class="listing__filter-no-filters body-2">
                    {{ $t('collection.noFacets') }}
                  </p>
                </div>
              </div>

              <div class="col xs12 l9">
                <div class="listing__grid">
                  <lifestyle-block
                    v-if="lifestyle && lifestyle.image"
                    class="listing__lifestyle-block"
                    :image-source="lifestyle.image"
                    :video-source="lifestyle.video"
                    :title="lifestyle.title"
                    :body="lifestyle.body"
                    :button-label="lifestyle.button"
                    :button-link="lifestyle.link"
                  />

                  <product-card
                    v-for="(item, index) in items"
                    :id="item.id"
                    :key="`${item.handle}-${index}`"
                    :title="item.title"
                    :handle="item.handle"
                    :vendor="item.vendor"
                    :thumbnail-src="item.image"
                    :price="
                      manipulatePriceForDiscount(item.price, item, $settings)
                    "
                    :meta="item.meta"
                    :compare-at="item.compare_at_price"
                    :rrp="getProductPricing(item, $nuxt).rrp"
                    :sku="getReviewsSku(item)"
                    :swatches="
                      productData[item.handle] &&
                      getProductSwatches(productData[item.handle])
                    "
                    @click.native="handleItemClick(item.id)"
                  />
                </div>

                <ais-state-results
                  v-if="query && results.hits.length < 1"
                  class="listing__results"
                >
                  <p>
                    {{ $tc('search.results', 1, { query }) }}
                  </p>
                </ais-state-results>

                <ais-stats
                  v-if="results.hits.length > 0"
                  class="listing__footer"
                >
                  <template slot-scope="{ nbHits }">
                    <app-button
                      :disabled="isLastPage"
                      class="listing__load-more"
                      block
                      @click.native.prevent="refineNext"
                    >
                      {{ $t('pagination.loadMore') }}
                    </app-button>

                    <span class="listing__progress">
                      <span
                        :style="{
                          width: `${getProgressPercentage(
                            items.length,
                            nbHits
                          )}%`
                        }"
                      />
                    </span>

                    <span class="listing__progress-count">
                      {{
                        $tc('pagination.showingProducts', 1, {
                          count: items.length,
                          total: nbHits
                        })
                      }}
                    </span>
                  </template>
                </ais-stats>
              </div>
            </div>
          </div>
        </template>
      </ais-infinite-hits>
    </ais-instant-search>
  </div>
</template>

<script>
import Vue from 'vue'
import algoliasearch from 'algoliasearch/lite'
import { simple } from 'instantsearch.js/es/lib/stateMappings'
import { createInfiniteHitsSessionStorageCache } from 'instantsearch.js/es/lib/infiniteHitsCache'
import { mapActions } from 'vuex'

import Accordion from '~/components/Accordion'
import AccordionItem from '~/components/AccordionItem'
import AppButton from '~/components/AppButton'
import Attribute from '~/components/algolia/Attribute'
import CurrentRefinements from '~/components/algolia/CurrentRefinements'
import FilterDrawer from '~/components/FilterDrawer'
import LifestyleBlock from '~/components/LifestyleBlock'
import ProductCard from '~/components/ProductCard'

import IconCaretRight from '@/assets/icons/directional-caret-right.svg?inline'

import { router, prefix } from '~/plugins/algolia'

import {
  facetHasOptions,
  titleCase,
  manipulatePriceForDiscount
} from '~/helpers/utils'
import {
  getReviewsSku,
  getProductPricing,
  getProductSwatches
} from '~/helpers/product'
import timings from '~/helpers/timings'

export default {
  components: {
    Accordion,
    AccordionItem,
    AppButton,
    Attribute,
    CurrentRefinements,
    IconCaretRight,
    FilterDrawer,
    LifestyleBlock,
    ProductCard
  },

  props: {
    lifestyle: {
      type: Object,
      default: () => ({})
    },

    filters: {
      type: String,
      default: ''
    },

    query: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      searchClient: algoliasearch(
        'LMMQ6OH1AA',
        'bb658e261329f9b76566b5f6feb43455'
      ),
      routing: {
        router: router(
          this.$router,
          this.$settings.collection?.filtering?.attributes
        ),
        stateMapping: simple()
      },
      cache: createInfiniteHitsSessionStorageCache(),
      productData: {},
      prefix
    }
  },

  computed: {
    /**
     * Returns the attributes for filtering.
     * @returns {Array} - The attributes list.
     */
    attributes() {
      return this.$settings.collection?.filtering?.attributes
    },

    /**
     * Returns the options for sorting.
     * - Each option is a replica index.
     * @returns {Array} - The sort options.
     */
    sortByOptions() {
      return [
        {
          value: 'shopify_pavers_products',
          label: this.$t('collection.sortOptions.shopify_pavers_products')
        },
        {
          value: 'shopify_pavers_products_title_asc',
          label: this.$t(
            'collection.sortOptions.shopify_pavers_products_title_asc'
          )
        },
        {
          value: 'shopify_pavers_products_title_desc',
          label: this.$t(
            'collection.sortOptions.shopify_pavers_products_title_desc'
          )
        },
        {
          value: 'shopify_pavers_products_price_asc',
          label: this.$t(
            'collection.sortOptions.shopify_pavers_products_price_asc'
          )
        },
        {
          value: 'shopify_pavers_products_price_desc',
          label: this.$t(
            'collection.sortOptions.shopify_pavers_products_price_desc'
          )
        }
      ]
    }
  },

  mounted() {
    if (
      this.$nuxt.context.from &&
      this.$nuxt.context.from.name === 'products-handle'
    ) {
      this.restoreScrollPosition()
    }
  },

  methods: {
    titleCase,
    facetHasOptions,
    getReviewsSku,
    getProductPricing,
    getProductSwatches,
    manipulatePriceForDiscount,

    /**
     * Maps the Vuex actions.
     */
    ...mapActions({
      openDrawer: 'drawers/openDrawer'
    }),

    /**
     * Handles the item click event.
     * - Stores the start page path and the item ID in sessionStorage.
     *
     * @param {number} item - The item identifier.
     */
    handleItemClick(item) {
      if (!this.$nuxt.context.from) {
        return
      }

      sessionStorage.setItem(`scroll:${this.$nuxt.context.from.path}`, item)
    },

    /**
     * Check if the current results state has filters.
     * - Loops through the attributes array and checks if any of the attirbutes
     *   has filter options.
     * @param {object} results - Algolia results object.
     * @returns {boolean} - Whether the current results state has filters.
     */
    hasFacets(results) {
      const hasFacets = this.attributes.some((attribute) => {
        return this.facetHasOptions(attribute.name, results)
      })

      return hasFacets
    },

    /**
     * Using the product stored in storage, keep trying to find the product.
     * - Once found, scroll to the product.
     * - Only search for a maximum of 10 times.
     */
    restoreScrollPosition() {
      let counter = 0

      const scrollInterval = setInterval(() => {
        counter += 1

        const activeProduct = sessionStorage.getItem(
          `scroll:${this.$router.history.current.path}`
        )
        const element = document.getElementById(activeProduct)

        if (element) {
          element.scrollIntoView()
          clearInterval(scrollInterval)
        }

        if (counter >= 10) {
          clearInterval(scrollInterval)
        }
      }, timings.longer)
    },

    /**
     * Handles the Algolia items response.
     * - Does not currently change the item structure.
     * - Uses the items to fetch richer product data.
     *
     * @param {Array} items - The items from Algolia.
     * @returns {Array} - The "transformed" items.
     */
    transformItems(items) {
      const handles = [...items]
        .map(({ handle }) => handle)
        .filter(({ handle }) => !this.productData[handle])

      this.$nacelle.client.data.products({ handles }).then((response) => {
        response.forEach((product) => {
          Vue.set(this.productData, product.handle, product)
        })
      })

      return items
    },

    /**
     * Returns the percentage for the progress bar.
     *
     * @param {number} length - The length of current results.
     * @param {number} total - The total amount of results.
     * @returns {number} - The percentage of progress, rounded.
     */
    getProgressPercentage(length, total) {
      const fraction = (length / total) * 100

      if (fraction < 1) {
        return 1
      }

      return fraction.toFixed(0)
    }
  }
}
</script>

<style lang="scss">
.listing {
  min-height: 200px;

  &__filter-toggle {
    @include button-reset;
    align-items: center;
    background-color: $COLOR_BUTTON;
    color: $COLOR_TEXT_INVERSE;
    display: flex;
    font-size: ms(-1);
    font-weight: $WEIGHT_MEDIUM;
    justify-content: center;
    letter-spacing: $LETTER_SPACING_BUTTON;
    line-height: $LINE_HEIGHT_META;
    padding: ($SPACING_S + $SPACING_3XS) $SPACING_M;
    text-transform: uppercase;
    width: 100%;

    .icon {
      height: 20px;
      margin-left: auto;
      width: 20px;
    }
  }

  &__toolbar {
    border-bottom: 1px solid $COLOR_BORDER_LIGHT;
  }

  &__sort {
    margin-top: $SPACING_S;
  }

  &__count {
    color: $COLOR_TEXT_SECONDARY;
    padding: $SPACING_M 0;
    text-align: center;
  }

  &__filter-sidebar {
    display: none;
    padding-right: $SPACING_XL;
  }

  &__filter-title {
    color: $COLOR_TEXT_LIGHT;
  }

  &__current-refinements {
    margin: $SPACING_L 0 $SPACING_M 0;
  }

  &__filter-accordion {
    .accordion-item__control {
      border-top: 1px solid $COLOR_BORDER_LIGHT;
      padding: ($SPACING_M + $SPACING_3XS) 0;
    }

    .accordion-item__label {
      @extend %body-1;
      color: $COLOR_TEXT_PRIMARY;
      margin-bottom: 0;
    }

    .accordion-item__icon {
      color: $COLOR_PRIMARY;
    }

    .accordion-item__content {
      margin-top: -2px;
      padding-bottom: ($SPACING_M + $SPACING_2XS + $SPACING_3XS);
      padding-top: 0;
    }
  }

  &__filter-no-filters {
    border-top: 1px solid $COLOR_BORDER_LIGHT;
    color: $COLOR_TEXT_SECONDARY;
    padding: ($SPACING_M + $SPACING_3XS) 0;
  }

  &__grid {
    column-gap: $SPACING_XS;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    row-gap: $SPACING_XL;
  }

  &__lifestyle-block {
    grid-column: span 2;
    grid-row: 3;
  }

  &__results {
    margin-top: $SPACING_L;
    text-align: center;
  }

  &__footer {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: $SPACING_XL 0;
    width: 100%;
  }

  &__load-more {
    margin-bottom: $SPACING_L;
  }

  &__progress {
    background-color: rgba($COLOR_PRIMARY, 0.15);
    height: 3px;
    margin-bottom: $SPACING_S;
    max-width: 232px;
    position: relative;
    width: 100%;

    span {
      @include animation-shrink(width);
      background-color: $COLOR_PRIMARY;
      height: 100%;
      left: 0;
      position: absolute;
      top: 0;
      width: 0;
    }
  }

  &__progress-count {
    color: $COLOR_TEXT_SECONDARY;
  }

  @include mq($until: large) {
    &__sort {
      select {
        border-left: 0;
        border-right: 0;
      }
    }

    &__grid-container.container {
      margin-top: ($SPACING_M + $SPACING_2XS);
      padding-left: $SPACING_XS;
      padding-right: $SPACING_XS;
    }
  }

  @include mq($from: large) {
    min-height: 300px;

    &__filter-toggle {
      display: none;
    }

    &__toolbar {
      @include container;
      align-items: center;
      border-bottom: 0;
      display: flex;
      flex-direction: row-reverse;
      padding: ($SPACING_M + $SPACING_2XS);
    }

    &__sort {
      margin-top: 0;
    }

    &__count {
      margin-right: auto;
      padding: 0;
      text-align: left;
    }

    &__filter-sidebar {
      display: block;
    }

    &__grid {
      column-gap: $SPACING_M;
      grid-template-columns: repeat(3, 1fr);
      row-gap: ($SPACING_3XL + $SPACING_S);
    }

    &__lifestyle-block {
      grid-column: 2 / span 2;
      grid-row: 2;
      padding-top: 0;
    }

    &__footer {
      margin: $LAYOUT_XL 0;
    }

    &__load-more {
      margin-bottom: $SPACING_XL;
      max-width: 320px;
    }
  }
}
</style>
