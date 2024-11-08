import Footer from "../components/footer";
import Navbar from "../components/navbar";

const Layout = ({ children }) => {
  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
