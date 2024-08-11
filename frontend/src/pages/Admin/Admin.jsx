import React from "react";
import UserProfile from "../UserProfile/userProfile";

export default function Admin() {
  return <UserProfile isAdmin={true} />;
}
