import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { ErrorBoundary } from "components/errorBoundary";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ErrorBoundary>
        <Component {...pageProps} />
      </ErrorBoundary>
    </RecoilRoot>
  );
}

export default MyApp;
