import {Injectable} from '@angular/core';
import {World} from "../interfaces/world";

@Injectable()
export class WorldService {

  private _worldInfo!: World

  constructor() {
  }

  public get worldInfo() {
    return this._worldInfo;
  }

  public setWorldInfo(info: World) {
    this._worldInfo = info;
  }

}
