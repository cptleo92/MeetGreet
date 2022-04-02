import React, {useState, useEffect} from 'react';
import { Group } from '../../types/types';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useNavigate } from 'react-router-dom';

function GroupPanelOrganizers({ group }: {group: Group}) {
  // old code - keeping this around in case 
  //
  // const [loading, setLoading] = useState(true)
  // const [organizers, setOrganizers] = useState<Organizers>([]);

  // useEffect(() => {
  //   getOrganizers(group).then(data => {
  //     setOrganizers(Object.values(data))
  //     setLoading(false)
  //   })
  // }, [group])

  const organizers = useSelector((state: RootState) => state.ui.group.organizers)

  const navigate = useNavigate();
  const goToMembers = () => {
    navigate("members/leadership")
  }

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

  return (
    <div className="organizers">
      <h4>Organizers</h4>       
        <div className="info">
          <img className="avatar-round-small" src={organizers[0].avatar} />
          <p onClick={goToMembers}><strong>{organizers[0].fname} {organizers[0].lname || ""}</strong> {multipleOrganizers()}</p>        
        </div>
    </div>
  );
}

export default GroupPanelOrganizers;