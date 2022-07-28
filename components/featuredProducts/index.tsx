import { getFavourites, getUserFavourites } from "api";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Card, StaticCard } from "ui/card";
import { MainSubtitle } from "ui/text";
import styles from "./featuredProd.module.css";

const sillaGamerImg = require("/public/static/images/silla-gamer.jpg");
const sillonBlanco = require("/public/static/images/silla-blanca.png");
const sillonMulticolor = require("/public/static/images/sillon-clave.png");

export function FeaturedProducts() {
  const router = useRouter();
  const [products, setProducts] = useState() as any;

  async function pullFavourites() {
    const favourites = await getFavourites();
    const results = await getUserFavourites(favourites);
    if (results) {
      setProducts(results);
    }
  }
  useEffect(() => {
    pullFavourites();
  }, []);
  return (
    <div className={styles.home_featured__products}>
      <MainSubtitle
        text="Productos Destacados"
        className={styles.subtitle}
        color="white"
      />

      <div className={styles.cards_container}>
        <StaticCard
          title="Silla gamer streaming"
          price="65000"
          src={sillaGamerImg}
          onClick={() => {
            return router.push("/item/" + 1);
          }}
        />
        <StaticCard
          title="Sillon blanco moderno"
          price="15000"
          src={sillonBlanco}
          onClick={() => {
            return router.push("/item/" + 2);
          }}
        />
        <StaticCard
          title="Sillon multicolor"
          price="50000"
          src={sillonMulticolor}
          onClick={() => {
            return router.push("/item/" + 3);
          }}
        />
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
  );
}
