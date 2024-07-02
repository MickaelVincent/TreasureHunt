import { MapGridItem } from "./mapGridItem";

class Mountain implements MapGridItem {
  identifier: string = "M";
  coordinates: [number, number];

  constructor(coordinates: [number, number]) {
    this.coordinates = coordinates;
  }

  getIdentifier(): string {
    return this.identifier;
  }

  doesBlockMovement() {
    return true;
  }

  getTechnicalIdentifier(): string {
    return `M - ${this.coordinates[0]} - ${this.coordinates[1]}\n`;
  }
}

export default Mountain;
