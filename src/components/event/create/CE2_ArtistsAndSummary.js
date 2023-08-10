import { Box, FormControl, Grid, TextField, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const ArtistsAndSummary = (props) => {
  // functions to enable/disable artist form fields
  const handleDisable2 = () => {
    if (props.enableArtist2) {
      props.setEnableArtist2(false);
      props.setArtistName2("");
    }
    if (!props.enableArtist2) props.setEnableArtist2(true);
  };
  const handleDisable3 = () => {
    if (props.enableArtist3) {
      props.setEnableArtist3(false);
      props.setArtistName3("");
    }
    if (!props.enableArtist3) props.setEnableArtist3(true);
  };
  const handleDisable4 = () => {
    if (props.enableArtist4) {
      props.setEnableArtist4(false);
      props.setArtistName4("");
    }
    if (!props.enableArtist4) props.setEnableArtist4(true);
  };

  return (
    <>
      <h2>Artists and summary</h2>
      <div className="artist-and-summary">
        <Box alignItems="center" justifyContent="center">
          <form>
            <FormControl fullWidth>
              <Grid container spacing={2} paddingBottom="15px">
                <Grid container item xs={5} direction="column">
                  <p className="form-label-active">Artist name:</p>
                  <TextField
                    fullWidth
                    value={props.artistName}
                    required
                    onChange={(event) =>
                      props.setArtistName(event.target.value)
                    }
                    id="create-event-an1"
                    placeholder="Enter an artist's name"
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  container
                  item
                  xs={1}
                  direction="column"
                  className="fab-container"
                >
                  <Fab
                    className="add-artist-fab-disabled"
                    id="add-artist-1"
                    aria-label="Add"
                    disabled={true}
                  >
                    <AddIcon />
                  </Fab>
                  <Fab
                    className="remove-artist-fab-disabled"
                    id="remove-artist-1"
                    aria-label="Remove"
                    disabled={true}
                  >
                    <RemoveIcon />
                  </Fab>
                </Grid>
                <Grid container item xs={5} direction="column">
                  <p
                    className={
                      props.enableArtist2
                        ? "form-label-active"
                        : "form-label-disabled"
                    }
                  >
                    Artist name:
                  </p>
                  <TextField
                    fullWidth
                    value={props.artistName2}
                    required
                    onChange={(event) =>
                      props.setArtistName2(event.target.value)
                    }
                    id="create-event-an2"
                    placeholder="Enter an artist's name"
                    variant="outlined"
                    disabled={!props.enableArtist2}
                  />
                </Grid>
                <Grid
                  container
                  item
                  xs={1}
                  direction="column"
                  className="fab-container"
                >
                  <Fab
                    className={
                      !props.enableArtist2
                        ? "add-artist-fab"
                        : "add-artist-fab-disabled"
                    }
                    id="add-artist-2"
                    aria-label="Add"
                    onClick={handleDisable2}
                    disabled={props.enableArtist2}
                  >
                    <AddIcon />
                  </Fab>
                  <Fab
                    className={
                      props.enableArtist2
                        ? "remove-artist-fab"
                        : "remove-artist-fab-disabled"
                    }
                    id="remove-artist-2"
                    aria-label="Remove"
                    onClick={handleDisable2}
                    disabled={!props.enableArtist2}
                  >
                    <RemoveIcon />
                  </Fab>
                </Grid>
                <Grid container item xs={5} direction="column">
                  <p
                    className={
                      props.enableArtist3
                        ? "form-label-active"
                        : "form-label-disabled"
                    }
                  >
                    Artist name:
                  </p>
                  <TextField
                    fullWidth
                    value={props.artistName3}
                    required
                    onChange={(event) =>
                      props.setArtistName3(event.target.value)
                    }
                    id="create-event-an3"
                    placeholder="Enter an artist's name"
                    variant="outlined"
                    disabled={!props.enableArtist3}
                  />
                </Grid>
                <Grid
                  container
                  item
                  xs={1}
                  direction="column"
                  className="fab-container"
                >
                  <Fab
                    className={
                      !props.enableArtist3
                        ? "add-artist-fab"
                        : "add-artist-fab-disabled"
                    }
                    id="add-artist-3"
                    aria-label="Add"
                    onClick={handleDisable3}
                    disabled={props.enableArtist3}
                  >
                    <AddIcon />
                  </Fab>
                  <Fab
                    className={
                      props.enableArtist3
                        ? "remove-artist-fab"
                        : "remove-artist-fab-disabled"
                    }
                    id="remove-artist-3"
                    aria-label="Remove"
                    onClick={handleDisable3}
                    disabled={!props.enableArtist3}
                  >
                    <RemoveIcon />
                  </Fab>
                </Grid>
                <Grid container item xs={5} direction="column">
                  <p
                    className={
                      props.enableArtist4
                        ? "form-label-active"
                        : "form-label-disabled"
                    }
                  >
                    Artist name:
                  </p>
                  <TextField
                    fullWidth
                    value={props.artistName4}
                    required
                    onChange={(event) =>
                      props.setArtistName4(event.target.value)
                    }
                    id="create-event-an4"
                    placeholder="Enter an artist's name"
                    variant="outlined"
                    disabled={!props.enableArtist4}
                  />
                </Grid>
                <Grid
                  container
                  item
                  xs={1}
                  direction="column"
                  className="fab-container"
                >
                  <Fab
                    className={
                      !props.enableArtist4
                        ? "add-artist-fab"
                        : "add-artist-fab-disabled"
                    }
                    id="add-artist-4"
                    aria-label="Add"
                    onClick={handleDisable4}
                    disabled={props.enableArtist4}
                  >
                    <AddIcon />
                  </Fab>
                  <Fab
                    className={
                      props.enableArtist4
                        ? "remove-artist-fab"
                        : "remove-artist-fab-disabled"
                    }
                    id="remove-artist-4"
                    aria-label="Remove"
                    onClick={handleDisable4}
                    disabled={!props.enableArtist4}
                  >
                    <RemoveIcon />
                  </Fab>
                </Grid>
                <Grid container item xs={11} direction="row">
                  <p>Event summary:</p>
                  <TextField
                    fullWidth
                    value={props.eventSummary}
                    required
                    onChange={(event) =>
                      props.setEventSummary(event.target.value)
                    }
                    multiline
                    id="create-ev-summary"
                    variant="outlined"
                    rows={5}
                    error={props.summaryError && props.eventSummary === ""}
                    helperText={
                      props.summaryError && props.eventSummary === ""
                        ? "An event summary is required to continue"
                        : null
                    }
                  />
                </Grid>
              </Grid>
            </FormControl>
          </form>
        </Box>
      </div>
    </>
  );
};

export default ArtistsAndSummary;
