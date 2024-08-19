import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';

const Footer = () => {
  return (
    <MDBFooter style={{ color: '#fff', fontFamily: 'Poppins, sens-serif' }} className='text-center text-lg-start text-muted'>
      <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
        <div className='me-5 d-none d-lg-block'>
          <span style={{ color: '#fff', fontFamily: 'Poppins, sens-serif' }}  >Get connected with us on social networks:</span>
        </div>

        <div>
          <a href='https://discord.gg/6PGfR2N742' className='me-4 text-reset'>
            <MDBIcon style={{ color: '#9017f5' }} fab icon="discord" />
          </a>
        </div>
      </section>

      <section className=''>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4' style={{ color: '#fff', fontFamily: 'Poppins, sens-serif' }} >
                <MDBIcon icon="gem" className="me-3" />
                <span style={{ color: '#9017f5' }}>JR</span> Studios
              </h6>
              <p style={{ color: '#fff', fontFamily: 'Poppins, sens-serif' }} >
                JR Studios is a software company turns your ideas into code not even just code Its our creation!
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4' style={{ color: '#fff', fontFamily: 'Poppins, sens-serif' }}>Contact</h6>
              <p style={{ color: '#fff', fontFamily: 'Poppins, sens-serif' }}>
                <MDBIcon icon="home" style={{ color: '#9017f5' }} className="me-2" />
                Pakistan, District Central
              </p>
              <p style={{ color: '#fff', fontFamily: 'Poppins, sens-serif' }}>
                <MDBIcon icon="envelope" style={{ color: '#9017f5' }} className="me-3" />
                jaundev768@gmail.com
              </p>
              <p style={{ color: '#fff', fontFamily: 'Poppins, sens-serif' }}>
                <MDBIcon icon="phone" style={{ color: '#9017f5' }} className="me-3" />+92 341 3766240
              </p>
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4' style={{ color: '#fff', fontFamily: 'Poppins, sens-serif' }}>Services</h6>
              <p style={{ color: '#fff', fontFamily: 'Poppins, sens-serif' }}>
                <a href='#!' className='text-reset' >
                  Web Design
                </a>
              </p>
              <p style={{ color: '#fff', fontFamily: 'Poppins, sens-serif' }}>
                <a href='#!' className='text-reset' >
                  Web Development
                </a>
              </p>
              <p style={{ color: '#fff', fontFamily: 'Poppins, sens-serif' }}>
                <a href='#!' className='text-reset' >
                  App Development
                </a>
              </p>
              <p style={{ color: '#fff', fontFamily: 'Poppins, sens-serif' }}>
                <a href='#!' className='text-reset'>
                  Graphic Design
                </a>
              </p>
              <p style={{ color: '#fff', fontFamily: 'Poppins, sens-serif' }}>
                <a href='#!' className='text-reset' >
                  Video Editing
                </a>
              </p>
              <p style={{ color: '#fff', fontFamily: 'Poppins, sens-serif' }}>
                <a href='#!' className='text-reset' >
                  3D Modeling
                </a>
              </p>
              <p style={{ color: '#fff', fontFamily: 'Poppins, sens-serif' }}>
                <a href='#!' className='text-reset' >
                  Minecraft
                </a>
              </p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4' style={{ color: '#fff', fontFamily: 'Poppins, sens-serif' }}>Useful Links</h6>
              <p style={{ color: '#fff', fontFamily: 'Poppins, sens-serif' }}>
                <a href='#!' className='text-reset'>
                  Terms Of Service
                </a>
              </p>
              <p style={{ color: '#fff', fontFamily: 'Poppins, sens-serif' }}>
                <a href='https://docs.google.com/document/d/1EYoD4fjL2G-YV6Vq8sxtIpLt_9AXCAKh5Hip6h3DHFA/edit?usp=sharing' className='text-reset'>
                  Hand Book For Client
                </a>
              </p>
              <p style={{ color: '#fff', fontFamily: 'Poppins, sens-serif' }}>
                <a href='https://docs.google.com/document/d/1kTLWd6NY22s-oeRqC9iqt2TfKSIBqKLRCCxbY9cUncU/edit?usp=sharing' className='text-reset'>
                  Hand Book For Freelancer
                </a>
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        2024,
        <a className='text-reset fw-bold' style={{ paddingLeft: '0.5rem' }}>
          JR Studios
        </a>
      </div>
    </MDBFooter>
  )
}

export default Footer