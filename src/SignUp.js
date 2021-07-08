import { FaUserTie } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";
const SignUp = () => {
    return(
        <div className="signUp">
            <div className="logoStyle">
                <h1 className="eff">f</h1>
                <h3 className="lash">lash</h3>
            </div>
            <div className="navigations">
                <button><FaUserTie className="icon"/><Link to="/signupAdmin">Admin</Link></button><br/>
                <button><Link to="/signupUser"><FaUsers className="icon"/>User</Link></button>
            </div>
        </div>
    )
}
export default SignUp;