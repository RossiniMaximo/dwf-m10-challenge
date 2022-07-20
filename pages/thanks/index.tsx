import { Layout } from "components/layout";
import { MainSubtitle } from "ui/text";
import Head from "next/head";

export default function Thanks() {
  return (
    <Layout>
      <Head>
        <title>Thanks</title>
      </Head>
      <div style={{ height: 350, textAlign: "center", marginTop: 175 }}>
        <MainSubtitle text="¡Gracias por tu compra!" color="black" />
      </div>
    </Layout>
  );
}
