function formatedMessagesTime(timestamp){
  if (!timestamp) return ""

  const dateNow = Date.now();
  const dateThen = new Date(timestamp)
  const timeAgo = Math.round((dateNow - timestamp) / 1000);

  if (timeAgo > 2 * 86400) return dateThen.toLocaleDateString();
  else if (timeAgo > 86400) return 'yesterday'
  else {
    let h = (dateThen.getHours()<10?'0':'') + dateThen.getHours()
    let m = (dateThen.getMinutes()<10?'0':'') + dateThen.getMinutes()

    return (h + ':' + m)
  }

}

export { formatedMessagesTime }
