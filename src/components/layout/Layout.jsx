import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <>
      <Header></Header>
      <main className="app-container">{children}</main>
      <Footer></Footer>
    </>
  );
}
