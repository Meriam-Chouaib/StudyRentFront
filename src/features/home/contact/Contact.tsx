import { Box } from '@mui/material';
import { BoxCenter, BoxCenterSpaceBetween } from '../../../components';
import { BoxImageMap, CustomImageMap } from './Contact.style';
import Maps from '../../../assets/images/plugin_easy_maps.png.webp';
import { ContactForm } from './ContactForm';
import { Map } from '../../map/Map';
import { Localization, Post } from '../../../redux/api/post/post.types';
interface MapPostsProps {
  localizations: Localization[];
  posts: Post[];
}
export function MapPosts({ localizations, posts }: MapPostsProps) {
  return (
    <BoxCenter marginY={2}>
      {localizations && <Map localizations={localizations} posts={posts} height="25rem" />}
    </BoxCenter>
  );
}
