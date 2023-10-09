import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';

const StyledAddButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 16,
  padding: '6px 10px',
  margin: '10px 0',
  backgroundColor: '#3270ae',
  '&:hover': {
    backgroundColor: '#2989e8',
  },
});

const AddButton = ({ disabled, handleClick, children }) => {
  return (
    <StyledAddButton
      variant="contained"
      color="primary"
      startIcon={<AddIcon />}
      disabled={disabled}
      onClick={handleClick}
    >
      {children}
    </StyledAddButton>
  );
};

// Set default values for props
AddButton.defaultProps = {
  children: null,
  disabled: false,
  handleClick: () => {},
};

export default AddButton;
