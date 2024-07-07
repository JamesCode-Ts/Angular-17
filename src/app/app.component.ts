import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, MatToolbarModule],
  template: `
    <section>
      <mat-toolbar color="primary">
        <span routerLink="/">Signals Crud</span>
      </mat-toolbar>

      <router-outlet />
    </section>
  `,
  styles: [
    `
      span {
        cursor: pointer;
      }
      mat-toolbar {
        justify-content: space-between;
      }
    `,
  ],
})
export class AppComponent {}