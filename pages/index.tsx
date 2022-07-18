import styles from "./home.module.css";
import { Layout } from "components/layout";
import { MainTitle, MainSubtitle } from "ui/text";
import { HomePageSearchForm } from "components/searchForms";

export default function Home() {
  return (
    <Layout>
      <div className={styles.home_container}>
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
        </div>
      </div>
    </Layout>
  );
}
