import './App.css';
import Header from './Components/Header/Header';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './Components/Home/Home';
import RegisterForm from './Components/RegisterForm/RegisterForm';
import Destination from './Components/Destination/Destination';
import { createContext, useState } from 'react';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import NotFound from './Components/NotFound/NotFound';

export const UseContext = createContext();



function App() {

  const [logInUser, setLoginUser] = useState({})

  return (
    <UseContext.Provider value={[logInUser, setLoginUser]}>
      <Router>
        <Header />
        <Switch>

          <PrivateRoute path="/destination/:vehicles">
            <Destination />
          </PrivateRoute>

          <PrivateRoute path="/destination">
            <Destination />
          </PrivateRoute>

          <Route path="/register">
            <RegisterForm />
          </Route>

          <Route path="/home">
            <Home />
          </Route>

          <Route exact path="/">
            <Home />
          </Route>

          
          <Route exact path="*">
            <NotFound />
          </Route>

        </Switch>
      </Router>


    </UseContext.Provider>
  );
}

export default App;
