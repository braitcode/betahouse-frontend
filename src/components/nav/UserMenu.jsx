import { NavLink } from "react-router-dom";

const UserMenu = () =>{
  return (
    <>
      <div className="p-3 mt-2 mb-2 h4 bg-light">User Links</div>

      <ul className="list-group list-unstyled">
        <li>
          <NavLink className="list-group-item text-dark" to="/dashboard/user/profile">
            Profile
          </NavLink>
        </li>

        {/* <li>
          <NavLink className="list-group-item text-dark" to="/dashboard/user/orders">
            Orders
          </NavLink>
        </li> */}
      </ul>
    </>
  );
}

export default UserMenu
