import { LucideProps, icons } from 'lucide-react';

export interface IconProps extends LucideProps {
  name: keyof typeof icons;
}

const Icon = ({ name, color, size, ...rest }: IconProps) => {

  const LucideIcon = icons[name];

  return <LucideIcon {...rest} color={color} size={size} />;
};

export default Icon;