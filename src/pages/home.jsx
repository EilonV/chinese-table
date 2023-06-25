import $ from 'jquery'
import innerCircle from '../assets/pics/inner-circle.png'
import outerCircle from '../assets/pics/outer-circle.png'
import daysCircle from '../assets/pics/days-circle.png'
import monthsCircle from '../assets/pics/months-circle.png'
export const Home = () => {

    // const fixateAngle = () => {

    // }

    setTimeout(() => {
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
                $(document).bind("mousemove", function (event) {
                    if (active === true) {
                        event.preventDefault();
                        rotate(event);
                    }
                });
                $(document).bind("mouseup", function (event) {
                    event.preventDefault();
                    stop(event);
                    console.log(event.target.style.transform);
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
                return (rot.style.transform = "rotate(" + (angle + rotation) + "deg)");
            };

            stop = function () {
                angle += rotation;
                return (active = false);
            };

            init();
        }.call(this));
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
                $(document).bind("mousemove", function (event) {
                    if (active === true) {
                        event.preventDefault();
                        rotate(event);
                    }
                });
                $(document).bind("mouseup", function (event) {
                    event.preventDefault();
                    stop(event);
                    console.log(event.target.style.transform);
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
                return (rot.style.transform = "rotate(" + (angle + rotation) + "deg)");
            };

            stop = function () {
                angle += rotation;
                return (active = false);
            };

            init();
        }.call(this));
    }, 100);

    return <section className='home flex align-center justify-center'>
        {/* <div className='inner-circle' id="rotate">
        </div> */}
        <div className='circle outer-circle  flex align-center justify-center' draggable={false}>
            <img src={outerCircle} alt="outer circle" />
        </div>
        <div className="circle months-circle flex align-center justify-center" >
            <img src={monthsCircle} alt="" id="rotate2" />
        </div>
        <div className="circle days-circle flex align-center justify-center">
            <img src={daysCircle} alt="days circle" id="rotate" />
        </div>
        <div className='circle inner-circle flex align-center justify-center' draggable={false}>
            <img src={innerCircle} alt="inner circle" />
            {/* <div className='white-circle' /> */}
            <p>Girl/Boy</p>
        </div>
    </section>
}