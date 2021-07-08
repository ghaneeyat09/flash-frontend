import { useHistory } from "react-router";
import { useForm} from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
const SignupUser = () => {
    const history = useHistory();
    const schema = yup.object().shape({
        firstName: yup.string().required("first name is required"),
        lastName: yup.string().required("last name is required"),
        email: yup.string()
        .required("email is required")
        .email(),
        phone: yup.string()
        .required("phone number is required")
        .matches(/^(\+|00)[0-9]{1,3}[0-9]{4,14}(?:x.+)?$/, "phone number must start with a country code"),
        password: yup.string()
        .required("password is required")
        .min(6, "password is too short, must be a minimum of 6 characters")
        .max(10, "password is too long, must be a maximum of 10 characters"),
        confirmPassword: yup.string()
        .required("confirm password is required")
        .oneOf([yup.ref('password'), null], 'passwords must match')
      });      
    const { register, 
          handleSubmit, 
          formState: {errors} 
          } = useForm({
            resolver: yupResolver(schema),
          });
    const onSubmit = (data) => {
        console.log(data);
        const user = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            mobileNo: data.phone,
            password: data.password,
            confirmPassword: data.confirmPassword 
            }     
        fetch("https://send-it-back-app.herokuapp.com/user/register", {
            method: "POST",
            headers: {
                Accept: "application/json, text/plain, */*", "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        .then((res) => res.json())
        .then((res) => {
            console.log(res);
            if(res.message === "mail exists"){
                console.log("mail exists");
                alert('mail exists');
                return false;
            }
            else if(res.token){
                const { _id } = res.user;
                localStorage.setItem("token", res.token);
                fetch(`https://send-it-back-app.herokuapp.com/user/login/${_id}`, {
                    method: "GET",
                    headers: {
                        Authorization: res.token,
                    }
            })
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                if(res.success){
                    console.log("result", res.data);
                    localStorage.setItem("firstName", res.data.firstName);
                    localStorage.setItem("userId", res.data._id);
                    history.push('/UserProfile')
                } 
                else if(res.error){
                    console.log("error", res.error)
                }
            })
        }
       })
         
        .catch((err) => {
            console.log(err);
        })
    }
    return(
        <div className="signupUser">
            <div className="logoStyle">
                <h1 className="eff">f</h1>
                <h3 className="lash">lash</h3>
            </div>
            <div className="formContainer">
                <form className="form" onSubmit={handleSubmit(onSubmit)}>
                    <input placeholder="first name" type="text" {...register("firstName")}/>
                    <p className="messages">{errors.firstName?.message}</p>
                    <input placeholder="last name" type="text" {...register("lastName")}/>
                    <p className="messages">{errors.lastName?.message}</p>
                    <input placeholder="email" type="text" {...register("email")}/>
                    <p className="messages">{errors.email?.message}</p>
                    <input placeholder="phone" type="text" {...register('phone')}/>
                    <p className="messages">{errors.phone?.message}</p>
                    <input placeholder="password" type="password" {...register("password")}/>
                    <p className="messages">{errors.password?.message}</p>
                    <input placeholder="confirm password" type="password" {...register("confirmPassword")}/>
                    <p style={{color: "red"}} className="messages">{errors.confirmPassword?.message}</p>
                    <div className="btnCon">
                       <button className="submit">submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default SignupUser;