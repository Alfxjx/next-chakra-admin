import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import {
	Button,
	Center,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	VStack,
	Text,
	useToast,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { WebLogo } from "../components/Layout/WebLogo";

export default function Login() {
	return (
		<Center w="full" h="100vh">
			<VStack borderRadius={4} boxShadow={"base"} py={8} px={12}>
				<WebLogo></WebLogo>
				<LoginForm />
				<Text bgClip="text" bgGradient="linear(to-r, green, red)">
					admin 123456
				</Text>
			</VStack>
		</Center>
	);
}

function LoginForm() {
	const router = useRouter();
	const toast = useToast();
	const { t } = useTranslation("common");
	function baseValidate(value: string) {
		let error;
		if (!value) {
			error = "required";
		}
		return error;
	}

	return (
		<Formik
			initialValues={{ username: "", password: "" }}
			onSubmit={(values, actions) => {
				setTimeout(() => {
					actions.setSubmitting(false);
					const { username, password } = values;
					if (username === "admin" && password === "123456") {
						router.push("/home");
					} else {
						toast({
							title: t("login-wrong"),
							status: "error",
							duration: 9000,
							isClosable: true,
						});
					}
				}, 1000);
			}}
		>
			{(props) => (
				<Form>
					<Field name="username" validate={baseValidate}>
						{({ field, form }: { field: any; form: any }) => (
							<FormControl
								isInvalid={form.errors.username && form.touched.username}
							>
								<FormLabel htmlFor="username">Username</FormLabel>
								<Input {...field} id="username" placeholder="admin" />
								<FormErrorMessage>{form.errors.username}</FormErrorMessage>
							</FormControl>
						)}
					</Field>
					<Field name="password" validate={baseValidate}>
						{({ field, form }: { field: any; form: any }) => (
							<FormControl
								isInvalid={form.errors.password && form.touched.password}
							>
								<FormLabel htmlFor="password">Password</FormLabel>
								<Input
									type={"password"}
									{...field}
									id="password"
									placeholder="123456"
								/>
								<FormErrorMessage>{form.errors.password}</FormErrorMessage>
							</FormControl>
						)}
					</Field>
					<Button
						w="full"
						mt={4}
						colorScheme="blue"
						isLoading={props.isSubmitting}
						type="submit"
					>
						Submit
					</Button>
				</Form>
			)}
		</Formik>
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
