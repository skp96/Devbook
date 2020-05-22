import React, {Fragment, useState} from 'react';
import {connect} from 'react-redux';
import {setAlert} from '../../actions/alert';
import {signup, login} from '../../actions/auth';
import {Link, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types'

const Signup = ({setAlert, signup, login, isAuthenticated}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const {name, email, password, password2} = formData;
  const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});
  const onSubmit = async e => {
    e.preventDefault();

    if(password !== password2) {
      setAlert('Passwords do not match', 'danger')
    } else {
      signup({name, email, password});
    }
  }

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />
  }

  const demoEmail = 'sunnykpatel1992@gmail.com'
  const demoPassword = '1234567'

  return (
    <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead"><i className="fas fa-user-astronaut" /> Create Your Account</p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input type="text" placeholder="Name" name="name" value={name} onChange={e => onChange(e)}/>
        </div>
        <div className="form-group">
          <input type="email" placeholder="Email Address" name="email" value={email} onChange={e => onChange(e)} />
          <small className="form-text"
            >This site uses Gravatar so if you want a profile image, use a
            Gravatar email</small
          >
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password} 
            onChange={e => onChange(e)}
            minLength="7"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2} 
            onChange={e => onChange(e)}
            minLength="7"
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <button className='btn btn-primary my-1' onClick={() => login(demoEmail, demoPassword)}>Demo Login</button>
      <p>
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
      
    </Fragment>
  );
};

Signup.propTypes = {
  setAlert: PropTypes.func.isRequired,
  signup: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {setAlert, signup, login})(Signup);