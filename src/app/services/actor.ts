import {Graphics} from "pixi.js";
import {World} from "../interfaces/world";
import {TilePosition} from "../interfaces/tile-position";

export abstract class Actor extends Graphics {
  constructor(
    public worldInfo: World,
    public tilePosition: TilePosition
  ) {
    super();
  }
}
