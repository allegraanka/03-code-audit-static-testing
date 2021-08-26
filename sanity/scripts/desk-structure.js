/**
 * @file Exports custom structure for the Studio layout.
 */

import structure from '@sanity/desk-tool/structure-builder'
import { MdSettings, MdSearch, MdViewAgenda } from 'react-icons/md'

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
              .list()
              .title('Preferences')
              .items(
                [
                  structure
                    .listItem()
                    .title('Search Engine Optimization')
                    .icon(MdSearch)
                    .child(
                      structure
                        .editor()
                        .id('settingsSeo')
                        .title('Search Engine Optimization')
                        .schemaType('settingsSeo')
                        .documentId('settingsSeo')
                    ),

                  structure
                    .listItem()
                    .title('Content')
                    .icon(MdViewAgenda)
                    .child(
                      structure
                        .editor()
                        .id('settingsContent')
                        .title('Content')
                        .schemaType('settingsContent')
                        .documentId('settingsContent')
                    )
                ]
              )
          ),

        structure
          .divider(),

        /**
         * Define the rest of the documents, excluding singletons.
         */
        ...structure
          .documentTypeListItems()
          .filter((item) => {
            return !item.getId().startsWith('settings')
          })
      ]
    )
