const APP_ID = "2c2a7041ddad44428b055228f2e62813";
const CHANNEL = "django-video-chat";
const TOKEN =
  "0062c2a7041ddad44428b055228f2e62813IAA7H7EReczqj2LPoKtOUT4PG+lhwbHJSR6ZPO8qGwS0nnVrr94AAAAAEAB1KdkmQ5xiYgEAAQBCnGJi";
let UID;

const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

let localTracks = [];
let remoteUsers = {};

let joinAndDisplayLocalStream = async () => {
  client.on("user-published", handleUserJoined);
  client.on("user-left", handleUserLeft);

  UID = await client.join(APP_ID, CHANNEL, TOKEN, null);
  localTracks = await AgoraRTC.createMicrophoneAndCameraTracks();

  let player = `<div class="video-container" id="user-container-${UID}">
                    <div class="username-wrapper"><span class="user-name">My name</span></div>
                    <div class="video-player" id="user-${UID}"></div>
                </div>`;

  document
    .getElementById("video-streams")
    .insertAdjacentHTML("beforeend", player);

  localTracks[1].play(`user-${UID}`);

  await client.publish([localTracks[0], localTracks[1]]);
};

let handleUserJoined = async (user, mediaType) => {
  remoteUsers[user.uid] = user;
  await client.subscribe(user, mediaType);

  if (mediaType === "video") {
    // Make sure user doesn't exists
    let player = document.getElementById("user-container-${user.uid}");
    if (player != null) {
      player.remove();
    }

    player = `<div class="video-container" id="user-container-${user.uid}">
    <div class="username-wrapper"><span class="user-name">My name</span></div>
    <div class="video-player" id="user-${user.uid}"></div>
</div>`;

    document
      .getElementById("video-streams")
      .insertAdjacentHTML("beforeend", player);
    user.videoTrack.play(`user-${user.uid}`);
  }
  if (mediaType === "audio") {
    user.audioTrack.play();
  }
};

let handleUserLeft = async (user) => {

  document.getElementById(`user-container-${user.uid}`).remove()
  delete remoteUsers[user.uid]

  //console.log('User left.')
}

joinAndDisplayLocalStream();
