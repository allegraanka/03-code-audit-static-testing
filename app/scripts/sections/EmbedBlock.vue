<template>
  <section
    class="embed-block"
    :class="{
      'embed-block--left': alignment === 'left',
      'embed-block--right': alignment === 'right'
    }"
  >
    <div v-if="contain" class="container">
      <div class="row">
        <div class="col xs12">
          <iframe class="embed-block__frame" v-bind="attributes" />
        </div>
      </div>
    </div>

    <iframe v-else class="embed-block__frame" v-bind="attributes" />
  </section>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      required: true
    },

    height: {
      type: Number,
      default: 100
    },

    width: {
      type: Number,
      default: 0
    },

    title: {
      type: String,
      default: ''
    },

    alignment: {
      type: String,
      default: 'center'
    },

    contain: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      attributes: {
        src: this.url,
        title: this.title,
        height: this.height === 0 ? false : this.height,
        width: this.width === 0 ? false : this.width
      }
    }
  }
}
</script>

<style lang="scss">
.embed-block {
  $parent: &;

  &__frame {
    border: 0;
    display: block;
    margin: 0 auto;

    &:not([width]) {
      width: 100%;
    }
  }

  &#{&}--left {
    #{$parent}__frame {
      margin-left: 0;
    }
  }

  &#{&}--right {
    #{$parent}__frame {
      margin-right: 0;
    }
  }
}
</style>
