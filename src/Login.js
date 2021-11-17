import { useHistory } from "react-router";
import { useForm} from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link } from "react-router-dom";
const Login = () => {
    const history = useHistory();
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    if(token && email !== "kiekie@gmail.com"){
        history.push('/userprofile');
    }
    else if(token && email === "kiekie@gmail.com"){
        history.push('/adminprofile');
    }
    const schema = yup.object().shape({
        email: yup.string()
        .required("email is required")
        .email(),
        password: yup.string()
        .required("password is required")
        /*.min(6, "password is too short, must be a minimum of 6 characters")*/
        /*.max(10, "password is too long, must be a maximum of 10 characters"),*/
      });

    const { register, 
        handleSubmit, 
        formState: {errors}} = useForm({
            resolver: yupResolver(schema)
        });
    const onSubmit = (data) => {
       console.log(data);
       //login admin
       if(data.email === 'kiekie@gmail.com' && data.password === 'kiekiexo' ){
 
        fetch("https://send-it-back-app.herokuapp.com/user/login", 
        {
            method: "POST",
            headers: {
                Accept: "application/json, text/plain, *//*", "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: data.email,
                password: data.password
            })
        })
        .then((res) => res.json())
        .then((res) => {
            console.log(res);
                const { _id } = res.user;
                localStorage.setItem("token", res.token)
                fetch(`https://send-it-back-app.herokuapp.com/user/login/${_id}`, {
                    method: "GET",
                    headers: {
                        Authorization: res.token,
                    }
                })
                .then((res) => res.json())
                .then((res) => {
                    if(res.success){
                        localStorage.setItem("firstName", res.data.firstName);
                        localStorage.setItem("userId", res.data._id);
                        localStorage.setItem("email", res.data.email);
                        history.push('/AdminProfile')
                        
                    }
                    else if(res.error){
                      console.log(res.error)
                    }
                })
            })
            .catch((err) => {
                console.log(err)
            }
            )
        } 
        //login basic user
       else{
       fetch("https://send-it-back-app.herokuapp.com/user/login", 
       {
           method: "POST",
           headers: {
             Accept: "application/json, text/plain, */*", "Content-Type": "application/json"
           },
           body: JSON.stringify({
               email: data.email,
               password: data.password
           })
       })
       .then((res) => res.json())
       .then((res) => {
           if(res.message === "user not found" && data.password !== ""){
               alert('user not registered');
               return false;
           }
           if(res.message === "invalid email/password"){
               alert('invalid email/password');
           }
           else if(res.token){
             const { _id } = res.user;
             localStorage.setItem("token", res.token)
             fetch(`https://send-it-back-app.herokuapp.com/user/login/${_id}`, {
                 method: "GET",
                 headers: {
                     Authorization: res.token,
                 }
             })
             .then((res) => res.json())
             .then((res) => {
                 if(res.success){
                     localStorage.setItem("firstName", res.data.firstName);
                     localStorage.setItem("userId", res.data._id);
                     data.email = "";
                     history.push('/UserProfile');
                    
                 }
                 else if(res.error){
                    console.log(res.error)
                 }
             })
         }
     })
     .catch((err) => {
         console.log(err);
     });
    }
}

    return(
        <div className="login">
            <div className="logoStyle">
                <h1 className="eff">f</h1>
                <h3 className="lash">lash</h3>
           </div>
           <form onSubmit={handleSubmit(onSubmit)}>
           <div className="loginCon">
               <input className="email" placeholder="Email" type="text" {...register('email')}/>
               <p className="messages" style={{color: "red"}}>{errors.email?.message}</p>
               <input className="password" placeholder="password" type="password" {...register('password')}/>
               <p className="messages" style={{color: "red"}}>{errors.password?.message}</p>
               <div className="loginBtn">
                   <button>Login</button>
                   <p className="loginSign">no account yet?....<Link to="/signupUser">Signup</Link></p>
               </div>
           </div>
           </form>
        </div>
    );
    }
export default Login;