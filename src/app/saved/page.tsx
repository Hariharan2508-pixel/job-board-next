import { redirect } from "next/navigation";
import { auth } from "@/lib/auth"; 
import SavedJobsPage from "@/components/SavedJobsPage";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "SavedJobs |Job Board",
  description: "View all your saved jobs",
};

export default async function Page(){
    const session=await auth();
  if(!session){
    redirect("/login");
  }
    return <SavedJobsPage />;
}