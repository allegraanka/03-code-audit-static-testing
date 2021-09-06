/**
 * @file Exports custom structure for the Studio layout.
 */

import structure from '@sanity/desk-tool/structure-builder'
import { MdSettings, MdSearch, MdTab, MdShare, MdNavigation } from 'react-icons/md'

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
                    .title('Layout')
                    .icon(MdTab)
                    .child(
                      structure
                        .list()
                        .title('Layout')
                        .items(
                          [
                            structure
                              .listItem()
                              .title('Header')
                              .child(
                                structure
                                  .editor()
                                  .id('settingsHeader')
                                  .title('Header')
                                  .schemaType('settingsHeader')
                                  .documentId('settingsHeader')
                              ),

                              structure
                                .listItem()
                                .title('Footer')
                                .child(
                                  structure
                                    .editor()
                                    .id('settingsFooter')
                                    .title('Footer')
                                    .schemaType('settingsFooter')
                                    .documentId('settingsFooter')
                                )
                          ]
                        )
                    ),

                  structure
                    .listItem()
                    .title('Navigation')
                    .icon(MdNavigation)
                    .child(
                      structure
                        .documentList()
                        .title('Navigation')
                        .filter('_type == "menu"')
                    ),

                  structure
                    .listItem()
                    .title('SEO')
                    .icon(MdSearch)
                    .child(
                      structure
                        .editor()
                        .id('settingsSeo')
                        .title('Search engine optimization')
                        .schemaType('settingsSeo')
                        .documentId('settingsSeo')
                    ),

                  structure
                    .listItem()
                    .title('Social')
                    .icon(MdShare)
                    .child(
                      structure
                        .editor()
                        .id('settingsSocial')
                        .title('Social')
                        .schemaType('settingsSocial')
                        .documentId('settingsSocial')
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
          .filter((item) =>
            !item.getId().startsWith('settings') && item.getId() !== 'menu'
          )
      ]
    )
