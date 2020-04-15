import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/user-profile/CreateProfile';
import EditProfile from './components/user-profile/EditProfile';
import AddExperience from './components/user-profile/AddExperience';
import AddEducation from './components/user-profile/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';
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
							<Route exact path='/profiles' component={Profiles} />
							<Route exact path='/profile/:id' component={Profile} />
							<ProtectedRoute exact path='/dashboard' component={Dashboard} />
							<ProtectedRoute exact path='/create-profile' component={CreateProfile} />
							<ProtectedRoute exact path='/edit-profile' component={EditProfile} />
							<ProtectedRoute exact path='/add-experience' component={AddExperience} />
							<ProtectedRoute exact path='/add-education' component={AddEducation} />
							<ProtectedRoute exact path='/posts' component={Posts} />
							<ProtectedRoute exact path='/posts/:id' component={Post} />
						</Switch>
					</section>
				</Fragment>
			</Router>
		</Provider>
	);
};
export default App;
