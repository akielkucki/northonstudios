import React, { useEffect, useState } from 'react';
import { FadeText } from "@/components/magicui/fade-text";
import styled from 'styled-components';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const Projects = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        setProjects([
            {
                index: 1,
                title: "Minecraft Thumbnail",
                image: "/projects-img/ilanox-thumbnail.png",
            },
            {
                index: 2,
                title: "Email Signature",
                image: "/projects-img/liam-email-sign.png",
            },
            {
                index: 3,
                title: "Custom Plugin FC-Overval",
                image: "/projects-img/alberto-plugin.png",
            },
            {
                index: 4,
                title: "Ohana Services Website",
                image: "/projects-img/ohanaservices-alfred.png",
                link: "https://ohanaservices.co"
            }
        ]);
    }, []);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: projects.length,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <Wrapper>
            <div className="project-head">
                <div className="project-heading">
                    <h4>
                        <FadeText
                            className="text-4xl font-bold dark:text-white"
                            direction="up"
                            framerProps={{
                                show: { transition: { delay: 0.2 } },
                            }}
                            text="PROJECTS"
                        />
                    </h4>
                    <h1>
                        <FadeText
                            className="text-4xl font-bold dark:text-white"
                            direction="up"
                            framerProps={{
                                show: { transition: { delay: 0.2 } },
                            }}
                            text="Discover Our Completed Work"
                        />
                    </h1>
                </div>
            </div>
            <Slider {...settings} className="projects">
                {projects.map((currElem, index) => (
                    <div className="card" key={index}>
                        <img src={currElem.image} alt={currElem.title} />
                        <div className="card-info">{currElem.title}</div>
                        {currElem.link ? <a>Live <i className='fa fa-redirect'></i></a> : null}
                    </div>
                ))}
            </Slider>
        </Wrapper>
    );
};

const Wrapper = styled.section`
    background-color: #14151B;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    
    .project-head {
        width: 100%;
        color: #fff;
        font-family: Poppins, sans-serif;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
        
        .project-heading {
            padding: 1rem;
            text-align: left;
            color: #fff;
            align-items: flex-start;
            display: flex;
            flex-direction: column;
            font-family: Poppins, sans-serif;
            width: 80%;

            @media (max-width: ${({theme}) => theme.media.mobile}) {
                width: 100%;
            }   
            
            h4 {
                border: 1px solid #9017f5;
                border-radius: 5rem;
                padding: 5px 1rem;

                }
                
            h1 {
                width: 50%;
                font-size: 2.5rem;

                @media (max-width: ${({theme}) => theme.media.mobile}) {
                    width: 100%;
                }   
            }
            }

        button {
            font-family: Poppins, sans-serif;
            border: 1px solid #9017f5;
            border-radius: 5rem;
            padding: 0.8rem 1rem;
            color: #fff;
            transition: all 0.3s ease-in-out;
            background-color: #9017f5;
    
            &:hover {
                background-color: #fff;
                border: 1px solid #000;
                color: #000;
            }
        }
    }

    .slick-slider {
        margin-top: 1rem;

        .slick-slide {
            display: flex;
            justify-content: center; /* Center the slides */
            padding: 0 1rem; /* Add padding to each slide for spacing */
        }
    }

    .projects {
        width: 100%;
        display: flex;
        justify-content: space-around;
        margin-top: 1rem;

        .card {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: #fff;
            font-family: Poppins, sans-serif;
            gap: 1rem;
            border: 1px solid #9017f5;
            border-radius: 5px;
            background-color: #00000082;
            padding: 1rem;
            transition: all 0.5s ease-in;

            &:hover {
                cursor: pointer;
            }

            h3 {
                font-weight: bold;
                font-size: 1.5rem;
            }
                
            img {
                padding-bottom: 1rem;
                width: 100%;
                border-radius: 5px;
            }

            .card-info {
                text-align: center;
                font-size: 1.2rem;
            }
        }
    }
`;

export default Projects;
