"use client";
import { useState } from "react";
import Header from "./Header";
import FilterBar from "./FilterBar";
import JobList from "./JobList";
import {Job} from "@/types";
interface HomeContentProps{jobs:Job[];}
export default function Homecontent({jobs,}:HomeContentProps){
    const [search,setSearch]=useState("");
    const [filters,setFilters]=useState({type:"",location:"",});
    const filteredJobs=jobs.filter((job)=>{
        const matchesSearch=job.title.toLowerCase().includes(search.toLowerCase());
    const matchesType=!filters.type || job.type ===filters.type;
const matchesLocation=!filters.location ||job.location === filters.location;
return (matchesSearch && matchesType && matchesLocation)    })
return(
    <>
    <FilterBar search={search} onSearchChange={setSearch} filters={filters} onFilterChange={setFilters}/>
     <div aria-live="polite" className="mt-4 mb-4 text-gray-900 dark:text-gray-50 px-4"  
            aria-atomic="true">{filteredJobs.length}{" "}jobs found</div>
    <JobList jobs={filteredJobs} />
    </>
)
}
