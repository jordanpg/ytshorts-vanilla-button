// ==UserScript==
// @name         YouTube Shorts To Vanilla Button
// @namespace    https://jordanpg.dev/
// @version      2.2
// @description  add a button to view youtube short in vanilla player
// @author       jordanpg
// @match        http*://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @downloadURL  https://github.com/jordanpg/ytshorts-vanilla-button/raw/main/ytshortstovanilla.user.js
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const urlRegex = /(?:https?:)?(?:\/\/)?(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\S*?[^\w\s-])([\w-]{11})(?=[^\w-]|$)(?![?=&+%\w.-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/gim;

    function generateVanillaButton() {
        const action = document.querySelector("ytd-reel-video-renderer[is-active] #actions");
        const videoId = urlRegex.exec(window.location.href);
        
        if(!action || !videoId) {
            setTimeout(generateVanillaButton, 100);
            return;
        }

        if(action.querySelector("#to-vanilla")) return;

        const div = document.createElement('div');
        div.style = "padding-top: 16px;"
        div.id = "to-vanilla";

        const button = document.createElement('a');
        button.className = "yt-vanilla-button yt-spec-button-shape-next yt-spec-button-shape-next--tonal yt-spec-button-shape-next--mono yt-spec-button-shape-next--size-l yt-spec-button-shape-next--icon-button";
        button.innerHTML = `<svg style="width:24px;height:24px" viewBox="0 0 24 24">
            <path fill="currentColor" d="M10,15L15.19,12L10,9V15M21.56,7.17C21.69,7.64 21.78,8.27 21.84,9.07C21.91,9.87 21.94,10.56 21.94,11.16L22,12C22,14.19 21.84,15.8 21.56,16.83C21.31,17.73 20.73,18.31 19.83,18.56C19.36,18.69 18.5,18.78 17.18,18.84C15.88,18.91 14.69,18.94 13.59,18.94L12,19C7.81,19 5.2,18.84 4.17,18.56C3.27,18.31 2.69,17.73 2.44,16.83C2.31,16.36 2.22,15.73 2.16,14.93C2.09,14.13 2.06,13.44 2.06,12.84L2,12C2,9.81 2.16,8.2 2.44,7.17C2.69,6.27 3.27,5.69 4.17,5.44C4.64,5.31 5.5,5.22 6.82,5.16C8.12,5.09 9.31,5.06 10.41,5.06L12,5C16.19,5 18.8,5.16 19.83,5.44C20.73,5.69 21.31,6.27 21.56,7.17Z" />
        </svg>`;
        button.href = `https://youtu.be/${videoId[1]}`;
        div.appendChild(button);

        action.insertBefore(div, document.querySelector("ytd-reel-video-renderer[is-active] #actions #menu-button"));
    }

    generateVanillaButton();
    document.addEventListener('yt-navigate-finish', generateVanillaButton);
})();