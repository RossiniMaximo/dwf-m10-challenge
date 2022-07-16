import { MainLargeText, BoldLargeText } from "ui/text";
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
        <Image className={styles.img} src={props.src} alt={props.title} />
      </div>
      <div className={styles.text_container}>
        <MainLargeText text={props.title} />
        <BoldLargeText text={"$" + props.price} />
      </div>
    </div>
  );
}
