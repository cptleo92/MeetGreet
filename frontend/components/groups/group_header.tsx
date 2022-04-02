import React, { useState, useEffect } from 'react';
import { Group } from '../../types/types';
import { useNavigate, useParams } from 'react-router-dom';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';

function GroupHeader({ group }: {group: Group}) {

  const organizers = useSelector((state: RootState) => state.ui.group.organizers)

  const multipleOrganizers = () => {
    if (organizers.length === 2) {
      return (
        <>
          and <strong>{organizers.length - 1} other</strong>
        </>
      )
    } else if (organizers.length > 2) {
      return (
        <>
          and <strong>{organizers.length - 1} others</strong>
        </>
      )
    }
  }

  const navigate = useNavigate();
  const goToMembers = () => {
    navigate("members/leadership")
  }

  return (
    <div className="group-header body">
      <img className="avatar-big" src={group.avatar}/>

      <div className="info">
        <h1>{group === undefined ? "" : group.title}</h1>
        <ul>
          <li className="location">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
            {/* Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc */}
            <path d="M168.3 499.2C116.1 435 0 279.4 0 192C0 85.96 85.96 0 192 0C298 0 384 85.96 384 192C384 279.4 267 435 215.7 499.2C203.4 514.5 180.6 514.5 168.3 499.2H168.3zM192 256C227.3 256 256 227.3 256 192C256 156.7 227.3 128 192 128C156.7 128 128 156.7 128 192C128 227.3 156.7 256 192 256z"/></svg>
            <p>{group === undefined ? "Loading..." : group.location || "Location not provided!"}</p>
          </li>

          <li className="members">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
            {/* Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. */}
            <path d="M224 256c70.7 0 128-57.31 128-128S294.7 0 224 0C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3c-95.73 0-173.3 77.6-173.3 173.3C0 496.5 15.52 512 34.66 512H413.3C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304zM479.1 320h-73.85C451.2 357.7 480 414.1 480 477.3C480 490.1 476.2 501.9 470 512h138C625.7 512 640 497.6 640 479.1C640 391.6 568.4 320 479.1 320zM432 256C493.9 256 544 205.9 544 144S493.9 32 432 32c-25.11 0-48.04 8.555-66.72 22.51C376.8 76.63 384 101.4 384 128c0 35.52-11.93 68.14-31.59 94.71C372.7 243.2 400.8 256 432 256z"/></svg>
            <p>{group === undefined ? "..." : group.members.length} members - {group === undefined ? "..." : group.public ? "Public" : "Private"} group</p>
          </li>

          <li className="organizers">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            {/* Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc.  */}
            <path d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z"/></svg>
            {
              organizers.length === 0 ? "Loading..." : 
              <p>
                Organized by <a onClick={goToMembers}><strong>{organizers[0].fname} {organizers[0].lname || ""}</strong> {multipleOrganizers()}</a>
              </p>                
            } 
          </li>
        </ul>
      </div>
    </div>
  );
}

export default GroupHeader;