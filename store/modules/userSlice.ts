import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { LoginDTO } from "@/types/DTO/user";

export interface UserState extends Partial<LoginDTO> {}

const initialState: UserState = {};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		getUserInfo: (state, { payload }: PayloadAction<UserState>) => {
			Object.assign(state, payload);
		},
	},
});

export const { getUserInfo } = userSlice.actions;

export default userSlice.reducer;
