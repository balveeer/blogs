import { Container } from "../components";
import React, { useState, useEffect } from "react";
import { Button } from "../components";
import authService from "../appwrite/auth";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
function VerifyEmail() {
  const [verified, setVerified] = useState(false);
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const urlParams = new URLSearchParams(window.location.search);
  const secret = urlParams.get("secret");
  const userId = urlParams.get("userId");
  useEffect(() => {
    if (userData) setVerified(userData.userData.emailVerification);
    if (secret && userId) {
      authService.updateEmailverification({ userId, secret });
      setVerified(true);
    }
  }, [userData]);
  const createVerification = () => {
    authService.emailverification();
  };

  if (!verified)
    return (
      <Container>
        <div className="w-full min-h-96 flex flex-col gap-4 justify-center items-center">
          <h2 className="text-3xl text-green-600 p-4">
            Verification Mail Sent Successfully Check Inbox.
          </h2>
          <h2 className="text-2xl text-gray-600 p-4">Didn't get Mail?</h2>
          <Button onClick={createVerification}>Try Again</Button>
        </div>
      </Container>
    );
  return (
    <Container>
      <div className="w-full min-h-96 flex flex-col gap-4 justify-center items-center">
        <h2 className="text-3xl text-green-600 p-4">
          Email Verified SuccessFully.
        </h2>
        <div className="flex justify-center items-start h-1/2">
          <Button
            onClick={() => navigate("/")}
            className="bg-gray-800 m-4 hover:text-gray-800 rounded hover:bg-white border-black border-2"
          >
            Home Page
          </Button>
          <Button
            onClick={() => navigate(-1)}
            className="bg-gray-500 m-4 hover:text-gray-800 rounded hover:bg-white border-black border-2"
          >
            Go Back
          </Button>
        </div>
      </div>
    </Container>
  );
}

export default VerifyEmail;
