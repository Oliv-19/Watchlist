import { useState } from "react";
import { login, register } from "../services/user";
import { Icon } from "./Icons";
import { useData } from "./hooks";
import { useEffect } from "react";
import { useAuth } from "./AuthContext";

function Input({label, type, placeholder, formType}){
    return (
        <>
            {formType == 'signUp' ? (
                <>
                    <label className="font-medium text-(--color-bg-light)">
                        {label}
                        <input type={type} id={type} name={type} 
                        placeholder={placeholder} 
                        className={`w-full bg-(--color-text-bg) p-3 rounded-xl 
                        mt-2 focus:bg-(--color-input-bg)/80 focus:outline-2 
                        focus:outline-(--color-focus) hover:outline-2 
                        hover:outline-(--color-input-bg) `} />
                    </label>
                </>
                ): (
                    <>
                    <label className="font-medium text-(--color-input-bg)">
                        {label}
                        <input type={type} id={type} name={type} 
                        placeholder={placeholder} 
                        className={`w-full bg-(--color-text-bg) p-3 rounded-xl 
                        mt-2 focus:bg-(--color-input-bg)/80 focus:outline-2 
                        focus:outline-(--color-focus) hover:outline-2 
                        hover:outline-(--color-input-bg) placeholder:text-(--color-input-bg)/80
                        `} />
                    </label>
                    </>
                )
            }
        </>
    )
}

function Info(){
    const light = {
        name: 'light',
        bigText: 'Login',
        textOne: `Log in to your account`,
        textTwo: `Don't have an account?`,
        icon: `w-25 fill-(--color-bg)`,
        div: ` bg-(--color-bg-light) translate-x-0`,
        bigTextStyle: `text-(--color-bg)`,
        textOneStyle: `text-(--color-focus)`,
        textTwoStyle: `text-(--color-input-bg)`,
        button: `text-(--color-bg) hover:border-(--color-bg)`,
        buttonText: <>
            <Icon title={'leftArrow'} style={'fill-(--color-bg) w-6'} />
            <p>Sign Up</p>  
        </>
    }
    const dark = {
        name: 'dark',
        bigText: 'Sign Up',
        textOne: `Create a new account`,
        textTwo: `Already have an account?`,
        icon: `w-25 fill-(--color-bg-light) `,
        div: `bg-(--color-bg) -translate-x-full`,
        bigTextStyle: `text-(--color-bg-light) text-5xl font-bold`,
        textOneStyle: `font-medium text-(--color-input-bg)  text-xl`,
        textTwoStyle: `font-medium text-(--color-focus) text-[1rem]`,
        button: `text-(--color-bg-light) font-bold flex items-center gap-1 
            cursor-pointer w-fit h-8  border-b-2 border-transparent 
            hover:border-b-2 hover:border-(--color-bg-light)`,
        buttonText: <>
            <p>Login</p>
            <Icon title={'rightArrow'} style={'fill-(--color-bg-light) w-6'} />
        </>
    }
    const [theme, setTheme ]= useState(light)
    const changeTheme = () => {
        setTheme(prev => prev.name == 'light' ? dark: light)
    }
    return (
        <>
        <div className={`absolute right-0 transition-all duration-300 p-15 
                ease-in-out w-100 h-full flex flex-col justify-center items-center
                rounded-2xl ${theme.div}`}>
            <Icon title={'tv'} style={theme.icon}></Icon>
            <h1 className={`${theme.bigTextStyle} text-5xl font-bold`}>
                {theme.bigText}
                </h1>
            <h1 className={`${theme.textOneStyle} font-medium`}>
                {theme.textOne}
                </h1>
            <h1 className={`${theme.textTwoStyle} font-medium text-[1rem]`}>
                {theme.textTwo}
                </h1>
            <button onClick={changeTheme} className={`${theme.button} font-bold 
            flex items-center gap-1 cursor-pointer w-fit h-8  border-b-2 
            border-transparent hover:border-b-2`}>
                {theme.buttonText}
            </button>
        </div>

        </>
    )
}

function SignUpForm({onClose, isOpen}){
    const [form, setForm] = useState(null)
    const {userLogin} = useAuth()
    useEffect(()=> {
        async function registerUser(){
            if(form?.email){
                try{
                    await register(form)
                    await login(form)
                    userLogin(form)
                    onClose()
                } catch (error){
                    console.log(error);
                    
                }
            }
        }
        registerUser()
    }, [form])
    const submit = async(e)=> {
        e.preventDefault()
        
        const form = new FormData(e.target)
        setForm({email: form.get('email'), password: form.get('password')})
    }
    return (
        <>
            <form id="login" onSubmit={submit} action="" className={`
                    p-10 w-100 h-full flex flex-col justify-center gap-5  
                    bg-(--color-bg-light) rounded-r-2xl
                `}>
                <Input label={'Email address'} type={'email'} 
                placeholder={'email@address.com'} formType={'login'}/>
                <Input label={'Password'} type={'password'} 
                placeholder={'********'} formType={'login'}/>
                <button type="submit" className="w-full bg-(--color-input-bg) p-3 rounded-xl mt-7 cursor-pointer font-medium hover:bg-(--color-input-bg)/90 hover:outline-2 hover:outline-(--color-focus) ">Submit</button>
            </form>

        </>
    )
}

function LoginForm({onClose, isOpen}){
    const [form, setForm] = useState(null)
    const {userLogin} = useAuth()
    useEffect(()=> {
        async function registerUser(){
            if(form?.email){
                try{
                    await login(form)
                    userLogin(form)
                    onClose()
                } catch (error){
                    console.log(error);
                }
            }
        }
        registerUser()
    }, [form])
    const submit = async(e)=> {
        e.preventDefault()
        
        const form = new FormData(e.target)
        setForm({email: form.get('email'), password: form.get('password')})
    }
    return (
        <>
            <form id="signUp" onSubmit={submit} action="" className={`
            p-10 w-100 h-full flex flex-col justify-center gap-5  
            `}>
                <Input label={'Email address'} type={'email'} 
                placeholder={'email@address.com'} formType={'signUp'}/>
                <Input label={'Password'} type={'password'}
                 placeholder={'********'} formType={'signUp'}/>
                <button type="submit" className="w-full bg-(--color-input-bg) p-3 rounded-xl mt-7 cursor-pointer font-medium hover:bg-(--color-input-bg)/90 hover:outline-2 hover:outline-(--color-focus) ">Submit</button>
            </form>
        </>
    )
}

export function Account({isOpen, onClose}) {

    if(!isOpen) return null
   return (
    <div className="fixed top-0 z-2 right-0  h-full w-full flex">
        <div onClick={onClose} className="fixed inset-0 bg-black/50 transition-opacity"></div>
        <div className="relative flex justify-center w-200 h-120 
            bg-(--color-bg)  m-auto rounded-2xl text-slate-200 
            ">
            <LoginForm onClose={onClose}/>
            <SignUpForm onClose={onClose}/>
            <Info />
        </div> 
    </div>
  );
}