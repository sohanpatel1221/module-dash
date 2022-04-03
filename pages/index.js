import Layout from '@/components/Layout';
import Grid from '@/components/Grid';
import { Box } from '@chakra-ui/react';
import SimpleSidebar from 'components/Sidebar.tsx';
import { PrismaClient } from '@prisma/client';
import { getSession } from 'next-auth/react';

//must include export async function getServerSideProps to utilize SSR. Data returned from code within here will be used to pre render pages
// we will have to include logic for fetching data. We can use prisma
export async function getServerSideProps(context) {
	const session = await getSession(context);
	if (!session) {
		return {
			redirect: {
				destination: '/login',
				permanent: false,
			},
		};
	}

	const prisma = new PrismaClient();
	const homes = await prisma.home.findMany();

	return {
		props: {
			// everytime we fetch from PRISMA, we need to serialize result with the following methodds:
			home: JSON.parse(JSON.stringify(homes)),
		},
	};
}

export default function Home(props) {
	return (
		<>
			<SimpleSidebar />
			<Box bg="tomato" w="100%" p={4} color="white">
				This is the Box
			</Box>
		</>
	);
}
