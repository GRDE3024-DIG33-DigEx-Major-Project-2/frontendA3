import { Button, Card, Link } from "@mui/material";

import { useNavigate } from "react-router-dom";

const DraftCard = (props) => {
  const navigate = useNavigate();

  const cardRedirect = () => {
    navigate("/createevent");
  };

  return (
    <Card className="draft-card">
        <Link id="card-name-link" onClick={cardRedirect}>
          <h3>DRAFT SAMPLE</h3>
        </Link>
        <Button id="save-cont-ev-btn" variant="contained" onClick={cardRedirect}>
          Keep editing
        </Button>
    </Card>
  );
};

export default DraftCard;
