import styles from "./home.module.css";
import { Layout } from "components/layout";
import { MainTitle, MainSubtitle } from "ui/text";
import { HomePageSearchForm } from "components/searchForms";
import { useUserFavourites } from "lib/hooks";
import { getUserFavourites } from "api";
import { useEffect, useState } from "react";
import { Card } from "components/card";
import { useRouter } from "next/router";
import Head from "next/head";
import { getStoragedUser } from "lib";

export default function Home() {
  const router = useRouter();
  const [products, setProducts] = useState() as any;
  const favourites = useUserFavourites();
  async function pullFavourites() {
    const results = (await getUserFavourites(favourites)) as [{}];
    setProducts(results);
  }
  useEffect(() => {
    const user = getStoragedUser();
    if (user.email && user.fullname) {
      pullFavourites();
    }
  }, [favourites]);

  return (
    <Layout>
      <div className={styles.home_container}>
        <Head>
          <title>Home</title>
        </Head>
        <MainTitle text="Mi primer e-commerce" className={styles.title} />
        <div className={styles.form}>
          <HomePageSearchForm />
        </div>
        <div className={styles.home_featured__products}>
          <MainSubtitle
            text="Productos Destacados"
            className={styles.subtitle}
            color="white"
          />
          <div className={styles.cards_container}>
            {products?.map((product) => {
              const fields = product.result.fields;
              return (
                <Card
                  key={product.result.objectID}
                  title={fields.Name}
                  price={fields["Unit cost"]}
                  src={fields.Images.map((i) => i.url)}
                  onClick={() => {
                    return router.push("/item/" + product.result.objectID);
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}
