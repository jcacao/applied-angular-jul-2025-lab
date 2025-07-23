import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { ApiLink } from '../types';

export class LinkApiService {
  #baseUrl = 'https://links-api.fictionalcompany.com/api/links';
  #http = inject(HttpClient);

  getLinks() {
    return this.#http.get<ApiLink[]>(this.#baseUrl);
  }
}
