"use client";
import Link from "next/link";
import { useEffect } from "react";
import { useJobStore } from "../store/useJobStore";
import { usePathname } from "next/navigation";
import clsx from "clsx";
const Header = () => {
    const pathname=usePathname();
  const savedJobs=useJobStore((state)=>state.savedJobs);
   const clearJobs=useJobStore((state)=>state.clearJobs);
   const activeTheme=useJobStore((state)=>state.activeTheme);
   const setTheme=useJobStore((state)=>state.setTheme);
      

        useEffect(()=>{
            const html=document.documentElement;
            if(activeTheme ==="dark"){
                html.classList.add("dark");
            }else{
              html.classList.remove("dark");
            }
            localStorage.setItem("theme",activeTheme);},[activeTheme]);
    return (
        <div className="max-w-7xl mx-auto mt-4">
      <header
  className="hidden md:flex justify-between items-start bg-purple-700 dark:bg-gray-900 text-white 
   px-8 py-4 shadow-md transition-colors duration-300 "
>
  <h1
    style={{ fontSize: "clamp(2rem,3vw,3.5rem)" }}
    className="font-bold tracking-wide text-white dark:text-gray-100 text-5xl">
    JOB BOARD
  </h1>
<div className="flex flex-col items-end gap-2">
  <nav  className="flex gap-6 items-center" >
    <Link
      href="/"
      className={clsx(
        "hover:underline",
        pathname === "/"
          ? "text-yellow-400 dark:text-blue-400 font-bold"
          : "text-white dark:text-gray-300"
      )}>Home</Link>
    {" | "}
<Link href="/saved"
      className={clsx(
        "hover:underline",
        pathname === "/saved"
          ? "text-yellow-400 dark:text-blue-400 font-bold underline"
          : "text-white dark:text-gray-300"
      )}>
      Saved Jobs</Link>
{" | "}
<Link
      href="/login"
      className={clsx(
        "hover:underline",
        pathname === "/login"
          ? "text-yellow-400 dark:text-blue-400 font-bold underline"
          : "text-white dark:text-gray-300"
      )}>Login</Link>
<button
      onClick={() => setTheme(activeTheme==="dark"?"light":"dark")}
      className="px-4 py-1 rounded bg-white text-black hover:bg-gray-200"
    >
      {activeTheme==="dark" ? "💡Light" : "🌙Dark"}
    </button>
  </nav>
   <div className="text-sm md:text-base flex items-center justify-end gap-4 py-2">
    <h2
      style={{ margin: "0 0 8px 0" }} className=" dark:text-yellow-300"
    >
      Saved Jobs: {savedJobs.length}
    </h2>
<button
      onClick={clearJobs}
      className=" px-3 py-1 rounded bg-white text-black 
         hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-100 
         dark:hover:bg-gray-600 transition-colors duration-300">
      Clear All
    </button>
  </div></div>
</header>
        <nav className="fixed bottom-0 left-0 right-0 md:hidden bg-white dark:bg-gray-900 border-t
        dark:border-gray-700 flex justify-around items-center py-3 shadow-lg z-50">
            <Link href="/" className={clsx(pathname ==="/"?"text-blue-900 font-bold":"text-gray-600")}>
            HOME</Link>
             <Link href="/saved" className={clsx(pathname ==="/saved"?"text-blue-900 font-bold":
                "text-gray-600")}>SAVED</Link>
         <button onClick={()=>setTheme(activeTheme ==="dark"?"light":"dark")} className="text-xl" aria-label="
         Toggle Dark Mode">{activeTheme==="dark"?"💡":"🌙"}</button>
<Link href="/login" className={clsx(pathname ==="/login"?"text-blue-900 font-bold":"text-gray-600")}>
LOGIN</Link>
        </nav>
   </div> );
};
export default Header;
