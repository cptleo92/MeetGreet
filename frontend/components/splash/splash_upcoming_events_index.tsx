import React, { useState, useEffect} from "react";
import { useDispatch } from "react-redux";
import { fetchEvents } from "../../actions/events_actions";
import { Event } from "../../types/types";
import SplashUpcomingEventsItem from "./splash_upcoming_events_item";


const SplashUpcomingEventsIndex = () => {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<Event[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true)
    dispatch(fetchEvents("splash"))
        .then(eventsData => setEvents(Object.values(eventsData.payload)))        
          .then(() => setLoading(false))              
  }, [])


  // this seems like a better way of keeping track of scrolls
  // rather than getting exact pixels and all that
  const [counter, setCounter] = useState(0);  
  // throttle so user can only click after done scrolling  
  const [scrolling, setScrolling] = useState(false)

  const scroll = (dir) => {
    setScrolling(true) 
    const list = document.querySelector('.splash-suggestions-list.events')
      if (dir === 'left') {
        list.scrollLeft -= 260;
        setTimeout(() => setScrolling(false), 400)
        setCounter(prevCounter => prevCounter - 1)
      } else {
        list.scrollLeft += 260;
        setTimeout(() => setScrolling(false), 400)
        setCounter(prevCounter => prevCounter + 1)
      }
  }

  return (
    <div className="scroll-container">      
      <ul className="splash-suggestions-list events">  
      
      { !loading &&
        events.map(event => <SplashUpcomingEventsItem key={event.id} event={event} />)
      }
      </ul>
      <div className="buttons">
        <button disabled={(counter === 0 || scrolling) ? true : false} className="scroll left" onClick={() => scroll('left')}>&lt;</button> 
        <button disabled={(counter === 4 || scrolling) ? true : false} className="scroll right" onClick={() => scroll('right')}>&gt;</button>
      </div>
    </div>
  )
}

export default SplashUpcomingEventsIndex