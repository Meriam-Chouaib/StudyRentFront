import { styled, Toolbar } from '@mui/material';
import theme from '../../theme';
export const ToolbarStyled = styled(Toolbar)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '19px 0px 0px',

  [theme.breakpoints.down(895)]: {
    padding: '30px 0px 0px',
  },
  [theme.breakpoints.down('sm')]: {
    justifyContent: 'space-evenly',
  },
}));
