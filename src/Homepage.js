import { FaBars } from 'react-icons/fa';
import {Link} from 'react-router-dom';
import { useState } from 'react';
import flash3 from './flash3.jpg';
import HomeModalPop from './HomeModalPop';
const HomePage = () => {
    const [init, setInit] = useState(false);
    const toggleModal = () => {
    setInit(!init);
}
    return(
        <div className="homePage">
           <div className="main-content">
            <nav>
                <h1 className="flash">flash</h1>
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
                    <FaBars className="faBar" onClick={toggleModal}/>
            </nav>
            <HomeModalPop className={init ? "showModal" : "hideModal"}/>
            <div className="content1">
               <div className="para">
                    <p className="word-trans">HEY <strong>Flashlites</strong>, just in a flash, your package will be right in front of you.
                    cool right?...of course super cool.
                    </p>
                    <p className="word-trans2">
                        We pickup/deliver nationwide and with us, your package is most safe.
                    </p>
              </div>
            </div>
            <div className="content2">
                <img src={flash3} alt="flash3" className="flash3"/>
            </div>
        
            <div className="content3">
              <div className="subContent3">
                <h2>enquire now</h2>
                <h5>we will get back to you within 24hrs</h5>
                <form>
                    <input placeholder="Full Name"/><br/>
                    <input placeholder="Email"/><br/>
                    <input placeholder="Phone"/><br/>
                    <textarea placeholder="Message"></textarea>
                    <button>submit</button>
                </form>
              </div>
            </div>
            <div className="content4">
                <h2>
                    We provide premium courier services with utmost care.
                </h2>
                <p>
                    Good customer service guaranteed!
                </p>
                <button>learn more</button>
            </div>
            <div className="content5">
                <p>copyright &copy; 2021</p>
           </div>
        </div>
        </div>

    )
}

export default HomePage;