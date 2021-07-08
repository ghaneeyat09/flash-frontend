import { Link } from 'react-router-dom';

const HomeModalPop = ({className}) => {
    return(
        <div className={className}>
            <ul>
                <li>
                    <Link to="/">home</Link>
                </li>
                <li>
                    <Link to="/service">service</Link>
                </li>
                <li>
                    <Link to="/features">features</Link>
                </li>
                <li>
                    <Link to="/about">about</Link>
                </li>
                <li>
                    <Link to="/signup">signUp</Link>
                </li>
                <li>
                <Link to="/login">login</Link>
                </li>
            </ul> 
        </div>
    )
}
export default HomeModalPop;