import { listProducts } from "@lib/data/products";
import ProductPreview from "@modules/products/components/product-preview"

export default async function ProduktSection({
  children, bannerSrc
} : {
  bannerSrc: string,
  children: React.ReactNode
}) {
  let {
    response: { products }
  } = await listProducts({
    regionId: process.env.NEXT_PUBLIC_REGION_ID
  });

  return (
    <div className="flex flex-col gap-y-5 p-5 sm:px-36 bg-grey-10">
      <div className="h-[33vh] relative">
        <img src={bannerSrc} className="h-full w-full rounded-lg object-cover" />
        <div className="absolute text-5xl sm:text-8xl leading-none inset-0 uppercase font-title text-white p-5">
          {children}
        </div>
      </div>

      <ul
        className="grid grid-cols-2 w-full small:grid-cols-3 medium:grid-cols-4 gap-x-6 gap-y-8"
        data-testid="products-list"
      >
        {products.map((p) => {
          return (
            <li key={p.id}>
              <ProductPreview product={p} />
            </li>
          )
        })}
      </ul>
    </div>
  )
}