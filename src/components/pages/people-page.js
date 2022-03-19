import {PersonDetails, PersonList} from "../sw-components";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Row from "../row";

const PeoplePage = () => {
  const navigate = useNavigate();
  const id = useParams().id;

  return (
    <Row
      left={<PersonList onItemSelected={ (itemId) => {
        navigate(`/people/${itemId}`);
      } } />}
      right={<PersonDetails itemId={id} it />}
     />
  );
}

export default PeoplePage;