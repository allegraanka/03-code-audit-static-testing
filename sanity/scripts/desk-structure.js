/**
 * @file Exports custom structure for the Studio layout.
 */

import structure from '@sanity/desk-tool/structure-builder'
import { MdSettings } from 'react-icons/md'

export default () =>
  structure
    .list()
    .title('Menu')
    .items(
      [
        /**
         * Define singleton documents.
         * - Add any singleton documents above the divider.
         */
        structure
          .listItem()
          .title('Preferences')
          .icon(MdSettings)
          .child(
            structure
              .document()
              .title('Preferences')
              .schemaType('settings')
              .documentId('settings')
          ),

        structure
          .divider(),

        /**
         * Define the rest of the documents, excluding singletons.
         */
        ...structure
          .documentTypeListItems()
          .filter((item) => {
            return item.getId() !== 'settings'
          })
      ]
    )
