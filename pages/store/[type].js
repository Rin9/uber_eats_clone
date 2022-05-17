import React from "react";
import { client } from "../../lib/client";
import Head from "next/head";
import Navbar from "../../components/Navbar";
import StoreComponent from "../../components/Store/StoreComponent";
import ErrorComponent from "../../components/parts/ErrorComponent";
import Footer from "../../components/Footer";

const Stores = ({ storesData, type }) => {
  return (
    <div>
      <Head>
        <title>Uber Eats</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      {storesData?.length > 0 ? (
        <StoreComponent storesData={storesData} type={type} />
      ) : (
        <ErrorComponent />
      )}
      <Footer />
    </div>
  );
};

export default Stores;

export const getServerSideProps = async ({ params }) => {
  // get the data for store
  const storesQuery = `*[_type == "main" && ${params.type} == true] {
    _id,
    name,
    score,
    priceRange,
    minDeliveryTime,
    maxDeliveryTime,
    deliveryFee,
    image
  }`;
  const storesData = await client.fetch(storesQuery);
  console.log("This is stores Data", storesData);
  return {
    props: { storesData, type: params.type },
  };
};
