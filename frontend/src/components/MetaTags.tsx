import { Helmet } from 'react-helmet-async';

interface MetaTagsProps {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
}

export default function MetaTags({
  title = "datheory - Data Science & Machine Learning Portfolio",
  description = "Professional portfolio showcasing expertise in data science, machine learning, and fullstack development. Explore projects and skills.",
  path = "/",
  image = "/og-image.jpg"
}: MetaTagsProps) {
  const siteUrl = "https://your-portfolio-url.com";
  const fullUrl = `${siteUrl}${path}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      <link rel="canonical" href={fullUrl} />
    </Helmet>
  );
}
