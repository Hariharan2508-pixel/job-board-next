import { graphql, HttpResponse } from "msw";

export const handlers = [
  graphql.query("GetJobs", () => {
    return HttpResponse.json({
      data: {
        jobs: [
          {
            id: "1",
            title: "Frontend Developer",
            company: {
              name: "Tech company",
              location: "Chennai",
            },
            minSalary: 30000,
            maxSalary: 50000,
            status: "open",
            type: "Full Time",
            location: "Chennai",
          },
        ],
      },
    });
  }),
];