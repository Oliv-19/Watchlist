import { createContext, useContext, useEffect, useState} from 'react';
import { updateUserMedia } from '../../services/user';
import { useAuth } from '../AuthContext';

const MediaReviewContext = createContext(null)

export const MediaReviewProvider = ({data, children }) => {
    const [rating, setRating] = useState(0)
    const [review, setReview] = useState('')
    const [status, setStatus] = useState('saved')
    const [isEdit, setIsEdit] = useState(false)
    const [formData, setFormData] = useState(null)

    useEffect(()=> {
        setRating(data.userRating)
        setReview(data.userReview)
        setStatus(data.status)
    }, [data])
    const sendReview = async(e)=> {
        e.preventDefault()
        setFormData({rating, review, status, id: data.id})
        setIsEdit(false)
    }
    const reset = ()=> {
        setReview(data.userReview ? data.userReview: '')
        setRating(data.userRating ? data.userRating: 0)
        setStatus(data.status ? data.status: '')
        setIsEdit(false)
    }
    useEffect(()=> {
        const saveReview = async () => {
            if(formData){
               await updateUserMedia(formData)
            }
        }
        saveReview()
        }, [formData])
    const returnedData = { 
        isEdit, 
        setIsEdit,
        rating, 
        setRating,
        review,
        setReview,
        status, 
        setStatus,
        sendReview,
        reset,
    }
    
    if(!data) return null
    return (
        <MediaReviewContext value={returnedData}>
            {children}
        </MediaReviewContext>
    )
}

export const useMediaReviewData = () => {
    const context = useContext(MediaReviewContext)
    return context
};