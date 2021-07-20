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

        ...structure
          .documentTypeListItems()
          .filter((item) => {
            return item.getId() !== 'settings'
          })
      ]
    )
