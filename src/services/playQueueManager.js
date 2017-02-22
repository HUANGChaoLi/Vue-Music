import storage from './storage.js'

class PlayQueueManager {
  __getCurrentIndex (songs, currentHash) {
    let currentIndex = -1
    for (let i = 0; i < songs.length; i++) {
      if (currentHash === songs[i].hash) currentIndex = i
    }
    return currentIndex
  }
  getNextSong (currentHash) {
    let songs = storage.getPlaySongs()
    let currentIndex = this.__getCurrentIndex(songs, currentHash)
    if (currentIndex !== -1) return songs[(currentIndex + 1) % songs.length]
    else if (songs.length > 0) return songs[0]
    else return null
  }
  getPrevSong (currentHash) {
    let songs = storage.getPlaySongs()
    let currentIndex = this.__getCurrentIndex(songs, currentHash)
    if (currentIndex !== -1) return songs[(currentIndex + songs.length - 1) % songs.length]
    else if (songs.length > 0) return songs[0]
    else return null
  }
}

let exportInstance = new PlayQueueManager()

export default exportInstance
