import { Layout } from "components/layout";
import { getStoragedUser } from "lib";
import { useState, useEffect } from "react";
import { TypeUserData } from "custom";
import { UserProfile } from "components/userProfile";
import Head from "next/head";

export default function Profile() {
  const [user, setUser] = useState({} as TypeUserData);

  useEffect(() => {
    const userData = getStoragedUser();
    setUser(userData);
  }, []);

  return (
    <Layout>
      <Head>
        <title>Profile</title>
      </Head>
      <UserProfile user={user} />
    </Layout>
  );
}
