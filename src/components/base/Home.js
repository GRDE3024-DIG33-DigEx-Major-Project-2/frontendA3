/**
 * Homepage component
 */

//Import dependencies
import FindEventHeader from "../event/search/FindEventHeader";
import EventCard from "../event/display/EventCard";
//Import endpoint handlers for events
import { isFavourited, searchEvents  } from "../../services/EventAPI";
import { useEffect, useState, useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import "swiper/css/navigation";
import { SearchEventsContext } from "../../props/search-events.prop";
import { PartialLoadSpinner } from "../shared/LoadingSpinner";
import { getUser } from "../../utils/localStorage";
import { logoutErrorHandler } from "../../services/AuthAPI";
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
    const {
      tags,
      fetchStatus
    } = useContext(SearchEventsContext);

  const user = getUser();

//Extract the logic to fetch favorite status of events into a reusable function
async function fetchEventsWithFavouriteStatus(events) {
  if (!user || user.type !== "attendee") {
    return events;
  }

  try {
    const response = await isFavourited(events.map(x => x.event.id));
    return events.map(eventContainer => {
      const favEvent = response.data.favStatuses.find(fav => fav.eventId === eventContainer.event.id);
      return {
        ...eventContainer,
        event: favEvent ? { ...eventContainer.event, ...favEvent } : eventContainer.event
      };
    });
  } catch (error) {
    logoutErrorHandler(error);
    return events;
  }
}

//Extract the logic to get the Rock tag ID
function getTagId() {
  for (let tag of tags.get) {
    if (tag.name === GENRES.rock) {
      return tag.id;
    }
  }
  return null;
}

//Refactor the useEffect hook
useEffect(() => {
  async function fetchEventData() {
    //Fetch unfiltered events
    fetchStatus.set(true);
    const allEv = await searchEvents([], null, null, null, null, null, 0);
    const allEventsWithFavourites = await fetchEventsWithFavouriteStatus(allEv.events);
    setAllEvents(allEventsWithFavourites);

    //Fetch genre-specific events
    const specificTagId = getTagId(GENRES.rock);
    if (specificTagId) {
      const rockEv = await searchEvents([specificTagId], null, null, null, null, null, 0);
      const rockEventsWithFavourites = await fetchEventsWithFavouriteStatus(rockEv.events);
      setRockEvents(rockEventsWithFavourites);
    }

    fetchStatus.set(false);
  }

  fetchEventData();
}, []);



  //Homepage template components for event display
  let rockEventsView =
    <> 
          <div className="home-row">
            <h1>Rock events</h1>
           { (!fetchStatus.get) ?
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
            </Swiper> : <PartialLoadSpinner></PartialLoadSpinner>
            }
          </div>
    </>;

  let nearbyEventsView = <>
  <div className="home-row">
    <h1>Nearby events</h1>
    { (!fetchStatus.get) ?
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      className="event-carousel"
      slidesPerView="1"
      spaceBetween="5"
      speed="500"
      cssMode="true"
      navigation
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
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
    </Swiper> : <PartialLoadSpinner></PartialLoadSpinner>
}
  </div>
  </>;

  let allEventsView = <>
    <div className="home-row">
      <h1>All events</h1>
      { (!fetchStatus.get) ?
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
      </Swiper> : <PartialLoadSpinner></PartialLoadSpinner>
}
    </div>
    </>;


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
