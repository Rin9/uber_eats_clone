import { useEffect } from "react";
import Head from "next/head";
import Banner from "../components/Banner";
import Navbar from "../components/Navbar";
import Marketing from "../components/Marketing";
import Main from "../components/Main";
import { client } from "../lib/client";
import { useAppContext } from "../context/AppContext";
import Footer from "../components/Footer";

export default function Home({
  bannerData,
  marketingData,
  // mainData,
  isLoaded,
}) {
  const { setIsLoaded } = useAppContext();

  useEffect(() => {
    setIsLoaded(true);
  }, [setIsLoaded]);

  return (
    <div>
      <Head>
        <title>Uber Eats</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Banner bannerData={bannerData} />
      <Marketing marketingData={marketingData} />
      {/* <Main mainData={mainData} /> */}
      <Main />
      <Footer />
    </div>
  );
}

export const getServerSideProps = async () => {
  //get banner data
  const bannerQuery = `*[_type == "banner"]`;
  const bannerData = await client.fetch(bannerQuery);
  //get marketing data
  const marketingQuery = `*[_type == "marketing"]`;
  const marketingData = await client.fetch(marketingQuery);
  //get main data
  // const mainQuery = `*[_type == "mainTypes"]{
  //   _id, name,items[]->
  // }`;
  // const mainData = await client.fetch(mainQuery);

  return {
    props: {
      bannerData,
      marketingData,
      // mainData,
      isLoaded: true,
    },
  };
};
