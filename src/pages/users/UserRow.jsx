import React, { useState, useEffect } from 'react';
import { TextField, Autocomplete, TableCell } from '@mui/material';
import styles from './users.module.css';
import validCountries from '../../data/countries.json';
import { calculateErrorCounts } from '../../helpers/helpers';

function UserRow({ user, onUserChange }) {
  const [localUser, setLocalUser] = useState(user);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Validation when changing localUser
    const { newErrorsArray } = calculateErrorCounts([localUser]);
    setErrors(newErrorsArray[localUser.id]);
  }, [localUser]);

  const fieldChangeHandler = (field, value) => {
    // Update localUser and call onUserChange with the updated value
    const updatedUser = { ...localUser, [field]: value };
    setLocalUser(updatedUser);
    onUserChange(field, value);
  };

  return (
    <>
      <TableCell>
        <TextField
          variant="outlined"
          value={localUser.name}
          onChange={(e) => fieldChangeHandler('name', e.target.value)}
          error={errors.name}
          helperText={errors.name && 'Invalid name'}
          placeholder="Name"
          className={styles.allFields}
        />
      </TableCell>

      <TableCell>
        <Autocomplete // Use Autocomplete for the Country field
          options={validCountries}
          value={localUser.country}
          onChange={(_, newValue) => fieldChangeHandler('country', newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              error={errors.country}
              placeholder="Country"
              className={styles.allFields}
              helperText={errors.country && 'Invalid country'}
            />
          )}
        />
        {/* {errors.country && <div className={styles.errorText}>Invalid country</div>} */}
      </TableCell>

      <TableCell>
        <TextField
          className={styles.allFields}
          variant="outlined"
          value={localUser.email}
          onChange={(e) => fieldChangeHandler('email', e.target.value)}
          error={errors.email}
          helperText={errors.email && 'Invalid email'}
          placeholder="Email"
        />
      </TableCell>
      <TableCell>
        <TextField
          className={styles.allFields}
          variant="outlined"
          value={localUser.phone}
          onChange={(e) => fieldChangeHandler('phone', e.target.value)}
          error={errors.phone}
          helperText={errors.phone && 'Invalid phone'}
          placeholder="Phone"
        />
      </TableCell>
    </>
  );
}

export default UserRow;
