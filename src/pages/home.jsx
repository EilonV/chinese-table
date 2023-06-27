import $ from 'jquery'
import innerCircle from '../assets/pics/inner-circle.png'
import outerCircle from '../assets/pics/outer-circle.png'
import daysCircle from '../assets/pics/days-circle.png'
import monthsCircle from '../assets/pics/months-circle.png'
import { useRef } from 'react'

// import { Tests } from '../components/tests'
export const Home = () => {

    const daysCircleRef = useRef()
    const monthsCircleRef = useRef()
    const promptRef = useRef()
    const monthsAngleOptions = [360], daysAngleOptions = [360]

    let daysAngleStart = 360, monthAngleStart = 360

    for (var i = 0; i < 27; i++) {
        daysAngleOptions.push(daysAngleStart -= 12.8571428571)
    }
    for (var j = 0; j < 11; j++) {
        monthsAngleOptions.push(monthAngleStart -= 30)
    }
    daysAngleOptions.push(0)
    monthsAngleOptions.push(0)

    const fixAngle = (angle, el) => {
        // console.log(findClosestNumber(getAngle(angle)));
        console.log('EL', el);
        switch (el) {
            case 'rotate':
                if (daysCircleRef.current) {
                    daysCircleRef.current.style.transform = `rotate(${findClosestNumber(getAngle(angle), el)}deg)`
                    daysCircleRef.current.style.transition = `0.5s`
                    promptRef.current.style.animation = 'flashh 0.4s 1 ease-in-out'
                    setTimeout(() => {
                        daysCircleRef.current.style.transition = `0s`

                    }, 100);
                    setTimeout(() => {
                        promptRef.current.style.animation = 'none'

                    }, 300);
                }
                break;
            case 'rotate2':
                if (monthsCircleRef.current) {
                    monthsCircleRef.current.style.transform = `rotate(${findClosestNumber(getAngle(angle), el)}deg)`
                    monthsCircleRef.current.style.transition = `0.5s`
                    setTimeout(() => {
                        monthsCircleRef.current.style.transition = `0s`
                    }, 100);
                }
                break;
            default:
                break;
        }
    }

    const getAngle = (angle) => {
        // takes string 'rotate(num deg) and breaks it to an int
        if (angle) {
            const regex = /[.0-9]/g
            let newAngle = angle.match(regex)
            return newAngle.join('')
        }
        else return 'IDK'
    }

    const findClosestNumber = (number, el) => {
        let closestNumber
        let smallestDifference
        switch (el) {
            case 'rotate':
                closestNumber = daysAngleOptions[0];
                smallestDifference = Math.abs(number - closestNumber);

                for (let i = 1; i < daysAngleOptions.length; i++) {
                    const currentNumber = daysAngleOptions[i];
                    const difference = Math.abs(number - currentNumber);

                    if (difference < smallestDifference) {
                        closestNumber = currentNumber;
                        smallestDifference = difference;
                    }
                }
                break;
            case 'rotate2':
                closestNumber = monthsAngleOptions[0];
                smallestDifference = Math.abs(number - closestNumber);

                for (let i = 1; i < monthsAngleOptions.length; i++) {
                    const currentNumber = monthsAngleOptions[i];
                    const difference = Math.abs(number - currentNumber);

                    if (difference < smallestDifference) {
                        closestNumber = currentNumber;
                        smallestDifference = difference;
                    }
                }
                break;
            default:
                break;
        }
        // if (!Array.isArray(daysAngleOptions) || daysAngleOptions.length === 0) {
        //     throw new Error('Invalid input: daysAngleOptions must be a non-empty array.');
        // }

        // let closestNumber = daysAngleOptions[0];
        // let smallestDifference = Math.abs(number - closestNumber);

        // for (let i = 1; i < daysAngleOptions.length; i++) {
        //     const currentNumber = daysAngleOptions[i];
        //     const difference = Math.abs(number - currentNumber);

        //     if (difference < smallestDifference) {
        //         closestNumber = currentNumber;
        //         smallestDifference = difference;
        //     }
        // }
        return closestNumber;
    }

    // const checkOnCircle = (e) => {
    //     const imageRect = daysCircleRef.current.getBoundingClientRect();
    //     const centerX = imageRect.left + imageRect.width / 2;
    //     const centerY = imageRect.top + imageRect.height / 2;
    //     const radius = imageRect.width / 2;

    //     const mouseX = e.clientX;
    //     const mouseY = e.clientY;

    //     const distance = Math.sqrt((mouseX - centerX) ** 2 + (mouseY - centerY) ** 2);

    //     console.log(distance <= radius);
    //     return distance <= radius;
    // }

    // const checkOnCircle = (e) => {
    //     console.log(e);
    //     console.log('WE ARE HERE @@@@@@@@@@@@@@@@@@@@@@@@@@@');
    // }

    setTimeout(() => {
        //ROTATE2
        (function () {
            var init,
                rotate,
                start,
                stop,
                active = false,
                angle = 0,
                rotation = 0,
                startAngle = 0,
                center = {
                    x: 0,
                    y: 0
                },
                R2D = 180 / Math.PI,
                rot = document.getElementById("rotate2");

            init = function () {
                rot.addEventListener("mousedown", start, false);
                $(rot).bind("mousemove", function (event) {
                    if (active === true) {
                        event.preventDefault();
                        rotate(event);
                    }
                });
                $(rot).bind("mouseup", function (event) {
                    event.preventDefault();
                    stop(event);
                    console.log('ROTATE2 ELEMENT', event.target);
                    fixAngle(event.target.style.transform, 'rotate2')
                });
            };

            start = function (e) {
                e.preventDefault();
                var bb = this.getBoundingClientRect(),
                    t = bb.top,
                    l = bb.left,
                    h = bb.height,
                    w = bb.width,
                    x,
                    y;
                center = {
                    x: l + w / 2,
                    y: t + h / 2
                };
                x = e.clientX - center.x;
                y = e.clientY - center.y;
                startAngle = R2D * Math.atan2(y, x);
                return (active = true);
            };

            rotate = function (e) {
                e.preventDefault();
                var x = e.clientX - center.x,
                    y = e.clientY - center.y,
                    d = R2D * Math.atan2(y, x);
                rotation = d - startAngle;

                // over 360 / under 0 calculation
                var newAngle = (angle + rotation) % 360
                return (rot.style.transform = "rotate(" + (newAngle) + "deg)");
            };

            stop = function () {
                angle += rotation;
                return (active = false);
            };

            init();
        }.call(this));

        //ROTATE 
        (function () {
            var init,
                rotate,
                start,
                stop,
                active = false,
                angle = 0,
                rotation = 0,
                startAngle = 0,
                center = {
                    x: 0,
                    y: 0
                },
                R2D = 180 / Math.PI,
                rot = document.getElementById("rotate");
            init = function () {
                rot.addEventListener("mousedown", start, false);
                $(rot).bind("mousemove", function (event) {
                    if (active === true) {
                        event.preventDefault();
                        rotate(event);
                    }
                });
                $(rot).bind("mouseup", function (event) {
                    event.preventDefault();
                    stop(event);
                    console.log('ROTATE MOUSE UP');
                    console.log('ROTATE1 ELEMENT', event.target);
                    fixAngle(event.target.style.transform, 'rotate')
                });
            };

            start = function (e) {
                e.preventDefault();
                var bb = this.getBoundingClientRect(),
                    t = bb.top,
                    l = bb.left,
                    h = bb.height,
                    w = bb.width,
                    x,
                    y;
                center = {
                    x: l + w / 2,
                    y: t + h / 2
                };
                x = e.clientX - center.x;
                y = e.clientY - center.y;
                startAngle = R2D * Math.atan2(y, x);
                return (active = true);
            };

            rotate = function (e) {
                e.preventDefault();
                var x = e.clientX - center.x,
                    y = e.clientY - center.y,
                    d = R2D * Math.atan2(y, x);
                rotation = d - startAngle;

                // over 360 / under 0 calculation
                var newAngle = (angle + rotation) % 360
                return (rot.style.transform = "rotate(" + newAngle + "deg)");
            };

            stop = function () {
                angle += rotation;
                return (active = false);
            };

            init();
        }.call(this));
    }, 100);

    return <section className='home flex align-center justify-center'>
        <div className='circle outer-circle  flex align-center justify-center' draggable={false}>
            <img src={outerCircle} alt="outer circle" />
        </div>
        <div className="circle months-circle flex align-center justify-center" >
            <img src={monthsCircle} alt="" id="rotate2" ref={monthsCircleRef} />
        </div>
        <div className="circle box days-circle flex align-center justify-center">
            <img src={daysCircle} alt="days circle" id="rotate" ref={daysCircleRef} />
        </div>
        <div className='circle inner-circle flex align-center justify-center' draggable={false}>
            <img src={innerCircle} alt="inner circle" />
            {/* <div className='white-circle' /> */}
            <p ref={promptRef} className='flex align-center justify-center'></p>
        </div>
        <div>
            <p>Days:</p>
            <p>Months:</p>
        </div>
    </section>
}