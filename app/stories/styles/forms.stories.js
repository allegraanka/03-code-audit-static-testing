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
          <p class="form-group__label subtitle-2">
            Text input label
          </p>

          <input
            id="TextInput"
            type="text"
            placeholder="Label"
          />
        </div>

        <div class="form-group__field">
          <p class="form-group__label subtitle-2">
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

export const SelectionInput = () => ({
  template: `
    <div style="margin-top: 6rem;">
      <div class="form-group__field">
        <p class="form-group__label subtitle-2">
          Multiple selection
        </p>

        <select id="SelectInput">
          <option value="option1">Option 1 Option 1 Option 1 Option 1 Option 1 Option 1 Option 1 Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
          <option value="option4">Option 4</option>
        </select>
      </div>

      <div class="form-group__field">
        <p class="form-group__label subtitle-2">
          Checkbox
        </p>

        <div class="checkbox__container">
          <input
            id="CheckboxActive"
            type="checkbox"
            class="checkbox__input"
            checked
          />

          <label for="CheckboxActive" class="checkbox__label">
            Option 1 can go here with some option long-form content, which is content that spans multiple lines in it's container.
          </label>
        </div>

        <div class="checkbox__container">
          <input
            id="CheckboxInactive"
            type="checkbox"
            class="checkbox__input"
          />

          <label for="CheckboxInactive" class="checkbox__label">Inactive</label>
        </div>

        <div class="checkbox__container">
          <input
            id="CheckboxDisabled"
            type="checkbox"
            class="checkbox__input"
            disabled
          />

          <label for="CheckboxDisabled" class="checkbox__label">Disabled</label>
        </div>
      </div>

      <div class="form-group__field">
        <p class="form-group__label subtitle-2">
          Radio
        </p>

        <div class="radio__container">
          <input
            id="RadioActive"
            type="radio"
            class="radio__input"
            checked
          />

          <label for="RadioActive" class="radio__label">Active</label>
        </div>

        <div class="radio__container">
          <input
            id="RadioInactive"
            type="radio"
            class="radio__input"
          />

          <label for="RadioInactive" class="radio__label">Inactive</label>
        </div>

        <div class="radio__container">
          <input
            id="RadioDisabled"
            type="radio"
            class="radio__input"
            disabled
          />

          <label for="RadioDisabled" class="radio__label">Disabled</label>
        </div>
      </div>
    </div>
  `
})
