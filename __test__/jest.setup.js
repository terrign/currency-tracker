import { http, HttpResponse } from 'msw';
import { resMock } from './__mocks__/resMock';

import { setupServer } from 'msw/node';

const handlers = [
  http.get('https://api.currencyapi.com/v3/latest/', ({ request }) => {
    console.log(HttpResponse);
    return HttpResponse({ data: resMock });
  }),
];

const server = setupServer(...handlers);

server.events.on('request:start', ({ request }) => {
  console.log('Outgoing:', request.method, request.url);
});

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
