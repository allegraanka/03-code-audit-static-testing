<template>
  <div class="template-collection">
    <div class="template-collection__hero">
      <div class="container">
        <div class="row no-margin-bottom">
          <div class="col xs12">
            <h1 class="template-collection__title">
              {{ collection.title }}
            </h1>

            <div
              v-if="collection.description"
              class="template-collection__description"
              v-html="
                description.expanded
                  ? collection.description
                  : clip(collection.description, 219, {
                      html: true,
                      breakWords: true,
                      maxLines: 3
                    })
              "
            />

            <button
              v-if="collection.description"
              class="template-collection__description-toggle"
              @click.prevent="description.expanded = !description.expanded"
            >
              {{
                description.expanded
                  ? $t('collection.collapseDescription')
                  : $t('collection.expandDescription')
              }}
            </button>

            <div class="template-collection__links">
              <link-group :links="links" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <listing
      :filters="`collections:${collection.handle}`"
      :lifestyle="lifestyle"
    />
  </div>
</template>

<script>
import clip from 'text-clipper'

import { getHead } from '~/helpers/metadata'
import { transform } from '~/helpers/utils'

import LinkGroup from '~/components/LinkGroup'
import Listing from '~/components/algolia/Listing'

export default {
  components: {
    LinkGroup,
    Listing
  },

  async asyncData({ app, error, params }) {
    const collection = await app.$nacelle.client.data
      .collection({ handle: params.handle })
      .catch(() => {
        error({
          statusCode: 404,
          message: 'Collection not found'
        })
      })

    return {
      collection
    }
  },

  data() {
    return {
      description: {
        expanded: false
      }
    }
  },

  head() {
    return getHead({
      title: this.collection.title,
      description: this.collection.description
    })
  },

  computed: {
    /**
     * Transforms chosen metafields into an array of links.
     * @returns {Array} - The list of links.
     */
    links() {
      const links = this.collection.metafields.filter(
        ({ namespace }) => namespace === 'links'
      )

      return links.map(({ key, value }) => ({
        id: `collection-${this.collection.handle}-link-${transform(key)}`,
        href: value,
        label: key
      }))
    },

    /**
     * Returns the values for the lifestyle block.
     * @returns {object} - The lifestyle object.
     */
    lifestyle() {
      const settings = ['title', 'body', 'image', 'video', 'link', 'button']

      return settings.reduce((accumulator, current) => {
        accumulator[current] = this.$nacelle.helpers.findMetafield(
          this.collection.metafields,
          `lifestyle.${current}`
        )

        return accumulator
      }, {})
    }
  },

  methods: {
    clip
  }
}
</script>

<style lang="scss">
.template-collection {
  &__hero {
    background-color: $COLOR_BACKGROUND_MID;
    padding: $SPACING_XL 0;
  }

  &__title {
    margin: 0;
  }

  &__description {
    color: $COLOR_TEXT_SECONDARY;
    margin-bottom: $SPACING_M;
    margin-top: ($SPACING_M + $SPACING_2XS);
  }

  &__description-toggle {
    @include button-reset;
    color: $COLOR_TEXT_SECONDARY;
    font-size: ms(-1);
    text-decoration: underline;
  }

  &__links {
    margin: $SPACING_XL -#{$SPACING_M} 0 -#{$SPACING_M};

    .swiper-wrapper {
      padding-left: $SPACING_M;
    }
  }

  @include mq($from: large) {
    &__hero {
      padding: $SPACING_3XL 0;
    }

    &__description {
      margin-bottom: $SPACING_L;
      margin-top: $SPACING_L;
      max-width: 544px;
    }

    &__description-toggle {
      font-size: ms(0);
    }

    &__links {
      margin: $SPACING_L 0 0 0;

      .link-group__link {
        margin-top: $SPACING_M;
      }
    }
  }
}
</style>
