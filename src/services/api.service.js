import axios from 'axios';

export class ApiService {
  // #baseUrl = process.env.REACT_APP_API_URL;
  #baseUrl = 'http://127.0.0.1:3000/api';
  isAuth = false;
  #module;
  #token;
  #id;

  constructor({ module = 'users', auth = true }) {
    console.log(module, auth)
    this.module = module;
  
    if (auth) {
      this.isAuth = true;
  
      if (module === 'users') {
        this.token = localStorage.getItem('userToken')?.toString();
        this.id = localStorage.getItem('userId')?.toString();
      } else if (module === 'admin') {
        this.token = localStorage.getItem('adminToken')?.toString();
        this.id = localStorage.getItem('adminId')?.toString();
      }
    }
  }

  getHeaders(multipart = false) {
    const headers = {};

    if (this.isAuth) {
      if (!this?.token || !this?.id) throw new Error('Dados de autentucação ausente!');
      
      headers['Authorization'] = `Bearer ${this.token.replace(/"/g, '')}`;

      if (this.module === 'users') {
        headers['user_id'] = this.id.replace(/"/g, '');
      } else if (this.module === 'admin') {
        headers['admin_id'] = this.id.replace(/"/g, '');
      }
    }

    multipart
      ? (headers['enctype'] = 'multipart/form-data')
      : (headers['Content-Type'] = 'application/json');

    return headers;
  }

  verifyAuthetication(response) {
    if (response.status === 401 && this.isAuth) {
      return (window.location.href = '/login');
    }
  }

  async get(route) {
    const response = await axios.get(this.#baseUrl + route, {
      headers: this.getHeaders(),
    });

    return response;
  }

  async post(route, data, multipart = false) {
    if (!data) throw new Error('Corpo da requisição nescessário');
    const response = await axios.post(this.#baseUrl + route, data, {
      headers: this.getHeaders(multipart),
    });

    return response;
  }

  async put(route, data, multipart = false) {
    if (!data) throw new Error('Corpo da requisição nescessário');
    const response = await axios.put(this.#baseUrl + route, data, {
      headers: this.getHeaders(multipart),
    });

    return response;
  }

  async delete(route) {
    const response = await axios.delete(this.#baseUrl + route, {
      headers: this.getHeaders(),
    });

    return response;
  }

  async externalQuery(url, method, data, headers) {
    if (!url) throw new Error('A URL é obrigatória.');
    const response = await axios({ method, url, headers: headers || {}, data });

    return response;
  }
}
