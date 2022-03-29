import React, { useState, useEffect } from 'react';
import { Group } from '../../types/types';
import GroupPanelMembers from './group_panel_members';
import GroupPanelOrganizers from './group_panel_organizers';
import GroupEvents from './group_about_events';

function GroupAbout({ group }: {group: Group}) {

  return (
    <div className="group-about">
      <div className="description">
        <h4>What we're about</h4>
        <p>{group === undefined ? "" : group.description}</p>
      </div>

      <div className="members-panel">
        <GroupPanelOrganizers group={group}/>
        <GroupPanelMembers group={group} />
      </div>

      <GroupEvents group={group} />
    </div>
  );
}

export default GroupAbout;