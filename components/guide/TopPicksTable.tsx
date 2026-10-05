import { getProductById } from '@/lib/affiliate-products'
import { getProductUrl } from '@/lib/amazon'

export type TopPicksColumn = {
  key: string
  header: string
}

export type TopPicksRow = {
  /** Short "Best for ___" label shown above the product name, e.g. "Best overall". */
  label: string
  /** Registry id from `AFFILIATE_PRODUCTS`. Name, price, and link come from the registry. */
  productId: string
  /** Cell values keyed by column `key`. */
  values: Record<string, string>
}

type Props = {
  columns: TopPicksColumn[]
  rows: TopPicksRow[]
  /** Header for the first column, e.g. "Tent" or "Sleeping bag". */
  itemHeader?: string
  /** Optional caption shown under the table, e.g. when prices were last checked. */
  note?: string
}

/**
 * Above-the-fold comparison table for "best X" guides. Renders a real
 * <table> from md up (good for skimmers and for search engines that lift
 * tables into results) and stacked cards on phones so nothing scrolls
 * sideways. Product name, price, and affiliate link always come from the
 * registry so the table can't drift from the gear shelf.
 */
export default function TopPicksTable({ columns, rows, itemHeader = 'Pick', note }: Props) {
  const items = rows.map((row) => ({ row, product: getProductById(row.productId) }))

  return (
    <div className="not-prose my-10 lg:-mx-28">
      {/* Desktop / tablet: table */}
      <div className="hidden md:block overflow-hidden rounded-2xl ring-1 ring-stone-200">
        <table className="w-full text-[15px] leading-snug border-collapse">
          <thead>
            <tr className="bg-stone-50 border-b border-stone-200">
              <th scope="col" className="text-left font-semibold text-stone-900 px-4 py-3 w-[13rem]">
                {itemHeader}
              </th>
              {columns.map((c) => (
                <th key={c.key} scope="col" className="text-left font-semibold text-stone-900 px-4 py-3">
                  {c.header}
                </th>
              ))}
              <th scope="col" className="text-left font-semibold text-stone-900 px-4 py-3">
                Price
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200 text-stone-700">
            {items.map(({ row, product }) => (
              <tr key={row.productId} className="align-top">
                <th scope="row" className="text-left font-normal px-4 py-4">
                  <span className="block text-[11px] font-semibold tracking-[0.14em] uppercase text-brand-green mb-1">
                    {row.label}
                  </span>
                  <span className="font-semibold text-stone-950">{product.name}</span>
                </th>
                {columns.map((c) => (
                  <td key={c.key} className="px-4 py-4">
                    {row.values[c.key]}
                  </td>
                ))}
                <td className="px-4 py-4 whitespace-nowrap">
                  <span className="block tabular-nums text-stone-900">{product.priceRange}</span>
                  <a
                    href={getProductUrl(product)}
                    target="_blank"
                    rel="nofollow sponsored noopener noreferrer"
                    className="mt-1 inline-block text-sm font-medium !text-stone-900 underline decoration-stone-300 underline-offset-4 hover:decoration-stone-900"
                  >
                    Check price
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Phone: stacked cards */}
      <div className="md:hidden space-y-4">
        {items.map(({ row, product }) => (
          <div key={row.productId} className="rounded-2xl ring-1 ring-stone-200 bg-white p-5">
            <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-brand-green !mb-1">
              {row.label}
            </p>
            <p className="font-serif text-xl font-semibold text-stone-950 leading-snug !mb-0">{product.name}</p>
            <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-[15px]">
              {columns.map((c) => (
                <div key={c.key} className="contents">
                  <dt className="text-stone-500">{c.header}</dt>
                  <dd className="text-stone-800">{row.values[c.key]}</dd>
                </div>
              ))}
              <dt className="text-stone-500">Price</dt>
              <dd className="text-stone-800 tabular-nums">{product.priceRange}</dd>
            </dl>
            <a
              href={getProductUrl(product)}
              target="_blank"
              rel="nofollow sponsored noopener noreferrer"
              className="mt-4 inline-flex w-full items-center justify-center rounded-md bg-stone-900 px-4 py-2.5 text-sm font-medium !text-white !no-underline hover:bg-stone-800"
            >
              Check price on Amazon
            </a>
          </div>
        ))}
      </div>

      <p className="mt-3 !mb-0 text-xs leading-relaxed text-stone-500">
        {note ?? 'Prices are approximate and change often on Amazon.'} As an Amazon Associate we earn
        from qualifying purchases.
      </p>
    </div>
  )
}
