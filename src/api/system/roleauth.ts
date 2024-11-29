const roleauthApi: any[] = [
    {
        id:1,
        rolename:'admin',
        urlpermission:[
          '*:*:*'
        ]
      },
      {
        id:2,
        rolename:'editor',
        urlpermissions:[
            {path: "/routing"},
            {path: "/routing/user"},
            {path: "/routing/menu"},
        ]
      },
      {
        id:3,
        rolename:'avisitor',
        rulpermissions:[
            {path: "/data"},
            {path: "/data/tax"},
        ]
      },
  ]
  
  export default roleauthApi