/**
 * @file Fetches all countries with codes.
 */

const query = `
  query countries($locale: SupportedLocale!) {
    countries(locale: $locale) {
      name
      code
      zones {
        name
        code
      }
    }
  }
`

export default () => {
  const config = {
    endpoint: 'https://country-service.shopifycloud.com/graphql'
  }

  return fetch(config.endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      query,
      operationName: 'countries',
      variables: {
        locale: 'EN'
      }
    })
  })
    .then((response) => response.json())
    .then(({ data }) => data.countries)
}
