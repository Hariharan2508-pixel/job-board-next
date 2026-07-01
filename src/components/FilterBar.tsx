"use client";
import Select from "./Select";
import { Job } from "../types";
import clsx from "clsx";
import { useState } from "react";
export type FilterState = Pick<Job, "type" | "location">;
interface FilterBarProps {
    search: string;
    onSearchChange: (value: string) => void;
    filters: FilterState;
    onFilterChange: (filters: FilterState) => void;
}
const FilterBar = ({
    search, onSearchChange, filters, onFilterChange
}: FilterBarProps) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (<>
        <div className="md:hidden mb-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="bg-purple-600 text-white
             px-4 py-2 rounded"> ≡Filters</button>
        </div>

        <aside className={clsx("bg-white dark:bg-gray-900", "border rounded-lg", "p-5", "md:block",
            "flex flex-col", sidebarOpen ? "block" : "hidden")}>
            <label htmlFor="search" className=" mb-2 font-medium dark:text-white">SearchJobs : </label>
            <input id="search" type="text" placeholder=" search Jobs" value={search}
             onChange={(e) => onSearchChange(e.target.value)} className="w-half border border-gray-600 
             rounded p-2 mb-4" />
            <label htmlFor="type-filter" className=" mb-2 font-medium">  Job Type : </label>
            <Select id="type-filter" options={["", "Full time", "Part time", "Remote"]} value={filters.type} 
            onChange={(value) => onFilterChange({ ...filters, type: value, })} ></Select>
            <label htmlFor="location-filter" className=" mt-5 mb-2 font-medium">  Filter by location : </label>
            <Select id="location-filter" options={["", "Chennai", "Bangalore", "Hyderabad"]} value={filters.location}
             onChange={(value) => onFilterChange({ ...filters, location: value, })} />
            <button onClick={() => setSidebarOpen(false)} className="md:hidden mt-6 bg-red-500 text-white 
            px-4 py-2 rounded">Close</button>
        </aside>
    </>
    )
}
export default FilterBar;