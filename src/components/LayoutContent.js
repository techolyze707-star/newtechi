import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LayoutContent({ children }) {
  return (
    <>
      <Navbar />
        {children}
      <Footer />
    </>
  );
}