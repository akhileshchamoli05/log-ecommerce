import { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import { Shop } from './pages/shop';
import Contact from './pages/Contact';
import About from './pages/About';
import AuthContext from './store/auth-context';
import { Cart } from './pages/cart';

function App() {
  const authCtx = useContext(AuthContext);

  return (
    
    <Layout>
      <Switch>
        <Route path='/' exact>
          <Shop />
        </Route>
        <Route path='/contact'>
          <Contact />
        </Route>
        <Route path='/cart-item'>
          <Cart />
        </Route>
        <Route path='/about'>
          <About />
        </Route>
        {!authCtx.isLoggedIn && (
          <Route path='/auth'>
            <AuthPage />
          </Route>
        )}
        <Route path='/profile'>
          {authCtx.isLoggedIn && <UserProfile />}
          {!authCtx.isLoggedIn && <Redirect to='/auth' />}
        </Route>
        <Route path='*'>
          <Redirect to='/' />
        </Route>
      </Switch>
    </Layout>
    
  );
}

export default App;
