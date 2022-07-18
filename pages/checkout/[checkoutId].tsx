import { useRouter } from "next/router";
import { useProductData, useUserAddressState } from "lib/hooks";
import { MainLargeText, MainSubtitle } from "ui/text";
import { PurchaseInput } from "ui/textfield";
import { MakeOrderButton } from "ui/button";
import { createOrder } from "api";
import { useEffect } from "react";
import { getStoragedUser } from "lib";
import styles from "./checkout.module.css";
import { Layout } from "components/layout";

export default function CheckOut() {
  const router = useRouter();
  const productId = router.query.checkoutId as string;
  const product = useProductData(productId);
  const [userAddress, setUserAddress] = useUserAddressState();
  useEffect(() => {
    const user = getStoragedUser();
    setUserAddress(user.shipment_address);
  }, []);
  async function handleSubmit(e) {
    e.preventDefault();
    const colour = e.target.colours.value;
    const address = e.target.address.value;
    const order = await createOrder(productId, { colour, address });
  }

  return (
    <Layout>
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
                return <option value={color}>{color}</option>;
              })}
            </select>
          </div>
          <div className={styles.text_container}>
            <p>Materiales : {product?.result.fields.Materials.join(" , ")}</p>
            <p>Stock : {JSON.stringify(product?.result.fields["In stock"])}</p>
            <p>Tamaño : {product?.result.fields["Size (WxLxH)"]}</p>
            <div className={styles.address_container}>
              <label>Dirección</label>
              <PurchaseInput name="address" value={userAddress} />
            </div>
          </div>
          <div className={styles.btn_container}>
            <MakeOrderButton text="Comprar" />
          </div>
        </form>
      </div>
    </Layout>
  );
}
