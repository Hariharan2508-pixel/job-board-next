import { render,screen } from "@testing-library/react";
import userEvent from"@testing-library/user-event";
import { useRef,useState } from "react";
import ApplyModal from "../ApplyModal";
import { ApolloProvider } from "@apollo/client/react";
import { client } from "../../lib/apolloClient";
// test component to simulate real job card behaviour
function TestComponent(){
    const [open,setOpen]=useState(false);
    const buttonRef=useRef<HTMLButtonElement>(null);
    return (<>
    <button ref={buttonRef} onClick={()=>setOpen(true)}>Apply</button>
    <ApplyModal jobId="1" isOpen={open} onClose={()=>setOpen(false)} triggerRef={buttonRef}/>
        </>)
}
describe("apply modal",()=>{
    //test :modal opens for clicking apply
it("opens when apply button is clicked",async()=>{
    const user=userEvent.setup();
    render (<ApolloProvider client={client}><TestComponent/></ApolloProvider>);
    await user.click(screen.getByRole("button",{
        name:/apply/i,
    }))
    expect(await screen.findByRole("dialog")).toBeInTheDocument();
});
//test:focus shouls stay inside modal
it("keeps focus inside modal",async()=>{
    const user=userEvent.setup();
    render (<ApolloProvider client={client}><TestComponent/></ApolloProvider>);
    await user.click(screen.getByRole("button",{
        name:/apply/i,
    }))
    expect(screen.getByLabelText(/name/i)).toHaveFocus();
});
//esc should close modal
it("closes model when escape is pressed",async()=>{
    const user=userEvent.setup();
    render (<ApolloProvider client={client}><TestComponent/></ApolloProvider>);
    await user.click(screen.getByRole("button",{name:/apply/i,})
    );
    await user.keyboard("{Escape}");

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
});
//test :blank email should show validation error
it("shows validation error when blank",async()=>{
    const user=userEvent.setup();
    render(<ApolloProvider client={client}><TestComponent/></ApolloProvider>);
    await user.click(screen.getByRole("button",{name:/apply/i})
);
//fill name
await user.type(screen.getByLabelText(/name/i),"Hariharan");
//leave emailempty
//fill cover letter
await user.type(screen.getByLabelText(/cover letter/i),"i am inteested int this role ");
await user.click(screen.getByRole("button",{name:/submit/i}));
expect(await screen.findByText(/valid email/i)).toBeInTheDocument();
});
});