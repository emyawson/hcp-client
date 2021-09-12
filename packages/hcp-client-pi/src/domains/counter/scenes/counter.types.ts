export type CounterProps = {
  readonly counter: number;
  readonly randomCounter: number;
  readonly addCounter: () => void;
  readonly removeCounter: () => void;
  readonly startRandomCounter: () => void;
  readonly stopRandomCounter: () => void;
};
