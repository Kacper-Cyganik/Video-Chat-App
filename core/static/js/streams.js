const APP_ID = "b438cc27e69a4c37bd3eb622a3dc4006";
const CHANNEL = "main";
const TOKEN =
  "006b438cc27e69a4c37bd3eb622a3dc4006IACsEfdYuUVwGJ6hdKrGyjDEP8lpLu/VqJqXYa5IejrcOWTNKL8AAAAAEABg4SwUO6JMYgEAAQA7okxi";
let UID;

const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

let localTracks = [];
let remoteUsers = {};

let joinAndDisplayLocalStream = async () => {
    UID = await client.join(APP_ID, CHANNEL, TOKEN, null);
    localTracks = await AgoraRTC.createMicrophoneAndCameraTracks();

    let player = `<div class="video-container" id="user-container-${UID}">
                    <div class="username-wrapper"><span class="user-name">My name</span></div>
                    <div class="video-player" id="user-${UID}"></div>
                </div>`;

    document.getElementById('video-streams').insertAdjacentHTML('beforeend', player);

    localTracks[1].play(`user-${UID}`)

    await client.publish([localTracks[0], localTracks[1]])
};

joinAndDisplayLocalStream()
