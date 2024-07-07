import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { User } from './user.model';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public http = inject(HttpClient);

  public userUrl = 'http://localhost:3000/users';

  private users$ = this.http.get<User[]>(this.userUrl);

  public users = toSignal(this.users$, { initialValue: [] as User[] });
}