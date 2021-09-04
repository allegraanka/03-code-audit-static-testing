<template>
  <div class="address-fields">
    <div class="form-group">
      <div
        v-for="(field, index) in fields"
        :key="`field-${index}`"
        class="form-group__field"
      >
        <label class="form-group__label subtitle-2" :for="field.name">
          {{ field.label }}
          <template v-if="field.required">*</template>
        </label>

        <select
          v-if="field.type === 'select'"
          :id="field.name"
          v-model="input[field.name]"
          :required="field.required"
        >
          <option
            v-for="(option, optionIndex) in field.options"
            :key="`field-${field}-${optionIndex}`"
            :value="option.code"
          >
            {{ option.name }}
          </option>
        </select>

        <input
          v-else
          :id="field.name"
          v-model="input[field.name]"
          :type="field.type"
          :placeholder="field.label"
          :required="field.required"
        />
      </div>
    </div>
  </div>
</template>

<script>
import fetchCountries from '~/helpers/fetch-countries'

const fields = [
  {
    id: 'FirstName',
    name: 'firstName',
    label: 'First Name',
    type: 'text',
    required: true
  },
  {
    id: 'LastName',
    name: 'lastName',
    label: 'Last Name',
    type: 'text',
    required: true
  },
  {
    id: 'Address1',
    name: 'address1',
    label: 'Address 1',
    type: 'text',
    required: true
  },
  {
    id: 'Address2',
    name: 'address2',
    label: 'Address 2',
    type: 'text',
    required: true
  },
  {
    id: 'City',
    name: 'city',
    label: 'City',
    type: 'text',
    required: true
  },
  {
    id: 'Country',
    name: 'country',
    label: 'Country',
    type: 'select',
    options: [],
    required: true
  },
  {
    id: 'Zip',
    name: 'zip',
    label: 'Postal / Zip Code',
    type: 'text',
    required: true
  },
  {
    id: 'Phone',
    name: 'phone',
    label: 'Phone',
    type: 'tel'
  }
]

export default {
  props: {
    value: {
      type: Object,
      default: fields.reduce(
        (accumulator, current) => ({
          ...accumulator,
          [current.name]: 'test'
        }),
        {}
      )
    }
  },

  data() {
    return {
      countries: [],
      input: this.value
    }
  },

  computed: {
    /**
     * Returns the form fields.
     * @returns {Array} - The fields.
     */
    fields() {
      return fields.map((field) => {
        if (field.name === 'country') {
          const { options, ...rest } = field

          return {
            options: this.countries,
            ...rest
          }
        }

        return field
      })
    }
  },

  watch: {
    /**
     * Watches for changes to the local address object.
     * - Emits the value to the parent.
     * @param {number} value - The latest value.
     */
    input(value) {
      this.$emit('input', value)
    }
  },

  async mounted() {
    const countries = await fetchCountries()

    if (countries) {
      this.countries = countries
    }
  }
}
</script>
