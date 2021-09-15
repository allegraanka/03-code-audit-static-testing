/**
 * @file Defines the stories for payment icons.
 */

import { createSimpleTemplate } from '~/helpers/storybook'

import IconVisa from '@/assets/icons/payment-visa.svg?inline'
import IconMastercard from '@/assets/icons/payment-mastercard.svg?inline'
import IconPayPal from '@/assets/icons/payment-paypal.svg?inline'
import IconAmazonPay from '@/assets/icons/payment-amazon-pay.svg?inline'
import IconGooglePay from '@/assets/icons/payment-google-pay.svg?inline'
import IconApplePay from '@/assets/icons/payment-apple-pay.svg?inline'
import IconShopPay from '@/assets/icons/payment-shop-pay.svg?inline'
import IconAmex from '@/assets/icons/payment-amex.svg?inline'

export default {
  title: 'Styles/Icons/Payment'
}

export const Visa = createSimpleTemplate(IconVisa)
export const Mastercard = createSimpleTemplate(IconMastercard)
export const PayPal = createSimpleTemplate(IconPayPal)
export const AmazonPay = createSimpleTemplate(IconAmazonPay)
export const GooglePay = createSimpleTemplate(IconGooglePay)
export const ApplePay = createSimpleTemplate(IconApplePay)
export const ShopPay = createSimpleTemplate(IconShopPay)
export const Amex = createSimpleTemplate(IconAmex)
