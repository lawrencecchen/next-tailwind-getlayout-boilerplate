import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const RedirectPage = () => {
  const router = useRouter();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!router.query) {
      return null;
    }

    const exchangeToken = async () => {
      const code = router.query.code;
      try {
        if (!code) {
          throw new Error("Something went wrong. Please try again.");
        }

        const request = new Request("/api/getDiscordToken", {
          method: "POST",
          body: JSON.stringify({ code }),
        });

        const response = await fetch(request);
        const json = await response.json();
        console.log(json);

        router.push("/");
      } catch (err) {
        console.log(err, code);
        router.push({
          pathname: "/",
          query: { message: "Something went wrong. Please try again." },
        });
      }
    };

    exchangeToken();
  }, [router]);

  return <div>Redirecting...</div>;
};

export default RedirectPage;
