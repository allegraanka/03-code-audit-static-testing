<template>
  <section class="category-blocks">
    <div class="container">
      <div class="row">
        <div class="col xs12 l6 push-l3">
          <div class="category-blocks__header">
            <p v-if="subtitle" class="category-blocks__subtitle body-1">
              {{ subtitle }}
            </p>

            <h2 v-if="title" class="category-blocks__title">{{ title }}</h2>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },

    subtitle: {
      type: String,
      default: ''
    },

    rows: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss">
.category-blocks {
  &__header {
    text-align: center;
  }

  &__subtitle,
  &__subtitle.body-1 {
    color: $COLOR_TEXT_SECONDARY;
    margin: 0 0 $SPACING_S;
    text-transform: uppercase;
  }

  &__title {
    margin: 0 0 $SPACING_2XL;
  }
}
</style>
