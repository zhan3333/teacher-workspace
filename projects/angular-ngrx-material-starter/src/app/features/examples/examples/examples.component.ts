import { Store, select } from '@ngrx/store';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';

import {
  routeAnimations,
  selectIsAuthenticated
} from '../../../core/core.module';

import { State } from '../examples.state';

@Component({
  selector: 'workspace-examples',
  templateUrl: './examples.component.html',
  styleUrls: ['./examples.component.scss'],
  animations: [routeAnimations],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExamplesComponent implements OnInit {
  isAuthenticated$: Observable<boolean> | undefined;

  examples = [
    { link: 'todos', label: 'workspace.examples.menu.todos' },
    { link: 'stock-market', label: 'workspace.examples.menu.stocks' },
    { link: 'theming', label: 'workspace.examples.menu.theming' },
    { link: 'crud', label: 'workspace.examples.menu.crud' },
    {
      link: 'simple-state-management',
      label: 'workspace.examples.menu.simple-state-management'
    },
    { link: 'form', label: 'workspace.examples.menu.form' },
    { link: 'notifications', label: 'workspace.examples.menu.notifications' },
    { link: 'elements', label: 'workspace.examples.menu.elements' },
    { link: 'authenticated', label: 'workspace.examples.menu.auth', auth: true }
  ];

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.isAuthenticated$ = this.store.pipe(select(selectIsAuthenticated));
  }
}
