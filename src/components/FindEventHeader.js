import { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { MenuItem, Select, Chip } from "@mui/material";

const FindEventHeader = () => {

    const [location, setLocation] = useState("-");
    const [date, setDate] = useState(null);
    const [genre, setGenre] = useState("country");
    const [selected, setSelected] = useState(false);

    const searchHandler = () => {
        console.log("Search event fired");
        console.log(location, date, genre);
    }

    const chipHandler = (genre) => {
        setGenre(genre);  
        setSelected((s) => !s);
    }

    return <div className="find-event-header">
        <h1>Find an event</h1>
        <form id="search-event-form" onSubmit={searchHandler}>
            <div className="find-event-search">
                <Select labelId="search-locations" value={location} label="Your Location" onChange={(event) => setLocation(event.target.value)}>
                    <MenuItem disabled selected hidden value="-">Your Location</MenuItem>
                    <MenuItem value="Sydney">Sydney</MenuItem>
                    <MenuItem value="Balmain">Balmain</MenuItem>
                    <MenuItem value="Surry Hills">Surry Hills</MenuItem>
                    <MenuItem value="Parramatta">Parramatta</MenuItem>
                    <MenuItem value="Marrickville">Marrickville</MenuItem>
                    <MenuItem value="Lane Cove">Lane Cove</MenuItem>
                </Select>
                <DatePicker onChange={(event) => setDate(event.target.value)} />
            </div>
            <div className="find-event-tags">
                <Chip label="Music" value="Music" color={selected ? "primary" : "default"} onClick={() => chipHandler("Music") } />
            </div>
            <input
            id="search-btn"
            className="search-btn"
            type="submit"
            value="Search"
            />
        </form>
    </div>
    ;
}

export default FindEventHeader;