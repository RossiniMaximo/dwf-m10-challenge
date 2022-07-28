import { setUserAddressAndPhoneNumber } from "api";
import { TypeUserData } from "custom";
import { setStoragedUser } from "lib";
import { AddressContext } from "pages/_app";
import { useContext, useState } from "react";
import { ProfileButton } from "ui/button";
import { MainSubtitle, MediumLargeText } from "ui/text";
import { TextField } from "ui/textfield";
import styles from "./userProfile.module.css";

export function UserProfile({ user }) {
  const [updated, setUpdated] = useState(false);
  const { addy, setAddy } = useContext(AddressContext) as any;
  async function handleSubmit(e) {
    e.preventDefault();
    const address = e.target.shipment_address.value;
    const phoneNumber = e.target.phone_number.value;
    const res = await setUserAddressAndPhoneNumber(address, phoneNumber);
    setAddy(address);
    console.log("addyContext addy after set", addy);

    setStoragedUser({ ...user, shipment_address: address });
    if (res) {
      setUpdated(true);
    }
  }
  return (
    <div className={styles.main_container}>
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
  );
}
