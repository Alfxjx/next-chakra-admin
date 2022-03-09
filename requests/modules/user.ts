import { enumType } from "@/types/constants";
import { LoginDTO } from "@/types/DTO/user";
import { HttpFactory } from "../config";

export function loginApi(data: LoginDTO) {
	return HttpFactory.getHttp(enumType.MOCK).post("/api/user", data);
}
