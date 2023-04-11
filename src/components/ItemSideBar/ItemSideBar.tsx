import { Box, Typography } from '@mui/material';
import theme from '../../theme';
import { LinkItem } from '../LinkItem/LinkItem';
import { ItemStyled } from './ItemSideBar.styles';
import { ItemSideBarProps } from './ItemSideBar.types';
import { useState } from 'react';

export const ItemSideBar = ({ icon, txt, bgColor, path, isActive }: ItemSideBarProps) => {
  return (
    <>
      <ItemStyled isActive={isActive}>
        <>{icon}</>
        <LinkItem path={path} name={txt} isActive={isActive} />
      </ItemStyled>
    </>
  );
};
