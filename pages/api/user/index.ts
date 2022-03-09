import { IResponse } from "@/types/base";
import { LoginRes } from "@/types/DTO/user";
import type { NextApiHandler } from "next";

const loginApi: NextApiHandler<IResponse<LoginRes>> = (req, res) => {
	switch (req.method) {
		case "GET":
			res.status(200).json({
				success: true,
				message: "success",
				data: {
					username: "admin",
					role: "admin",
				},
			});
			break;

		case "POST":
			const { username, password } = req.body;
			if (username === "admin" && password === "123456") {
				res.status(200).json({
					success: true,
					message: "success",
					data: {
						username: "admin",
						role: "admin",
					},
				});
			} else {
				// TODO use express i18n
				res.status(400).json({
					success: false,
					message: "wrong login params",
				});
			}
			break;
	}
};

export default loginApi;
