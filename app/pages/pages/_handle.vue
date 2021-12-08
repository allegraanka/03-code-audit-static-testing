<template>
  <div class="template-page" :class="{ 'template-page--sidebar': menuItems }">
    <div v-if="menuItems" class="row no-margin-bottom">
      <div class="template-page__sidebar col xs12 l4">
        <sidebar-menu :menu-items="menuItems" />
      </div>
      <div class="col xs12 l8 template-page__body">
        <h1 class="template-page__title h3">{{ page.title }}</h1>
        <content-sections :sections="page.sections" />
      </div>
    </div>

    <content-sections v-else :sections="page.sections" :sidebar="menuItems" />
  </div>
</template>

<script>
import ContentSections from '~/components/ContentSections'
import SidebarMenu from '~/components/SidebarMenu'

import { getHead } from '~/helpers/metadata'

export default {
  components: {
    ContentSections,
    SidebarMenu
  },

  async asyncData({ app, error, params }) {
    const page = await app.$nacelle.pageByHandle(params.handle).catch(() => {
      error({
        statusCode: 404,
        message: 'Page not found'
      })
    })

    return {
      page
    }
  },

  head() {
    return getHead(this.page.fields.metadata, this.page.title)
  },

  computed: {
    /**
     * Returns the menu for the sidebar.
     * @returns {object} - The menu object.
     */
    menuItems() {
      return this.page.fields?.menu || false
    }
  }
}
</script>

<style lang="scss" scoped>
.template-page {
  $parent: &;

  &#{&}--sidebar {
    #{$parent}__title {
      margin: $SPACING_3XS 0 $SPACING_L;
      padding-left: $SPACING_M;
    }

    @include mq($from: large) {
      #{$parent}__body.col {
        margin-top: $LAYOUT_M + $SPACING_S;
        padding-left: $SPACING_3XL + $SPACING_XS;
      }

      #{$parent}__title {
        margin: $SPACING_L 0;
        padding-left: 3.5rem;
      }

      #{$parent}__sidebar.col {
        max-width: 376px;
      }
    }
  }
}
</style>
