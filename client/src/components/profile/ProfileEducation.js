import React from 'react';
import PropTypes from 'prop-types';
// import formatDate from '../../utils/formatDate';
import Moment from 'react-moment';

const ProfileEducation = ({
  education: { school, degree, fieldofstudy, current, to, from, description },
}) => (
  <div>
    <h3 className='text-dark'>{school}</h3>
    <p>
      {/* {formatDate(from)} - {to ? formatDate(to) : 'Now'} */}
      <Moment format='YYYY/MM/DD'>{from}</Moment>-
      {!to ? 'Present' : <Moment format='YYYY/MM/DD'>{to}</Moment>}
    </p>
    <p>
      <strong>Certification/Degree:</strong> {degree}
    </p>
    <p>
      <strong>Faculty:</strong> {fieldofstudy}
    </p>
    <p>
      <strong>description: </strong> {description}
    </p>
  </div>
);

ProfileEducation.propTypes = {
  education: PropTypes.object.isRequired,
};

export default ProfileEducation;
