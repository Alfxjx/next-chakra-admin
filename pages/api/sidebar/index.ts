import { NextApiRequest, NextApiResponse } from "next";
import { IMenu } from "../../../components/Layout";

const enLayout: IMenu[] = [
	{
		title: "test1",
		children: [
			{
				title: "sub1-test1",
				links: "/dashboard/test",
			},
			{
				title: "sub2-test1",
				links: "#",
			},
		],
	},
	{
		title: "test2",
		children: [
			{
				title: "sub1-test2",
				links: "#",
			},
			{
				title: "sub2-test2",
				links: "#",
			},
		],
	},
];

const zhLayout: IMenu[] = [
	{
		title: "test1",
		children: [
			{
				title: "sub1-test1",
				links: "/dashboard/test",
			},
			{
				title: "sub2-test1",
				links: "#",
			},
		],
	},
	{
		title: "test2",
		children: [
			{
				title: "sub1-test2",
				links: "#",
			},
			{
				title: "sub2-test2",
				links: "#",
			},
		],
	},
];

export default function handler(
	{ query: { locale } }: NextApiRequest,
	res: NextApiResponse
) {
	try {
		if (!["zh", "en"].includes(locale as string)) {
			throw new Error("unknown locale");
		}
		let data;
		if (locale === "zh") {
			data = zhLayout;
		} else {
			data = enLayout;
		}
		res.status(200).json({
			code: 0,
			msg: "OK",
			data,
		});
	} catch (error: any) {
		res.status(400).json({ code: 400, message: error.message });
	}
}
