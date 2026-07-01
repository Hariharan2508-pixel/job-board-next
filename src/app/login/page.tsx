import LoginPage from "@/components/LoginPage";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Login |Job Board",
  description: "Login to JobBoard",
};

export default function Page(){
    return <LoginPage />;
}