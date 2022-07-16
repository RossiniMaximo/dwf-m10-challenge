import { useRouter } from "next/router";
import { Layout } from "components/layout";
import { MainSubtitle, MediumLargeText } from "ui/text";
import { PurchaseButton } from "ui/button";
import styles from "./item.module.css";
import { useProductData } from "lib/hooks";
import Image from "next/image";

export default function Item() {
  const router = useRouter();
  const query = router.query.itemId as string;
  const product = useProductData(query);

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.img_container}>
          <Image
            alt={product.result.fields.Name}
            className={styles.img}
            src={product?.result.fields.Images.map((i) => {
              return i.url;
            })}
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
            onClick={() => router.push("/checkout/" + query)}
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
    </Layout>
  );
}
