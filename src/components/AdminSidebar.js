import React, { useState } from "react";
import { NavLink } from "react-router-dom";

function AdminSidebar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleAdminLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    window.location.href = "/admin-login";
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}

      {!menuOpen && (
        <button
          className="mobile-menu-button"
          onClick={() => setMenuOpen(true)}
        >
          ☰
        </button>
      )}


      {/* Overlay */}

      {menuOpen && (
        <div
          className="sidebar-overlay"
          onClick={closeMenu}
        ></div>
      )}


      {/* Sidebar */}

      <aside
        className={`admin-sidebar ${
          menuOpen ? "mobile-open" : ""
        }`}
      >

        {/* Sidebar Header */}

        <div className="admin-sidebar-header">

          <div className="admin-logo">
            Admin Panel
          </div>

          {/* Close Button */}

          {menuOpen && (
            <button
              className="mobile-close-button"
              onClick={closeMenu}
            >
              ×
            </button>
          )}

        </div>


        {/* Navigation */}

        <nav className="admin-nav">

          <NavLink
            to="/admin"
            className="admin-nav-link"
            onClick={closeMenu}
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/products"
            className="admin-nav-link"
            onClick={closeMenu}
          >
            Products
          </NavLink>

          <NavLink
            to="/admin/orders"
            className="admin-nav-link"
            onClick={closeMenu}
          >
            Orders
          </NavLink>

        </nav>


        {/* Logout */}

        <button
          className="admin-logout"
          onClick={handleAdminLogout}
        >
          Logout
        </button>

      </aside>
    </>
  );
}

export default AdminSidebar;