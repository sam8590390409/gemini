// Import necessary modules
import React, { useContext } from "react";
import "./Main.css"; // Import styles
import { assets } from "../../assets/assets"; // Import assets
import { Context } from "../../Context/Context"; // Import context

// Main Component
const Main = () => {
  // Extract necessary values from context
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context);

  return (
    <div className="main">
      {/* Navigation Bar */}
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="User Icon" />
      </div>

      {/* Main Content Container */}
      <div className="main-container">
        {!showResult ? (
          <>
            {/* Greeting Message */}
            <div className="greet">
              <p>
                <span>Hello, sam..</span>
              </p>
            </div>

            {/* Suggestion Cards */}
            <div className="cards">
              <div className="card">
                <p>Suggest beautiful places for an upcoming road trip</p>
                <img src={assets.compass_icon} alt="Compass Icon" />
              </div>
              <div className="card">
                <p>Suggest brainstorming team bonding activities</p>
                <img src={assets.message_icon} alt="Message Icon" />
              </div>
              <div className="card">
                <p>Briefly explain this concept:</p>
                <img src={assets.bulb_icon} alt="Bulb Icon" />
              </div>
              <div className="card">
                <p>Improve the readability of the following code</p>
                <img src={assets.code_icon} alt="Code Icon" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            {/* User's Prompt Display */}
            <div className="result-title">
              <img src={assets.user_icon} alt="User Icon" />
              <p>{recentPrompt}</p>
            </div>

            {/* AI Response Display */}
            <div className="result-data">
              <img src={assets.gemini_icon} alt="Gemini Icon" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}

        {/* Bottom Input Section */}
        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              type="text"
              placeholder="Enter the prompt"
              value={input}
            />
            <div>
              <img src={assets.gallery_icon} alt="Gallery Icon" />
              <img src={assets.mic_icon} alt="Microphone Icon" />
              {input && (
                <img
                  onClick={() => onSent()}
                  src={assets.send_icon}
                  alt="Send Icon"
                />
              )}
            </div>
          </div>
          <p className="bottom-info">
            Gemini may display inaccurate information, so double-check its
            responses.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
