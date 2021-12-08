import React, { useState } from "react";

function Form(props) {
  const [description, setName] = useState('');


  function handleSubmit(e) {
    e.preventDefault();
    if (!description.trim()) {
      return;
    }
    props.addHabit(description);
    setName("");
  }


  function handleChange(e) {
    setName(e.target.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="label-wrapper">
        <label htmlFor="new-todo-input" className="label__lg">
          What needs to be done?
        </label>
      </h2>

      <input
        type="text"
        habitid="new-todo-input"
        className="input input__lg"
        name="text"
        autoComplete="off"
        value={description}
        onChange={handleChange}
      />
      <button type="submit" className="btn btn__primary btn__lg">
        Add
      </button>
    </form>
  );
}

export default Form;
