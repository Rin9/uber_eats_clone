import { client } from "../../../lib/client";
export default async function dataHandler({ query: { params } }, res) {
  // const filtered = people.filter((p) => p.id === id);

  // // User with id exists
  // if (filtered.length > 0) {
  //   res.status(200).json(filtered[0]);
  // } else {
  //   res.status(404).json({ message: `User with id: ${id} not found.` });
  // }
  console.log("======params=====", JSON.parse(params));
  const queryParams = JSON.parse(params);
  let sortCondition,
    dealsConditon = "";
  if (queryParams.sort === "r") {
    sortCondition = "score desc";
  }
  if (queryParams.sort === "dt") {
    sortCondition = "minDeliveryTime asc";
  }
  if (queryParams.switch["switch-1"]) {
    dealsConditon = "&& deal == true";
  }
  if (queryParams.switch["switch-2"]) {
    dealsConditon += "&& tops == true";
  }
  const mainQuery = `*[_type == "mainTypes" ] {
    _id,
    name,
    "items": *[_type == "main" && type._ref == ^._id ${dealsConditon}]
    {
      _id,
      score,
      name,
      image,
      deal,
      deliveryFee,
      minDeliveryTime,
      maxDeliveryTime
    } | order(${sortCondition})
  }`;

  // const mainQuery = `*[_type == "main" ]`;
  // const mainQuery = `*[_type == "mainTypes" ]`;
  //console.log(mainQuery);
  const mainData = await client.fetch(mainQuery);
  res.status(200).json(mainData);
  // res.status(200).json({ name: "John Doe" });
}
