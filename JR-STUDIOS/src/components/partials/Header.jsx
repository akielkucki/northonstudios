import React from 'react'
import styled from 'styled-components'
import { FadeText } from "@/components/magicui/fade-text";
import Particles from "@/components/magicui/particles";
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <Wrapper>
      <Particles
        className="absolute inset-0 particles"
        quantity={1000}
        ease={10}
        color={'#fff'}
        refresh
      />
      <div className="head">
        <h2><span>JR</span> STUDIOS</h2>
        <ul>
          <NavLink id='nav_1'>HOME</NavLink>
          <NavLink id='nav_2'>ABOUT US</NavLink>
          <NavLink id='nav_3'>SERVICES</NavLink>
          <NavLink id='nav_4'>PROJECTS</NavLink>
          <NavLink id='nav_5'>TESTIMONIALS</NavLink>
        </ul>
        <button id="nav_6">CONTACT US</button>
      </div>
      <div className="banner">
        <div className="main">
        <h4>
          <FadeText
            className="text-4xl font-bold dark:text-white"
            direction="up"
            framerProps={{
              show: { transition: { delay: 0 } },
            }}
            text="JR STUDIOS"
          />
        </h4>
        <h1>
          <FadeText
            className="text-4xl font-bold dark:text-white"
            direction="up"
            framerProps={{
              show: { transition: { delay: 0.3 } },
            }}
            text="Empowering Brands In The Tech Age"
          />
        </h1>
        <p>
          <FadeText
            className="text-4xl font-bold dark:text-white"
            direction="up"
            framerProps={{
              show: { transition: { delay: 0.5 } },
            }}
            text="JR Studios is a software company turns your ideas into code not even just code Its our creation!"
          />
        </p>
        <button>
          <FadeText
            className="text-4xl font-bold dark:text-white"
            direction="up"
            framerProps={{
              show: { transition: { delay: 1 } },
            }}
            text="INQUIRE"
          />
        </button>
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  background: transparent;
  height: 100vh;
  
  .particles {
    width: 100%;
    height: 100vh;
    z-index: -1;

    canvas {
      width: 100%;
      height: 100% !important; 
    }
  }
    
  .head {
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-around;
    padding: 1rem;
    background-filter: blur(10px);

    h2 {
      font-size: 2rem;
      font-family: Poppins, sans-serif;
      color: #fff;

      span {
        color: #9017f5;
      }
    }

    ul {
      border: 1px solid gray;
      border-radius: 5rem;
      padding: 5px;
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 2.5rem;

      a {
        font-size: 15px;
        font-family: Poppins, sans-serif;
        color: #fff;
        padding: 0.8rem 1.5rem;
        border-radius: 5rem;
        transition: all 0.3s ease-in;

        &:focus {
          background-color: #fff;
          color: #9017f5;
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
    
      &:hover {
        background-color: #9017f5;
      }
    }
  }

  .banner {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .main {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 60%;
      padding-bottom: 5rem;
      gap: 0.5rem;
      font-family: Poppins, sans-serif;
      color: #fff;

      @media (max-width: ${({theme}) => theme.media.tab}) {
          width: 90%;
      }

      h4 {
        border: 1px solid #9017f5;
        border-radius: 5rem;
        padding: 5px 1rem;
        font-size: 1.3rem;


        @media (max-width: 768px) {
          font-size: 1rem;
        }
      }

      h1 {
        font-size: 5rem;
        width: 100%;
        text-align: center;
        word-break: break-word;

        @media (max-width: 1400px) {
          font-size: 4rem;
        }

        @media (max-width: 1200px) {
          font-size: 3.5rem;
        }

        @media (max-width: 992px) {
          font-size: 3.5rem;
        }

        @media (max-width: 768px) {
          font-size: 2.5rem;
        }

        @media (max-width: 576px) {
          font-size: 2rem;
        }
      }

      p {
        font-size: 1rem;
        width: 60%;
        text-align: center;
        color: gray;

        @media (max-width: 768px) {
          width: 80%;
        }

        @media (max-width: 576px) {
          width: 90%;
        }
      }

      button {
        padding: 1rem 2rem;
        margin-top: 1rem;
        background-color: #9017f5;
        border-radius: 5rem;
        cursor: pointer;
        transition: all 0.3s ease-in;

        &:hover {
          background-color: #fff;
          color: #000;
        }


        @media (max-width: ${({theme}) => theme.media.mobile}) {
          padding: 1rem 1.5rem;
        }
      }
    }
  }
`

export default Header
