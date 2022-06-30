const axios = require('axios')
const chalk = require('chalk')
const moment = require('moment-timezone')
const { smsg, kyun } = require('./lib/myfunc.js')
const { color, bgcolor, KonsolLog } = require('./lib/color.js')

module.exports = zaki = async (zaki, msg, m) => {
	try {
        var budy = (typeof m.text == 'string' ? m.text : '')
	    const from = m.key.remoteJid
        const time = moment.tz('Asia/Jakarta').format('HH:mm:ss')
        const pushname = m.pushName || 'undefined'
        const quoted = m.quoted ? m.quoted : m
        const mime = (quoted.msg || quoted).mimetype || ''
	    const isMedia = /image|video|sticker|audio/.test(mime)
	
	    const ownerNumber = [`6285878313791@s.whatsapp.net`]
	    const isOwner = ownerNumber.includes(m.sender)
	    const groupMetadata = m.isGroup ? await zaki.groupMetadata(m.chat).catch(e => {}) : ''
        const groupName = m.isGroup ? groupMetadata.subject : ''
 
        if (m.message) {
        	console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32m CMD \x1b[1;37m]', time + ' WIB', chalk.green(budy || m.mtype), 'from', chalk.green(pushname), 'in', chalk.green(groupName ? groupName : 'Private Chat' ))
        }
         
               try {
                    if (!m.isGroup && !isMedia && !m.key.fromMe) {
	                simi = await axios.get(`https://api.simsimi.net/v2/?text=${budy}&lc=id`)
                    zaki.sendMessage(from, { text: simi.data.success }, {quoted: msg})
                    }
                    } catch {
                    zaki.sendMessage(from, { text: 'undefined' }, {quoted: msg})
                    }
                    
                    if (budy.startsWith('>')){
                    if (!isOwner && !m.key.fromMe) return
                    console.log(color('[ EVAL ]','yellow'), budy.slice(2))
                    try {
                    let evaled = await eval(budy.slice(2))
                    if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
                    await m.reply(evaled)
                    } catch (err) {
                    await m.reply(String(err))
                    }
                    }

} catch (e){
	console.log(e)
	}
}
