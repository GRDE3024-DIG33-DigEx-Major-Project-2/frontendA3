/**
 * Create Event Step 6 -- Event Media
 */

//Import dependencies
import { Box, FormControl, Grid, Link } from "@mui/material";

/**
 * Builds EventMedia component
 * @param {*} props props to consume
 * @returns Render of EventMedia component
 */
const EventMedia = (props) => {
  
  /**
   * Stage image for event
   * @param {*} e 
   */
  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      props.setSelectedImage(e.target.files[0]);
    }
  };

  /**
   * Unstage the event image
   */
  const removeSelectedImage = () => {
    props.setSelectedImage();
  };

  //Return render of EventMedia component
  return (
    <>
      <h2>Event media</h2>
      <div className="create-event-media">
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
                  {!props.selectedImage && (
                    <div className="create-ev-img-box">
                      {" "}
                      <label>
                        <input
                          id="create-ev-img-input"
                          accept="image/*"
                          type="file"
                          onChange={imageChange}
                        />
                        <Link color="#f58146">Upload image</Link>
                      </label>
                    </div>
                  )}
                  {props.selectedImage && (
                    <>
                      <div className="create-ev-img-box">
                        <img
                          src={URL.createObjectURL(props.selectedImage)}
                          onerror="this.onerror=null"
                          alt="Thumb"
                          className="preview-image"
                        />
                      </div>
                      <div id="remove-img-box">
                        <Link color="#f58146" onClick={removeSelectedImage}>
                          Remove This Image
                        </Link>
                      </div>
                    </>
                  )}
                </Grid>
              </Grid>
            </FormControl>
          </form>
        </Box>
      </div>
    </>
  );
};

//Export EventMedia component
export default EventMedia;
