import { useEffect } from "react";
import { useRouter } from "next/router";
import { Spin } from "antd";

import { getAccessTokenFromCode } from "@/service/auth-api";

const Callback = () => {
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const accessToken = params.get("access_token");
    const code = params.get("code");

    if (accessToken) {
      sessionStorage.setItem("access_token", accessToken);
      router.replace("/");
    } else if (code) {
      getAccessTokenFromCode(code)
        .then((token) => {
          sessionStorage.setItem("access_token", token);
          router.replace("/");
        })
        .catch(() => {
          router.replace("/auth/login");
        });
    } else {
      router.replace("/auth/login");
    }
  }, [router]);

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <Spin size="large" />
    </div>
  );
};

export default Callback;
