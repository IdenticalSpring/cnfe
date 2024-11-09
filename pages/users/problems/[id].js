import React, { Suspense } from "react";
import { useRouter } from "next/router";
import { Spin } from "antd";

const DetailProblem = React.lazy(() => import("./DetailsProblem"));

const Details = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Suspense
      fallback={
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Spin size="large" tip="Loading problem details..." />
        </div>
      }
    >
      {id ? <DetailProblem problemId={id} /> : null}
    </Suspense>
  );
};

export default Details;
