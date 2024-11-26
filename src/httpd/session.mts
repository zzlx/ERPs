/**
 * *****************************************************************************
 * 
 * ## Session resumption
 *
 * Establishing a TLS session can be relatively slow.
 *
 * ### Session identifiers
 *
 * Server generate a unique ID for new connections and send to the client.
 * Clients and servers save the session state.
 * When reconnecting, clients send the ID of theri saved session state and if
 * the server also has the state for that ID, it can agree to use it.
 * Otherwise ,the server will create an new session.
 *
 * Resumption using session identifiers is supported by most web browsers when
 * making HTTPS requests.
 *
 * For Node.js, clients wait for the session  event to get the session data,
 * and provide the data to the session option of a subsequent tls.connection to
 * reuse the session.
 * Severs must implement hadlers for the newSession and resumeSession events to
 * save and restore the session data using the session ID as the lookup key to
 * reuse session. 
 * To reuse sessions across load balancers or cluster workers, servers must use
 * a shareed session cache(such as Redis) in their session handlers.
 *
 * ### Session tickets
 *
 * The server s encrypt the entire session state and send it to the client as a
 * ticket. When reconnectiong, the state is send to the server in the initial
 * connection. this mechanism avoids the need for a server-side session cache.
 * if the server doesn't use the ticket, for any reason,it will create a new
 * session and send a new ticket.
 *
 * if tls.TLSSocket.getTLSTicket() returns a value, the session data contains a
 * ticket, otherwise it contains client-side session state.
 *
 * With TLSv1.3, be aware that multiple tickets may be send by the server,
 * resulting in multiple session events.
 *
 * Single process servers need no specific implementation to use session
 * tickets. to use session tickets across server restarts or laod balancers,
 * server must all have the same ticket keys. There are three 16-byte keys
 * internally, but the tls API exposes them as a single 48-byte buffer for
 * convenience.
 *
 *
 * *****************************************************************************
 */

export function createClient (): boolean {

}
