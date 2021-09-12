export type Transform<ReturnType> = <ObjectType>(obj: ObjectType) => ReturnType;

export type Request<Parameters> = (params: Parameters) => Promise<any>;

export type Service<Parameters, ReturnType> = (
  params: Parameters,
) => Promise<ReturnType>;

export type ServiceFactory = <Parameters, ReturnType>(
  request: Request<Parameters>,
  transform: Transform<ReturnType>,
) => Service<Parameters, ReturnType>;
