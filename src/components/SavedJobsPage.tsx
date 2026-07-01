"use client";
import { useJobStore } from "../store/useJobStore";
export default  function SavedJobsPage() {
  
    //const { savedJobs } = useSavedJobs();
    const savedJobs=useJobStore((state)=>state.savedJobs);
    return (
        <>
        
  <h2 className="text-2xl font-bold text-center mb-6 text-purple-700 dark:text-purple-400">Saved Jobs</h2>
  <div className="space-y-4">{savedJobs.map((job) => (
      <div key={job.id} className="border border-gray-200 dark:border-gray-700 rounded-lg 
 p-4 bg-gray-50 dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow duration-300">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          {job.title}
        </h3>
      </div>
    ))}
  </div>
</>
    )
}
