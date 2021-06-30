//Renders the first <Route> that matches the location.

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';
import Login from 'views/Login';

import Dashboard from 'views/Dashboard';
import Register from 'views/Register';
import Category from 'views/category';
import ProductAdd from 'views/ProductAdd';
import Product from 'views/Product';
import Cart from 'views/Cart';
import Orders from 'views/Orders';
import User from 'views/User';
import UserTransaksi from 'views/UserTransaksi';
import Profile from 'views/Profile';
import OrderDetail from 'views/OrderDetail';
import Print from 'views/Print';

//private route example: https://github.com/shidqi/dumbsound/blob/master/client/src/routes.jsx
const ProtectRoute = ({ children, isLogin, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLogin ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};

const LoginRoute = ({ children, isLogin, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        !isLogin ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};

const Router = () => {
  const isLogin = Cookies.get('token') && localStorage.getItem('isLogin');

  return (
    <BrowserRouter basename="/pos">
      <Switch>
        <LoginRoute isLogin={isLogin} path="/register">
          <Register />
        </LoginRoute>
        <LoginRoute isLogin={isLogin} path="/login">
          <Login />
        </LoginRoute>
        <ProtectRoute isLogin={isLogin} path="/profile">
          <Profile />
        </ProtectRoute>
        <ProtectRoute isLogin={isLogin} path="/detail-order">
          <OrderDetail />
        </ProtectRoute>
        <ProtectRoute isLogin={isLogin} path="/product/add">
          <ProductAdd />
        </ProtectRoute>

        <ProtectRoute isLogin={isLogin} path="/print/:id">
          <Print />
        </ProtectRoute>
        <ProtectRoute isLogin={isLogin} path="/cart">
          <Cart />
        </ProtectRoute>
        <ProtectRoute isLogin={isLogin} path="/product">
          <Product />
        </ProtectRoute>

        <ProtectRoute isLogin={isLogin} path="/category">
          <Category />
        </ProtectRoute>
        <ProtectRoute isLogin={isLogin} path="/orders">
          <Orders />
        </ProtectRoute>
        <ProtectRoute isLogin={isLogin} path="/users">
          <User />
        </ProtectRoute>
        <ProtectRoute isLogin={isLogin} path="/user-transaksi">
          <UserTransaksi />
        </ProtectRoute>
        <ProtectRoute isLogin={isLogin} path="/">
          <Dashboard />
        </ProtectRoute>
        {/* <Route component={Home} /> */}
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
