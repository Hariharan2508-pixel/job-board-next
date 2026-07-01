import {create} from "zustand";
import {devtools} from "zustand/middleware";
import type {Job} from "../types";
interface JobStore{
    savedJobs:Job[];
     filterOpen:boolean;
       activeTheme:"light"|"dark";
    lastViewedJob:string|null;   
    saveJob:(job:Job)=>void;
    removeJob:(id:string)=>void;
    clearJobs:()=>void;
    toggleFilter:()=>void;
    setTheme:(theme:"light"|"dark")=>void;
    setLastViewedJob:(id:string)=>void;}
export const useJobStore=create<JobStore>()(devtools((set)=>({
    savedJobs:[],
filterOpen:false,
activeTheme:"light",
lastViewedJob:null,
saveJob:(job)=>set((state)=>({
    savedJobs:state.savedJobs.some((j)=>j.id===job.id)?state.savedJobs:[...state.savedJobs,job],
}),false,"SAVE_JOB"),
removeJob:(id)=>set((state)=>({savedJobs:state.savedJobs.filter((job)=>job.id !==id),}),false,"REMOVE_JOB"),
clearJobs:()=>set({savedJobs:[],},false,"CLEAR_ALL"),
toggleFilter:()=>set((state)=>({
    filterOpen:!state.filterOpen,
}),false,"TOGGLE_FILTER"),
setTheme:(theme)=>set({activeTheme:theme,},false,"SET_THEME"),
setLastViewedJob:(id)=>set({lastViewedJob:id,},false,"SET_LAST_VIEWED_JOB"),
}),
{
    name:"Job Store",
}));