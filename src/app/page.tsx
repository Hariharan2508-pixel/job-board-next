import {client} from "@/lib/apolloClient";
import {GET_JOBS} from "@/graphql/queries";
import HomeContent from "@/components/HomeContent";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Home |Job Board",
  description: "Browse the latest software jobs",
};
import { GetJobsQuery } from "@/generated/graphql";
export default async function Home() {
  const {data}=await client.query<GetJobsQuery>({
    query:GET_JOBS,
    fetchPolicy:"no-cache",
  });
  return( 
  <main className="p-6 min-h-screen " id="main-content">
    <HomeContent jobs={data!.jobs} />
    </main>
    );
}