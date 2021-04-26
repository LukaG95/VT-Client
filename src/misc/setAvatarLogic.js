export default function setAvatarLogic(messages) {
  const updatedMessages = messages.map((message, i) => {
    if (i === 0)
      message.displayAvatar = true
    else if ((messages[i].createdAt.timestamp - messages[i-1].createdAt.timestamp) >= 300000)
      message.displayAvatar = true
    else if (messages[i].sender._id !== messages[i-1].sender._id)
      message.displayAvatar = true
    else 
      message.displayAvatar = false
    
    return message
  })

  return updatedMessages
}