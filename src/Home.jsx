import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";

export default function Home() {
  const navigate = useNavigate();

  function handleNavigateToInput() {
    navigate("/bucketList");
  }

  function handleNavigateToTasks() {
    navigate("/tasks");
  }

  function handleNavigateToCompletedBucket() {
    navigate("/completedBucketList");
  }

  function handleNavigateToCompletedTasks() {
    navigate("/completedTasks");
  }

  return (
    <div>
      <div>
        <FaHome size={40} style={{ color: "#e272bd", marginBottom: "20px" }} />
      </div>

      <button id="bucketList" onClick={handleNavigateToInput}>
        Bucket List
      </button>
      <br />
      <br />
      <button id="completedBucketList" onClick={handleNavigateToCompletedBucket}>
        Completed Bucket List
      </button>
      <br />
      <br />

      <button id="tasks" onClick={handleNavigateToTasks}>
        Tasks
      </button>
      <br />
      <br />
      <button id="completedTasks" onClick={handleNavigateToCompletedTasks}>
        Completed Tasks
      </button>
      <br />
      <br />
    </div>
  );
}
