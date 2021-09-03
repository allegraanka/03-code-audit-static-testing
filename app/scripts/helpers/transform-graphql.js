/**
 * @file Helpers for transforming GraphQL responses.
 */

import { decodeApiId, titleCase, formatDate } from '~/helpers/utils'

/**
 * Formats the order response.
 *
 * @param {object} order - The order node.
 * @param {string} order.id - The order identifier.
 * @param {string} order.financialStatus - The financial status.
 * @param {string} order.fulfillmentStatus - The fulfilment status.
 * @param {number} order.orderNumber - The order number.
 * @param {string} order.processedAt - The order date.
 * @param {object} order.totalPriceV2 - The order total price.
 * @returns {object} - The formatted order object.
 */
export const transformOrder = ({
  id,
  financialStatus,
  fulfillmentStatus,
  orderNumber,
  processedAt,
  totalPriceV2
}) => ({
  handle: decodeApiId(id),
  financialStatus: titleCase(financialStatus.toLowerCase()),
  fulfillmentStatus: titleCase(fulfillmentStatus.toLowerCase()),
  orderNumber: `#${orderNumber}`,
  processedAt: formatDate(processedAt),
  total: totalPriceV2.amount
})
