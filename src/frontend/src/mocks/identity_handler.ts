import { http, HttpResponse, delay } from 'msw';

export const identity_handlers = [
  http.get('https://identity.company.com/profile', async () => {
    await delay();
    return HttpResponse.json({
      sub: 'b398939',
      roles: [],
    });
  }),
];
