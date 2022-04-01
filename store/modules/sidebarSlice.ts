import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ISides {
	isExpand: boolean;
}

export interface SidebarState extends Partial<ISides> {}

const initialState: SidebarState = {
	isExpand: true,
};

export const sidebarSlice = createSlice({
	name: "sidebar",
	initialState,
	reducers: {
		// expand the sidebar state
		getExpand: (state, { payload }: PayloadAction<SidebarState>) => {
			Object.assign(state, payload);
		},
		// active page route link
		getActiveLink: (state, { payload }: PayloadAction<SidebarState>) => {
			Object.assign(state, payload);
		},
	},
});

export const { getExpand, getActiveLink } = sidebarSlice.actions;

export default sidebarSlice.reducer;
