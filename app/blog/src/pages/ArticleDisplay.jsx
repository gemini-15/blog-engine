import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {materialOceanic} from 'react-syntax-highlighter/dist/esm/styles/prism';
import mermaid from 'mermaid';


const MermaidBlock = ({ chartCode }) => {
    const containerRef = useRef(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!chartCode || !containerRef.current) {
            console.log('MermaidBlock: Missing chartCode or containerRef');
            return;
        }

        setIsLoading(true);
        setError(null);

        // Clear previous content
        if (containerRef.current) {
            containerRef.current.innerHTML = '';
        }

        // Initialize Mermaid
        mermaid.initialize({
            startOnLoad: false,
            securityLevel: 'loose',
            theme: document.documentElement.classList.contains('dark') ? 'dark' : 'default',
            fontFamily: 'Arial, sans-serif',
        });

        // Render diagram using the newer async API
        const renderDiagram = async () => {
            try {
                const { svg } = await mermaid.render(`mermaid-${Date.now()}`, chartCode);
                if (containerRef.current) {
                    containerRef.current.innerHTML = svg;
                    console.log('MermaidBlock: Successfully rendered diagram');
                    setIsLoading(false);
                }
            } catch (e) {
                console.error('MermaidBlock: Render error:', e);
                setError(e.message || String(e));
                setIsLoading(false);
            }
        };

        renderDiagram();
    }, [chartCode]);

    if (error) {
        return (
            <div className="my-4 border border-red-300 dark:border-red-700 rounded-lg p-4 bg-red-50 dark:bg-red-900">
                <div className="text-red-700 dark:text-red-300">
                    <strong>Mermaid Error:</strong><br/>
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className="my-4 overflow-auto border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
            {isLoading && (
                <div className="text-center py-8 text-gray-600 dark:text-gray-400">
                    Loading diagram...
                </div>
            )}
            <div ref={containerRef} />
        </div>
    );
};


const ArticleDisplay = (props) => {
    const [title, setTitle] = useState("gr1m0ire |");
    const [articleData, setArticleData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [articleUuid, setArticleUuid] = useState(props.uuid);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}articles/${articleUuid}`);
                setArticleData(response.data);
                console.log(response.data.articlereq.title)
                setTitle(response.data.articlereq.title);
                
            } 
            catch (error) {
                console.log(error);
            }

            setLoading(false);
        };

        document.title = title;

        fetchArticle();
    }, [title]);

    return (
        <div className="bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300">
            {loading && <div className=""><div className=''>
						Loading</div>
					</div>}
            {!loading && (
                <div className="grid justify-items-center leading-20 align-middle">
                <img className="object-cover mt-4 mb-4 md:h-100 h-50 md:w-300 w-150 aspect-auto rounded-lg shadow-md shadow-gray-800" src={articleData.articlereq.image_cont} />
                <div className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 wrap-break-word max-w-screen">

                    <Markdown 
                        children={articleData.document_content}
                        components={{
                            code(props) {
                                const {children, className, node, ...rest} = props
                                const match = /language-(\w+)/.exec(className || '')
                                if (match && match[1] === 'mermaid') {
                                    console.log('Rendering MermaidBlock with code:', String(children).replace(/\n$/, ''));
                                    return (
                                        <MermaidBlock chartCode={String(children).replace(/\n$/, '')} />
                                    );
                                }
                                return match ? (
                                    <SyntaxHighlighter
                                    {...rest}
                                    children={String(children).replace(/\n$/, '')}
                                    style={materialOceanic}
                                    language={match[1]}
                                    PreTag="div"
                                    className="rounded-md"
                                    />

                                ) : (
                                    <code {...rest} className="text-black dark:text-gray-100 bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded">
                                    {children}
                                    </code>
                                )
                            },

                            h1(props) {
                                const {children, className, node, ...rest} = props
                                return (
                                    <h1 className="uppercase text-black dark:text-gray-100 text-center antialiased 
                                    font-black underline break-words leading-20 decoration-secondary dark:decoration-blue-400 sm:text-2xl text-sm">
                                        {children}
                                    </h1>
                                )
                            },

                            h2(props) {
                                const {children, className, node, ...rest} = props
                                return (
                                    <h2 className="text-black dark:text-gray-100 antialiased underline decoration-secondary dark:decoration-blue-400 hover:decoration-secondary dark:hover:decoration-blue-300
                                    font-black break-words sm:text-xl leading-20 text-sm">
                                        {children}
                                    </h2>
                                )
                            },

                            h3(props) {
                                const {children, className, node, ...rest} = props
                                return (
                                    <h3 className="antialiased text-gray-900 dark:text-gray-100  
                                    font-black break-words sm:text-lg leading-20 text-sm">
                                        {children}
                                    </h3>
                                )
                            },

                            h4(props) {
                                const {children, className, node, ...rest} = props
                                return (
                                    <h4 className="antialiased text-gray-900 dark:text-gray-100 
                                    font-black break-words sm:text-[16px] leading-20 text-sm">
                                        {children}
                                    </h4>
                                )
                            },

                            p(props){
                                const {children, className, node, ...rest} = props
                                return (
                                    <p className="antialiased text-black dark:text-gray-100
                                sm:text-[16px] text-sm leading-12">
                                        {children}
                                    </p>
                                )
                            },
                            
                            li(props){
                                const {children, className, node, ...rest} = props
                                return (
                                    <li className="antialiased text-black dark:text-gray-100
                                sm:text-[16px] text-sm indent-8 list-disc list-inside leading-12">
                                        {children}
                                    </li>
                                )
                            },

                            img(props) {
                                const {children, className, node, ...rest} = props
                                return (
                                    <div className="flex justify-center items-center space-y-3">
                                <img src={rest.src} alt={rest.alt} />
                                </div>
                                )
                            },

                            a(props) {
                                const {children, className, node, ...rest} = props
                                return (
                                    <a className="antialiased
                                sm:text-[16px] text-sm leading-12 text-blue-900 dark:text-blue-400 hover:underline transition-colors duration-200" href={rest.href}>{children}</a>
                                )
                            },

                            blockquote(props) {
                                const {children, className, node, ...rest} = props
                                return (
                                    <blockquote className="p-4 my-4 border-s-4 border-gray-900 dark:border-gray-600 bg-primary dark:bg-secondary opacity-90 text-white transition-colors duration-300">{children}</blockquote>
                                )
                            },
                        }}
                    />
                </div>
                </div>
            )}
        </div>
    )
}
export default ArticleDisplay; 