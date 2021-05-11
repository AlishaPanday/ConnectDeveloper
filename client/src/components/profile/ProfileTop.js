import React from 'react';
import PropTypes from 'prop-types';

const ProfileTop = ({
  profile: {
    title,
    organisation,
    location,
    website,
    socialmedia,
    user: { name, avatar },
  },
}) => {
  return (
    <div class='profile-top bg-primary p-2'>
      <img class='round-img my-1' src={avatar} alt='' />
      <h1 class='large'>{name}</h1>
      <p class='lead'>
        {title} {organisation && <span> at {organisation}</span>}
      </p>
      <p>{location}</p>

      <div class='icons my-1'>
        {website && (
          <a href={website} target='_blank' rel='noopener noreferrer'>
            <i class='fas fa-globe fa-2x'></i>
          </a>
        )}

        {socialmedia && socialmedia.twitter && (
          <a
            href={socialmedia.twitter}
            target='_blank'
            rel='noopener noreferrer'
          >
            <i class='fab fa-twitter fa-2x'></i>
          </a>
        )}
        {socialmedia && socialmedia.facebook && (
          <a
            href={socialmedia.facebook}
            target='_blank'
            rel='noopener noreferrer'
          >
            <i class='fab fa-facebook fa-2x'></i>
          </a>
        )}
        {socialmedia && socialmedia.linkedin && (
          <a
            href={socialmedia.linkedin}
            target='_blank'
            rel='noopener noreferrer'
          >
            <i class='fab fa-linkedin fa-2x'></i>
          </a>
        )}
        {socialmedia && socialmedia.youtube && (
          <a
            href={socialmedia.youtube}
            target='_blank'
            rel='noopener noreferrer'
          >
            <i class='fab fa-youtube fa-2x'></i>
          </a>
        )}
        {socialmedia && socialmedia.instagram && (
          <a
            href={socialmedia.instagram}
            target='_blank'
            rel='noopener noreferrer'
          >
            <i class='fab fa-instagram fa-2x'></i>
          </a>
        )}
      </div>
    </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileTop;
