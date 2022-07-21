import type { AppProps } from "next/app";
import React, { useState } from "react";

export const AddressContext = React.createContext({});
function MyApp({ Component, pageProps }: AppProps) {
  const [addy, setAddy] = useState();
  return (
    <AddressContext.Provider
      value={{
        addy,
        setAddy,
      }}
    >
      <Component {...pageProps} />
    </AddressContext.Provider>
  );
}
export default MyApp;
