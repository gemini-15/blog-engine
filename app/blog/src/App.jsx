import './App.css';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Projects from './pages/projects';
import Articles from './pages/articles';
import ArticleDisplay from './pages/ArticleDisplay';
import Contact from './pages/Contact';
import NotFound from './pages/notFound';

function BlogArticle() {
  let { slug } = useParams();
  return (
    <ArticleDisplay uuid={slug} />
  )
}

function App() {
  return (
  <div className='grid grid-rows-12'>
  <Navbar />
  <div className='row-span-11'>
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
    <Footer className='row-span-1'/>
  </div>
  );
}

export default App;
