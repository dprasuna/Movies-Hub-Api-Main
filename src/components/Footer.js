import React from "react";

export default function Footer() {
  return (
    <main id="main-body">
      <footer>
        <div className="footer-content">
          <h3>
            The site is uses the{" "}
            <a
              href="https://developer.themoviedb.org/docs"
              target="_blank"
              className="myName"
            >
              TMBD
            </a>{" "}
            and{" "}
            <a
              href="https://www.omdbapi.com/"
              target="_blank"
              className="myName"
            >
              OMDB API
            </a>{" "}
            to fetch the data
          </h3>
          <h4>
            Created by{" "}
            <a
              href="https://www.linkedin.com/in/prasuna-dash/"
              target="_blank"
              className="myName"
            >
              PRASUNA
            </a>
          </h4>
          <p>Connect with me -</p>
          <div className="SocialMedia">
            <a
              href="https://www.linkedin.com/in/prasuna-dash/"
              target="_blank"
            >
              <div className="socialBox linkedin"></div>
            </a>
            <a href="https://twitter.com/prasunadash" target="_blank">
              <div className="socialBox twitter"></div>
            </a>
            <a href="https://github.com/dprasuna" target="_blank">
              <div className="socialBox github"></div>
            </a>
            <a href="https://prasuna-web.netlify.app/" target="_blank">
              <div className="socialBox thread"></div>
            </a>
            {/* <a href="https://www.instagram.com/shivang_18/" target="_blank">
              <div className="socialBox instagram"></div>
            </a> */}
          </div>
          <div className="footer-line">
            <p>
              &copy; {new Date().getFullYear()} PRASUNA DASH. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
