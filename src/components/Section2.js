import React from "react";

const Section2 = () => {
  return (
    <>
      <div className="section_2heading">
        <h1> The value that hold us true</h1>
      </div>

      <div className="section2_flex">
        <div className="section2_item">
          <div className="section2_logs_flex">
            <i class="bi bi-award-fill"></i>
            <h6>
              <b>Simplicity</b>
            </h6>
          </div>

          <div className="section2_description">
            <p>
              Things beinf made beautiful simple <br />are at the heart of everything
              we do
            </p>
          </div>
        </div>

        <div className="section2_item">
          <div className="section2_logs_flex">
            <i class="bi bi-bookmark-heart-fill"></i>

            <h6>
              <b>Social Good</b>
            </h6>
          </div>

          <div className="section2_description">
            <p>
              We believe in making things better <br /> for everyone, even if just by a
              littie bitt
            </p>
          </div>
        </div>

        <div className="section2_item">
          <div className="section2_logs_flex">
            <i class="bi bi-shield-fill-check"></i>
            <h6>
              <b>Trust</b>
            </h6>
          </div>

          <div className="section2_description">
            We work on the basis of creating <br /> trust which can be nurtured through třansparency
          </div>
        </div>
      </div>
    </>
  );
};

export default Section2;
