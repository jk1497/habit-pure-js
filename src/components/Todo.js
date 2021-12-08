import React, { useEffect, useRef, useState } from "react";


function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export default function Todo(props) {
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState('');

  const editFieldRef = useRef(null);
  const editButtonRef = useRef(null);

  const wasEditing = usePrevious(isEditing);

  function handleChange(e) {
    setNewName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!newName.trim()) {
      return;
    }
    props.editHabit(props.habitid, newName);
    setNewName("");
    setEditing(false);
  }

  const editingTemplate = (
    <form className="stack-small" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="todo-label" htmlFor={props.habitid}>
          New name for {props.description}
        </label>
        <input
          habitid={props.habitid}
          className="todo-text"
          type="text"
          value={newName || props.description}
          onChange={handleChange}
          ref={editFieldRef}
        />
      </div>
      <div className="btn-group">

        <button
          type="button"
          className="btn todo-cancel"
          onClick={() => setEditing(false)}
        >
          Cancel
          <span className="visually-hidden">renaming {props.description}</span>
        </button>
        <button type="submit" className="btn btn__primary todo-edit">
          Save
          <span className="visually-hidden">new name for {props.description}</span>
        </button>
      </div>
    </form>
  );

  const viewTemplate = (
    <div className="stack-small">
      <div className="c-cb">
          <input
            habitid={props.habitid}
            type="checkbox"
            defaultChecked={props.completed}
            onChange={() => props.toggleHabitCompleted(props.habitid)}
          />
          <label className="todo-label" htmlFor={props.habitid}>
            {props.habitid} Current Streak: {props.streakcounter}
          </label>
        </div>
        <div className="btn-group">
        <button
          type="button"
          className="btn"
          onClick={() => setEditing(true)}
          ref={editButtonRef}
          >
            Edit <span className="visually-hidden">{props.description}</span>
          </button>
          <button
            type="button"
            className="btn btn__danger"
            onClick={() => props.deleteHabit(props.habitid)}
          >
            Delete <span className="visually-hidden">{props.habitid}</span>
          </button>
        </div>
    </div>
  );

  useEffect(() => {
    if (!wasEditing && isEditing) {
      editFieldRef.current.focus();
    }
    if (wasEditing && !isEditing) {
      editButtonRef.current.focus();
    }
  }, [wasEditing, isEditing]);


  return <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>;
}
