/* eslint-disable @typescript-eslint/no-explicit-any */
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { StandardTextFieldProps, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import theme from '../../theme';
// ----------------------------------------------------------------------

interface TextFieldProps extends StandardTextFieldProps {
  name: string;
  label: string;
  type?: 'text' | 'password' | 'file' | 'number';
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputProps?: any;
}

export default function RHFTextField({ name, label, ...other }: TextFieldProps) {
  const { control, register } = useFormContext();
  const { t } = useTranslation();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          variant="standard"
          label={
            <span style={{ color: `${theme.palette.primary.dark}`, fontWeight: 600 }}>{label}</span>
          }
          type={other.type}
          {...field}
          fullWidth
          error={!!error}
          helperText={error && error.message && t(error?.message)}
          {...other}
          {...register(name)}
        />
      )}
    />
  );
}
