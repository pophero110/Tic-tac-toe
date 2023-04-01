import GameUI from "./GameUI";

const roomForm = document.querySelector(".roomForm");
const roomNumberInput = document.getElementById("roomNumber");
const socket = io();

roomForm.addEventListener("submit", (event) => {
  event.preventDefault();
  socket.emit(
    "join",
    { name: "test", room: roomNumberInput.value },
    (error) => {
      if (error) {
        alert(error);
      }
    }
  );
});

socket.on("message", (message) => {
  console.log(message);
});
