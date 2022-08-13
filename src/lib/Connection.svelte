<script>
    import Peer from "skyway-js";
    import { onMount } from "svelte";
    const API_KEY = "";

    let joinTrigger;
    let leaveTrigger;
    let roomId;
    let localText;
    let sendTrigger;
    let messages = "";
    let room;

    async function getpeer() {
        return new Peer({ key: API_KEY });
    }

    const display = (message) => {
        messages += `${message}\n`;
    };
    const clearDisplay = () => {
        messages = "";
    };
    onMount(() => {
        getpeer().then((peer) => {
            peer.on("error", console.error);
            joinTrigger.addEventListener("click", () => {
                if (!peer.open) return;
                if (room) {
                    room.close();
                    room = null;
                }

                room = peer.joinRoom(roomId.value, {
                    mode: "sfu",
                });

                room.once("open", () => display("=== You joined ==="));
                room.on("peerJoin", (peerId) =>
                    display(`=== ${peerId} joined ===`)
                );
                // Show a message sent to the room and who sent
                room.on("data", ({ data, src }) => display(`${src}: ${data}`));

                // for closing room members
                room.on("peerLeave", (peerId) =>
                    display(`=== ${peerId} left ===`)
                );

                // for closing myself
                room.once("close", () => {
                    sendTrigger.removeEventListener("click", onClickSend);
                    display("=== You left ===");
                });

                leaveTrigger.addEventListener("click", () => room.close());
                sendTrigger.addEventListener("click", onClickSend);

                function onClickSend() {
                    room.send(localText);
                    display(`${peer.id}: ${localText}`);
                    localText = "";
                }
            });
        });
    });
</script>

<div class="container">
    <h1 class="heading">Room example</h1>
    <div class="room">
        <div>
            <input bind:this={roomId} type="text" placeholder="Room Name" />
            <button bind:this={joinTrigger} disabled={room}>Join</button>
            <button bind:this={leaveTrigger} disabled={!room}>Leave</button>
        </div>

        <div>
            <input bind:value={localText} type="text" />
            <button bind:this={sendTrigger}>Send</button>
            <pre class="messages">{messages}</pre>
        </div>
    </div>
</div>

<style>
    button {
        background-color: darkkhaki;
    }
    button:disabled {
        background-color: gray;
    }
</style>
