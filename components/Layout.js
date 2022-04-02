import { Fragment, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import PropTypes from 'prop-types';
import AuthModal from './AuthModal';
import NavbarHeader from './NavbarHeader';
import { Menu, Transition } from '@headlessui/react';
import {
	HeartIcon,
	HomeIcon,
	LogoutIcon,
	PlusIcon,
	SparklesIcon,
	UserIcon,
} from '@heroicons/react/outline';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { useSession, signOut } from 'next-auth/react';

const menuItems = [
	{
		label: 'List a new home',
		icon: PlusIcon,
		href: '/list',
	},
	{
		label: 'My homes',
		icon: HomeIcon,
		href: '/homes',
	},
	{
		label: 'Favorites',
		icon: HeartIcon,
		href: '/favorites',
	},
	{
		label: 'Logout',
		icon: LogoutIcon,
		onClick: signOut,
	},
];

const Layout = ({ children = null, navbar = true }) => {
	const router = useRouter();

	const [showModal, setShowModal] = useState(false);

	// const [showNav, setShowNav] = useState(false);

	const { data: session, status } = useSession();
	const user = session?.user;
	const isLoadingUser = status === 'loading';

	const openModal = () => setShowModal(true);
	const closeModal = () => setShowModal(false);

	return (
		<>
			<Head>
				<title>Module</title>
				<meta
					name="title"
					content="Learn how to Build a Fullstack App with Next.js, PlanetScale & Prisma | The Modern Dev"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<div className="min-h-screen flex flex-col">
				{navbar ? <NavbarHeader openModal={openModal} /> : null}

				<main className="flex-grow container mx-auto">
					<div className="px-4 py-12">
						{typeof children === 'function' ? children(openModal) : children}
					</div>
				</main>

				<AuthModal show={showModal} onClose={closeModal} />
			</div>
		</>
	);
};

Layout.propTypes = {
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
};

export default Layout;
