"use client";
import JobCard from './JobCard';
import { Job } from '../types/index';
interface jobListProps {
  jobs: Job[];
}
const JobList = ({ jobs }: jobListProps) => {
  return (
    //using map function to loop the jobs array
    <div className="grid 
    grid-cols-1 
    md:grid-cols-2  
    lg:grid-cols-3
    gap-6 
    p-6">{jobs.map((job) => (<JobCard key={job.id} job={job} />))}</div>
  );
};
export default JobList;
