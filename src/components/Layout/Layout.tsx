import React, { useContext } from 'react';

import { Header } from './Header/Header';
import Dropdown from '../Dropdown/Dropdown';
import { ThemeContext } from '../../Providers/ThemeProvider';
import { themes } from '../../constants/theme';
import styles from './Layout.module.scss';
import { ViewContext, views } from '../../Providers/ViewProvider';

export enum NavItems {
  homePage = 'Home Page',
  harryPotter = 'Harry Potter',
  rickAndMorty = 'Rick and Morty',
  theStarWars = 'The Star Wars'
}

export type NavItemType = {
  label: NavItems;
  url: string;
};

export const navItemsConfig = [
  { label: NavItems.homePage, url: '/' },
  { label: NavItems.harryPotter, url: '/harry-potter' },
  { label: NavItems.rickAndMorty, url: '/rick-and-morty' },
  { label: NavItems.theStarWars, url: '/star-wars' }
];

export const Layout = () => {
  const themesOptions = themes.map(({ key, title }) => ({
    id: key,
    label: title
  }));

  const { theme, setTheme: onChangeTheme } = useContext(ThemeContext);

  return (
    <div className={styles.layoutWrapper}>
      <div className={styles.headerWrapper}>
        <Header navItemsConfig={navItemsConfig} />
      </div>
      <div className={styles.dropdownThemeWrapper}>
        <Dropdown selectedOptionId={theme} options={themesOptions} onSelect={onChangeTheme} />
      </div>
    </div>
  );
};
