/**
 * @file Helpers for transforming GraphQL responses.
 */

import {
  decodeApiId,
  titleCase,
  formatDate,
  formatPrice
} from '~/helpers/utils'

/**
 * Formats the order response.
 *
 * @param {object} order - The order node.
 * @param {string} order.id - The order identifier.
 * @param {string} order.financialStatus - The financial status.
 * @param {string} order.fulfillmentStatus - The fulfillment status.
 * @param {number} order.orderNumber - The order number.
 * @param {string} order.processedAt - The order date.
 * @param {object} order.currentTotalPrice - The order total price.
 * @param {object} order.currentSubtotalPrice - The order subtotal price.
 * @param {object} order.currentTotalTax - The tax total.
 * @param {object} order.totalShippingPriceV2 - The shipping total.
 * @param {object} order.shippingAddress - The shipping address.
 * @param {object} order.lineItems - The line items.
 * @returns {object} - The formatted order object.
 */
export const formatOrder = ({
  id,
  financialStatus,
  fulfillmentStatus,
  orderNumber,
  processedAt,
  currentTotalPrice,
  currentSubtotalPrice,
  currentTotalTax,
  totalShippingPriceV2,
  shippingAddress,
  lineItems
}) => ({
  handle: id && decodeApiId(id),
  financialStatus: financialStatus && titleCase(financialStatus.toLowerCase()),
  fulfillmentStatus:
    fulfillmentStatus && titleCase(fulfillmentStatus.toLowerCase()),
  orderNumber: orderNumber && `#${orderNumber}`,
  processedAt: processedAt && formatDate(processedAt),
  total: currentTotalPrice && formatPrice(currentTotalPrice.amount),
  subtotal: currentSubtotalPrice && formatPrice(currentSubtotalPrice.amount),
  taxTotal: currentTotalTax && formatPrice(currentTotalTax.amount),
  shippingTotal:
    totalShippingPriceV2 && formatPrice(totalShippingPriceV2.amount),
  shippingAddress,
  lineItems:
    lineItems &&
    lineItems.edges.map(({ node }) => {
      const { discountedTotalPrice, ...rest } = node

      return {
        discountedTotalPrice: formatPrice(discountedTotalPrice.amount),
        ...rest
      }
    })
})

/**
 * Formats the address objects.
 *
 * @param {object} address - The address object.
 * @param {string} address.id - The address identifier.
 * @returns {object} - The formatted order.
 */
export const formatAddress = ({ id, ...rest }) => ({
  id,
  handle: decodeApiId(id),
  ...rest
})
