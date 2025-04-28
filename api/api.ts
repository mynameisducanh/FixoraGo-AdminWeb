import { useNuxtApp } from '#app'

class Api {
  uri: string

  constructor(uri: string) {
    this.uri = uri;
  }

  protected request(
    method: string,
    path = '',
    data?: object,
    headers: Record<string, string> = {},
  ) {
    const { $ofetch } = useNuxtApp()
    return $ofetch(`/${this.uri}${path}`, {
      method,
      headers,
      ...(method === 'get' ? { params: data } : { body: data }),
    })
  }

  get(query: object) {
    return this.request('get', '', query)
  }

  getById(id: string | number) {
    return this.request('get', `/${id}`)
  }

  create(resource: object) {
    return this.request('post', '', resource)
  }

  update(id: string | number, resource: object) {
    return this.request('put', `/${id}`, resource)
  }

  destroy(id: string | number) {
    return this.request('delete', `/${id}`)
  }
}

export default Api;
