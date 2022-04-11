import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import DatePicker from "react-datepicker"
import { useUser } from '../../util/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import FormErrors from '../user_forms/form_errors';
import { createEvent, updateEvent } from '../../actions/events_actions';
import { AttendancePost, EventEntity } from '../../types/types';
import { createAttendance } from '../../actions/users_actions';

export interface newEventType {
  id?: number;
  title: string;
  description: string;
  location: string;
  start_time: string;
  end_time: string;
  capacity: number;
  topics?: string[];
  group_id: number;
  host_id: number;
}

const _nullEvent = {
  title: "",
  description: "",
  location: "",
  start_time: "",
  end_time: "",
  capacity: 0,
  topics: [],
  group_id: 0,
  host_id: 0
}

function EventForm({ type }: { type: string }) {
  const { group_id, event_id } = useParams();
  
  const errors = useSelector((state: RootState) => state.errors.event)
  const events = useSelector((state: RootState) => state.entities.events)
  const event = event_id ? events[event_id] : _nullEvent
  const user = useUser();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [input, setInput] = useState<newEventType>(event)
  const [inputTopic, setInputTopic] = useState("")
  const [startDate, setStartDate] = useState(type === "new" ? new Date() : new Date(event.start_time));
  const [endDate, setEndDate] = useState(type === "new" ? new Date() : new Date(event.end_time));

  const update = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }

  const updateTopic = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputTopic(e.target.value);
  }

  const handleEnterTopic = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (inputTopic !== "") {
        setInput(prevInput => ({
          ...prevInput,
          topics: [...prevInput.topics, inputTopic]
        }))
        setInputTopic("")
      }
    }
  }

  const removeTopic = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const topic = e.target.value;
    setInput(prevInput => ({
      ...prevInput,
      topics: prevInput.topics.filter(prevTopic => prevTopic !== topic)
    })
    )
  }

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newEvent: newEventType = {
      title: input.title,
      description: input.description,
      location: input.location,
      capacity: Number(input.capacity),
      start_time: startDate.toISOString(),
      end_time: endDate.toISOString(),      
      group_id: Number(group_id),
      host_id: user.id
    }    

    if (type === "new") {
      dispatch(createEvent(newEvent, input.topics))
        .then(({ payload }: { payload: EventEntity }) => {
          const eventId = Number(Object.keys(payload)[0])

          const newAttendance: AttendancePost = {
            attendee_id: user.id,
            event_id: eventId
          }

          dispatch(createAttendance(newAttendance))
            .then(() => navigate(`/groups/${group_id}/events/${eventId}`))
        })
    } else {
      dispatch(updateEvent({...newEvent, id: event_id}, input.topics))
        .then(() => navigate(`/groups/${group_id}/events/${event_id}`))
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  return (
    <div className="body event-form">
      <div className="back" onClick={() => navigate(-1)}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          {/* ! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. */}
          <path d="M447.1 256C447.1 273.7 433.7 288 416 288H109.3l105.4 105.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L109.3 224H416C433.7 224 447.1 238.3 447.1 256z" /></svg>
      </div>
      <h2 className="form-header">
        {
          type === "new" ? "Host a new event!" : "Update your event info!"
        }
      </h2>

      <form>
        <div className="form-line">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={input.title}
            onChange={update}
            name="title"
          />
        </div>


        <div className="form-line">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={input.description}
            onChange={update}
            name="description"
          />
        </div>

        <div className="form-line">
          <label htmlFor="location">Location</label>
          <input
            id="location"
            type="text"
            value={input.location}
            onChange={update}
            name="location"
          />
        </div>

        <div className="form-line">
          <label htmlFor="capacity">Capacity</label>
          <p className="form-info">Enter 0 if your event has no limit on attendees.</p>
          <input
            id="capacity"
            type="number"
            min="0"
            value={input.capacity}
            onChange={update}
            name="capacity"
          />
        </div>

        <div className="form-line">
          <label htmlFor="start_time">Start Time</label>
          <DatePicker
            id="start_time"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            timeInputLabel="Time:"
            dateFormat="MM/dd/yyyy h:mm aa"
            showTimeInput
          />
        </div>

        <div className="form-line">
          <label htmlFor="end_time">End Time</label>
          <DatePicker
            id="end_time"
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            timeInputLabel="Time:"
            dateFormat="MM/dd/yyyy h:mm aa"
            showTimeInput
          />
        </div>

        <div className="form-line">
          <label>
            Topics
            <p className="form-info">Choose some topics for your group! Ex. kayaking, cooking, nature, sports, social, art, movies, bar-hopping, books, etc</p>
            <input
              type="text"
              value={inputTopic}
              onChange={updateTopic}
              onKeyDown={handleEnterTopic}
              placeholder="Type and press 'Enter' to add"
            />
          </label>
          <ul>
            {
              input.topics.map((topic, idx) =>
                <button
                  className="topic-button"
                  onClick={removeTopic}
                  type="button"
                  value={topic}
                  key={idx}>
                  {topic}
                </button>)
            }
          </ul>
        </div>
        <button type="button" onClick={submit} className="btn-red">
          {
            type === "new" ? "Create event!" : "Update event!"
          }
        </button>
      </form>

      {errors && <FormErrors formType="event" />}
    </div>
  );
}

export default EventForm;