import React from 'react';
import {Link,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';


const Home = ({isAuthenticated}) => {
  if(isAuthenticated){
    return <Redirect to= '/dashboard' />

  }
  return (
    <div>
      <section className='landing'>
        <div className='dark-overlay'>
          <div className='landing-inner'>
            <h1 className='x-large'>Connecting Talents </h1>
            <p className='lead'>
              Build profile,Browse great talent, Post Vacancies,Collaborate and
              Share Knowledge
            </p>
            <div className='buttons'>
              <Link to='/signup' className='btn btn-danger'>
                Sign Up
              </Link>
              <Link to='/login' className='btn btn-success'>
                Login
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

Home.propTypes = {
  isAuthenticated: PropTypes.bool
}
const mapStateToProps = state => ({
  isAuthenticated:state.auth.isAuthenticated
});
export default connect(mapStateToProps)(Home);
