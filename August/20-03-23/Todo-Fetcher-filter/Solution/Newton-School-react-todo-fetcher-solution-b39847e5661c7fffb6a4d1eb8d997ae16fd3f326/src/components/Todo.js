 import React from 'react';

 export const Todo  = ({title,completed,id}) =>{
    return (
        <div className="todo" id={`todo-${id}`}>
            <div className="todo-text">{title}</div>
            <div className="todo-status">{completed ? 'Complete' : 'Incomplete'}</div>
        </div>
    )
 }