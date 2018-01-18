import React from 'react';
import App from './App';
import HomePage from './pages/HomePage';
import UsersListPage from './pages/UsersListPage';
import NotFoundPage from './pages/NotFoundPage';
import AdminsListPage from './pages/AdminsListPage';
export default [
    {
        ...App,
        routes: [
            {
                ...HomePage,
                path: '/',
                exact: true 
            }, 
            {
                ...AdminsListPage,
                path: '/admins'
            },
            {
                ...UsersListPage,
                path: '/users'
            },
            {
                ...NotFoundPage,
            }
        ]
    }
    
];

// export default () => {
//     return (
//         <div>
//             <Route exact path="/" component={Home}/>
//             <Route path="/users" component={UsersList} />
//         </div>
//     )
// }