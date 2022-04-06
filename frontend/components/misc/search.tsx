import React, { useEffect, useState } from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';
import { Group } from '../../types/types';
import { search } from '../../util/entities_api_util';
import Loading from './loading';
import SearchGroupItem from './search_group_item';
import SearchEventItem from './search_event_item';

function Search() {
  const [searchParams] = useSearchParams();
  const [searching, setSearching] = useState(true)
  const [results, setResults] = useState<Group[]>([])
  const [searchType, setSearchType] = useState("events")

  useEffect(() => {
    setSearching(true)
    search(searchType, Object.fromEntries(searchParams))
      .then((data) => {
        setResults(Object.values(data))
        setSearching(false)
      })
  }, [searchParams, searchType])

  const toggleSearch = (entity: string) => {   
    if (entity !== searchType) {
      setSearching(true)
      setSearchType(entity)
    }
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
        <li onClick={() => toggleSearch("events")} className={searchingEvents()}><h3>Events</h3></li>
        <li onClick={() => toggleSearch("groups")} className={searchingGroups()}><h3>Groups</h3></li>
      </ul>

      {searching && <Loading />}

      {(!searching && searchType === "groups") &&
        <ul className="results">
          {
            results.map(result => <SearchGroupItem key={result.id} group={result} />)
          }
        </ul>
      }

      {(!searching && searchType === "events") &&
        <ul className="results">
          {
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