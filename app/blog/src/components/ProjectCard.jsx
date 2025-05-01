import axios from "axios";
import React, { useState, useEffect } from "react";
import { ArrowTopRightOnSquareIcon, StarIcon } from '@heroicons/react/24/solid';


const ProjectCard = (projectUrl) => {
        const [project, setProject] = useState(projectUrl);

        const [projectDetails, setProjectDetails] = useState([]);

        useEffect(() => {
            const fetchProjectInfo = async () => {
                console.log(project);
                try {
                    
                    const response = await axios.get(`${project.projectUrl}`);
                    console.log(response.data);
                    setProjectDetails(response.data);
                }
                catch (error) {
                    console.log(error);
                }
            }
            if (projectDetails.length == 0) {
                fetchProjectInfo();
            }
            
            console.log(projectDetails)
        }, [project, projectDetails]);


        
        return (
            <div className="rounded-md p-8 m-4 bg-gray-800 flex justify-items-end">
                <div className="w-1/2">
                    <div>{projectDetails.name}</div>
                    <div className="text-gray-600">{projectDetails.description}</div>
                </div>
                <div className="w-1/2 flex justify-end">
                    <div className="flex items-center space-x-4">
                        <div className="text-gray-600 ">
                            <StarIcon className="h-6 w-6" />
                            </div>
                        <div className="text-gray-600 pr-4">
                        {projectDetails.stargazers_count}
                        </div>
                        <a href={projectDetails.html_url}>
                            <ArrowTopRightOnSquareIcon className="h-6 w-6 text-gray-600 hover:text-gray-300"/>
                        </a>
                    </div>

                </div>
            </div>
        )
};

export default ProjectCard;