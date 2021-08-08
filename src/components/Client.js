import React from "react";
import AuthService from "../services/auth.service";

const Client = () => {
  const currentUser = AuthService.getCurrentUser();

  return (
    <div>
      <header>
        <h3>
          Client: <strong>{currentUser.username}</strong>
        </h3>
      </header>
      <p>
        <strong>Role:</strong> {currentUser.role}
      </p>
    </div>
  );
};

export default Client;
