/**
 * Tag filter components
 */


//Import dependencies
import {
    Chip,
    Grid,
} from "@mui/material";
import { useContext } from "react";
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
     * Handles tag selection display chip
     * @param {*} genre 
     */
    const toggleGenreChip = (genre) => {
        let newKey = chipData.get.length + 1;
        let temp = chipData.get;

        //Select tag
        if (!temp.find(x => x.value === genre.id)) {
            temp.push({
                key: newKey,
                searchCategory: "genre",
                label: genre.name,
                value: genre.id,
            });
            tagSelection.set([...tagSelection.get, genre.id]);
        }
        //Deselect tag
        else if (temp.find(x => x.value === genre.id)) {
            temp = temp.filter((tag) => tag.value !== genre.id);
            if (Array.isArray(tagSelection.get))
                tagSelection.set(tagSelection.get.filter((tagId) => tagId !== genre.id));
            else
                tagSelection.set([genre.id]);
        }
        chipData.set(temp);
        change.set(!change.get);
    };



    //The HTML template
    return (
        <div className="find-event-tags">
            {tags.get.map((tag, i) => (
                <Chip
                    sx={{
                        backgroundColor: chipData.get.find(x => x.value === tag.id) ? "#FF9800" : "#7759A6",
                        color: "white",
                        margin: "1%",
                    }}
                    key={i}
                    label={tag.name}
                    id={tag.id}
                    color="default"
                    onClick={() => toggleGenreChip(tag)}
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
     * Handles tag selection display chip
     * @param {*} genre 
     */
    const toggleGenreChip = (genre) => {
        let newKey = chipData.get.length + 1;
        let temp = chipData.get;

        //Select tag
        if (!temp.find(x => x.value === genre.id)) {
            temp.push({
                key: newKey,
                searchCategory: "genre",
                label: genre.name,
                value: genre.id,
            });
            tagSelection.set([...tagSelection.get, genre.id]);
        }
        //Deselect tag
        else if (temp.find(x => x.value === genre.id)) {
            temp = temp.filter((tag) => tag.value !== genre.id);
            if (Array.isArray(tagSelection.get))
                tagSelection.set(tagSelection.get.filter((tagId) => tagId !== genre.id));
            else
                tagSelection.set([genre.id]);
        }
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
                                backgroundColor: chipData.get.find(x => x.value === tag.id) ? "#FF9800" : "#7759A6",
                                color: "white",
                                margin: "4%",
                            }}
                            label={tag.name}
                            id={tag.id}
                            color="default"
                            onClick={() => toggleGenreChip(tag)}
                        />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};


