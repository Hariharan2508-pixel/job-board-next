"use client";
import type { Job } from "../types";
import { formatSalary } from "../utility/formatSalary";
import { useJobStore } from "../store/useJobStore";
import Link  from "next/link";
import React from "react";
import { useState, useRef } from "react";
import ApplyModal from "./ApplyModal";
import Image from "next/image";
import {useSession} from "next-auth/react";
import { useRouter } from "next/navigation";
interface JobCardProps {
  job: Job
};
const JobCard = ({ job }: JobCardProps) => {
  const{data:session}=useSession();
  const router=useRouter();
  const handleApply=()=>{
          if(!session){
            router.push("/login");
            return;}setIsModalOpen(true)};
  //controls modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);
  //stores apply button reference
  const applyButtonRef = useRef<HTMLButtonElement>(null);
  //console.count(`Jobcard ${job} rendered`);
  const savedJob=useJobStore((state)=>state.saveJob);
  const removeJob=useJobStore((state)=>state.removeJob);
  const savedJobs=useJobStore((state)=>state.savedJobs);
  const setLastViewedJob=useJobStore((state)=>state.setLastViewedJob);
  const isSaved = savedJobs.some((savedJob) => savedJob.id === job.id)
  const getStatusColor = (
    status: string
  ): string => {
    switch (status) {
      case 'open':
        return '#166534';

      case 'closed':
        return '#B91C1C';

      case 'draft':
        return '#A16207';

      default:
        return 'gray';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300  
    p-5  border border-gray-200 dark:bg-gray-900">
      <Image src={job.company.logo} alt={job.company.name} width={60} height={60} className="
      object-contain  w-16 h-16 p-2 bg-white"/>
     
        Job Title :<Link href={`/jobs/${job.id}`} onClick={()=>setLastViewedJob(job.id)}>
        <h2 className="inline text-xl font-bold text-blue-700 hover:underline">{job.title}</h2>
      </Link>
      <div>
        Company:<p className=" inline mt-2 text-gray-600">{job.company.name}</p>
      </div>
      <p className="mt-2 font-medium">
        Salary Range:{formatSalary(
          job.minSalary,
          job.maxSalary
        )}
      </p>
      <span
        style={{
          backgroundColor: getStatusColor(
            job.status
          ),
          color: '#FFF',
          padding: '6px 12px',
          borderRadius: '9999px',
          fontSize: "14px", fontWeight: "600", display: "inline-block", marginTop: "12px", 
          marginBottom: "12px",
          textTransform: "capitalize"
        }}
        aria-label={`Status: ${job.status}`}
      >
        Status:{job.status}
      </span>
      <div className="flex flex-wrap gap-3 mt-5">
        <button disabled={isSaved} 
        onClick={() => savedJob(job)} 
        className="border-none px-3 py-2 rounded cursor-pointer bg-red-500 text-black 
        disabled:opacity-50
         disabled:cursor-not-allowed hover:bg-red-600 transition-colors">{isSaved ? "SAVED" 
         : "SAVEJOB"}</button>
        <button onClick={() => removeJob(job.id)} 
        className="border-none px-3 py-2 rounded  bg-red-500 text-black cursor-pointer 
        hover:bg-red-600 transition-colors ">REMOVE JOB</button>

        <button ref={applyButtonRef} onClick={handleApply} className="bg-blue-600 
        text-white px-4 py-2 rounded hover:bg-blue-700">APPLY</button>
      </div>
      <ApplyModal jobId={job.id} isOpen={isModalOpen} triggerRef={applyButtonRef} onClose={() => 
        setIsModalOpen(false)}></ApplyModal>
    </div>
  );
};

export default React.memo(JobCard);