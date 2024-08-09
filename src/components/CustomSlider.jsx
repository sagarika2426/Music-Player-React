import { Slider } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledSlider = styled(Slider)(({ theme }) => ({
  color: '#ffffff',
  height: 4,
  '& .MuiSlider-thumb': {
    height: 0,
    width: 0,
    backgroundColor: '#ffffff',
    border: '2px solid currentColor',
    '&:hover': {
      boxShadow: '0px 0px 0px 8px rgba(255, 255, 255, 0.16)',
    },
    '&:focus, &:active': {
      boxShadow: 'none',
    },
  },
  '& .MuiSlider-track': {
    border: 'none',
  },
  '& .MuiSlider-rail': {
    border: 'none',
    backgroundColor: '#555555',
  },
}));

const CustomSlider = ({ value, onChange, max, ...props }) => {
  return (
    <StyledSlider
      value={value}
      onChange={onChange}
      max={max}
      aria-label="Custom Slider"
      {...props}
    />
  );
};

export default CustomSlider;
