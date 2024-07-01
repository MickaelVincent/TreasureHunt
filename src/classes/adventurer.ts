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
  moveForward(currentMap: Map) {
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
    // console.log(
    //   this.identifier,
    //   this.coordinates,
    //   " is moving to ",
    //   newCoordinates,
    // );
    let destination = currentMap.getDestination(
      newCoordinates[0],
      newCoordinates[1],
    );
    if (destination?.doesBlockMovement()) {
      console.log(
        "Movement blocked",
        destination.identifier,
        destination.coordinates,
      );
    } else {
      this.coordinates = newCoordinates;
      if (destination instanceof Treasure) {
        destination.onEnter(this);
      }
    }
  }

  executeNextMove(currentMap: Map) {
    const nextMove = this.movementInstruction.shift();
    switch (nextMove) {
      case Direction.Left:
        this.turnLeft();
        break;
      case Direction.Right:
        this.turnRight();
        break;
      case Direction.Up:
        this.moveForward(currentMap);
        break;
    }
  }
}

export default Adventurer;
