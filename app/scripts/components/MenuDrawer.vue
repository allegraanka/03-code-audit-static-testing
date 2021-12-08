<template>
  <drawer
    ref="drawer"
    class="menu-drawer"
    namespace="menu-drawer"
    left-align
    :force-open="forceOpen"
  >
    <template v-if="menuItems.length > 0">
      <div class="menu-drawer__body">
        <menu-drawer-item
          position="top"
          :items="menuItems"
          :additional-items="additionalMenuItems"
          @menu-drawer-open="openItem"
        >
          <template #default="{ item: child }">
            <menu-drawer-item
              :id="child._key"
              :key="child.title"
              :items="
                child.additionalColumns
                  ? child.columns.concat(child.additionalColumns)
                  : child.columns
              "
              :additional-items="child.menuItems"
              :breadcrumbs="[child.title]"
              :nav-title="$t('drawer.title')"
              :active="activeItems.includes(child._key)"
              :banner="child.promotionalBanner"
              @menu-drawer-open="openItem"
              @menu-drawer-close="closeItem"
            >
              <template #default="{ item: grandchild }">
                <menu-drawer-item
                  :id="grandchild._key"
                  :key="grandchild.title"
                  :items="grandchild.menuItems"
                  :breadcrumbs="[child.title, grandchild.title]"
                  :nav-title="child.title"
                  :active="activeItems.includes(grandchild._key)"
                  @menu-drawer-close="closeItem"
                />
              </template>
            </menu-drawer-item>
          </template>
        </menu-drawer-item>
      </div>
    </template>
  </drawer>
</template>

<script>
import Drawer from '~/components/Drawer'
import MenuDrawerItem from '~/components/MenuDrawerItem'

export default {
  components: {
    Drawer,
    MenuDrawerItem
  },

  props: {
    forceOpen: {
      type: Boolean,
      default: false
    },

    menuItems: {
      type: Array,
      default: () => []
    },

    additionalMenuItems: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      activeItems: [],

      selectors: {
        body: '.drawer__body'
      }
    }
  },

  methods: {
    /**
     * Closes a menu drawer item.
     * @param {string} id - The item identifier.
     */
    closeItem(id) {
      const index = this.activeItems.indexOf(id)

      if (index <= -1) {
        return
      }

      this.activeItems.splice(index, 1)
    },

    /**
     * Opens a menu drawer item.
     * @param {string} id - The item identifier.
     */
    openItem(id) {
      const index = this.activeItems.indexOf(id)
      const drawerBody = this.$refs.drawer.$el.querySelector(
        this.selectors.body
      )

      if (index >= 0) {
        return
      }

      drawerBody.scrollTop = 0
      this.activeItems.push(id)
    }
  }
}
</script>

<style lang="scss">
.menu-drawer {
  &__body {
    height: 100%;
    position: relative;
  }

  .drawer__body {
    padding: 0;
  }
}
</style>
