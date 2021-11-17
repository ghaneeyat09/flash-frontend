import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useHistory } from 'react-router';
import React, { useState, useEffect } from "react";

//create order component

const google = window.google ? window.google : {}
const CreateOrder = () => {
      const [amount, setAmount] = useState('');
      //const [pickupLocation, setPickupLocation] = useState('');
      //display amount func0

      const initialState = {
      pickup: "",
      destination: "",
      recName: "",
      recPhone: "",
      weight: ""
       };
  const [input, setInput] = React.useState(initialState);

      const showAmount = ()=> {
         const weight = document.getElementsByClassName('weight')[0].value;
         setAmount( weight * 330);
      }
      
      const history = useHistory();
      const schema = yup.object().shape({
         pickup: yup.string().required("pickup is required"),
         destination: yup.string().required("destination is required"),
         recName: yup.string().required("recipient name is required"),
         recPhone: yup.string().required("recipient phone no. is required")
         .matches(/^(\+|00)[0-9]{1,3}[0-9]{4,14}(?:x.+)?$/, "phone number must start with a country code"),
         weight: yup.string().required(),
      });

      const { register, handleSubmit, formState: {errors}} = useForm({
         resolver: yupResolver(schema)
      });
      //onsubmit func
      const onSubmit = (data) => {
         console.log(data);
        const token = localStorage.getItem("token");
        const order = {
           userId: localStorage.getItem("userId"),
           pickup: data.pickup,
           destination: data.destination,
           recName: data.recName,
           recPhoneNo: data.recPhone,
           weight: data.weight
        }
        fetch("https://send-it-back-app.herokuapp.com/order", {
         method: "POST",
         headers: {
            Accept: "application/json, text/plain, */*", "Content-Type": "application/json",
            Authorization: token
        },
        body: JSON.stringify(order)
      })
      .then(res => res.json())
      .then(res => {
         console.log(res);
         if(res.message === "order created"){
             alert("Order created successfully"); 
             history.push('/UserProfile');

         }
         else if(res.error){
             console.log(res.error);
         }
     })
      .catch((err) => {
         alert("an error occured");
         console.log(err);
      })
     
   }
   useEffect( ()=> {
 
    let autocomplete = new google.maps.places.Autocomplete(
          (document.getElementById('pickup')),
  
          { types: ['geocode']});
  
  
      google.maps.event.addListener(autocomplete, 'place_changed', function() {
  
        fillInAddress(autocomplete);
  
      });
  
    let autocomplete2 = new google.maps.places.Autocomplete(document.getElementById('destination'), { 
    types: [ 'geocode' ] });
  
      google.maps.event.addListener(autocomplete2, 'place_changed', function() {
  
        fillInAddress(autocomplete2);
  
      });
      const fillInAddress=()=>{
        setInput({...input, 
          pickup: document.getElementById("pickup").value, 
          destination: document.getElementById('destination').value});
      }
   
          },[]);
    //handle input change
    const handleChange = event => {
           setInput({
             ...input,
           [event.target.name]: event.target.value
        })
          };
        
      return(
          <div className="createOrder">
             <div className="logoStyle">
                <h1 className="eff">f</h1>
                <h3 className="lash">lash</h3>
             </div>
             <form onSubmit={handleSubmit(onSubmit)} autoComplete="new-password">
                <div className="orderContainer">
                 <input {...register('pickup')} type='text' className="pickup" id="pickup" value={input.pickup} onChange={handleChange} placeholder='Pickup Location'/>
                 <p className="messages">{errors.pickup?.message}</p>
                  <input {...register('destination')} type="text" id="destination"  className="destination" placeholder="Destination"/>
                  <p className="messages">{errors.destination?.message}</p>
                  <input type="text" className="recName" placeholder="Recipient Name"  {...register('recName')}/>
                  <p className="messages">{errors.recName?.message}</p>
                  <input type="text" className="recMob" placeholder="Recipient Phone"  {...register('recPhone')}/>
                  <p className="messages">{errors.recPhone?.message}</p>
                  <input type="number" className="weight" placeholder="Parcel Weight(kg)" onMouseOut={showAmount} {...register('weight')}/>
                  <p className="messages">{errors.weight?.message}</p>
                  <h3>Amount: <span className="amount">N {amount}</span></h3>
                  <div className="btn-btn-con">
                    <button className="orderSubmit">submit</button>
                  </div>
                </div>
             </form>
          </div>
      )
}
export default CreateOrder;