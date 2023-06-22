import { useRef } from 'react'
import innerCircle from '../assets/pics/inner-circle.png'

export const Home = () => {
    const circleRef = useRef()
    const cursorRef = useRef()
    let deg = 0
    let mouseX = 0

    document.addEventListener("dragstart", function (event) {
        var img = new Image();
        img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';
        event.dataTransfer.setDragImage(img, 0, 0);
        event.dataTransfer.setData('text/plain', '');
        event.dataTransfer.dropEffect = "grab";

    }, false);



    const rotate = (e) => {
        if (mouseX > e.clientX) {
            circleRef.current.style.transform = `rotate(${deg -= 0.4}deg)`
        }
        if (mouseX < e.clientX) {
            circleRef.current.style.transform = `rotate(${deg += 0.4}deg)`
        }
        mouseX = e.clientX
        e.dataTransfer.dropEffect = "move";
        e.dataTransfer.setData('text/plain', '');

    }


    return <section className='home flex align-center justify-center'>
        <div className='img-wrapper' onDrag={rotate} ref={circleRef} draggable={true}>
            <img id='circle' src={innerCircle} alt="" ref={cursorRef} />
        </div>
    </section>
}