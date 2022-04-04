import Layout from '@/components/Layout';
import Grid from '@/components/Grid';
import { Box } from '@chakra-ui/react';
import SimpleSidebar from 'components/Sidebar.tsx';
import { PrismaClient } from '@prisma/client';
import { getSession } from 'next-auth/react';
import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider } from '@chakra-ui/react';
import customthemes from '../customTheme.js';
import {
	HashRouter,
	Route,
	Switch,
	Redirect,
	BrowserRouter,
} from 'react-router-dom';

import Sidebar from 'components/Sidebar/Sidebar.js';
import appRoutes from 'routes.js';
import AdminNavbar from '@/components/Navbars/AdminNavbar';
//import logo from 'assets/img/reactlogo.png';

import AuthLayout from '/src/layouts/Auth.js';
import AdminLayout from '/src/layouts/Admin.js';
import NoSSR from 'react-no-ssr';
import Dashboard from 'views/Dashboard/Dashboard';

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
		<ChakraProvider>
			<NoSSR>
				<BrowserRouter>
					<AdminLayout />
				</BrowserRouter>
			</NoSSR>
		</ChakraProvider>
	);
}
