/**
 * @file Defines how actions should show on a document.
 * 
 * - Defines singleton documents which shouldn't have certain actions.
 */

import defaultResolve, { DeleteAction, DuplicateAction } from 'part:@sanity/base/document-actions'

const singletons = {
  excludedActions: [
    DeleteAction,
    DuplicateAction
  ]
}

export default function resolveDocumentActions(props) {
  if (props.type.startsWith('settings')) {
    return defaultResolve(props).filter((Action) =>
      !singletons.excludedActions.includes(Action)
    )
  }

  return defaultResolve(props)
}
