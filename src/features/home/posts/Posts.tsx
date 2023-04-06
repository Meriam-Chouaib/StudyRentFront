import { fakeData } from './fakeData';
import { useTranslation } from 'react-i18next';
import { ClipLoader } from 'react-spinners';
import { CustomBoxPosts } from './Posts.styles';
// components
import { BoxPosts } from '../../../components';
import { CardPost } from '../../../components';
import { ButtonWithIcon } from '../../../components';
// mui
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

import { useGetPostsQuery } from '../../../redux/api/post/post.api';
import { PostsProps } from './Posts.types';
import { Post } from '../../../redux/api/post/post.types';
import { Typography } from '@mui/material';
import { getPersistData } from '../../../utils';
export const Posts = ({
  page,
  rowsPerPage,
  filter,
  color,
  padding,
  margin,
  withButton,
}: PostsProps) => {
  const { data, isLoading, isError, error } = useGetPostsQuery({ page, rowsPerPage, filter });
  const user = getPersistData('user', true);

  const { t } = useTranslation();

  return (
    <>
      {isLoading ? (
        <ClipLoader color="#ffffff" size={20} />
      ) : (
        <CustomBoxPosts bgcolor={color} margin={margin} padding={padding}>
          <BoxPosts>
            {data?.map((post: Post) => (
              <CardPost
                title={post.title}
                img={post.files[0]?.filename || ''}
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
        </CustomBoxPosts>
      )}
    </>
  );
};
