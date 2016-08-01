import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class NdfService {

  constructor(private http: Http) {}

  get(): Observable<string[]> {
    let headers = new Headers();
    //headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    console.log(headers.get('Accept')); //'image/jpeg'
    let options = new RequestOptions({ headers: headers });
    return this.http.get('http://rxnav.nlm.nih.gov/REST/Ndfrt/search?conceptName=aspirin')
      .map((res: Response) => res)
      .catch(this.handleError);
  }

  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}

