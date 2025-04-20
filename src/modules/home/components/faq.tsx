import * as Accordion from "@radix-ui/react-accordion";
import { getTranslations } from "next-intl/server";

const FAQ = async () => {
  const count = 10;
  const t = await getTranslations("home.faq");

  return (
    <div className="flex flex-col gap-y-5 bg-grey-5 px-5 py-10 sm:gap-y-10 sm:px-10 sm:py-20 lg:px-12 2xl:px-24 xlarge:px-40">
      <h2 className="font-title text-4xl text-grey-90 sm:text-6xl">
        {t("title")}
      </h2>

      <Accordion.Root
        type="multiple"
        className="grid grid-cols-1 gap-x-8 gap-y-2.5 md:grid-cols-2"
      >
        {Array.from({ length: 2 }).map((_, colIndex) => (
          <div key={colIndex} className="flex flex-col gap-y-2.5">
            {Array.from({
              length:
                colIndex === 0 ? Math.ceil(count / 2) : Math.floor(count / 2),
            }).map((_, index) => {
              const itemIndex =
                colIndex === 0 ? index : index + Math.ceil(count / 2);
              return (
                <Accordion.Item key={itemIndex} value={`item-${itemIndex}`}>
                  <Accordion.Header>
                    <Accordion.Trigger className="text-gray-90 group flex w-full items-center gap-x-2.5 border-b border-brand-light py-4 text-start text-lg sm:px-5 sm:text-xl">
                      <svg
                        className="h-3 w-3 fill-grey-90 transition-transform duration-300 ease-in-out group-data-[state=open]:rotate-90"
                        width="12"
                        height="14"
                        viewBox="0 0 12 14"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M12 7L3.01142e-07 13.9282L9.06825e-07 0.0717964L12 7Z" />
                      </svg>
                      {t(`questions.${itemIndex + 1}.question`)}
                    </Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Content className="py-4 text-lg text-grey-90 sm:px-5 sm:text-xl">
                    <p>{t(`questions.${itemIndex + 1}.answer`)}</p>
                  </Accordion.Content>
                </Accordion.Item>
              );
            })}
          </div>
        ))}
      </Accordion.Root>
    </div>
  );
};

export default FAQ;
