// import { http, HttpResponse } from 'msw';
// import { resMock } from './__mocks__/resMock';

// import { setupServer } from 'msw/node';
// import { mapSpec } from './__mocks__/mapSpec';
// import currencyApi from '../src/services/currencyApi.service';

// const handlers = [
//   http.get('https://api.currencyapi.com/v3/latest/', ({ request }) => {
//     return HttpResponse({ data: resMock });
//   }),
//   http.get('https://tiles.basemaps.cartocdn.com/gl/voyager-gl-style/style.json', ({ request }) => {
//     return HttpResponse('');
//   }),
// ];

// const server = setupServer(...handlers);

// server.events.on('request:start', ({ request }) => {
//   console.log('Outgoing:', request.method, request.url);
// });

// beforeAll(() => {
//   server.listen();
// });

// afterEach(() => {
//   server.resetHandlers();
// });

// afterAll(() => {
//   server.close();
// });

import currencyApi from '../src/services/currencyApi.service';
import { resMock } from './__mocks__/resMock';
jest.spyOn(currencyApi, 'getAllCurrencyRates').mockReturnValue(Promise.resolve({ data: resMock }));
