import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Group, MembershipObject, User, UserName } from '../../types/types';
import { useLoggedIn, useUser } from '../../util/hooks';
import GroupMembersItem from './group_members_item';

function GroupMembersList({ group, organizers }: { group: Group, organizers: boolean }) {
  const membersFromStore: User[] = useSelector((state: RootState) => state.ui.group.members)
  const organizersFromStore = useSelector((state: RootState) => state.ui.group.organizers)
  const memberships: MembershipObject = useSelector((state: RootState) => state.ui.group.memberships)

  const [peopleList, setPeopleList] = useState(membersFromStore);
  const [sortType, setSortType] = useState(true); // default sort by name

  const sortByDate = (list: UserName[]) => {
    let sortedList = [...list]
    return sortedList.sort((member1, member2) => {
      const create1 = new Date(memberships[member1.id].created_at)
      const create2 = new Date(memberships[member2.id].created_at)
      return create1.valueOf() - create2.valueOf()
    })
  }

  const sortByName = (list: UserName[]) => {
    let sortedList = [...list]
    return sortedList.sort((member1, member2) => {
      const name1 = member1.fname.toUpperCase();
      const name2 = member2.fname.toUpperCase();
      if (name1 < name2) {
        return -1;
      }
      if (name1 > name2) {
        return 1;
      }
      return 0;
    })
  }

  const setMembers = () => {
    if (organizers) {
      if (sortType) {
        setPeopleList(sortByName(organizersFromStore))
      } else {
        setPeopleList(sortByDate(organizersFromStore))
      }
    } else {
      if (sortType) {
        setPeopleList(sortByName(membersFromStore))
      } else {
        setPeopleList(sortByDate(membersFromStore))
      }
    }

    setPeopleList(prevPeopleList => {
      return prevPeopleList.filter(member => memberships[member.id].status === "APPROVED")
    })
  }

  useEffect(() => {
    setMembers()
    setSearch("")
  }, [group, organizers, sortType])

  const [search, setSearch] = useState("")

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    let searchVal = e.target.value
    setSearch(searchVal)

    if (e.target.value !== "") {
      setPeopleList(
        peopleList.filter((member: UserName) => {
          let lowerFName = member.fname.toLowerCase();
          let lowerLName = member.lname.toLowerCase();
          searchVal = searchVal.toLowerCase();
          return lowerFName.startsWith(searchVal) || lowerLName.startsWith(searchVal)
        }))
    } else {
      setMembers();
    }
  }

  const toggleSort = () => {
    setSortType(!sortType)
  }

  const user = useUser();
  const loggedIn = useLoggedIn();

  const userNotMemberPrivateGroup = () => {
    if (!loggedIn) {
      return true;
    } else {
      if (!group.public && loggedIn) {
        return !user.groups.includes(group.id)
      }
      return false;
    }
  }

  return (
    <div className="member-list">
      <div className="member-list-header">
        <h3>{organizers ? "Leadership team" : "All members"}</h3>
        <a onClick={toggleSort}>Sort by {sortType ? "Name" : "Join Date"}</a>
      </div>
      <div className="member-search">
        {/* Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc.  */}
        <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z" /></svg>
        <input
          type="text"
          placeholder="Search members"
          onChange={handleSearch}
          value={search}
        />
      </div>

      {userNotMemberPrivateGroup() ?
        <div className="locked">This content is available only to members</div> :
        <ul>
          {
            peopleList.map((member: UserName, idx: number) => <GroupMembersItem key={idx} member={member} />)
          }
        </ul>
      }
    </div>
  );
}

export default GroupMembersList;