import {TilePosition} from "./tile-position";

export interface SpawnFilters {
  beginPos: TilePosition,
  endPos: TilePosition,
  radiusCoef: number
}
