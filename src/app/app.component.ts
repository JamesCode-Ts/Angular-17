import { Component, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TaskService } from './task/task.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, MatToolbarModule],
  providers: [TaskService], 
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
export class AppComponent {
  public taskService = inject(TaskService);

  constructor() {
    effect(() => { // permite a execução de uma logica ao receber uma notificação do signal.
      localStorage.setItem( // a lógica é adicionar as tasks de user no local storage.
        'TASKS',
        JSON.stringify(this.taskService.userTasks()) // Onde é recebido a notificação, onde a mudança no signal,ou seja, alteração no array Task.
      );
    });
  }
}