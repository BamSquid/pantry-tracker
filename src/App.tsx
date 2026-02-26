import { type ReactElement } from 'react'
import '@styles/App.css';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import Home from '@pages/Home/Home';
import SignUpForm from '@pages/SignUpForm/SignUpForm';
import Login from '@pages/LogIn/Login';
import { Container, AppShell, Burger, Button, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useAuth } from '@context/AuthContext/useAuth';
import UserSettings from '@pages/UserSettings/UserSettings';

const App = (): ReactElement => {
  const [opened, { toggle }] = useDisclosure();
  const { currentUser, logOut } = useAuth();
  const navigate = useNavigate();

  const navigateToPage = (page: string) => {
    navigate(`/${page}`);
  };

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header className='appHeader'>
        <Burger
          opened={opened}
          onClick={toggle}
          hiddenFrom="sm"
          size="sm"
        />
        <div>Logo</div>
        <div className='loginSignupButtons'>
          {currentUser ?
            <Button onClick={logOut}>Log out</Button> :
            <Group gap={16}>
              <Button onClick={() => navigateToPage('login')}>Log in</Button>
              <Button variant='outline' onClick={() => navigateToPage('signup')}>Sign up</Button>
            </Group>
          }
        </div>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <Link to='/settings'>
          User settings
        </Link>
      </AppShell.Navbar>

      <AppShell.Main>
        <Container size="sm" px="md">
          <Routes>
            <Route path='/home' element={<Home />} />
            <Route path='/signup' element={<SignUpForm />} />
            <Route path='/login' element={<Login />} />
            <Route path='/settings' element={<UserSettings />} />
          </Routes>
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}

export default App;
