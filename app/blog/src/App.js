import './App.css';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Projects from './pages/projects';
import Articles from './pages/articles';
import ArticleDisplay from './pages/ArticleDisplay';
import Contact from './pages/Contact';
import NotFound from './pages/notFound';
import { ReactComponent as FooterSvg } from "./footer.svg";

function BlogArticle() {
  let { slug } = useParams();
  return (
    <ArticleDisplay uuid={slug} />
  )
}

function App() {
  return (
  <div>
  <div className='bg-primary'>
    <Navbar className="bg-primary" />
      <Routes>
        <Route path='/' exact element={<Articles />} />
        <Route path='/notes' element={<Projects />} />
        <Route path='/whoami' element={<Contact />} />
        <Route path='/articles/:slug' element={<BlogArticle />}/>
        <Route
                    path="*"
                    element={<NotFound />}
                />
      </Routes>
  </div>
  <div className='bg-secondary'>
    <Footer />
  </div>
  </div>
  );
}

export default App;
