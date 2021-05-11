import React from 'react';
import { Link } from 'react-router-dom';

const DashboardActions = () => {
  return (
    <div class='dash-buttons'>
      <Link to='/edit-profile' class='btn btn-edit'>
        <i class='fas fa-user-circle text-dark'></i> Edit Profile{' '}
      </Link>

      <Link to='/add-experience' class='btn btn-exp'>
        <i class='fab fa-black-tie text-dark'></i> Add Experience
      </Link>
      <Link to='/add-education' class='btn btn-edu'>
        <i class='fas fa-graduation-cap text-dark'></i> Add Education
      </Link>
    </div>
  );
};

export default DashboardActions;
