import FindEventHeader from "../event/FindEventHeader";
import EventCard from "../event/EventCard";
import { getAllEvents } from "../../utils/utils";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const Home = () => {
  const [events, setEvents] = useState([]);
  const [rockEvents, setRockEvents] = useState([]);

  useEffect(() => {
    async function fetchAllEvents() {
      const allEv = await getAllEvents();
      setEvents(allEv);
    }

    async function fetchRockEvents() {
      const rockEv = await getAllEvents("9a58b4a6-af1d-4102-b074-6cc5f1fda00e");
      setRockEvents(rockEv);
    }

    fetchAllEvents();
    fetchRockEvents();
  }, [setEvents, setRockEvents]);

  return (
    <section className="home-section">
      <FindEventHeader />
      <div className="home-row">
        <h1>Music events nearby</h1>
        <Swiper
          className="event-carousel"
          slidesPerView="1"
          spaceBetween="5"
          speed="500"
          cssMode="true"
          breakpoints={{
            744: { slidesPerView: 2 },
            1100: { slidesPerView: 3 },
            1460: { slidesPerView: 4 },
          }}
        >
          {events.map((event, i) => (
            <SwiperSlide key={i}>
              <EventCard event={event} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="home-row">
        <h1>Rock music events</h1>
        <Swiper
          className="event-carousel"
          slidesPerView="1"
          spaceBetween="5"
          speed="500"
          cssMode="true"
          breakpoints={{
            744: { slidesPerView: 2 },
            1100: { slidesPerView: 3 },
            1460: { slidesPerView: 4 },
          }}
        >
          {rockEvents.map((event, i) => (
            <SwiperSlide key={i}>
              <EventCard event={event} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="home-row">
        <h1>All events</h1>
        <Swiper
          className="event-carousel"
          slidesPerView="1"
          spaceBetween="5"
          speed="500"
          cssMode="true"
          breakpoints={{
            744: { slidesPerView: 2 },
            1100: { slidesPerView: 3 },
            1460: { slidesPerView: 4 },
          }}
        >
          {events.map((event, i) => (
            <SwiperSlide key={i}>
              <EventCard event={event} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Home;
