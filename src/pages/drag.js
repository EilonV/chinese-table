
    // (function () {
    //     var init,
    //         start,
    //         stop,
    //         move,
    //         _x,
    //         _y,
    //         active = false,
    //         drag = document.getElementById("drag"),
    //         d = document.getElementById("draggable"),
    //         con = document.getElementById("container");

    //     init = function () {
    //         // Mouse Events
    //         drag.addEventListener("mousedown", start, false);
    //         $(document).bind("mousemove", function (event) {
    //             if (active === true) {
    //                 move(event);
    //             }
    //         });
    //         $(document).bind("mouseup", function (event) {
    //             stop(event.originalEvent);
    //         });
    //     };

    //     start = function (e) {
    //         e.preventDefault();
    //         // mouse pos
    //         var Mx = e.clientX,
    //             My = e.clientY,
    //             l = d.getBoundingClientRect().left,
    //             t = d.getBoundingClientRect().top;
    //         // offset
    //         _x = Mx - l;
    //         _y = My - t;
    //         return (active = true);
    //     };

    //     move = function (e) {
    //         e.preventDefault();
    //         var Mx = e.clientX,
    //             My = e.clientY,
    //             l = d.getBoundingClientRect().left,
    //             t = d.getBoundingClientRect().top,
    //             w = d.getBoundingClientRect().width,
    //             h = d.getBoundingClientRect().height,
    //             _l = con.getBoundingClientRect().left,
    //             _t = con.getBoundingClientRect().top,
    //             _w = con.getBoundingClientRect().width,
    //             _h = con.getBoundingClientRect().height,
    //             x,
    //             y;
    //         //check to see if mouse is inside container
    //         if (Mx - _x > _l && Mx + w - _l < _w + _x) {
    //             // x = mouseX - offsetX - containerX
    //             x = Mx - _x - _l;
    //         }
    //         if (My - _y > _t && My + h - _t < _h + _y) {
    //             // y = mouseY - offsetY - containerY
    //             y = My - _y - _t;
    //         }
    //         return (d.style.left = x + "px"), (d.style.top = y + "px");
    //     };

    //     stop = function () {
    //         return (active = false);
    //     };

    //     init();
    // }.call(this));

    ///////////////////////////////
    // -------  rotate  -------- //
    ///////////////////////////////
