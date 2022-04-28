export default {
  name: "marketing",
  title: "Marketing",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "type",
      title: "Type",
      type: "string",
    },
    {
      name: "color",
      title: "Color",
      type: "string",
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "titleText",
      title: "TitleText",
      type: "string",
    },
    {
      name: "smallText",
      title: "SmallText",
      type: "string",
    },
    {
      name: "buttonText",
      title: "ButtonText",
      type: "string",
    },
    {
      name: "textColor",
      title: "TextColor",
      type: "string",
    },
  ],
};
