document.addEventListener("DOMContentLoaded", function() {
    const icons = [
        'Resources/Overlay/Stage-Icons/1.png',
        'Resources/Overlay/Stage-Icons/2.png',
        'Resources/Overlay/Stage-Icons/3.png',
        'Resources/Overlay/Stage-Icons/4.png',
        'Resources/Overlay/Stage-Icons/5.png',
        'Resources/Overlay/Stage-Icons/6.png',
        'Resources/Overlay/Stage-Icons/7.png',
        'Resources/Overlay/Stage-Icons/8.png',
        'Resources/Overlay/Stage-Icons/9.png',
        'Resources/Overlay/Stage-Icons/10.png',
        'Resources/Overlay/Stage-Icons/11.png',
        'Resources/Overlay/Stage-Icons/12.png',
        'Resources/Overlay/Stage-Icons/13.png',
        'Resources/Overlay/Stage-Icons/14.png',
        'Resources/Overlay/Stage-Icons/15.png',
        
    ];

    const circles = document.querySelectorAll('.circles li');

    circles.forEach(circle => {
        const randomIcon = icons[Math.floor(Math.random() * icons.length)];
        circle.style.backgroundImage = `url(${randomIcon})`;
    });
});