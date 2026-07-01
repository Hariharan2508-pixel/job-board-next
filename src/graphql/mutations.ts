import { gql} from "@apollo/client";
export const APPLY_TO_JOB=gql`
mutation ApplyToJob($input:ApplyInput!){
applyToJob(input:$input)}`;