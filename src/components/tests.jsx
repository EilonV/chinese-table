import { useRef } from 'react'
import pic from '../assets/pics/inner-circle.png'

export const Tests = () => {
    const imgRef = useRef()
    // console.log(imgRef.current.getBoundingClientRect()
    // );

    const test = (e) => {
        console.log(e.clientX, e.clientY);
    }
    return <section className="days-wrapper">
        <div className="days">
            <img className='circle' src={pic} alt={pic} ref={imgRef} onMouseMove={test} />
        </div>
    </section>
}