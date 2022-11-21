import React, { useEffect, useState } from 'react'
import { Link, useParams} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

const EditContact = () => {
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [number,setNumber] = useState("");

    const {id} = useParams();
     
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const contacts = useSelector(state=>state);
    const currentContact = contacts.find(contact=> contact.id === parseInt(id));

   useEffect(() => {
       if(currentContact){
           setName(currentContact.name);
           setEmail(currentContact.email);
           setNumber(currentContact.number);
       }
   },[currentContact]);

   const HandleSubmit =(e) => {
    e.preventDefault();

    const checkEmail = contacts.find((contact)=> contact.id !== id && contact.email === email);
    const checkNumber = contacts.find(contact=> contact.id !== id && contact.number === parseInt(number));

    

    if(!email || !number || !name){
        return toast.warning("Please Fill the field");
    }

    if(checkEmail){
        return toast.error("This email is already present");
    }

    if(checkNumber){
        return toast.error("Number already exists");
    }

    const data  = {
        id:parseInt(id),
        name,
        email,
        number
    };

    dispatch({ type: "EDIT_CONTACT", payload: data});
    toast.success("Student Updated Successfully");
    navigate("/");
};

    return (
        <div className="container">
               {currentContact ? (<>
        <h1 className ="display-3  my-5 text-center">Edit Student {id} </h1>
        <div className ="row">
        <div className="col-md-6 shadow mx-auto p-5">
           <form onSubmit={HandleSubmit}>
               <div className="form-group">
                   <input type="text" placeholder="Name" className="form-control"
                   value={name} onChange={(e)=> setName(e.target.value)}/>
               </div>&nbsp;&nbsp;
               <div className="form-group">
                   <input type="email" placeholder="Email" className="form-control"
                   value={email} onChange={(e)=> setEmail(e.target.value)}/>
               </div>&nbsp;&nbsp;
               <div className="form-group">
                   <input type="number" placeholder="Phone Number" className="form-control" 
                   value={number} onChange={(e)=> setNumber(e.target.value)}/>
               </div>&nbsp;&nbsp;&nbsp;
               <div className="form-group">
                   <input type="submit" value="Update Student" className="btn btn-dark"/>&nbsp;&nbsp;&nbsp;
                   <Link to ="/" className ="btn btn-danger ml-5px">Cancel</Link>
               </div>
           </form>
        </div>
    </div>
    </>
      ):(
          <h1 className = "display-3 my-5 text-center">Student with id {id} not exists</h1>
      )}
    </div>
        );
}

export default EditContact
