export {};

declare global {
  declare interface Class {
    new (...args): InstanceType;
  }
}
