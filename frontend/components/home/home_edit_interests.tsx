import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { receiveUser } from "../../actions/session_actions";
import { RootState } from '../../store/store';
import { updateUserTopics } from "../../util/entities_api_util";
import { useUser } from "../../util/hooks";

function HomeEditInterests() {
  const user = useUser();
  const topicsFromStore = useSelector((state: RootState) => state.entities.users[user.id].topics)
  const [inputTopic, setInputTopic] = useState("")
  const [topics, setTopics] = useState(topicsFromStore)

  const dispatch = useDispatch();

  const updateTopic = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputTopic(e.target.value);
  }

  const handleEnterTopic = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (inputTopic !== "") {
        setTopics([...topics, inputTopic])
        setInputTopic("")
      }
    }
  }

  const navigate = useNavigate();

  const submit = () => {
    updateUserTopics(user, topics)
      .then((user) => {
        dispatch(receiveUser(user))
      }
      ).then(() => navigate("/home"))
  }


  const removeTopic = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const topic = e.target.value;
    setTopics(prevTopics => prevTopics.filter(prevTopic => prevTopic !== topic))
  }

  useEffect(() => {
    window.scrollTo(0,0)
  }, [])

  return (
    <div className="edit-topics body">
      <div className="back" onClick={() => navigate(-1)}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          {/* ! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. */}
          <path d="M447.1 256C447.1 273.7 433.7 288 416 288H109.3l105.4 105.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L109.3 224H416C433.7 224 447.1 238.3 447.1 256z" /></svg>
      </div>
      <h2 className="form-header">
        Add or remove your interests!
      </h2>
      <ul>
        {
          topics.map((topic, idx) =>
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
      <input
        className="add-interests"
        type="text"
        value={inputTopic}
        onChange={updateTopic}
        onKeyDown={handleEnterTopic}
        placeholder="Type and press 'Enter' to add"
      />
      <br/>
      <button className="btn-red" onClick={submit}>Save</button>
    </div>
  );
}

export default HomeEditInterests;