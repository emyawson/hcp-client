import * as React from 'react';

import { CounterProps } from './counter.types';

export const Counter: React.StatelessComponent<CounterProps> = ({
  counter,
  randomCounter,
  addCounter,
  removeCounter,
}: CounterProps) => (
  <div>
    <div>
      <button onClick={addCounter}>Add Counter</button>
      Counter: {counter}
      <button onClick={removeCounter}>Remove Counter</button>
    </div>
    Random Counter: {randomCounter}
  </div>
);
