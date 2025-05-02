import React, { useEffect, useState } from "react";
import axios from "axios";
import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {materialOceanic} from 'react-syntax-highlighter/dist/esm/styles/prism';


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
        <div className="bg-primary text-gray-300">
            {loading && <div className=""><div className=''>
						Loading</div>
					</div>}
            {!loading && (
                <div className="grid justify-items-center text-gray-300">
                <img className="object-cover rounded-lg shadow-md shadow-gray-800" src={articleData.articlereq.image_cont} />
                <div className="pr-60 pl-60 wrap-break-word max-w-screen">
                    <Markdown 
                        children={articleData.document_content}
                        components={{
                            code(props) {
                                const {children, className, node, ...rest} = props
                                const match = /language-(\w+)/.exec(className || '')
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
                                    <code {...rest} className="text-white">
                                    {children}
                                    </code>
                                )
                            },

                            h1(props) {
                                const {children, className, node, ...rest} = props
                                return (
                                    <h1 className="text-white text-center antialiased 
                                    font-black underline break-words decoration-indigo-500 hover:decoration-indigo-800 sm:text-2xl text-sm">
                                        {children}
                                    </h1>
                                )
                            },

                            h2(props) {
                                const {children, className, node, ...rest} = props
                                return (
                                    <h2 className="text-white antialiased underline decoration-indigo-500 hover:decoration-indigo-800
                                    font-black break-words sm:text-xl text-sm">
                                        {children}
                                    </h2>
                                )
                            },

                            h3(props) {
                                const {children, className, node, ...rest} = props
                                return (
                                    <h3 className="antialiased text-gray-400  
                                    font-black break-words sm:text-lg text-sm">
                                        {children}
                                    </h3>
                                )
                            },

                            h4(props) {
                                const {children, className, node, ...rest} = props
                                return (
                                    <h4 className="antialiased text-gray-400  
                                    font-black break-words sm:text-[16px] text-sm">
                                        {children}
                                    </h4>
                                )
                            },

                            p(props){
                                const {children, className, node, ...rest} = props
                                return (
                                    <p className="antialiased
                                sm:text-[16px] text-sm leading-8">
                                        {children}
                                    </p>
                                )
                            },
                            
                            li(props){
                                const {children, className, node, ...rest} = props
                                return (
                                    <li className="antialiased 
                                sm:text-[16px] text-sm indent-8 list-disc list-inside leading-8">
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
                                sm:text-[16px] text-sm leading-8 text-purple-700" href={rest.href}>{children}</a>
                                )
                            },

                            blockquote(props) {
                                const {children, className, node, ...rest} = props
                                return (
                                    <blockquote className="p-4 my-4 border-s-4 border-gray-600 bg-gray-500 dark:border-gray-500 dark:bg-gray-800">{children}</blockquote>
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