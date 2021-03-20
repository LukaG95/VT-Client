import { useEffect, useState } from 'react'
import axios from 'axios'

export default function useUserSearch(username) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [users, setUsers] = useState([])

  /*
  useEffect(() => {
    setUsers([])
  }, [username])
  */

  useEffect(() => {
    setLoading(true)
    setError(false)

    let cancel
    axios({
      method: 'POST',
      url: `/api/auth/getIdsByUsername`,
      data: {username},
      cancelToken: new axios.CancelToken(c => cancel = c)
    })
    .then(res => { 
      if (res.data.info === "success")
      setUsers(res.data.users)
      
      setLoading(false)
    }).catch(res => { 
      if (axios.isCancel(res)) return
      if (res.response.data.info === "error")
        setUsers([])
        
      setError(true)
    })
    return () => cancel()

  }, [username])

  return { loading, error, users }
}
