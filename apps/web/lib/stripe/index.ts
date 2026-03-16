import Stripe from "stripe";
import { StripeMode } from "../types";

let _stripe: Stripe | null = null;

export const stripe = new Proxy({} as Stripe, {
  get(_, prop) {
    if (!_stripe) {
      if (!process.env.STRIPE_SECRET_KEY) {
        throw new Error("STRIPE_SECRET_KEY is not set");
      }
      _stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: "2025-05-28.basil",
        appInfo: {
          name: "Dub.co",
          version: "0.1.0",
        },
      });
    }
    return (_stripe as any)[prop];
  },
});

const secretMap: Record<StripeMode, string | undefined> = {
  live: process.env.STRIPE_APP_SECRET_KEY,
  test: process.env.STRIPE_APP_SECRET_KEY_TEST,
  sandbox: process.env.STRIPE_APP_SECRET_KEY_SANDBOX,
};

// Stripe Integration App client (lazy – only initializes when a property is accessed)
export const stripeAppClient = ({ mode }: { mode?: StripeMode }): Stripe => {
  let instance: Stripe | null = null;
  return new Proxy({} as Stripe, {
    get(_, prop) {
      if (!instance) {
        const appSecretKey = secretMap[mode ?? "test"];
        if (!appSecretKey) {
          throw new Error(`Stripe app secret key not set for mode: ${mode ?? "test"}`);
        }
        instance = new Stripe(appSecretKey, {
          apiVersion: "2025-05-28.basil",
          appInfo: {
            name: "Dub.co",
            version: "0.1.0",
          },
        });
      }
      return (instance as any)[prop];
    },
  });
};
