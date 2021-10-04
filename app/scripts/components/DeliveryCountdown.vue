<template>
  <div class="delivery-countdown">
    <h6 v-if="title" class="delivery-countdown__title">{{ title }}</h6>

    <no-ssr>
      <countdown
        class="delivery-countdown__countdown"
        :end-time="end.getTime()"
        @finish="handleCountdownFinished"
      >
        <template #process="{ timeObj }">
          <span>
            <div class="delivery-countdown__part">
              <h3>{{ timeObj.h }}</h3>
              <h6>hrs</h6>
            </div>
          </span>

          <span>
            <div class="delivery-countdown__part">
              <h3>{{ timeObj.m }}</h3>
              <h6>mins</h6>
            </div>
          </span>

          <span>
            <div class="delivery-countdown__part">
              <h3>{{ timeObj.s }}</h3>
              <h6>secs</h6>
            </div>
          </span>
        </template>

        <template #finish>Finished</template>
      </countdown>
    </no-ssr>

    <rich-content
      v-if="body"
      class="delivery-countdown__body body-2"
      :content="body"
    />
  </div>
</template>

<script>
import RichContent from '~/components/RichContent'

export default {
  components: {
    RichContent
  },

  props: {
    title: {
      type: String,
      default: ''
    },

    endDateTime: {
      type: [Object, String],
      required: true
    },

    body: {
      type: [Array, String],
      default: ''
    }
  },

  data() {
    return {
      now: new Date()
    }
  },

  computed: {
    /**
     * Returns the formatted end date.
     * @returns {object} - The date object.
     */
    end() {
      return new Date(this.endDateTime)
    }
  },

  methods: {
    /**
     * Handles the finished state.
     */
    handleCountdownFinished() {
      this.$emit('finished')
    }
  }
}
</script>

<style lang="scss">
.delivery-countdown {
  background-color: $COLOR_BACKGROUND_LIGHT;
  padding: $SPACING_L;
  text-align: center;

  &__body {
    color: $COLOR_TEXT_SECONDARY;
  }

  &__countdown {
    @include gap($SPACING_M);
    color: $COLOR_PRIMARY;
    display: flex;
    justify-content: center;
    margin: $SPACING_M 0 $SPACING_S 0;
  }

  &__part {
    @include gap(0.375rem);
    align-items: baseline;
    display: flex;
  }
}
</style>
