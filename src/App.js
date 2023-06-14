import React from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "@material-ui/core/styles";
import { theme } from "./utils/theme";
import "./assets/css/style.css";
import Header from "./components/header/index";
import Footer from "./components/footer/index";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainNavigation from "./components/MainNavigation";
import { AuthWrapper } from "./context/auth";
import loader from "../src/assets/images/loader.gif";
import { CartWrapper } from "./context/cart";
import store from "./State/store";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <React.Suspense fallback={<></>}>
      <Provider store={store}>
        <BrowserRouter>
          <AuthWrapper>
            <CartWrapper>
              <div className="loader-wrapper">
                <img src={loader} alt="loader" />
              </div>
              <div className="wrapper">
                <Header />
                <main>
                  <MainNavigation />
                </main>
                <Footer />
              </div>
              <ToastContainer />
            </CartWrapper>
          </AuthWrapper>
        </BrowserRouter>
        </Provider>
      </React.Suspense>
    </ThemeProvider>
  );
};

export default App;
