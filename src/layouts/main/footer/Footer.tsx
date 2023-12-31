import { Box, Typography, Container } from '@mui/material';
import { useTranslation } from 'react-i18next';
// components
import {
  BoxCenterSpaceBetween,
  BoxCenterStyled,
  CustomImageBottom,
  LogoFooter,
  StyledLinkFooter,
  LinkIcon,
} from '../../../components';

// images
import icon_fb from '../../../assets/images/facebook-bleu-clair.svg';
import icon_instagram from '../../../assets/images/instagram-bleu-clair.svg';
import icon_twitter from '../../../assets/images/twitter-bleu-clair.svg';
import icon_google from '../../../assets/images/google-bleu-clair.svg';
import decoFooter from '../../../assets/images/footer_deco_back.svg';
import theme from '../../../theme';
import { PATHS } from '../../../config/paths';
import { BoxHistory, BoxMenu, BoxFooter } from './footer.styles';

export default function Footer() {
  const { t } = useTranslation();
  return (
    <BoxFooter>
      <Container>
        <BoxCenterStyled>
          <LogoFooter />
          <BoxCenterSpaceBetween>
            <BoxHistory>
              <Typography variant="subtitle2">{t('footer.title_histoy')}</Typography>
              <Typography variant="body1" color={theme.palette.warning.main}>
                {t('footer.txt_history')}
              </Typography>
            </BoxHistory>
            <Box>
              <BoxMenu>
                <StyledLinkFooter to={PATHS.MAIN.HOME}>{t('header.link_home')}</StyledLinkFooter>
                <StyledLinkFooter to={PATHS.ABOUT}>{t('header.link_about')}</StyledLinkFooter>
                <StyledLinkFooter to={PATHS.POSTS}>{t('header.link_posts')}</StyledLinkFooter>
                <StyledLinkFooter to={PATHS.CONTACT}>{t('header.link_contact')}</StyledLinkFooter>
              </BoxMenu>
            </Box>
          </BoxCenterSpaceBetween>
          <Box marginY={2}>
            <LinkIcon link={PATHS.SOCIAL_MEDIA.FB} img={icon_fb} />
            <LinkIcon link={PATHS.SOCIAL_MEDIA.INSTAGRAM} img={icon_instagram} />
            <LinkIcon link={PATHS.SOCIAL_MEDIA.TWITTER} img={icon_twitter} />
            <LinkIcon link={PATHS.SOCIAL_MEDIA.GOOGLE} img={icon_google} />
          </Box>
        </BoxCenterStyled>
      </Container>
      <CustomImageBottom src={decoFooter} />
    </BoxFooter>
  );
}
