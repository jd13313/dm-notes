import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import DmNote from './DmNote.component';
import { ChakraProvider } from '@chakra-ui/react';
import nordTheme from './ChakraThemes/nordTheme';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider theme={nordTheme}>
      <DmNote />
    </ChakraProvider>
  </React.StrictMode>
);
