export interface MenuItem {
  icon?: string
  description: string
  route?: string
  children?: MenuItem[]
}

export const menuList: MenuItem[] = [
  {
    description: 'Components',
    children: [
      {
        route: 'components/autocomplete',
        description: 'Input Autocomplete',
      },
      {
        route: 'components/date',
        description: 'Input Date',
      },
      {
        route: 'components/input',
        description: 'Input',
      },
      {
        route: 'components/paginator',
        description: 'Paginator',
      },
      {
        route: 'components/select',
        description: 'Select Options',
      },
      {
        route: 'components/table',
        description: 'Table',
      },
      {
        route: 'components/toggle',
        description: 'Checkbox / Toggle',
      },
      {
        route: 'components/wysiwyg',
        description: 'Wysiwyg',
      },
    ],
  },
  {
    description: 'Overlay',
    children: [
      {
        description: 'Tooltip',
        route: 'overlay/tooltip',
      },
      {
        description: 'Popover',
        route: 'overlay/popover',
      },
      {
        description: 'Modal',
        route: 'overlay/modal',
      },
    ],
  },
  {
    description: 'Auth',
    route: 'auth',
  },
]
