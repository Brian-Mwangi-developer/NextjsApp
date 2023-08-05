'use client'
import Link from "next/link"
import React, { useEffect } from "react"
import { useRouter } from "next/navigation";
import  axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage(){
    const [buttonDisabled,setButtonDisabled] =React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const router = useRouter();
        const [user, setUser] = React.useState({
            email: "",
            password: ""
        });  

        const onLogin = async (e:any) => {
            e.preventDefault();
            setLoading(true);
            try {
                const response = await axios.post('/api/users/login', user);
                console.log(response.data);
                toast.success("login success")
                router.push("/profile")
                // localStorage.setItem('token', response.data.token);
                // localStorage.setItem('user', JSON.stringify(response.data.user));
            } catch (error: any) {
                console.log("Login Failed",error.message);
                toast.error(error.message);
            }finally{
                setLoading(false);
            }
        };
    useEffect(() =>{
        if(user.email.length>0 && user.password.length>0){
            setButtonDisabled(false);
        }else{
            setButtonDisabled(true);
        }

    },[user])


    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
           <h1>{loading ? "processing...." : "Login"}</h1> 
           <hr />
           <label htmlFor="email">email</label>
           <input
           className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            type="text"
           id="email"
            value={user.email}
           onChange={(e) => setUser({...user, email: e.target.value})} 
           placeholder="email" />
           <label htmlFor="password">password</label>
           <input
           className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            type="password"
           id="password"
            value={user.password}
           onChange={(e) => setUser({...user, password: e.target.value})} 
           placeholder="password" />
           <button className="p-2 border border-gray-200 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-white" onClick={onLogin}>{buttonDisabled? "No Login": "Login"}</button>
           <Link href="/signup"> visit Signup page</Link>
           <Link href="/forgotpassword" className="text-blue-500 text"> forgot password?</Link>
        </div>
    )
}