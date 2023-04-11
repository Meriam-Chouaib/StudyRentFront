import { useTranslation } from 'react-i18next';
import { ClipLoader } from 'react-spinners';
import { CustomBoxPosts } from './Posts.styles';
// components
import { BoxCenter, BoxPosts, ButtonWithIcon, CardPost } from '../../../components';
// mui
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

import { Box, Pagination } from '@mui/material';
import { useGetPostsQuery } from '../../../redux/api/post/post.api';
import { Post } from '../../../redux/api/post/post.types';
import { getPersistData } from '../../../utils';
import { PostsProps } from './Posts.types';
import { config } from 'yargs';
export const Posts = ({
  page,
  rowsPerPage,
  filter,
  color,
  padding,
  margin,
  withButton,
  withPagination,
}: PostsProps) => {
  const { data, isLoading, isError, error } = useGetPostsQuery({ page, rowsPerPage, filter });
  const user = getPersistData('user', true);

  const { t } = useTranslation();

  return (
    <>
      {isLoading ? (
        <BoxCenter width={'100%'} height={'100vh'}>
          <ClipLoader color="primary" size={100} />
        </BoxCenter>
      ) : (
        <CustomBoxPosts bgcolor={color} margin={margin} padding={padding}>
          <BoxPosts>
            {data?.map((post: Post) => (
              <CardPost
                title={post.title}
                // img={post.images[0].filename || ''}
                img={`${process.env.STATIC_URL}/assets/uploads/${post.images[0].fileName}`}
                city={post.city}
                price={post.price}
                isPoster={post.posterId == user.id ? true : false}
                // isPoster={post.posterId == user.id }
                key={post.id}
              />
            ))}
          </BoxPosts>
          {withButton && (
            <ButtonWithIcon
              icon={<KeyboardDoubleArrowRightIcon />}
              txt={t('home.posts_btn') as string}
            />
          )}

          {withPagination && (
            <BoxCenter paddingY={3}>
              <Pagination count={10} color="primary" />
            </BoxCenter>
          )}
        </CustomBoxPosts>
      )}
    </>
  );
};
