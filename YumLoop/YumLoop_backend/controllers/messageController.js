// Message controller for user messaging
// You may want to create a Message model for storing messages

import { Message } from '../Models/Message.js';
import { User } from '../Models/User.js';
import { jwtAuth } from '../middleware/auth.js';
import { getIO } from '../socket/socket.js';

// Send message (for REST fallback, not real-time)
export const sendMessage = async (req, res) => {
  // TODO: Add input validation
  try {
    const { to, text } = req.body;
    // Only allow messaging if both users follow each other (mutual following)
    const sender = await User.findById(req.user.id);
    const recipient = await User.findById(to);
    const senderFollowsRecipient = sender.following.includes(to);
    const recipientFollowsSender = recipient.following.includes(req.user.id);
    if (!(senderFollowsRecipient && recipientFollowsSender)) {
      return res.status(403).json({ error: 'You can only message users you mutually follow.' });
    }
    const message = await Message.create({ from: req.user.id, to, text });
    // Emit real-time event to recipient
    const io = getIO();
    if (io) {
      io.to(to.toString()).emit('newMessage', { from: req.user.id, text, timestamp: message.timestamp });
    }
    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get messages in a conversation
export const getMessages = async (req, res) => {
  try {
    const { userId } = req.params; // userId of the other participant
    const messages = await Message.find({
      $or: [
        { from: req.user.id, to: userId },
        { from: userId, to: req.user.id }
      ]
    }).sort({ timestamp: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get conversations for a user
export const getConversations = async (req, res) => {
  try {
    // Find all unique users this user has messaged with
    const sent = await Message.find({ from: req.user.id }).distinct('to');
    const received = await Message.find({ to: req.user.id }).distinct('from');
    const userIds = Array.from(new Set([...sent, ...received]));
    const users = await User.find({ _id: { $in: userIds } }).select('name avatar');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete message
export const deleteMessage = async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.json({ message: 'Message deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Mark as read (optional, if you add a 'read' field to Message)
export const markAsRead = async (req, res) => {
  try {
    // Implement mark as read logic if you add a 'read' field
    res.json({ message: 'Messages marked as read' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Block user (optional, you may want to add a block list to User)
export const blockUser = async (req, res) => {
  try {
    // Implement block user logic if you add a block list to User
    res.json({ message: 'User blocked' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 