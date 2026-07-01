/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type ApplyInput = {
  coverletter: Scalars['String']['input'];
  email: Scalars['String']['input'];
  jobId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};

export type Company = {
  __typename?: 'Company';
  id?: Maybe<Scalars['ID']['output']>;
  location: Scalars['String']['output'];
  logo: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type Job = {
  __typename?: 'Job';
  company: Company;
  id: Scalars['ID']['output'];
  location: Scalars['String']['output'];
  maxSalary: Scalars['Int']['output'];
  minSalary: Scalars['Int']['output'];
  status: JobStatus;
  title: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type JobFilter = {
  location?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export enum JobStatus {
  Closed = 'closed',
  Draft = 'draft',
  Open = 'open'
}

export type Mutation = {
  __typename?: 'Mutation';
  applyToJob: Scalars['String']['output'];
};


export type MutationApplyToJobArgs = {
  input: ApplyInput;
};

export type Query = {
  __typename?: 'Query';
  job?: Maybe<Job>;
  jobs: Array<Job>;
};


export type QueryJobArgs = {
  id: Scalars['ID']['input'];
};


export type QueryJobsArgs = {
  filter?: InputMaybe<JobFilter>;
};

export type ApplyInput = {
  coverletter: string;
  email: string;
  jobId: string | number;
  name: string;
};

export type JobStatus =
  | 'closed'
  | 'draft'
  | 'open';

export type ApplyToJobMutationVariables = Exact<{
  input: ApplyInput;
}>;


export type ApplyToJobMutation = { applyToJob: string };

export type GetJobsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetJobsQuery = { jobs: Array<{ id: string, title: string, location: string, type: string, status: JobStatus, minSalary: number, maxSalary: number, company: { name: string, location: string, logo: string } }> };

export type GetJobQueryVariables = Exact<{
  id: string | number;
}>;


export type GetJobQuery = { job: { id: string, title: string, location: string, type: string, status: JobStatus, minSalary: number, maxSalary: number, company: { name: string, location: string, logo: string } } | null };
