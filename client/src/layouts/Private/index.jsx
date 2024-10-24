import { useToggle } from '@common';
import { useCheckAuth } from '@custom';
import { DashboardHeader, FooterWrapper, Sidebar } from '@partials';
import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';


export function PrivateLayout() {
  const [visible, toggleVisible] = useToggle(true);
  const { isAdmin, userInfo } = useCheckAuth(true) || {
    name: 'Private User',
  };
  return (
    !isAdmin ? <Navigate to="/login" /> : (
      <div
        id="private-layout"
        className="flex w-screen h-screen overflow-y-auto "
      >
        <Sidebar
          visible={visible}
          noOverlay={true}
          toggleVisible={toggleVisible}
        >
          <DashboardHeader
            toggleVisible={toggleVisible}
            visible={!visible}
          />
          <div className="relative w-full">
            <div className="w-full grid min-h-screen mx-auto place-items-center">
              <Suspense fallback={<div>Loading...</div>}>
                <Outlet context={{ userInfo }} />
              </Suspense>
            </div>
            <FooterWrapper />
          </div>
        </Sidebar>
      </div>
    )
  );
}

