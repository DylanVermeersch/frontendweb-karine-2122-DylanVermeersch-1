import { useCallback } from "react";
import { NavLink } from "react-router-dom";
import { useLogout, useSession } from "../contexts/AuthProvider";

const NavItem = ({
  to,
  label
}) => (
  <span>
    <NavLink
      to={to}
      className="hover:text-blue-500"
      activeClassName="text-blue-500 cursor-default"
    >
      {label}
    </NavLink>
  </span>
);

export default function NavMenu() {
  const { isAuthed } = useSession();
  const logout = useLogout();

  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

  return (
    <div className="nav-container">
      <nav className="nav-menu">
        {
          isAuthed ? (
            <>
              <NavItem to="/notes" label="Notes" />
            </>
          ) : null
        }
        <div className="login-register"></div>
        {
          !isAuthed ? (
            <>
              <NavItem to="/login" label="Sign in" />
              <NavItem to="/register" label="Register" />
            </>
          ) : (
            <>
              <button onClick={handleLogout}>
                Sign out
              </button>
            </>
          )
        }
      </nav>
    </div>
  );
}