import styles from "./itemView.module.css";
import Image from "next/image";
import { MainSubtitle, MediumLargeText } from "ui/text";
import { PurchaseButton } from "ui/button";
import { useRouter } from "next/router";
const sillaGamerImg = require("/public/static/images/silla-gamer.jpg");
const sillonBlanco = require("/public/static/images/silla-blanca.png");
const sillonMulticolor = require("/public/static/images/sillon-clave.png");

export function ItemView({ data, query }) {
  let img = "";

  if (data.Name == "Silla gamer streaming") {
    img = sillaGamerImg;
  } else if (data.Name == "Sillon blanco moderno") {
    img = sillonBlanco;
  } else if (data.Name == "Sillon multicolor") {
    img = sillonMulticolor;
  }

  const router = useRouter();

  const price = data ? "$" + data["Unit cost"] : "";
  return (
    <div className={styles.container}>
      <div className={styles.img_container}>
        <Image
          alt={data?.Name}
          layout="fill"
          className={styles.img}
          src={data.Images.url ? img : data.Images[0].url}
          objectFit="fill"
        />
      </div>
      <div className={styles.product_data_container}>
        <div className={styles.text_container}>
          <MainSubtitle text={data?.Name} color="black" />
          <MainSubtitle color="black" text={price} />
        </div>
        <div
          className={styles.button_container}
          onClick={() => {
            router.push("/checkout/" + query);
          }}
        >
          <PurchaseButton text="Comprar" color="black" />
        </div>
        <div className={styles.large_text__container}>
          <MediumLargeText text={data?.Description} color="black" />
        </div>
      </div>
    </div>
  );
}
