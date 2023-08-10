import { Button, Card, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getDrafts, removeDraft } from "../../utils/localStorage";
import { PATHS } from "../../utils/constants.util";

const DraftCard = (props) => {
  
const navigate = useNavigate();
  // retrieve draft from local storage
  const drafts = getDrafts();
  const draft = drafts[props.draftNo];

  const cardRedirect = () => {
    navigate(PATHS.CREATE_EVENT, { state: { draft: draft, draftNo: props.draftNo } });
  };

  const remove = () => {
    removeDraft(props.draftNo);
    props.setRefresh(!props.refresh);
  };

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

export default DraftCard;
