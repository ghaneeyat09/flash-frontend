import { useState, useEffect} from "react"; 
import { FaPen } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';
import { Link, useHistory } from 'react-router-dom';
const AdminProfile = () => {
  const history = useHistory()
  const token = localStorage.getItem("token");
  const [data, setData] = useState([]);
  
  //if no token 
  if(!token){
     history.push('/login');
  }
  //deleteOrder
  const deleteOrder = (orderId) => {
    
    if(window.confirm("Are you sure you want to delete this order?")){
        fetch(`https://send-it-back-app.herokuapp.com/order/${orderId}/delete`,{
          method: "DELETE",
          headers: {
              "Content-Type": "application/json",
              Authorization: token
          },
          })
          .then((res) => res.json())
          .then((res) => {
              if(res.message === "order deleted"){
                  alert("order deleted");
                  window.location.reload();
              }
          })
          .catch((err) => {
              console.log(err);
          })
    }
    else{
      console.log("don't delete this order")
    }

  }
  //change order status
  const changeOrderStatus = (orderId) => {

    const orderStatus = prompt("do you want to change the status of the parcel order to 'on transit' or 'delivered'");
   switch(orderStatus) {
   case "delivered":
      fetch(`https://send-it-back-app.herokuapp.com/order/${orderId}`, {
          method: "PATCH",
          headers: {
             "Content-Type": "application/json",
              Authorization: token
          },
          body: JSON.stringify({
             status: "delivered"
          })
      })
      .then((res) => res.json())
      .then((res) => {
          if(res.message === "data patched"){
              console.log("done");
              window.location.reload();
          }
      })
      .catch((err) => {
          console.log(err);
      })
      break;

      //no default
   case "on transit":
    fetch(`https://send-it-back-app.herokuapp.com/order/${orderId}`, {
        method: "PATCH",
        headers: {
           "Content-Type": "application/json",
            Authorization: token
        },
        body: JSON.stringify({
           status: "on transit"
        })
    })
    .then((res) => res.json())
    .then((res) => {
        if(res.message === "data patched"){
            console.log("done");
            window.location.reload();
        }
    })
    .catch((err) => {
        console.log(err);
    })
    break;
    //no default
}
  }

  //changePresentLoation 
  const changePresentLoation = (orderId) => {

    const presentLocation = prompt("enter the present location of the parcel delivey order");
    if(presentLocation !== null){
        console.log("yay")
        fetch(`https://send-it-back-app.herokuapp.com/order/${orderId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: token
            },
            body: JSON.stringify({
                presentLoc: presentLocation
            })
        })
        .then((res) => res.json())
        .then((res) => {
            if(res.message === "data patched"){
                console.log("yes");
                window.location.reload();
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }

  }
  //logoutAdmin
  const logoutAdmin = () => {
    localStorage.clear();
  }
  //dislay all orders
  const getOrders = () => {
    fetch('https://send-it-back-app.herokuapp.com/order', {
    method: "GET",
    headers: {
        Authorization : token
    },
 })
    .then((res) => res.json())
    .then((result) => {
      if(result.orders){
      const allOrders = result.orders
      setData(allOrders);
      }
    })
    .catch((err) => {
      console.log(err);
    })
  }
  useEffect(getOrders, [token]);


    return(
        <div className="adminProfile">
           <div className="sectionA"> 
             <table border="1" className="adminTable">
             <thead>
                <tr>
                    <th className="orderid">orderID</th>
                    <th>userId</th>
                    <th>pickup location</th>
                    <th>destination</th>
                    <th>recipient</th>
                    <th>recipient phone</th>
                    <th>status</th>
                    <th>present location</th>
                    <th className="edit">edit</th>
                    <th className="trash">delete</th>
                </tr>
             </thead>
             <tbody>
               {
                 data.map((order) => (
               <tr key={order._id}>
                 <td className="orderId">{order._id}</td>
                 <td>{order.userId}</td>
                 <td>{order.pickup}</td>
                 <td>{order.destination}</td>
                 <td>{order.recName}</td>
                 <td>{order.recPhoneNo}</td>
                 <td>{order.status}</td>
                 <td className="location"><button className="locationBtn" onClick={() => changePresentLoation(order._id)} style={{cursor: 'pointer'}} disabled={order.status === "cancelled" ? true : false}>{order.presentLoc}</button></td>
                 <td><button className="btnBtnAdmin" onClick={() => changeOrderStatus(order._id)} disabled={order.status === "cancelled" ? true : false}><FaPen style={{color: 'green', fontSize: '12px'}} /></button></td>
                 <td><button className="btnBtnAdmin" onClick={() => deleteOrder(order._id)} disabled={order.status === "cancelled" ? true : false}><FaTrash style={{color: 'red', fontSize: '12px'}}/></button></td>
               </tr>
                 ))
}
             </tbody>
             </table>
           </div>
           <div className="sectionB" >
             <div className="logoStyle">
                <h1 className="eff">f</h1>
                <h3 className="lash">lash</h3>
             </div>
             <h2 className="admin">Admin</h2>
             <h2><span>{localStorage.getItem('firstName')}</span></h2>
             <div className="logout">
                <Link to="/"><button onClick={logoutAdmin}>logOut</button></Link>
             </div>
           </div>
        </div>
    )
}
export default AdminProfile;