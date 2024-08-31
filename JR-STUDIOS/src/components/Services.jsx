import React from 'react'
import styled from 'styled-components';
import { FadeText } from "@/components/magicui/fade-text";

const Services = () => {
    return (
        <Wrapper>
            <div className="head-services">
                <h4>
                    <FadeText
                        className="text-4xl font-bold  dark:text-white"
                        direction="up"
                        framerProps={{
                            show: { transition: { delay: 0.2 } },
                        }}
                        text="SERVICES"
                    />
                </h4>
                <h1>
                    <FadeText
                        className="text-4xl font-bold dark:text-white"
                        direction="up"
                        framerProps={{
                            show: { transition: { delay: 0.2 } },
                        }}
                        text="Explore Our Best Services"
                    />
                </h1>
            </div>
            <div className="services-card">
                <div className="card">
                    <img src="/icons/web-design.png" alt="web-design" />
                    <h3>Web Design</h3>
                    <p>Crafting visually appealing and user-friendly website layouts, focusing on aesthetics and user experience.</p>
                </div>
                <div className="card">
                    <img src="/icons/web-dev.png" alt="web-dev" />
                    <h3>Web Development</h3>
                    <p>Building and maintaining the core structure of websites, ensuring functionality and performance.</p>
                </div>
                <div className="card">
                    <img src="/icons/app-dev.png" alt="app-dev" />
                    <h3>App Development</h3>
                    <p>Creating mobile applications for various platforms, emphasizing usability and performance.</p>
                </div>
                <div className="card">
                    <img src="/icons/3d-modeling.png" alt="3d-modeling" />
                    <h3>3D Modeling</h3>
                    <p>Designing and rendering three-dimensional objects and environments for various purposes like gaming, film, and architecture.</p>
                </div>
                <div className="card">
                    <img src="/icons/graphic-design.png" alt="graphic-design" />
                    <h3>Graphic Designing</h3>
                    <p>Producing visual content to communicate messages, utilizing typography, imagery, and color.</p>
                </div>
                <div className="card">
                    <img src="/icons/bot.png" alt="bot-dev" />
                    <h3>Bot Development</h3>
                    <p>Designing and programming automated systems to perform tasks and interact with users or systems.</p>
                </div>
                <div className="card">
                    <img src="/icons/mc.png" alt="mc-dev" />
                    <h3>Minecraft Development</h3>
                    <p>Developing custom content, mods, plugins and features within the Minecraft game to enhance the gaming experience.</p>
                </div>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.section`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 3rem;
    padding: 4rem;

    @media (max-width: ${({theme}) => theme.media.mobile}) {
        padding: 3rem 1rem;
    }

        .head-services {
            width: 100%;
            display: flex;
            align-items: center;
            flex-direction: column;
            font-family: Poppins, sens-serif;
            
            h4 {
                border: 1px solid #9017f5;
                border-radius: 5rem;
                padding: 5px 1rem;
                color: #fff;
                text-align: center;    
            }

            h1 {
                font-size: 3.5rem;
                color: #fff;

                @media (max-width: ${({theme}) => theme.media.mobile}) {
                    font-size: 2.5rem;
                    text-align: center;
                    padding: 1rem 0rem;
                }
            }
        }
    
        .services-card {
            width: 100%;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            gap: 2rem;
            padding: 2rem 1rem;
            justify-content: space-around;

            .card {
                width: 20rem;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 1rem;
                background-color: #14151B;
                padding: 2.3rem 1.5rem;
                border-radius: 0.5rem;
                color: #fff;
                font-family: Poppins, sens-serif;
                transition: all 0.5s ease-in-out;
                box-shadow: 1px 1px 10px 1px black;

                &:hover {
                    border: 2px solid #9017f5;
                    cursor: pointer;
                }

                img {
                    width: 50px;
                }

                svg {
                    width: 50px;
                    color: #9017f5;
                }
                
                h3 {
                    font-family: Poppins, sens-serif;
                    font-weight: bold;
                    font-size: 1.2rem;    
                }
                    
                p {
                    width: 100%;
                    font-family: Poppins, sens-serif;
                    text-align: center;
                    font-size: 0.8rem;
                    color: #bebcbc;
                }
            }
        }
`;

export default Services
