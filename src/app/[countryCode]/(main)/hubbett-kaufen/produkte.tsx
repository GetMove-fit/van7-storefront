import { listProducts } from "@lib/data/products";
import ProductPreview from "@modules/products/components/product-preview";

export default async function ProduktSection({
  children,
  countryCode,
  bannerSrc,
}: {
  bannerSrc: string;
  countryCode: string;
  children: React.ReactNode;
}) {
  let {
    response: { products },
  } = await listProducts({
    countryCode,
    queryParams: {
      collection_id: process.env.NEXT_PUBLIC_HUBBETT_COLLECTION_ID,
    },
  });

  return (
    <div className="flex flex-col gap-y-5 bg-grey-10 p-5 sm:px-10 sm:py-20 lg:px-20 xl:pl-36">
      <div className="relative h-[33vh]">
        <img
          src={bannerSrc}
          className="h-full w-full rounded-lg object-cover"
        />
        <div className="absolute bottom-0 p-5 font-title text-5xl uppercase leading-none text-white sm:inset-0 sm:text-8xl">
          {children}
        </div>
      </div>

      <ul
        className="grid w-full grid-cols-2 gap-x-6 gap-y-8 small:grid-cols-3 medium:grid-cols-4"
        data-testid="products-list"
      >
        {products.map((p) => {
          return (
            <li key={p.id}>
              <ProductPreview product={p} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
