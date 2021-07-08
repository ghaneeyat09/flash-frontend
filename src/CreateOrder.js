import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useHistory } from 'react-router';
import React, { useState } from "react";
//import AutocompletePlaces from './PlacesApi';
//create order component
const CreateOrder = () => {
      const [amount, setAmount] = useState('');
      //display amount func
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
         resolver: yupResolver(schema),
         mode: 'onChange'
      });
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
      return(
          <div className="createOrder">
             <div className="logoStyle">
                <h1 className="eff">f</h1>
                <h3 className="lash">lash</h3>
             </div>
             <form onSubmit={handleSubmit(onSubmit)}>
                <div className="orderContainer">
                  <input {...register('pickup')} className="pickup" placeholder="Pickup Location" />
                  <p className="messages">{errors.pickup?.message}</p>
                  <input {...register('destination')} type="text"  className="destination" placeholder="Destination"/>
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