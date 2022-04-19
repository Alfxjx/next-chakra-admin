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
	Flex,
} from "@chakra-ui/react";
import style from "./Layout.module.css";
import { WebLogo } from "./WebLogo";
import { NCAFooter } from "./NCAFooter";
import {
	MdTranslate,
	MdLogout,
	MdAnchor,
	MdCommute,
	MdReorder,
} from "react-icons/md";

import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { useState } from "react";
import { getExpand } from "@/store/modules/sidebarSlice";

interface ILayoutProps {
	children: ReactNode;
}

export interface IMenu {
	title: string;
	icon?: React.ReactChild;
	links?: string;
	children?: IMenu[];
}

interface IAccordList {
	menuList: IMenu[];
	isExpand: boolean;
	handleExpand: () => void;
}

function AccordList({ menuList, isExpand, handleExpand }: IAccordList) {
	const dispatch = useAppDispatch();

	const handleClick = () => {
		dispatch(getExpand({ isExpand: !isExpand }));
		handleExpand();
	};
	return (
		<VStack
			h={"90vh"}
			align={isExpand ? "flex-start" : "flex-end"}
			className={style.accord}
		>
			{isExpand && (
				<Accordion w={"full"} flex={"1"} my={2} allowMultiple>
					{menuList.map((menu) => {
						return (
							<AccordionItem border={"none"} key={menu.title}>
								<h2>
									<AccordionButton>
										<NextLink href={menu.links as string} passHref>
											<HStack
												flex="1"
												textAlign={isExpand ? "left" : "center"}
												justify={isExpand ? "flex-start" : "center"}
											>
												{menu.icon}
												{isExpand && <span>{menu.title}</span>}
											</HStack>
										</NextLink>
										{isExpand && <AccordionIcon />}
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
			)}
			<HStack
				flex={isExpand ? 0 : 1}
				w={"full"}
				pb={4}
				justify={"flex-start"}
				align={"flex-end"}
			>
				<Button
					variant={"link"}
					_focus={{ boxShadow: "none" }}
					onClick={handleClick}
				>
					<MdReorder />
				</Button>
			</HStack>
		</VStack>
	);
}

export function Layout({ children }: ILayoutProps) {
	const router: NextRouter = useRouter();
	const username = useAppSelector((state) => state.user.username);

	const isExpandState = useAppSelector(
		(state) => state.sidebar.isExpand
	) as boolean;

	const [sidebarWidth, setWidth] = useState(isExpandState ? 4 : 1);

	// TODO add axios for api routes, meeting GET /api/sidebar?locale=zh/en
	// TODO Active Links
	// TODO Dynamic BreadCrumbs
	// const [menuList, setMenuList] = useState<IMenu[]>([]);

	const menuList: IMenu[] = [
		{
			title: "Dashboard",
			links: "/home",
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
			links: "/management",
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

	const handleExpand = () => {
		sidebarWidth === 4 ? setWidth(1) : setWidth(4);
	};

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
			{/* header */}
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
				{/* side bar */}
				<GridItem
					overflow={"scroll"}
					colSpan={sidebarWidth}
					bg="#001529"
					color="#fff"
				>
					<AccordList
						menuList={menuList}
						isExpand={isExpandState}
						handleExpand={handleExpand}
					></AccordList>
				</GridItem>
				{/* main content */}
				<GridItem overflow={"scroll"} colSpan={24 - sidebarWidth} bg="gray.100">
					<VStack w="full" minH={"100vh"} px="4" pb="20" align="stretch">
						<Box flex={0} ml={2} mt={2}>
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
						</Box>
						<Box flex={1}>{children}</Box>
						<Box flex={0}>
							<NCAFooter />
						</Box>
					</VStack>
				</GridItem>
			</Grid>
		</div>
	);
}
