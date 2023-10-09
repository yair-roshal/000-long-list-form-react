import { styled } from '@mui/material/styles';
import { IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const StyledIconButton = styled(IconButton)({
  color: '#613f3f',
  '&:hover': {
    color: '#ba6767',
  },
});

const TrashIconButton = ({ handleClick }) => {
  return (
    <Tooltip title="Delete" arrow>
      <StyledIconButton aria-label="delete" size="large" onClick={handleClick}>
        <DeleteIcon fontSize="inherit" />
      </StyledIconButton>
    </Tooltip>
  );
};

// Set default values for props
TrashIconButton.defaultProps = {
  handleClick: () => {},
};

export default TrashIconButton;
