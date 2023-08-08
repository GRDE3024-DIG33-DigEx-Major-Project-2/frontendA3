import {
  Box,
  FormControl,
  Checkbox,
  Grid,
  TextField,
  Fab,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const Pricing = (props) => {
  // functions to enable/disable price form fields
  const handleTicketDisable2 = () => {
    if (props.enableTicket2) props.setEnableTicket2(false);
    if (!props.enableTicket2) props.setEnableTicket2(true);
  };
  const handleTicketDisable3 = () => {
    if (props.enableTicket3) props.setEnableTicket3(false);
    if (!props.enableTicket3) props.setEnableTicket3(true);
  };
  const handleTicketDisable4 = () => {
    if (props.enableTicket4) props.setEnableTicket4(false);
    if (!props.enableTicket4) props.setEnableTicket4(true);
  };

  // function to switch between free and paid event
  const handleChecked = (event) => {
    if (event.target.name === "eventFree") {
      props.setState({
        ...props.state,
        eventFree: true,
        eventPaid: false,
      });
    }

    if (event.target.name === "eventPaid") {
      props.setState({
        ...props.state,
        eventFree: false,
        eventPaid: true,
      });
    }
  };
  return (
    <>
      <h2>Pricing</h2>
      <div className="create-event-pricing">
        <Box alignItems="center" justifyContent="center">
          <form>
            <FormControl fullWidth>
              <Grid container spacing={2} paddingBottom="15px">
                <Grid
                  container
                  spacing={1}
                  item
                  s={6}
                  paddingBottom="15px"
                  direction="row"
                >
                  <Checkbox
                    checked={props.eventFree}
                    onChange={handleChecked}
                    name="eventFree"
                    label="Free"
                    inputProps={{
                      "aria-label": "controlled",
                    }}
                  />
                  <p>Free</p>{" "}
                  <Checkbox
                    checked={!props.eventFree}
                    onChange={handleChecked}
                    name="eventPaid"
                    label="paid"
                    inputProps={{
                      "aria-label": "controlled",
                    }}
                  />
                  <p>Paid</p>
                </Grid>
                <Grid container item xs={6} direction="column">
                  <p
                    className={
                      !props.eventFree
                        ? "form-label-active"
                        : "form-label-disabled"
                    }
                  >
                    Ticket type:
                  </p>
                  <TextField
                    value={props.eventTierName1}
                    required
                    id="create-event-ticket-tier1"
                    placeholder="Enter the ticket tier name"
                    variant="outlined"
                    inputProps={{ readOnly: true }}
                    disabled={props.eventFree}
                  />
                </Grid>
                <Grid container item xs={6} direction="column">
                  <p
                    className={
                      !props.eventFree
                        ? "form-label-active"
                        : "form-label-disabled"
                    }
                  >
                    Ticket price:
                  </p>
                  <TextField
                    variant="outlined"
                    value={parseFloat(props.eventPrice1).toFixed(2)}
                    onChange={(event) =>
                      props.setEventPrice1(event.target.value)
                    }
                    id="create-event-ticket-price1"
                    disabled={props.eventFree}
                  />
                </Grid>
                <Grid
                  container
                  item
                  xs={12}
                  direction="row"
                  className="fab-container-tickets"
                >
                  <Fab
                    className="add-ticket-fab-disabled"
                    id="add-ticket-1"
                    aria-label="Add"
                    disabled={true}
                  >
                    <AddIcon />
                  </Fab>
                  <Fab
                    className="remove-ticket-fab-disabled"
                    id="remove-ticket-1"
                    aria-label="Remove"
                    disabled={true}
                  >
                    <RemoveIcon />
                  </Fab>
                </Grid>
                <Grid container item xs={6} direction="column">
                  <p
                    className={
                      props.enableTicket2 || !props.eventFree
                        ? "form-label-active"
                        : "form-label-disabled"
                    }
                  >
                    Ticket type:
                  </p>
                  <TextField
                    value={props.eventTierName2}
                    required
                    onChange={(event) =>
                      props.setEventTierName2(event.target.value)
                    }
                    id="create-event-ticker-tier2"
                    placeholder="Enter the ticket tier name"
                    variant="outlined"
                    disabled={props.eventFree || !props.enableTicket2}
                  />
                </Grid>
                <Grid container item xs={6} direction="column">
                  <p
                    className={
                      props.enableTicket2 || !props.eventFree
                        ? "form-label-active"
                        : "form-label-disabled"
                    }
                  >
                    Ticket price:
                  </p>
                  <TextField
                    variant="outlined"
                    value={parseFloat(props.eventPrice2).toFixed(2)}
                    onChange={(event) =>
                      props.setEventPrice2(event.target.value)
                    }
                    id="create-event-ticket-price2"
                    disabled={props.eventFree || !props.enableTicket2}
                  />
                </Grid>
                <Grid
                  container
                  item
                  xs={12}
                  direction="row"
                  className="fab-container-tickets"
                >
                  <Fab
                    className={
                      !(props.eventFree || props.enableTicket2)
                        ? "add-ticket-fab"
                        : "add-ticket-fab-disabled"
                    }
                    onClick={handleTicketDisable2}
                    id="add-ticket-2"
                    aria-label="Add"
                    disabled={props.eventFree || props.enableTicket2}
                  >
                    <AddIcon />
                  </Fab>
                  <Fab
                    className={
                      props.enableTicket2 ||
                      (!props.eventFree && props.enableTicket2)
                        ? "remove-ticket-fab"
                        : "remove-ticket-fab-disabled"
                    }
                    onClick={handleTicketDisable2}
                    id="remove-ticket-2"
                    aria-label="Remove"
                    disabled={props.eventFree || !props.enableTicket2}
                  >
                    <RemoveIcon />
                  </Fab>
                </Grid>
                <Grid container item xs={6} direction="column">
                  <p
                    className={
                      props.enableTicket3 || !props.eventFree
                        ? "form-label-active"
                        : "form-label-disabled"
                    }
                  >
                    Ticket type:
                  </p>
                  <TextField
                    value={props.eventTierName3}
                    required
                    onChange={(event) =>
                      props.setEventTierName3(event.target.value)
                    }
                    id="create-event-ticket-tier3"
                    placeholder="Enter the ticket tier name"
                    variant="outlined"
                    disabled={props.eventFree || !props.enableTicket3}
                  />
                </Grid>
                <Grid container item xs={6} direction="column">
                  <p
                    className={
                      props.enableTicket3 || !props.eventFree
                        ? "form-label-active"
                        : "form-label-disabled"
                    }
                  >
                    Ticket price:
                  </p>
                  <TextField
                    variant="outlined"
                    value={parseFloat(props.eventPrice3).toFixed(2)}
                    onChange={(event) =>
                      props.setEventPrice3(event.target.value)
                    }
                    id="create-event-ticket-price3"
                    disabled={props.eventFree || !props.enableTicket3}
                  />
                </Grid>
                <Grid
                  container
                  item
                  xs={12}
                  direction="row"
                  className="fab-container-tickets"
                >
                  <Fab
                    className={
                      !(props.eventFree || props.enableTicket3)
                        ? "add-ticket-fab"
                        : "add-ticket-fab-disabled"
                    }
                    onClick={handleTicketDisable3}
                    id="add-ticket-3"
                    aria-label="Add"
                    disabled={props.eventFree || props.enableTicket3}
                  >
                    <AddIcon />
                  </Fab>
                  <Fab
                    className={
                      props.enableTicket3 ||
                      (!props.eventFree && props.enableTicket3)
                        ? "remove-ticket-fab"
                        : "remove-ticket-fab-disabled"
                    }
                    onClick={handleTicketDisable3}
                    id="remove-ticket-3"
                    aria-label="Remove"
                    disabled={props.eventFree || !props.enableTicket3}
                  >
                    <RemoveIcon />
                  </Fab>
                </Grid>
                <Grid container item xs={6} direction="column">
                  <p
                    className={
                      props.enableTicket4 || !props.eventFree
                        ? "form-label-active"
                        : "form-label-disabled"
                    }
                  >
                    Ticket type:
                  </p>
                  <TextField
                    value={props.eventTierName4}
                    required
                    onChange={(event) =>
                      props.setEventTierName4(event.target.value)
                    }
                    id="create-event-ticket-tier4"
                    placeholder="Enter the ticket tier name"
                    variant="outlined"
                    disabled={props.eventFree || !props.enableTicket4}
                  />
                </Grid>
                <Grid container item xs={6} direction="column">
                  <p
                    className={
                      props.enableTicket4 || !props.eventFree
                        ? "form-label-active"
                        : "form-label-disabled"
                    }
                  >
                    Ticket price:
                  </p>
                  <TextField
                    variant="outlined"
                    value={props.eventPrice4}
                    onChange={(event) =>
                      props.setEventPrice4(event.target.value)
                    }
                    id="create-event-ticket-price4"
                    disabled={props.eventFree || !props.enableTicket4}
                  />
                </Grid>
                <Grid
                  container
                  item
                  xs={12}
                  direction="row"
                  className="fab-container-tickets"
                >
                  <Fab
                    className={
                      !(props.eventFree || props.enableTicket4)
                        ? "add-ticket-fab"
                        : "add-ticket-fab-disabled"
                    }
                    onClick={handleTicketDisable4}
                    id="add-ticket-4"
                    aria-label="Add"
                    disabled={props.eventFree || props.enableTicket4}
                  >
                    <AddIcon />
                  </Fab>
                  <Fab
                    className={
                      props.enableTicket4 ||
                      (!props.eventFree && props.enableTicket4)
                        ? "remove-ticket-fab"
                        : "remove-ticket-fab-disabled"
                    }
                    onClick={handleTicketDisable4}
                    id="remove-ticket-4"
                    aria-label="Remove"
                    disabled={props.eventFree || !props.enableTicket4}
                  >
                    <RemoveIcon />
                  </Fab>
                </Grid>
              </Grid>
            </FormControl>
          </form>
        </Box>
      </div>
    </>
  );
};

export default Pricing;
