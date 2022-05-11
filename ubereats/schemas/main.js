export default {
  name: "main",
  title: "Main",
  type: "document",
  fields: [
    {
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "like",
      title: "Like",
      type: "boolean",
    },
    {
      name: "deal",
      title: "Deal",
      type: "boolean",
    },
    {
      name: "tops",
      title: "Tops",
      type: "boolean",
    },
    {
      name: "score",
      title: "Score",
      type: "number",
    },
    {
      name: "deliveryFee",
      title: "DeliveryFee",
      type: "number",
    },
    {
      name: "minDeliveryTime",
      title: "MinDeliveryTime",
      type: "number",
    },
    {
      name: "maxDeliveryTime",
      title: "MaxDeliveryTime",
      type: "number",
    },
    {
      name: "type",
      title: "Type",
      type: "reference",
      to: [{ type: "mainTypes" }],
    },
  ],
};
