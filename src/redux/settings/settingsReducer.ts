import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {DEFAULT_THEME, Themes} from "../../constants/theme";

type SettingsSliceType = {
    theme: Themes;
}

const initialState: SettingsSliceType = {
    theme: DEFAULT_THEME,

}

const settingsSlice = createSlice({
    name: 'settings',
    initialState: initialState,
    reducers: {
        setTheme: (state, action: PayloadAction<Themes>) => {
            state.theme = action.payload
        },
    },
})
// now available:
export const {
    setTheme
} = settingsSlice.actions;

export default settingsSlice.reducer;