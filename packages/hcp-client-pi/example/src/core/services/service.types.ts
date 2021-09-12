export type Transform<ReturnType> = <ObjectType>(obj: ObjectType) => ReturnType;

export type Request<Parameters> = (params: Parameters) => Promise<any>;

export type Service = <ReturnType, Parameters>(
  request: Request<Parameters>,
  transform: Transform<ReturnType>,
) => (params: Parameters) => Promise<ReturnType>;
