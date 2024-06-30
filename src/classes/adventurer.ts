import { Direction, Orientation } from "../types/type";
import { MapGridItem } from "./mapGridItem";

class Person implements MapGridItem {
  identifier: string;
  coordinates: [number, number];
  currentOrientation: Orientation;
  movementInstruction: Direction[];

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
  }
  doesBlockMovement() {
    return true;
  }
}

export default Person;
