import { Center, Spinner, VStack, Text } from "@chakra-ui/react";

export function PersistLoading() {
	return (
		<Center w="full" h="100vh">
			<VStack>
				<Spinner
					thickness="4px"
					speed="0.65s"
					emptyColor="gray.200"
					color="blue.400"
					size="xl"
				></Spinner>
				<Text>Loading Persist States...</Text>
			</VStack>
		</Center>
	);
}
