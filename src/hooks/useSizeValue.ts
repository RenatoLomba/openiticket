export type SizeValueTypes = string | number;

export interface SizeValue {
  sm?: SizeValueTypes;
  md?: SizeValueTypes;
  lg?: SizeValueTypes;
  xs?: SizeValueTypes;
}

export type Sizes = 'lg' | 'md' | 'sm' | 'xs';

export type UseSizeFn = (
  value: SizeValue,
  size?: Sizes,
) => SizeValueTypes | undefined;

export const useSizeValue: UseSizeFn = (value, size = 'md') => {
  return value[size];
};
