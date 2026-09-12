import React from "react"
import "./About.css"
export default function About() {
    return <>
        <video src="/aboutvideo.mp4" autoPlay loop width={600} height={400} ></video>
        <div className="about-text">Taaza TV proudly presents KWIZDOM 4.0, its flagship inter-school quiz competition, designed to nurture academic excellence and instill a sense of national pride among students in Kolkata. This exciting initiative invites students from Grades 7, 8, and 9 across the city’s top 100+ schools to embark on a knowledge-filled journey celebrating India’s rich history, current affairs, and general awareness.
            <br />
            The competition kicks off with preliminary rounds hosted on school campuses, where students take on a 30-minute multiple-choice challenge. Covering topics such as Indian history, culture, and recent events, the quiz in an exam format conducted in classrooms or auditoriums, with answers marked on OMR sheets to ensure accuracy and fairness.
            <br />
            From each school, the top scorer in each grade advances to form a three-member team representing their school in the advanced stages of the competition. The journey culminates in a grand finale featuring a live audience and wide media coverage—promising to be one of the most anticipated academic events of the year.

            With participation expected from over 50,000 students, KWIZDOM 4.0 is set to become again a landmark event in the city’s academic landscape. Each participant also receives a "Student Kit" filled with exciting gifts and sponsor vouchers. Through this initiative, Taaza TV aims to create a dynamic, engaging experience that promotes learning, teamwork, and a deep appreciation for India’s cultural heritage.

            Kwizdom 4.0 is an initiative of Taaza TV along with Garden Reach Shipbuilders and Enginners Limited. Our sponsors this year are : <br />

            <br />

            <span className="title-sponsor">
                Title Sponsor :
            </span>
            <ul>
                <li>GARDEN REACH SHIPBUILDERS AND ENGINEERS LIMITED</li>
            </ul>

            <span className="powered-by">
                Powered By :
            </span>
           
            <ul>
                <li>Indian Oil</li>
            </ul>
       

            <span className="sponsor">
                Gold Sponsors :
            </span>
            <ul>
                <li>IFGL</li>
                <li>BHAGWATI BISCUITS</li>
                <li>NATURAL GROUP</li>
                <li>WOW MOMO</li>
                <li>NICCO PARK</li>
                
            </ul>

            </div>
    </>
}


