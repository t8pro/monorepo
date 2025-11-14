import { Icon as DesignSystemIcon } from '@t8pro/design-system';
import type { IconName, IconProps as DesignSystemIconProps } from '@t8pro/design-system';

export interface IconProps extends Omit<DesignSystemIconProps, 'name'> {
  name: IconName;
}

export const Icon = ({ name, ...props }: IconProps) => {
  return <DesignSystemIcon name={name} {...props} />;
};

