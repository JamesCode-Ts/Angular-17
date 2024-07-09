import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserService } from '../../../user/user.service';
import { TaskService } from '../../task.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HttpClient } from '@angular/common/http';
import { Task } from '../../../../task/task.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-task-details',
  standalone: true,
  providers: [TaskService], 
  imports: [
    CommonModule,
    RouterLink,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatTooltipModule,
    MatDialogModule,
  ],
  
  template: `
 <section class="container">
      <div class="container__header">
        <span>Tasks</span>
      </div>

      <table mat-table [dataSource]="userTasks()" class="mat-elevation-z8">
        <ng-container
          [matColumnDef]="column"
          *ngFor="let column of displayedColumns"
        >
          <th mat-header-cell *matHeaderCellDef>{{ column | titlecase }}</th>
          <ng-container [ngSwitch]="column" ]>
            <ng-container *ngSwitchCase="'completed'">
              <td mat-cell *matCellDef="let element">
                <mat-icon *ngIf="element[column] == true" color="accent"
                  >done</mat-icon
                >
                <mat-icon *ngIf="element[column] == false" color="warn"
                  >schedule</mat-icon
                >
              </td></ng-container
            >

            <ng-container *ngSwitchDefault
              ><td mat-cell *matCellDef="let element">
                {{ element[column] }}
              </td></ng-container
            >
          </ng-container>
        </ng-container>

        <ng-container matColumnDef="status">
          <th mat-header-cell *matHeaderCellDef>Status</th>
          <td mat-cell *matCellDef="let task">
            <button
              mat-icon-button
              [disabled]="task.completed"
              matTooltip="Click to complete task"
              color="accent"
              (click)="updteTaskStatus(task)"
            >
              <mat-icon aria-label="Edit">done_all</mat-icon>
            </button>
          </td>
        </ng-container>

        <ng-container matColumnDef="delete">
          <th mat-header-cell *matHeaderCellDef>Delete Task</th>
          <td mat-cell *matCellDef="let task">
            <button
              mat-icon-button
              (click)="deleteTask(task.id)"
              matTooltip="Click to delete task"
              color="warn"
            >
              <mat-icon aria-label="Delete">delete</mat-icon>
            </button>
          </td>
        </ng-container>


        <tr mat-header-row *matHeaderRowDef="fullColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: fullColumns"></tr>
      </table>

      <mat-divider></mat-divider>

      <div class="container__actions">
        <button mat-raised-button color="warn" routerLink="/">Back</button>
      </div>
    </section>
  `,
  styles: [
    `
      th,
      td {
        text-align: center;
      }
      .container {
        padding: 2rem 10rem;
        gap: 2rem;

        display: flex;
        flex-direction: column;
        align-items: center;

        &__header {
          > span {
            font-size: 2rem;
            line-heith: 1rem;
          }

          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          text-align: center;
        }

        &__actions {
          width: 100%;
          display: flex;
          justify-content: center;
        }
      }
    `,
  ],
})
export class TaskDetailsComponent implements OnInit {
  public displayedColumns = ['id', 'name', 'description', 'completed'];

  public fullColumns = [...this.displayedColumns, 'status', 'delete'];

  public selecterUserId!: number;

  public userService = inject(UserService);

  public taskService = inject(TaskService);

  public route = inject(ActivatedRoute);

  public tasksUrl = 'http://localhost:3000/tasks';

  public router = inject(Router);

  public http = inject(HttpClient);

  public destroyRef = inject(DestroyRef);

  public userTasks = this.taskService.userTasks;

  public ngOnInit(): void {
    this.selecterUserId = +this.route.snapshot.paramMap.get('id')!;

    if (this.selecterUserId) {
      this.userService.setSelectedUserId(this.selecterUserId);
    } else {
      this.router.navigateByUrl('/');
    }

  }

  public updteTaskStatus(task: Task): void {

    const completedTask = {
      ...task,
      completed: true,
    };

    this.http
      .put(this.tasksUrl + '/' + task.id, completedTask)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.userTasks.update((tasks) =>
            tasks.map((_task) => (_task.id === task.id ? completedTask : _task))
          );
        },
        //! Error handling
      });
  }
  public deleteTask(taskId: number): void {
    this.http
      .delete(this.tasksUrl + '/' + taskId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.taskService.userTasks.update((tasks) =>
            tasks.filter((task) => task.id !== taskId)
          );
        },
        //! Error handling
      });
  }  
}