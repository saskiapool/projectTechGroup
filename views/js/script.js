const body = document.querySelector('body');
body.classList.add('jsActive');

// login password toggle
const passwordBox = document.querySelector('.passwordBox');
if (passwordBox && passwordBox.dataset.pswhide === 'true') {
  const psw = document.querySelector('.passwordBox input');
  const pswToggle = document.querySelector('.passwordBox #toggle');

  pswToggle.addEventListener('click', () => {
    if (psw.type === 'password') {
      psw.setAttribute('type', 'text');
      pswToggle.classList.add('hide');
    } else {
      psw.setAttribute('type', 'password');
      pswToggle.classList.remove('hide');
    }
  });
}

// Socket io
if (body.dataset.chatting === 'true') {
  const msg = document.querySelector('#message');
  const sendMsg = document.querySelector('#sendMessage');
  const messageSection = document.querySelector('#messages');

  const socket = io(window.location.host);
  messageSection.scrollTop = messageSection.scrollHeight;

  // Incomming
  socket.on('message', (data) => {
    console.log(data);

    messageSection.innerHTML += `
  <div class="message messageRecieve">
      <p>
          ${data.trim()}
      </p>
  </div>
  `;

    messageSection.scrollTop = messageSection.scrollHeight;
  });

  // Outgoing
  sendMsg.addEventListener('click', (e) => {
    e.preventDefault();
    console.log(msg.value.trim());

    const data = {
      message: msg.value.trim(),
    };

    messageSection.innerHTML += `
    <div class="message messageSend">
        <p>
            ${msg.value.trim()}
        </p>
    </div>
    `;

    messageSection.scrollTop = messageSection.scrollHeight;

    console.log('send data');
    socket.emit('message', data);
    msg.value = '';
  });
}

const openMenu = document.querySelector('.back');
openMenu.addEventListener('click', (e) => {
  e.preventDefault;
  openMenu.removeAttribute('href');
  document.querySelector('#profiles').classList.toggle('active');
});
