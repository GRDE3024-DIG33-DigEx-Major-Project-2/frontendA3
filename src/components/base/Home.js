/**
 * Homepage component
 */

//Import dependencies
import FindEventHeader from "../event/search/FindEventHeader";
import EventCard from "../event/display/EventCard";
//Import endpoint handlers for events
import { isFavourited, searchEvents } from "../../services/EventAPI";
import { useEffect, useState, useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css/navigation";
import { SearchEventsContext } from "../../props/search-events.prop";
import { PartialLoadSpinner } from "../shared/LoadingSpinner";
import { getUser } from "../../utils/localStorage";
import { GENRES } from "../../utils/constants.util";

/**
 * Builds and renders the homepage component
 * @returns Homepage component render
 */
const Home = () => {
  //Events to display on homepage carousels
  const [rockEvents, setRockEvents] = useState([]);
  const [allEvents, setAllEvents] = useState([]);

  /**
   * Prop context for search event data
   */
  const { tags, fetchStatus } = useContext(SearchEventsContext);

  //User data
  const user = getUser();

  /**
   * Extract the logic to fetch favorite status of events into a reusable function
   * @param {*} events 
   * @returns Fetched events
   */
  async function fetchEventsWithFavouriteStatus(events) {
    if (!user || user.type !== "attendee") {
      return events;
    }

    const response = await isFavourited(events.map((x) => x.event.id));
    return events.map((eventContainer) => {
      const favEvent = response.data.favStatuses.find(
        (fav) => fav.eventId === eventContainer.event.id
      );
      return {
        ...eventContainer,
        event: favEvent
          ? { ...eventContainer.event, ...favEvent }
          : eventContainer.event,
      };
    });
  }

  /**
   * Get the specified tag name's id
   * @returns The tag name's id, else null if not found
   */
  function getTagId() {
    for (let tag of tags.get) {
      if (tag.name === GENRES.rock) {
        return tag.id;
      }
    }
    return null;
  }


  /**
   * Fetch carousel events
   */
  useEffect(() => {
    async function fetchEventData() {
      //Fetch unfiltered events
      fetchStatus.set(true);
      const allEv = await searchEvents([], null, null, null, null, null, 0);
      const allEventsWithFavourites = await fetchEventsWithFavouriteStatus(
        allEv.events
      );
      setAllEvents(allEventsWithFavourites);

      //Fetch genre-specific events
      const specificTagId = getTagId();
      if (specificTagId) {
        const rockEv = await searchEvents(
          [specificTagId],
          null,
          null,
          null,
          null,
          null,
          0
        );
        const rockEventsWithFavourites = await fetchEventsWithFavouriteStatus(
          rockEv.events
        );
        setRockEvents(rockEventsWithFavourites);
      }

      fetchStatus.set(false);
    }

    fetchEventData();
  }, []);

  //Homepage template components for event display
  let rockEventsView = (
    <>
      <div className="home-row">
        <h2>Rock events</h2>
        {!fetchStatus.get ? (
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            className="event-carousel"
            slidesPerView="1"
            spaceBetween="5"
            speed="500"
            cssMode="true"
            navigation
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
        ) : (
          <PartialLoadSpinner></PartialLoadSpinner>
        )}
      </div>
    </>
  );

  //Template for nearby events
  let nearbyEventsView = (
    <>
      <div className="home-row">
        <h2>Nearby events</h2>
        {!fetchStatus.get ? (
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            className="event-carousel"
            slidesPerView="1"
            spaceBetween="5"
            speed="500"
            cssMode="true"
            navigation
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log("slide change")}
            breakpoints={{
              744: { slidesPerView: 2 },
              1100: { slidesPerView: 3 },
              1460: { slidesPerView: 4 },
            }}
          >
            {allEvents.map((event, i) => (
              <SwiperSlide key={i}>
                <EventCard event={event} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <PartialLoadSpinner></PartialLoadSpinner>
        )}
      </div>
    </>
  );

  let allEventsView = (
    <>
      <div className="home-row">
        <h2>All events</h2>
        {!fetchStatus.get ? (
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            className="event-carousel"
            slidesPerView="1"
            spaceBetween="5"
            speed="500"
            cssMode="true"
            navigation
            breakpoints={{
              744: { slidesPerView: 2 },
              1100: { slidesPerView: 3 },
              1460: { slidesPerView: 4 },
            }}
          >
            {allEvents.map((event, i) => (
              <SwiperSlide key={i}>
                <EventCard event={event} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <PartialLoadSpinner></PartialLoadSpinner>
        )}
      </div>
    </>
  );

  //The html homepage template
  return (
    <section className="home-section">
      <FindEventHeader />
      {nearbyEventsView}
      {rockEventsView}
      {allEventsView}
    </section>
  );
};

//Export the homepage component
export default Home;