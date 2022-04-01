import { Box } from "@chakra-ui/react";
import React from "react";

export function NCAFooter() {
	return (
		<Box textAlign={"center"} color={"gray.400"}>
			NextChakraAdmin, powered by Vercel, Next.js, chakra-ui. 2021~
			{new Date().getFullYear()}
		</Box>
	);
}
