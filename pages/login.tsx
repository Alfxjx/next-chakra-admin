import { useState } from "react";
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
	InputRightElement,
	InputGroup,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { MdLockOutline, MdLockOpen } from "react-icons/md";
import { useAppDispatch } from "@/store/hooks";
import { getUserInfo } from "@/store/modules/userSlice";
import { WebLogo } from "../components/Layout/WebLogo";
import { loginApi } from "@/requests";

export default function Login() {
	return (
		<Center w="full" h="100vh" bg="gray.100">
			<VStack borderRadius={8} boxShadow={"base"} py={8} px={12} bg="#fff">
				<WebLogo></WebLogo>
				<LoginForm />
				<Text bgClip="text" bgGradient={"linear(to-r, green, red)"}>
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
	const dispatch = useAppDispatch();

	const [show, setShow] = useState(false);
	const hanlePasswordShow = () => setShow(!show);

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
				const { username, password } = values;
				loginApi({ username, password })
					.then((res) => {
						dispatch(getUserInfo({ username, password }));
						setTimeout(() => {
							actions.setSubmitting(false);
							router.push("/home");
						}, 1000);
					})
					.catch(() => {
						setTimeout(() => {
							actions.setSubmitting(false);
						}, 1000);
					});
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
								<Input {...field} id="username" placeholder="username" />
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
								<InputGroup size="md">
									<Input
										type={show ? "text" : "password"}
										{...field}
										id="password"
										placeholder="password"
									/>
									<InputRightElement width="4.5rem">
										<Button
											variant={"ghost"}
											h="2rem"
											size="md"
											rounded={"full"}
											onClick={hanlePasswordShow}
										>
											{show ? <MdLockOpen /> : <MdLockOutline />}
										</Button>
									</InputRightElement>
								</InputGroup>
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
