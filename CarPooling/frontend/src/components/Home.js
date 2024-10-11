import React from 'react';
import { useSpring, animated } from 'react-spring';
import { Car, Users, DollarSign, Leaf } from 'lucide-react';
import { Image } from 'react-bootstrap';

const Feature = ({ icon, title, description, delay }) => {
  const props = useSpring({
    opacity: 1,
    transform: 'translateY(0)',
    from: { opacity: 0, transform: 'translateY(50px)' },
    delay,
  });

  return (
    <animated.div style={props} className="col-md-6 col-lg-3 mb-4">
      <div className="card h-100 text-center shadow-sm hover-shadow transition">
        <div className="card-body">
          <div className="mb-3 text-warning">{icon}</div>
          <h5 className="card-title font-weight-bold">{title}</h5>
          <p className="card-text">{description}</p>
        </div>
      </div>
    </animated.div>
  );
};

const HowItWorksStep = ({ number, title, description, delay }) => {
  const props = useSpring({
    opacity: 1,
    transform: 'translateX(0)',
    from: { opacity: 0, transform: 'translateX(-50px)' },
    delay,
  });

  return (
    <animated.div style={props} className="col-md-4 mb-4">
      <div className="card h-100 border-0 bg-light">
        <div className="card-body">
          <div className="display-4 text-warning mb-3">{number}</div>
          <h5 className="card-title font-weight-bold">{title}</h5>
          <p className="card-text">{description}</p>
        </div>
      </div>
    </animated.div>
  );
};

const LandingPage = () => {
  const titleProps = useSpring({
    opacity: 1,
    transform: 'translateY(0)',
    from: { opacity: 0, transform: 'translateY(-50px)' },
    delay: 200,
  });

  return (
    <div className="min-vh-100 d-flex flex-column font-family-poppins">
      <section className="hero py-5" style={{ background: 'linear-gradient(to right, #6a11cb, #2575fc)', color: 'white' }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <animated.h1 style={titleProps} className="display-4 fw-bold mb-3">
                Share Rides, Save Money, Reduce Emissions
              </animated.h1>
              <p className="lead mb-4">
                Join <span className="gradient-text focus-ring fs-3 fw-bold">RideShare</span> today and revolutionize your daily commute!
              </p>
              <div>
                <button className="btn btn-warning btn-lg me-3 mb-3 hover-effect">Get Started</button>
                <button className="btn btn-outline-light btn-lg mb-3 hover-effect">Learn More</button>
              </div>
            </div>
            <div className="col-lg-6">
              <Image src={"/images/ride_share_hero.gif"} alt="waving to car driver" fluid />
            </div>
          </div>
        </div>
      </section>
      <section id="features" className="py-5">
        <div className="container">
          <h2 className="text-center mb-5 font-weight-bold">Why choose <span className="gradient-text focus-ring fs-3 fw-bold">RideShare</span>?</h2>
          <div className="row">
            <Feature
              icon={<Car size={48} />}
              title="Convenient Rides"
              description="Find rides going your way with our easy-to-use app."
              delay={100}
            />
            <Feature
              icon={<Users size={48} />}
              title="Meet New People"
              description="Connect with like-minded commuters and make new friends."
              delay={200}
            />
            <Feature
              icon={<DollarSign size={48} />}
              title="Save Money"
              description="Split fuel costs and reduce your daily transportation expenses."
              delay={300}
            />
            <Feature
              icon={<Leaf size={48} />}
              title="Eco-Friendly"
              description="Reduce your carbon footprint by sharing rides."
              delay={400}
            />
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5 font-weight-bold">How It Works</h2>
          <div className="row">
            <HowItWorksStep
              number="1"
              title="Sign Up"
              description="Create your account and set up your profile in minutes."
              delay={100}
            />
            <HowItWorksStep
              number="2"
              title="Find a Ride"
              description="Search for available carpools or offer your own ride with ease."
              delay={200}
            />
            <HowItWorksStep
              number="3"
              title="Travel Together"
              description="Meet your carpool buddies and enjoy a sustainable journey!"
              delay={300}
            />
          </div>
        </div>
      </section>

      {/* ... (keep the existing contact section and footer) ... */}
    </div>
  );
};

export default LandingPage;
