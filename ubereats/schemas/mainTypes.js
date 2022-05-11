export default {
  name: "mainTypes",
  title: "MainTypes",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "items",
      title: "Items",
      type: "array",
      of: [
        {
          type: "reference",
          to: { type: "main" },
        },
      ],
    },
  ],
};
