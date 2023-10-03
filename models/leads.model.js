const db = require('../util/database');
const mysql = require('mysql2');
module.exports = class lead {

    constructor(newLead) {
        this.phone = newLead.phone || " ";
        this.name = newLead.name || " ";
        this.value = newLead.value || null;
        this.gain = newLead.gain || null;
        this.email = newLead.email || " ";
        this.tags = newLead.tags || " ";
        this.company = newLead.company || " ";
        this.createdAt = newLead.createdAt || null; // Date
        this.creationTime = newLead.creationTime || null; // Time
        this.firstMessageDate = newLead.firstMessageDate || null; // Date
        this.firstMessageTime = newLead.firstMessageTime || null; // Time
        this.firstMessage = newLead.firstMessage || null; // 
        this.lastMessageDate = newLead.lastMessageDate || null; // Date
        this.lastMessageTime = newLead.lastMessageTime || null; // Time
        this.lastMessage = newLead.lastMessage || " ";
        this.status = newLead.status || " "; 
        this.leadStatus = newLead.leadStatus || " ";
        this.assignedTo = newLead.assignedTo || " ";
        this.pipe = newLead.pipe || " ";
        this.stage = newLead.stage || " ";
        this.archived = newLead.archived || " ";
        this.manuallyCreated = newLead.manuallyCreated || " ";
    }

    async insertLead() { 
        try {
            return await db.execute (
                'INSERT INTO leads (phone, name, value, gain, email, tags, company, createdAt, creationTime, firstMessageDate, firstMessageTime, firstMessage, lastMessageDate, lastMessageTime, lastMessage, status, leadStatus, assignedTo, pipe, stage, archived, manuallyCreated) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [this.phone, this.name, this.value, this.gain, this.email, this.tags, this.company, this.createdAt, this.creationTime, this.firstMessageDate, this.firstMessageTime, this.firstMessage, this.lastMessageDate, this.lastMessageTime, this.lastMessage, this.status, this.leadStatus, this.assignedTo, this.pipe, this.stage, this.archived, this.manuallyCreated]
            );
            } catch (error){
                console.log(error);
            }
    }

        // Probablemente aqui sea necesario incluir una funcion fetchOne 
};