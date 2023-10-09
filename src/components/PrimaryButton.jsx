import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 16,
  padding: '6px 12px',
  border: '1px solid',
  backgroundColor: '#232d85',
  '&:hover': {
    backgroundColor: 'white',
    borderColor: 'black',
    color: 'black',
  },
});

const PrimaryButton = ({ children, disabled, handleClick }) => {
  return (
    <StyledButton variant="contained" disabled={disabled} onClick={handleClick}>
      {children}
    </StyledButton>
  );
};

// Set default values for props
PrimaryButton.defaultProps = {
  children: null,
  disabled: false,
  handleClick: () => {},
};

export default PrimaryButton;
