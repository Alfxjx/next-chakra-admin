export interface IErrorProps {
	message: string;
	success: boolean;
}

export interface IResponse<T> {
	data?: T;
	message: string;
	success: boolean;
}
