import { createOrder } from "api";
import { MakeOrderButton } from "ui/button";
import { MainLargeText, MainSubtitle } from "ui/text";
import { PurchaseInput } from "ui/textfield";
import styles from "./productPurchaseSettings.module.css";

export function ProductPurchaseSettings({ product, productId, address }) {
  async function handleSubmit(e) {
    e.preventDefault();
    const colour = e.target.colours.value;
    const address = e.target.address.value;
    const order = await createOrder(productId, { colour, address });
    window.location = order.URL;
  }
  return (
    <div className={styles.container}>
      <MainSubtitle text="Concreta tu orden de compra" color="black" />
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.product_title_container}>
          <MainLargeText
            text={"Producto :" + product?.result.fields.Name}
            color="white"
          />
          <MainLargeText
            text={
              "Precio del producto : $" + product?.result.fields["Unit cost"]
            }
            color="white"
          />
        </div>
        <div className={styles.dropdown_container}>
          <MainLargeText text="Color:" />
          <select className={styles.dropdown} name="colours">
            {product?.result.fields.Color.map((color) => {
              return (
                <option value={color} key={product.result.fields.Name}>
                  {color}
                </option>
              );
            })}
          </select>
        </div>
        <div className={styles.text_container}>
          <p>
            Materiales :{" "}
            {product?.result.fields.Materials
              ? product?.result.fields.Materials.join(" , ")
              : "Cuero y algodón"}
          </p>
          <p>Stock : {JSON.stringify(product?.result.fields["In stock"])}</p>
          <p>Tamaño : {product?.result.fields["Size (WxLxH)"]}</p>
          <div className={styles.address_container}>
            <label>Dirección</label>
            <PurchaseInput name="address" value={address} />
          </div>
        </div>
        <div className={styles.btn_container}>
          <MakeOrderButton text="Comprar" />
        </div>
      </form>
    </div>
  );
}
