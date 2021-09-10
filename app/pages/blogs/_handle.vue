<template>
  <div class="template-blog">
    <div class="template-blog__hero">
      <div class="template-blog__image">
        <img
          v-if="blog.fields.image"
          :alt="blog.title"
          :src="blog.fields.image.asset.url"
        />
      </div>

      <div class="template-blog__header">
        <div class="container">
          <div class="row">
            <div class="col xs12 l5">
              <h1>{{ blog.title }}</h1>

              <p v-if="blog.description">
                {{ blog.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ app, error, params }) {
    const blog = await app.$nacelle
      .contentByHandle(params.handle, 'blog')
      .catch(() => {
        error({
          statusCode: 404,
          message: 'Blog not found'
        })
      })

    return {
      blog
    }
  }
}
</script>

<style lang="scss">
.template-blog {
  &__header {
    padding: $SPACING_L;
    text-align: center;
  }

  @include mq($from: large) {
    &__hero {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      position: relative;
    }

    &__header {
      align-items: center;
      display: flex;
      padding: $LAYOUT_M 0;
      text-align: left;

      .container {
        left: 50%;
        position: absolute;
        transform: translateX(-50%);
      }
    }

    &__image {
      order: 2;
    }
  }
}
</style>
