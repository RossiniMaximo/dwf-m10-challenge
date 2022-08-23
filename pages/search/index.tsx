import { useRouter } from "next/router";
import { Layout } from "components/layout";
import { useEffect, useState } from "react";
import { useProducts } from "lib/hooks";
import Head from "next/head";
import { SearchProducts } from "components/searchProducts";

export default function Search() {
  const [stateOffset, setStateOffset] = useState(0);
  const router = useRouter();
  const query = router.query.q as string;
  const limit = Number(router.query.limit);
  let offset = router.query.offset;
  const offsetToNumber = Number(offset);

  useEffect(() => {
    setStateOffset(offsetToNumber);
  }, []);

  return (
    <Layout>
      <Head>
        <title>Search</title>
      </Head>
      <SearchProducts
        query={query}
        limit={limit}
        stateOffset={stateOffset}
        setStateOffset={setStateOffset}
      />
    </Layout>
  );
}
