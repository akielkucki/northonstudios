import React, { useState } from 'react'
import { FadeText } from "@/components/magicui/fade-text";
import styled from 'styled-components';
import { ContactService } from '../services/apiService';

const Contact = () => {
  const [formData, setFormData] = useState({
    businessName: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseMessage('');
    setErrorMessage('');

    const wordCount = formData.message.trim().length;
    if (wordCount < 50) {
      setErrorMessage('Your message must be at least 50 words.');
      setLoading(false);
      return;
    }

    try {
      const res = await ContactService.contact(formData)

        if (res && res.data.error) {
          return setErrorMessage(res.data.error)
        }

        setResponseMessage(res.data.message);
        setFormData({
          businessName: '',
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          message: '',
        });
    } catch (error) {
      setErrorMessage('Oops! Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

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
      <Form onSubmit={handleSubmit}>
        <span>Fill out this form to get our services!</span>
        <input
          type="text"
          placeholder="Business Name"
          name="businessName"
          value={formData.businessName}
          onChange={handleChange}
          required
        />
        <div className="usernames">
          <input
            type="text"
            placeholder="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          placeholder="Phone Number"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <textarea
          rows="7"
          placeholder="Message (Minimum 50 words)"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
        />
        <span className='wordCount' style={{
          color: formData.message.trim().length < 50 ? 'red' : '#9017f5'
        }}>{formData.message.trim().length}/50</span>
        <button type="submit" disabled={loading}>
          {loading ? 'Sending...' : 'Get Started'}
        </button>
        {responseMessage && <ResponseMessage error={true}>{responseMessage}</ResponseMessage>}
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </Form>
    </Wrapper>
  )
}

const Wrapper = styled.section`
    width: 100%;
    padding: 1.5rem;
    margin: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    background-image: url(https://templatekit.jegtheme.com/pirus/wp-content/uploads/sites/43/2024/04/bg-footer2.jpg);

    .contact {
        width: 40%;
        background-position: center center;
        background-size: cover;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        color: #fff;
        font-family: Poppins, sens-serif;
        gap: 4rem;
        border-radius: 1rem;
        padding: 3rem 1rem;

        @media (max-width: ${({ theme }) => theme.media.mobile}) {

        }

        .contact-head {
            display: flex;
            flex-direction: column;
            align-items: flex-start; 
            gap: 1.5rem;

            h1 {
                font-size: 3rem;
                line-height: 40px;
                text-align: start;

                @media (max-width: ${({ theme }) => theme.media.tab}) {
                    font-size: 2.3rem;
                }
            }


            p {
                color: gray;
                width: 60%;
                text-align: start;

                @media (max-width: ${({ theme }) => theme.media.mobile}) {
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  gap: 1rem;
  border-radius: 1rem;
  width: 45rem;

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    width: 100%;
  }

  span {
    color: #fff;
    font-size: 2rem;
    text-align: center;
    margin: 1rem;
  }

  .usernames {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    
    @media (max-width: ${({ theme }) => theme.media.mobile}) {
      gap: 1rem;
      width: 100%;
    }
  }


  input,
  textarea {
    font-family: Poppins, sans-serif;
    background: #000;
    border: 1px solid #9017f5;
    outline: none;
    border-radius: 1rem;
    font-size: 1rem;
    padding: 1rem;
    color: #fff;
    text-transform: unset;
  }

  .wordCount {
    font-size: 1.5rem;
    text-align: right;
  }

  button {
    font-family: Poppins, sans-serif;
    border: 1px solid #9017f5;
    border-radius: 5px;
    padding: 0.8rem 2rem;
    font-size: 1rem;
    color: #fff;
    transition: all 0.3s ease-in-out;
    background-color: #000;
    
    &:hover {
        background-color: #9017f5;
        cursor: pointer;
    }

    &:disabled {
      background-color: grey;
      cursor: not-allowed;
    }
  }
`;

const ResponseMessage = styled.p`
  text-align: center;
  margin-top: 1rem;
  font-family: Poppins, sans-serif;
  color: #9017f5;
`;

const ErrorMessage = styled.p`
  text-align: center;
  margin-top: 1rem;
  font-family: Poppins, sans-serif;
  color: red;
`;

export default Contact