/**
 * Tag filter components
 */


//Import dependencies
import {
    Chip,
    Grid,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
//Import search event props
import { SearchEventsContext, SearchEventFiltersContext } from "../../../../props/search-events.prop";


/**
 * Event search header tag selection
 * @returns 
 */
export const HeaderSelectedTags = () => {


    /**
     * Get all tags found in db
     */
    const {
        tags
    } = useContext(SearchEventsContext);

    /**
     * Prop context for tag filtering
     */
    const {
        change,
        tagSelection,
        chipData
    } = useContext(SearchEventFiltersContext);


    /**
     * Handles new tag selection display chip
     * @param {*} genre 
     */
    const chipGenreSelect = (genre) => {
        let newKey = chipData.get.length + 1;
        let temp = chipData.get;
        temp.push({
            key: newKey,
            searchCategory: "genre",
            label: genre.name,
            value: genre.id,
        });
        chipData.set(temp);
        change.set(!change.get);
    };



    //The HTML template
    return (
        <div className="find-event-tags">
          {tags.get.map((tag, i) => (
            <Chip
              sx={{
                backgroundColor: "#7759A6",
                color: "white",
                margin: "1%",
              }}
              key={i}
              label={tag.name}
              id={tag.id}
              color="default"
              //onClick={() => chipHandler(tag.name)}
            />
          ))}
        </div>  
    );
};





/**
 * Search page-only tag filtering
 * @returns 
 */
export const SearchSelectedTags = () => {


    /**
     * Get all tags found in db
     */
    const {
        tags
    } = useContext(SearchEventsContext);

    /**
     * Prop context for tag filtering
     */
    const {
        change,
        tagSelection,
        chipData
    } = useContext(SearchEventFiltersContext);


    /**
     * Handles new tag selection display chip
     * @param {*} genre 
     */
    const chipGenreSelect = (genre) => {
        let newKey = chipData.get.length + 1;
        let temp = chipData.get;
        temp.push({
            key: newKey,
            searchCategory: "genre",
            label: genre.name,
            value: genre.id,
        });
        chipData.set(temp);
        change.set(!change.get);
    };



    //The HTML template
    return (
        <div>
            <h2>Genre</h2>
            <Grid container rowSpacing={2} columnSpacing={2}>
                {tags.get.map((tag, i) => (
                    <Grid item xs={4} key={i}>
                        <Chip
                            sx={{
                                width: 1,
                                backgroundColor: "#7759A6",
                                color: "white",
                                margin: "4%",
                            }}
                            label={tag.name}
                            id={tag.id}
                            color="default"
                            onClick={() => chipGenreSelect(tag)}
                        />
                    </Grid>
                ))}
            </Grid>
            <Link id="view-more-tags">View more</Link>
        </div>
    );
};


