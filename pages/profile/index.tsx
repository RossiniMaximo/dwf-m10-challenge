import { Layout } from "components/layout";
import { MainSubtitle, MediumLargeText } from "ui/text";
import { TextField } from "ui/textfield";
import { ProfileButton } from "ui/button";
import styles from "./profile.module.css";
import { getStoragedUser, setStoragedUser } from "lib";
import { useState, useEffect } from "react";
import { TypeUserData } from "custom";
import { setUserAddressAndPhoneNumber } from "api";
import { useUserAddressState } from "lib/hooks";
import Head from "next/head";
export default function Profile() {
  const [user, setUser] = useState({} as TypeUserData);
  const [updated, setUpdated] = useState(false);
  const [userAddress, setUserAddress] = useUserAddressState();
  useEffect(() => {
    const userData = getStoragedUser();
    setUser(userData);
  }, []);
  async function handleSubmit(e) {
    e.preventDefault();
    const address = e.target.shipment_address.value;
    const phoneNumber = e.target.phone_number.value;
    const res = await setUserAddressAndPhoneNumber(address, phoneNumber);
    setUserAddress(address);
    setStoragedUser({ ...user, shipment_address: address });
    if (res) {
      setUpdated(true);
    }
  }
  return (
    <Layout>
      <div className={styles.main_container}>
        <Head>
          <title>Profile</title>
        </Head>
        <div className={styles.title_container}>
          <MainSubtitle text="Perfil" color="black" />
        </div>
        <form onSubmit={handleSubmit} className={styles.textfield_container}>
          <TextField
            text="Nombre completo"
            type="text"
            placeholder={user?.fullname}
            name="fullname"
          />
          <TextField
            text="Dirección"
            type="text"
            placeholder={
              user?.shipment_address
                ? user.shipment_address
                : "765 calle 8 , La Plata "
            }
            name="shipment_address"
          />
          <TextField
            text="Teléfono"
            type="text"
            placeholder={user?.phone ? user.phone : "1123456020"}
            name="phone_number"
          />
          <div>
            <ProfileButton text="Guardar" color="black" />
          </div>
        </form>
        {updated ? (
          <div style={{ textAlign: "center", marginTop: 35 }}>
            <MediumLargeText text="¡Se han actualizado tus credenciales!" />
          </div>
        ) : (
          ""
        )}
      </div>
    </Layout>
  );
}
