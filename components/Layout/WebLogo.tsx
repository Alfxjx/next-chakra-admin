import Image from "next/image";
import NextLink from "next/link";
import { HStack, Text } from "@chakra-ui/react";

export function WebLogo() {
	return (
		<NextLink href={"/home"} passHref>
			<HStack cursor={"pointer"} ml={2} my={1}>
				<Image src="/favicon.ico" width={24} height={24} alt="logo"></Image>
				<Text
					bgGradient="linear(to-l, #7928CA, #FF0080)"
					bgClip="text"
					fontWeight="extrabold"
					fontSize="md"
				>
					NextChakraAdmin
				</Text>
			</HStack>
		</NextLink>
	);
}
