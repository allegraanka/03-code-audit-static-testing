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
                              ),

                            structure
                              .listItem()
                              .title('Product')
                              .child(
                                structure
                                  .editor()
                                  .id('settingsProduct')
                                  .title('Product')
                                  .schemaType('settingsProduct')
                                  .documentId('settingsProduct')
                              ),

                            structure
                              .listItem()
                              .title('Cart')
                              .child(
                                structure
                                  .editor()
                                  .id('settingsCart')
                                  .title('Cart')
                                  .schemaType('settingsCart')
                                  .documentId('settingsCart')
                              ),

                            structure
                              .listItem()
                              .title('Newsletter Modal')
                              .child(
                                structure
                                  .editor()
                                  .id('settingsNewsletter')
                                  .title('Newsletter Modal')
                                  .schemaType('settingsNewsletter')
                                  .documentId('settingsNewsletter')
                              ),

                            structure
                              .listItem()
                              .title('404 Page')
                              .child(
                                structure
                                  .editor()
                                  .id('settingsErrorPage')
                                  .title('404 Page')
                                  .schemaType('settingsErrorPage')
                                  .documentId('settingsErrorPage')
                              ),

                            structure
                              .listItem()
                              .title('Account')
                              .child(
                                structure
                                  .editor()
                                  .id('settingsAccount')
                                  .title('Account')
                                  .schemaType('settingsAccount')
                                  .documentId('settingsAccount')
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
