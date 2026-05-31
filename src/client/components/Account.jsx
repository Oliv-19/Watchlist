import { useState } from "react";
import { register } from "../services/user";
import { Icon } from "./Icons";
import { useData } from "./hooks";
import { useEffect } from "react";

function Input({label, type, placeholder}){
    return (
        <>
            <label className="font-medium text-slate-200">
                {label}
                <input type={type} id={type} name={type} placeholder={placeholder} className="w-full bg-(--color-text-bg) p-3 rounded-xl mt-2 focus:bg-(--color-input-bg)/80 focus:outline-2 focus:outline-(--color-focus) hover:outline-2 hover:outline-(--color-input-bg) " />
            </label>

        </>
    )
}

export function Account({isOpen, onClose}) {
    const [form, setForm] = useState(null)
    useEffect(()=> {
        async function registerUser(){
            if(form?.email){
                console.log('front');
                try{
                    await register(form)
                } catch (error){
                    console.log(error);
                    
                }
            }
        }
        registerUser()
    }, [form])
    if(!isOpen) return null
    const submit = async(e)=> {
        e.preventDefault()
        
        const form = new FormData(e.target)
        setForm({email: form.get('email'), password: form.get('password')})
        onClose()
    }



   return (
    <div  className="fixed top-0 z-2 right-0  h-full w-full flex">
        <div onClick={onClose} className="fixed inset-0 bg-black/50 transition-opacity"></div>
        <div className="relative w-100 h-120 bg-(--color-bg) m-auto rounded-2xl text-slate-200 p-10">
            <form onSubmit={submit} action="" className="flex flex-col justify-center gap-5">
                <h1 className="text-3xl font-medium">Sign up</h1>
                <h1 className="font-medium text-slate-200/80">Create a new account</h1>
                <Input label={'Email address'} type={'email'} placeholder={'email@address.com'}/>
                <Input label={'Password'} type={'password'} placeholder={'password'}/>
                <button type="submit" className="w-full bg-(--color-input-bg) p-3 rounded-xl mt-7 cursor-pointer font-medium hover:bg-(--color-input-bg)/90 hover:outline-2 hover:outline-(--color-focus) ">Submit</button>
            </form>
        </div>
    </div>
  );
}