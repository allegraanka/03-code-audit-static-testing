/**
 * @file A group of links styled as buttons.
 */

import LinkGroup from '~/components/LinkGroup'

export default {
  title: 'Components/Link Group',
  component: LinkGroup,

  parameters: {
    layout: 'fullscreen'
  }
}

export const Base = () => ({
  components: {
    LinkGroup
  },

  data() {
    return {
      links: [
        {
          id: 0,
          href: '/collections/all',
          label: 'Casual'
        },
        {
          id: 1,
          href: '/collections/all',
          label: 'Smart & Formal'
        },
        {
          id: 2,
          href: '/collections/all',
          label: 'Flat'
        },
        {
          id: 3,
          href: '/collections/all',
          label: 'Heels'
        },
        {
          id: 4,
          href: '/collections/all',
          label: 'Wedges'
        },
        {
          id: 5,
          href: '/collections/all',
          label: 'Lace Up'
        },
        {
          id: 6,
          href: '/collections/all',
          label: 'Pumps'
        },
        {
          id: 7,
          href: '/collections/all',
          label: 'Loafers'
        }
      ]
    }
  },

  template: `
    <div style="height: 100vh;">
      <div
        style="
          position: relative;
          top: 50%;
          transform: translateY(-50%);
        "
      >
        <link-group
          :links="links"
          style="padding-left: 1.125rem;"
        />
      </div>
    </div>
  `
})
