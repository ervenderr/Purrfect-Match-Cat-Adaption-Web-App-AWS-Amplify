import React from 'react';
import Dashboard from '../../pages/admin/dashboard/Dashboard';
import ManageCats from '../../pages/admin/manage-cats/ManageCats';
import AdoptionRequest from '../../pages/admin/adoption-request/AdoptionRequest';
import Users from '../../pages/admin/users/Users';
import useAuthCheck from './utils/useAuthCheck';

const ProtectedDashboard = () => {
  useAuthCheck();
  return <Dashboard />;
};

const ProtectedManageCats = () => {
  useAuthCheck();
  return <ManageCats />;
};

const ProtectedAdoptionRequest = () => {
  useAuthCheck();
  return <AdoptionRequest />;
};

const ProtectedUsers = () => {
  useAuthCheck();
  return <Users />;
};

export {
  ProtectedDashboard,
  ProtectedManageCats,
  ProtectedAdoptionRequest,
  ProtectedUsers
};
