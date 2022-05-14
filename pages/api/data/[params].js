import { client } from "../../../lib/client";
export default async function dataHandler({ query: { params } }, res) {
  // const filtered = people.filter((p) => p.id === id);

  // // User with id exists
  // if (filtered.length > 0) {
  //   res.status(200).json(filtered[0]);
  // } else {
  //   res.status(404).json({ message: `User with id: ${id} not found.` });
  // }
  // console.log("======params=====", JSON.parse(params));
  const queryParams = JSON.parse(params);
  let sortCondition;
  let dealsConditon = "";
  let priceRangeCondition = "";
  let deliveryCondition = "";
  let dietaryCondition = "";
  if (queryParams.sort === "r") {
    sortCondition += "score desc";
  }
  if (queryParams.sort === "dt") {
    sortCondition += "minDeliveryTime asc";
  }
  if (queryParams.switch["switch-1"]) {
    dealsConditon += "&& deal == true";
  }
  if (queryParams.switch["switch-2"]) {
    dealsConditon += "&& tops == true";
  }
  // price range
  if (queryParams.price["price-1"]) {
    priceRangeCondition == ""
      ? (priceRangeCondition += " && priceRange == 1")
      : (priceRangeCondition += " || priceRange == 1");
  }
  if (queryParams.price["price-2"]) {
    priceRangeCondition == ""
      ? (priceRangeCondition += " && priceRange == 2")
      : (priceRangeCondition += " || priceRange == 2");
  }
  if (queryParams.price["price-3"]) {
    priceRangeCondition == ""
      ? (priceRangeCondition += " && priceRange == 3")
      : (priceRangeCondition += " || priceRange == 3");
  }
  if (queryParams.price["price-4"]) {
    priceRangeCondition == ""
      ? (priceRangeCondition += " && priceRange == 4")
      : (priceRangeCondition += " || priceRange == 4");
  }
  // delivery fee
  if (queryParams.delivery["delivery-1"]) {
    deliveryCondition == ""
      ? (deliveryCondition += " && deliveryFee <= 200")
      : (deliveryCondition += " || deliveryFee <= 200");
  }
  if (queryParams.delivery["delivery-2"]) {
    deliveryCondition == ""
      ? (deliveryCondition += " && deliveryFee <= 300")
      : (deliveryCondition += " || deliveryFee <= 300");
  }
  if (queryParams.delivery["delivery-3"]) {
    deliveryCondition == ""
      ? (deliveryCondition += " && deliveryFee <= 400")
      : (deliveryCondition += " || deliveryFee <= 400");
  }
  if (queryParams.delivery["delivery-4"]) {
    deliveryCondition == ""
      ? (deliveryCondition += " && deliveryFee > 400")
      : (deliveryCondition += " || deliveryFee > 400");
  }

  // dietary
  if (queryParams.dietary["dietary-1"]) {
    dietaryCondition == ""
      ? (dietaryCondition += " && 'vegetarian'")
      : (dietaryCondition += " || 'vegetarian'");
    // dietaryCondition += " "
  }
  if (queryParams.dietary["dietary-2"]) {
    dietaryCondition == ""
      ? (dietaryCondition += " && 'vegan'")
      : (dietaryCondition += " || 'vegan'");
    // dietaryCondition += " 'vegan'"
  }
  if (dietaryCondition !== "") {
    dietaryCondition += " in dietary";
  }

  const mainQuery = `*[_type == "mainTypes" ] {
    _id,
    name,
    "items": *[_type == "main" && type._ref == ^._id ${dealsConditon} ${priceRangeCondition} ${deliveryCondition} ${dietaryCondition}]
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
  // const mainQuery = `*[_type == "mainTypes" ] {
  //   _id,
  //   name,
  //   "items": *[_type == "main" && type._ref == ^._id && priceRange == 1 ||priceRange == 2 ]
  //   {
  //     _id,
  //     score,
  //     name,
  //     image,
  //     deal,
  //     deliveryFee,
  //     minDeliveryTime,
  //     maxDeliveryTime
  //   }
  // }`;
  // console.log(mainQuery);
  const mainData = await client.fetch(mainQuery);
  res.status(200).json(mainData);
  // res.status(200).json({ name: "John Doe" });
}
