import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth"

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const navigate = useNavigate();
  const {login} = useAuth()

  const handleRegister = async () => {
    if (password !== confirm) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("https://reqres.in/api/register", {
        method: "POST",
        headers: { "x-api-key":"reqres-free-v1", "Content-Type": "application/json" },
        body: JSON.stringify({ email: "eve.holt@reqres.in", password:"pistol" }),
      });

      const data = await res.json();
      if (res.ok) {
        login(data.token); // ⬅️ context handles auth state
        navigate("/dashboard");
      } else {
        alert("Registration failed: " + data.error);
      }
    } catch (err) {
      alert("Something went wrong");
    }
  };

  return (
    <div className="p-4 max-w-sm mx-auto">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <input
        type="email"
        placeholder="Email"
        className="border p-2 w-full mb-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="border p-2 w-full mb-2"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        className="border p-2 w-full mb-4"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
      />
      <button
        onClick={handleRegister}
        className="bg-green-600 text-white py-2 px-4 rounded"
      >
        Register
      </button>
    </div>
  );
};

export default Register;