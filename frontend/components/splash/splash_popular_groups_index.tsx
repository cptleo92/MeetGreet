import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Group } from "../../types/types";
import { fetchGroups } from "../../actions/groups_actions";
import SplashPopularGroupsItem from "./splash_popular_groups_item";

const SplashPopularGroupsIndex = () => {
  const [loading, setLoading] = useState(true);
  const [groups, setGroups] = useState<Group[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true)
    dispatch(fetchGroups("splash"))
        .then(groupsData => setGroups(Object.values(groupsData.payload)))        
          .then(() => setLoading(false))              
  }, [])


  // this seems like a better way of keeping track of scrolls
  // rather than getting exact pixels and all that
  const [counter, setCounter] = useState(0);  
  // throttle so user can only click after done scrolling  
  const [scrolling, setScrolling] = useState(false)

  const scroll = (dir) => {
    setScrolling(true) 
    const list = document.querySelector('.splash-suggestions-list.groups')
      if (dir === 'left') {
        list.scrollLeft -= 1010;
        setTimeout(() => setScrolling(false), 400)
        setCounter(prevCounter => prevCounter - 1)
      } else {
        list.scrollLeft += 1000;
        setTimeout(() => setScrolling(false), 400)
        setCounter(prevCounter => prevCounter + 1)
      }
  }

  return (
    <div className="scroll-container">
      <ul className="splash-suggestions-list groups">
        { !loading &&
          groups.map(group => <SplashPopularGroupsItem key={group.id} group={group} />)
        }
      </ul>
      <div className="buttons">
        <button disabled={(counter === 0 || scrolling) ? true : false} className="scroll left" onClick={() => scroll('left')}>&lt;</button> 
        <button disabled={(counter === 2 || scrolling) ? true : false} className="scroll right" onClick={() => scroll('right')}>&gt;</button>
      </div>
    </div>
  )
}

export default SplashPopularGroupsIndex