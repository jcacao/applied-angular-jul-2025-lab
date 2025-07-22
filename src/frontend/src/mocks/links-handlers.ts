import { http, HttpResponse, delay } from 'msw';
const FAKE_LINKS = [
  {
    id: '1',
    title: 'Angular Documentation',
    url: 'https://angular.io/docs',
    tags: ['angular', 'documentation'],
    dateAdded: new Date('2023-01-01'),
    owner: 'b393939',
  },
  {
    id: '2',
    title: 'React Documentation',
    url: 'https://reactjs.org/docs/getting-started.html',
    tags: ['react', 'documentation'],
    dateAdded: new Date('2024-04-20'),
    owner: 'b398939',
  },
  {
    id: '3',
    title: 'Typescript Handbook',
    url: 'https://www.typescriptlang.org/docs/handbook/intro.html',
    tags: ['typescript', 'documentation'],
    dateAdded: new Date('2025-06-30'),
    owner: 'y393939',
  },
  {
    id: '4',
    title: 'Mozilla Developer Network',
    url: 'https://developer.mozilla.org/en-US/',
    tags: ['web', 'documentation', 'html', 'css', 'javascript'],
    dateAdded: new Date('2023-03-15'),
    owner: 'b393939',
  },
];
export const links_handers = [
  http.get('https://links-api.fictionalcompany.com/api/links', async () => {
    await delay();

    // return HttpResponse.json([]);
    return HttpResponse.json(FAKE_LINKS);
  }),
];
