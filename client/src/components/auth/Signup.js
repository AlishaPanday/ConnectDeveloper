import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect} from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { signup } from '../../actions/auth';
import PropTypes from 'prop-types';

// import axios from 'axios';

const Signup = ({ setAlert,signup, isAuthenticated }) => {
  //initial set up for useState
  const [signupForm, setSignupForm] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });
  //extract the data from signupForm
  const { name, email, password, password2 } = signupForm;

  //onchange & use spread operator
  const onChange = e =>
    setSignupForm({ ...signupForm, [e.target.name]: e.target.value });

  //upon form submission
  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Password does not match', 'danger');
    } else {
      signup({name,email,password});
    }
  };

  if(isAuthenticated){
    return <Redirect to="/dashboard"/>;
  }

  return (
    <Fragment>
      <h1 className='large text-primary'>Sign Up</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Create Your Account
      </p>
      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          {/*associate first input name with the name state & on change */}
          <input
            type='text'
            placeholder='Name'
            name='name'
            value={name}
            onChange={e => onChange(e)}
            // required
          />
        </div>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={e => onChange(e)}
            // required
          />
          <small className='form-text'>
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
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
        <div className='form-group'>
          <input
            type='password'
            placeholder='Confirm Password'
            name='password2'
            value={password2}
            onChange={e => onChange(e)}
            minLength='6'
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Register' />
      </form>
      <p className='my-1'>
        Already have an account? <Link to='/login'>Sign In</Link>
      </p>
    </Fragment>
  );
};

Signup.propTypes = {
  setAlert: PropTypes.func.isRequired,
  signup:PropTypes.func.isRequired,
  isAuthenticated:PropTypes.bool
};

const mapStateToProps = state =>({
  isAuthenticated:state.auth.isAuthenticated
});
export default connect(mapStateToProps, { setAlert,signup })(Signup);
