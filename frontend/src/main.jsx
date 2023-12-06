import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { QueryClient, QueryClientProvider } from "react-query";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/store.js";
import GlobalStyle from "@/components/GlobalStyles";
import { DeliveryInfoProvider } from "./hook/useContext.jsx";
import CssBaseline from "@mui/material/CssBaseline";
import "react-toastify/dist/ReactToastify.css";
import theme from "./theme";

// Use React-query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <GlobalStyle>
        <DeliveryInfoProvider>
          <QueryClientProvider client={queryClient}>
            <CssVarsProvider theme={theme}>
              <CssBaseline />
              <App />
            </CssVarsProvider>
            <ToastContainer />
          </QueryClientProvider>
        </DeliveryInfoProvider>
      </GlobalStyle>
    </PersistGate>
  </Provider>
);
