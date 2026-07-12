import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

export default function Layout({ children }) {
  return (
    <>
      <Header></Header>
      <main className="app-container">{children}</main>
      <Footer></Footer>
    </>
  );
}
