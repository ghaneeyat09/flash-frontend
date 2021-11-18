import { useState, useEffect} from "react"; 
import { FaPen } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';
import { Link, useHistory } from 'react-router-dom';
import CurrentLocPopup from './CurrentLocPop';
const AdminProfile = () => {
  const history = useHistory()
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const [display, setDisplay] = useState(false);
  const [data, setData] = useState([]);
  //const [loggedIn, setLoggedIn] = useState(true);


  //clearpop
  const clearPop = () => {
    setDisplay(false);
}
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
  const changeOrderStatus = (orderId, orderStatus) => {
    if(orderStatus === "ready to pick"){
    const newOrderStatus = prompt("do you want to change the status of the parcel order to 'on transit' or 'delivered'?");
   switch(newOrderStatus) {
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
    else if(orderStatus === "on transit"){
      if(window.confirm("do you want to change the order to 'delivered'?")){
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
    }
  }

  }

//display pop
  const displayPop = (rowStatus, rowId) => {
    if(rowStatus !== "delivered" && rowStatus !== "cancelled"){
        setDisplay(true);
        localStorage.setItem("id", rowId);

}
  /*changePresentLoation 
  const changePresentLoation = (orderId) => {
  
    //const presentLocation = prompt("enter the present location of the parcel delivey order");
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
    }*/

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
  useEffect(getOrders, [token, userId]);
  
    return(
        <div className="adminProfile">
           <div className="sectionA"> 
            <CurrentLocPopup text="enter the parcel's current location" classname={display ? "popShow" : "popHide"} cClick={clearPop}/>
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
                 <td className="location"><button className="locationBtn" onClick={() => displayPop(order.status, order._id)} style={{cursor: 'pointer'}} disabled={order.status === "cancelled" ? true : false}>{order.presentLoc}</button></td>
                 <td><button className="btnBtnAdmin" onClick={() => changeOrderStatus(order._id, order.status)} disabled={order.status === "cancelled" || order.status === "delivered" ? true : false}><FaPen className="faedit" style={{color: 'green', fontSize: '12px'}} /></button></td>
                 <td><button className="btnBtnAdmin" onClick={() => deleteOrder(order._id)} disabled={order.status === "ready to pick" || order.status === "on transit" ? true : false}><FaTrash className="fatrash" style={{color: 'red', fontSize: '12px'}}/></button></td>
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
                <Link to="/guide"><button>admin's guide</button></Link>

             </div>
           </div>
        </div>

    )
}
export default AdminProfile;