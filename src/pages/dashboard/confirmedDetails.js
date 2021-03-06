import React, { useState } from "react";
import { Divider, Flag, Accordion, Icon, Loader } from "semantic-ui-react";

const ConfirmedDetails = ({ confirmed, selectedCountry }) => {
  const [activeAccordionIndex, setActiveAccordionIndex] = useState(0);
  if (!selectedCountry || !confirmed)
    return <Loader active inline size="mini" />;
  return (
    <>
      <Divider hidden />
      <Flag name={selectedCountry.toLowerCase()} /> Τοποθεσίες{" "}
      <strong>κρουσμάτων</strong>
      <Accordion fluid styled>
        {confirmed.map((i, index) => (
          <div key={index}>
            <Accordion.Title
              active={activeAccordionIndex === index}
              index={index}
              onClick={() => setActiveAccordionIndex(index)}
            >
              <Icon name="dropdown" />
              {i.state && i.state !== "null"
                ? i.state
                : "Δεν Υπάρχουν δεδομένα για Επαρχίες ή Πολιτίες"}
            </Accordion.Title>
            <Accordion.Content active={activeAccordionIndex === index}>
              Επιβεβαιωμένα κρουσμάτων: {i.confirmed} <br />
            </Accordion.Content>
          </div>
        ))}
      </Accordion>
    </>
  );
};

export default ConfirmedDetails;
