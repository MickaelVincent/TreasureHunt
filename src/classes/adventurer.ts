import { OutOfBoundsError } from "../types/errors";
import { Direction, Orientation } from "../types/type";
import Map from "./map";
import { MapGridItem } from "./mapGridItem";
import Treasure from "./treasure";

class Adventurer implements MapGridItem {
  identifier: string;
  coordinates: [number, number];
  currentOrientation: Orientation;
  movementInstruction: Direction[];
  treasureCount: number;

  constructor(
    name: string,
    initialCoordinates: [number, number],
    currentOrientation: Orientation,
    movementInstruction: Direction[],
  ) {
    this.identifier = `A(${name})`;
    this.coordinates = initialCoordinates;
    this.currentOrientation = currentOrientation;
    this.movementInstruction = movementInstruction;
    this.treasureCount = 0;
  }

  getIdentifier(): any {
    return `${this.identifier}(${this.treasureCount})`;
  }

  doesBlockMovement() {
    return true;
  }

  addTreasure() {
    this.treasureCount++;
  }

  turnLeft() {
    switch (this.currentOrientation) {
      case Orientation.North:
        this.currentOrientation = Orientation.West;
        break;
      case Orientation.West:
        this.currentOrientation = Orientation.South;
        break;
      case Orientation.South:
        this.currentOrientation = Orientation.East;
        break;
      case Orientation.East:
        this.currentOrientation = Orientation.North;
        break;
    }
  }
  turnRight() {
    switch (this.currentOrientation) {
      case Orientation.North:
        this.currentOrientation = Orientation.East;
        break;
      case Orientation.East:
        this.currentOrientation = Orientation.South;
        break;
      case Orientation.South:
        this.currentOrientation = Orientation.West;
        break;
      case Orientation.West:
        this.currentOrientation = Orientation.North;
        break;
    }
  }
  moveForward(currentMap: Map, adventurers: Adventurer[]) {
    let newCoordinates: [number, number] = [
      this.coordinates[0],
      this.coordinates[1],
    ];
    switch (this.currentOrientation) {
      case Orientation.North:
        newCoordinates[1] -= 1;
        break;
      case Orientation.East:
        newCoordinates[0] += 1;
        break;
      case Orientation.South:
        newCoordinates[1] += 1;
        break;
      case Orientation.West:
        newCoordinates[0] -= 1;
        break;
    }
    let destination = currentMap.getGridItemByCoordinates(
      newCoordinates[0],
      newCoordinates[1],
    );

    if (destination?.doesBlockMovement()) {
      return false;
    } else {
      if (
        adventurers.find(
          (adventurer) =>
            adventurer.coordinates[0] === newCoordinates[0] &&
            adventurer.coordinates[1] === newCoordinates[1],
        )
      )
        return false;

      this.coordinates = newCoordinates;
      if (destination instanceof Treasure) {
        destination.onEnter(this);
      }
      return true;
    }
  }

  executeNextMove(currentMap: Map, adventurers: Adventurer[]) {
    let nextMove = this.movementInstruction[0];
    let hasMoved = false;
    try {
      switch (nextMove) {
        case Direction.Left:
          this.turnLeft();
          hasMoved = true;
          break;
        case Direction.Right:
          this.turnRight();
          hasMoved = true;
          break;
        case Direction.Up:
          hasMoved = this.moveForward(currentMap, adventurers);
          break;
      }
    } catch (error) {
      if (error instanceof OutOfBoundsError)
        console.log(
          "Adenturer named: ",
          this.identifier,
          " has encountered an error: ",
          error.message,
        );
      this.movementInstruction.shift();
    }
    if (hasMoved) {
      this.movementInstruction.shift();
    }
  }
}

export default Adventurer;
