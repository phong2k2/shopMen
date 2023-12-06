import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import ButtonWrapper from "./ButtonWrapper/ButtonWrapper";

function PayPal({ optionsPayPal, clientId }) {
  const paypalScriptOptions = {
    "client-id": clientId,
    currency: "USD",
  };

  return (
    <>
      <PayPalScriptProvider options={paypalScriptOptions}>
        <ButtonWrapper showSpinner={false} optionsPayPal={optionsPayPal} />
      </PayPalScriptProvider>
    </>
  );
}

export default PayPal;
