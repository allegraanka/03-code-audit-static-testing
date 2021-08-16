/**
 * @file Defines how actions should show on a document.
 * 
 * - Defines one-off documents which shouldn't have certain actions.
 */

import defaultResolve, { DeleteAction, DuplicateAction } from 'part:@sanity/base/document-actions'

const oneOff = {
  types: [
    'settings'
  ],
  excludedActions: [
    DeleteAction,
    DuplicateAction
  ]
}

export default function resolveDocumentActions(props) {
  if (oneOff.types.includes(props.type)) {
    return defaultResolve(props).filter((Action) =>
      !oneOff.excludedActions.includes(Action)
    )
  }

  return defaultResolve(props)
}
