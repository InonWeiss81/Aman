import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

@Injectable()
export class LoginService {
  login(username: string, password: string): Observable<boolean> {
    return of(this.authenticate(username, password));
  }

  authenticate(username: string, password: string): boolean {
    return username == 'aman' && password == 'aman';
  }


  constructor() { }
}

