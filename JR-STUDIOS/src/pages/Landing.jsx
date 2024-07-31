import React from 'react'
import styled from 'styled-components'
import AboutUs from '../components/AboutUs'
import Header from '../components/partials/Header'
import Services from '../components/Services'
import ClientsBanner from '../components/ClientsBanner'
import Projects from '../components/Projects'
import Testimonials from '../components/Testimonials'
import Contact from '../components/Contact'

const Landing = () => {
  return (
    <Wrapper>
      <Header />
      <AboutUs id="about-us" />
      <Services id="services" />
      <ClientsBanner id="client-banner" />
      <Projects id="projects" />
      <Testimonials id="testimonials" />
      <Contact />
    </Wrapper>
  )
}

const Wrapper = styled.section``

export default Landing