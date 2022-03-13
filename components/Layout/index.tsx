import React, { ReactNode } from "react";
import Head from "next/head";
import { NextRouter, useRouter } from "next/router";
import NextLink from "next/link";
import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Box,
	Button,
	Grid,
	GridItem,
	HStack,
	Link,
	VStack,
	Text,
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
} from "@chakra-ui/react";
import style from "./Layout.module.css";
import { WebLogo } from "./WebLogo";
import { MdTranslate, MdLogout, MdAnchor, MdCommute } from "react-icons/md";
import { useAppSelector } from "@/store/hooks";
import { useState } from "react";

interface ILayoutProps {
	children: ReactNode;
}

export interface IMenu {
	title: string;
	icon?: React.ReactChild;
	links?: string;
	children?: IMenu[];
}

function AccordList({ menuList }: { menuList: IMenu[] }) {
	return (
		<Accordion my={2} allowMultiple>
			{menuList.map((menu) => {
				return (
					<AccordionItem border={"none"} key={menu.title}>
						<h2>
							<AccordionButton>
								<HStack flex="1" textAlign="left">
									{menu.icon}
									<span>{menu.title}</span>
								</HStack>
								<AccordionIcon />
							</AccordionButton>
						</h2>
						<AccordionPanel pb={4}>
							<VStack ml={8} alignItems={"flex-start"}>
								{menu.children?.map((item) => {
									return (
										<NextLink
											key={item.title}
											href={item.links as string}
											passHref
										>
											<Link>{item.title}</Link>
										</NextLink>
									);
								})}
							</VStack>
						</AccordionPanel>
					</AccordionItem>
				);
			})}
		</Accordion>
	);
}

export function Layout({ children }: ILayoutProps) {
	const router: NextRouter = useRouter();
	const username = useAppSelector((state) => state.user.username);

	// TODO add axios for api routes, meeting GET /api/sidebar?locale=zh/en
	// const [menuList, setMenuList] = useState<IMenu[]>([]);

	const menuList: IMenu[] = [
		{
			title: "Dashboard",
			icon: <MdAnchor></MdAnchor>,
			children: [
				{
					title: "Home",
					links: "/dashboard/home-one",
				},
				{
					title: "Substitution",
					links: "/dashboard/home-another",
				},
			],
		},
		{
			title: "Management",
			icon: <MdCommute></MdCommute>,
			children: [
				{
					title: "User Management",
					links: "/management/user-management",
				},
				{
					title: "Product Management",
					links: "/management/product-management",
				},
			],
		},
	];

	const switchI18n = () => {
		const { pathname, asPath, query } = router;
		if (router.locale === "zh") {
			router.push({ pathname, query }, asPath, { locale: "en" });
		} else {
			router.push({ pathname, query }, asPath, { locale: "zh" });
		}
	};

	const signOut = () => {
		router.push("/login");
	};

	return (
		<div className={style.layout}>
			<Head>
				<title>Next Chakra Admin</title>
			</Head>
			<HStack py={2} px={4} justifyContent={"space-between"}>
				<HStack justifyContent={"space-between"}>
					<WebLogo></WebLogo>
				</HStack>
				<HStack justifyContent={"flex-end"}>
					<span>Hello, {username}</span>
					<Button variant={"ghost"} onClick={switchI18n}>
						<MdTranslate></MdTranslate>
					</Button>
					<Button variant={"outline"} onClick={() => signOut()}>
						<MdLogout></MdLogout>
					</Button>
				</HStack>
			</HStack>
			<Grid h={"full"} templateColumns="repeat(24, 1fr)" gap={0}>
				<GridItem overflow={"scroll"} colSpan={4} bg="#001529" color="#fff">
					<AccordList menuList={menuList}></AccordList>
				</GridItem>
				<GridItem overflow={"scroll"} colSpan={20} bg="gray.100">
					<Box h="full" ml={2} mt={2}>
						<Breadcrumb pl={2} pt={2} boxSizing="border-box">
							<BreadcrumbItem>
								<BreadcrumbLink href="#">Home</BreadcrumbLink>
							</BreadcrumbItem>

							<BreadcrumbItem>
								<BreadcrumbLink href="#">Docs</BreadcrumbLink>
							</BreadcrumbItem>

							<BreadcrumbItem isCurrentPage>
								<BreadcrumbLink href="#">Breadcrumb</BreadcrumbLink>
							</BreadcrumbItem>
						</Breadcrumb>
						{children}
					</Box>
				</GridItem>
			</Grid>
		</div>
	);
}
