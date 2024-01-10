import { http, HttpResponse } from 'msw';
import { resMock } from './__mocks__/resMock';

import { setupServer } from 'msw/node';

const handlers = [
  http.get(
    'https://api.currencyapi.com/v3/latest/?base_currency=CHF&currencies=AUD,BHD,BRL,BTC,BYN,CAD,CHF,CNY,ETH,EUR,GBP,LTC,RUB,USD,JPY',
    () => HttpResponse.json(resMock),
  ),
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
