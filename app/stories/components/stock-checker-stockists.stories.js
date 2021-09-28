/**
 * @file A store card with details about the stockist.
 */

import StockCheckerStockist from '~/components/StockCheckerStockist'

export default {
  title: 'Components/Stock Checker Stockist',
  component: StockCheckerStockist,

  parameters: {
    layout: 'fullscreen'
  }
}

/**
 * The base story.
 * @returns {object} - The base component.
 */
export const Base = () => ({
  components: {
    StockCheckerStockist
  },

  template: `
    <div class="container" style="margin-top: 12rem;">
      <div class="row">
        <div class="col xs12 l6 push-l3">
          <stock-checker-stockist style="width: 100%;" />
        </div>
      </div>
    </div>
  `
})
