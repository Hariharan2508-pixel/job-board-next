import { render } from "@testing-library/react";
import {axe} from "jest-axe"
import { useRef } from "react";
import ApplyModal from "../ApplyModal";
import { ApolloProvider } from "@apollo/client/react";
import { client } from "../../lib/apolloClient";
//small warapper for apply model
function TestComponent(){
    const buttonRef=useRef<HTMLButtonElement>(null);
    return(<ApplyModal jobId="1" isOpen={true} onClose={()=>{}}
triggerRef={buttonRef}/>);
}
describe("Applymodal Accessibility",()=>{
    it("has no accessibility violations",async ()=>{
        //render modal
        const{container}=render(<ApolloProvider client={client}><TestComponent/></ApolloProvider>);
        //run axe accessibilty sacn
        const results=await axe(container);
        //Expect no accessibility issues
        expect(results).toHaveNoViolations();
    });
});