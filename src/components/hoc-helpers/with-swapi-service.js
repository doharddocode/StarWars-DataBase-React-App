import React from 'react';
import { SwapiServiceConsumer } from '../swapi-service-context';
import {useParams} from "react-router-dom";

const withSwapiService = (Wrapped, mapMethodsToProps) => {
  return (props) => {
    const pageParams = useParams();
    const newProps = { ...props, ...{ itemId: pageParams.id } }

    return (
      <SwapiServiceConsumer>
        {
          (swapiService) => {
            const serviceProps = mapMethodsToProps(swapiService);

            return (
              <Wrapped {...newProps} {...serviceProps} />
            );
          }
        }
      </SwapiServiceConsumer>
    );
  }
};

export default withSwapiService;
