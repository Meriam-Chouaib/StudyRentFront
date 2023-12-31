// react
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

// components
import { BoxEditDelete } from './BoxEditDelete/BoxEditDelete';
import { BoxHoverEye, CardPostStyled, IconCard } from './CardPost.style';
import { CardPostProps } from './CardPost.type';
import { InfoCard } from './InfoCard';

// mui

import VisibilityIcon from '@mui/icons-material/Visibility';
import { Box, CardContent, CardMedia, Typography } from '@mui/material';

import { ReactComponent as Not_found_img } from '../../assets/images/empty_item.svg';
import { STATIC_URL } from '../../config/config';

// mutation
import {
  useAddPostToFavoriteListMutation,
  useDeletePostFromFavoriteMutation,
  useDeletePostMutation,
} from '../../redux/api/post/post.api';

// style
import { BoxCenter } from '../BoxCenter/BoxCenter.styles';
import { getPersistData } from '../../utils';
import { Link } from 'react-router-dom';
import { PATHS } from '../../config/paths';

export const CardPost = ({
  title,
  price,
  city,
  img,
  isPoster,
  idPost,
  isFavoritePage,

  isPosts,
}: CardPostProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const [isFavorite, setIsFavorite] = useState<boolean>(isFavoritePage ? true : false);
  const moneyIconUrl = require('../../assets/icons/flous.png');
  const locationIconUrl = require('../../assets/icons/home.png');

  // translation
  const { t } = useTranslation();
  // hover card
  const handleHover = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // delete post
  const [deletePost] = useDeletePostMutation();
  const [addPostToFavoriteList] = useAddPostToFavoriteListMutation();
  const [deletePostFromFavorite] = useDeletePostFromFavoriteMutation();
  const handleDelete = (id: number) => {
    if (window.confirm(t('dashboardListPosts.delete_confirm') as string)) {
      deletePost(id);
    }
  };
  const user = getPersistData('user', true);

  // edit post
  const handleEdit = (id: number) => {
    console.log('edit post', id);
  };
  const handleFavorite = async (id: number) => {
    setIsFavorite(!isFavorite);

    isFavorite != true
      ? await addPostToFavoriteList({ userId: user.id, postId: id })
      : await deletePostFromFavorite({ userId: user.id, postId: id });
  };
  const handleComment = (id: number) => {
    console.log('add comment to post', id);
  };

  return (
    <>
      <CardPostStyled onMouseEnter={handleHover} onMouseLeave={handleMouseLeave}>
        {img ? (
          <>
            <Box sx={{ position: 'relative' }}>
              <CardMedia sx={{ height: 140 }} image={`${STATIC_URL}/${img}`} title="green iguana" />
              {isHovered && (
                <BoxHoverEye>
                  <Link to={`/${PATHS.POSTS}/${idPost}`}>
                    <VisibilityIcon color="primary" fontSize="large" />
                  </Link>
                </BoxHoverEye>
              )}
            </Box>
          </>
        ) : (
          <BoxCenter>
            <Not_found_img height={130} width={'100%'} />
          </BoxCenter>
        )}
        <>
          {user && (
            <BoxEditDelete
              handleDelete={() => handleDelete(idPost)}
              handleEdit={() => handleEdit(idPost)}
              idPost={idPost}
              isPoster={isPoster}
              handleFavorite={() => handleFavorite(idPost)}
              handleComment={() => handleComment(idPost)}
              isFavorite={isFavorite}
              isPosts={isPosts}
            />
          )}

          <CardContent sx={{ padding: '0 0 1rem 1rem', width: '100%' }}>
            <Typography gutterBottom variant="subtitle1" component="div">
              {title}
            </Typography>

            <InfoCard txt={city}>
              {/* {<LocationOnIcon color={`primary`} />}{' '} */}
              <IconCard sx={{ backgroundImage: `url(${locationIconUrl})` }} />
            </InfoCard>

            <InfoCard txt={price.toString() + 'DT'}>
              {/* {<AttachMoneyIcon color={`primary`} />} */}
              <IconCard sx={{ backgroundImage: `url(${moneyIconUrl})` }} />
            </InfoCard>
          </CardContent>
        </>
      </CardPostStyled>
    </>
  );
};
