import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux'
import { fetchSampleAsync, editSampleAsync } from "./sampleSlice";
import { useParams } from 'react-router'
import { useNavigate } from 'react-router-dom';

export default function SampleEdit() {

    const navigate = useNavigate();
    const { id } = useParams();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const dispatch = useDispatch()
    const { entities } = useSelector(state => state.samples)
    useEffect(() => {
        dispatch(fetchSampleAsync(id));
    }, [dispatch,id])
    if (entities.length === 0) {
        return <div>Loading</div>
    }


    const onSubmit = data => {

        let entity = entities.find(e => e._id === id);
        const newEnity = { ...entity, sampleName: data.sampleName }
        dispatch(editSampleAsync(newEnity));
        navigate('/');
    }


    return (
        /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
        <form onSubmit={handleSubmit(onSubmit)} >
            {/* include validation with required or other standard HTML validation rules */}
            <input defaultValue={entities.find(entity => entity._id === id).sampleName}  {...register("sampleName", { required: true })} />
            {/* errors will return when field validation fails  */}
            {errors.exampleRequired && <span>This field is required</span>}

            <input type="submit" />
        </form>
    );
}