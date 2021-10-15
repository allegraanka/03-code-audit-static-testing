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

  data() {
    return {
      name: 'Example stockist',
      address: '133 High Rd, Ilford IG1 1DE',
      phone: '08475 264 462',
      available: true,
      miles: 2,
      origin: 'EC1N 8UA'
    }
  },

  template: `
    <div class="container" style="margin-top: 12rem;">
      <div class="row">
        <div class="col xs12 l6 push-l3">
          <stock-checker-stockist
            :name="name"
            :address="address"
            :phone="phone"
            :available="available"
            :miles="miles"
            :origin="origin"
            style="width: 100%;"
          />
        </div>
      </div>
    </div>
  `
})
