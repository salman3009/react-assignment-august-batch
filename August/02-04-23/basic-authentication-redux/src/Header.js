
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header=()=>{

  const authentication = useSelector((state)=>state.auth.authentication);


     return (<nav className="navbar navbar-expand-lg navbar-light bg-light">
     <a className="navbar-brand" href="#">Newton</a>
     <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
       <span className="navbar-toggler-icon"></span>
     </button>
   
     <div className="collapse navbar-collapse" id="navbarSupportedContent">
       {!authentication && <ul className="navbar-nav mr-auto">
         <li className="nav-item active">
           <Link className="nav-link" to="login">Login <span className="sr-only">(current)</span></Link>
         </li>
         <li className="nav-item">
           <Link className="nav-link" to="">Register</Link>
         </li>
       </ul>}
      {authentication && <form className="form-inline my-2 my-lg-0">
       <li className="nav-item">
           <Link className="nav-link" to="">Logout</Link>
         </li>
       </form>} 
     </div>
   </nav>)
}

export default Header;