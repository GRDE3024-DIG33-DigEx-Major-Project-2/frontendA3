import { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { MenuItem, Select, Chip, TextField, Button } from "@mui/material";

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
                <Select className="search-form-els" labelId="search-locations" value={location} label="Your Location" onChange={(event) => setLocation(event.target.value)}>
                    <MenuItem disabled selected hidden value="-">Your Location</MenuItem>
                    <MenuItem value="Sydney">Sydney</MenuItem>
                    <MenuItem value="Balmain">Balmain</MenuItem>
                    <MenuItem value="Surry Hills">Surry Hills</MenuItem>
                    <MenuItem value="Parramatta">Parramatta</MenuItem>
                    <MenuItem value="Marrickville">Marrickville</MenuItem>
                    <MenuItem value="Lane Cove">Lane Cove</MenuItem>
                </Select>
                <DatePicker className="search-form-els" onChange={(event) => setDate(event.target.value)} />
                <span>
                    <TextField className="search-form-els" id="events-txt-field" variant="outlined" label="Search artists, venues or events"></TextField>
                    <Button className="search-form-els" type="submit" variant="contained">Search</Button>
                </span>
            </div>
            <div className="find-event-tags">
                <Chip label="Country" color={selected ? "primary" : "default"} onClick={() => chipHandler("Country") } />
                <Chip label="Jazz" color={selected ? "primary" : "default"} onClick={() => chipHandler("Jazz") } />
                <Chip label="Electronic" color={selected ? "primary" : "default"} onClick={() => chipHandler("Electronic") } />
                <Chip label="Reggae" color={selected ? "primary" : "default"} onClick={() => chipHandler("Reggae") } />
                <Chip label="Dance" color={selected ? "primary" : "default"} onClick={() => chipHandler("Dance") } />
                <Chip label="Metal" color={selected ? "primary" : "default"} onClick={() => chipHandler("Metal") } />
                <Chip label="Hip Hop" color={selected ? "primary" : "default"} onClick={() => chipHandler("Hip Hop") } />
                <Chip label="Pop" color={selected ? "primary" : "default"} onClick={() => chipHandler("Pop") } />
                <Chip label="Classical" color={selected ? "primary" : "default"} onClick={() => chipHandler("Classical") } />
            </div>
        </form>
    </div>
    ;
}

export default FindEventHeader;