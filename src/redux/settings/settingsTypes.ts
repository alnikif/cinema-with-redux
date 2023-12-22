import { Themes } from '../../constants/theme';
import { PageViews } from '../../Providers/ViewProvider';
import { PaginationTypes } from '../../Providers/PaginationProvider';

export type SettingsSliceType = {
  theme: Themes;
  view: PageViews;
  pagination: PaginationTypes;
};
