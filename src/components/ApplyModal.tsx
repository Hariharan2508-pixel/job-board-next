"use client";
import { useState,useRef,useEffect } from "react";
import { applyFormData, applySchema } from "../schemas/applySchema";
import { useMutation} from "@apollo/client/react";
import { APPLY_TO_JOB } from "../graphql/mutations";
import { ApplyToJobMutation,ApplyToJobMutationVariables } from "@/generated/graphql";
interface ApplyModalprops {
    isOpen: boolean;
    onClose: () => void
triggerRef:React.RefObject<HTMLButtonElement |null>;
jobId:string;
}
const ApplyModal = ({
    isOpen, onClose,triggerRef,jobId
}: ApplyModalprops) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [applyToJob,{loading,error:mutationError,}]=useMutation<ApplyToJobMutation,
    ApplyToJobMutationVariables>
    (APPLY_TO_JOB,{optimisticResponse:{applyToJob:"Application submitted"}});
    const [applied,setApplied]=useState(false);
    const [formData, setFormData] = useState<applyFormData>({ name: "", email: "", coverLetter: "" });
    const [error, setErrors] = useState<Partial<Record<keyof applyFormData, string>>>({});
    const firstInputRef=useRef<HTMLInputElement>(null);
    const closeButtonRef=useRef<HTMLButtonElement>(null);
    //focus first input when modal opens
    useEffect(()=>{
        if(isOpen){
            firstInputRef.current?.focus();
        }
    },[isOpen]);
//focus trap+esc
const handleKeyDown=(e:React.KeyboardEvent)=>{
    if(e.key==="Escape")
    {
        onClose();
        triggerRef.current?.focus();
        return;
    }
    if(e.key==="Tab"){
        const first=firstInputRef.current;
        const last=closeButtonRef.current;
        if(e.shiftKey && document.activeElement===first)
        {
            e.preventDefault();
            last?.focus();
        }
        else if(!e.shiftKey && document.activeElement===last)
        {
            e.preventDefault();
            first?.focus();
        }
    }
};
    if (!isOpen) {
        return null;
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData, [e.target.name]: e.target.value
        })
    }
    const handleSubmit =async (e:React.FormEvent) => {
        e.preventDefault();
         const result = applySchema.safeParse(formData)
        if (!result.success) {
            const fieldErrors: Partial<Record<keyof applyFormData, string>> = {};
            result.error.issues.forEach((issue) => {
                const field = issue.path[0] as keyof applyFormData;
                fieldErrors[field] = issue.message;
            });
            setErrors(fieldErrors);
            return;
        }
        setErrors({});
        try{
            await applyToJob({variables:{input:{jobId,name:formData.name,email:formData.email,
                coverletter:formData.coverLetter,}}});
            setApplied(true);
            alert("Application submitted");
             onClose();
              triggerRef.current?.focus();
        }
        catch(error){
            console.error(error);
        }
       
    }
    return (
 <div role="dialog" onKeyDown={handleKeyDown} aria-modal="true" aria-labelledby="apply-title"
  className="fixed inset-0 flex items-center justify-center  bg-black bg-opacity-40" >
  <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded p-4">
    <h2 id="apply-title" className="text-xl font-semibold mb-4 text-center text-gray-800 dark:text-gray-100">
      Apply for Job</h2>
      {applied &&(<div className="mb-3 rounded bg-green-100 p-2 text-green-700">Applied Successfully</div>)}
<form onSubmit={handleSubmit} className="space-y-3">
      <div><label htmlFor="name" className="block text-sm mb-1">Name</label>
        <input ref={firstInputRef} id="name" name="name" value={formData.name} onChange={handleChange}
          aria-invalid={!!error.name} aria-errormessage="name-error" className="w-full border rounded px-2 py-1"/>
        {error.name && (<p id="name-error" className="text-sm text-red-600">{error.name}</p>)}</div>
      <div>
        <label htmlFor="email" className="block text-sm mb-1">Email</label>
        <input id="email" name="email" value={formData.email} onChange={handleChange} aria-invalid={!!error.email}
          aria-errormessage="email-error" className="w-full border rounded px-2 py-1" />
        {error.email && (<p id="email-error" className="text-sm text-red-600">{error.email}</p>)}
      </div>
      <div><label htmlFor="coverLetter" className="block text-sm mb-1">Cover Letter</label>
        <textarea id="coverLetter" name="coverLetter" value={formData.coverLetter}
          onChange={handleChange} aria-invalid={!!error.coverLetter} aria-errormessage="coverLetter-error"
          rows={3} className="w-full border rounded px-2 py-1"/>
        {!!error.coverLetter && (<p id="coverLetter-error" className="text-sm text-red-600">{error.coverLetter}</p>)}
      </div>
      <div className="flex justify-end gap-2 pt-2"><button ref={closeButtonRef} type="button" onClick={() => {
            onClose();
            triggerRef.current?.focus()}} className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300">Cancel
        </button>
        <button type="submit" disabled={loading ||applied} className="px-3 py-1 rounded bg-purple-600
         text-white hover:bg-purple-700">
        {loading?"submitting...":applied?"Applied":"Submit"}</button>
      </div>
    </form>
  </div>
</div>
    );

};
export default ApplyModal;