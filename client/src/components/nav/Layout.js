import Header from "../nav/Header";
import Footer from "../nav/Footer";

function Layout({ children }) {
  return (
    <div>
      <Header />
        {children}
      <Footer />
    </div>
  )
}

export default Layout;