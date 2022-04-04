import { group } from 'console';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { createGroup, updateGroup } from '../../actions/groups_actions';
import { RootState } from '../../store/store';
import { Group, GroupEntity, Topic } from '../../types/types';
import { useUser } from '../../util/hooks';
import { createMembership } from '../../actions/users_actions';
import FormErrors from '../user_forms/form_errors';
import { createTopic } from '../../util/entities_api_util';

export interface newGroupType {
  id?: number;
  title: string;
  description: string;
  location: string;
  public: string | boolean;
  topics?: string[];
}

const _nullGroup = {
  title: "",
  description: "",
  location: "",
  public: "true",
  topics: []
}

function GroupForm({ type }: { type: string }) {
  const { id }  = useParams();

  const groups = useSelector((state: RootState) => state.entities.groups) 
  const group = id ? groups[id] : _nullGroup 

  const dispatch = useDispatch();
  const user = useUser();

  const [input, setInput] = useState<newGroupType>(group)

  const [inputTopic, setInputTopic] = useState("")
  const [inputTopics, setInputTopics] = useState<string[]>(
    type === "new" ? [] : group.topics
  )


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

  console.log(input)

  const removeTopic = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const topic = e.target.value;
    setInput(prevInput => ({
      ...prevInput,
      topics: prevInput.topics.filter(prevTopic => prevTopic !== topic)
      })
    )
  }

  // const makeNewTopics = (groupId: number) => {
  //   const newTopics: Topic[] = inputTopics.map(inputTopic => ({
  //     name: inputTopic,
  //     topicable_id: groupId,
  //     topicable_type: "Group"
  //   }))
    
  //   newTopics.forEach(newTopic => {
  //     createTopic(newTopic)
  //     .then(data => console.log(data))
  //   })
  // }

  const navigate = useNavigate();

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newGroup: newGroupType = {
      title: input.title,
      description: input.description,
      location: input.location,
      public: (input.public === "true" ? true : false),
    }

    if (type === "new") {

      dispatch(createGroup(newGroup, input.topics))
      .then(({ payload }: { payload: GroupEntity }) => {
        const groupId = parseInt(Object.keys(payload)[0])
        
        // create membership for current user as organizer
        const newMembership = {
          member_id: user.id,
          group_id: groupId,
          organizer: true
        }                 
        
        // makeNewTopics(groupId)        
        
        dispatch(createMembership(newMembership))
        // .then(() => navigate('/groups/new/success'))
        .then(() => navigate(`/groups/${groupId}`))
      })

    } else { 
      // makeNewTopics(newGroup.id)
      // newGroup.topics = inputTopics;
      dispatch(updateGroup({...newGroup, id: input.id}, input.topics))
        .then(() => navigate(`/groups/${input.id}`))
    }
  }

  const errors = useSelector((state: RootState) => state.errors.group)

  return (
    <div className="body group-form">
      <div className="back" onClick={() => navigate(-1)}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          {/* ! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. */}
          <path d="M447.1 256C447.1 273.7 433.7 288 416 288H109.3l105.4 105.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L109.3 224H416C433.7 224 447.1 238.3 447.1 256z"/></svg>
      </div>
      <h2 className="form-header">
        {
          type === "new" ? "Create a new group today!" : "Update your group info!"
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

        <div className="form-line radio">
          <label>Public?</label>
          <p className="form-info">If set to NO, members have to request to join the group. Only group members can attend events from this group and view information about this group's events.<br/>If unchecked, this defaults to NO!</p>
          <label>
            <input
              type="radio"
              value="true"
              checked={input.public === "true"}
              onChange={update}
              name="public"
            />
            Yes
          </label>

          <label>
            <input
              type="radio"
              value="false"
              checked={input.public === "false"}
              onChange={update}
              name="public"
            />
            No
          </label>
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
              placeholder="Press 'Enter' to add topic"
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
          type === "new" ? "Create group!" : "Update group!"
        }
        </button>
      </form>

      {errors && <FormErrors formType="group" />}
    </div>
  );
}

export default GroupForm;