import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import initialUsersData from '../data/initialUsersData.json'; // Import initial data from JSON file

// initial value
const UsersContext = createContext({
  usersData: initialUsersData || [],
  setUsersData: () => {},
  loading: true,
});

// value provider
export const ContextProvider = ({ children }) => {
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setUsersData(initialUsersData);
      setLoading(false); //  Set loading to false when data is loaded
    }, 2000);

    return () => {
      clearTimeout(t);
    };
  }, []);

  const contextValue = useMemo(
    () => ({ usersData, setUsersData, loading }),
    [usersData, setUsersData, loading]
  );

  return <UsersContext.Provider value={contextValue}>{children}</UsersContext.Provider>;
};

// consumer
export const useUsersContext = () => useContext(UsersContext);

export default UsersContext;
