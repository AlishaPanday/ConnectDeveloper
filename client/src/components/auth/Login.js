import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
// import axios from 'axios';

const Login = ({login, isAuthenticated}) => {
  //initial set up for useState
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });
  //extract the data from signupForm
  const { email, password } = loginForm;

  //onchange & use spread operator
  const onChange = e =>
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });

  //upon form submission
  const onSubmit = async e => {
    e.preventDefault();
    login(email,password);
    // console.log('Log in Successfully');
  };

  //Redirect if logged in
  if(isAuthenticated){
    return <Redirect to="/dashboard"/>
  }

  return (
    <Fragment>
      <h1 className='large text-primary'>Sign in</h1>
      <h3 className='medium text-primary'>Welcome Back</h3>
      <p className='lead'>
        <i className='fas fa-user'></i>Sign Into Your Account
      </p>
      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={e => onChange(e)}
            minLength='6'
          />
        </div>

        <input type='submit' className='btn btn-primary' value='Login' />
      </form>
      <p className='my-1'>
        New? <Link to='/signup'>Sign Up Free</Link>
      </p>
    </Fragment>
  );
};


Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated:PropTypes.bool
};

const mapStateToProps = state =>({
  isAuthenticated:state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
