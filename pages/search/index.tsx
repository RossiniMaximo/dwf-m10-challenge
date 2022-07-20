import { useRouter } from "next/router";
import { Layout } from "components/layout";
import styles from "./search.module.css";
import { useEffect, useState } from "react";
import { getSearchProducts, setUserFavourites } from "api";
import { Card } from "components/card";
import { MediumLargeText } from "ui/text";
import Head from "next/head";

export default function Search() {
  const [products, setProducts] = useState([] as any);
  const [productsAmount, setProductsAmount] = useState(0);
  const [stateOffset, setStateOffset] = useState(0);

  const router = useRouter();
  const query = router.query.q as string;
  const limit = router.query.limit as string;
  const offset = Number(router.query.offset);

  async function pullProducts() {
    const results = await getSearchProducts(query, limit, offset);
    setStateOffset(offset + 1);
    setProductsAmount(results.pagination.totalResults);
    setProducts(results.results);
  }
  async function pullNewProductsPage() {
    const results = await getSearchProducts(query, limit, stateOffset);
    setStateOffset(stateOffset + 1);
    setProductsAmount(results.pagination.totalResults);
    setProducts(results.results);
  }

  useEffect(() => {
    pullProducts();
  }, [query]);

  return (
    <Layout>
      <div className={styles.result_amount}>
        <Head>
          <title>Search</title>
        </Head>
        <MediumLargeText
          text={products.length + "resultados de " + productsAmount}
        />
      </div>
      <div className={styles.main_container}>
        <div className={styles.container}>
          {products?.map((p) => {
            const img = p.fields.Images?.map((i) => {
              return i.url;
            });
            if (img != undefined && img != "undefined") {
              return (
                <Card
                  key={p.objectID}
                  onClick={async () => {
                    await setUserFavourites(p.objectID);
                    return router.push("/item/" + p.objectID);
                  }}
                  src={img}
                  title={p.fields.Name}
                  price={p.fields["Unit cost"]}
                />
              );
            }
          })}
        </div>
        <p
          onClick={pullNewProductsPage}
          style={{
            textAlign: "center",
            fontSize: "20px",
            marginTop: 0,
            cursor: "pointer",
          }}
        >
          ver más {">"}{" "}
        </p>
      </div>
    </Layout>
  );
}
