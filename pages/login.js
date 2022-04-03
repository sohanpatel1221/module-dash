import Layout from '@/components/Layout';
import AuthModal from '@/components/AuthModal';

export default function LoginForm() {
	return (
		<Layout navbar={false}>
			<AuthModal show={true} />
		</Layout>
	);
}
