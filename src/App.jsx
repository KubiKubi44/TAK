import { BrowserRouter as Router, useLocation } from "react-router-dom";
import { useEffect } from "react";
import AppShell from "./AppShell";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo(0, 0), [pathname]);
  return null;
};

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppShell />
    </Router>
  );
}
