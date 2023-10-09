const { Server } = require("socket.io");
const app = require('./app');
const http = require('http');
const User = require("./models/user");
const Notification = require("./models/notifications");
const NotificationMessage = require("./models/notificationsMessage");
const server = http.createServer(app);
require("dotenv").config({path: "./env/.env"});


const io = new Server(server, {
    cors: {
      origin: `${process.env.HOST}`,
      methods: ["GET", "POST"],
    },
});

const socketRoutes = require('./routes/socket');



io.on("connection", (socket) => {
  
  socket.on('event-created', user => {
      const build = Notification.build({
        adminId: user.session,
        notifId: `${user.session}-${user.id}-Add`,
        forUser: user.id,
        data: 'started following you'
      })
      build.save()
      .catch(() => {
        return null
      })
      io.emit(user.id);
  });

  socket.on('message-created', (promise) => {
    io.emit(promise.uuId);
  })

  socket.on('discussion-created', (promise) => {
    io.emit(promise);
  })

  socket.on('notify-message', (promise) => {
    if (promise.status !== false) {
      const build = NotificationMessage.build({
        uuId: promise.uuId,
        text: promise.text,
        userId: promise.userId,
        sessionUserId: promise.sessionUserId,
        users: `${promise.sessionUserId}${promise.userId}`
      })
      build.save()
      .catch(() => {
        NotificationMessage.update({ text: promise.text }, {where : { users: `${promise.sessionUserId}${promise.userId}` }})
        io.emit(promise.userId);
      })
      io.emit(promise.userId);
    } else {
      io.emit(promise.userId);
    }
  })


  socket.on('NewAdmin', user => {
    const build = Notification.build({
      adminId: user.session,
      notifId: `${user.session}-${user.id}-NewAdmin`,
      forUser: user.id,
      data: '|Your PIC-V account has been upgraded to admin'
    })
    build.save()
    .catch(() => {
      return null
    })
    io.emit(user.id);
});

  socket.on('disconnect', () => {
    //console.log(`user disconnected ${socket.id}`);
    // remove saved socket from users object
    
    
  });
});

app.use('/api/eventv', socketRoutes)

//On dit à Node de se lancer sur le port 8080
server.listen(8080, () => console.log('IoServer started at port : 8080'));



