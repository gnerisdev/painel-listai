import axios from 'axios'

export class ApiService {
  // #baseUrl = process.env.REACT_APP_API_URL;
  #baseUrl = 'http://127.0.0.1:3000/api';
  isAuth = false
  #hostToken;
  #_id;

  constructor(routeAuth = true) {
    if (routeAuth) {
      this.isAuth = true
      this.hostToken = localStorage.getItem('hostToken')?.toString()
      this.id = localStorage.getItem('id')?.toString()
    }
  }

  getHeaders(multipart = false) {
    const headers = {}

    if (this.isAuth) {
      if (!this?.hostToken || !this?.id)
        throw new Error('Dados de autentucação ausente!')

      headers['Authorization'] = `Bearer ${this.hostToken.replace(/"/g, '')}`
      headers['providerId'] = this.id.replace(/"/g, '')
    }

    multipart
      ? (headers['enctype'] = 'multipart/form-data')
      : (headers['Content-Type'] = 'application/json')

    return headers
  }

  verifyAuthetication(response) {
    if (response.status === 401 && this.isAuth) {
      return (window.location.href = '/login')
    }
  }

  async get(route) {
    const response = await axios.get(this.#baseUrl + route, {
      headers: this.getHeaders(),
    })

    return response;
  }

  async post(route, data, multipart = false) {
    if (!data) throw new Error('Corpo da requisição nescessário')
    const response = await axios.post(this.#baseUrl + route, data, {
      headers: this.getHeaders(multipart),
    })

    return response;
  }

  async put(route, data, multipart = false) {
    if (!data) throw new Error('Corpo da requisição nescessário')
    const response = await axios.put(this.#baseUrl + route, data, {
      headers: this.getHeaders(multipart),
    })

    return response;
  }

  async delete(route) {
    const response = await axios.delete(this.#baseUrl + route, {
      headers: this.getHeaders(),
    })

    return response;
  }
}
