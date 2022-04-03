import '../styles/globals.css';
import { Toaster } from 'react-hot-toast';
import { SessionProvider as AuthProvider } from 'next-auth/react';
import { ChakraProvider } from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react';

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
	brand: {
		900: '#1a365d',
		800: '#153e75',
		700: '#2a69ac',
	},
};

const theme = extendTheme({ colors });

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
	// Setting the session prop allows session state to be shared between pages
	return (
		<>
			<ChakraProvider theme={theme}>
				<AuthProvider session={session}>
					<Component {...pageProps} />
				</AuthProvider>
			</ChakraProvider>
			<Toaster />
		</>
	);
}

export default MyApp;
