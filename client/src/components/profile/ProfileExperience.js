import React from 'react';
import PropTypes from 'prop-types';
// import formatDate from '../../utils/formatDate';
import Moment from 'react-moment';

const ProfileExperience = ({
  experience: { company, title, location, current, to, from, description },
}) => (
  <div>
    <h3 className='text-dark'>{company}</h3>
    <p>
      {/* {formatDate(from)} - {to ? formatDate(to) : 'Now'} */}
      <Moment format='YYYY/MM/DD'>{from}</Moment>-
      {!to ? 'Present' : <Moment format='YYYY/MM/DD'>{to}</Moment>}
    </p>
    <p>
      <strong>Job Position: </strong> {title}
    </p>
    <p>
      <strong>Location: </strong> {location}
    </p>
    <p>
      <strong>Job Description: </strong> {description}
    </p>
  </div>
);

ProfileExperience.propTypes = {
  experience: PropTypes.object.isRequired,
};

export default ProfileExperience;
