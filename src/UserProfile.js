import { Link, useHistory } from 'react-router-dom';
import { useEffect, useState} from 'react';
import { FaPen } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';
import Popup from './DestinationPopup';
//import AlertJs from './Alert';

const UserProfile = () => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    const [display, setDisplay] = useState(false);
    //const [newDest, setNewdest] = useState('');
    const [data, setData] = useState([]); 
    const [table, setTable] = useState('');
    //const rowTarget = useRef();
    const history = useHistory();
    //destchange
    /*const destChange = (e) => {
        setNewdest(e.target.value);
        console.log(newDest);
    }*/
    //if no token
    if(!token){
        history.push('/login');
     }
    
     //clearPopup
    const clearPop = () => {
        setDisplay(false);
    }
    //displayPop
    const displayPop = (rowStatus, rowId) => {
        if(rowStatus !== "delivered" && rowStatus !== "cancelled"){
            setDisplay(true);
            localStorage.setItem("id", rowId);

    }
    else if(rowStatus === "delivered"){
        alert("parcel order has been delivered");
    }
}
    /*changeDestination
    const changeDest = () => {
        const rowId = localStorage.getItem('id');
        if(newDest !== ""){
                clearPop();
                fetch(`https://send-it-back-app.herokuapp.com/order/${rowId}`, {
                method: "PATCH",
                headers: {
                 "Content-type": "application/json",
                  Authorization: token
               },
               body: JSON.stringify({
                 destination: newDest
               }), 
             })
             .then((res) => res.json())
             .then((res) => {
               console.log(res);
                 if(res.message === "data patched"){
                     alert("Destination changed successfully");
                     window.location.reload();
                 }
             })
             .catch((err) => {
                 console.log(err);
             })
           }
        }*/
    //cancelFunc
    const cancelFunc = (rowId, rowStatus) => {

        //console.log(rowId, rowStatus);
        
        if(rowStatus !== "delivered"){
        
          if(window.confirm('are you sure you want to cancel this order?'))
        {
             cancelOrder(rowId);
            }
        }
        else if(rowStatus === "delivered"){
              alert("parcel order has been delivered");
            }
        
     }

     //cancelOrder
        const cancelOrder = (rowId) => {
        const newStatus = {
            status: 'cancelled'
        }
        fetch(`https://send-it-back-app.herokuapp.com/order/${rowId}/cancel`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: token
            },
            body: JSON.stringify({
                status: newStatus.status
            })
        })
            .then((res) => res.json())
            .then((res) => {
               if(res.message === "data cancelled"){
                   //console.log("order cancelled!");
                   alert('parcel order has been cancelled');
                   window.location.reload();

               }
            })
            .catch((err) => {
                console.log(err)
            })  
    }
    
    //fetch data
    const fetchData = () => {
        fetch(`https://send-it-back-app.herokuapp.com/user/${userId}/order`, {
            method: "GET",
            headers: {
                Authorization: token
            }
        })
        .then(res => res.json())
        .then((res) => {
            if(res.orders.length === 0){
                //console.log("no parcel delivery order yet");
                setTable('no parcel delivery order yet');
            }
            if(res.orders.length > 0){

           const result = res.orders;
           const totalOrders = document.getElementsByClassName('noOfOthers')[0];
           const deliveredOrders = document.getElementsByClassName('deliveredOrders')[0];
           const onTransit = document.getElementsByClassName('ordersOnTransit')[0];
           const delivered = res.orders.filter((order) => order.status === "delivered").length;
           const ordersOnTransit = res.orders.filter((order) => order.status === "on transit").length;
            console.log(result);
            setData(result);
            totalOrders.innerHTML = res.orders.length;
            deliveredOrders.innerHTML = `${delivered}`;
            onTransit.innerHTML = `${ordersOnTransit}`;
           }
           
        })
        .catch((err) => {
            console.log(err);
        })
    }
    useEffect(fetchData, [userId, token]);
    const logOutUser = () => {
        localStorage.clear();
        console.clear();
    }
    return(
        <div className="userProfile">
            <div className="sectionA">
                <div className="logoStyle">
                    <h1 className="eff">f</h1>
                    <h3 className="lash">lash</h3>
                </div>
                <h2>welcome <span>{localStorage.getItem("firstName")}</span></h2>
                <div className="details">
                  <ul>
                      <li>total number of orders: <span className="noOfOthers"></span></li>
                      <li>number of orders delivered: <span className="deliveredOrders"></span></li>
                      <li>number of others on transit: <span className="ordersOnTransit"></span></li>
                  </ul>
                </div>
                <Link to="CreateOrder"><button className="orderBtn">create order</button></Link>
                <Link to="/"><button className="logout" onClick={logOutUser}>logOut</button></Link>
                </div>
                <div className="sectionB">
                    <Popup classname={display? "popShow": "popHide"} cClick={clearPop} text={"enter a new destination"}/>
                    <p className="parcelMsg">{table}</p>
                    <table className="table" border="1">
                        <thead className={data.length >= 1? 'thead': 'theadHide'}>
                            <tr>
                                <th className="orderId">id</th>
                                <th>pickup</th>
                                <th>destination</th>
                                <th>recipient</th>
                                <th>recipient phone</th>
                                <th>order status</th>
                                <th className="edit">edit</th>
                                <th className="cancel">cancel</th>
                            </tr>
                        
                        </thead>
                        <tbody>
                            {
                                data.map((order) => (
                            <tr key={order._id}>
                                <td className="orderId">{order._id}</td>
                                <td>{order.pickup}</td>
                                <td>{order.destination}</td>
                                <td>{order.recName}</td>
                                <td>{order.recPhoneNo}</td>
                                <td className="status">{order.status}</td>
                                <td><button onClick={() => displayPop(order.status, order._id)} className="editBtn userBTn" disabled={order.status === 'cancelled'? true: false}><FaPen style={{color: "green"}}/></button></td>
                                <td> <button onClick={() => cancelFunc(order._id, order.status)} className="cancelBtn userBTn" disabled={order.status === 'cancelled'? true: false}><FaTrash style={{color: 'red'}}/></button></td>
                            </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    <p className='parcelMsg' style={{display: "none"}}>no parcel delivery order yet</p>
                </div>
        </div>
     ) }
                        

export default UserProfile;