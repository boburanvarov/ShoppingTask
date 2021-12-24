import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SearchService {

    private messageSource = new BehaviorSubject({type: '', filter: ''});
    currentMessage = this.messageSource.asObservable();

    constructor() { }

    search(message: any) {
        this.messageSource.next(message);
    }

}