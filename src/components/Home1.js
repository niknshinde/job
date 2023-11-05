import React from "react";
import Jobs1 from "./Jobs1";
import Section1 from "./Section1";
import Section0 from "./Section0";
import Section2 from "./Section2";

export const Home1 = () => {
  return (
    <div>
      <h1 className="homeh1">Available jobs</h1>
      {/* <Notes/> */}
      <Section0 />
      <Section1/>
      <Section2 />
    </div>
  );
};
