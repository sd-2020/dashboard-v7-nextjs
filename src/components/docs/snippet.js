const Snippet = () => (
  <pre className="font-mono text-sm px-4 py-1 rounded overflow-x-auto max-w-full bg-gray-100 text-black border">
    {`[ 
  {
    section : 'Applications',
    content: [
      {
        title: 'Users',
        icon: <UsersIcon />,
        link: '/admin/users'
      },
      {
        title: 'Medias',
        icon: <MediasIcon/>,
        link: '/admin/medias'
      },
    ]
  },
]
`}
  </pre>
);

export default Snippet;
