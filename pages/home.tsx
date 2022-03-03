import { useSession, signIn, signOut } from "next-auth/react";
import { Box, Button } from "@chakra-ui/react";
import { Layout } from "../components/Layout";

export default function Home() {
	const { data: session } = useSession();

	return (
		<Layout>
			<Box>this is homepage</Box>
		</Layout>
	);
}
