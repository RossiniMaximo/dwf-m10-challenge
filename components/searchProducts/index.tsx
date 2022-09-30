import { setUserFavourites } from "api";
import { Card } from "ui/card";
import { MediumLargeText } from "ui/text";
import styles from "./searchProducts.module.css";
import { useRouter } from "next/router";
import { useProducts } from "lib/hooks";
import { useEffect, useState } from "react";
import { LogInButton } from "ui/button";

export function SearchProducts({ query, offset }) {
  const [stateOffset, setStateOffset] = useState(0);

  const router = useRouter();
  const products = useProducts(query, 3, stateOffset);

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
        {products?.results.length > 0 ? (
          <div className={styles.page_navigation}>
            {products?.results.length <= 1 ? (
              <p
                onClick={() => {
                  setStateOffset((currentState) => currentState - 1);
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
            ) : (
              <div className={styles.arrows_container}>
                <p
                  onClick={() => {
                    setStateOffset((currentState) => currentState - 1);
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
                    setStateOffset((currentState) => currentState + 1);
                    console.log("click");
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
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
