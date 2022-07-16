import { useRouter } from "next/router";
import { Layout } from "components/layout";
import styles from "./search.module.css";
import { useEffect, useState } from "react";
import { getSearchProducts } from "api";
import { Card } from "components/card";
import { MediumLargeText } from "ui/text";

// SI CAMBIA EL OFFSET AL TOCAR VER MAS PERO NO LLAMA MAS DE UNA VEZ CREO QUE ES PORQUE
// ESO SE DECLARA AL EJECUTARSE EN JAVASCRIPT Y SOLO HACE UNA CUENTA Y LUEGO NO VUELVE A HACER MAS SUMAS
// QUE LA PRIMERA , EFECTIVAMENTE!! YA ANDA CHAVAL!

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
    console.log("results pullnewProductsPage", results.results.length);

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
        <MediumLargeText
          text={products.length + "resultados de " + productsAmount}
        />
      </div>
      <div className={styles.main_container}>
        <div className={styles.container}>
          {products?.map((p) => {
            return (
              <Card
                onClick={() => {
                  return router.push("/item/" + p.objectID);
                }}
                src={p.fields.Images.map((i) => {
                  return i.url;
                })}
                title={p.fields.Name}
                price={p.fields["Unit cost"]}
              />
            );
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
