import {ElementRef, Injectable} from '@angular/core';
import {World} from "../interfaces/world";
import {RandomSpawnPosition} from "../interfaces/random-spawn-position";

@Injectable()
export class HelpersService {

  constructor() {
  }

  public getNativeElement(elementRef: ElementRef): Element {
    return elementRef.nativeElement;
  }

  public randomize(min: number, max: number): number {
    const minValue = Math.ceil(min);
    const maxValue = Math.floor(max);

    return Math.floor(Math.random() * (maxValue - minValue) + minValue);
  }

}
