import { useEffect, useState } from 'react'
import axios from 'axios'

import setAvatarLogic from '../../misc/setAvatarLogic'

export default function useChatSearch(userId, pageNumber, setMessages, scrollChatContainer) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    setMessages([])

  }, [userId])

  useEffect(() => {
    
    if (userId){

    setLoading(true)
    setError(false)

    let cancel
    axios({
      method: 'GET',
      url: `/api/messages/${userId}`,
      params: { page: pageNumber },
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      setMessages(prev => setAvatarLogic([...res.data.messages, ...prev]))
      setHasMore(res.data.hasMore)
      setLoading(false)
      if (pageNumber === 1)
        scrollChatContainer()
      else
        scrollChatContainer(5)
      
    }).catch(e => {
      if (axios.isCancel(e)) return
      setError(true); 
    })

    return () => cancel()
  }

  }, [userId, pageNumber])

  return { loading, error, hasMore } 
}