import * as WebSocket from "ws";

const server = new WebSocket.Server({ port: 8080 });

server.on("connection", socket => {
	console.log("New client connected");

	socket.on("message", message => {
		console.log(`Received message: ${message}`);
		server.clients.forEach(client => {
			if (client !== socket && client.readyState === WebSocket.OPEN) {
				client.send(message);
			}
		});
	});
});
