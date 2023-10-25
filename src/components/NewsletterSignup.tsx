import React, { useState } from "react";

export const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage(true);
    try {
      const response = await fetch(
        "https://nyc.us20.list-manage.com/subscribe/post",
        {
          method: "POST",
          body: new URLSearchParams(
            new FormData(e.target as HTMLFormElement) as any
          ),
        }
      );

      // Handle response if needed
      console.log(response);
    } catch (error) {
      // Handle error if needed
      console.log(error);
    }
  };
  return (
    <div className="p-6">
      <div className="columns">
        <div className="column is-6 is-flex">
          <div className="newsletter-text">
            <h3 className="newsletter-head mt-0">Get THE CITY Scoop</h3>
            <p className="newsletter-intro">
              Sign up and get the latest stories from THE CITY delivered to you
              each morning
            </p>
          </div>
        </div>
        <div className="column is-1" />
        <div className="column is-5 is-flex">
          <div className="mt-1">
            <form
              id="form-inputs"
              method="POST"
              className="field has-addons"
              onSubmit={handleSubmit}
            >
              <div className="control">
                <input
                  className="input"
                  placeholder="Email Address"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  name="MERGE0"
                  id="MERGE0"
                />
              </div>

              <input type="hidden" name="u" value="73d98c6dfc90032198ec7bdee" />
              <input type="hidden" name="id" value="aa6c8f62b7" />

              <div className="control">
                <input
                  type="submit"
                  value="SUBSCRIBE"
                  className="button has-background-black has-text-white"
                />{" "}
              </div>
            </form>

            {successMessage && (
              <p className="newsletter-intro mt-3">
                Thank you for subscribing!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
