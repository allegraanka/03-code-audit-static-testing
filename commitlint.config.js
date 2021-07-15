/**
 * See Notion for full details.
 * https://www.notion.so/wemakewebsites/Naming-Conventions-3b426d0d1f414488a45dcf76e6d469b8#39baa06684a943849be83ab75dd8be6e
 */
module.exports = {
  rules: {
    'subject-min-length': [2, 'always', 5],
    'subject-empty': [2, 'never'],
    'subject-case': [2, 'always', 'sentence-case'],
    'type-case': [2, 'always', 'upper-case'],
    'type-empty': [2, 'never'],
    'type-enum': [
      2,
      'always',
      [
        'BUILD',
        'CI',
        'FEATURE',
        'FIX',
        'MERGE',
        'REFACTOR',
        'RELEASE',
        'REVERT',
        'STYLE',
        'SYNC',
        'TEST'
      ]
    ]
  }
}
