import React, { useState } from "react";

const NewsletterForm = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [iserror, setIserror] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform any validation you need here
    //   date_default_timezone_set("Asia/Kolkata");

    const regex =
      /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!regex.test(email)) {
      setIserror(true);
      return false;
    }

    const recordDate = Date("yy-m-d  H:i:s");
    const fullName = "no-name";
    let query = "";
    query += "?field[full_name]=" + encodeURIComponent(fullName);
    query += "&field[email]=" + encodeURIComponent(email);
    query += "&field[reg_date_time]=" + encodeURIComponent(recordDate);
    query += "&field[ms]=crypto";

    // Simulate API request
    fetch("https://arjun.in.com/dashboard/mc/api/form_data_new.php" + query, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle API response here
        setIserror(false);
        // console.log("subscribed ==========>", data);
        data.msg == "Success" ? setSubscribed(true) : setSubscribed(false);
      })
      .catch((error) => {
        // Handle any errors here
        console.error(error);
      });

    // Clear the form after submission
    setEmail("");
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <>
      <div className="crypto_container pra">
        <p>
          क्रिप्टोकरेंसी अनियमित डिजिटल एसेट हैं, यह वैध मुद्रा नहीं हैं. इनका
          पिछला प्रदर्शन भविष्य के रिटर्न की गांरटी नहीं है. क्रिप्टोकरेंसी में
          निवेश या ट्रेड करना बाजार जोखिमों और कानूनी जोखिमों के अधीन है.
        </p>
      </div>
      <section className="subscribe">
        <div className="crypto_container">
          <div className="sub">
            <h4>हमारे न्यूज़लेटर को </h4>
            <span>सब्सक्राइब करें</span>
          </div>
          <div className="sub_input">
            <span>
              क्रिप्टो से संबंधित नवीनतम समाचार पाने के लिए सब्सक्राइब करें और
              अपडेटिड रहें!
            </span>
            <div className="form">
              <span>
                {!subscribed ? (
                  <form onSubmit={handleSubmit}>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={handleChange}
                    />
                    <button type="submit">सब्सक्राइब करें</button>
                  </form>
                ) : (
                  <div className="sub-resp">Thank you for subscribing!</div>
                )}
              </span>
              {iserror ? (
                <span>
                  <p>Email is not Valid, Please try again!</p>
                </span>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NewsletterForm;
