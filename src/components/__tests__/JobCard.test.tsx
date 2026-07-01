import {render,screen} from "@testing-library/react";
    import JobCard from "../JobCard"
import { JobStatus } from "../../types";
import { ApolloProvider } from "@apollo/client/react";
import { client } from "@/lib/apolloClient";
import {vi} from "vitest";
import React from "react";
import { useRouter } from "next/router";
vi.mock("next/link",()=>({default:({children,href}:any)=>(<a href={href}>{children}</a>)}));
vi.mock("../ApplyModal",()=>({default:()=><div>Mock ApplyModal</div>}));
vi.mock("next-auth/react",()=>({useSession:()=>({
    data:{user:{name:"Hari",email:"hari@test.com",}},
    status:"authenticated",
}),}));
vi.mock("next/navigation",()=>({useRouter:()=>({
    push:vi.fn(),
    replace:vi.fn(),
    refresh:vi.fn(),
    back:vi.fn(),
    forward:vi.fn(),
    prefetch:vi.fn(),
}),}));
const mockJob={id:"1",
            title:"Front end developer",
            company:{
                name:"Tech company",
                location:"Chennai",
                logo:"/companies/Accenture.png"
            },
            minSalary:30000,
        maxSalary:50000,
    status:"open" as JobStatus,
type:"Full Time",
location:"Chennai",};
describe("JobCard Component",()=>{
    it("render title,company name and apply button",()=>{
        render(<ApolloProvider client={client}><JobCard job={mockJob}/></ApolloProvider>);
        expect(screen.getByText("Front end developer")).toBeInTheDocument();
         expect(screen.getByText("Tech company")).toBeInTheDocument();
          expect(screen.getByRole("button",{name:/apply/i,})).toBeInTheDocument();
        });
});