import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deleteEducation } from '../../actions/profile';

//Experience passed from parent component dashboard.js

const Education = ({ education, deleteEducation }) => {
  const educations = education.map(edu => (
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td className='hide-sm'>{edu.degree}</td>
      <td>
        <Moment format='YYYY/MM/DD'>{edu.from}</Moment> -{' '}
        {edu.to === null ? (
          'Now'
        ) : (
          <Moment format='YYYY/MM/DD'>{edu.to}</Moment>
        )}
      </td>
      <td>
        <button
          onClick={() => deleteEducation(edu._id)}
          className='btn btn-danger'
        >
           <i className = "fas fa-trash-alt"></i>
        </button>
      </td>
    </tr>
  ));
  return (
    <Fragment>
      <h2 className='profile-about bg-light p-2 my-2'>Education History</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>School/University</th>
            <th className='profile-about hide-sm '>Certification/Degree</th>
            <th>Years</th>
            <th>Remove</th>
          </tr>
        </thead>
        {/* //loop through the data & format it  */}
        <tbody>{educations}</tbody>
      </table>
    </Fragment>
  );
};

Education.propTypes = {
  education: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired,
};

export default connect(null, { deleteEducation })(Education);
