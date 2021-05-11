import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const ProfileAbout = ({
  profile: {
    about,
    skills,
    user: { name },
  },
}) => (
  <div class='profile-about bg-light p-2'>
    {about && (
      <Fragment>
        <h2 className='text-secondary'>About {name.trim().split(' ')[0]}</h2>
        <p>{about}</p>
        <div className='line' />
      </Fragment>
    )}

    <h2 className='text-secondary'>Skill Set</h2>
    <div className='skills'>
      {skills.map((skill, index) => (
        <div key={index} className='p-1'>
          <i className='fas fa-check' /> {skill}
        </div>
      ))}
    </div>
  </div>
);

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileAbout;
