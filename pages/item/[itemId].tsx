import { useRouter } from "next/router";
import { Layout } from "components/layout";
import { MainSubtitle, MediumLargeText } from "ui/text";
import { PurchaseButton } from "ui/button";
import styles from "./item.module.css";
import { useProductData } from "lib/hooks";
import Image from "next/image";
import Head from "next/head";
import { isUserLogged } from "lib";

export default function Item() {
  const router = useRouter();
  const query = router.query.itemId as string;
  router.pathname = "/item/" + query;

  const product = useProductData(query);
  return (
    <Layout>
      {product ? (
        <div className={styles.container}>
          <Head>
            <title>{product.result.fields.Name}</title>
          </Head>
          <div className={styles.img_container}>
            <Image
              alt={product?.result.fields.Name}
              layout="fill"
              className={styles.img}
              src={product?.result.fields.Images[0].url}
            />
          </div>
          <div className={styles.product_data_container}>
            <div className={styles.text_container}>
              <MainSubtitle text={product?.result.fields.Name} color="black" />
              <MainSubtitle
                color="black"
                text={
                  product?.result.fields
                    ? "$" + product.result.fields["Unit cost"]
                    : ""
                }
              />
            </div>
            <div
              className={styles.button_container}
              onClick={() => {
                const logged = isUserLogged();
                if (logged) {
                  router.push("/checkout/" + query);
                } else {
                  window.alert(
                    "Debes iniciar sesión para poder comprar productos"
                  );
                }
              }}
            >
              <PurchaseButton text="Comprar" color="black" />
            </div>
            <div className={styles.large_text__container}>
              <MediumLargeText
                text={product?.result.fields.Description}
                color="black"
              />
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </Layout>
  );
}
