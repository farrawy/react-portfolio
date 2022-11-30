import SanityClient from "@sanity/client";
import ImageUrlBuilder from "@sanity/image-url";

export const client = SanityClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: "production",
  apiVersion: "2021-10-21",
  useCdn: true,
  token: import.meta.env.VITE_SANITY_TOKEN,
});

const builder = ImageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);
