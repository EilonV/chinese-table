import $ from 'jquery'
import innerCircle from '../assets/pics/inner-circle.png'
import outerCircle from '../assets/pics/outer-circle.png'
import daysCircle from '../assets/pics/days-circle.png'
import monthsCircle from '../assets/pics/months-circle.png'
import { chart } from '../data/chart'
import { useRef } from 'react'

// import { Tests } from '../components/tests'
export const Home = () => {
    const daysCircleRef = useRef()
    const monthsCircleRef = useRef()
    const promptRef = useRef()
    const monthsAngleOptions = [360], daysAngleOptions = [360]

    let day = 0, month = 0
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
        // console.log('IN fixAngle, angle:', angle);
        // console.log('EL', el);
        switch (el) {
            case 'rotate':
                if (daysCircleRef.current) {
                    // console.log('case rotate', findClosestNumber(getAngle(angle), el));
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
            const regex = /[-.0-9]/g
            let newAngle = angle.match(regex)
            let newIntAngle = parseFloat(newAngle.join(''))

            if (newIntAngle < 0) {
                // console.log('returning:', newIntAngle + 360);
                return newIntAngle + 360;
            }
            else {
                // console.log('returning:', newIntAngle);
                return newIntAngle
            }
        }
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
                calculateSpinOutcome(daysAngleOptions.indexOf(closestNumber), 'days')
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
                calculateSpinOutcome(monthsAngleOptions.indexOf(closestNumber), 'months')

                break;
            default:
                break;
        }
        return closestNumber;
    }

    const calculateSpinOutcome = (result, wheel) => {
        const months = [0, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
        const girl = $('.girl')[0]
        const boy = $('.boy')[0]

        if (wheel === 'months') {
            month = months[result]
            if (result === 12)
                month = 0;
        }
        else {
            day = result
            console.log(day);
            // if (day === 28)
            //     day = 0
        }

        // console.log(`a/m: ${day + 1}/${month + 1}`);
        console.log('boy/girl: ', chart[day][month]);

        if (chart[day][month] === 'G') {
            console.log('GIRL');
            boy.classList.remove('active')
            girl.classList.add('active');
        }
        else {
            girl.classList.remove('active')
            boy.classList.add('active');
        }
    }

    // ROTATION FUNCTIONS @@@@ @@@@ @@@@
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
                    // console.log('ROTATE2 ELEMENT', event.target);
                    fixAngle(event.target.style.transform, 'rotate2')
                });
            };

            start = function (e) {
                e.preventDefault();
                if (daysCircleRef.current) {
                    daysCircleRef.current.style.pointerEvents = "none"
                }
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

                // over 360 calculation
                var newAngle = (angle + rotation) % 360
                if (newAngle < 0) newAngle += 360;
                // console.log(newAngle);
                return (rot.style.transform = "rotate(" + (newAngle) + "deg)");
            };

            stop = function () {
                angle += rotation;
                if (daysCircleRef.current) {
                    if (daysCircleRef.current.style.pointerEvents === "none") {
                        daysCircleRef.current.style.pointerEvents = "auto"
                    }

                }
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
                if (newAngle < 0) newAngle += 360;
                // console.log(newAngle);
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
            <div className='months-wrapper flex align-center justify-center'  >
                <img src={monthsCircle} alt="" id="rotate2" ref={monthsCircleRef} />
            </div>
        </div>
        <div className="circle box days-circle flex align-center justify-center">
            <img src={daysCircle} alt="days circle" id="rotate" ref={daysCircleRef} />
        </div>
        <div className='circle inner-circle flex align-center justify-center' draggable={false}>
            <img src={innerCircle} alt="inner circle" />
            {/* <div className='white-circle' /> */}
            <div ref={promptRef} className='prompt flex align-center justify-center'>
                <p className='girl flex align-center justify-center'>בת</p>
                <p className='boy flex align-center justify-center'>בן</p>
            </div>
        </div>
    </section>
}