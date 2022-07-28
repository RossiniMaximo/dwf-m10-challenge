import { useRouter } from "next/router";
import { useProductData } from "lib/hooks";
import { useEffect } from "react";
import { getStoragedUser } from "lib";
import { Layout } from "components/layout";
import Head from "next/head";
import { useContext } from "react";
import { AddressContext } from "pages/_app";
import { ProductPurchaseSettings } from "components/productPurchaseSettings";

export default function CheckOut() {
  const { addy, setAddy } = useContext(AddressContext) as any;
  const router = useRouter();
  const productId = router.query.checkoutId as string;
  const product = useProductData(productId);
  useEffect(() => {
    const user = getStoragedUser();
    setAddy(user.shipment_address);
  }, []);

  return (
    <Layout>
      <Head>
        <title>Checkout</title>
      </Head>
      <ProductPurchaseSettings
        product={product}
        productId={productId}
        address={addy}
      />
    </Layout>
  );
}
