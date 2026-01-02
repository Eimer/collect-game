# Collect Animals

**Collect Animals** is a small interactive game where you control a red circle and collect white circles (“animals”) on the stage. The game is endless and challenges you to gather and deliver animals to a designated area.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.0.

## How to Install
- Clone this repository and navigate to the project directory
- Install dependencies:
  ```bash
  npm install
- Install CLI:
  ```bash
  npm install @angular/cli@16.2.0
- Use:
  ```bash
  npx ng serve
  
## Development server

Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## How to Play

- The **red circle** represents the player and appears on the stage.  
- **White circles** spawn randomly and move chaotically.  
- To start the game, **click anywhere on the stage**.  
- You can move the red circle by:
  - Clicking anywhere on the stage (the red circle will move there), or  
  - Using the **arrow keys** on your keyboard.  
- When the red circle comes close to a white circle, it “attaches” like a train. You can attach up to **5 white circles**.  
- There is a **small yellow area** on the stage. Bring the red circle (with attached white circles) into this area.  
  - The attached white circles will disappear, and your **score increases**.  
- After all white circles on the stage are collected, a new set spawns randomly. Keep collecting and delivering them to the yellow area.  
- The game continues endlessly, allowing you to challenge yourself and try to collect as many animals as possible.

## Game Features

- Endless gameplay  
- Mouse and keyboard controls  
- Score tracking  
- Randomized white circle spawn for replayability


## Simple Documentation

# Classes

## Actor
Base abstract class. Used as a parent for other objects to extend.  
It knows some information about the world and can be used to implement additional functionality in the future.

## Unit
Class that allows creating objects on a map. Extends from Actor.  
Units can be spawned, can move, and have knowledge about the world.

## Animal
Class that implements animal logic. Functions similarly to Unit and can patrol on the game scene.

## Hero
Class that implements hero logic. Extends from Unit.  
Can do everything a Unit can, can be controlled by the user, and can add animals to a group.

## WorldService
A simple service used to manipulate the world (get/set world coordinates, etc.).

## HelpersService
A simple service used to simplify some methods.  
Does not have knowledge about the world or units.
