
class Stroage {
  constructor () {
    if (!localStorage.getItem('play-songs-list')) localStorage.setItem('play-songs-list', JSON.stringify([]))
    if (!localStorage.getItem('favorite-songs-list')) localStorage.setItem('favorite-songs-list', JSON.stringify([]))
  }
  __removeSongInList (listName, removeSong) {
    let songList = JSON.parse(localStorage.getItem(listName))
    let oldIndex = songList.findIndex(function (song) {
      return song.hash === removeSong.hash
    })
    if (oldIndex !== -1) songList.splice(oldIndex, 1)
    localStorage.setItem(listName, JSON.stringify(songList))
    return songList
  }
  __addSongInList (listName, newSong) {
    let songList = this.__removeSongInList(listName, newSong)
    songList.unshift(newSong)
    localStorage.setItem(listName, JSON.stringify(songList))
    return songList
  }
  getFavoriteSongs () {
    return JSON.parse(localStorage.getItem('favorite-songs-list'))
  }
  addFavoriteSong (newSong) {
    return this.__addSongInList('favorite-songs-list', newSong)
  }
  removeFavoriteSong (removeSong) {
    return this.__removeSongInList('favorite-songs-list', removeSong)
  }
  getPlaySongs () {
    return JSON.parse(localStorage.getItem('play-songs-list'))
  }
  addPlaySong (newSong) {
    return this.__addSongInList('play-songs-list', newSong)
  }
  removePlaySong (removeSong) {
    return this.__removeSongInList('play-songs-list', removeSong)
  }
}

let exportInstance = new Stroage()

export default exportInstance
