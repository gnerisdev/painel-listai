import axios from 'axios';

export class PublicApiService {
  #baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:3000';

  getUrl(route) {
    const cleanRoute = route.startsWith('/') ? route : `/${route}`;
    return `${this.#baseUrl}${cleanRoute}`;
  }

  async get(route) {
    const response = await axios.get(this.getUrl(route), {
      headers: { 'Content-Type': 'application/json' },
    });
    return response;
  }

  async post(route, data) {
    if (!data) throw new Error('Corpo da requisição é necessário');
    const response = await axios.post(this.getUrl(route), data, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response;
  }

  async put(route, data) {
    if (!data) throw new Error('Corpo da requisição é necessário');
    const response = await axios.put(this.getUrl(route), data, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response;
  }

  async delete(route) {
    const response = await axios.delete(this.getUrl(route), {
      headers: { 'Content-Type': 'application/json' },
    });
    return response;
  }

  getBaseUrl() {
    return this.#baseUrl;
  }
}
