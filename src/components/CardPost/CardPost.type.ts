import { CardProps } from '@mui/material';

export interface CardPostProps extends CardProps {
  title: string;
  price: number;
  city: string;
  img: string;
  isHovered?: boolean;
  idPost: number;
  isPoster?: boolean;
  PosterId?: number;
  isHomePage?: boolean;
  isDashboard?: boolean;
}
export interface ItemProps {
  label: string;
  txt: string;
}
