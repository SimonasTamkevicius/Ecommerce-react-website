import React from "react";
import { useAuth } from "../../utils/AuthContext";

const ViewUserProfile = () => {
    const { user } = useAuth();
  
  return (
    <div className="flex flex-col space-y-5">
      <div className="flex flex-col md:flex-row md:justify-between md:space-x-8 space-y-5 md:space-y-0">
        <div className="flex flex-col md:w-full">
          <label className="text-sm">First Name</label>
          <input
            className="p-2 rounded-md bg-slate-200"
            value={user.fName}
            disabled
          />
        </div>
        <div className="flex flex-col md:w-full">
          <label className="text-sm">Last Name</label>
          <input
            className="p-2 rounded-md bg-slate-200"
            value={user.lName}
            disabled
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:justify-between md:space-x-8 space-y-5 md:space-y-0">
        <div className="flex flex-col w-full">
          <label className="text-sm">Email</label>
          <input
            className="p-2 rounded-md bg-slate-200"
            value={user.email}
            disabled
          />
        </div>
        <div className="flex flex-col w-full">
          <label className="text-sm">Contact Number</label>
          <input className="p-2 rounded-md bg-slate-200" value="" disabled />
        </div>
      </div>
    </div>
  );
};

export default ViewUserProfile;
