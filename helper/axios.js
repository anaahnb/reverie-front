export class AxiosHelper {
    constructor (headers = {}) {
      this.headers = headers
    }

    getHeaders () {
      return this.headers
    }

    appendHeader (key, value) {
      this.headers = {
        ...this.headers,
        [key]: value
      }

    }
  }

export default new AxiosHelper
