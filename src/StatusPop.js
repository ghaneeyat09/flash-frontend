/*import ReactSelect from "./Select";
import { useState } from 'react';

const StatusPop = ({classname}) => {
    const [input, setInput] = useState("");
    const handleChange =(value) => {
        setInput(value)
     }
    //submit new order status 
  const submitOrderStatus = () => {
    const token = localStorage.getItem("token");
    const orderId = localStorage.getItem("orderId");
    console.log("we made it here");
    switch(input) {
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
      case "in transit":
       fetch(`https://send-it-back-app.herokuapp.com/order/${orderId}`, {
           method: "PATCH",
           headers: {
              "Content-Type": "application/json",
               Authorization: token
           },
           body: JSON.stringify({
              status: "in transit"
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

     return (
         <div id="statusCon" className={classname}>
             <div className="subStatusCon">
               <label className="statusLabel">what would you like to change the order status to?</label>
               <ReactSelect input={input} onchange={handleChange}/>
               <div id="popBtnCon">
                    <button className="popBtn" type="submit" onClick={submitOrderStatus}> submit</button>
                    <button className="popBtn"> cancel</button>
               </div>
               </div>
         </div>

     )
}
export default StatusPop;
*/