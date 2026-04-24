/**
 * Server-rendered JSON-LD block. Use in any page/layout that needs
 * structured data in the document head.
 */
export default function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify escapes </ safely for <script> embedding.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
