import {client} from "@/lib/apolloClient";
import { GET_JOB } from "@/graphql/queries";
import JobDetailPage from "@/components/JobDetailPage";
import { Job } from "@/generated/graphql";
import type { Metadata } from "next";
 type GetJobData={
        job:Job;
    }
    export const metadata: Metadata = {
  title: "JobDetails|Job Board",
  description: "Details for selected job",
};

export default async function Page({params,}:{params:{id:string};}){
   
    const {data}=await client.query<GetJobData>({query:GET_JOB,
        variables:{
            id:params.id,
        },fetchPolicy:"no-cache",
    })
    return(
            <JobDetailPage job={data!.job} />
    )
}