import React, {useState, useEffect} from 'react';
import { Group } from '../../types/types';
import { getOrganizers } from '../../util/group_util';
import { Organizers } from './group_header';

function GroupPanelOrganizers({ group }: {group: Group}) {
  const [loading, setLoading] = useState(true)
  const [organizers, setOrganizers] = useState<Organizers>([]);

  useEffect(() => {
    getOrganizers(group).then(data => {
      setOrganizers(Object.values(data))
      setLoading(false)
    })
  }, [group])

  return (
    <div className="organizers">
      <h4>Organizers</h4>
        {loading ? <p>...</p> : 
          <p><strong>{organizers[0].fname} {organizers[0].lname || ""} and {organizers.length - 1} others</strong></p>
        }
    </div>
  );
}

export default GroupPanelOrganizers;