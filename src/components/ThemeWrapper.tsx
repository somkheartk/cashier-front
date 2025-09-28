'use client';

import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  typography: {
    fontFamily: '"Kanit", "Sarabun", "Prompt", "Mitr", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontFamily: '"Kanit", sans-serif',
    },
    h2: {
      fontWeight: 600,
      fontFamily: '"Kanit", sans-serif',
    },
    h3: {
      fontWeight: 600,
      fontFamily: '"Kanit", sans-serif',
    },
    h4: {
      fontWeight: 600,
      fontFamily: '"Kanit", sans-serif',
    },
    h5: {
      fontWeight: 500,
      fontFamily: '"Kanit", sans-serif',
    },
    h6: {
      fontWeight: 500,
      fontFamily: '"Kanit", sans-serif',
    },
    body1: {
      fontFamily: '"Kanit", sans-serif',
      fontWeight: 400,
    },
    body2: {
      fontFamily: '"Kanit", sans-serif',
      fontWeight: 400,
    },
    button: {
      fontFamily: '"Kanit", sans-serif',
      fontWeight: 500,
      textTransform: 'none',
    },
    caption: {
      fontFamily: '"Kanit", sans-serif',
    },
    overline: {
      fontFamily: '"Kanit", sans-serif',
    },
  },
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    success: {
      main: '#4caf50',
    },
    warning: {
      main: '#ff9800',
    },
    info: {
      main: '#2196f3',
    },
  },
  shape: {
    borderRadius: 8,
  },
});

interface ThemeWrapperProps {
  children: React.ReactNode;
}

export default function ThemeWrapper({ children }: ThemeWrapperProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
