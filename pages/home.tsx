import React from "react";
import { GetStaticProps } from "next";
import { Box, Button, Grid, GridItem } from "@chakra-ui/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { Layout } from "../components/Layout";
import { NCACard } from "@/components/Cards";

export default function Home() {
	const { t } = useTranslation("common");

	return (
		<Layout>
			<Grid
				className="grid-one"
				templateRows="repeat(3, 1fr)"
				templateColumns="repeat(4, 1fr)"
				my={"4"}
				w="full"
				h={"600px"}
				gap={4}
			>
				<GridItem rowSpan={1} colSpan={1}>
					<NCACard>
						<SalesCountCard />
					</NCACard>
				</GridItem>
				<GridItem rowSpan={1} colSpan={1}>
					<NCACard>
						<ViewCountCard />
					</NCACard>
				</GridItem>
				<GridItem rowSpan={1} colSpan={1}>
					<NCACard>
						<PayCountCard />
					</NCACard>
				</GridItem>
				<GridItem rowSpan={1} colSpan={1}>
					<NCACard>
						<OperatingCard />
					</NCACard>
				</GridItem>
				{/* big charts */}
				<GridItem rowSpan={2} colSpan={4} bg="tomato" />
			</Grid>
			<Grid
				templateRows="repeat(1, 1fr)"
				templateColumns="repeat(4, 1fr)"
				my={"4"}
				w="full"
				h={"500px"}
				gap={4}
			>
				<GridItem rowSpan={1} colSpan={2}>
					<NCACard>{/* sub info */}1</NCACard>
				</GridItem>
				<GridItem rowSpan={1} colSpan={2}>
					<NCACard>{/* sub info */}2</NCACard>
				</GridItem>
			</Grid>
			<Grid
				templateRows="repeat(1, 1fr)"
				templateColumns="repeat(4, 1fr)"
				my={"4"}
				w="full"
				h={"500px"}
				gap={4}
			>
				<GridItem rowSpan={1} colSpan={4}>
					<NCACard>{/* sub info */}only one</NCACard>
				</GridItem>
			</Grid>
		</Layout>
	);
}

const SalesCountCard = () => {
	return <Box>SalesCountCard</Box>;
};

const ViewCountCard = () => {
	return <Box>ViewCountCard</Box>;
};

const PayCountCard = () => {
	return <Box>PayCountCard</Box>;
};

const OperatingCard = () => {
	return <Box>OperatingCard</Box>;
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale ?? "", ["common"])),
			// Will be passed to the page component as props
		},
	};
};
