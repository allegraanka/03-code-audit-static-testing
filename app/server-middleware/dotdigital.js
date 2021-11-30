/**
 * @file Express Middleware - Dotdigital API Middleware
 *
 * - Provides a route for each API function.
 * - All responses wrapped in predictable object.
 * - Credentials set via env
 */

const express = require('express')
const app = express()

/** Decode JSON data */
app.use(express.json())

/** Email Newsletter Subscription */
app.post('/email-newsletter', async (req, res, next) => {
  if (!req.body.email) {
    res.json({
      type: 'ApplicationError',
      status: 400,
      body: {
        message: 'Error: NO_EMAIL_PROVIDED'
      }
    })
  }
  try {
    const response = await addToAddressBook({
      email: req.body.email
    })
    res.json(response)
  } catch (error) {
    res.json(error)
  }
})

/**
 * @typedef DotdigitalAddContactToAddressBookProperties
 * @property {object} body JSON body of response.
 * @property {number} [body.id]
 * @property {string} [body.email]
 * @property {string} [body.optInType]
 * @property {string} [body.emailType]
 * @property {object[]} [body.dataFields]
 * @property {string} body.dataFields[].key
 * @property {string} body.dataFields[].value
 * @property {string} [body.status]
 */

/**
 * @typedef {DotdigitalApiResponse & DotdigitalAddContactToAddressBookProperties} DotdigitalAddContactToAddressBookResponse
 */

/**
 * Dotdigital Add to address book wrapper
 * @param {string} email Email address
 * @returns {Promise<DotdigitalAddContactToAddressBookResponse | Error>}
 *
 * - wrapper for https://developer.dotdigital.com/reference/add-contact-to-address-book
 */
async function addToAddressBook({ email }) {
  const variables = {
    optInType: 'Single',
    emailType: 'PlainText',
    email
  }

  return await dotdigitalApi({
    path: 'address-books/26692741/contacts',
    method: 'POST',
    variables
  })
}

/**
 * @typedef DotdigitalApiResponse
 * @property {'Success'|'ServerError'|'ApplicationError'|'InvalidJSON'} type Response type.
 * @property {number} status HTTP status of response.
 * @property {object} body JSON body of response.
 * @property {string} [body.message] Failure message.
 */

/**
 * Dotdigital API Wrapper.
 * @param {string} path - API path.
 * @param {'POST'|'GET'} method - Locale code to load translated content.
 * @param {object} variables - API variables.
 * @returns {Promise<DotdigitalApiResponse | Error>}
 *
 * - Wrapper for API handles POST/GET and response wrapping
 */
function dotdigitalApi({ path, method, variables }) {
  const auth = `Basic ${new Buffer.from(
    `${process.env.DOTDIGITAL_USERNAME}:${process.env.DOTDIGITAL_PASSWORD}`
  ).toString('base64')}`

  const headers = {
    Accept: 'application/json',
    Authorization: auth,
    'Content-Type': method === 'POST' ? 'application/json' : undefined
  }

  return new Promise((resolve, reject) => {
    fetch(`https://r1-api.dotdigital.com/v2/${path}`, {
      method,
      headers,
      body: method === 'POST' ? JSON.stringify(variables) : undefined
    })
      .then((response) => {
        response
          .json()
          .then((jsonResponse) => {
            if (response.ok) {
              resolve({
                type: 'Success',
                status: response.status,
                body: jsonResponse
              })
            }
            if (response.status >= 500) {
              reject({
                type: 'ServerError',
                status: response.status,
                body: jsonResponse
              })
            }
            if (response.status <= 501) {
              reject({
                type: 'ApplicationError',
                status: response.status,
                body: jsonResponse
              })
            }
          })
          .catch((error) => {
            reject({
              type: 'InvalidJSON',
              status: response.status,
              body: error
            })
          })
      })
      .catch((error) => {
        console.log(error)
        reject(error)
      })
  })
}

module.exports = app
