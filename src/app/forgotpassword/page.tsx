"use client";
import axios from "axios";
import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    try {
      await axios.post("/api/users/forgotpassword", { email });
      alert("Email sent!");
    } catch (error: any) {
      alert(error.response.data.error);
    }
  };

  return (
    <div>
      <h1>Forgot Password</h1>
      <input
        type="email"
        placeholder="Enter email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
