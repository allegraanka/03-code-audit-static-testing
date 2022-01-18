/**
 * @file Defines stories for the sign up form section.
 */

import { createTemplate } from '~/helpers/storybook'

import SignUpForm from '~/sections/SignUpForm'

export default {
  title: 'Sections/Sign Up Form',
  component: SignUpForm,

  parameters: {
    layout: 'fullscreen'
  }
}

/**
 * Returns the base story.
 */
export const Base = createTemplate(SignUpForm, {
  id: 'catalogue-form',
  offersCheckboxLabel:
    'Tick this box if you would you like to receive information and special offers by post from other carefully selected companies whose products and services we think you may be interested in? We never share phone numbers or email addresses. ',
  subscribeCheckboxLabel:
    'Subscribe to receive regular news and offers from Pavers. You can unsubscribe at any time.',
  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque et tincidunt quam, a consequat velit.',
  title: 'Sign up to receive our free Catalogue'
})
