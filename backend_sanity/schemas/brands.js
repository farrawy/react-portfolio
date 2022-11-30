export default {
  name: "brands",
  title: "Brands",
  type: "document",
  fields: [
    {
      name: "imageUrl",
      title: "ImgUrl",
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
  ],
};
