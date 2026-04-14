export const dynamic = "force-dynamic";
("use client");
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function ResetPassword() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");

  const handleReset = async () => {
    try {
      await axios.post("/api/users/resetpassword", {
        token,
        password,
      });
      alert("Password reset successful");
    } catch (error: any) {
      alert(error.response.data.error);
    }
  };

  return (
    <div>
      <h1>Reset Password</h1>
      <input
        type="password"
        placeholder="Enter new password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleReset}>Submit</button>
    </div>
  );
}
