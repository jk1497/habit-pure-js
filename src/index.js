import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

const DATA = [
  { id: "todo-0", name: "Eat", completed: true },
  { id: "todo-1", name: "Sleep", completed: false },
  { id: "todo-2", name: "Repeat", completed: false }
];

const DATA2 = [
  {habitid: 1, description: "pilates", happiness: 5, frequency: 1, last_logged:'2021-11-25', date_started:'2021-12-02', streakcounter: 1, higheststreak: 1, uid: 2, completed: true}, 
  {habitid: 2, description: "killing", happiness: 5, frequency: 7, last_logged:'2021-11-26', date_started:'2021-12-01', streakcounter: 99, higheststreak: 100, uid: 2, completed: false},
  {habitid: 3, description: "brush teeth", happiness: 5, frequency: 1, last_logged:'2021-11-20', date_started:'2021-11-05', streakcounter: 7, higheststreak: 7, uid: 1, completed: true}
];

ReactDOM.render(
  <React.StrictMode>
    <App 
    habits={DATA2} 
    />
  </React.StrictMode>,
  document.getElementById('root')
);
