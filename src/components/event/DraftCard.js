/**
 * DraftCard component
 */

//Import dependencies
import { Button, Card, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getDrafts, removeDraft } from "../../utils/localStorage";
import { PATHS } from "../../utils/constants.util";

/**
 * Builds the DraftCard component
 * @param {*} props 
 * @returns Render of the DraftCard component
 */
const DraftCard = (props) => {

  //SPA navigator
  const navigate = useNavigate();
  //Retrieve draft from local storage
  const drafts = getDrafts();
  const draft = drafts[props.draftNo];

  /**
   * Redirect to the create event flow with the selected draft
   */
  const cardRedirect = () => {
    navigate(PATHS.CREATE_EVENT, { state: { draft: draft, draftNo: props.draftNo } });
  };

  /**
   * Delete draft
   */
  const remove = () => {
    removeDraft(props.draftNo);
    props.setRefresh(!props.refresh);
  };

  //Return render of the DraftCard component
  return (
    <Card className="draft-card">
      <Link id="card-name-link" onClick={cardRedirect}>
        <h3>{props.name}</h3>
      </Link>
      <div>
        <Button id="save-cont-ev-btn" variant="contained" onClick={cardRedirect}>
          Keep editing
        </Button>
        <Button id="save-exit-ev-btn" variant="contained" onClick={remove}>
          Delete draft
        </Button>
      </div>
    </Card>
  );
};

//Export the DraftCard component
export default DraftCard;
