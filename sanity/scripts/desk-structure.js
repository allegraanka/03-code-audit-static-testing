/**
 * @file Exports custom structure for the Studio layout.
 */

import structure from '@sanity/desk-tool/structure-builder'
import { MdSettings } from 'react-icons/md'
import React from 'react'

/**
 * Creates an iFrame with either the local or remote previews.
 * 
 * @param {Object} context - The document data.
 * @returns 
 */
const PagePreview = ({ document }) => {
  let local = 'http://localhost:3000'
  let remote = 'https://pavers-preview.vercel.app'

  const { displayed } = document

  if (displayed.handle.current !== '/') {
    local += '/pages/'
    remote += '/pages/'
  }

  const url = window.location.hostname === 'localhost'
    ? local
    : remote

  return (
    <iframe
      src={`${url}${displayed.handle.current}`}
      frameBorder={0}
      height="100%"
      width="100%"
    />
  )
}

/**
 * Returns the default document structure.
 * - Returns previews when type is `page`.
 * 
 * @param {Object} context - The document data. 
 * @returns 
 */
export const getDefaultDocumentNode = ({ schemaType }) => {
  if (schemaType === 'page') {
    return structure
      .document()
      .views(
        [
          structure.view.form(),
          structure.view.component(PagePreview).title('Web')
        ]
      )
  }
}

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
