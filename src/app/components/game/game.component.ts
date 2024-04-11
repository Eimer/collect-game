import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {Application, Renderer} from "pixi.js";
import {HelpersService} from "../../services/helpers.service";
import {WorldService} from "../../services/world.service";
import {World} from "../../interfaces/world";
import {Area} from "../../services/area";
import {SpawnFilters} from "../../interfaces/spawn-filters";
import {Animal} from "../../services/animal";
import {Hero} from "../../services/hero";
import {GroupArea} from "../../interfaces/group-area";

const numberOfAnimals: number = 20;
const addingToGroupArea: GroupArea = {xAsix: 100, yAsix: 100}
const groupLimit: number = 5;

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  providers: [WorldService, HelpersService]
})
export class GameComponent implements AfterViewInit {

  @ViewChild('game') gameContainerRef!: ElementRef;
  private _game: Application<Renderer> = new Application()
  private _animals: Animal[] = [];
  private _hero!: Hero
  public groupCounter: number = 0;
  public score: number = 0;
  private _finishArea!: Area
  private _renewAnimalCoef = 0

  constructor(
    private _helpers: HelpersService,
    private _worldInfoService: WorldService,
  ) {
  }

  ngAfterViewInit() {
    this._initGame().then(() => {
      this._finishArea = this._spawnFinishArea();
      this._spawnAnimals({
        beginPos: {xPosition: this._finishArea.width, yPosition: this._finishArea.height},
        endPos: {xPosition: this._worldInfo.width, yPosition: this._worldInfo.height},
        radiusCoef: 20
      });
      this._spawnHero();
      this._game.ticker.add(this._trackGroups, this);
      this._game.ticker.add(this._trackFinishRound, this);
    })
  }

  private async _initGame() {
    await this._game.init({
      width: this._gameContainer.clientWidth,
      height: this._gameContainer.clientHeight,
      backgroundColor: 'green',
    });
    this._gameContainer.appendChild(this._game.canvas);
    this._setWorldInfo();
  }

  private get _gameContainer() {
    return this._helpers.getNativeElement(this.gameContainerRef)
  }

  private get _worldInfo(): World {
    return this._worldInfoService.worldInfo;
  }

  private _setWorldInfo() {
    const worldDirections = {north: 1, east: 2, south: 3, west: 4}
    this._worldInfoService.setWorldInfo({
        width: this._game.renderer.width,
        height: this._game.renderer.height,
        directions: worldDirections
      }
    )
  }

  private _spawnAnimals(spawnFilters: SpawnFilters) {
    for (let i = 0; i < numberOfAnimals; i++) {
      const animalTimeSpawn = setTimeout(() => {
        this._spawnAnimal(spawnFilters);
        clearTimeout(animalTimeSpawn);
      }, this._helpers.randomize(500, 2500));
    }
  }

  private _spawnAnimal(spawnFilters: SpawnFilters) {
    const xCoord = this._helpers.randomize(
      spawnFilters.beginPos.xPosition + (spawnFilters.radiusCoef * 2),
      spawnFilters.endPos.xPosition) - (spawnFilters.radiusCoef * 2);
    const yCoord = this._helpers.randomize(
      spawnFilters.beginPos.yPosition + (spawnFilters.radiusCoef * 2),
      spawnFilters.endPos.yPosition) - (spawnFilters.radiusCoef * 2);

    const animal = new Animal(
      this._worldInfo,
      {xPosition: xCoord, yPosition: yCoord},
      {radius: 20, color: 'white'},
      spawnFilters,
    )
    this._animals.push(animal);
    this._game.stage.addChild(animal);
    this._game.ticker.add(animal.patrol, animal);
    return animal
  }

  private _spawnFinishArea() {
    const area = new Area(
      this._worldInfo,
      {xPosition: 5, yPosition: 5},
      {
        width: 100,
        height: 100,
        color: 'yellow'
      }
    );
    this._game.stage.addChild(area);
    return area;
  }

  private _spawnHero() {
    this._hero = new Hero(
      this._worldInfo,
      {
        xPosition: this._worldInfo.width / 2,
        yPosition: this._worldInfo.height / 2
      },
      {radius: 30, color: 'red'},
      this.gameContainerRef.nativeElement
    )
    this._game.stage.addChild(this._hero);
    this._game.ticker.add(() => this._hero.update())
  }

  private _trackGroups() {
    for (let i = 0; i < this._animals.length; i++) {
      if (this._ifCanAddToGroup(this._animals[i]) && !this._animals[i].inGroup) {
        this._animals[i].groupPosition = this.groupCounter;
        this._game.ticker.remove(this._animals[i].patrol, this._animals[i]);
        this._game.ticker.add(() => this._animals[i].redrawWhenInGroup({
          xPosition: this._hero.tilePosition.xPosition,
          yPosition: this._hero.tilePosition.yPosition
        }), this._animals[i]);
        this._animals[i].inGroup = true;
        this.groupCounter++;
        break;
      }
    }
  }

  private _ifCanAddToGroup(animal: Animal): boolean {
    return Math.abs((animal.tilePosition.xPosition) - this._hero.tilePosition.xPosition) < addingToGroupArea.xAsix
      && Math.abs((animal.tilePosition.yPosition) - this._hero.tilePosition.yPosition) < addingToGroupArea.yAsix
      && this.groupCounter < groupLimit
  }

  private _trackFinishRound() {
    this._renewAnimalCoef = 0;
    if (this._hero.tilePosition.xPosition < (this._finishArea.width + this._hero.unitInfo.radius - 10)
      && this._hero.tilePosition.yPosition < (this._finishArea.height + this._hero.unitInfo.radius - 10)) {
      this.score += this.groupCounter;
      this.groupCounter = 0;
      this._respawnAnimals();
    }
  }

  private _respawnAnimals() {
    for (let i = 0; i < this._animals.length; i++) {
      if (this._animals[i].inGroup) {
        this._game.stage.removeChild(this._animals[i]);
        this._renewAnimalCoef++;
      }
    }
    if (this._renewAnimalCoef === this._animals.length) {
      for (let i = 0; i < numberOfAnimals; i++) {
        this._spawnAnimal({
          beginPos: {xPosition: this._finishArea.width, yPosition: this._finishArea.height},
          endPos: {xPosition: this._worldInfo.width, yPosition: this._worldInfo.height},
          radiusCoef: 20
        });
      }
    }
  }
}
