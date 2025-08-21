import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const usePageTitle = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    let title = "Portora";

    if (pathname === "/features") title = "Features — Portora";
    else if (pathname === "/welcome") title = "Portora | Simplify managing clients"
    else if (pathname === "/pricing") title = "Pricing — Portora";
    else if (pathname === "/login") title = "Login — Portora";
    else if (pathname === "/register") title = "Register — Portora";
    else if (pathname === "/FAQ") title = "FAQ — Portora";
    else if (pathname === "/support") title = "Support — Portora";
    else if (pathname === "/") title = "Dashboard — Portora";
    else if (pathname === "/clients") title = "Clients — Portora ";
    else if (pathname === "/projects") title = "Projects — Portora";
    else if (pathname === "/chat") title = "Chat — Portora";
    else if (pathname === "/terms") title = "Terms & Conditions — Portora";

    document.title = title;
  }, [pathname]);
};
