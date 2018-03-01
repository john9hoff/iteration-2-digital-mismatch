import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';

import {Tracker} from './tracker';
import {environment} from '../../environments/environment';


@Injectable()
export class TrackerListService {
    readonly baseUrl: string = environment.API_URL + 'trackers';
    private trackerUrl: string = this.baseUrl;

    constructor(private http: HttpClient) {
    }

    getTrackers(trackerCompany?: string): Observable<Tracker[]> {
        this.filterByCompany(trackerCompany);
        return this.http.get<Tracker[]>(this.trackerUrl);
    }

    getTrackerById(id: string): Observable<Tracker> {
        return this.http.get<Tracker>(this.trackerUrl + '/' + id);
    }

    /*
    //This method looks lovely and is more compact, but it does not clear previous searches appropriately.
    //It might be worth updating it, but it is currently commented out since it is not used (to make that clear)
    getTrackersByCompany(trackerCompany?: string): Observable<Tracker> {
        this.trackerUrl = this.trackerUrl + (!(trackerCompany == null || trackerCompany == "") ? "?company=" + trackerCompany : "");
        console.log("The url is: " + this.trackerUrl);
        return this.http.request(this.trackerUrl).map(res => res.json());
    }
    */

    filterByCompany(trackerCompany?: string): void {
        if (!(trackerCompany == null || trackerCompany === '')) {
            if (this.parameterPresent('company=') ) {
                // there was a previous search by company that we need to clear
                this.removeParameter('company=');
            }
            if (this.trackerUrl.indexOf('?') !== -1) {
                // there was already some information passed in this url
                this.trackerUrl += 'company=' + trackerCompany + '&';
            } else {
                // this was the first bit of information to pass in the url
                this.trackerUrl += '?company=' + trackerCompany + '&';
            }
        } else {
            // there was nothing in the box to put onto the URL... reset
            if (this.parameterPresent('company=')) {
                let start = this.trackerUrl.indexOf('company=');
                const end = this.trackerUrl.indexOf('&', start);
                if (this.trackerUrl.substring(start - 1, start) === '?') {
                    start = start - 1;
                }
                this.trackerUrl = this.trackerUrl.substring(0, start) + this.trackerUrl.substring(end + 1);
            }
        }
    }

    private parameterPresent(searchParam: string) {
        return this.trackerUrl.indexOf(searchParam) !== -1;
    }

    // remove the parameter and, if present, the &
    private removeParameter(searchParam: string) {
        const start = this.trackerUrl.indexOf(searchParam);
        let end = 0;
        if (this.trackerUrl.indexOf('&') !== -1) {
            end = this.trackerUrl.indexOf('&', start) + 1;
        } else {
            end = this.trackerUrl.indexOf('&', start);
        }
        this.trackerUrl = this.trackerUrl.substring(0, start) + this.trackerUrl.substring(end);
    }

    addNewTracker(newTracker: Tracker): Observable<{'$oid': string}> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
        };

        // Send post request to add a new tracker with the tracker data as the body with specified headers.
        return this.http.post<{'$oid': string}>(this.trackerUrl + '/new', newTracker, httpOptions);
    }
}
