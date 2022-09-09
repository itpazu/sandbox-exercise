import { createContext } from 'react';

const CounterContext = createContext({
  // start: Boolean,
  finalFetchDuration: { [String]: Number },
  // file: Blob || null,
});

export default CounterContext;
