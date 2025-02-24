"use client";

import { useActionState } from "react";
import Input from "@modules/common/components/input";
import { LOGIN_VIEW } from "@modules/account/templates/login-template";
import ErrorMessage from "@modules/checkout/components/error-message";
import { SubmitButton } from "@modules/checkout/components/submit-button";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import { signup } from "@lib/data/customer";

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void;
};

const Register = ({ setCurrentView }: Props) => {
  const [message, formAction] = useActionState(signup, null);

  return (
    <div
      className="flex max-w-sm flex-col items-center"
      data-testid="register-page"
    >
      <h1 className="text-large-semi mb-6 uppercase">
        Werde Mitglied bei VAN7
      </h1>
      <p className="text-base-regular mb-4 text-center text-ui-fg-base">
        Erstelle ein Konto wenn du mit Banüberweisung zahlen möchtest.
      </p>
      <form className="flex w-full flex-col" action={formAction}>
        <div className="flex w-full flex-col gap-y-2">
          <Input
            label="First name"
            name="first_name"
            required
            autoComplete="given-name"
            data-testid="first-name-input"
          />

          <Input
            label="Last name"
            name="last_name"
            required
            autoComplete="family-name"
            data-testid="last-name-input"
          />

          <Input
            label="Email"
            name="email"
            required
            type="email"
            autoComplete="email"
            data-testid="email-input"
          />

          <Input
            label="Phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            data-testid="phone-input"
          />

          <Input
            label="Password"
            name="password"
            required
            type="password"
            autoComplete="new-password"
            data-testid="password-input"
          />
        </div>
        <ErrorMessage error={message} data-testid="register-error" />

        <span className="text-small-regular mt-6 text-center text-ui-fg-base">
          Wenn du dein Konto erstellt, bist du einvertanden mit der{" "}
          <LocalizedClientLink href="/datenschutz" className="link">
            Datenschutzerklärung
          </LocalizedClientLink>{" "}
          und{" "}
          <LocalizedClientLink href="/agb" className="link">
            AGB
          </LocalizedClientLink>
          .
        </span>
        <SubmitButton className="mt-6 w-full" data-testid="register-button">
          Join
        </SubmitButton>
      </form>
      <span className="text-small-regular mt-6 text-center text-ui-fg-base">
        Schon Mitglied?{" "}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
          className="underline"
        >
          Anmelden
        </button>
        .
      </span>
    </div>
  );
};

export default Register;
