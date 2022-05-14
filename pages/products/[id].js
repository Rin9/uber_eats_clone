import React, { useState, useEffect } from "react";
import Head from "next/head";
import Navbar from "../../components/Navbar";
import { client } from "../../lib/client";
import ProductsComponents from "../../components/Products/ProductsComponents";
import ErrorComponent from "../../components/parts/ErrorComponent";

const Products = ({ productsData }) => {
  console.log("This is products in page", productsData.products?.length);
  // const [products, setProducts] = useState();
  // useEffect(() => {
  //   setProducts(productsData);
  // }, [productsData]);

  return (
    <div>
      <Head>
        <title>Uber Eats</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      {productsData[0].products?.length > 0 ? (
        <ProductsComponents productsData={productsData} />
      ) : (
        <ErrorComponent />
      )}
    </div>
  );
};

export default Products;

export const getServerSideProps = async ({ params }) => {
  // get the data for store
  const productsQuery = `*[_type == "main" && _id == "${params.id}"] {
    _id,
    name,
    score,
    priceRange,
    minDeliveryTime,
    maxDeliveryTime,
    deliveryFee,
    products[] ->
    {
      _id,
      name,
      image,
      price,
      calorie
    }
  }`;
  const productsData = await client.fetch(productsQuery);
  // console.log("products", productsData);
  if (productsData.products === null) {
    productsData.products = [];
  }
  return {
    props: { productsData },
  };
};