import FindEventHeader from "../event/FindEventHeader";
import EventCard from "../event/EventCard";
import { register } from "swiper/element/bundle";
import { getAllEvents } from "../../utils/utils";
import { useEffect, useState } from "react";

const Home = () => {
  register();
  const [events, setEvents] = useState([]);
  const [rockEvents, setRockEvents] = useState([]);


  useEffect(() => {
    async function fetchAllEvents(){
      const allEv = await getAllEvents();
      setEvents(allEv);
    }

    async function fetchRockEvents(){
      const rockEv = await getAllEvents("9a58b4a6-af1d-4102-b074-6cc5f1fda00e");
      setRockEvents(rockEv);
    }

    fetchAllEvents();
    fetchRockEvents();
  },[setEvents, setRockEvents])


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
        <h1>Rock music events</h1>
        <swiper-container
          slides-per-view="4"
          speed="500"
          css-mode="true"
          className="event-carousel"
        >
          {rockEvents.map((event, i) => (
            <swiper-slide key={i}>
              <EventCard event={event} />
            </swiper-slide>
          ))}
        </swiper-container>
      </div>
      <div className="home-row">
        <h1>All events</h1>
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
