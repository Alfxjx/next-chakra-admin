import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { appWithTranslation } from "next-i18next";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { PersistLoading } from "@/components/PersistLoading";

import store from "@/store/store";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
	const persistor = persistStore(store);

	return (
		<ChakraProvider>
			<Provider store={store}>
				<PersistGate loading={<PersistLoading />} persistor={persistor}>
					<Component {...pageProps} />
				</PersistGate>
			</Provider>
		</ChakraProvider>
	);
}
export default appWithTranslation(MyApp);
