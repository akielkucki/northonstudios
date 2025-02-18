import React from "react";
import Slider from "react-slick";
import styled from "styled-components";
import { FadeText } from "@/components/magicui/fade-text";
import "slick-carousel/slick/slick.css"; 
import { BorderBeam } from "@/components/magicui/border-beam";
import "slick-carousel/slick/slick-theme.css";

const reviews = [
  {
    name: "Ilanox",
    username: "@ilanox",
    body: "Did a great job, really like his work!",
    img: "/testimonials-img/ilanox.png",
  },
  {
    name: "Pilot",
    username: "@pilot685",
    body: "Everything works as intended.",
    img: "/testimonials-img/pilot.gif",
  },
  {
    name: "Chase",
    username: "@policechase",
    body: "Awesome Developer and product!!!",
    img: "/testimonials-img/chase.jpeg",
  },
  {
    name: "Holy",
    username: "@holy",
    body: "Amazing devs, They are great to work with. Nice and friendly, understanding and goes beyond to deliver exactly what you want for a very very fair price. Definitely would recommend for anyone looking for a web work. Completes it in time and helps you along the way with every single step. Will definitely be asking for JR Studios anytime I need some dev work !! :)",
    img: "/testimonials-img/holy.webp",
  },
];

const Testimonials = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
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
      <div className="head-testemonials">
        <h4>
          <FadeText
            className="text-4xl font-bold  dark:text-white"
            direction="up"
            framerProps={{
              show: { transition: { delay: 0.2 } },
            }}
            text="TESTIMONIALS"
          />
        </h4>
        <h1>
          <FadeText
            className="text-4xl font-bold dark:text-white"
            direction="up"
            framerProps={{
              show: { transition: { delay: 0.2 } },
            }}
            text="What People Say About Us"
          />
        </h1>
      </div>
      <Slider {...settings}>
        {reviews.map((review) => (
          <div className="review-card" key={review.username}>
            <div className="card-head">
              <img src={review.img} alt={review.name} />
              <div className="card-users">
                <h3>{review.name}</h3>
                <h2>{review.username}</h2>
              </div>
            </div>
            <p>{review.body}</p>
          </div>
        ))}
      </Slider>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  width: 100%;
  padding: 4rem;

  @media (max-width: ${({theme}) => theme.media.mobile}) {
    padding: 2rem;
  }

  .head-testemonials {
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    font-family: Poppins, sans-serif;

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
      text-align: center;

      @media (max-width: ${({theme}) => theme.media.mobile}) {
        font-size: 2.8rem;
        padding-top: 1rem;
      }
    }
  }

  .slick-slider {
    margin-top: 3rem;

    .slick-slide {
      padding: 0 1rem;
    }
  }

  .review-card {
    color: #fff;
    font-family: Poppins, sans-serif;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    border: 1px solid gray;
    border-radius: 0.5rem;
    padding: 1rem;
    text-align: left;
    background: #000; 

    .card-head {
      display: flex;
      flex-direction: row;
      gap: 2rem;
      padding-bottom: 1rem;
      align-items: center;

      img {
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
      }
    }

    .card-users {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      align-items: flex-start;

      h3 {
        font-size: 1.5rem;
      }

      h2 {
        color: gray;
      }
    }

    p {
      width: 100%;
    }
  }
`;

export default Testimonials;
