import { defineStore } from 'pinia'
import { io } from 'socket.io-client'
import axios from 'axios'

const URL = "http://localhost:5000"

export const useSocketStore = defineStore('socket', {
    state: () => ({
        socket: null,
        connected: false,
        messages: [],
        users: [],
        currentUser: null,
        connectionCount: 0  // ✅ เพิ่มตัวนับ
    }),
    
    getters: {
        // ตรวจสอบว่า socket เชื่อมต่ออยู่หรือไม่
        isConnected: (state) => state.connected,
        
        // ดึงข้อความทั้งหมด
        getAllMessages: (state) => state.messages,
        
        // ดึงจำนวนผู้ใช้ออนไลน์
        onlineUsersCount: (state) => state.users.length
    },
    
    actions: {
        // เชื่อมต่อ Socket.IO
        connectSocket() {
            // เพิ่มตัวนับ
            this.connectionCount++
            
            // ถ้ามี socket อยู่แล้ว ไม่ต้องสร้างใหม่
            if (this.socket) {
                console.log('Socket already connected, connection count:', this.connectionCount)
                return
            }
            
            console.log('Creating new socket connection')
            
            // สร้างการเชื่อมต่อ socket
            this.socket = io(URL)
            
            // เมื่อเชื่อมต่อสำเร็จ
            this.socket.on('connect', () => {
                console.log('Socket connected:', this.socket.id)
                this.connected = true
            })
            
            // เมื่อขาดการเชื่อมต่อ
            this.socket.on('disconnect', () => {
                console.log('Socket disconnected')
                this.connected = false
            })
            
            // รับข้อความแชท
            this.socket.on('chat message', (msg) => {
                console.log('Received message:', msg)
                this.messages.push(msg)
            })
            
            // เมื่อมี user เข้าร่วม
            this.socket.on('join', (username) => {
                console.log(`${username} joined the chat`)
                this.messages.push({
                    username: username,
                    message: ' joined the chat',
                    timestamp: new Date().toLocaleTimeString()
                })
            })
            
            // เมื่อมี user ออกจากห้อง
            this.socket.on('leave', (username) => {
                console.log(`${username} left the chat`)
                this.messages.push({
                    username: username,
                    message: ' left the chat',
                    timestamp: new Date().toLocaleTimeString()
                })
            })
            
            // รับ error
            this.socket.on('error', (error) => {
                console.error('Socket error:', error)
            })
        },
        
        // ส่งข้อความ
        sendMessage(message) {
            if (!this.socket || !this.connected) {
                console.error('Socket not connected')
                return
            }
            
            const messageData = {
                username: this.currentUser || 'Anonymous',
                input: message,
                timestamp: new Date().toLocaleTimeString()
            }
            
            this.socket.emit('chat message', messageData)
        },
        
        // ตรวจสอบ user
        checkUser(username) {
            if (!this.socket || !this.connected) {
                console.error('Socket not connected')
                return
            }
            
            this.currentUser = username
            this.socket.emit('checkuser', username)
        },
        
        // เข้าร่วมห้อง
        joinRoom(roomName) {
            if (!this.socket || !this.connected) {
                console.error('Socket not connected')
                return
            }
            
            this.socket.emit('join room', {
                username: this.currentUser,
                room: roomName
            })
        },
        
        // ออกจากห้อง
        leaveRoom(roomName) {
            if (!this.socket || !this.connected) {
                console.error('Socket not connected')
                return
            }
            
            this.socket.emit('leave room', {
                username: this.currentUser,
                room: roomName
            })
        },
        
        // ตัดการเชื่อมต่อ
        disconnectSocket() {
            // ลดตัวนับ
            this.connectionCount--
            
            // ถ้ายังมี component อื่นใช้อยู่ ไม่ต้องตัดการเชื่อมต่อ
            if (this.connectionCount > 0) {
                console.log('Other components still using socket, connection count:', this.connectionCount)
                return
            }
            
            // ตัดการเชื่อมต่อเมื่อไม่มี component ใช้แล้ว
            if (this.socket) {
                console.log('Disconnecting socket')
                this.socket.disconnect()
                this.socket = null
                this.connected = false
                this.connectionCount = 0  // รีเซ็ตตัวนับ
                console.log('Socket disconnected manually')
            }
        },
        
        // ล้างข้อความ
        clearMessages() {
            this.messages = []
        },
        
        // ดึงข้อความเก่าจาก API
        async loadMessages() {
            try {
                const res = await axios.get(`${URL}/api/messages`)
                if (res.data && res.data.data) {
                    // เรียงข้อความจากเก่าไปใหม่
                    this.messages = res.data.data.reverse()
                    console.log('Messages loaded:', this.messages.length)
                }
            } catch (err) {
                console.error('Error loading messages:', err)
            }
        }
    }
})