import React from 'react';

const SignUp = () => {
  return (
    <main id="main" className="site-main create_account container">
      <div className="row">
        <div className="col-md-6 create_account-left">
          <div></div>
        </div>
        <article className="col-md-6">
          <div className="entry-content">
            <div className="create_account-content">
              <ul className="list-unstyled d-flex">
                <li className="mb-4">
                  <h2><strong>BUSINESS</strong> For <em>Companies</em></h2>
                  <p>We are the market–leading technical interview platform to identify and hire developers with the right skills.</p>
                  <p><a className="btn btn-success" href="/work/login">Login</a></p>
                  <div className="create_account-bottom">
                    Don't have an account?<br />
                    <a href="/contact-sales/">Contact sales</a> or <a href="/get-started/hire/">Get free trial</a>.
                  </div>
                </li>
                <li>
                  <h2>For <em>Developers</em></h2>
                  <p>Join over 21 million developers, practice coding skills, prepare for interviews, and get hired.</p>
                  <p><a className="btn btn-primary" href="/login/">Login</a></p>
                  <div className="create_account-bottom">
                    Don't have an account?<br />
                    <a href="/signup/">Sign up</a>.
                  </div>
                </li>
              </ul>
              
            </div>
          </div>
        </article>
      </div>
    </main>
  );
};

export default SignUp;
