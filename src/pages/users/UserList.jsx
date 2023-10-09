import React, { useEffect, useState, useRef } from 'react';
import { Table, TableBody, TableRow, Typography, Box, TableCell } from '@mui/material';
import TrashIconButton from '../../components/TrashIconButton';
import UserRow from './UserRow';
import styles from './users.module.css';
import { calculateErrorCounts } from '../../helpers/helpers';

export function UserList({
  usersData,
  rowHeight,
  visibleRows,
  onUserDataChange,
  searchText,
}) {
  const rootRef = useRef();
  const [start, setStart] = useState(0);
  const [filteredUsersData, setFilteredUsersData] = useState([]);

  function getTopHeight() {
    return rowHeight * start;
  }

  function getBottomHeight() {
    return rowHeight * (usersData.length - (start + visibleRows + 1));
  }

  useEffect(() => {
    function onScroll(e) {
      let newStart = Math.min(
        usersData.length - visibleRows - 1,
        Math.floor(e.target.scrollTop / rowHeight)
      );
      setStart(newStart);
    }

    // Copy the current ref value to a variable inside the effect
    const currentRef = rootRef.current;

    currentRef.addEventListener('scroll', onScroll);

    return () => {
      // Use the variable in the cleanup function
      currentRef.removeEventListener('scroll', onScroll);
    };
  }, [usersData.length, visibleRows, rowHeight, rootRef]);

  useEffect(() => {
    // Filter users when searchText changes
    filterUsers();
  }, [searchText, usersData]);

  useEffect(() => {
    // Apply initial filtering if searchText is present
    if (searchText) {
      filterUsers();
    }
  }, []); // Empty dependency array means this runs once on mount

  const filterUsers = () => {
    const filteredData = usersData.filter((user) => {
      const searchString = searchText.toLowerCase();
      return (
        user.name?.toLowerCase().includes(searchString) ||
        user.country?.toLowerCase().includes(searchString) ||
        user.email?.toLowerCase().includes(searchString) ||
        user.phone?.toLowerCase().includes(searchString)
      );
    });

    setFilteredUsersData(filteredData);
  };

  const deleteUserHandler = (userId) => {
    // Create a new array of users without the deleted user
    const updatedUsersData = usersData.filter((user) => user.id !== userId);

    // Create a new array of filtered data without the deleted user
    const updatedFilteredUsersData = filteredUsersData.filter(
      (user) => user.id !== userId
    );

    // Update the state of the data and filtered data
    setFilteredUsersData(updatedFilteredUsersData);

    // Call the data update function
    onUserDataChange(updatedUsersData, calculateErrorCounts(updatedUsersData));
  };

  return (
    <Box className={styles.usersList}>
      <Box className={styles.usersListHeader}>
        <Typography variant="h6" sx={{ paddingTop: 1, paddingLeft: 1 }}>
          Users List ({usersData.length})
        </Typography>
      </Box>

      <Box
        style={{ height: rowHeight * visibleRows + 1, overflow: 'auto' }}
        ref={rootRef}
      >
        <Box style={{ height: getTopHeight() }} />

        <Table id="tableUsers" size="small" aria-label="a dense table">
          <TableBody>
            {filteredUsersData
              .slice(start, start + visibleRows + 1)
              .map((row, rowIndex) => (
                <TableRow style={{ height: rowHeight }} key={row.id}>
                  <UserRow
                    className={styles.userRow}
                    key={row.id}
                    user={row}
                    onUserChange={(field, value) => {
                      const updatedUser = { ...row, [field]: value };
                      const updatedFilteredUsers = [...filteredUsersData];
                      updatedFilteredUsers[start + rowIndex] = updatedUser;
                      onUserDataChange(
                        updatedFilteredUsers,
                        calculateErrorCounts(updatedFilteredUsers)
                      );
                    }}
                  />
                  <TableCell>
                    <TrashIconButton handleClick={() => deleteUserHandler(row.id)} />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>

        <Box style={{ height: getBottomHeight() }} />
      </Box>
    </Box>
  );
}
