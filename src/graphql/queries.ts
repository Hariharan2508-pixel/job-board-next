import { gql } from "@apollo/client";
export const GET_JOBS=gql`
query GetJobs{
jobs{
id
title
location
type
status
minSalary
 maxSalary
 company{
 name
 location
 logo
 }
 }
 }`;
 export const GET_JOB=gql`
query GetJob($id:ID!){
job(id:$id){
id
title
location
type
status
minSalary
 maxSalary
 company{
 name
 location
 logo
 }
 }
 }`;