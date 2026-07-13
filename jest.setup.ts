import '@testing-library/jest-dom'

if (typeof global.Request === 'undefined') {
  global.Request = class Request {
    url: string;
    method: string;
    body: any;
    constructor(url: string, init?: { method?: string, body?: any }) {
      this.url = url;
      this.method = init?.method || 'GET';
      this.body = init?.body;
    }
    async json() {
      if (typeof this.body === 'string') {
        return JSON.parse(this.body);
      }
      return this.body;
    }
  } as any;
  
  global.Response = class Response {
    status: number;
    body: any;
    constructor(body?: any, init?: { status?: number }) {
      this.body = body;
      this.status = init?.status || 200;
    }
    async json() {
      if (typeof this.body === 'string') {
        return JSON.parse(this.body);
      }
      return this.body;
    }
    static json(data: any, init?: { status?: number }) {
      return new Response(JSON.stringify(data), init);
    }
  } as any;
}
