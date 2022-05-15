import { IResponse } from "@/types/base";

import { NextApiHandler } from "next";

interface ITask {
	type: "done" | "undo";
	message: string;
}

interface IUser {
	id: number;
	username: string;
	avatar: string;
}

interface IList extends IUser {
	users: IUser[];
	createTime: string;
	updateTime: string;
	title: string;
	content: string;
	description: string;
	tags: string[];
	category: "private" | "public" | "protected";
	picture: string;
	price: number;
	quantity: number;
	target: number;
	distribution: number[];
	tasks: ITask[];
}

interface IRequest {
	size: number;
	type: "user" | "users" | "table" | "kanban" | "pie" | "line" | "articles";
}

const handler: NextApiHandler<IResponse<IList[]>> = (req, res) => {
	const query = req.query;
	res.status(200).json({
		success: true,
		message: "success",
		data: [],
	});
};

export default handler;
