import Select from "react-select";
import { useState } from 'react';

const ReactSelect = ({classname, cClick}) => {
    const [input, setInput] = useState('');
    const options = [
        {label: "Delivered", value: "delivered"},
        {label: "In Transit", value: "in transit"}
    ]
    const handleChange = (value) => {
        setInput(value)
    }
    const submitOrderStatus = () => {
        const token = localStorage.getItem("token");
        const orderId = localStorage.getItem("orderId");
        console.log(input.value);
        switch(input.value) {
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
    
    
    return(
        <div>
            <div id="statusCon" className={classname}>
             <div className="subStatusCon">
               <label className="statusLabel">what would you like to change the order status to?</label>
               <Select options={options} 
                    value={input}
                    isSearchable
                    onChange={handleChange}
                    placeholder="enter a new status for this order"
               />
               <div id="popBtnCon">
                    <button className="popBtn" type="submit" onClick={submitOrderStatus}> submit</button>
                    <button className="popBtn" onClick={cClick}> cancel</button>
               </div>
               </div>
         </div>
        </div>
    )
}
export default ReactSelect;