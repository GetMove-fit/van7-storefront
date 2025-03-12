export default function legalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="legal-page bg-grey-10 sm:px-10 lg:px-20 xl:px-36">
      <div className="flex flex-col gap-y-5 bg-white p-5 sm:px-10 lg:px-20 lg:py-10 xl:px-40 xl:py-20">
        {children}
      </div>
    </div>
  );
}
