import axios from "axios";
import React, { useState, useEffect } from "react";


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
            <div className="rounded-md p-8 m-4 bg-gray-800">
                {projectDetails.name} 
            </div>
        )
};

export default ProjectCard;