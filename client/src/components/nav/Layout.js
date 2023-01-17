import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Header from "../nav/Header";
import Footer from "../nav/Footer";
import "./Layout.css";

function Layout({ children }) {
  return (
    <div>
      <Header />
      <main className="main-content">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
