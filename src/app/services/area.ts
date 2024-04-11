import {Actor} from "./actor";
import {World} from "../interfaces/world";
import {AreaInfo} from "../interfaces/area";
import {TilePosition} from "../interfaces/tile-position";

export class Area extends Actor {

  constructor(
    public worldData: World,
    public selfPosition: TilePosition,
    public areaData: AreaInfo
  ) {
    super(worldData, selfPosition);
    this._drawArea();
  }

  private _drawArea() {
    this.beginPath();
    this.fillStyle = this.areaData.color || 'black';
    this.moveTo(this.selfPosition.xPosition, this.selfPosition.yPosition);
    this.lineTo(this.areaData.width, this.selfPosition.yPosition);
    this.lineTo(this.areaData.width, this.areaData.height);
    this.lineTo(this.selfPosition.xPosition, this.areaData.height);
    this.lineTo(this.selfPosition.xPosition, this.selfPosition.yPosition);
    this.fill();
  }
}
