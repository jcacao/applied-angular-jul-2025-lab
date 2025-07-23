// ngc

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LinksStore } from '../services/links-store';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-links-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <div class="h-4">
      @if (store.isFetching()) {
        <progress class="progress w-full"></progress>
      }
    </div>

    @if (store.isLoading()) {
      <div class="loading-ball loading"></div>
    } @else {
      <div class="p-4">
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
      </div>
      <ul class="list rounded-box bg-base-300">
        @for (link of store.filteredLinks(); track link.id) {
          <li class="list-row mb-2">
            <div>
              <p class="text-md font-bold">{{ link.title }}</p>
              <a class="link" [href]="link.url" target="_blank">{{
                link.url
              }}</a>
            </div>
            <div>
              @if (link.isOwnedByCurrentUser) {
                <a
                  [routerLink]="['..', link.id, 'edit']"
                  class="btn btn-sm btn-accent"
                  >Edit Your Link</a
                >
              }
            </div>
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
