

const Register = () => {

    return (<div className="row">
        <div className="col-4"></div>
        <div className="col-4">
            <form>
                <div className="form-group">
                    <label>User Name</label>
                    <input type="text" className="form-control" />

                </div>
                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
        <div className="col-4"></div>
    </div>)
}
export default Register;