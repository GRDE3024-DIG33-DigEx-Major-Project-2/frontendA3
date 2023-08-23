/**
 * Create Event Step 6 -- Event Media
 */

//Import dependencies
import { Box, FormControl, Grid, Link } from "@mui/material";
import { getBlob } from "../../../utils/indexedDb";
import { useState, useEffect } from "react";
import { PartialLoadSpinner } from "../../shared/LoadingSpinner";

/**
 * Builds EventMedia component
 * @param {*} props props to consume
 * @returns Render of EventMedia component
 */
const EventMedia = (props) => {
  const { selectedImage, setSelectedImage, draftNo, onImageChange } = props;
  const [blobURL, setBlobURL] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!draftNo) {
      setIsLoading(false);
      return;
    }

    /**
     * Fetch the cached event image
     */
    const fetchCachedImage = async () => {
      try {
        console.log("THE KEY: ", draftNo);
        const imageBlob = await getBlob(draftNo);
        if (imageBlob) {
          const url = URL.createObjectURL(imageBlob);
          setBlobURL(url);
          setSelectedImage(imageBlob);
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError("Error retrieving cached image");
        console.error("Error retrieving cached image:", error);
      }
    };

    fetchCachedImage();

    //Cleanup the object URL if it exists
    return () => {
      if (blobURL) URL.revokeObjectURL(blobURL);
    };
  }, [draftNo, setSelectedImage]);

  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const blob = e.target.files[0];
      const url = URL.createObjectURL(blob);
      setBlobURL(url);
      setSelectedImage(blob);
      onImageChange(blob);
    }
  };

  if (isLoading) {
    return <PartialLoadSpinner></PartialLoadSpinner>;
  }

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
                  {!selectedImage && (
                    <div className="create-ev-img-box">
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
                  {blobURL && (
                    <>
                      <div className="create-ev-img-box">
                        <img src={blobURL} alt="Uploaded Event" />
                      </div>
                      ...
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
