import { BoldLargeText } from "ui/text";
import styles from "./card.module.css";
import Image from "next/image";

type CardProps = {
  src: string;
  title: string;
  price: string;
  onClick: () => {};
};

export function Card(props: CardProps) {
  return (
    <div onClick={props.onClick} className={styles.main_container}>
      <div className={styles.img_container}>
        <Image
          className={styles.img}
          alt={props.title}
          src={props.src[0]}
          layout="fill"
        />
      </div>
      <div className={styles.text_container}>
        <BoldLargeText text={props.title} />
        <BoldLargeText text={"$" + props.price} />
      </div>
    </div>
  );
}
