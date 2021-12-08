/**
 * @file A sidebar with menu.
 */

import SidebarMenu from '~/components/SidebarMenu'

import { createTemplate } from '~/helpers/storybook'

export default {
  title: 'Components/Sidebar Menu',
  component: SidebarMenu,

  parameters: {
    layout: 'fullscreen'
  }
}

/**
 * Exports the base story.
 */
export const Base = createTemplate(SidebarMenu, {
  menuItems: {
    title: 'Customer Service',
    items: [
      {
        _key: '034610147802',
        name: 'Contact Us',
        link: ''
      },
      {
        _key: '4ed8b23e358d',
        name: 'Returns',
        link: ''
      },
      {
        _key: 'af94dc5776cd',
        name: 'Lorem Ipsum Dolor',
        link: ''
      },
      {
        _key: 'af94dc5776cd',
        name: 'Lorem Ipsum Dolor',
        link: ''
      },
      {
        _key: 'af94dc5776cd',
        name: 'Lorem Ipsum Dolor',
        link: ''
      },
      {
        _key: 'af94dc5776cd',
        name: 'Lorem Ipsum Dolor',
        link: ''
      }
    ]
  }
})
