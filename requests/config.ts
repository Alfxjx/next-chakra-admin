import axios, {
	AxiosResponse,
	AxiosRequestConfig,
	AxiosError,
	AxiosInstance,
} from "axios";

import { createStandaloneToast } from "@chakra-ui/react";

import { IErrorProps, IResponse } from "@/types/base/index";
import { enumType } from "@/types/constants";

const toast = createStandaloneToast();

const noAuthRoutes = ["/user/login/"];

const isNoAuth: (path: string, routes?: string[]) => boolean = (
	path,
	routes = noAuthRoutes
) => {
	return routes.includes(path);
};

axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.withCredentials = true;

// 基本的axios实例
const axiosBase = axios.create({
	baseURL:
		process.env.NODE_ENV === "development"
			? process.env.NEXT_PUBLIC_BASE_URL
			: process.env.NEXT_PUBLIC_API,
});

axiosBase.interceptors.request.use((config: AxiosRequestConfig) => {
	const token = sessionStorage.getItem("token");
	if (token && config.headers) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

axiosBase.interceptors.response.use(
	(res: AxiosResponse<IResponse<any>>) => {
		if (!res) {
			return false;
		}
		if (!res.data.success) {
			toast({
				title: res.data.message,
				status: "error",
			});
		}
		return res;
	},
	(err: AxiosError<{ message: string; success: boolean }>) =>
		Promise.reject(err)
);

const axiosMock = axios.create({});

axiosMock.interceptors.response.use(
	(res) => {
		return res;
	},
	(err: AxiosError<{ message: string; success: boolean }>) =>
		Promise.reject(err)
);

function httpGenerator(axiosInstance: AxiosInstance) {
	return {
		get<T>(
			url: string,
			config?: AxiosRequestConfig
		): Promise<AxiosResponse<IResponse<T>>> {
			return new Promise((resolve, reject) => {
				axiosInstance
					.get(url, config)
					.then((res: AxiosResponse<IResponse<T>>) => {
						console.log(res);
						resolve(res);
					})
					.catch((err: AxiosError<IErrorProps>) => {
						toast({
							title: `${err.response?.status}: ${
								err.response?.statusText as string
							}`,
							status: "error",
						});
						// handle unlogin state
						if (
							err.response?.status === 401 &&
							isNoAuth(window.location.pathname)
						) {
							setTimeout(() => {
								window.location.href = "/person/login";
							}, 1000);
						}
						return reject(err);
					});
			});
		},
		post<T>(
			url: string,
			data: any,
			config?: AxiosRequestConfig
		): Promise<AxiosResponse<IResponse<T>>> {
			return new Promise((resolve, reject) => {
				axiosInstance
					.post(url, data, config)
					.then((res: AxiosResponse<IResponse<T>>) => resolve(res))
					.catch((err: AxiosError<IErrorProps>) => {
						toast({
							title: err.response?.data.message as string,
							status: "error",
						});
						if (
							err.response?.status === 401 &&
							isNoAuth(window.location.pathname)
						) {
							setTimeout(() => {
								window.location.href = "/user/login";
							}, 1000);
						}
						return reject(err);
					});
			});
		},
		put<T>(
			url: string,
			data: any,
			config?: AxiosRequestConfig
		): Promise<AxiosResponse<IResponse<T>>> {
			return new Promise((resolve, reject) => {
				axiosInstance
					.put(url, data, config)
					.then((res: AxiosResponse<IResponse<T>>) => resolve(res))
					.catch((err: AxiosError<IErrorProps>) => {
						toast({
							title: err.response?.data.message as string,
							status: "error",
						});
						if (
							err.response?.status === 401 &&
							isNoAuth(window.location.pathname)
						) {
							setTimeout(() => {
								window.location.href = "/user/login";
							}, 1000);
						}
						return reject(err);
					});
			});
		},
	};
}

const http = httpGenerator(axiosBase);

const httpMock = httpGenerator(axiosMock);

export class HttpFactory {
	public static getHttp(type: enumType) {
		switch (type) {
			case enumType.BASE:
				return http;
			case enumType.MOCK:
				return httpMock;
			default:
				return http;
		}
	}
}

export { axiosBase, http, httpMock };
