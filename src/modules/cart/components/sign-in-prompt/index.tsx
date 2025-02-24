import { Button, Heading, Text } from "@medusajs/ui";
import LocalizedClientLink from "@modules/common/components/localized-client-link";

const SignInPrompt = () => {
  return (
    <div className="flex items-center justify-between bg-white">
      <div>
        <Heading level="h2" className="txt-xlarge">
          Möchtest du mit Banküberweisung zahlen?
        </Heading>
        <Text className="txt-medium mt-2 text-ui-fg-subtle">
          Erstelle ein Konto
        </Text>
      </div>
      <div>
        <LocalizedClientLink href="/account">
          <Button
            variant="secondary"
            className="h-10"
            data-testid="sign-in-button"
          >
            Anmelden
          </Button>
        </LocalizedClientLink>
      </div>
    </div>
  );
};

export default SignInPrompt;
