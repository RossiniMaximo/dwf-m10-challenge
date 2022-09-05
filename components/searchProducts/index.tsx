import { setUserFavourites } from "api";
import { Card } from "ui/card";
import { MediumLargeText } from "ui/text";
import styles from "./searchProducts.module.css";
import { useRouter } from "next/router";
import { useProducts } from "lib/hooks";
import { useEffect, useState } from "react";

export function SearchProducts({ stateOffset, setStateOffset, query, limit }) {
  const router = useRouter();
  const products = useProducts(query, limit, stateOffset);
  const [results, setResults] = useState([]);
  useEffect(() => {
    setResults(products);
  });

  return (
    <div className={styles.content_container}>
      <div className={styles.result_amount}>
        <MediumLargeText
          text={
            products?.results.length +
            " " +
            "resultados de " +
            products?.pagination.totalResults
          }
        />
      </div>
      <div className={styles.main_container}>
        <div className={styles.container}>
          {products?.results.map((p) => {
            const img = p.fields.Images.map((i) => {
              return i.url;
            });
            return (
              <Card
                key={p.objectID}
                onClick={async () => {
                  setUserFavourites(p.objectID);
                  router.push(`/item/${p.objectID}`);
                }}
                src={img}
                title={p.fields.Name}
                price={p.fields["Unit cost"]}
              />
            );
          })}
        </div>
        <div className={styles.page_navigation}>
          {products?.results.length <= 1 ? (
            ""
          ) : (
            <div className={styles.arrows_container}>
              <p
                onClick={() => {
                  setStateOffset((stateOffset = -1));
                }}
                style={{
                  textAlign: "center",
                  fontSize: "20px",
                  marginTop: 0,
                  cursor: "pointer",
                }}
              >
                {"<"} volver
              </p>

              <p
                onClick={() => {
                  setStateOffset((stateOffset = +1));
                }}
                style={{
                  textAlign: "center",
                  fontSize: "20px",
                  marginTop: 0,
                  cursor: "pointer",
                }}
              >
                ver más {">"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
