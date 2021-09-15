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

/**
 * Displays the "body" styles.
 * @returns {object} - The story.
 */
export const Body = () => ({
  template: `
    <div>
      <p class="large-body">Large body</p>
      <p class="subtitle-1">Subtitle 1</p>
      <p class="subtitle-2">Subtitle 2</p>
      <p class="body-serif">Body serif</p>
      <p class="body-1">Body 1</p>
      <p class="body-2">Body 2</p>
      <p class="caption">Caption</p>
      <p class="label">Label</p>
    </div>
  `
})
