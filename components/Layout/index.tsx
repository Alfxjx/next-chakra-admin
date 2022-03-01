import { ReactNode } from "react";
import Head from "next/head";
import { useSession, signOut } from "next-auth/react";
import {
	Box,
	Button,
	Container,
	Grid,
	GridItem,
	HStack,
} from "@chakra-ui/react";
import style from "./Layout.module.css";

interface ILayoutProps {
	children: ReactNode;
}

export function Layout({ children }: ILayoutProps) {
	const { data: session } = useSession();

	return (
		<div className={style.layout}>
			<Head>
				<title>Next Chakra Admin</title>
			</Head>
			<Grid h={"full"} templateColumns="repeat(24, 1fr)" gap={2}>
				<GridItem overflow={"scroll"} colSpan={4} bg={"red.100"} />
				<GridItem overflow={"scroll"} colSpan={20}>
					<HStack bg={"red.100"}>
						<span>Signed in as {session?.user?.name}</span>
						<Button onClick={() => signOut()}>Sign out</Button>
					</HStack>
					<Box h="full" bg="blue.100">
						{children}
					</Box>
				</GridItem>
			</Grid>
		</div>
	);
}
