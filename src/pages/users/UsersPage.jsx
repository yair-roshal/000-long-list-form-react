import React, { useState, useEffect } from 'react';
import styles from './users.module.css';
import PrimaryButton from '../../components/PrimaryButton';
import { UserList } from './UserList';
import { TextField } from '@mui/material';
import { useUsersContext } from '../../context/usersContext';
import { Box, Typography, LinearProgress } from '@mui/material';
import { calculateErrorCounts } from '../../helpers/helpers';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import AddButton from '../../components/AddButton';
import { v4 as uuidv4 } from 'uuid';

function UsersPage() {
  const { usersData, setUsersData, loading } = useUsersContext();
  const [errorCounts, setErrorCounts] = useState({ emptyFields: 0, invalidFields: 0 });
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [updatedUsersData, setUpdatedUsersData] = useState([]);

  // Load user data from localStorage on component mount
  useEffect(() => {
    const storedUsersData = localStorage.getItem('usersData');
    if (storedUsersData?.length > 0) {
      setUpdatedUsersData(JSON.parse(storedUsersData));
    } else {
      setUpdatedUsersData(usersData);
    }
  }, [usersData]);

  useEffect(() => {
    if (updatedUsersData) {
      const initialErrorCounts = calculateErrorCounts(updatedUsersData);
      setErrorCounts(initialErrorCounts);
      setIsSaveDisabled(
        initialErrorCounts.emptyFields > 0 || initialErrorCounts.invalidFields > 0
      );
    }
  }, [updatedUsersData]);

  // Save user data to localStorage whenever it changes
  useEffect(() => {
    if (updatedUsersData?.length > 0) {
      localStorage.setItem('usersData', JSON.stringify(updatedUsersData));
    }
  }, [updatedUsersData]);

  const saveClickHandler = () => {
    setUsersData(updatedUsersData);
  };

  const addUserHandler = () => {
    const newUser = {
      id: uuidv4(), // Generate a unique ID using uuid
      name: '',
      country: '',
      email: '',
      phone: '',
    };

    // Add the new user to the beginning of the usersData array
    const updatedData = [newUser, ...updatedUsersData];
    setUpdatedUsersData(updatedData);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Box sx={{ marginTop: 2, marginBottom: 2 }}>
        <Typography>Search:</Typography>
        <TextField
          className={styles.searchField}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          fullWidth
          variant="outlined"
          placeholder="Search by name, country, email or phone"
          InputProps={{
            endAdornment: (
              <IconButton
                aria-label="Clear search"
                onClick={() => setSearchText('')}
                size="small"
              >
                <ClearIcon />
              </IconButton>
            ),
          }}
        />
      </Box>

      <AddButton disabled={false} handleClick={() => addUserHandler()}>
        Add User
      </AddButton>

      {loading ? (
        <Box sx={{ width: '100%', p: 2 }}>
          <Typography variant="h5" gutterBottom>
            Loading...
          </Typography>
          <LinearProgress />
        </Box>
      ) : usersData && usersData.length > 0 ? (
        <UserList
          usersData={updatedUsersData}
          rowHeight={100}
          visibleRows={5}
          onUserDataChange={(updatedUsersData, errorCounts) => {
            setUpdatedUsersData(updatedUsersData);

            setErrorCounts(errorCounts);
            setIsSaveDisabled(
              errorCounts.emptyFields > 0 || errorCounts.invalidFields > 0
            );
          }}
          searchText={searchText}
        />
      ) : (
        <Box sx={{ width: '100%', p: 2 }}>
          <Typography variant="h5" gutterBottom>
            No data available.
          </Typography>
        </Box>
      )}
      <Typography>Errors:</Typography>
      <Typography>Empty Fields - {errorCounts.emptyFields}</Typography>
      <Typography>Invalid Fields - {errorCounts.invalidFields}</Typography>
      <Box sx={{ marginTop: 2 }}>
        <PrimaryButton disabled={isSaveDisabled} handleClick={() => saveClickHandler()}>
          Save
        </PrimaryButton>
      </Box>
    </Box>
  );
}

export default UsersPage;
