import type { AppProps } from "next/app";
import { useMemo, useState } from "react";
import { ThemeProvider } from "styled-components";
import Scaffold from "../components/Scaffold";
import GlobalStyle from "../styles/global";
import { darkTheme, lightTheme } from "../theme/theme";
import InfoModalContext from "../context/infoModal";

function MyApp({ Component, pageProps }: AppProps) {
  const [infoModal, setInfoModal] = useState(false);
  const [theme] = useState("light");

  return (
    <InfoModalContext.Provider value={[infoModal, setInfoModal]}>
      <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
        <GlobalStyle />
        <Scaffold>
          <Component {...pageProps} />
        </Scaffold>
      </ThemeProvider>
    </InfoModalContext.Provider>
  );
}

export default MyApp;
