import { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { InputLabel, MenuItem, Select } from "@mui/material";

const FindEventHeader = () => {

    const [location, setLocation] = useState("Sydney");
    const [date, setDate] = useState(null);

    const searchHandler = () => {
        console.log("Search event fired");
        console.log(location, date);
    }

    return <div className="find-event-header">
        <h1>Find an event</h1>
        <form onSubmit={searchHandler}>
            <div className="find-event-search">
                <InputLabel id="search-locations">Your Location</InputLabel>
                <Select labelId="search-locations" value={location} label="Your Location" onChange={(event) => setLocation(event.target.value)}>
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value="Sydney">Sydney</MenuItem>
                    <MenuItem value="Balmain">Balmain</MenuItem>
                    <MenuItem value="Surry Hills">Surry Hills</MenuItem>
                    <MenuItem value="Parramatta">Parramatta</MenuItem>
                    <MenuItem value="Marrickville">Marrickville</MenuItem>
                    <MenuItem value="Lane Cove">Lane Cove</MenuItem>
                </Select>
                <DatePicker onChange={(event) => setDate(event.target.value)} />
            </div>
            <div className="find-event-tags"></div>
        </form>
    </div>
    ;
}

export default FindEventHeader;