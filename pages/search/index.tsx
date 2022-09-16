import { useRouter } from "next/router";
import { Layout } from "components/layout";
import { useEffect, useState } from "react";
import { useProducts } from "lib/hooks";
import Head from "next/head";
import { SearchProducts } from "components/searchProducts";
import styles from "./search.module.css";

export default function Search() {
  const router = useRouter();
  const query = router.query.q as string;
  const offset = Number(router.query.offset);
  return (
    <Layout>
      <Head>
        <title>Search</title>
      </Head>
      <div className={styles.search_product_container}>
        <SearchProducts query={query} offset={offset} />
      </div>
    </Layout>
  );
}
