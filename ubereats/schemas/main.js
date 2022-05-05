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
      name: "deliveryTime",
      title: "DeliveryTime",
      type: "string",
    },
  ],
};
