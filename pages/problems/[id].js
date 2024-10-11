// pages/problems/[id].js
import DefaultLayout from "@/layout/DefaultLayout";
import { useRouter } from "next/router";
import React from "react";

const ProblemDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <DefaultLayout>
        <div>
          <h1>Problem Details</h1>
          <p>Problem ID: {id}</p>
          {/* You can fetch problem details by ID here */}
        </div>
      </DefaultLayout>
    </>
  );
};

export default ProblemDetail;
