const body = document.querySelector('body');
body.classList.add('jsActive');

// login password toggle
if (document.querySelector('*[data-pswhide="true"]')) {
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
if (document.querySelector('*[data-chatting="true"]')) {
  const msg = document.querySelector('#message');
  const sendGif = document.querySelector('#sendGif');
  const sendMsg = document.querySelector('#sendMessage');
  const messageSection = document.querySelector('#messages');

  const socket = io(window.location.host);
  messageSection.scrollTop = messageSection.scrollHeight;

  // Incomming
  socket.on('hello', (data) => {
    messageSection.innerHTML += `
    <div class="message messageSend">
      <img src="${data}" class="gifImg"/>
    </div>
    `;

    messageSection.scrollTop = messageSection.scrollHeight;
  });

  socket.on('message', (data) => {
    messageSection.innerHTML += `
  <div class="message messageRecieve">
      <p>
          ${data.trim()}
      </p>
  </div>
  `;

    messageSection.scrollTop = messageSection.scrollHeight;
  });

  socket.on('gif', (data) => {
    messageSection.innerHTML += `
    <div class="message messageRecieve">
      <img src="${data}" class="gifImg"/>
    </div>
    `;

    messageSection.scrollTop = messageSection.scrollHeight;
  });

  // Outgoing
  sendMsg.addEventListener('click', (e) => {
    e.preventDefault();
    if (msg.value.trim()) {
      const str = msg.value.trim()
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;');

      const data = {
        message: msg.value.trim(),
        media: 'text',
      };

      if (sendGif.checked) {
        data.media = 'gif';
        socket.emit('gif', data);
      } else {
        messageSection.innerHTML += `
        <div class="message messageSend">
            <p>
                ${str}
            </p>
        </div>
        `;

        socket.emit('message', data);
      }

      messageSection.scrollTop = messageSection.scrollHeight;
      msg.value = '';
    }
  });
}

if (document.querySelector('.back')) {
  const openMenu = document.querySelector('.back');
  openMenu.addEventListener('click', (e) => {
    e.preventDefault;
    openMenu.removeAttribute('href');
    document.querySelector('#profiles').classList.toggle('active');
  });
}
