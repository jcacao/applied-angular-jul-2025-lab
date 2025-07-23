// ngc

import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  resource,
  signal,
} from '@angular/core';
import { ApiLink } from '../types';
import { LinksStore } from '../services/links-store';

@Component({
  selector: 'app-links-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <p>List Goes Here</p>

    @if (store.isLoading()) {
      <div class="loading-ball loading"></div>
    } @else {
      <form class="filter">
        <input
          (click)="store.clearFilterTag()"
          class="btn btn-square"
          type="reset"
          value="×"
        />
        @for (tag of store.tags(); track tag) {
          <input
            (click)="store.setFilterTag(tag)"
            class="btn"
            type="radio"
            name="filter"
            [checked]="store.filterTag() === tag"
            [attr.aria-label]="tag"
          />
        }
      </form>

      <ul class="list rounded-box bg-base-300">
        @for (link of store.filteredLinks(); track link.id) {
          <li class="list-row mb-2">
            <div>
              <p class="text-md font-bold">{{ link.title }}</p>
              <a class="link" [href]="link.url" target="_blank">{{
                link.url
              }}</a>
            </div>
            <div></div>
            <div>
              @for (tag of link.tags; track tag) {
                <button
                  (click)="store.setFilterTag(tag)"
                  class="badge badge-primary mr-2"
                >
                  {{ tag }}
                </button>
              }
            </div>
          </li>
        } @empty {
          <p>Sorry, no links! Maybe add some?</p>
        }
      </ul>
    }
  `,
  styles: ``,
})
export class List {
  store = inject(LinksStore);
}
