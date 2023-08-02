/**
 * Homepage component
 */

//Import dependencies
import FindEventHeader from "../event/search/FindEventHeader";
import EventCard from "../event/EventCard";
//Import endpoint handlers for events
import { searchEvents, getAllTags } from "../../services/EventAPI";
import { useEffect, useState, useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { SearchEventsContext } from "../../props/search-events.prop";


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
    events, 
    pageCount,
    tags
  } = useContext(SearchEventsContext);

  /**
   * On startup hook, fetch api data
   */
  useEffect(() => {

    /**
     * Find a page of events with no filtering applied
     */
    async function fetchUnfilteredEventPage() {
      const allEv = (await searchEvents([], null, null, null, null, null, 0));
      setAllEvents(allEv.events);
    }


    /**
     * Find a page of events that are tagged as Rock events
     */
    async function fetchRockEvents() {

      //The id of the rock tag to filter with
      let rockTagId;

      //Fetch all possible pre-defined tags if none have been retrieved
      if (tags.get.length == 0) {
        await getAllTags()
        .then(async (data) => {
           tags.set(data);
          for (let tag of data) {
                  if (tag.name == "Rock") {
            rockTagId = tag.id;
            break;
          }
          }    
          //Find and load the rock events
          const rockEv = await searchEvents([rockTagId], null, null, null, null, null, 0);
          setRockEvents(rockEv.events);        
        });
       
      }
      //Tags already fetched, find the Rock tag id
      else {
      for (let tag of tags.get) {
              if (tag.name == "Rock") {
        rockTagId = tag.id;
        break;
      }
      }
      //Find and load the rock events
      const rockEv = await searchEvents([rockTagId], null, null, null, null, 0);
      setRockEvents(rockEv.events);              
      }

    }

    //Fetch the events to display on the homepage
    fetchUnfilteredEventPage();
    fetchRockEvents();
  }, [setAllEvents, setRockEvents]);



  //Homepage template components for event display
   let rockEventsView = <>
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
    </>;

let nearbyEventsView = <><div className="home-row">
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
  {allEvents.map((event, i) => (
    <SwiperSlide key={i}>
      <EventCard event={event} />
    </SwiperSlide>
  ))}
</Swiper>
</div></>;

let allEventsView = <>
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
          {allEvents.map((event, i) => (
            <SwiperSlide key={i}>
              <EventCard event={event} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div></>;


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
