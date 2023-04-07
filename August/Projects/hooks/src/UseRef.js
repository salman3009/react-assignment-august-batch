import {useEffect, useRef} from 'react';

const UseRef =()=>{

    const formType = useRef(null);

    useEffect(()=>{
        console.log(formType.current.id);
        console.log(formType.current.name);
        console.log(formType.current.type);
        formType.current.focus();
        //formType.current.disabled = true;
        formType.current.value = "akash";
    })

    return (<div>
        <input ref={formType} type="text" id="fullname" name="last"/>
    </div>)
}

export default UseRef;