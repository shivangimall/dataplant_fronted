/* eslint-disable no-unused-vars */
import React from "react";
import Row from "./Row";

//For each Row

const Table = ({
  users,
  selectedRows,
  handleRowSelection,
  handleEdit,
  handleDelete,
  handleSelectAllRows,
  setEdit,
  edit,
  setToggle,
  toggle
}) => {
  const currentUsers = users.slice(0, 10); // Only use the first 10 users

  return (
    <table className="table p-3 mx-5">
      <thead>
        <tr>
          
          <th>Title</th>
          <th>Description</th>
          <th>Subject</th>
          <th>Schedule</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <Row
            key={user.id}
            user={user}
            selected={selectedRows.includes(user.id)}
            handleRowSelection={handleRowSelection}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            setEdit={setEdit}
            edit={edit}
            setToggle={setToggle}
            toggel={toggle}
          />
        ))}
      </tbody>
    </table>
  );
};

export default Table;
