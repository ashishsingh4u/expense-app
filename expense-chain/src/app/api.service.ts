import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import {Block} from './block.helper';

const API_URL = environment.apiUrl;

@Injectable()
export class ApiService {

  constructor(private http: Http) { }

  public getBlocks(): Observable<Block[]> {
    return this.http
    .get(API_URL + '/blocks')
    .map(response => {
      const blocks = response.json();
      return blocks.map((block) => Block.populateBlock(block));
    })
    .catch(this.handleError);
  }

  public createBlock(block: Block): Observable<Block> {
    return this.http
    .post(API_URL + '/blocks', block)
    .map(response => {
      return Block.populateBlock(response.json());
    })
    .catch(this.handleError);
  }

  private handleError (error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }

}
