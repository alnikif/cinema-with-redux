import React from 'react';

import { Header } from './Header/Header';
import Dropdown from '../Dropdown/Dropdown';
import { Themes, themes } from '../../constants/theme';
import styles from './Layout.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { selectTheme } from '../../redux/settings/settingsSelectors';
import { setTheme } from '../../redux/settings/settingsReducer';

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

  const theme = useSelector(selectTheme);
  const dispatch = useDispatch();
  const changeTheme = (selectedTheme: Themes) => {
    dispatch(setTheme(selectedTheme));
  };

  return (
    <div className={styles.layoutWrapper}>
      <div className={styles.headerWrapper}>
        <Header navItemsConfig={navItemsConfig} />
      </div>
      <div className={styles.dropdownThemeWrapper}>
        <Dropdown selectedOptionId={theme} options={themesOptions} onSelect={changeTheme} />
      </div>
    </div>
  );
};
