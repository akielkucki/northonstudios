import React from 'react'
import { FadeText } from "@/components/magicui/fade-text";
import styled from 'styled-components'
import { BorderBeam } from "@/components/magicui/border-beam";
import BlurFade from "@/components/magicui/blur-fade";

const ClientsBanner = () => {
    return (
        <Wrapper>
            <div className="client-banner-info">
                <div className="banner-head">
                    <h4>
                        <FadeText
                            className="text-4xl font-bold  dark:text-white"
                            direction="up"
                            framerProps={{
                                show: { transition: { delay: 0.2 } },
                            }}
                            text="WHY US?"
                        />
                    </h4>
                    <h1>
                        <FadeText
                            className="text-4xl font-bold dark:text-white"
                            direction="up"
                            framerProps={{
                                show: { transition: { delay: 0.2 } },
                            }}
                            text="Why Our Clients Choose JR Studios"
                        />
                    </h1>
                </div>
                <div className="banner-list">
                    <div className="list">
                        <div className="point">
                            <div className="info">
                                <h3><i className="fa-solid fa-stopwatch"></i> Fast Response</h3>
                                <p>We prioritize quick and efficient communication to ensure your projects stay on track and your concerns are addressed promptly.</p>
                            </div>
                        </div>
                        <div className="point">
                            <div className="info">
                                <h3><i className="fa-solid fa-globe"></i> World Class Freelancers</h3>
                                <p>Our team comprises highly skilled freelancers from around the globe, each bringing unique expertise to deliver exceptional results.</p>
                            </div>
                        </div>
                        <div className="point">
                            <div className="info">
                                <h3><i className="fa-solid fa-thumbs-up"></i> Best Quality</h3>
                                <p>We are committed to delivering the highest quality in every project, ensuring that our work consistently meets and exceeds expectations.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <img src="/imgs/thanks.png" alt="thanks-img" />
        </Wrapper>
    )
}

const Wrapper = styled.section`
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 5rem;
    justify-content: center;
    gap: 2rem;

    @media (max-width: ${({theme}) => theme.media.mobile}) {
        padding: 3rem 1rem;
    }

    img {
        width: 40%;
    }

    @media (max-width: ${({ theme }) => theme.media.tab}) {
        flex-direction: column-reverse;

        img {
            width: 100%;
            height: 50vh;
        }
    }

    .client-banner-info {
        width: 50%;
        color: #fff;
        font-family: Poppins, sens-serif;

        @media (max-width: ${({ theme }) => theme.media.tab}) {
            width: 100%;
        }
        
        .banner-head {
            padding: 1rem;
            text-align: left;
            color: #fff;
            align-items: flex-start;
            display: flex;
            flex-direction: column;
            font-family: Poppins, sens-serif;
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
                font-size: 2.5rem;

                @media (max-width: ${({theme}) => theme.media.mobile}) {
                    font-size: 2rem;
                    padding: 1rem 0rem;
                }
            }
        }
    }

    .banner-list {
        color: #fff;
        font-family: Poppins, sens-serif;
        
        .list {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            padding: 1rem;

            .point {
                display: flex;
                flex-direction: row;
                align-items: flex-start;
                gap: 1rem;

                .info {

                    h3 {
                        font-size: 2rem;
                        padding-bottom: 1rem;
                        font-weight: bold;

                        i {
                            color: #9017f5;
                        }
                    }

                    p {
                        font-size: 1rem;
                        color: #bebcbc;
                        width: 80%;
                    }
                }
            }
        }
    }
`

export default ClientsBanner