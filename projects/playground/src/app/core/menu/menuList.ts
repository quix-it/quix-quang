export interface MenuItem {
  icons?: string[]
  description: string
  route?: string
  children?: MenuItem[]
}

export const menuList: MenuItem[] = [
  {
    description: 'menu.home',
    route: '/',
  },
  {
    description: 'menu.components.title',
    children: [
      {
        route: 'components/autocomplete',
        description: 'menu.components.autocomplete',
      },
      {
        route: 'components/date',
        description: 'menu.components.date',
      },
      {
        route: 'components/input',
        description: 'menu.components.input',
      },
      {
        route: 'components/paginator',
        description: 'menu.components.paginator',
      },
      {
        route: 'components/select',
        description: 'menu.components.select',
      },
      {
        route: 'components/table',
        description: 'menu.components.table',
      },
      {
        route: 'components/toggle',
        description: 'menu.components.checkbox',
      },
      {
        route: 'components/wysiwyg',
        description: 'menu.components.wysiwyg',
      },
      {
        route: 'components/loader',
        description: 'menu.components.loader',
      },
    ],
  },
  {
    description: 'menu.overlay.title',
    children: [
      {
        description: 'menu.overlay.tooltip',
        route: 'overlay/tooltip',
      },
      {
        description: 'menu.overlay.popover',
        route: 'overlay/popover',
      },
      {
        description: 'menu.overlay.modal',
        route: 'overlay/modal',
      },
      {
        description: 'menu.overlay.toast',
        route: 'overlay/toast',
      },
    ],
  },
  {
    description: 'menu.auth',
    route: 'auth',
  },
  {
    description: 'menu.dataHandling',
    route: '/data-handling',
  },
]

export const menuTheme: MenuItem = {
  description: 'menu.theme',
  icons: ['dark-mode.svg', 'light-mode.svg'],
}
