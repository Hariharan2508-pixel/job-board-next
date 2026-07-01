export function formatSalary(min:number,max:number):string{
    const format=(sal:number):string=>{
        return sal.toLocaleString();
    }
    return `₹ ${format(min)}-₹ ${format(max)}`};
