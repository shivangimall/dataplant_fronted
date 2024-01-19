import React from "react";
import { useState } from "react";
import EditData from "./EditData";

const Row = ({
  user,
  selected,
  handleRowSelection,
  handleEdit,
  handleDelete,
  setEdit,
  edit
}) => {

  
  const [userId,setUserId] = useState(null)

  return (
    <tr className=''>
      
      <td>{user.Title}</td>
      <td>{user.Description}</td>
      <td>{user.Subject}</td>
      <td>{`${user.Frequency} at ${user.Time}`}</td>
      {edit===user._id && <div><EditData edit={edit} setEdit={setEdit} /></div>}
      <td className="btn-container">
        <button onClick={() => 
        {
          
          
          handleEdit(user._id)}}>
          <i className="fas fa-edit"></i>
        </button>
        <button onClick={() => handleDelete(user._id)}>
          <i className="fas fa-trash"></i>
        </button>
      </td>
    </tr>
  );
};

export default Row;
