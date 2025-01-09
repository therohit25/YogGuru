import DashboardBox from "../../components/DashboardBox";

const Dashboard = () => {
  return (
    <div style={{ width: "67vw" }}>
      <div className="container d-flex flex-wrap justify-content-center gap-5">
        <DashboardBox />
        <DashboardBox />
        <DashboardBox />
        <DashboardBox />
      </div>
    </div>
  );
};

export default Dashboard;
