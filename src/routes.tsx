/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
 
import {
  MdHome,
  MdBarChart,
  MdPerson,
} from 'react-icons/md';

const routes = [
  {
    name: 'Dashboard',
    layout: '/admin',
    path: 'default',
    icon: <MdHome className="h-6 w-6" />,
  },
  {
    name: 'Add Patient',
    layout: '/admin',
    icon: <MdBarChart className="h-6 w-6" />,
    path: 'add-patient',
  }, 
  {
    name: 'Additional Data',
    layout: '/admin',
    icon: <MdBarChart className="h-6 w-6" />,
    path: 'additional-data',
  }, 
  {
    name: 'Create User',
    layout: '/admin',
    icon: <MdBarChart className="h-6 w-6" />,
    path: 'create-user',
  }, 
  {
    name: 'User List',
    layout: '/admin',
    icon: <MdBarChart className="h-6 w-6" />,
    path: 'user-list',
  }, 
];
export default routes;
 