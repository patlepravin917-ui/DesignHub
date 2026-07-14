import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowRight,
  FaTrophy,
  FaUsers,
  FaAward,
} from "react-icons/fa";
import Navbar from "../components/Navbar";
import CompetitionCard from "../components/CompetitionCard";
import SearchBar from "../components/SearchBar";
import Footer from "../components/Footer";
import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import ScrollToTopButton from "../components/ScrollToTopButton";

function Home() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [competitions, setCompetitions] = useState([]);
  useEffect(() => {
    fetchCompetitions();
  }, []);
  const fetchCompetitions = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "competitions"));
      const list = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCompetitions(list);
    } catch (error) {
      console.error("Error fetching competitions:", error);
    }
  };
  const filteredCompetitions = competitions.filter((competition) => {
    const matchesSearch =
      competition.title
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      competition.category
        .toLowerCase()
        .includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" ||
      competition.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  return (
    <>
      <Navbar />
      {/* Hero Section */}

      <section className="hero">
  <div className="hero-left">
    <span className="hero-badge">
      ⭐ Trusted by 5,000+ Designers Worldwide
    </span>
    <h1>
      Discover Amazing
      <span> Design Competitions</span>
    </h1>
    <p>
      Participate in national and international design competitions,
      showcase your creativity, win exciting prizes and build a
      professional portfolio that stands out.
    </p>
    <div className="hero-buttons">
      <button
        className="hero-btn"
        onClick={() => navigate("/competitions")}
      >
        Explore Competitions
        <FaArrowRight />
      </button>
      <button
        className="secondary-btn"
        onClick={() => navigate("/submit")}
      >
        Submit Project
      </button>
    </div>
    <div className="hero-stats">
      <div className="stat-card">
        <FaTrophy />
        <h2>500+</h2>
        <p>Competitions</p>
      </div>
      <div className="stat-card">
        <FaUsers />
        <h2>50K+</h2>
        <p>Students</p>
      </div>
      <div className="stat-card">
        <FaAward />
        <h2>₹10M+</h2>
        <p>Prize Pool</p>
      </div>
    </div>
  </div>
  <div className="hero-right">
    <img
      src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900"
      alt="DesignHub Hero"
    />
  </div>
</section>

      {/* Why Choose DesignHub */}

<section className="why-section">
  <h2>Why Choose DesignHub?</h2>
  <p className="why-subtitle">
    Everything you need to discover, participate and showcase your creativity.
  </p>
  <div className="why-grid">
    <div className="why-card">
      <div className="why-icon">🏆</div>
      <h3>Win Rewards</h3>
      <p>
        Participate in exciting competitions and win amazing prizes.
      </p>
    </div>
    <div className="why-card">
      <div className="why-icon">🌍</div>
      <h3>Global Opportunities</h3>
      <p>
        Discover national and international design competitions.
      </p>
    </div>
    <div className="why-card">
      <div className="why-icon">🚀</div>
      <h3>Build Portfolio</h3>
      <p>
        Showcase your projects and strengthen your professional portfolio.
      </p>
    </div>
  </div>
</section>

{/* How It Works */}

<section className="how-section">
  <h2>How It Works</h2>
  <p className="how-subtitle">
    Get started with DesignHub in just four simple steps.
  </p>
  <div className="how-grid">
    <div className="step-card">
      <span>1</span>
      <h3>Create Account</h3>
      <p>Sign up and create your DesignHub profile.</p>
    </div>
    <div className="step-card">
      <span>2</span>
      <h3>Explore</h3>
      <p>Browse national and international competitions.</p>
    </div>
    <div className="step-card">
      <span>3</span>
      <h3>Submit Project</h3>
      <p>Upload your project before the deadline.</p>
    </div>
    <div className="step-card">
      <span>4</span>
      <h3>Win Rewards</h3>
      <p>Get recognized and win exciting prizes.</p>
    </div>
  </div>
</section>

{/* Featured */}
      <section className="featured-section">
        <h2>Featured Competitions</h2>
        <SearchBar
          search={search}
          setSearch={setSearch}
        />
        <div className="filter-buttons">
          <button
            onClick={() => setSelectedCategory("All")}
          >
            All
          </button>
          <button
            onClick={() => setSelectedCategory("UI/UX")}
          >
            UI/UX
          </button>
          <button
            onClick={() => setSelectedCategory("Graphic Design")}
          >
            Graphic Design
          </button>
          <button
            onClick={() => setSelectedCategory("Architecture")}
          >
            Architecture
          </button>
        </div>
        <div className="competition-grid">
          {filteredCompetitions.length > 0 ? (
            filteredCompetitions.map((competition) => (
              <CompetitionCard
                key={competition.id}
                competition={competition}
              />
            ))
          ) : (
            <h3
              style={{
                textAlign: "center",
                width: "100%",
                color: "#666",
                marginTop: "40px",
              }}
            >
              No competitions available.
            </h3>
          )}
        </div>
      </section>

{/* Testimonials */}

<section className="testimonial-section">
  <h2>What Our Users Say</h2>
  <p className="testimonial-subtitle">
    Thousands of students trust DesignHub to discover amazing opportunities.
  </p>
  <div className="testimonial-grid">
    <div className="testimonial-card">
      <h3>⭐⭐⭐⭐⭐</h3>
      <p>
        "DesignHub helped me discover amazing competitions and improve my portfolio."
      </p>
      <h4>Rahul Sharma</h4>
      <small>UI/UX Student</small>
    </div>
    <div className="testimonial-card">
      <h3>⭐⭐⭐⭐⭐</h3>
      <p>
        "The interface is simple, clean and very helpful for students."
      </p>
      <h4>Anjali Verma</h4>
      <small>Graphic Designer</small>
    </div>
    <div className="testimonial-card">
      <h3>⭐⭐⭐⭐⭐</h3>
      <p>
        "I submitted my first design project through DesignHub. Great experience!"
      </p>
      <h4>Aditya Patil</h4>
      <small>Architecture Student</small>
    </div>
  </div>
</section>

{/* FAQ */}

<section className="faq-section">
  <h2>Frequently Asked Questions</h2>
  <p className="faq-subtitle">
    Find answers to the most common questions about DesignHub.
  </p>
  <div className="faq-container">
    <details className="faq-item">
      <summary>Is DesignHub free to use?</summary>
      <p>
        Yes. DesignHub is completely free for students to explore competitions and submit projects.
      </p>
    </details>
    <details className="faq-item">
      <summary>Can I participate in multiple competitions?</summary>
      <p>
        Yes. You can participate in as many competitions as you want.
      </p>
    </details>
    <details className="faq-item">
      <summary>How do I submit my project?</summary>
      <p>
        Go to the Submit Project page, fill in the required details and submit your work.
      </p>
    </details>
    <details className="faq-item">
      <summary>How are winners selected?</summary>
      <p>
        Winners are selected by the respective competition organizers based on their evaluation criteria.
      </p>
    </details>
  </div>
</section>

{/* Newsletter */}

<section className="newsletter-section">
  <h2>Stay Updated</h2>
  <p>
    Subscribe to receive the latest design competitions and opportunities.
  </p>
  <div className="newsletter-box">
    <input
      type="email"
      placeholder="Enter your email"
    />
    <button>
      Subscribe
    </button>
  </div>
</section>

{/* CTA */}
<section className="cta-section">
  <h2>Ready to Showcase Your Creativity?</h2>
  <p>
    Join thousands of students participating in exciting design competitions.
  </p>
  <div className="cta-buttons">
    <button
      className="hero-btn"
      onClick={() => navigate("/competitions")}
    >
      Explore Competitions
    </button>
          <button
            className="secondary-btn"
            onClick={() => navigate("/submit")}
            >
              Submit Project
          </button>
           </div>
         </section>    
      <Footer />
      <ScrollToTopButton />
    </>
  );
}
export default Home;