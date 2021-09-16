/**
 * @file Displays the application colors.
 */

import colors from '@/styles/config/colors.scss'
import { titleCase } from '~/helpers/utils'

export default {
  title: 'Styles/Color'
}

export const All = () => ({
  data() {
    return {
      colors
    }
  },

  methods: {
    titleCase
  },

  template: `
    <div
      :style="{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '2rem'
      }"
    >
      <div
        v-for="(color, index) in colors"
        :key="index"
        :style="{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column'
        }"
      >
        <div
          :style="{
            backgroundColor: color,
            boxShadow: '0 5px 14px rgba(0, 0, 0, 0.1)',
            height: '48px',
            marginBottom: '0.5rem',
            width: '48px'
          }"
        />

        <label>
          {{ titleCase(index) }}
        </label>
      </div>
    </div>
  `
})
