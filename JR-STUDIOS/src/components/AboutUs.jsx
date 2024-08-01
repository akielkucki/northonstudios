import React from 'react'
import { FadeText } from "@/components/magicui/fade-text";
import styled from 'styled-components'
import BlurFade from "@/components/magicui/blur-fade";

const AboutUs = () => {
    return (
        <Wrapper>
            <div className="head-about">
                <h4>
                    <FadeText
                        className="text-4xl font-bold  dark:text-white"
                        direction="up"
                        framerProps={{
                            show: { transition: { delay: 0.2 } },
                        }}
                        text="ABOUT US"
                    />
                </h4>
                <h1>
                    <FadeText
                        className="text-4xl font-bold dark:text-white"
                        direction="up"
                        framerProps={{
                            show: { transition: { delay: 0.2 } },
                        }}
                        text="We Are More Than Agency"
                    />
                </h1>
            </div>
            <div className="about">
                <div className="img-logo">
                    <BlurFade delay={0.5} inView>
                        <img
                            className="mb-4 size-full rounded-lg object-contain"
                            src={'/imgs/logo.png'}
                            alt={`JR-Studios-Logo`}
                        />
                    </BlurFade>
                </div>
                <div className="info">
                    <p>
                        <FadeText
                            className="text-4xl font-bold  dark:text-white"
                            direction="up"
                            framerProps={{
                                show: { transition: { delay: 0.5 } },
                            }}
                            text="JR Studios, your go-to tech agency for all things digital. We specialize in crafting innovative web and app solutions, creating stunning graphic designs, and producing intricate 3D models. Our mission is to turn your ideas into reality, blending creativity with technology to empower brands in the tech age. At JR Studios, it's not just about code—it's about creation. Let's build something extraordinary together!"
                        />
                    </p>
                </div>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.section`
    background-color: #14151B;
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 5rem 3rem;
    margin-top: 5rem;

    @media (max-width: ${({theme}) => theme.media.mobile}) {
        padding: 3rem 1rem;
    }

    .head-about {
        text-align: left;
        color: #fff;
        align-items: flex-start;
        display: flex;
        flex-direction: column;
        font-family: Poppins, sens-serif;

        h4 {
            border: 1px solid #9017f5;
            border-radius: 5rem;
            padding: 5px 1rem;
            text-align: center;
        }

        h1 {
            font-size: 2.5rem;
        }
    }

    .about {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        gap: 3rem;
        padding: 4rem;
        width: 100%;

        @media (max-width: ${({theme}) => theme.media.mobile}) {
            flex-direction: column;
            padding: 4rem 1rem;
        }

        .info {
            width: 50%;

            @media (max-width: ${({theme}) => theme.media.mobile}) {
                width: 100%;
            }

            p {
                color: #fff;
                word-break: break-word;
                font-family: Poppins, sens-serif;

                span {
                    font-weight: 400;
                    word-spacing: 5px;
                    line-height: 1.8rem;
                }
            }
        }

        .img-logo {
            width: 30%;

            @media (max-width: ${({theme}) => theme.media.mobile}) {
                width: 100%;
            }
        }
    }
`

export default AboutUs