import { Layout } from "components/layout";
import { MainSubtitle } from "ui/text";

export default function Thanks() {
  return (
    <Layout>
      <div style={{ height: 350, textAlign: "center", marginTop: 175 }}>
        <MainSubtitle text="¡Gracias por tu compra!" color="black" />
      </div>
    </Layout>
  );
}
