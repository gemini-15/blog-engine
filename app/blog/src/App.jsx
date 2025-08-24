import './App.css';
import { Routes, Route, useParams } from 'react-router-dom';
import { DarkModeProvider } from './contexts/DarkModeContext';
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
    <DarkModeProvider>
      <div className='grid grid-flow-row bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300'>
        <Navbar />
        <div className="bg-white dark:bg-gray-900 min-h-screen">
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
        <Footer />
      </div>
    </DarkModeProvider>
  );
}

export default App;
