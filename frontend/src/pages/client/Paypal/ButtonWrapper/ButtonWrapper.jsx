import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

function ButtonWrapper({ showSpinner, optionsPayPal }) {
  const [{ isPending }] = usePayPalScriptReducer();
  return (
    <>
      {showSpinner && isPending && <div className="spinner" />}
      <PayPalButtons {...optionsPayPal} />
    </>
  );
}

export default ButtonWrapper;
