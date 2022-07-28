import { Layout } from "components/layout";
import Head from "next/head";
import { LoginGateway } from "components/loginGateway";

export default function SignIn() {
  return (
    <Layout>
      <Head>
        <title>Sign In</title>
      </Head>
      <LoginGateway />
    </Layout>
  );
}
