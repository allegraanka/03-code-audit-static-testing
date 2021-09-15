/**
 * @file Showcases base form styles.
 */

import { decorators } from '~/helpers/storybook'

export default {
  title: 'Styles/Forms',
  layout: 'centered',
  decorators: [decorators.card],

  parameters: {
    layout: 'fullscreen'
  }
}

export const TextInput = () => ({
  template: `
    <div style="margin-top: 6rem;">
      <div class="form-group">
        <div class="form-group__field">
          <p class="form-group__label subtitle-2" for="TextInput">
            Text input label
          </p>

          <input
            id="TextInput"
            type="text"
            placeholder="Label"
          />
        </div>

        <div class="form-group__field">
          <p class="form-group__label subtitle-2" for="TextAreaInput">
            Text area label
          </p>

          <p class="form-group__info">
            Optional helper text here; if message is more than one line text should wrap (~100 character count maximum)
          </p>

          <textarea
            id="TextAreaInput"
            rows="8"
            placeholder="Label"
          >
          </textarea>
        </div>
      </div>
    </div>
  `
})

export const SelectInput = () => ({
  template: `
    <div style="margin-top: 6rem;">
      <div class="form-group__field">
        <p class="form-group__label subtitle-2" for="SelectInput">
          Multiple selection
        </p>

        <select id="SelectInput">
          <option value="option1">Option 1 Option 1 Option 1 Option 1 Option 1 Option 1 Option 1 Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
          <option value="option4">Option 4</option>
        </select>
      </div>
    </div>
  `
})
