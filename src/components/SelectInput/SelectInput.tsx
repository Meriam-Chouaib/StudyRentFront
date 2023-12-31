/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import SvgIcon from '@mui/material/SvgIcon';
import { Typography } from '@mui/material';
import { BoxSpaceBetweenCenter } from '../BoxCenter/BoxCenterSpaceBetween.styles';
import FormControl from '@mui/material/FormControl';
import theme from '../../theme';

interface SelectTextFieldsProps {
  data: any;
  txt?: string;
  label?: string;
  icon?: any;
  onChange?: (value: any) => void;
  defaultValue?: any;
  value?: any;
}
export default function SelectTextFields({
  data,
  label,
  txt,
  icon,
  onChange,
  defaultValue,
  value,
}: SelectTextFieldsProps) {
  return (
    <BoxSpaceBetweenCenter sx={{ justifyContent: 'center', width: '100%' }}>
      <FormControl variant="standard">
        <Typography variant="h5">{label}</Typography>
        <Select
          sx={{ width: 'auto' }}
          defaultValue={defaultValue ? defaultValue : ''}
          value={value}
          disableUnderline={true}
          displayEmpty={true}
          onChange={onChange}
          renderValue={(value) => {
            console.log(value);

            return (
              <Box sx={{ display: 'flex', gap: 1 }}>
                <SvgIcon color="primary">{icon}</SvgIcon>
                {value || txt}
              </Box>
            );
          }}
        >
          {data.map((option: any) => (
            <MenuItem
              key={option.value}
              value={option.value}
              sx={{ color: theme.palette.primary.dark }}
            >
              {option.value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </BoxSpaceBetweenCenter>
  );
}
