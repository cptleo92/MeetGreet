import React from "react";

const SplashMainStories = () => {
  return (
    <div className="splash-main-stories">
        <h3>Stories from MeetGreet</h3>
        <h6>People on Meetup have fostered community, learned new skills, started businesses, and made life-long friends. Learn how.</h6>
        <section className="stories-cards">
          <div className="stories-card">
            <a href="https://www.meetup.com/blog/three-ways-to-make-coworker-friendships-while-working-from-home/" target="_blank">
              <img
                src={window.firstArticle}
                alt="first article"
              />
              <h4>Three Ways To Make Coworker Friendships While Working From Home</h4>
              <p>Work friendships don’t need to fade just because you’re working remotely. Here are three fun ways you can get to know your colleagues.</p>
            </a>
          </div>

          <div className="stories-card">
            <a href="https://www.meetup.com/blog/five-ways-to-feel-more-connected/" target="_blank">
              <img
                src={window.secondArticle}
                alt="second article"
              />
              <h4>Five Ways to Feel More Connected</h4>
              <p>Since Meetup began nearly 20 years ago, we’ve fostered connections between more than 50 million people in 190 countries worldwide. Here are five simple strategies to help you feel more connected and improve your wellbeing.</p>
            </a>
          </div>

          <div className="stories-card">
            <a href="https://www.meetup.com/blog/how-to-live-your-best-social-life/" target="_blank">
              <img
                src={window.thirdArticle}
                alt="third article"
              />
              <h4>How To Live Your Best Social Life</h4>
              <p>Social interaction is a key part of any healthy lifestyle. Discover all different kinds of events that’ll help you maintain a fun and fulfilling social life.</p>
            </a>
          </div>
        </section>

        <div className="blob red-blob-bottom"></div>
        <div className="blob yellow-blob-bottom"></div>  
    </div>
  )
}

export default SplashMainStories