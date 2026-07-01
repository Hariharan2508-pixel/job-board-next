"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function LoginPage(){
  const router=useRouter();
  const[username,setUsername]=useState("");
  const[password,setPassword]=useState("");
  const[error,setError]=useState("");
  const handleLogin=async(e:React.FormEvent)=>{e.preventDefault();
    setError("");
    const result=await signIn("credentials",{username,password,redirect:false,});
    if(result?.ok){
      router.push("/");
      router.refresh();
    } else {
      setError("Invalid username or password");
    }
  };
    return(
  <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
    <div className="w-full max-w-sm p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center text-purple-700 dark:text-purple-400 mb-6">Login Page</h2>
      <form onSubmit={handleLogin} className="space-y-5">
        <div>
          <label className="mb-2 block font-medium">Username</label>
       <input type="text" placeholder="Enter Username" value={username} onChange={(e)=>setUsername(e.target.value)} 
       className="border p-2" required/>
       </div>
       <div>
         <label className="mb-2 block font-medium">password</label>
        <input placeholder="Enter Password" type="password" value={password}
         onChange={(e)=>setPassword(e.target.value)} className="border p-2" required/>
         </div>
         {error && (<p className="text-sm text-red-600">{error}</p>)}
      <button type="submit" className="w-full px-4 py-2 bg-purple-600 text-white font-semibold rounded 
         hover:bg-purple-700 focus:outline-none focus:ring focus:ring-purple-500 focus:ring-offset-2 
        transition-colors duration-300">LOGIN</button>
        </form>
        <div className="mt-6 test-center text-gray-500 dark:tesxt-gray-400">
          <p>Demo Credentials</p>
          <p>
            username:<strong>admin</strong>
          </p>
          <p>Password:<strong>1234</strong>
          </p>
        </div>
    </div>
  </div>
    )};