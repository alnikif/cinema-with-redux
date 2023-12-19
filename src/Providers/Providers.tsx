import React, { FC, ReactNode } from 'react';
import ThemeProvider from './ThemeProvider';
import { ViewProvider } from './ViewProvider';
import {PaginationProvider} from "./PaginationProvider";
import { Provider } from 'react-redux';
import {store} from "../store";


type ProvidersType = {
  readonly children: ReactNode;
};

const Providers: FC<ProvidersType> = (props) => {
  const { children } = props;

  return(
      <Provider store={store}>
          <ThemeProvider>
              <ViewProvider>
                  <PaginationProvider>
                      {children}
                  </PaginationProvider>
              </ViewProvider>
          </ThemeProvider>
      </Provider>
   )
};

export default Providers;
