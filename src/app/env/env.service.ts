import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { from } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
declare var window: any;

export type TEnvStatus = {
  initialized?: boolean;
  initializedCollections?: Array<string>;
  loggedIn?: boolean;
  domReady?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class EnvService {
  private _status: BehaviorSubject<TEnvStatus> = new BehaviorSubject({ 'initialized': false });
  public readonly status: Observable<TEnvStatus> = this._status.asObservable();

  private statusMap: TEnvStatus = {
    initialized: false,
    initializedCollections: [],
    loggedIn: false,
    domReady: false
  }

  constructor() {
    this.init();
  }

  public setStatusOf(property: string, value: any) {
    if(this.statusMap.hasOwnProperty(property) === true) {
      if(this.statusMap[property] !== value) {
        console.debug('Setting new env status for %s to %s ...', property, value);
        this.statusMap[property] = value;
        this._status.next(this.statusMap);
      } else {
        console.debug('Not setting env status for %s to %s, as it is already set that way.', property, value);
      }
    }
  }

  public pushToStatusOf(property: string, value: any) {
    if(this.statusMap.hasOwnProperty(property) === true) {
      if(this.statusMap[property].includes(value) !== true) {
        console.debug('Pushing new env status %s to %s ...', value, property);
        this.statusMap[property].push(value);
        this._status.next(this.statusMap);
      } else {
        console.debug('Not pushing env status %s to %s, as it is already available.', value, property);
      }
    }
  }

  public getStatus(): TEnvStatus {
    return this._status.getValue();
  }

  public async init() {
    await from(fetch('/.env.json')
      .then(function(response) {
        return response.json();
      }))
    .pipe(map((dotenv) => {
      window.dotenv = dotenv;
      return
    }))
    .toPromise();

    this.setStatusOf('initialized', true);
  }

  public get(key: string): string {
    if(window.hasOwnProperty('dotenv') && window.dotenv.hasOwnProperty(key) === true) {
      return window.dotenv[key];
    } else {
      console.debug("Cannot get %s from .env.json because it is not yet available!", key);
      return "";
    }
  }

  public gatewayUrl() {
    return this.get('apiGatewayProtocol') + '://' + this.get('apiGatewayHostPort');
  }

  public gatewayHostPort() {
    return this.get('apiGatewayProtocol');
  }

  public uiInjectCode() {
    return this.get('uiInjectCode');
  }
}
