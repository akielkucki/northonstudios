import React from 'react'
import { FadeText } from "@/components/magicui/fade-text";
import styled from 'styled-components';

const Contact = () => {
    return (
        <Wrapper>
            <div className="contact">
                <div className="contact-head">
                    <h1>
                        <FadeText
                            className="text-4xl font-bold dark:text-white"
                            direction="up"
                            framerProps={{
                                show: { transition: { delay: 0 } },
                            }}
                            text="Let's Create Something Great Together"
                        />
                    </h1>
                    <p>
                        <FadeText
                            className="text-4xl font-bold dark:text-white"
                            direction="up"
                            framerProps={{
                                show: { transition: { delay: 0 } },
                            }}
                            text="An invitation for collaboration, emphasizing the potential for creating outstanding projects by working together."
                        />
                    </p>
                </div>
                <div className="contact-info">
                    <a href='mailto:jaundev768@gmail.com'><i className='fa fa-envelope'></i> Email</a>
                    <a href='https://discord.gg/6PGfR2N742' target='_blank'><i className="fa-brands fa-discord"></i> Discord</a>
                </div>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.section`
    width: 100%;
    padding: 1.5rem;
    margin: auto;

    .contact {
        background-image: url(https://templatekit.jegtheme.com/pirus/wp-content/uploads/sites/43/2024/04/bg-footer2.jpg);
        background-position: center center;
        background-size: cover;
        display: flex;
        flex-direction: column;
        align-items: center;
        color: #fff;
        font-family: Poppins, sens-serif;
        gap: 4rem;
        border-radius: 1rem;
        padding: 3rem 1rem;

        @media (max-width: ${({theme}) => theme.media.mobile}) {

        }

        .contact-head {
            display: flex;
            flex-direction: column;
            align-items: center; 
            gap: 1.5rem;

            h1 {
                font-size: 3rem;
                text-align: center;

                @media (max-width: ${({theme}) => theme.media.tab}) {
                    font-size: 2.3rem;
                }
            }


            p {
                color: gray;
                width: 60%;
                text-align: center;

                @media (max-width: ${({theme}) => theme.media.mobile}) {
                    width: 100%;
                }
            }
        }

        .contact-info {
            display: flex;
            flex-direction: row;
            justify-content: center;
            flex-wrap: wrap;
            gap: 1.5rem;

            @media (max-width: ${({theme}) => theme.media.mobile}) {
            
            }

            a {
                font-family: Poppins, sans-serif;
                border: 1px solid #9017f5;
                border-radius: 5rem;
                padding: 0.8rem 2rem;
                color: #fff;
                transition: all 0.3s ease-in-out;
    
                &:hover {
                    background-color: #9017f5;
                    cursor: pointer;
                }
            }
        }
    }
`;

export default Contact