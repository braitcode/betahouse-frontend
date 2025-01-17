import { useAuth } from "../../components/contexts/Auth";
import Jumbotron from "../../components/Jumbotron";
import UserMenu from "../../components/nav/UserMenu";
import Navbar from "../../components/Navbar";
// import SideNav from "../../components/SideNav";

const UserDashboard = () => {
  // context
  const { auth, setAuth } = useAuth();

  return (
    <>
      <Navbar />
      {/* <SideNav /> */}
      <Jumbotron title={`Hello ${auth?.user?.name}`} subTitle="Dashboard" />

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="p-3 mt-2 mb-2 h4 bg-light">User Information</div>

            <ul className="list-group">
              <li className="list-group-item">{auth?.user?.name}</li>
              <li className="list-group-item">{auth?.user?.email}</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserDashboard