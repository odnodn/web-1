import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { List } from 'immutable';
import { get } from 'lodash';
import { ObjectId } from '../../lib/objectid.helper';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { CollectionService, ICollectionService } from '../../lib/collection.service';
import { User } from './user';
import { EnvService } from '../env/env.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends CollectionService implements ICollectionService {
  collectionName: string = 'users';
  index: string = 'id,created_at';

  private _entries: BehaviorSubject<List<User>> = new BehaviorSubject(List([]));
  public readonly entries: Observable<List<User>> = this._entries.asObservable();

  constructor(
    private httpClient: HttpClient,
    private envService: EnvService
  ) {
    super();
    this.init();
    this.onCollectionInit();
  }

  async onCollectionInit(): Promise<boolean> {
    console.debug('Initializing users.service ...');
    const rows = await this.all();
    let entries = (<Object[]>rows).map((user: any) => new User(user));
    this._entries.next(List(entries));

    return true;
  }

  async onCollectionChange(change): Promise<boolean> {
    const changeType: string = change.type;
    const changedEntry: object|null = changeType === 'deleted' ? get(change, 'entry.previousValue', null) : get(change, 'entry.currentValue', null);
    const changedEntryId: string|null = get(changedEntry, 'id', null);

    if(changedEntryId === null) {
      console.log('ID for changed entry is NULL!');
      return false;
    }

    if(changeType === 'deleted') {
      this.changeEntry(this._entries, changeType, changedEntryId, undefined, false);
    } else {
      this.changeEntry(this._entries, changeType, changedEntryId, new User(changedEntry), false);
    }
    return true;
  }

  public bulkChange(bulk: List<User>) {
    this._entries.next(bulk);
  }

  public listSnapshot(): List<User> {
    return this._entries.getValue();
  }

  public show(id: string): Observable<User> {
    return this.entries.pipe(
      map((users: List<User>) => users.find(user => user.id === id))
    );
  }

  register(email: string, password: string, name: object) {
    return this.httpClient
      .post<{content: { token:  string } }>(`${this.envService.gatewayUrl()}/login`, {email, password, name})
      .pipe(tap(res => {
        localStorage.setItem('access_token', res.content.token);
      }));
  }

  login(email: string, password: string) {
    return this.httpClient
      .post<{content: { token:  string } }>(`${this.envService.gatewayUrl()}/login`, { email, password })
      .pipe(tap(res => {
        localStorage.setItem('access_token', res.content.token);
      }));
  }

  logout() {
    localStorage.removeItem('access_token');
  }

  public get isLoggedIn(): boolean {
    return localStorage.getItem('access_token') !==  null;
  }

}
