import { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { client } from "./client";

export default function useFetchData() {
  const { filterState } = useAppContext();
  const [result, setResult] = useState({});
  useEffect(() => {
    const mainQuery = `*[_type == "mainTypes"]{
    _id, name,items[]-> }`;
    async function fetchData() {
      fetch(`api/data/${JSON.stringify(filterState)}`)
        .then((res) => res.json())
        .then((data) => {
          setResult(data);
        });
    }
    fetchData();
  }, [filterState]);
  return result;
}
