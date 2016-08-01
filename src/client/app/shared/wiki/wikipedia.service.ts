import { Injectable } from '@angular/core';
import {Jsonp, URLSearchParams, Response} from '@angular/http';
//import {Headers, Http, RequestOptions} from '@angular/http';
import { Observable }     from 'rxjs/Observable';

@Injectable()
export class WikipediaService {
    constructor(private jsonp: Jsonp) {}
    search (term: string) {
        let wikiUrl = 'http://en.wikipedia.org/w/api.php';
        let params = new URLSearchParams();
        params.set('search', term); // the user's search value
        params.set('action', 'opensearch');
        params.set('format', 'json');
        params.set('callback', 'JSONP_CALLBACK');
        // TODO: Add error handling
        return this.jsonp
            .get(wikiUrl, { search: params })
            .map(request => <string[]> request.json()[1]);
        /*let ndfUrl = 'http://rxnav.nlm.nih.gov/REST/Ndfrt';
        let queryString =
            `/search?conceptName=aspirin`;
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        console.log(headers.get('Accept')) //'image/jpeg'
        let options = new RequestOptions({ headers: headers });
        return this.jsonp
            .get(ndfUrl + queryString);*/
            //.map(request => <string[]> request.json()[1]);
        /*let heroesUrl = 'http://rxnav.nlm.nih.gov/REST/Ndfrt/search?conceptName=aspirin';  // URL to web API

            return this.http.get(heroesUrl)
                .map(this.extractData)
                .catch(this.handleError);*/
    }

    /*private heroesUrl = 'http://rxnav.nlm.nih.gov/REST/Ndfrt/search?conceptName=aspirin';  // URL to web API
    getHeroes (): Observable<String[]> {
        return this.http.get(this.heroesUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }*/
    private extractData(res: Response) {
        let body = res.json();
        return body.data || { };
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
