import {Actor} from "./actor";
import {World} from "../interfaces/world";
import {TilePosition} from "../interfaces/tile-position";
import {UnitInfo} from "../interfaces/unit";

export class Unit extends Actor {
  public radiusCoef = this.unitInfo.radius * 2.1;

  constructor(
    public override worldInfo: World,
    public override tilePosition: TilePosition,
    public unitInfo: UnitInfo
  ) {
    super(worldInfo, tilePosition);
    this._spawn();
  }

  private _drawCircle() {
    this.beginFill(this.unitInfo.color);
    this.drawCircle(this.tilePosition.xPosition, this.tilePosition.yPosition, this.unitInfo.radius);
    this.endFill();
    this.stroke('black')
  }

  private _spawn() {
    this._drawCircle()
  }

  public update() {
    this.clear();
    this._drawCircle();
  }

  public canMoveNorth(): boolean {
    return (this.tilePosition.yPosition - this.radiusCoef) > 0
  }

  public canMoveEast(): boolean {
    return this.tilePosition.xPosition < (this.worldInfo.width - this.radiusCoef)
  }

  public canMoveSouth(): boolean {
    return (this.tilePosition.yPosition + this.radiusCoef) < this.worldInfo.height
  }

  public canMoveWest(): boolean {
    return (this.tilePosition.xPosition - this.radiusCoef) > 0
  }

}
