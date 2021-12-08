import React, { useState, useRef, useEffect } from "react";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";
import { nanoid } from "nanoid";
import './App.css';


function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const FILTER_MAP = {
  All: () => true,
  Active: habit => !habit.completed,
  Completed: habit => habit.completed
};

const FILTER_NAMES = Object.keys(FILTER_MAP);



function App(props) {
  const [habits, setHabits] = useState(props.habits);
  const [filter, setFilter] = useState('All');

  function toggleHabitCompleted(habitid) {
    const updatedHabits = habits.map(habit => {
      // if this task has the same ID as the edited task
      if (habitid === habit.habitid) {
        // use object spread to make a new obkect
        // whose `completed` prop has been inverted
        habit.streakcounter +=1
        return {...habit, completed: !habit.completed}
      }
      return habit;
    });
    setHabits(updatedHabits);
  }


  function deleteHabit(habitid) {
    const remainingHabits = habits.filter(habit => habitid !== habit.habitid);
    setHabits(remainingHabits);
  }


  function editHabit(habitid, newDescription) {
    const editedHabitList = habits.map(habit => {
    // if this task has the same ID as the edited task
      if (habitid === habit.habitid) {
        //
        return {...habit, description: newDescription}
      }
      return habit;
    });
    setHabits(editedHabitList);
  }
  
  const habitList = habits
  .filter(FILTER_MAP[filter])
  .map(habit => (
    <Todo
      habitid={habit.habitid}
      description={habit.description}
      happiness={habit.happiness}
      frequency={habit.frequency}
      streakcounter={habit.streakcounter}
      higheststreak={habit.higheststreak}
      uid={habit.uid}
      completed={habit.completed}
      key={habit.habitid}
      toggleHabitCompleted={toggleHabitCompleted}
      deleteHabit={deleteHabit}
      editHabit={editHabit}
    />
  ));

  const filterList = FILTER_NAMES.map(description => (
    <FilterButton
      key={description}
      description={description}
      isPressed={description === filter}
      setFilter={setFilter}
    />
  ));

  function addHabit(description) {
    const newHabit = {
      habitid: nanoid(), 
      description: description, 
      completed: false, 
      happiness: 0, 
      frequency: 1, 
      last_logged:'20XX-XX-XX', 
      date_started:'20XX-XX-XX', 
      streakcounter: 0, 
      higheststreak: 0, 
      uid: 2
    };
    setHabits([...habits, newHabit]);
  }

  const habitsNoun = habitList.length !== 1 ? 'habits' : 'habit';
  const headingText = `${habitList.length} ${habitsNoun} remaining`;

  const listHeadingRef = useRef(null);
  const prevHabitLength = usePrevious(habits.length);

  useEffect(() => {
    if (habits.length - prevHabitLength === -1) {
      listHeadingRef.current.focus();
    }
  }, [habits.length, prevHabitLength]);

  return (
    <div className="todoapp stack-large">
      <Form addHabit={addHabit} />
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>
      <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
        {headingText}
      </h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {habitList}
      </ul>
    </div>
  );
}

export default App;
