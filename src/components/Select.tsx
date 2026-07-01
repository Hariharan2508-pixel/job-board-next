interface SelectProps<T>{
    options:T[];
    value:T;
    onChange:(value:T)=>void;
    id?:string;}
function Select<T extends string>({
    id, options,value,onChange
}:SelectProps<T>){
return (

    <select   className="border border-gray-500 "id={id}  value={value}
    onChange={(e)=>onChange(e.target.value as T)}>
{options.map((option)=><option key={option} value={option}>{option}</option>)}
    </select>
);
}
export default Select;