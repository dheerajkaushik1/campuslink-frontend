import { Helmet } from 'react-helmet-async'

export default function SEO({
  title,
  description,
  path = '/',
}) {
  const baseUrl = 'https://campuslink-frontend-pi.vercel.app'
  const url = `${baseUrl}${path}`

  return (
    <Helmet>
      <title>{title}</title>

      <meta
        name="description"
        content={description}
      />

      <meta
        name="robots"
        content="index, follow"
      />

      <link
        rel="canonical"
        href={url}
      />

      <meta
        property="og:title"
        content={title}
      />

      <meta
        property="og:description"
        content={description}
      />

      <meta
        property="og:url"
        content={url}
      />

      <meta
        property="og:type"
        content="website"
      />
    </Helmet>
  )
}