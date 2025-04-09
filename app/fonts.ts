import { Inter, Montserrat } from 'next/font/google';

export const headingFont = Inter({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

export const bodyFont = Montserrat({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

// If the font is not a variable font the weight will have to be specified. See https://fonts.google.com/variablefonts