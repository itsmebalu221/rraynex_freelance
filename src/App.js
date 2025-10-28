import { Routes, Route } from "react-router-dom";
import Header from "./Header/header";
import Home from "./Home/home";
import Footer from "./Footer/footer";
import AboutUs from "./About/AboutRraynex/aboutrray";
import VisionValues from "./About/Values/Values";
import MilestonesRecognitions from "./About/Milestones/MilestonesRecognitions";
import Innovation from "./About/Innovation/Innovation";
import Quality from "./About/Quality/Quality";
import Board from "./About/Board/Board";
import Responsibility from "./Responsiblity/Responsiblity";
import Worldwide from "./Worldwide/Worldwide";
import Contact from "./ContactUs/contact";
import CSR from "./Responsiblity/CSR/CSR";
import Sustainability from "./Responsiblity/Sustainability/sus";
import EHS from "./Responsiblity/EHS/EHS";
import Ecosystem from "./Responsiblity/UpliftingEco/uplifting";
import ProductsPage ,{ProductDetailPage} from "./Products/ProductS/Products";
import ProductCategories from "./Products/Categories/CategoryPage";
import Manufacturing from "../src/Manifacturing/manifacturing";
import NotFound from "./NotFound";
import Luxe from "./Luxe/Luxe";
import ScrollToTop from "./ScrollToTop";
import Blog from "./Blog/Blog";
import BlogDetail from "./Blog/BlogDetail";


function App() {
  return (
    <div className="App">
      <Header />
      <main className="content">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/about/vision-and-values" element={<VisionValues />} />
          <Route path="/about/milestone-and-recognitions" element={<MilestonesRecognitions />} />
          <Route path="/about/innovation" element={<Innovation />} />
          <Route path="/about/quality" element={<Quality />} />
          <Route path="/about/board-of-directors" element={<Board />} />
          <Route path="/responsibility" element={<Responsibility />} />
          <Route path="/responsibility/csr" element={<CSR />} />
          <Route path="/responsibility/sustainability" element={<Sustainability />} />
          <Route path="/responsibility/ehs" element={<EHS />} />
          <Route path="/responsibility/uplifting-ecosystem" element={<Ecosystem />} />
          <Route path="/manufacturing" element={<Manufacturing />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/categories" element={<ProductCategories />} />
          <Route path="/products/categories/:category" element={<ProductsPage />} />
            <Route path="/products/view/:slug" element={<ProductDetailPage />} />
          <Route path="/products/categories/rraynex-luxe" element={<Luxe />} />
          <Route path="/worldwide" element={<Worldwide />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/download" element={<a href="/assets/Rraynex_Corp_Profile.pdf" download>Download Brochure</a>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
