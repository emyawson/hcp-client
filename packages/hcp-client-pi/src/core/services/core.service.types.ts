export type Transform<ReturnType> = <ObjectType>(obj: ObjectType) => ReturnType;

export type Requester<Parameters> = (params: Parameters) => Promise<any>;

export type Service<Parameters, ReturnType> = (
  params: Parameters,
) => Promise<ReturnType>;

export type ServiceFactory = <Parameters, ReturnType>(
  requester: Requester<Parameters>,
  transform: Transform<ReturnType>,
) => Service<Parameters, ReturnType>;
