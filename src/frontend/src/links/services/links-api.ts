import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ApiLink } from '../types';

export type ApiLinkCreate = Omit<ApiLink, 'id' | 'dateAdded' | 'owner'>;
export class LinkApiService {
  #baseUrl = 'https://links-api.fictionalcompany.com/api/links';
  #http = inject(HttpClient);

  getLinks() {
    return this.#http.get<ApiLink[]>(this.#baseUrl);
  }

  // Not going to use this, but just showing it FYI
  getLinksAsSignal() {
    return toSignal(this.#http.get<ApiLink[]>(this.#baseUrl));
  }

  addLink(link: ApiLinkCreate) {
    return this.#http.post<ApiLink>(this.#baseUrl, link);
  }
}
