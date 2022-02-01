<template>
  <div class="product-reviews">
    <div
      v-if="layout === 'detailed'"
      ref="trustpilotWidget"
      class="product-reviews__widget product-reviews__widget--layout-detailed"
      data-locale="en-GB"
      data-template-id="5763bccae0a06d08e809ecbb"
      data-businessunit-id="46d889ae000064000500f8c8"
      data-style-height="611px"
      data-style-width="100%"
      data-theme="light"
      data-stars="1,2,3,4,5"
      :data-sku="sku"
      :data-name="title"
      data-review-languages="en"
      data-allow-robots="true"
    >
      <a
        href="https://uk.trustpilot.com/review/pavers.co.uk"
        target="_blank"
        rel="noopener"
        class="visually-hidden"
      >
        Trustpilot
      </a>
    </div>

    <div
      v-else
      ref="trustpilotWidget"
      class="product-reviews__widget"
      data-locale="en-GB"
      data-template-id="577258fb31f02306e4e3aaf9"
      data-businessunit-id="46d889ae000064000500f8c8"
      data-style-height="24px"
      data-style-width="185px"
      data-theme="light"
      data-stars="1,2,3,4,5"
      :data-sku="sku"
      data-scroll-to-list="true"
      data-allow-robots="true"
    >
      <a
        href="https://uk.trustpilot.com/review/pavers.co.uk"
        target="_blank"
        rel="noopener"
        class="visually-hidden"
      >
        Trustpilot
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    sku: {
      type: String,
      required: true
    },

    title: {
      type: String,
      default: ''
    },

    layout: {
      type: String,
      default: '',

      validator(value) {
        return ['', 'detailed'].indexOf(value) !== -1
      }
    }
  },

  watch: {
    /**
     * Watches for changes to the SKU.
     * - Re-loads the widget.
     */
    sku() {
      this.loadWidget()
    }
  },

  mounted() {
    this.loadWidget()
  },

  methods: {
    /**
     * Loads the Trustpilot widget.
     */
    loadWidget() {
      if (window.Trustpilot && this.$refs.trustpilotWidget) {
        window.Trustpilot.loadFromElement(this.$refs.trustpilotWidget)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.product-reviews {
  margin-left: -$SPACING_S;
}
</style>
