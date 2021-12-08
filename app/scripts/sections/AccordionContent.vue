<template>
  <section class="accordion-block">
    <div class="container">
      <div class="row">
        <div class="col xs12">
          <accordion class="accordion-block__accordion">
            <template #default="{ handleClick, activeItems }">
              <accordion-item
                v-for="item in items"
                :id="`accordion-${item._key}`"
                :key="item._key"
                :label="item.title"
                :is-active="activeItems.includes(`accordion-${item._key}`)"
                icon="chevron"
                @accordion-control-click="handleClick(`accordion-${item._key}`)"
              >
                <rich-content
                  v-if="item.content && item.content.content"
                  :content="item.content.content"
                />

                <table-block
                  v-if="item.table && item.table.rows"
                  :table="item.table"
                  class="accordion-block__table"
                />
              </accordion-item>
            </template>
          </accordion>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Accordion from '~/components/Accordion'
import AccordionItem from '~/components/AccordionItem'
import RichContent from '~/components/RichContent'

import TableBlock from '~/components/TableBlock'

export default {
  components: {
    Accordion,
    AccordionItem,
    RichContent,
    TableBlock
  },

  props: {
    items: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss" scoped>
.accordion-block {
  &__accordion {
    /* stylelint-disable-next-line */
    &::v-deep {
      .accordion-item__label {
        font-family: $FONT_BODY;
        font-size: ms(0);
        letter-spacing: $LETTER_SPACING_SUBTITLE;
        margin-bottom: 0;
        padding-left: $SPACING_XS;
      }

      .accordion-item__icon {
        fill: $COLOR_BUTTON;
      }

      .accordion-item__control {
        flex-direction: row-reverse;
        justify-content: flex-end;
        padding: ($SPACING_2XS + $SPACING_3XS) 0;
      }

      .accordion-item__content {
        color: $COLOR_TEXT_SECONDARY;
        padding: ($SPACING_XS + $SPACING_3XS) 0 $SPACING_M $SPACING_XL;

        a {
          color: $COLOR_TEXT_SECONDARY;
        }
      }
    }
  }

  &__table {
    table-layout: fixed;
    width: 100%;

    /* stylelint-disable-next-line */
    &::v-deep {
      td,
      th {
        border-bottom: 0;
        padding: $SPACING_S 0 $SPACING_S ($SPACING_2XL + $SPACING_3XS);

        &:nth-child(even) {
          border-left: 1px solid $COLOR_BORDER_DARK;
        }
      }

      thead {
        th {
          background-color: $COLOR_PRIMARY;
          color: $COLOR_TEXT_INVERSE;
          padding-bottom: $SPACING_M + $SPACING_2XS;
          padding-top: $SPACING_M + $SPACING_2XS;
        }
      }

      tbody {
        tr {
          &:nth-child(odd) {
            background-color: rgb(247, 247, 247);
          }
        }
      }
    }
  }

  @include mq($from: large) {
    &__table {
      width: 80%;
    }
  }
}
</style>
