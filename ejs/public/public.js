const socket = io();


socket.on("message_back", (data) => {
  console.log(data);
  render(data);
  socket.emit("message_client", "Hola servidor!");
});

const render = (data) => {
  let html = data
    .map((x) => {
      return `
            <p>  ${x.msn}  </p>
        `;
    })
    .join(" ");

  document.querySelector("#caja").innerHTML = html;
};

const addMsn = () => {
    console.log("Hola")

    let obj = {
        nombre : document.querySelector("#nb").value,
        msn : document.querySelector("#msn").value
    }

    socket.emit("data_client", obj)

    document.querySelector("#msn").value = ""

    return false
}

