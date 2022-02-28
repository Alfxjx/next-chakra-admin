import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Button } from "@chakra-ui/react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect } from "react";

const Home: NextPage = () => {
	const { data: session } = useSession();
	const router = useRouter();
	useEffect(() => {
		if (session) {
			router.push("/home");
		}
	}, [session, router]);

	return (
		<>
			Not signed in <br />
			<Button onClick={() => signIn()}>Sign in</Button>
		</>
	);
};

export default Home;
