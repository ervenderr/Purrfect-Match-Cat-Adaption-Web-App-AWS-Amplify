import React from 'react';
import Dashboard from '../../pages/admin/dashboard/Dashboard';
import ManageCats from '../../pages/admin/manage-cats/ManageCats';
import AdoptionRequest from '../../pages/admin/adoption-request/AdoptionRequest';
import Users from '../../pages/admin/users/Users';
import useAuthCheck from './utils/useAuthCheck';

const withAuthCheck = (Component) => () => {
  useAuthCheck();
  return <Component />;
};

const ProtectedDashboard = withAuthCheck(Dashboard);
const ProtectedManageCats = withAuthCheck(ManageCats);
const ProtectedAdoptionRequest = withAuthCheck(AdoptionRequest);
const ProtectedUsers = withAuthCheck(Users);

export {
  ProtectedDashboard,
  ProtectedManageCats,
  ProtectedAdoptionRequest,
  ProtectedUsers,
};