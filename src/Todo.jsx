import React from 'react'

export default function Todo({list,removeItem,editItem}) {
  return (
    <>
        {list.map((todo)=>{
            const {id,todoTitle} = todo;
            return (
                <div key={id} className="eachTodo">
                    <p>{todoTitle}</p>
                    <div className="todoBtns">
                        <i className="fa-solid fa-file-pen edit-btn" onClick={()=>editItem(id)}></i>
                        <i className="fa-solid fa-trash del-btn" onClick={()=>removeItem(id)}></i>
                    </div>
                </div>
            )
        })}
    </>
  )
}
