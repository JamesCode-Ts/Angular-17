import { Routes } from '@angular/router';
import { UsersListComponent } from './user/components/users-list/users-list.component';

export const routes: Routes = [
  { path: "", pathMatch: 'full', component: UsersListComponent },
];