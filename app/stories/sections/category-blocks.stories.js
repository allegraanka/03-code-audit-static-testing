/**
 * @file The story for the category blocks section.
 */

import CategoryBlocks from '~/sections/CategoryBlocks'

export default {
  title: 'Sections/Category Blocks',
  component: CategoryBlocks,

  parameters: {
    layout: 'fullscreen'
  }
}

/**
 * Returns the base story.
 * @returns {object} - The story.
 */
export const Base = () => ({
  components: {
    CategoryBlocks
  },

  data() {
    return {
      title: 'Our Popular Categories',
      subtitle: 'Discover',
      rows: [
        {
          _key: '28cad4b60b6b',
          blocks: [
            {
              _key: '810eb3d7aa54',
              image: {
                asset: {
                  url: 'https://cdn.sanity.io/images/sv3k3p3d/development/de146c0db7cb529cf5ecedc0c3257df2b92f660e-208x208.png'
                }
              },
              link: '/collections/all',
              title: 'Shop Smart & Formal'
            },
            {
              _key: 'cd9894f16b6c',
              image: {
                asset: {
                  url: 'https://cdn.sanity.io/images/sv3k3p3d/development/05e1507140b41feb6ab253f327cf315fe4d7cec7-208x208.png'
                }
              },
              link: '/collections/all',
              title: 'Shop Casual'
            },
            {
              _key: 'e8f6895470cb',
              image: {
                asset: {
                  url: 'https://cdn.sanity.io/images/sv3k3p3d/development/e9315cd35e701cf37ecdec2b4254a3c888011e2a-208x208.png'
                }
              },
              link: '/collections/all',
              title: 'Shop Heels'
            },
            {
              _key: '048aaca54783',
              image: {
                asset: {
                  url: 'https://cdn.sanity.io/images/sv3k3p3d/development/de2058219f373268eae4063c115ba82dc2aa351f-208x208.png'
                }
              },
              link: '/collections/all',
              title: 'Shop Flats'
            },
            {
              _key: '39be045b2690',
              image: {
                asset: {
                  url: 'https://cdn.sanity.io/images/sv3k3p3d/development/bda61e119d5b7bc208b017146348ad8594a3c9be-208x208.png'
                }
              },
              link: '/collections/all',
              title: 'Shop Wedges'
            },
            {
              _key: '7e40454641a4',
              image: {
                asset: {
                  url: 'https://cdn.sanity.io/images/sv3k3p3d/development/96909277be5d1472937d673eb25b1cfa5b975585-208x208.png'
                }
              },
              link: '/collections/all',
              title: 'Shop Lace Ups'
            }
          ]
        },
        {
          _key: '6ac038ced764',
          blocks: [
            {
              _key: '40bf49ce28c3',
              image: {
                asset: {
                  url: 'https://cdn.sanity.io/images/sv3k3p3d/development/8e00b676e38fa6a9c9e4cccc024a0132024e7bee-320x320.png'
                }
              },
              link: '/collections/all',
              title: 'Shop Shoes'
            },
            {
              _key: 'de4c4df15796',
              image: {
                asset: {
                  url: 'https://cdn.sanity.io/images/sv3k3p3d/development/b91942dc2bffa2e9cc3485e9768ba90bf3aeb885-320x320.png'
                }
              },
              link: '/collections/all',
              title: 'Shop Trainers'
            },
            {
              _key: 'a198b7bd3c4a',
              image: {
                asset: {
                  url: 'https://cdn.sanity.io/images/sv3k3p3d/development/c6df6d346033c06df352c271dbd80310a0aeb40c-320x320.png'
                }
              },
              link: '/collections/all',
              title: 'Shop Boots'
            },
            {
              _key: 'afc1a23b5364',
              image: {
                asset: {
                  url: 'https://cdn.sanity.io/images/sv3k3p3d/development/ee09c8ea7ed176823685d4b8049daa16d318abfb-320x320.png'
                }
              },
              link: '/collections/all',
              title: 'Shop Sandals'
            }
          ]
        },
        {
          _key: '41a2ed019255',
          blocks: [
            {
              _key: '30966944f32e',
              image: {
                _type: 'image',
                asset: {
                  url: 'https://cdn.sanity.io/images/sv3k3p3d/development/d09054ae943f5aa48306fc56f63370ff8238216e-656x303.png'
                }
              },
              link: '/collections/all',
              title: 'Shop Mens'
            },
            {
              _key: '81fa28c89081',
              image: {
                _type: 'image',
                asset: {
                  url: 'https://cdn.sanity.io/images/sv3k3p3d/development/38f4e2f2da72c62dff9735d3fe554117b31069ff-656x303.png'
                }
              },
              link: '/collections/all',
              title: 'Shop Garden Collection'
            }
          ]
        }
      ]
    }
  },

  template: `
    <div style="margin: 3rem 0;">
      <category-blocks
        :title="title"
        :subtitle="subtitle"
        :rows="rows"
      />
    </div>
  `
})
