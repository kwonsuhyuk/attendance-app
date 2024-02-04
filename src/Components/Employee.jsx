import React from "react";

const Employee = ({ user }) => {
  const { name, email, jobName, uid } = user;
  console.log(user);

  return (
    <>
      {user && (
        <div className="flex mb-5 gap-5">
          <div>{name}</div>
          <div>{jobName}</div>
        </div>
      )}
    </>
  );
};

export default Employee;
