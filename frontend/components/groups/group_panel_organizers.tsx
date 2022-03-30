import React, {useState, useEffect} from 'react';
import { Group } from '../../types/types';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

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

  return (
    <div className="organizers">
      <h4>Organizers</h4>
        
          <p><strong>{organizers[0].fname} {organizers[0].lname || ""} and {organizers.length - 1} others</strong></p>
        
    </div>
  );
}

export default GroupPanelOrganizers;