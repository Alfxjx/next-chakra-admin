import { GetStaticProps } from "next";
import { Box, Button } from "@chakra-ui/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { Layout } from "../components/Layout";

export default function Home() {
	const { t } = useTranslation("common");

	return (
		<Layout>
			<Box>{t("home")}</Box>
		</Layout>
	);
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale ?? "", ["common"])),
			// Will be passed to the page component as props
		},
	};
};
