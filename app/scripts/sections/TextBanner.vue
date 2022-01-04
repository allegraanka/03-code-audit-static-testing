<template>
  <section class="text-banner">
    <div class="container">
      <div class="row">
        <div class="col xs12 l5">
          <h1 v-if="title" class="text-banner__title">{{ title }}</h1>

          <rich-content
            v-if="text"
            class="text-banner__text body-1"
            :content="text"
          />

          <div v-if="socialLinks.length > 0" class="text-banner__links">
            <a
              v-for="item in socialLinks"
              :key="item._key"
              class="text-banner__link"
              :href="item.link"
            >
              <component :is="`icon-${item.icon}`" v-if="item.icon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import RichContent from '~/components/RichContent'

import IconSocialFacebook from '@/assets/icons/social-facebook.svg?inline'
import IconSocialInstagram from '@/assets/icons/social-instagram.svg?inline'
import IconSocialPinterest from '@/assets/icons/social-pinterest.svg?inline'
import IconSocialTwitter from '@/assets/icons/social-twitter.svg?inline'
import IconSocialYoutube from '@/assets/icons/social-youtube.svg?inline'

export default {
  components: {
    RichContent,
    IconSocialFacebook,
    IconSocialInstagram,
    IconSocialPinterest,
    IconSocialTwitter,
    IconSocialYoutube
  },

  props: {
    title: {
      type: String,
      default: ''
    },

    text: {
      type: Array,
      default: () => []
    },

    socialLinks: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss">
.text-banner {
  background-color: $COLOR_BACKGROUND_MID;
  padding: $SPACING_XL 0;

  &__title {
    margin-bottom: $SPACING_M + $SPACING_2XS;
    margin-top: 0;
  }

  &__text {
    color: $COLOR_TEXT_SECONDARY;
  }

  &__links {
    align-items: center;
    display: flex;
    margin-top: $SPACING_XL;
  }

  &__link {
    display: block;

    &:not(:last-child) {
      margin-right: $SPACING_XL;
    }
  }

  @include mq($from: large) {
    padding: $LAYOUT_S 0 $LAYOUT_L;

    &__links {
      margin-top: $SPACING_3XL;
    }

    &__link:not(:last-child) {
      margin-right: $SPACING_L;
    }
  }
}
</style>
