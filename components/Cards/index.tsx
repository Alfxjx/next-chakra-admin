import { Box } from "@chakra-ui/react";
import React from "react";

interface ICard {
	children: React.ReactNode;
}

export function NCACard({ children }: ICard) {
	return (
		<Box
			bg={"white"}
			h="full"
			p={"4"}
			boxSizing={"border-box"}
			borderRadius={8}
		>
			{children}
		</Box>
	);
}
