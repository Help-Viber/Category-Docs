import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const isDevelopment = process.env.NODE_ENV === 'development' || !process.env.NODE_ENV;
console.log('Docusaurus building in mode:', process.env.NODE_ENV || 'development (default)');

const config: Config = {
  title: 'HelpViber',
  tagline: 'Configuration & Integration Guides',
  favicon: 'img/helpviber-icon.svg',

  url: 'https://help-viber.github.io',
  baseUrl: isDevelopment ? '/' : '/Guides/',

  organizationName: 'Help-Viber',
  projectName: 'Guides',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: isDevelopment ? 'guides' : '',
        },
        blog: false, // Disable blog completely
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    navbar: {
      title: 'HelpViber',
      logo: {
        alt: 'HelpViber Logo',
        src: 'img/helpviber-icon.svg',
      },
      items: [
        {
          href: 'https://viber.helpviber.com',
          label: 'Sign up as viber',
          position: 'right',
          className: 'button button--primary navbar-signup',
        },
      ],
    },

    footer: {
      style: 'dark',
      links: [],
      copyright: `© ${new Date().getFullYear()} HelpViber`,
    },

    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
