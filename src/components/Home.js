import FindEventHeader from "./FindEventHeader";
import EventCard from "./EventCard";
import { register } from "swiper/element/bundle";
import { getAllEvents } from "../utils/utils";
import { useEffect, useState } from "react";

const Home = () => {
  register();

  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);


  useEffect(() => {
    async function fetchEvents(){
      setLoading(true);
      const data = await getAllEvents();
      setEvents(data);
    }

    fetchEvents();
  },[setEvents])

  return (
    <section className="home-section">
      <FindEventHeader />
      <div className="home-row">
        <h1>Music events nearby</h1>
        <swiper-container
          slides-per-view="4"
          speed="500"
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
        <h1>Country music events</h1>
        <swiper-container
          slides-per-view="4"
          speed="500"
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
    </section>
  );
};

export default Home;
