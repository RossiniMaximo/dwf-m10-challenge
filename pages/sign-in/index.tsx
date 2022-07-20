import { Layout } from "components/layout";
import styles from "./signin.module.css";
import { MainSubtitle, MediumLargeText } from "ui/text";
import { TextField, TextFieldNoAutocomplete } from "ui/textfield";
import { ProfileButton } from "ui/button";
import { useState } from "react";
import { sendEmail, sendCode } from "api";
import { useRouter } from "next/router";
import { setStoragedUser } from "lib";
import { TypeUserData } from "custom";
import Head from "next/head";

export default function SignIn() {
  const [userData, setUserData] = useState({} as TypeUserData);

  const router = useRouter();
  async function firstSubmit(e: any) {
    e.preventDefault();
    const email = e.target.email.value;
    const fullname = e.target.fullname.value;
    setUserData({ ...userData, email, fullname });
    setStoragedUser({ email, fullname, shipment_address: "" });
    await sendEmail(email, fullname);
  }

  async function secondSubmit(e: any) {
    e.preventDefault();
    const code = Number(e.target.code.value);
    const res = await sendCode(userData.email, code);
    if (res) {
      router.push("/");
    }
  }
  return (
    <Layout>
      <div className={styles.container}>
        <Head>
          <title>Sign In</title>
        </Head>
        <MainSubtitle text="Ingresar" color="black" className={styles.title} />
        <form
          style={{ display: userData.email ? "none" : "" }}
          onSubmit={firstSubmit}
          className={styles.form}
        >
          <TextField
            text="Email"
            type="email"
            placeholder="maximo@email.com"
            name="email"
          />
          <TextField
            text="Nombre"
            type="text"
            placeholder="Maximo Rossini"
            name="fullname"
          />
          <div>
            <ProfileButton text="Continuar" color="black" />
          </div>
        </form>
        <form
          onSubmit={secondSubmit}
          className={styles.form}
          style={{ display: userData.email ? "" : "none" }}
        >
          <TextFieldNoAutocomplete
            text="Código"
            type="text"
            placeholder="Inserte código"
            name="code"
          />
          <div className={styles.form_text_container}>
            <MediumLargeText
              text="te enviamos el código a tu mail"
              className={styles.form_text}
            />
          </div>
          <ProfileButton text="Ingresar" color="black" />
        </form>
      </div>
    </Layout>
  );
}
