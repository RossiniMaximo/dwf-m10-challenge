import styles from "./home.module.css";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { Layout } from "components/layout";
import { MainTitle, MainSubtitle } from "ui/text";
import { HomePageSearchForm } from "components/searchForms";
import { getFavourites, getUserFavourites } from "api";
import { Card, StaticCard } from "ui/card";
import { FeaturedProducts } from "components/featuredProducts";

/* const sillaGamerImg = require("/public/static/images/silla-gamer.jpg");
const sillonBlanco = require("/public/static/images/silla-blanca.png");
const sillonMulticolor = require("/public/static/images/sillon-clave.png"); */

export default function Home() {
  /* const router = useRouter();
  const [products, setProducts] = useState() as any;

  async function pullFavourites(): Promise<void> {
    const favourites = await getFavourites();
    const results = await getUserFavourites(favourites);
    if (results) {
      setProducts(results);
    }
  }
  pullFavourites(); */

  return (
    <Layout>
      <Head>
        <title>Home</title>
      </Head>
      <div className={styles.home_container}>
        <MainTitle text="Mi primer e-commerce" className={styles.title} />
        <div className={styles.form}>
          <HomePageSearchForm />
        </div>

        <FeaturedProducts />
      </div>
    </Layout>
  );
}
