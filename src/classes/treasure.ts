import Adventurer from "./adventurer";
import { MapGridItem } from "./mapGridItem";

class Treasure implements MapGridItem {
  identifier: string = "T";
  coordinates: [number, number];
  quantity: number;

  constructor(coordinates: [number, number], quantity: number) {
    this.coordinates = coordinates;
    this.quantity = quantity;
  }
  getIdentifier(): string {
    return `T(${this.quantity})`;
  }

  getQuantity() {
    return this.quantity;
  }

  decreaseQuantity() {
    if (this.quantity > 0) this.quantity--;
  }

  doesBlockMovement() {
    return false;
  }

  onEnter(adventurer: Adventurer) {
    if (this.quantity > 0) {
      this.decreaseQuantity();
      adventurer.addTreasure();
    }
  }
}

export default Treasure;
