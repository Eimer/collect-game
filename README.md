# CollectAnimals

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.0.

## Run application

Clone this project, then run 'npm install' command to update all packages. 
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/game`.

##Simple documentation

# Classes

## Actor - base abstract class that can anithing. Usign just for others object to extend. It know some info about a world.
Can be using to implements something in a future

## Unit - class that provide to create some objects on a map. Exdends from Actor. Can be spawned, can move and know info about a world

## Animal - class that implemets an animal logic do everithing same unit and can patrol on a game scene

## Hero - class that implemets a hero logic. Extends from Unit. Can do everething same unit, can be moved by user, can add an animal to group

## World-service - simple service that can be using to manipulate a world (get/set world coords, e.t.c)

## Helpers-service - simple service that can be using to simplify some methods. Do not know about a world and units
