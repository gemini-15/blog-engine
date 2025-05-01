import React, { useEffect, useState } from "react";
import BodyCore from "../components/Body";
import TagsHandler from "../components/TagsHandler";

const Articles = () => {
    useEffect(() => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
        const changeTitle = async () => {

            document.title = "Ayzminy | Home";
        }

        changeTitle();
    }); 

    return(
        <div className="pr-5 pl-5 pt-20 sm:pr-40 sm:pl-40">
            <TagsHandler />
            <BodyCore />
        </div>
    )
};
export default Articles;