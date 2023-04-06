/* eslint-disable react/no-unknown-property */
import { useTheme } from '@material-ui/core';
import { COLORS } from '../../config/colors';

interface CustomIconProps {
  isActive: boolean;
}
export default function IconChat({ isActive }: CustomIconProps) {
  const { palette } = useTheme();
  return (
    <svg
      fill={isActive ? COLORS.PRIMARY.MAIN : COLORS.WARNING.MAIN}
      height="30px"
      width="30px"
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 60 60"
      xmlSpace="preserve"
    >
      <g>
        <path
          d="M44.348,12.793H2.652C1.189,12.793,0,13.982,0,15.445v43.762l9.414-9.414h34.934c1.463,0,2.652-1.19,2.652-2.653V15.445
		C47,13.982,45.811,12.793,44.348,12.793z M10,35.777c-2.206,0-4-1.794-4-4s1.794-4,4-4s4,1.794,4,4S12.206,35.777,10,35.777z
		 M23,35.777c-2.206,0-4-1.794-4-4s1.794-4,4-4s4,1.794,4,4S25.206,35.777,23,35.777z M36,35.777c-2.206,0-4-1.794-4-4s1.794-4,4-4
		s4,1.794,4,4S38.206,35.777,36,35.777z"
        />
        <path
          d="M57.348,0.793H12.652C11.189,0.793,10,1.982,10,3.445v7.348h34.348c2.565,0,4.652,2.087,4.652,4.652v25.332h11V3.445
		C60,1.982,58.811,0.793,57.348,0.793z"
        />
      </g>
    </svg>
  );
}
