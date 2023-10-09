import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import StatisticsPage from './pages/statistics/StatisticsPage';
import UsersPage from './pages/users/UsersPage';
import { ContextProvider } from './context/usersContext';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <ContextProvider>
        <Routes>
          <Route path="/" exact element={<StatisticsPage />} />
          <Route path="users" element={<UsersPage />} />
        </Routes>
      </ContextProvider>
    </BrowserRouter>
  );
}

export default App;
