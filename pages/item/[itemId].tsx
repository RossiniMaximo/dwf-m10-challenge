import { useRouter } from "next/router";
import Head from "next/head";
import { Layout } from "components/layout";
import { getIdsForPaths, getProductData } from "api";
import { GetStaticPaths } from "next";
import { ItemView } from "components/itemView";

export default function Item({ data }: any) {
  const router = useRouter();
  const query = router.query.itemId as string;
  router.pathname = "/item/" + query;

  if (data && data.Images) {
    return (
      <Layout>
        <Head>
          <title>{data?.Name}</title>
        </Head>
        <ItemView data={data} query={query} />
      </Layout>
    );
  } else {
    return <div></div>;
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const arrForMockItems = [
    { params: { itemId: "1" } },
    { params: { itemId: "2" } },
    { params: { itemId: "3" } },
  ];
  const productsId = await getIdsForPaths();
  const arr = productsId.products.map((id) => ({ params: { itemId: id } }));
  const pathsArr = arr.concat(arrForMockItems);
  return {
    paths: pathsArr,
    fallback: true,
  };
};
export async function getStaticProps(ctx) {
  const productData = await getProductData(ctx.params.itemId);
  return { props: { data: productData } };
}
