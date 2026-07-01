import { formatSalary } from "../utility/formatSalary";
import { Job } from "@/generated/graphql";
interface Props{job:Job;}
const JobDetailPage=({job}:Props)=>{
 return (
  <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md
   transition-colors duration-300">
    <h1 className="text-3xl font-bold text-purple-700 dark:text-purple-400 mb-4">
      {job.title}
    </h1>
    <p className="text-lg text-gray-700 dark:text-gray-300 mb-2">
      {job.company.name}
    </p>
    <p className="mb-2"><span className="font-semibold">Company Location:</span>{" "} {job.company.location}</p>
     <p className="mb-2"><span className="font-semibold">Job Type:</span>{" "} {job.type}</p>

    <p className="text-gray-600 dark:text-gray-400 mb-2">
      <span className="font-semibold">Salary:</span> {formatSalary(job.minSalary,job.maxSalary)}
    </p>
    <p className="text-gray-600 dark:text-gray-400 mb-2">
      <span className="font-semibold">Status:</span> {job.status}
    </p>
  </div>
);
};
export default JobDetailPage;