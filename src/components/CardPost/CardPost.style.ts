import { styled, Card, Box } from '@mui/material';
import { COLORS } from '../../config/colors';
import theme from '../../theme';

export const CardPostStyled = styled(Card)(() => ({
  borderRadius: '0px 0px 5rem 0px',
  boxShadow: `1px 1px 8px -2px ${COLORS.GREY[800]}`,
  width: '18rem',
  [theme.breakpoints.down(1100)]: {
    width: '15rem',
    height: '18rem',
  },
  [theme.breakpoints.down(940)]: {
    width: '14rem',
    // height: '15rem',
  },
  [theme.breakpoints.down(754)]: {
    width: '12rem',
    // height: '15rem',
  },
  [theme.breakpoints.down(695)]: {
    width: '16rem',
    // height: '15rem',
  },

  [theme.breakpoints.down('sm')]: {
    width: '16rem',
    // height: '15rem',
  },
}));
export const BoxHoverEye = styled(Box)(() => ({
  backgroundColor: `${COLORS.GREY[100]}`,
  position: 'absolute',
  width: '100%',
  height: '100%',
  top: '0px',
  left: '0px',
  textAlign: 'center',
  justifyContent: 'center',
  display: 'flex',
  alignItems: 'center',
}));
export const BoxItemCard = styled(Box)(() => ({
  justifyContent: 'flex-start',
  display: 'flex',
  alignItems: 'center',
}));
export const IconCard = styled(Box)(() => ({
  height: '30px',
  width: '30px',
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
}));
