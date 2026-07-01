import {client} from "@/lib/apolloClient";
import {GET_JOBS} from "@/graphql/queries";
import Header from "@/components/Header";
import HomeContent from "@/components/HomeContent";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Home |Job Board",
  description: "Browse the latest software jobs",
};

export default async function Home() {
  const {data}=await client.query<any>({
    query:GET_JOBS,
    fetchPolicy:"no-cache",
  });
  return( 
  <main className="p-6 min-h-screen " id="main-content">
    <HomeContent jobs={data.jobs} />
    </main>
    );
}