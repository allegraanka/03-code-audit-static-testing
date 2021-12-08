<template>
  <table>
    <thead>
      <tr>
        <th
          v-for="column in getTableHeadColumns(table.rows)"
          :key="column"
          class="subtitle-1"
        >
          {{ column }}
        </th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="row in getTableBodyRows(table.rows)" :key="row._key">
        <td v-for="column in row.cells" :key="column" class="body-1">
          {{ column }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    table: {
      type: Object,
      default: () => {}
    }
  },

  methods: {
    /**
     * Returns the table body rows
     * @param {Array} rows - All table rows.
     * @returns {Array} - The table body rows
     */
    getTableBodyRows(rows) {
      if (!rows) {
        return []
      }
      return rows.slice(1)
    },

    /**
     * Returns the table head columns.
     * @param {Array} rows - All table rows.
     * @returns {Array} - The table head cells
     */
    getTableHeadColumns(rows) {
      if (!rows) {
        return []
      }
      return rows[0].cells
    }
  }
}
</script>
