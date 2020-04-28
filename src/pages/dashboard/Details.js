import React, { useState } from "react";
import { Divider, Flag, Accordion, Icon, Loader } from "semantic-ui-react";

const DeathsDetail = ({ selectedCountry, detail }) => {
  const [activeAccordionIndex, setActiveAccordionIndex] = useState(0);
  if (!selectedCountry || !detail) return <Loader active inline size="mini" />;
  return (
    <>
      <Divider hidden />
      <Flag name={selectedCountry.toLowerCase()} /> Τοποθεσίες{" "}
      <strong>κρουσμάτων</strong>
      <Accordion fluid styled>
        {detail.map((i, index) => (
          <div key={index}>
            <Accordion.Title
              active={activeAccordionIndex === index}
              index={index}
              onClick={() => setActiveAccordionIndex(index)}
            >
              <Icon name="dropdown" />
              {i.state && i.state !== "null"
                ? i.state
                : "Δεν Υπαρχουν δεδομενα για Επαρχιες η Πολιτιες"}
            </Accordion.Title>
            <Accordion.Content active={activeAccordionIndex === index}>
              Κρούσματα: {i.confirmed} <br />
              Θάνατοι: {i.deaths} <br />
            </Accordion.Content>
          </div>
        ))}
      </Accordion>
    </>
  );
};

export default DeathsDetail;
