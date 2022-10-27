import React from 'react';
import './App.css';
import MenuHeader from './components/MenuHeader';
import MainMenu from './pages/MainMenu';
import DesksService from './services/DesksService';
import EmployeesService from './services/EmployeesService';

function App() {
  return (
    <>
      <MenuHeader />
      <DesksService>
        <EmployeesService>
          <MainMenu />
        </EmployeesService>
      </DesksService>
    </>
  );
}

export default App;
