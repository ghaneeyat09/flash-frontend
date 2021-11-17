/*import { useHistory } from 'react-router';
import { useForm} from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

//sign admin component
const SignAdmin = () => {
  const history = useHistory();
    const schema = yup.object().shape({
        firstName: yup.string().required("first name is required"),
        email: yup.string()
        .required("email is required")
        .email(),
        password: yup.string()
        .required("password is required")
        .matches("0987IamSeNDIt87AdMiN0805", "invalid password"),
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
        
        const admin = {
          firstName: data.firstName,
          email: data.email,
          password: data.password,
          confirmPassword: data.confirmPassword
        }

          fetch( "https://send-it-back-app.herokuapp.com/user/register/admin", 
           {
            method: "POST",
            headers: {
                Accept: "application/json, text/plain, *//*", "Content-Type": "application/json"
            },
            body: JSON.stringify(admin)

        })
        .then((res) => res.json())
        .then((result) => {
            console.log(result);
            if(result.message === "mail exists"){
                console.log("mail exists");
                alert('mail exists');
                return false;
            }
            else if(result.token){
                console.log(result);
                const { _id } = result.admin;
                localStorage.setItem("token", result.token);
                fetch(`https://send-it-back-app.herokuapp.com/user/login/${_id}/admin`, {
                    method: "GET",
                    headers: {
                        Authorization: result.token,
                    }
                })
                .then((res) => res.json())
                .then((result) => {
                    console.log(result)
                    if(result.success){
                        console.log("result", result.data);
                        localStorage.setItem("firstName", result.data.firstName);
                        localStorage.setItem("email", result.data.email);
                        localStorage.setItem("adminId", result.data._id);
                        //redirect to admin page
                        history.push('/AdminProfile');
                    }
                    else if(result.error){
                        console.log("error", result.error)
                    }
                })
              }
            })
        .catch((err) => {
            console.log(err);
        }) 
      }
    return(
       <div className="signAdmin">
           <div className="logoStyle">
                <h1 className="eff">f</h1>
                <h3 className="lash">lash</h3>
           </div>
           <div className="adminFormCon">
               <form onSubmit={handleSubmit(onSubmit)} className="adminForm">
                   <input placeholder="first name" {...register('firstName')}/>
                   <p className="messages">{errors.firstName?.message}</p>
                   <input placeholder="email" {...register('email')}/>
                   <p className="messages">{errors.email?.message}</p>
                   <input placeholder="password" {...register('password')}/>
                   <p className="messages">{errors.password?.message}</p>
                   <input placeholder="confirm password" {...register('confirmPassword')}/>
                   <p className="messages">{errors.confirmPassword?.message}</p>
                   <div className="btnCon">
                      <button className="adminBtn">submit</button>
                   </div>  
               </form>
           </div>
       </div>
    )
    }
export default SignAdmin;
*/