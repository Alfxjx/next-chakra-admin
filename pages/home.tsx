import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@chakra-ui/react";
import { Layout } from "../components/Layout";

export default function Home() {
	const { data: session } = useSession();

	return (
		<Layout>
			<div>this is homepage</div>
		</Layout>
	);
}
