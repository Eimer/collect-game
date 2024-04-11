import {Unit} from "./unit";
import {World} from "../interfaces/world";
import {TilePosition} from "../interfaces/tile-position";
import {UnitInfo} from "../interfaces/unit";
import {SpawnFilters} from "../interfaces/spawn-filters";

export class Animal extends Unit {
  private _directionCounter: number = 0;
  private _directionRestrictValue: number = 100;
  private _directionValue: number = Math.floor(Math.random() * (4) + 1);

  constructor(
    public override worldInfo: World,
    public override tilePosition: TilePosition,
    public override unitInfo: UnitInfo,
    public moveFilter: SpawnFilters,
    public inGroup: boolean = false,
    public groupPosition: number = 0
  ) {
    super(worldInfo, tilePosition, unitInfo);
  }

  public patrol() {
    if (this._directionCounter < this._directionRestrictValue) {
      switch (this._directionValue) {
        case this.worldInfo.directions.north: {
          if (this.canMoveNorth() && this._canPatrol()) {
            this.tilePosition.yPosition--;
          } else {
            this.tilePosition.yPosition++;
            this._changeDirection();
          }
          break;
        }
        case this.worldInfo.directions.east: {
          if (this.canMoveEast() && this._canPatrol()) {
            this.tilePosition.xPosition++;
          } else {
            this.tilePosition.xPosition--;
            this._changeDirection();
          }
          break;
        }
        case this.worldInfo.directions.south: {
          if (this.canMoveSouth() && this._canPatrol()) {
            this.tilePosition.yPosition++;
          } else {
            this.tilePosition.yPosition--;
            this._changeDirection();
          }
          break;
        }
        case this.worldInfo.directions.west: {
          if (this.canMoveWest() && this._canPatrol()) {
            this.tilePosition.xPosition--;
          } else {
            this.tilePosition.xPosition++;
            this._changeDirection();
          }
          break;
        }
      }
      this._directionCounter++;
    } else {
      this._changeDirection();
      this._directionCounter = 0;

    }
    this.update();
  }

  private _canPatrol(): boolean {
    return (this.tilePosition.yPosition > this.moveFilter.beginPos.yPosition + this.unitInfo.radius * 2.1)
      || (this.tilePosition.xPosition > this.moveFilter.beginPos.xPosition + this.unitInfo.radius * 2.1);
  }

  private _changeDirection() {
    this._directionValue = Math.floor(Math.random() * (4) + 1);
  }

  public redrawWhenInGroup(position: TilePosition) {
    this.tilePosition.xPosition = position.xPosition + this.groupPosition * 4;
    this.tilePosition.yPosition = position.yPosition;
    this.update();
  }
}
