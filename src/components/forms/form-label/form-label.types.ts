import { BaseStyleProps } from '../../component.types';

export type FormLabelProps = BaseStyleProps & {
  readonly label: string;
  readonly id: string;
};
