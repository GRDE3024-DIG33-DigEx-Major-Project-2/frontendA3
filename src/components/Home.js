import FindEventHeader from "./FindEventHeader";
import EventCard from "./EventCard";
import { register } from "swiper/element/bundle";

const Home = () => {
  register();

  var events = [
    {
      name: "Eagles of Death Metal",
      date:"23rd July 2023",
      location: "Allianz Stadium",
      img: "../Event-Image1.png",
    },
    {
      name: "Arlo Parks",
      date:"23rd July 2023",
      location: "Sydney Cricket Ground",
      img: "../Event-Image2.png",
    },
    {
      name: "Beartooth",
      date:"23rd July 2023",
      location: "Parramatta Community Hall",
      img: "../Event-Image3.png",
    },
    {
      name: "The Milk Carton",
      date:"23rd July 2023",
      location: "4 Pines Park",
      img: "../Event-Image4.png"
    },
    {
      name: "The Amity Affliction",
      date:"23rd July 2023",
      location: "Accor Stadium",
      img: "../Event-Image5.png"
    },
    {
      name: "A Day To Remember",
      date:"23rd July 2023",
      location: "Sydney Showground",
      img: "../Event-Image6.png"
    },
  ];


  return (
    <section className="home-section">
      <FindEventHeader />
      <div className="home-row">
        <h1>Music events nearby</h1>
        <swiper-container
          slides-per-view="4"
          speed="500"
          loop="true"
          css-mode="true"
          className="event-carousel"
        >
          {events.map((event, i) => (
            <swiper-slide key={i}>
              <EventCard event={event} />
            </swiper-slide>
          ))}
        </swiper-container>
      </div>
      <div className="home-row">
        <h1>Dance music events</h1>
        <swiper-container
          slides-per-view="4"
          speed="500"
          loop="true"
          css-mode="true"
        >
          {events.map((event, i) => (
            <swiper-slide key={i}>
              <EventCard event={event} />
            </swiper-slide>
          ))}
        </swiper-container>
      </div>
      <div className="home-row">
        <h1>Country music events</h1>
        <swiper-container
          slides-per-view="4"
          speed="500"
          loop="true"
          css-mode="true"
        >
          {events.map((event, i) => (
            <swiper-slide key={i}>
              <EventCard event={event} />
            </swiper-slide>
          ))}
        </swiper-container>
      </div>
    </section>
  );
};

export default Home;
