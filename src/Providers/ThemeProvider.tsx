import React, {FC, ReactNode, useMemo, useEffect} from 'react';
import {themesTokensConstants} from "../constants/theme";
import {changeThemesConstants} from "../utils/theme-utils";
import {useSelector} from "react-redux";
import {selectTheme} from "../redux/settings/settingsSelectors";

const ThemeProvider: FC<ProvidersType> = (props) => {
    const { children } = props;

    const theme = useSelector(selectTheme)

    // const [theme, setTheme] = useState<Themes>(defaultThemeContext.theme);

    const themeTokens = useMemo(() => (
        themesTokensConstants[theme]
    ), [theme]);

    useEffect(() => {
        changeThemesConstants(themeTokens)
    }, [themeTokens]);

    return(
        <>
            {children}
        </>
    )
};

type ProvidersType = {
    readonly children: ReactNode;
};

export default ThemeProvider;
