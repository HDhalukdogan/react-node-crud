import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSamplesAsync, deleteSampleAsync } from './sampleSlice';
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
export default function SampleList() {
    const dispatch = useDispatch()
    const { entities, loading } = useSelector(state => state.samples)
    const [show, setShow] = useState(false);
    const [entity, setEntity] = useState({})

    const handleClose = () => {
        dispatch(deleteSampleAsync(entity._id))
        setShow(false);
    }
    const handleShow = (entity) => {
        setEntity(entity)
        setShow(true);
    }
    useEffect(() => {
        dispatch(fetchSamplesAsync());
    }, [dispatch])
    if (loading) {
        return <div>Loading</div>
    }

    return (
        <div>
            <Link to='/create'>Create New</Link>
            <Table striped>
                <thead>
                    <tr>
                        <th>Name </th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {entities.map(entity => <tr key={entity._id}>
                        <td><Link to={`/details/${entity._id}`}>{entity.sampleName}</Link></td>
                        <td><button className='btn btn-outline-primary' ><Link to={`/edit/${entity._id}`}>Edit</Link></button></td>
                        <td><button className='btn btn-outline-danger' onClick={() => handleShow(entity)} >Delete</button></td>
                    </tr>
                    )}
                </tbody>
            </Table>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure?</Modal.Title>
                </Modal.Header>
                <Modal.Body>{entity.sampleName}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={handleClose}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
