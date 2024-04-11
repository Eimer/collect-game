import {Unit} from "./unit";
import {World} from "../interfaces/world";
import {TilePosition} from "../interfaces/tile-position";
import {UnitInfo} from "../interfaces/unit";
import {fromEvent, pipe} from "rxjs";

export class Hero extends Unit {
  constructor(
    public override worldInfo: World,
    public override tilePosition: TilePosition,
    public override unitInfo: UnitInfo,
    public gameContainer: Element,
  ) {
    super(worldInfo, tilePosition, unitInfo);
    this.moveHero();
  }

  private _onKeyPressed(key: string) {
    switch (key) {
      case 'ArrowUp': {
        if (this.canMoveNorth()) {
          this.tilePosition.yPosition -= 3;
        }
        break;
      }
      case 'ArrowRight': {
        if (this.canMoveEast()) {
          this.tilePosition.xPosition += 3;
        }
        break;
      }
      case 'ArrowDown': {
        if (this.canMoveSouth()) {
          this.tilePosition.yPosition += 3;
        }
        break;
      }
      case 'ArrowLeft': {
        if (this.canMoveEast()) {
          this.tilePosition.xPosition -= 3;
        }
        break;
      }
    }
    this.update();
  }

  private _onMouseClicked(event: any) {
    this.tilePosition.xPosition = event.offsetX;
    this.tilePosition.yPosition = event.offsetY;
    this.update();
  }

  public moveHero() {
    fromEvent(this.gameContainer, 'click').pipe()
      .subscribe((e: any) => {
        this._onMouseClicked((e));
      });

    fromEvent(document, 'keydown').pipe()
      .subscribe((e: any) => {
        this._onKeyPressed(e.key);
      })
  }
}
