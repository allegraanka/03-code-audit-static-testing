/**
 * @file Defines how actions should show on a document.
 * 
 * - Defines singleton documents which shouldn't have certain actions.
 */

import defaultResolve, { DeleteAction, DuplicateAction } from 'part:@sanity/base/document-actions'

const singletons = {
  types: [
    'settings'
  ],
  excludedActions: [
    DeleteAction,
    DuplicateAction
  ]
}

export default function resolveDocumentActions(props) {
  if (singletons.types.includes(props.type)) {
    return defaultResolve(props).filter((Action) =>
      !singletons.excludedActions.includes(Action)
    )
  }

  return defaultResolve(props)
}
