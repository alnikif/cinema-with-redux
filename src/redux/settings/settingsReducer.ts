import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {DEFAULT_THEME, Themes} from "../../constants/theme";
import {DEFAULT_VIEW, PageViews} from "../../Providers/ViewProvider";
import {DEFAULT_PAGINATION, PaginationTypes} from "../../Providers/PaginationProvider";
import {SettingsSliceType} from "./settingsTypes";


const initialState: SettingsSliceType = {
    theme: DEFAULT_THEME,
    view: DEFAULT_VIEW,
    pagination: DEFAULT_PAGINATION

}

const settingsSlice = createSlice({
    name: 'settings',
    initialState: initialState,
    reducers: {
        setTheme: (state, action: PayloadAction<Themes>) => {
            state.theme = action.payload
        },
        setView: (state, action: PayloadAction<PageViews>) => {
            state.view = action.payload
        },
        setPagination: (state , action: PayloadAction<PaginationTypes>) => {
            state.pagination = action.payload
        }
    }

})
// now available:
export const {
    setTheme,
    setView,
    setPagination

} = settingsSlice.actions;

export default settingsSlice.reducer;