import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams, createSearchParams } from 'react-router-dom';
import { search } from '../../util/entities_api_util';
import Loading from './loading';
import SearchGroupItem from './search_group_item';
import SearchEventItem from './search_event_item';
import { getUpcomingEvents } from '../../util/event_util';

function Search() {
  const [searchParams] = useSearchParams();
  const [searching, setSearching] = useState(true)
  const [results, setResults] = useState([])
  const [searchType, setSearchType] = useState(searchParams.get("type"))

  useEffect(() => {
    window.scrollTo(0, 0);
    setSearching(true)
    search(searchType, Object.fromEntries(searchParams))
      .then((data) => {
        let entityData = Object.values(data)
        if (searchType === "events") {
          entityData = getUpcomingEvents(entityData)
        }
        setResults(entityData)
        setSearching(false)
      })
  }, [searchParams, searchType])

  const navigate = useNavigate();

  const toggleSearch = (type: string) => {
    setSearching(true)    
    setSearchType(type)
    searchParams.set("type", type)
    navigate(`/search/?${createSearchParams(searchParams)}`)
  }

  const searchingEvents = () => {
    return searchType === "events" ? "active" : ""
  }

  const searchingGroups = () => {
    return searchType === "groups" ? "active" : ""
  }

  return (
    <div className="body search">
      <ul className="entities">
        <li><a onClick={() => toggleSearch("events")} className={searchingEvents()}><h3>Events</h3></a></li>
        <li><a onClick={() => toggleSearch("groups")} className={searchingGroups()}><h3>Groups</h3></a></li>
      </ul>

      {searching && <Loading />}

      {(!searching && searchType === "groups") &&
        <ul className="results">
          {
            results !== undefined && 
            results.map(result => <SearchGroupItem key={result.id} group={result} />)
          }
        </ul>
      }

      {(!searching && searchType === "events") &&
        <ul className="results">
          {
            results !== undefined && 
            results.map(result => <SearchEventItem key={result.id} event={result} />)
          }
        </ul>
      }

      {(!searching && results.length === 0) &&
        <>
          <h3>No results found!</h3>
          <p>Try broadening your search.</p>
        </>
      }

    </div>
  );
}

export default Search;