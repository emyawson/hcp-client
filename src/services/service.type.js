export type Transform<A, B> = (X: A) => B;

export type Loader<A, B> = Transform<A, Promise<B>>;

export type Service<Query, InputType, OutputType> = (
  loader: Loader<Query, InputType>,
  transformer: Transform<InputType, OutputType>,
) => Loader<Query, OutputType>;

export type Factory<Config, Service> = Transform<Config, Service>;
