/**
 * @file Showcases typography styles.
 */

export default {
  title: 'Styles/Typography'
}

/**
 * Displays the "display" style headings.
 * @returns {object} - The story.
 */
export const Display = () => ({
  template: `
    <h1 class="d1">Display 1</h1>
  `
})

/**
 * Displays the "heading" styles.
 * @returns {object} - The story.
 */
export const Heading = () => ({
  template: `
    <div>
      <h1>Heading 1</h1><br />
      <h2>Heading 2</h2><br />
      <h3>Heading 3</h3><br />
      <h4>Heading 4</h4><br />
      <h5>Heading 5</h5><br />
      <h6>Heading 6</h6>
    </div>
  `
})
