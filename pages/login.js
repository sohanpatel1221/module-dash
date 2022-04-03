import Layout from '@/components/Layout';
import AuthModal from '@/components/AuthModal';
import { getSession } from 'next-auth/react';

// if user is logged in, we will redirect them to / if they navigate to /login
export async function getServerSideProps(context) {
	const session = await getSession(context);
	if (session) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	}
	return {
		props: {},
	};
}

export default function LoginForm() {
	return (
		<Layout navbar={false}>
			<AuthModal show={true} />
		</Layout>
	);
}
