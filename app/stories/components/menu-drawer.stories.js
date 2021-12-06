/**
 * @file Defines the stories for the menu drawer.
 */

import MenuDrawer from '~/components/MenuDrawer'

import { createTemplate } from '~/helpers/storybook'

export default {
  title: 'Components/Menu Drawer',
  component: MenuDrawer,
  parameters: {
    layout: 'fullscreen'
  }
}

/**
 * Exports the base story.
 */
export const Base = createTemplate(MenuDrawer, {
  forceOpen: true,
  menuItems: [
    {
      _key: 'e7c32fda3804',
      _type: 'item',
      additionalColumns: [
        {
          _key: 'f89c7b9b136a',
          _type: 'column',
          displayAsGrid: true,
          menuItems: [
            {
              _key: '72713f2d5de3',
              _type: 'menuItem',
              link: '/collections/all',
              title: '1'
            },
            {
              _key: '342d0225b5ea',
              _type: 'menuItem',
              link: '/collections/all',
              title: '2'
            },
            {
              _key: '7707e8872a69',
              _type: 'menuItem',
              link: '/collections/all',
              title: '3'
            },
            {
              _key: 'e9a56f2551ce',
              _type: 'menuItem',
              link: '/collections/all',
              title: '4'
            },
            {
              _key: '0fa69e45ef3d',
              _type: 'menuItem',
              link: '/collections/all',
              title: '5'
            },
            {
              _key: '1f7c56dc7b2d',
              _type: 'menuItem',
              link: '/collections/all',
              title: '6'
            },
            {
              _key: 'b74be1de54dc',
              _type: 'menuItem',
              link: '/collections/all',
              title: '7'
            },
            {
              _key: '785531d2e0e2',
              _type: 'menuItem',
              link: '/collections/all',
              title: '8'
            },
            {
              _key: '6e0e9d55d2c7',
              _type: 'menuItem',
              link: '/collections/all',
              title: '9'
            },
            {
              _key: '7788cf168cb6',
              _type: 'menuItem',
              link: '/collections/all',
              title: '10'
            }
          ],
          title: 'Shop By Size'
        },
        {
          _key: 'e4a05d338f56',
          _type: 'column',
          displayAsGrid: true,
          menuItems: [
            {
              _key: 'a32a7f1cb2ed',
              _type: 'menuItem',
              link: '/collections/all',
              title: 'Standard (D)'
            },
            {
              _key: '0665d904c148',
              _type: 'menuItem',
              link: '/collections/all',
              title: 'Wide (D/E)'
            },
            {
              _key: 'cab977a9e896',
              _type: 'menuItem',
              link: '/collections/all',
              title: 'Extra Wide (E/EE)'
            },
            {
              _key: '7d3a3daf1c23',
              _type: 'menuItem',
              link: '/collections/all',
              title: 'Dual/Multi Fitting'
            },
            {
              _key: '0543796d5965',
              _type: 'menuItem',
              link: '/collections/all',
              title: 'Extra Wide Plus (6E)'
            }
          ],
          title: 'Shop By Width'
        },
        {
          _key: 'cf84752f4fce',
          _type: 'column',
          displayAsGrid: true,
          menuItems: [
            {
              _key: '3c99d3a47ddf',
              _type: 'menuItem',
              link: '/collections/all',
              title: 'Casual'
            },
            {
              _key: '91a3e5e8e34d',
              _type: 'menuItem',
              link: '/collections/all',
              title: 'Smart & Formal'
            },
            {
              _key: '380734fa89fc',
              _type: 'menuItem',
              link: '/collections/all',
              title: 'Wedding'
            },
            {
              _key: '9fefc16aec4a',
              _type: 'menuItem',
              link: '/collections/all',
              title: 'Garden Party'
            },
            {
              _key: '27b075360136',
              _type: 'menuItem',
              link: '/collections/all',
              title: 'Workwear'
            },
            {
              _key: 'a080e5fa85a8',
              _type: 'menuItem',
              link: '/collections/all',
              title: 'Half Sizes'
            },
            {
              _key: '7cdc5f7ff40d',
              _type: 'menuItem',
              link: '/collections/all',
              title: 'Home Comforts'
            },
            {
              _key: '1c5d857c52f4',
              _type: 'menuItem',
              link: '/collections/all',
              title: 'Gardening'
            }
          ],
          title: 'Shop By Collection'
        }
      ],
      columns: [
        {
          _key: '58616cdfabd1',
          _type: 'column',
          menuItems: [
            {
              _key: 'f29fa240dea2',
              _type: 'menuItem',
              link: '/collections/all',
              title: 'All Shoes'
            },
            {
              _key: '6a7d58dd0070',
              _type: 'menuItem',
              link: '/collections/all',
              title: 'Flat'
            },
            {
              _key: 'e16b5ca1702d',
              _type: 'menuItem',
              link: '/collections/all',
              title: 'Mid Heel'
            },
            {
              _key: '7b30db9771b9',
              _type: 'menuItem',
              link: '/collections/all',
              title: 'High Heel'
            },
            {
              _key: '659c5f03ab74',
              _type: 'menuItem',
              link: '/collections/all',
              title: 'Wedges'
            },
            {
              _key: '1566fcabc4af',
              _type: 'menuItem',
              link: '/collections/all',
              title: 'Clogs'
            },
            {
              _key: '4ec3433deb88',
              _type: 'menuItem',
              link: '/collections/all',
              title: 'Loafers'
            }
          ],
          title: 'Shoes'
        },
        {
          _key: '4f556a2f2dce',
          _type: 'column',
          menuItems: [
            {
              _key: '586258003f24',
              _type: 'menuItem',
              link: '/collections/all',
              title: 'Lace Up'
            },
            {
              _key: '1ddbbbe0649f',
              _type: 'menuItem',
              link: '/collections/all',
              title: 'Touch Fastening'
            },
            {
              _key: 'f26ebd3836de',
              _type: 'menuItem',
              link: '/collections/all',
              title: 'Slip On'
            },
            {
              _key: 'cd032490bd9f',
              _type: 'menuItem',
              link: '/collections/all',
              title: 'Running & Gym'
            }
          ],
          title: 'Trainers'
        },
        {
          _key: '7ed1c091a4fc',
          _type: 'column',
          menuItems: [
            {
              _key: 'a462b0594913',
              _type: 'menuItem',
              link: '/collections/all',
              title: 'Slingbacks'
            },
            {
              _key: 'ce6b4ec203af',
              _type: 'menuItem',
              link: '/collections/all',
              title: 'Mules'
            },
            {
              _key: '8e73d46e298f',
              _type: 'menuItem',
              link: '/collections/all',
              title: 'Ankle Strap'
            },
            {
              _key: 'c4112522afa9',
              _type: 'menuItem',
              link: '/collections/all',
              title: 'Toe Post'
            },
            {
              _key: 'ae2aa2b26fee',
              _type: 'menuItem',
              link: '/collections/all',
              title: 'Flat'
            },
            {
              _key: 'f5eacffa75b9',
              _type: 'menuItem',
              link: '/collections/all',
              title: 'Wedge'
            },
            {
              _key: '44be50b193a5',
              _type: 'menuItem',
              link: '/collections/all',
              title: 'High Heels'
            },
            {
              _key: '71064586c589',
              _type: 'menuItem',
              link: '/collections/all',
              title: 'Block Heels'
            }
          ],
          title: 'Sandals'
        },
        {
          _key: '99b93b2c9d37',
          _type: 'column',
          menuItems: [
            {
              _key: 'b488c0a0dbd7',
              _type: 'menuItem',
              link: '/collections/all',
              title: 'Ankle'
            },
            {
              _key: 'b840fe070b7b',
              _type: 'menuItem',
              link: '/collections/all',
              title: 'Chelsea Boots'
            },
            {
              _key: '2dcaaebc7ba1',
              _type: 'menuItem',
              link: '/collections/all',
              title: 'Calf Length'
            },
            {
              _key: '85c6522d5b73',
              _type: 'menuItem',
              link: '/collections/all',
              title: 'Knee High'
            },
            {
              _key: '78d78ef11e92',
              _type: 'menuItem',
              link: '/collections/all',
              title: 'Wedge Heel'
            },
            {
              _key: '464ed3d96239',
              _type: 'menuItem',
              link: '/collections/all',
              title: 'High Heel'
            },
            {
              _key: '4dc9078ea908',
              _type: 'menuItem',
              link: '/collections/all',
              title: 'Mid Heel'
            }
          ],
          title: 'Boots'
        },
        {
          _key: 'db346e45d3e4',
          _type: 'column',
          menuItems: [
            {
              _key: 'a1b83c6c8be6',
              _type: 'menuItem',
              link: '/collections/all',
              title: 'Full'
            },
            {
              _key: 'd922a3052d5b',
              _type: 'menuItem',
              link: '/collections/all',
              title: 'Novelty'
            },
            {
              _key: '1c8e843dc4a4',
              _type: 'menuItem',
              link: '/collections/all',
              title: 'Mule'
            },
            {
              _key: '193859316af2',
              _type: 'menuItem',
              link: '/collections/all',
              title: 'Slipper Socks'
            }
          ],
          title: 'Slippers'
        }
      ],
      link: '/collections/all',
      menuItems: [
        {
          _key: 'c109e5a54572',
          _type: 'menuItem',
          link: '/collections/all',
          title: 'Bestsellers'
        },
        {
          _key: '7aa27230ec3a',
          _type: 'menuItem',
          link: '/collections/all',
          title: 'New In'
        },
        {
          _key: '58084cfa1ae9',
          _type: 'menuItem',
          highlight: true,
          link: '/collections/all',
          title: 'Sale'
        }
      ],
      promotionalBanner: {
        buttonLabel: 'Shop Now',
        buttonLink: '/collections/all',
        image: {
          _type: 'image',
          asset: {
            url: 'https://cdn.sanity.io/images/sv3k3p3d/development/c214b089b9ccc77537851febbaeb0a5fde20c99a-2656x192.png'
          }
        },
        subtitle: 'Limited time only. while stocks last.',
        title: 'Get set for summer with 10% off our Gardening collection'
      },
      title: "Women's"
    },
    {
      _key: 'a4e1a28337d7',
      _type: 'item',
      link: '/collections/all',
      title: "Men's"
    },
    {
      _key: 'd8192a00f3dd',
      _type: 'item',
      highlight: true,
      link: '/collections/sale',
      title: 'Sale'
    }
  ]
})
