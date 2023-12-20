import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {DEFAULT_THEME, Themes} from "../../constants/theme";
import {DEFAULT_VIEW, PageViews} from "../../Providers/ViewProvider";

type SettingsSliceType = {
    theme: Themes;
    view: PageViews;
}

const initialState: SettingsSliceType = {
    theme: DEFAULT_THEME,
    view: DEFAULT_VIEW

}

const settingsSlice = createSlice({
    name: 'settings',
    initialState: initialState,
    reducers: {
        setTheme: (state, action: PayloadAction<Themes>) => {
            state.theme = action.payload
        },
        setView: (state, action: PayloadAction<PageViews>) =>{
            state.view = action.payload
        }
    },
})
// now available:
export const {
    setTheme,
    setView

} = settingsSlice.actions;

export default settingsSlice.reducer;