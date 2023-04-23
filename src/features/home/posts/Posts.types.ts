import { Post } from '../../../redux/api/post/post.types';

export interface PostsProps {
  page: number;
  rowsPerPage: number;
  filter?: Filter;
  color?: string;
  padding?: string;
  margin?: string;
  withButton?: boolean;
  withPagination?: boolean;
  isHomePage?: boolean;
  isDashboard?: boolean;
  dataPosts?: Post[];
  isLoading: boolean;
  onChangePage: (page: number) => void;
}
export interface Filter {
  arg: string;
  value: string;
}
