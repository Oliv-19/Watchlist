import { useState } from "react";
import { login, register } from "../services/user";
import { Icon } from "./Icons";
import { useData } from "./hooks";
import { useEffect } from "react";
import { useAuth } from "./AuthContext";
import { view } from "drizzle-orm/sqlite-core";

function Input({label, type, placeholder, formType}){
    return (
        <>
            {formType == 'login' ? (
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
        bigTextStyle: `text-(--color-bg-light)`,
        textOneStyle: `text-(--color-input-bg)`,
        textTwoStyle: `text-(--color-focus)`,
        button: `text-(--color-bg-light) hover:border-(--color-bg-light)`,
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
                ease-in-out w-100 h-full hidden md:flex md:flex-col justify-center 
                items-center rounded-2xl ${theme.div} `}>
            <Icon title={'tv'} style={theme.icon}></Icon>
            <h1 className={`${theme.bigTextStyle} text-5xl font-bold `}>
                {theme.bigText}
                </h1>
            <h1 className={`${theme.textOneStyle} font-medium text-xl`}>
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

function Title({text}){
    return (
        <>
            <Icon title={'tv'} style={text == 'Login' ? 'w-10  fill-(--color-input-bg)' : 
                'w-10  fill-(--color-input-bg)'} />
            <h1 className={`text-3xl font-bold ${text == 'Login' ? 
                'text-(--color-input-bg)' : 'text-(--color-bg-light)'}`}>
                {text}
            </h1>
        </>
    )
}

function BtnChangeView ({changeView, text}){
    return (
        <button className={`flex md:hidden btn 
        ${text == 'Login' ? 'text-(--color-input-bg) flex-row self-start ' : 
            'text-(--color-bg-light) self-end flex-row-reverse'}`} 
        onClick={changeView}>
            <Icon title={text == 'Login' ? 'leftArrow': 'rightArrow'} style={'fill-(--color-bg-light) w-6'} />
            <p >{text}</p>     
        </button>
    )
}

function Form ({onClose, changeView, view}){
    const [form, setForm] = useState(null)
    const {userLogin} = useAuth()
    useEffect(()=> {
        async function registerUser(){
            if(form?.email){
                try{
                    const data = await register(form)
                    userLogin({user: data.user, id: data.id})
                    onClose()
                } catch (error){
                    console.log(error);
                    
                }
            }
        }
        async function loginUser(){
            if(form?.email){
                try{
                    const data = await login(form)
                    userLogin({user: data.user, id: data.id})
                    onClose()
                } catch (error){
                    console.log(error);
                }
            }
        }
        if(view == 'login') loginUser()
        else if(view == 'signUp') registerUser()
    }, [form])
    const submit = async(e)=> {
        e.preventDefault()
        
        const form = new FormData(e.target)
        setForm({email: form.get('email'), password: form.get('password')})
    }
    return (
        <>
        <form id={view} onSubmit={submit} action="" className={`form w-90 md:w-100  h-full
             ${view == 'login' ? 'bg-(--color-bg) rounded-l-2xl' :
                'bg-(--color-bg-light) rounded-r-2xl'
            }
            `}>
            <div className="flex items-end md:hidden gap-2">
                <Title text={ view == 'login' ? 'Login': 'Sign Up'}/>
            </div>
            <Input label={'Email address'} type={'email'} 
                placeholder={'email@address.com'} formType={view}/>
            <Input label={'Password'} type={'password'} 
            placeholder={'********'} formType={view}/>

             <button type="submit" className={` btnSubmit
                ${view == 'login' ? `bg-(--color-input-bg) p-3 
                    hover:bg-(--color-input-bg)/90 hover:outline-2 
                    hover:outline-(--color-focus)`: 
                    `bg-(--color-input-bg) 
                    hover:bg-(--color-input-bg)/90 hover:outline-2 
                    hover:outline-(--color-focus) `}
                `}>Submit</button>
                

            <BtnChangeView changeView={changeView} 
                text={view == 'signUp' ? 'Login': 'Sign Up'}/>
        </form>

        </>
    )
}

export function Account({isOpen, onClose}) {
    const [view, setView] = useState('login')
    if(!isOpen) return null
   return (
    <div className="fixed top-0 z-2 right-0  h-full w-full flex">
        <div onClick={onClose} className="fixed inset-0 bg-black/50 transition-opacity"></div>
        <div className={`relative justify-center w-200 h-120 
            bg-(--color-bg)  m-auto rounded-2xl text-slate-200 flex 
            transition-all duration-300 ease-in-out
            ${view == 'login' ? 'translate-x-0': '-translate-x-90'}
            `}>
            <Form onClose={onClose} changeView={() => {setView('signUp')}} view={'login'}/>
            <Form onClose={onClose} changeView={() => {setView('login')}} view={'signUp'}/>
            <Info />
        </div> 

    </div>
  );
}