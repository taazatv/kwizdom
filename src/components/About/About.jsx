import React from "react";
import "./About.css";

export default function About() {
  return (
    <main className="about-page">

      {/* ================= HERO ================= */}

      <section className="about-hero">

        <div className="about-hero-content">

          <span className="about-eyebrow">
            KWIZDOM 4.0
          </span>

          <h1>
            A quiz that inspires
            <span> young minds.</span>
          </h1>

          <p>
            Knowledge. Curiosity. Competition.
            A celebration of India's rich history,
            culture and achievements.
          </p>

        </div>

      </section>


      {/* ================= VIDEO ================= */}

      <section className="about-video-section">

        <div className="about-video-card">

          <video
            src="/aboutvideo.mp4"
            autoPlay
            muted
            loop
            playsInline
            controls
          />

        </div>

      </section>


      {/* ================= ABOUT CONTENT ================= */}

      <section className="about-content-section">

        <div className="about-content">

          <div className="content-heading">

            <span>ABOUT THE INITIATIVE</span>

            <h2>
              Empowering students
              <br />
              through knowledge.
            </h2>

          </div>


          <div className="content-copy">

            <p>
              Taaza TV proudly presents KWIZDOM 4.0, its flagship
              inter-school quiz competition, designed to nurture
              academic excellence and instill a sense of national
              pride among students in Kolkata. This exciting
              initiative invites students from Grades 7, 8, and 9
              across the city's top 100+ schools to embark on a
              knowledge-filled journey celebrating India's rich
              history, current affairs, and general awareness.
            </p>

            <p>
              The competition kicks off with preliminary rounds
              hosted on school campuses, where students take on a
              30-minute multiple-choice challenge. Covering topics
              such as Indian history, culture, and recent events,
              the quiz is conducted in classrooms or auditoriums,
              with answers marked on OMR sheets to ensure accuracy
              and fairness.
            </p>

            <p>
              From each school, the top scorer in each grade advances
              to form a three-member team representing their school
              in the advanced stages of the competition. The journey
              culminates in a grand finale featuring a live audience
              and wide media coverage—promising to be one of the most
              anticipated academic events of the year.
            </p>

            <p>
              With participation expected from over 50,000 students,
              KWIZDOM 4.0 is set to become again a landmark event in
              the city's academic landscape. Each participant also
              receives a "Student Kit" filled with exciting gifts
              and sponsor vouchers.
            </p>

            <p>
              Through this initiative, Taaza TV aims to create a
              dynamic, engaging experience that promotes learning,
              teamwork, and a deep appreciation for India's cultural
              heritage.
            </p>

            <p>
              Kwizdom 4.0 is an initiative of Taaza TV along with
              Garden Reach Shipbuilders and Engineers Limited.
            </p>

          </div>

        </div>

      </section>


      {/* ================= SPONSORS ================= */}

      <section className="sponsors-section">

        <div className="sponsors-container">

          <div className="sponsors-heading">

            <span>OUR PARTNERS</span>

            <h2>
              Proudly supported by
            </h2>

            <p>
              The organisations helping us make KWIZDOM 4.0
              a memorable learning experience.
            </p>

          </div>


          <div className="sponsors-grid">

            {/* TITLE SPONSOR */}

            <div className="sponsor-card title-card">

              <span className="sponsor-label">
                TITLE SPONSOR
              </span>

              <h3>
                Garden Reach Shipbuilders
                <br />
                and Engineers Limited
              </h3>

            </div>


            {/* POWERED BY */}

            <div className="sponsor-card">

              <span className="sponsor-label">
                POWERED BY
              </span>

              <h3>
                Indian Oil
              </h3>

            </div>


            {/* GOLD SPONSORS */}

            <div className="sponsor-card gold-card">

              <span className="sponsor-label">
                SPONSORS
              </span>

              <div className="gold-sponsors">

                <span>IFGL</span>

                <span>Bhagwati Biscuits</span>

                <span>Natural Group</span>

                <span>WOW Momo</span>

                <span>Nicco Park</span>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================= BOTTOM CTA ================= */}

      <section className="about-bottom">

        <div>

          <span>KWIZDOM 4.0</span>

          <h2>
            Think. Discover. Win.
          </h2>

          <p>
            Where knowledge meets curiosity and competition.
          </p>

        </div>

      </section>

    </main>
  );
}