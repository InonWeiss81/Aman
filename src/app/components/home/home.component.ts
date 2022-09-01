import { KeyValue } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { Joke } from 'src/app/models/joke';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  jokes: Joke[] = [];
  distinctedJokes: Joke[] = [];

  modalDetails: modal;
  jokeDetailsArray: { key: string, value: string }[] = [];

  moreJokesCount: number = 10;

  ngOnInit(): void {
    this.homeService.getJokes().subscribe(
      jokes => {
        this.jokes = jokes;
        this.distinctedJokes = [...new Map(this.jokes.map(item =>
          [item.id, item])).values()];
      }
    );
  }

  getJoke(joke: Joke): string {
    let result: string = '';
    switch (joke.type) {
      case 'twopart':
        result = `${joke.setup} \n ${joke.delivery}`;
        break;

      default:
        result = joke.joke;
        break;
    }
    return result;
  }

  openJokeDetails(joke: Joke, jokeModal: TemplateRef<any>) {
    let index = this.distinctedJokes.indexOf(joke);
    if (index == -1) {
      alert("Joke not found. Now THAT's a joke!");
      return;
    }

    this.modalDetails.title = 'Joke number ' + (index + 1);
    this.modalDetails.details = {
      Category: joke.category,
      Type: joke.type,
      NSFW: joke.flags.nsfw ? 'Yes' : 'No',
      Political: joke.flags.political ? 'Yes' : 'No',
      Racist: joke.flags.racist ? 'Yes' : 'No',
      Religious: joke.flags.religious ? 'Yes' : 'No',
      Sexist: joke.flags.sexist ? 'Yes' : 'No'
    }
    this.modalDetails.moreJokes = this.getMoreJokes(joke);
    of(this.setJokeDetailsArray()).subscribe(
      () => {
        this.modalService.open(jokeModal, { size: 'xl' });
      }
    );
  }

  getMoreJokes(joke: Joke): Joke[] {
    let result: Joke[] = [];
    let sameTypeJokes = this.distinctedJokes.filter(j => j.type == joke.type);
    var random: number;
    var randomJoke: Joke;
    while (result.length < this.moreJokesCount && sameTypeJokes.length > 0) {
      random = Math.floor(Math.random() * sameTypeJokes.length);
      randomJoke = sameTypeJokes[random];
      if (result.indexOf(randomJoke) == -1 && joke.id != randomJoke.id) {
        result.push(randomJoke);
      }
      sameTypeJokes.splice(random, 1);
    }
    return result;
  }

  setJokeDetailsArray() {
    if (this.modalDetails.details) {
      this.jokeDetailsArray = Object.keys(this.modalDetails.details)
        .map(key => ({ key: key, value: this.modalDetails.details![key as keyof typeof this.modalDetails.details] }));
    }
  }


  constructor(private homeService: HomeService, private modalService: NgbModal) {
    this.modalDetails = {
      title: ''
    }
  }

}

interface modal {
  title: string;
  details?: {
    Category: string;
    Type: string;
    NSFW: YesNo;
    Religious: YesNo;
    Political: YesNo;
    Racist: YesNo;
    Sexist: YesNo;
  },
  moreJokes?: Joke[]
}

type YesNo = 'Yes' | 'No'
