import { ThemeProvider } from "@material-ui/core/styles";
import Head from "next/head";
import theme from "styles/theme";
import "../styles/index.css";
import { RecoilRoot } from "recoil";

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <>
      <Head>
        <title>My page</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <RecoilRoot>
        <ThemeProvider theme={theme}>
          {getLayout(<Component {...pageProps} />)}
        </ThemeProvider>
      </RecoilRoot>
    </>
  );
}

export default MyApp;
