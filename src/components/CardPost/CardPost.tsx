// react
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

// components
import { BoxEditDelete } from './BoxEditDelete/BoxEditDelete';
import { BoxHoverEye, CardPostStyled } from './CardPost.style';
import { CardPostProps } from './CardPost.type';
import { InfoCard } from './InfoCard';

// mui
import Modal from '@material-ui/core/Modal';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Box, CardContent, CardMedia, Typography } from '@mui/material';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

import { ReactComponent as Not_found_img } from '../../assets/images/empty_item.svg';
import { STATIC_URL } from '../../config/config';
// feature
import { AddPost } from '../../features';

// mutation
import {
  useAddPostToFavoriteListMutation,
  useDeletePostFromFavoriteMutation,
  useDeletePostMutation,
} from '../../redux/api/post/post.api';
import { BoxModal } from '../BoxCenter/BoxModal.styles';
// style
import { BoxCenter } from '../BoxCenter/BoxCenter.styles';
import { getPersistData } from '../../utils';

export const CardPost = ({
  title,
  price,
  city,
  img,
  isPoster,
  idPost,
  isFavoritePage,
  PosterId,
  isHomePage,
}: CardPostProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const [isFavorite, setIsFavorite] = useState<boolean>(isFavoritePage ? true : false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
  const handleClose = () => {
    setIsModalOpen(false);
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
                  <VisibilityIcon color="primary" fontSize="large" />
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
            />
          )}

          <CardContent>
            <Typography gutterBottom variant="subtitle1" component="div">
              {title}
            </Typography>

            <InfoCard txt={city}> {<LocationOnIcon color={`primary`} />}</InfoCard>

            <InfoCard txt={price.toString() + 'DT'}>
              {<AttachMoneyIcon color={`primary`} />}
            </InfoCard>
          </CardContent>
        </>
      </CardPostStyled>
    </>
  );
};
