import React from 'react';
import SideBar from './SideBar';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-cols-[250px_1fr] min-h-screen w-full">
      {/* Sidebar (puedes reemplazar esto con tu componente real) */}
        <SideBar/>

      {/* Contenido principal */}
      <main className="p-6">{children}</main>
    </div>
  );
};

export default Layout;
