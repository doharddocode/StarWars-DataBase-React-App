import React from "react";
import { PlanetList } from "../sw-components";
import { useNavigate } from "react-router-dom";

const PlanetsPage = () =>  {
  const navigate = useNavigate();

  return (
    <PlanetList onItemSelected={ (itemId) => {
      navigate(`${itemId}`);
    } }
    />
  );
}

export default PlanetsPage;