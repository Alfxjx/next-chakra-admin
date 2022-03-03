import { ReactNode } from "react";
import Head from "next/head";
import Image from "next/image";
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

interface ILayoutProps {
	children: ReactNode;
}

export interface IMenu {
	title: string;
	links?: string;
	children?: IMenu[];
}

function AccordList({ menuList }: { menuList: IMenu[] }) {
	return (
		<Accordion my={2} allowMultiple defaultIndex={[0]}>
			{menuList.map((menu) => {
				return (
					<AccordionItem border={"none"} key={menu.title}>
						<h2>
							<AccordionButton>
								<Box flex="1" textAlign="left">
									{menu.title}
								</Box>
								<AccordionIcon />
							</AccordionButton>
						</h2>
						<AccordionPanel pb={4}>
							<VStack ml={2} alignItems={"flex-start"}>
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

	const menuList: IMenu[] = [
		{
			title: "test1",
			children: [
				{
					title: "sub1-test1",
					links: "/dashboard/test",
				},
				{
					title: "sub2-test1",
					links: "#",
				},
			],
		},
		{
			title: "test2",
			children: [
				{
					title: "sub1-test2",
					links: "#",
				},
				{
					title: "sub2-test2",
					links: "#",
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
					<span>{123}</span>
					<Button onClick={switchI18n}>i18n</Button>
					<Button onClick={() => signOut()}>Sign out</Button>
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
