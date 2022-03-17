const { default: makeWASocket, DisconnectReason, makeInMemoryStore, useSingleFileAuthState } = require('@adiwajshing/baileys')
const figlet = require('figlet')
const P = require('pino')
const { color, bgcolor, KonsolLog } = require('./lib/color.js')
const { state, saveState } = useSingleFileAuthState('./session.json')
const { smsg, kyun } = require('./lib/myfunc.js')
const store = makeInMemoryStore({ logger: P().child({ level: 'debug', stream: 'store' }) })

async function startBotol() {
    const zaki = makeWASocket({
    	logger: P({ level: 'silent' }),
        printQRInTerminal: true,
        browser: ['SimiBOT','Chrome','3.0'],
        auth: state
})

console.log(color(figlet.textSync('Simi BOT', {
		font: 'Standard',
		horizontalLayout: 'default',
		vertivalLayout: 'default',
		whitespaceBreak: false
	}), 'cyan'))

console.log(color('Connected....'))

store.bind(zaki.ev)
    
    zaki.ev.on('messages.upsert', async chatUpdate => {
    	try {
    	msg = chatUpdate.messages[0]
    	if (!msg.message) return
        if (msg.key && msg.key.remoteJid === 'status@broadcast') return
        if (msg.key.id.startsWith('BAE5') && msg.key.id.length === 16) return
        m = smsg(zaki, msg, store)
        require('./index.js')(zaki, msg, m)
        } catch (e){
        console.log(e)
        }
    })

    zaki.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update
        if (connection === 'close') {
            console.log(KonsolLog('connection closed, try to restart'))
            lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut ? startBotol() : console.log(KonsolLog('Wa web terlogout.'))
        }
    })
    zaki.ev.on('creds.update', () => saveState)
    return zaki
}

startBotol()