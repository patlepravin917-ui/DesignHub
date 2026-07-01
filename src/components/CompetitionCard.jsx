import { Link } from "react-router-dom";

function CompetitionCard({ competition }) {
  return (
    <div className="competition-card">

      <img
        src={
          competition.image ||
          "https://via.placeholder.com/400x250?text=DesignHub"
        }
        alt={competition.title}
        className="competition-image"
      />

      <div className="competition-content">

        <span className="category">
          {competition.category || "Design"}
        </span>

        <h3>{competition.title}</h3>

        <p>
          <strong>🏆 Prize:</strong>{" "}
          {competition.prize || "To Be Announced"}
        </p>

        <p>
          <strong>📅 Deadline:</strong>{" "}
          {competition.deadline || "Coming Soon"}
        </p>

        <p
          style={{
            color: "#16a34a",
            fontWeight: "bold",
            margin: "10px 0",
          }}
        >
          🟢 Registration Open
        </p>

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