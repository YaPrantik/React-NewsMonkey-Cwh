import React  from 'react'
import loading from  './Comp files/loader.gif'


const Spinner = ()=> {
        return (
            <div className="text-center">
                <img className="my-4" src={loading} alt="loading" />
            </div>
        )
}

export default Spinner
