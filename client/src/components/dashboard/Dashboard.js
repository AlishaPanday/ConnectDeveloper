//fetch all data using action bring it to redux state & pass it down to components
import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteAccount, getCurrentProfile } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);
  //showing spinner
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      {/* <h1 className='large text-primary'> Dashboard</h1> */}
      <h1 className='large text-dark'>
        <i className='fas fa-tachometer-alt'></i> Welcome {user && user.name}
      </h1>
      {profile !== null ? (
        <Fragment>
          <DashboardActions />
          <Experience experience={profile.experience} />
          <Education education={profile.education} />
          <div className='profile-about bg-light p-2 my-2'>
            <h2>Account Ownership</h2>
          </div>
          <div className='my-2'>
            <button className='btn btn-danger' onClick={() => deleteAccount()}>
              Delete Account
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p>No Profile has been set up.</p>
          <Link to='/create-profile' className='btn btn-primary my-1'>
            Set up your profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
