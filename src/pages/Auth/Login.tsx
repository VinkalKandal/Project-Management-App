import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try{
      const res = await fetch("https://reqres.in/api/login", {
        method: "POST",
        headers: { "x-api-key":"reqres-free-v1","Content-Type": "application/json" },
        body: JSON.stringify({ email:"eve.holt@reqres.in", password:'cityslicka' }),
      });
      const data = await res.json();
      if (res.ok) {
        login(data.token); // when login succeeds
        navigate("/dashboard");
      } else {
        alert("Login failed");
        console.log("Login failed", data.error);
      }
    } catch(err){
      alert("Something went wrong");
    }
    
  };

  return (
    <div className="p-4 max-w-sm mx-auto">
      <h2 className="text-xl font-bold mb-4">Login</h2>
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
        className="border p-2 w-full mb-4"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={handleLogin}
        className="bg-blue-600 text-white py-2 px-4 rounded"
      >
        Login
      </button>
      <p>Not registered yet? <a href="/register">Register</a></p>
    </div>
  );
};

export default Login;
