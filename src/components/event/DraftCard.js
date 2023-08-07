import { Button, Card, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getDrafts, removeDraft } from "../../utils/localStorage";

const DraftCard = (props) => {
  const navigate = useNavigate();

  // retrieve draft from local storage
  const drafts = getDrafts();
  const draft = drafts[props.draftNo];

  const cardRedirect = () => {
    navigate("/createevent", { state: { draft: draft } });
  };

  const remove = () => {
    removeDraft(props.draftNo);
  };

  return (
    <Card className="draft-card">
      <Link id="card-name-link" onClick={cardRedirect}>
        <h3>{props.name}</h3>
      </Link>
      <Button id="save-cont-ev-btn" variant="contained" onClick={cardRedirect}>
        Keep editing
      </Button>
      <Button id="save-exit-ev-btn" variant="contained" onClick={remove}>
        Delete draft
      </Button>
    </Card>
  );
};

export default DraftCard;
