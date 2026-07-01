import { render,screen } from "@testing-library/react";
import userEvent from"@testing-library/user-event";
import FilterBar from "../FilterBar";
import { vi } from "vitest";
describe("FilterBar component",()=>{
    it("updates search input",async ()=>{
        const user=userEvent.setup();
        const handlesearch=vi.fn();
        const handleFilter=vi.fn();
        render(<FilterBar search="" onSearchChange={handlesearch} filters={{type:"",location:"",}}
             onFilterChange={handleFilter}/>)
        const searchInput=screen.getByRole("textbox");
        await user.type(searchInput,"React");
        expect(handlesearch).toHaveBeenCalled();
        
    });
    it("changes jobtype",async ()=>{
        const user=userEvent.setup();
        const handlesearch=vi.fn();
        const handleFilter=vi.fn();
        render(<FilterBar search="" onSearchChange={handlesearch} filters={{type:"",location:"",}} 
            onFilterChange={handleFilter}/>)
        const typeSelect=screen.getByLabelText(/job type/i);
        await user.selectOptions(typeSelect,"Full time");
        expect(handleFilter).toHaveBeenCalled();
    });
});