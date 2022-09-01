import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Joke } from "src/app/models/joke";
import jokes from "../../data/jokes-json.json";

@Injectable()
export class HomeService {

  getJokes(): Observable<Joke[]> {
    return of(this.loadJokes());
  }

  loadJokes(): Joke[] {
    return jokes as unknown as Joke[];
  }

  constructor() { }
}

