import HomeIcon from './icons/home';
import MediasIcon from './icons/medias';
import ServersIcon from './icons/servers';
import ContactIcon from './icons/contact';
import TerminalIcon from './icons/terminal';
import RecycleBinIcon from './icons/recycle-bin';
import DocumentationIcon from './icons/documentation';

const data = [
  {
    section: 'Dashboard',
    content: [
      {
        title: 'Scripts',
        icon: <TerminalIcon />,
        link: '/admin/scripts',
      },
      // {
      //   title: 'Medias',
      //   icon: <MediasIcon />,
      //   link: '/admin/medias',
      // },
      // {
      //   title: 'Contacts',
      //   icon: <ContactIcon />,
      //   link: '/admin/contacts',
      // },
    ],
  },
  {
    section: 'Monitoring',
    content: [
      // {
      //   title: 'Terminal',
      //   icon: <TerminalIcon />,
      //   link: '/admin/terminal',
      // },
      // {
      //   title: 'Recycle bin',
      //   icon: <RecycleBinIcon />,
      //   link: '/admin/recycle-bin',
      // },
      {
        title: 'Servers',
        icon: <ServersIcon />,
        link: '/admin/servers',
      },
    ],
  },
  // {
  //   section: 'Guides',
  //   content: [
  //     {
  //       title: 'Documentation',
  //       icon: <DocumentationIcon />,
  //       link: '/admin/documentation',
  //     },
  //   ],
  // },
];

export default data;
