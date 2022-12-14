import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector , useDispatch} from 'react-redux';
import { toast } from 'react-toastify';

const Home =() => {

  //  const contacts = useSelector(state => state);
    const retrievedata = JSON.parse(localStorage.add);
   // const retrievedata = localStorage.getItem(JSON.parse('add'));
    const  dispatch = useDispatch();
    const deleteContact = (id) => {dispatch({type: "DELETE_CONTACT", payload: id});
    toast.success("Contact Deleted Successfully!");
};


    return (
        <div className="container">
            <div className ="row">
            <div className ="col-md-12 my-5 text-right">
                <Link to ="/add" className="btn btn-outline-dark">Add Contact</Link>
            </div>
            <div className="col-md-6 mx-auto">
                <h1>Welcome to React Redux Contact Book</h1>
            </div>
            </div>
            <div className ="col-md-10 mx-auto">
                <table className="table table-hover">
                    <thead className="text-white bg-dark text-center">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Number</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {retrievedata.map((contact,id) =>(
                            <tr key={id}>
                                <td>{id+1}</td>
                                <td>{contact.name}</td>
                                <td>{contact.email}</td>
                                <td>{contact.number}</td>
                                <td>
                                    <Link to={`/edit/${contact.id}`} className="btn btn-small btn-primary mr-2">Edit</Link>&nbsp;&nbsp;
                                    <button type="button" onClick={()=>deleteContact(contact.id)} className="btn btn-small btn-danger">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        
    );
}

export default Home