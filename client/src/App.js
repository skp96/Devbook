import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/profile/CreateProfile';
import EditProfile from './components/profile/EditProfile';
import ProtectedRoute from './components/routing/ProtectedRoute';

import { getUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
// Redux
import { Provider } from 'react-redux';
import store from './store';

import './App.css';

if (localStorage.token) {
	setAuthToken(localStorage.token);
}

const App = () => {
	useEffect(() => {
		store.dispatch(getUser());
	}, []);

	return (
		<Provider store={store}>
			<Router>
				<Fragment>
					<NavBar />
					<Route exact path='/' component={Landing} />
					<section className='container'>
						<Alert />
						<Switch>
							<Route exact path='/signup' component={Signup} />
							<Route exact path='/login' component={Login} />
							<ProtectedRoute exact path='/dashboard' component={Dashboard} />
							<ProtectedRoute exact path='/create-profile' component={CreateProfile} />
							<ProtectedRoute exact path='/edit-profile' component={EditProfile} />
						</Switch>
					</section>
				</Fragment>
			</Router>
		</Provider>
	);
};
export default App;
