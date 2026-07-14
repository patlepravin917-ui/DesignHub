import { Link } from "react-router-dom";

function CompetitionCard({ competition }) {
  return (
    <div className="competition-card">

      <div className="card-image-wrapper">

        <img
          src={
            competition.image ||
            "https://via.placeholder.com/400x250?text=DesignHub"
          }
          alt={competition.title}
          className="competition-image"
        />

        <span className="status-badge">
          🟢 Open
        </span>

      </div>

      <div className="competition-content">

        <span className="category">
          {competition.category || "Design"}
        </span>

        <h3>{competition.title}</h3>

        <div className="card-info">

          <p>
            🏆 <strong>Prize</strong><br />
            {competition.prize || "To Be Announced"}
          </p>

          <p>
            📅 <strong>Deadline</strong><br />
            {competition.deadline || "Coming Soon"}
          </p>

        </div>

        <Link to={`/competition/${competition.id}`}>
          <button className="view-btn">
            View Details →
          </button>
        </Link>

      </div>

    </div>
  );
}

export default CompetitionCard;