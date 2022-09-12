import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSampleAsync } from './sampleSlice';
import { useParams } from 'react-router'
export default function SampleDetails() {
    const { id } = useParams();

    const dispatch = useDispatch()
    const { entities, loading } = useSelector(state => state.samples)
    useEffect(() => {
        dispatch(fetchSampleAsync(id));
    }, [dispatch,id])
    if (loading) {
        return <div>Loading</div>
    }
    return (
        <div>
            {entities.length > 0 ? entities.find(s => s._id === id).sampleName : null}
        </div>
    )
}
