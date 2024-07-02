export interface MapGridItem {
  getIdentifier(): string;
  identifier: string;
  coordinates: [number, number];
  doesBlockMovement: () => boolean;
  getTechnicalIdentifier: () => string;
}
